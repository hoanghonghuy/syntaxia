package auth

import (
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
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

func TestTokenRejectsUnexpectedSigningMethod(t *testing.T) {
	svc := NewTokenService("test-secret")
	claims := Claims{
		UserID: uuid.New(),
		Email:  "a@b.com",
		Role:   "learner",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, claims)
	signed, err := token.SignedString([]byte("test-secret"))
	if err != nil {
		t.Fatal(err)
	}
	if _, err := svc.Parse(signed); err == nil {
		t.Fatal("expected HS512 token to be rejected")
	}
}
