package validate

import (
	"strings"
	"unicode/utf8"

	"syntaxia/apps/api/pkg/apperrors"
)

const MaxNoteBodyRunes = 10_000

// SafeRedirectPath returns a same-origin relative path safe for post-auth redirects.
func SafeRedirectPath(path string) string {
	path = strings.TrimSpace(path)
	if path == "" || !strings.HasPrefix(path, "/") || strings.HasPrefix(path, "//") {
		return "/"
	}
	return path
}

func NoteBody(body string) error {
	if utf8.RuneCountInString(body) > MaxNoteBodyRunes {
		return apperrors.Validation("note body is too long")
	}
	return nil
}
