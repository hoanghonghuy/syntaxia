package learning

import "strings"
import "unicode/utf8"

// NotePreview returns a single-line excerpt for notes hub lists.
func NotePreview(body string, maxRunes int) string {
	if maxRunes <= 0 {
		maxRunes = 80
	}
	s := strings.Join(strings.Fields(strings.TrimSpace(body)), " ")
	if s == "" {
		return ""
	}
	if utf8.RuneCountInString(s) <= maxRunes {
		return s
	}
	runes := []rune(s)
	cut := maxRunes - 1
	if cut < 1 {
		cut = 1
	}
	return strings.TrimSpace(string(runes[:cut])) + "…"
}
