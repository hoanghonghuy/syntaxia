package validate

import (
	"net/mail"
	"strings"
	"unicode/utf8"

	"syntaxia/apps/api/pkg/apperrors"
)

func Email(email string) error {
	email = strings.TrimSpace(email)
	if email == "" {
		return apperrors.Validation("email is required")
	}
	if _, err := mail.ParseAddress(email); err != nil {
		return apperrors.Validation("invalid email")
	}
	return nil
}

func Password(password string) error {
	if utf8.RuneCountInString(password) < 8 {
		return apperrors.Validation("password must be at least 8 characters")
	}
	return nil
}

func PasswordsDiffer(current, next string) error {
	if current == next {
		return apperrors.Validation("new password must differ from current password")
	}
	return nil
}

func DisplayName(name string) error {
	name = strings.TrimSpace(name)
	if name == "" {
		return apperrors.Validation("display name is required")
	}
	if utf8.RuneCountInString(name) > 80 {
		return apperrors.Validation("display name must be at most 80 characters")
	}
	return nil
}

func Required(field, value string) error {
	if strings.TrimSpace(value) == "" {
		return apperrors.Validation(field + " is required")
	}
	return nil
}

func Locale(locale string) error {
	switch locale {
	case "en", "vi":
		return nil
	default:
		return apperrors.Validation("unsupported locale")
	}
}
