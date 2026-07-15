package service

import (
	"testing"

	"syntaxia/apps/api/internal/domain"
)

func TestUserResponse_setsHasPasswordFromHash(t *testing.T) {
	u := userResponse(domain.User{Email: "a@b.com", PasswordHash: "hash"})
	if !u.HasPassword {
		t.Fatal("expected hasPassword true")
	}
	if u.PasswordHash != "" {
		t.Fatal("password hash should be stripped")
	}
}

func TestUserResponse_googleOnlyNoPassword(t *testing.T) {
	u := userResponse(domain.User{Email: "a@b.com", HasPassword: false})
	if u.HasPassword {
		t.Fatal("expected hasPassword false")
	}
}

func TestUserResponse_preservesExplicitHasPassword(t *testing.T) {
	u := userResponse(domain.User{Email: "a@b.com", HasPassword: true})
	if !u.HasPassword {
		t.Fatal("expected hasPassword true from DB flag")
	}
}
