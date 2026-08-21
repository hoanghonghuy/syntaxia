package sandbox

import "testing"

func TestGradeHtmlCss_htmlTags_pass(t *testing.T) {
	expected := map[string]any{"type": "htmlTags", "tags": []any{map[string]any{"tag": "h1"}, map[string]any{"tag": "p"}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: "<h1>Hi</h1><p>There</p>"})
	if !passed || code != "" { t.Fatalf("expected pass, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_htmlTags_requiredAttrsAndRelations(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{map[string]any{"tag": "label", "requiredAttrs": []any{"for"}}, map[string]any{"tag": "input", "requiredAttrs": []any{"id", "type"}, "attrEquals": map[string]any{"type": "email"}}},
		"relations": []any{map[string]any{"kind": "attributeReference", "fromTag": "label", "fromAttr": "for", "toTag": "input", "toAttr": "id"}},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<label for="email">Email</label><input id="email" type="email">`})
	if !passed || code != "" { t.Fatalf("expected pass, got passed=%v code=%q", passed, code) }
	passed, code, _ = GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<label for="wrong">Email</label><input id="email" type="email">`})
	if passed || code != "wrong_result" { t.Fatalf("expected relation failure, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_htmlTags_sharedAttributeValue(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{map[string]any{"tag": "input", "minCount": float64(2), "attrEquals": map[string]any{"type": "radio"}}},
		"relations": []any{map[string]any{"kind": "sharedAttributeValue", "tag": "input", "attr": "name", "minCount": float64(2), "attrEquals": map[string]any{"type": "radio"}}},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<input type="radio" name="plan"><input type="radio" name="plan">`})
	if !passed || code != "" { t.Fatalf("expected pass, got passed=%v code=%q", passed, code) }
	passed, code, _ = GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<input type="radio" name="a"><input type="radio" name="b">`})
	if passed || code != "wrong_result" { t.Fatalf("expected shared-name failure, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_htmlTags_maxCount(t *testing.T) {
	expected := map[string]any{"type": "htmlTags", "tags": []any{map[string]any{"tag": "main", "minCount": float64(1), "maxCount": float64(1)}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<main>A</main><main>B</main>`})
	if passed || code != "wrong_result" { t.Fatalf("expected max-count failure, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssRules_pass(t *testing.T) {
	expected := map[string]any{
		"type": "cssRules",
		"rules": []any{
			map[string]any{"selector": ".note", "declarations": map[string]any{"color": "blue", "font-size": "1.25rem"}},
		},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `.note { color: BLUE; font-size: 1.25rem; }`})
	if !passed || code != "" { t.Fatalf("expected pass, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssRules_selectorList_pass(t *testing.T) {
	expected := map[string]any{"type": "cssRules", "rules": []any{map[string]any{"selector": "h2", "declarations": map[string]any{"color": "navy"}}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `h1, h2 { color: navy; }`})
	if !passed || code != "" { t.Fatalf("expected selector-list pass, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssRules_wrongSelectorFails(t *testing.T) {
	expected := map[string]any{"type": "cssRules", "rules": []any{map[string]any{"selector": ".note", "declarations": map[string]any{"color": "blue"}}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `p { color: blue; }`})
	if passed || code != "wrong_result" { t.Fatalf("expected wrong selector failure, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssRules_commentCannotSpoof(t *testing.T) {
	expected := map[string]any{"type": "cssRules", "rules": []any{map[string]any{"selector": ".note", "declarations": map[string]any{"color": "blue"}}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `/* .note { color: blue; } */ p { color: blue; }`})
	if passed || code != "wrong_result" { t.Fatalf("expected comment spoof failure, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssRules_combinatorWhitespace(t *testing.T) {
	expected := map[string]any{"type": "cssRules", "rules": []any{map[string]any{"selector": "ul>li", "declarations": map[string]any{"color": "green"}}}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `ul > li { color: green; }`})
	if !passed || code != "" { t.Fatalf("expected combinator pass, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_cssIncludes_legacyPass(t *testing.T) {
	expected := map[string]any{"type": "cssIncludes", "needles": []any{".note", "color"}}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: `.note { color: blue; }`})
	if !passed || code != "" { t.Fatalf("expected legacy pass, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_noExpected(t *testing.T) {
	passed, code, _ := GradeHtmlCss(nil, HtmlCssGradeInput{})
	if passed || code != "no_expected" { t.Fatalf("expected no_expected, got passed=%v code=%q", passed, code) }
}

func TestGradeHtmlCss_invalidType(t *testing.T) {
	passed, code, _ := GradeHtmlCss(map[string]any{"type": "pixel"}, HtmlCssGradeInput{})
	if passed || code != "invalid_expected" { t.Fatalf("expected invalid_expected, got passed=%v code=%q", passed, code) }
}
