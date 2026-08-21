package sandbox

import "testing"

func TestGradeHtmlCss_htmlTags_pass(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{
			map[string]any{"tag": "h1", "minCount": float64(1)},
			map[string]any{"tag": "p", "minCount": float64(1)},
		},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: "<h1>Hi</h1><p>There</p>"})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlTags_requiredAttrsAndValues(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{
			map[string]any{"tag": "img", "requiredAttrs": []any{"src", "alt"}},
			map[string]any{"tag": "input", "requiredAttrs": []any{"type"}, "attrEquals": map[string]any{"type": "email"}},
		},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<img src="cat.png" alt="Cat"><input type="email">`})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlTags_requiredAttrsFail(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{map[string]any{"tag": "img", "requiredAttrs": []any{"src", "alt"}}},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<img src="cat.png">`})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlTags_sourceIncludes(t *testing.T) {
	expected := map[string]any{
		"type":           "htmlTags",
		"sourceIncludes": []any{"<!DOCTYPE html>"},
		"tags":           []any{map[string]any{"tag": "html"}},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<!DOCTYPE html><html></html>`})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlTags_attributeReference(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{
			map[string]any{"tag": "label", "requiredAttrs": []any{"for"}},
			map[string]any{"tag": "input", "requiredAttrs": []any{"id"}},
		},
		"relations": []any{
			map[string]any{
				"kind": "attributeReference", "fromTag": "label", "fromAttr": "for", "toTag": "input", "toAttr": "id",
			},
		},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<label for="email">Email</label><input id="email">`})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}

	passed, code, _ = GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<label for="wrong">Email</label><input id="email">`})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result for broken relation, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlTags_fail(t *testing.T) {
	expected := map[string]any{
		"type": "htmlTags",
		"tags": []any{map[string]any{"tag": "h1", "minCount": float64(1)}},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: "<p>only</p>"})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_cssIncludes_pass(t *testing.T) {
	expected := map[string]any{
		"type":    "cssIncludes",
		"needles": []any{".note", "color"},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: ".note { color: blue; }"})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_cssIncludes_fail(t *testing.T) {
	expected := map[string]any{
		"type":    "cssIncludes",
		"needles": []any{"display:flex"},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{CSS: ".box { color: red; }"})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_htmlIncludes_pass(t *testing.T) {
	expected := map[string]any{
		"type":    "htmlIncludes",
		"needles": []any{`alt=`, `href=`},
	}
	passed, code, _ := GradeHtmlCss(expected, HtmlCssGradeInput{HTML: `<a href="https://example.com"><img src="a.png" alt="cat"></a>`})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_noExpected(t *testing.T) {
	passed, code, _ := GradeHtmlCss(nil, HtmlCssGradeInput{})
	if passed || code != "no_expected" {
		t.Fatalf("expected no_expected, got passed=%v code=%q", passed, code)
	}
}

func TestGradeHtmlCss_invalidType(t *testing.T) {
	passed, code, _ := GradeHtmlCss(map[string]any{"type": "pixel"}, HtmlCssGradeInput{})
	if passed || code != "invalid_expected" {
		t.Fatalf("expected invalid_expected, got passed=%v code=%q", passed, code)
	}
}
