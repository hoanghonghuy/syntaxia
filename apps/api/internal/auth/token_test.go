package auth

import (
	"testing"

	"github.com/google/uuid"
)

func TestTokenRoundTrip(t *testing.T) {
	svc := NewTokenService("test-secret")
	id := uuid.New()
	token, err := svc.Sign(id, "a@b.com", "learner")
	if err != nil {
		t.Fatal(err)
	}
	claims, err := svc.Parse(token)
	if err != nil {
		t.Fatal(err)
	}
	if claims.UserID != id || claims.Email != "a@b.com" {
		t.Fatalf("unexpected claims: %+v", claims)
	}
}
