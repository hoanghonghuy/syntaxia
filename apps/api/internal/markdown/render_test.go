package markdown

import (
	"strings"
	"testing"
)

func TestParseNormalizesLegacyHintScalarWithColon(t *testing.T) {
	doc, err := Parse(`---
id: css-test
track: css-basics
slug: css-test
exercise:
  hints:
    - Use box-sizing: border-box for predictable sizing.
---
Body`)
	if err != nil {
		t.Fatal(err)
	}
	exercise, ok := doc.Frontmatter["exercise"].(map[string]any)
	if !ok {
		t.Fatalf("exercise=%T", doc.Frontmatter["exercise"])
	}
	hints, ok := exercise["hints"].([]any)
	if !ok || len(hints) != 1 || hints[0] != "Use box-sizing: border-box for predictable sizing." {
		t.Fatalf("hints=%#v", exercise["hints"])
	}
}

func TestParseKeepsNonHintFrontmatterStrict(t *testing.T) {
	_, err := Parse(`---
id: bad-title
track: english-basics
slug: bad-title
title: Review: greetings
---
Body`)
	if err == nil {
		t.Fatal("expected malformed non-hint frontmatter to fail")
	}
}

func TestSimpleRenderInlineAndList(t *testing.T) {
	html := SimpleRender("## Try it\n\nUse `SELECT` and **JOIN**.\n\n- One\n- Two\n")
	if !strings.Contains(html, "<h2 id=\"try-it\">") {
		t.Fatalf("missing heading id: %s", html)
	}
	if !strings.Contains(html, "<code>SELECT</code>") {
		t.Fatalf("missing inline code: %s", html)
	}
	if !strings.Contains(html, "<strong>JOIN</strong>") {
		t.Fatalf("missing bold: %s", html)
	}
	if !strings.Contains(html, "<ul><li>") {
		t.Fatalf("missing list: %s", html)
	}
}

func TestSimpleRenderSkipsLeadingH1(t *testing.T) {
	html := SimpleRender("# Writing SQL Queries\n\nHello tables.\n")
	if strings.Contains(html, "<h1") {
		t.Fatalf("leading H1 should be skipped (page title owns H1): %s", html)
	}
	if !strings.Contains(html, "<p>Hello tables.</p>") {
		t.Fatalf("body paragraph missing: %s", html)
	}
}

func TestSimpleRenderMarkdownTable(t *testing.T) {
	md := "Sample data:\n\n| title | year |\n| --- | --- |\n| Inception | 2010 |\n| The Matrix | 1999 |\n"
	html := SimpleRender(md)
	if !strings.Contains(html, "<table") || !strings.Contains(html, "<th>") {
		t.Fatalf("expected table header: %s", html)
	}
	if !strings.Contains(html, "<td>Inception</td>") {
		t.Fatalf("expected table cell: %s", html)
	}
}
