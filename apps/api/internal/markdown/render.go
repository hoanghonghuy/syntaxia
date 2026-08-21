package markdown

import (
	"bytes"
	"regexp"
	"strconv"
	"strings"

	"gopkg.in/yaml.v3"
)

type Document struct {
	Frontmatter map[string]any
	Body        string
}

func Parse(raw string) (Document, error) {
	raw = strings.TrimSpace(raw)
	if !strings.HasPrefix(raw, "---") {
		return Document{Body: raw}, nil
	}
	parts := strings.SplitN(raw, "---", 3)
	if len(parts) < 3 {
		return Document{Body: raw}, nil
	}
	var fm map[string]any
	frontmatter := normalizeLegacyHintScalars(parts[1])
	if err := yaml.Unmarshal([]byte(frontmatter), &fm); err != nil {
		return Document{}, err
	}
	return Document{Frontmatter: fm, Body: strings.TrimSpace(parts[2])}, nil
}

// normalizeLegacyHintScalars preserves older curriculum authoring where a
// plain hint contains YAML-looking text such as "box-sizing: border-box".
// Only list items nested under a hints: key are normalized; other frontmatter
// remains strict YAML so malformed titles/metadata still fail fast.
func normalizeLegacyHintScalars(raw string) string {
	lines := strings.Split(raw, "\n")
	hintsIndent := -1

	for i, line := range lines {
		trimmed := strings.TrimSpace(line)
		indent := len(line) - len(strings.TrimLeft(line, " \t"))

		if hintsIndent >= 0 && trimmed != "" && indent <= hintsIndent {
			hintsIndent = -1
		}
		if trimmed == "hints:" {
			hintsIndent = indent
			continue
		}
		if hintsIndent < 0 || indent <= hintsIndent {
			continue
		}

		item := strings.TrimSpace(line)
		if !strings.HasPrefix(item, "- ") {
			continue
		}
		value := strings.TrimSpace(strings.TrimPrefix(item, "- "))
		if value == "" || strings.HasPrefix(value, `"`) || strings.HasPrefix(value, `'`) || !strings.Contains(value, ": ") {
			continue
		}

		leading := line[:len(line)-len(strings.TrimLeft(line, " \t"))]
		lines[i] = leading + "- " + strconv.Quote(value)
	}

	return strings.Join(lines, "\n")
}

var (
	reInlineCode = regexp.MustCompile("`([^`]+)`")
	reBold       = regexp.MustCompile(`\*\*([^*]+)\*\*`)
	reLink       = regexp.MustCompile(`\[([^\]]+)\]\(([^)]+)\)`)
)

func SimpleRender(md string) string {
	var buf bytes.Buffer
	lines := strings.Split(md, "\n")
	inCode := false
	inList := false
	skippedLeadingH1 := false
	flushList := func() {
		if inList {
			buf.WriteString("</ul>")
			inList = false
		}
	}
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "```") {
			flushList()
			if inCode {
				buf.WriteString("</code></pre>")
				inCode = false
			} else {
				buf.WriteString("<pre><code>")
				inCode = true
			}
			continue
		}
		if inCode {
			buf.WriteString(escapeHTML(line))
			buf.WriteString("\n")
			continue
		}
		if !skippedLeadingH1 && strings.HasPrefix(trimmed, "# ") && !strings.HasPrefix(trimmed, "## ") {
			skippedLeadingH1 = true
			continue
		}
		if isTableRow(trimmed) && i+1 < len(lines) && isTableSeparator(strings.TrimSpace(lines[i+1])) {
			flushList()
			tableHTML, consumed := renderTable(lines[i:])
			buf.WriteString(tableHTML)
			i += consumed - 1
			continue
		}
		switch {
		case strings.HasPrefix(trimmed, "- ") || strings.HasPrefix(trimmed, "* "):
			if !inList {
				buf.WriteString("<ul>")
				inList = true
			}
			item := strings.TrimSpace(trimmed[2:])
			buf.WriteString("<li>" + inlineFormat(item) + "</li>")
		case strings.HasPrefix(trimmed, "### "):
			flushList()
			buf.WriteString("<h3 id=\"" + slugify(strings.TrimPrefix(trimmed, "### ")) + "\">" + inlineFormat(strings.TrimPrefix(trimmed, "### ")) + "</h3>")
		case strings.HasPrefix(trimmed, "## "):
			flushList()
			buf.WriteString("<h2 id=\"" + slugify(strings.TrimPrefix(trimmed, "## ")) + "\">" + inlineFormat(strings.TrimPrefix(trimmed, "## ")) + "</h2>")
		case strings.HasPrefix(trimmed, "# "):
			flushList()
			buf.WriteString("<h1 id=\"" + slugify(strings.TrimPrefix(trimmed, "# ")) + "\">" + inlineFormat(strings.TrimPrefix(trimmed, "# ")) + "</h1>")
		case trimmed == "":
			flushList()
			buf.WriteString("<br/>")
		default:
			flushList()
			buf.WriteString("<p>" + inlineFormat(line) + "</p>")
		}
	}
	flushList()
	if inCode {
		buf.WriteString("</code></pre>")
	}
	return buf.String()
}

func isTableRow(s string) bool {
	return strings.HasPrefix(s, "|") && strings.HasSuffix(s, "|") && strings.Count(s, "|") >= 2
}

func isTableSeparator(s string) bool {
	if !isTableRow(s) {
		return false
	}
	for _, cell := range splitTableCells(s) {
		cell = strings.TrimSpace(cell)
		if cell == "" {
			continue
		}
		for _, r := range cell {
			if r != '-' && r != ':' && r != ' ' {
				return false
			}
		}
	}
	return true
}

func splitTableCells(row string) []string {
	row = strings.TrimSpace(row)
	row = strings.TrimPrefix(row, "|")
	row = strings.TrimSuffix(row, "|")
	parts := strings.Split(row, "|")
	out := make([]string, len(parts))
	for i, p := range parts {
		out[i] = strings.TrimSpace(p)
	}
	return out
}

func renderTable(lines []string) (string, int) {
	if len(lines) < 2 {
		return "", 1
	}
	headers := splitTableCells(strings.TrimSpace(lines[0]))
	consumed := 2
	var body [][]string
	for i := 2; i < len(lines); i++ {
		trimmed := strings.TrimSpace(lines[i])
		if !isTableRow(trimmed) {
			break
		}
		body = append(body, splitTableCells(trimmed))
		consumed++
	}
	var buf strings.Builder
	buf.WriteString(`<table class="lesson-table"><thead><tr>`)
	for _, h := range headers {
		buf.WriteString("<th>" + inlineFormat(h) + "</th>")
	}
	buf.WriteString("</tr></thead><tbody>")
	for _, row := range body {
		buf.WriteString("<tr>")
		for i := 0; i < len(headers); i++ {
			cell := ""
			if i < len(row) {
				cell = row[i]
			}
			buf.WriteString("<td>" + inlineFormat(cell) + "</td>")
		}
		buf.WriteString("</tr>")
	}
	buf.WriteString("</tbody></table>")
	return buf.String(), consumed
}

func inlineFormat(s string) string {
	s = escapeHTML(s)
	s = reInlineCode.ReplaceAllString(s, "<code>$1</code>")
	s = reBold.ReplaceAllString(s, "<strong>$1</strong>")
	s = reLink.ReplaceAllString(s, `<a href="$2" rel="noopener noreferrer">$1</a>`)
	return s
}

func slugify(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	var b strings.Builder
	for _, r := range s {
		switch {
		case r >= 'a' && r <= 'z', r >= '0' && r <= '9':
			b.WriteRune(r)
		case r == ' ' || r == '-':
			b.WriteByte('-')
		}
	}
	return b.String()
}

func escapeHTML(s string) string {
	r := strings.NewReplacer("&", "&amp;", "<", "&lt;", ">", "&gt;", `"`, "&quot;")
	return r.Replace(s)
}
