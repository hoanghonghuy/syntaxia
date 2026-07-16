package sandbox

import "testing"

// Smoke: curriculum HTML/CSS exercise solutions must pass GradeHtmlCss.
func TestCurriculumHtmlCssSolutionsSmoke(t *testing.T) {
	cases := []struct {
		name     string
		expected map[string]any
		html     string
		css      string
	}{
		{
			"what-is-html",
			map[string]any{"type": "htmlTags", "tags": []any{map[string]any{"tag": "p", "minCount": 1}}},
			"<p>HTML marks up meaning.</p>", "",
		},
		{
			"document-structure",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "html", "minCount": 1},
					map[string]any{"tag": "head", "minCount": 1},
					map[string]any{"tag": "body", "minCount": 1},
					map[string]any{"tag": "title", "minCount": 1},
				},
			},
			"<!DOCTYPE html><html><head><title>My Page</title></head><body><p>Hello</p></body></html>", "",
		},
		{
			"headings-and-paragraphs",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "h1", "minCount": 1},
					map[string]any{"tag": "p", "minCount": 1},
				},
			},
			"<h1>Welcome</h1><p>This is a short paragraph.</p>", "",
		},
		{
			"emphasis-and-importance",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "em", "minCount": 1},
					map[string]any{"tag": "strong", "minCount": 1},
				},
			},
			"<p><em>quietly</em> and <strong>important</strong></p>", "",
		},
		{
			"lists",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "ul", "minCount": 1},
					map[string]any{"tag": "li", "minCount": 2},
				},
			},
			"<ul><li>One</li><li>Two</li></ul>", "",
		},
		{
			"links",
			map[string]any{"type": "htmlIncludes", "needles": []any{"href="}},
			`<a href="https://example.com">Example</a>`, "",
		},
		{
			"images",
			map[string]any{"type": "htmlIncludes", "needles": []any{"alt=", "<img"}},
			`<img src="cat.png" alt="A cat">`, "",
		},
		{
			"semantic-landmarks",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "header", "minCount": 1},
					map[string]any{"tag": "main", "minCount": 1},
					map[string]any{"tag": "footer", "minCount": 1},
				},
			},
			"<header>Top</header><main>Content</main><footer>Bottom</footer>", "",
		},
		{
			"tables",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "table", "minCount": 1},
					map[string]any{"tag": "tr", "minCount": 1},
					map[string]any{"tag": "th", "minCount": 1},
					map[string]any{"tag": "td", "minCount": 1},
				},
			},
			"<table><tr><th>Name</th><td>Alex</td></tr></table>", "",
		},
		{
			"forms-basics",
			map[string]any{
				"type": "htmlTags",
				"tags": []any{
					map[string]any{"tag": "form", "minCount": 1},
					map[string]any{"tag": "label", "minCount": 1},
					map[string]any{"tag": "input", "minCount": 1},
					map[string]any{"tag": "button", "minCount": 1},
				},
			},
			`<form><label for="email">Email</label><input id="email"><button>Send</button></form>`, "",
		},
		{
			"form-controls",
			map[string]any{"type": "htmlIncludes", "needles": []any{`type="checkbox"`, "<select"}},
			`<label><input type="checkbox"> Agree</label><select><option>One</option></select>`, "",
		},
		{
			"html-entities",
			map[string]any{"type": "htmlIncludes", "needles": []any{"&amp;"}},
			"<p>AT&amp;T</p>", "",
		},
		{
			"what-is-css",
			map[string]any{"type": "cssIncludes", "needles": []any{"color"}},
			"", "h1 { color: teal; }",
		},
		{
			"css-syntax",
			map[string]any{"type": "cssIncludes", "needles": []any{".note", "{", "color"}},
			"", ".note { color: blue; }",
		},
		{
			"type-class-id-selectors",
			map[string]any{"type": "cssIncludes", "needles": []any{".note", "#hero"}},
			"", ".note { color: navy; }\n#hero { font-weight: bold; }",
		},
		{
			"combinators-and-groups",
			map[string]any{"type": "cssIncludes", "needles": []any{"article p"}},
			"", "article p { color: green; }",
		},
		{
			"pseudo-classes",
			map[string]any{"type": "cssIncludes", "needles": []any{":hover"}},
			"", "a:hover { color: orange; }",
		},
		{
			"cascade-and-specificity",
			map[string]any{"type": "cssIncludes", "needles": []any{".note", "color"}},
			"", ".note { color: purple; }",
		},
		{
			"box-model",
			map[string]any{"type": "cssIncludes", "needles": []any{"padding", "margin"}},
			"", ".box { padding: 1rem; margin: 1rem; }",
		},
		{
			"colors-and-units",
			map[string]any{"type": "cssIncludes", "needles": []any{"rem", "color"}},
			"", ".note { color: teal; font-size: 1.25rem; }",
		},
		{
			"text-and-fonts",
			map[string]any{"type": "cssIncludes", "needles": []any{"font-family"}},
			"", ".note { font-family: Georgia, serif; }",
		},
		{
			"backgrounds-and-borders",
			map[string]any{"type": "cssIncludes", "needles": []any{"border-radius", "background"}},
			"", ".card { background: #eef; border-radius: 8px; }",
		},
		{
			"display-and-flow",
			map[string]any{"type": "cssIncludes", "needles": []any{"display"}},
			"", ".box { display: inline-block; }",
		},
		{
			"styling-lists-and-links",
			map[string]any{"type": "cssIncludes", "needles": []any{"list-style", "text-decoration"}},
			"", ".menu { list-style: none; }\n.menu a { text-decoration: none; }",
		},
		{
			"sizing-and-overflow",
			map[string]any{"type": "cssIncludes", "needles": []any{"max-width", "overflow"}},
			"", ".panel { max-width: 12rem; overflow: auto; }",
		},
		{
			"flexbox-basics",
			map[string]any{"type": "cssIncludes", "needles": []any{"display: flex", "gap"}},
			"", ".row { display: flex; gap: 1rem; }",
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			passed, code, msg := GradeHtmlCss(tc.expected, HtmlCssGradeInput{HTML: tc.html, CSS: tc.css})
			if !passed {
				t.Fatalf("expected pass for %s, got code=%q msg=%q", tc.name, code, msg)
			}
		})
	}
}
