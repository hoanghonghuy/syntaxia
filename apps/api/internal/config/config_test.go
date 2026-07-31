package config

import "testing"

func TestCookieSecure(t *testing.T) {
	httpsCfg := Config{WebBaseURL: "https://app.example.com"}
	if !httpsCfg.CookieSecure() {
		t.Fatal("expected secure for https base URL")
	}
	httpCfg := Config{WebBaseURL: "http://localhost:3001"}
	if httpCfg.CookieSecure() {
		t.Fatal("expected insecure for http localhost")
	}
}

func TestValidateJWTSecret_productionRequiresStrongSecret(t *testing.T) {
	t.Setenv("APP_ENV", "production")
	if err := ValidateJWTSecret("dev-secret-change-me"); err == nil {
		t.Fatal("expected error for dev default in production")
	}
	if err := ValidateJWTSecret("a-real-production-secret"); err != nil {
		t.Fatalf("expected ok: %v", err)
	}
}

func TestValidateJWTSecret_devAllowsDefault(t *testing.T) {
	t.Setenv("APP_ENV", "")
	if err := ValidateJWTSecret(DevJWTDefault); err != nil {
		t.Fatalf("expected ok in non-production: %v", err)
	}
}

func TestLoad_prefersPORTOverAPIPort(t *testing.T) {
	t.Setenv("PORT", "10000")
	t.Setenv("API_PORT", "8080")
	cfg := Load()
	if cfg.Port != "10000" {
		t.Fatalf("expected PORT=10000 to win, got %q", cfg.Port)
	}
}

func TestLoad_fallsBackToAPIPort(t *testing.T) {
	t.Setenv("PORT", "")
	t.Setenv("API_PORT", "9090")
	cfg := Load()
	if cfg.Port != "9090" {
		t.Fatalf("expected API_PORT fallback, got %q", cfg.Port)
	}
}
