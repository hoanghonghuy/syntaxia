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
	case "cssIncludes":
		return gradeIncludes(expected, normalizeWhitespace(input.CSS), "CSS")
	case "htmlIncludes":
		return gradeIncludes(expected, normalizeWhitespace(input.HTML), "HTML")
	default:
		return false, "invalid_expected", "unknown or unsupported expected type"
	}
}

func gradeHtmlTags(expected map[string]any, rawHTML string) (bool, string, string) {
	rawTags, ok := expected["tags"].([]any)
	if !ok || len(rawTags) == 0 {
		return false, "invalid_expected", "invalid expected html tags"
	}
	counts, err := countHTMLTags(rawHTML)
	if err != nil {
		return false, "wrong_result", "could not parse HTML"
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
		if counts[tag] < minCount {
			return false, "wrong_result", fmt.Sprintf("expected at least %d <%s> element(s)", minCount, tag)
		}
	}
	return true, "", ""
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

func countHTMLTags(raw string) (map[string]int, error) {
	counts := map[string]int{}
	z := html.NewTokenizer(strings.NewReader(raw))
	for {
		tt := z.Next()
		switch tt {
		case html.ErrorToken:
			if z.Err() == io.EOF {
				return counts, nil
			}
			return nil, z.Err()
		case html.StartTagToken, html.SelfClosingTagToken:
			name, _ := z.TagName()
			counts[string(name)]++
		}
	}
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
