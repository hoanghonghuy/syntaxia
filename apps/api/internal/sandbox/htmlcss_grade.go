package sandbox

import (
	"fmt"
	"io"
	"strings"

	"golang.org/x/net/html"
)

// HtmlCssGradeInput is learner HTML/CSS submitted for grading.
type HtmlCssGradeInput struct {
	HTML string
	CSS  string
}

// GradeHtmlCss compares submitted markup/CSS to exercise.expected.
// Returns passed, stable code, and English fallback message.
func GradeHtmlCss(expected map[string]any, input HtmlCssGradeInput) (bool, string, string) {
	if expected == nil {
		return false, "no_expected", "no expected result configured"
	}
	typ, _ := expected["type"].(string)
	switch typ {
	case "htmlTags":
		return gradeHtmlTags(expected, input.HTML)
	case "cssRules":
		return gradeCSSRules(expected, input.CSS)
	case "cssIncludes":
		return gradeIncludes(expected, normalizeWhitespace(input.CSS), "CSS")
	case "htmlIncludes":
		return gradeIncludes(expected, normalizeWhitespace(input.HTML), "HTML")
	default:
		return false, "invalid_expected", "unknown or unsupported expected type"
	}
}

type htmlElementInfo struct {
	tag   string
	attrs map[string]string
}

func gradeHtmlTags(expected map[string]any, rawHTML string) (bool, string, string) {
	rawTags, ok := expected["tags"].([]any)
	if !ok || len(rawTags) == 0 {
		return false, "invalid_expected", "invalid expected html tags"
	}

	elements, err := inspectHTMLTags(rawHTML)
	if err != nil {
		return false, "wrong_result", "could not parse HTML"
	}

	if rawNeedles, exists := expected["sourceIncludes"]; exists {
		needles, ok := anyStringSlice(rawNeedles)
		if !ok || len(needles) == 0 {
			return false, "invalid_expected", "invalid expected HTML source fragments"
		}
		normalized := normalizeWhitespace(rawHTML)
		for _, needle := range needles {
			if needle == "" {
				return false, "invalid_expected", "invalid expected HTML source fragments"
			}
			if !strings.Contains(normalized, needle) {
				return false, "wrong_result", "HTML does not include required source fragment"
			}
		}
	}

	for _, item := range rawTags {
		spec, ok := item.(map[string]any)
		if !ok {
			return false, "invalid_expected", "invalid expected html tags"
		}
		tag, _ := spec["tag"].(string)
		tag = strings.ToLower(strings.TrimSpace(tag))
		if tag == "" {
			return false, "invalid_expected", "invalid expected html tags"
		}
		minCount := intFromAny(spec["minCount"])
		if minCount < 1 {
			minCount = 1
		}
		maxCount := intFromAny(spec["maxCount"])

		requiredAttrs := []string{}
		if rawRequired, exists := spec["requiredAttrs"]; exists {
			parsed, ok := anyStringSlice(rawRequired)
			if !ok {
				return false, "invalid_expected", "invalid required HTML attributes"
			}
			for _, attr := range parsed {
				attr = strings.ToLower(strings.TrimSpace(attr))
				if attr == "" {
					return false, "invalid_expected", "invalid required HTML attributes"
				}
				requiredAttrs = append(requiredAttrs, attr)
			}
		}

		attrEquals := map[string]string{}
		if rawEquals, exists := spec["attrEquals"]; exists {
			parsed, ok := anyStringMap(rawEquals)
			if !ok {
				return false, "invalid_expected", "invalid expected HTML attribute values"
			}
			for key, value := range parsed {
				key = strings.ToLower(strings.TrimSpace(key))
				if key == "" {
					return false, "invalid_expected", "invalid expected HTML attribute values"
				}
				attrEquals[key] = value
			}
		}

		matching := 0
		for _, element := range elements {
			if element.tag != tag || !elementHasAttrs(element, requiredAttrs, attrEquals) {
				continue
			}
			matching++
		}
		if matching < minCount {
			return false, "wrong_result", fmt.Sprintf("expected at least %d matching <%s> element(s)", minCount, tag)
		}
		if maxCount > 0 && matching > maxCount {
			return false, "wrong_result", fmt.Sprintf("expected at most %d matching <%s> element(s)", maxCount, tag)
		}
	}

	if rawRelations, exists := expected["relations"]; exists {
		relations, ok := rawRelations.([]any)
		if !ok {
			return false, "invalid_expected", "invalid expected HTML relations"
		}
		for _, rawRelation := range relations {
			relation, ok := rawRelation.(map[string]any)
			if !ok {
				return false, "invalid_expected", "invalid expected HTML relations"
			}
			kind, _ := relation["kind"].(string)
			var passed bool
			var message string
			switch kind {
			case "attributeReference":
				passed, message = gradeHTMLAttributeReference(relation, elements)
			case "sharedAttributeValue":
				passed, message = gradeHTMLSharedAttributeValue(relation, elements)
			default:
				return false, "invalid_expected", "unsupported HTML relation"
			}
			if !passed {
				return false, "wrong_result", message
			}
		}
	}

	return true, "", ""
}

func inspectHTMLTags(raw string) ([]htmlElementInfo, error) {
	elements := []htmlElementInfo{}
	z := html.NewTokenizer(strings.NewReader(raw))
	for {
		tt := z.Next()
		switch tt {
		case html.ErrorToken:
			if z.Err() == io.EOF {
				return elements, nil
			}
			return nil, z.Err()
		case html.StartTagToken, html.SelfClosingTagToken:
			name, hasAttr := z.TagName()
			attrs := map[string]string{}
			for hasAttr {
				key, value, more := z.TagAttr()
				attrs[strings.ToLower(string(key))] = string(value)
				hasAttr = more
			}
			elements = append(elements, htmlElementInfo{tag: strings.ToLower(string(name)), attrs: attrs})
		}
	}
}

func elementHasAttrs(element htmlElementInfo, required []string, equals map[string]string) bool {
	for _, attr := range required {
		if _, ok := element.attrs[attr]; !ok {
			return false
		}
	}
	for attr, expected := range equals {
		actual, ok := element.attrs[attr]
		if !ok || !strings.EqualFold(strings.TrimSpace(actual), strings.TrimSpace(expected)) {
			return false
		}
	}
	return true
}

func gradeHTMLAttributeReference(spec map[string]any, elements []htmlElementInfo) (bool, string) {
	fromTag := lowerString(spec["fromTag"])
	fromAttr := lowerString(spec["fromAttr"])
	toTag := lowerString(spec["toTag"])
	toAttr := lowerString(spec["toAttr"])
	if fromTag == "" || fromAttr == "" || toTag == "" || toAttr == "" {
		return false, "invalid HTML attribute reference"
	}
	minCount := intFromAny(spec["minCount"])
	if minCount < 1 {
		minCount = 1
	}

	targetValues := map[string]struct{}{}
	for _, element := range elements {
		if element.tag != toTag {
			continue
		}
		if value := strings.TrimSpace(element.attrs[toAttr]); value != "" {
			targetValues[value] = struct{}{}
		}
	}

	matches := 0
	for _, element := range elements {
		if element.tag != fromTag {
			continue
		}
		value := strings.TrimSpace(element.attrs[fromAttr])
		if value == "" {
			continue
		}
		if _, ok := targetValues[value]; ok {
			matches++
		}
	}
	if matches < minCount {
		return false, fmt.Sprintf("expected <%s %s> to reference <%s %s>", fromTag, fromAttr, toTag, toAttr)
	}
	return true, ""
}

func gradeHTMLSharedAttributeValue(spec map[string]any, elements []htmlElementInfo) (bool, string) {
	tag := lowerString(spec["tag"])
	attr := lowerString(spec["attr"])
	if tag == "" || attr == "" {
		return false, "invalid shared HTML attribute relation"
	}
	minCount := intFromAny(spec["minCount"])
	if minCount < 2 {
		minCount = 2
	}
	attrEquals := map[string]string{}
	if rawEquals, exists := spec["attrEquals"]; exists {
		parsed, ok := anyStringMap(rawEquals)
		if !ok {
			return false, "invalid shared HTML attribute filter"
		}
		for key, value := range parsed {
			attrEquals[strings.ToLower(strings.TrimSpace(key))] = value
		}
	}

	counts := map[string]int{}
	for _, element := range elements {
		if element.tag != tag || !elementHasAttrs(element, nil, attrEquals) {
			continue
		}
		value := strings.TrimSpace(element.attrs[attr])
		if value == "" {
			continue
		}
		counts[value]++
		if counts[value] >= minCount {
			return true, ""
		}
	}
	return false, fmt.Sprintf("expected at least %d <%s> elements to share %s", minCount, tag, attr)
}

type cssRule struct {
	selector     string
	declarations map[string]string
}

func gradeCSSRules(expected map[string]any, rawCSS string) (bool, string, string) {
	rawRules, ok := expected["rules"].([]any)
	if !ok || len(rawRules) == 0 {
		return false, "invalid_expected", "invalid expected CSS rules"
	}

	rules, err := parseCSSRules(rawCSS)
	if err != nil {
		return false, "wrong_result", "could not parse CSS rules"
	}

	for _, rawRule := range rawRules {
		spec, ok := rawRule.(map[string]any)
		if !ok {
			return false, "invalid_expected", "invalid expected CSS rule"
		}
		selector, _ := spec["selector"].(string)
		selector = normalizeCSSSelector(selector)
		if selector == "" {
			return false, "invalid_expected", "missing expected CSS selector"
		}
		expectedDecls, ok := anyStringMap(spec["declarations"])
		if !ok || len(expectedDecls) == 0 {
			return false, "invalid_expected", "missing expected CSS declarations"
		}
		for property, value := range expectedDecls {
			delete(expectedDecls, property)
			expectedDecls[strings.ToLower(strings.TrimSpace(property))] = normalizeCSSValue(value)
		}

		matched := false
		for _, rule := range rules {
			if rule.selector != selector {
				continue
			}
			if cssDeclarationsContain(rule.declarations, expectedDecls) {
				matched = true
				break
			}
		}
		if !matched {
			return false, "wrong_result", fmt.Sprintf("expected CSS rule for %s with required declarations", selector)
		}
	}
	return true, "", ""
}

func parseCSSRules(raw string) ([]cssRule, error) {
	css := stripCSSComments(raw)
	rules := []cssRule{}
	pos := 0
	for pos < len(css) {
		rest := css[pos:]
		openRel := strings.Index(rest, "{")
		if openRel < 0 {
			if strings.TrimSpace(rest) != "" {
				return nil, fmt.Errorf("trailing CSS without rule block")
			}
			break
		}
		open := pos + openRel
		selectorText := strings.TrimSpace(css[pos:open])
		if selectorText == "" {
			return nil, fmt.Errorf("empty CSS selector")
		}
		closeRel := strings.Index(css[open+1:], "}")
		if closeRel < 0 {
			return nil, fmt.Errorf("unclosed CSS rule")
		}
		close := open + 1 + closeRel
		body := css[open+1 : close]
		if strings.Contains(body, "{") {
			return nil, fmt.Errorf("nested CSS blocks are not supported in basics grader")
		}
		decls, err := parseCSSDeclarations(body)
		if err != nil {
			return nil, err
		}
		for _, rawSelector := range strings.Split(selectorText, ",") {
			selector := normalizeCSSSelector(rawSelector)
			if selector == "" {
				return nil, fmt.Errorf("empty selector in selector list")
			}
			rules = append(rules, cssRule{selector: selector, declarations: decls})
		}
		pos = close + 1
	}
	return rules, nil
}

func parseCSSDeclarations(body string) (map[string]string, error) {
	decls := map[string]string{}
	for _, rawDecl := range strings.Split(body, ";") {
		rawDecl = strings.TrimSpace(rawDecl)
		if rawDecl == "" {
			continue
		}
		parts := strings.SplitN(rawDecl, ":", 2)
		if len(parts) != 2 {
			return nil, fmt.Errorf("invalid CSS declaration")
		}
		property := strings.ToLower(strings.TrimSpace(parts[0]))
		value := normalizeCSSValue(parts[1])
		if property == "" || value == "" {
			return nil, fmt.Errorf("invalid CSS declaration")
		}
		decls[property] = value
	}
	if len(decls) == 0 {
		return nil, fmt.Errorf("CSS rule has no declarations")
	}
	return decls, nil
}

func stripCSSComments(raw string) string {
	var out strings.Builder
	for i := 0; i < len(raw); {
		if i+1 < len(raw) && raw[i] == '/' && raw[i+1] == '*' {
			end := strings.Index(raw[i+2:], "*/")
			if end < 0 {
				break
			}
			i += end + 4
			continue
		}
		out.WriteByte(raw[i])
		i++
	}
	return out.String()
}

func normalizeCSSSelector(selector string) string {
	s := strings.Join(strings.Fields(strings.TrimSpace(selector)), " ")
	for _, combinator := range []string{">", "+", "~"} {
		s = strings.ReplaceAll(s, " "+combinator+" ", combinator)
		s = strings.ReplaceAll(s, " "+combinator, combinator)
		s = strings.ReplaceAll(s, combinator+" ", combinator)
	}
	return strings.ToLower(s)
}

func normalizeCSSValue(value string) string {
	v := strings.ToLower(strings.Join(strings.Fields(strings.TrimSpace(value)), " "))
	v = strings.ReplaceAll(v, ", ", ",")
	return v
}

func cssDeclarationsContain(actual, expected map[string]string) bool {
	for property, expectedValue := range expected {
		actualValue, ok := actual[property]
		if !ok || actualValue != expectedValue {
			return false
		}
	}
	return true
}

func lowerString(v any) string {
	s, _ := v.(string)
	return strings.ToLower(strings.TrimSpace(s))
}

func anyStringMap(v any) (map[string]string, bool) {
	raw, ok := v.(map[string]any)
	if !ok {
		return nil, false
	}
	out := make(map[string]string, len(raw))
	for key, value := range raw {
		s, ok := value.(string)
		if !ok {
			return nil, false
		}
		out[key] = s
	}
	return out, true
}

func gradeIncludes(expected map[string]any, haystack, label string) (bool, string, string) {
	needles, ok := anyStringSlice(expected["needles"])
	if !ok || len(needles) == 0 {
		return false, "invalid_expected", "invalid expected needles"
	}
	for _, needle := range needles {
		if needle == "" {
			return false, "invalid_expected", "invalid expected needles"
		}
		if !strings.Contains(haystack, needle) {
			return false, "wrong_result", fmt.Sprintf("%s does not include required fragment", label)
		}
	}
	return true, "", ""
}

func normalizeWhitespace(s string) string {
	return strings.Join(strings.Fields(s), " ")
}

func intFromAny(v any) int {
	switch n := v.(type) {
	case int:
		return n
	case int64:
		return int(n)
	case float64:
		return int(n)
	case float32:
		return int(n)
	default:
		return 0
	}
}
