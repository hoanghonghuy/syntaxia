package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

const DevJWTDefault = "dev-secret-change-me"

type Config struct {
	Port                 string
	DatabaseURL          string
	JWTSecret            string
	CORSOrigins          []string
	GoogleClientID       string
	GoogleClientSecret   string
	GoogleRedirectURL    string
	GoogleDriveFolderID  string
	GoogleDriveCredsFile string
	CurriculumLocalPath  string
	WebBaseURL           string
	SandboxDatabaseURL   string
	BootstrapAdminEmail  string
}

func Load() Config {
	port := getenv("API_PORT", "8080")
	dbURL := getenv("DATABASE_URL", "postgres://syntaxia:syntaxia@localhost:5432/syntaxia?sslmode=disable")
	sandboxURL := getenv("SANDBOX_DATABASE_URL", "postgres://syntaxia_sandbox:syntaxia_sandbox@localhost:5432/syntaxia?sslmode=disable")
	cors := strings.Split(getenv("CORS_ORIGINS", "http://localhost:3001"), ",")
	for i := range cors {
		cors[i] = strings.TrimSpace(cors[i])
	}
	return Config{
		Port:                 port,
		DatabaseURL:          dbURL,
		JWTSecret:            getenv("JWT_SECRET", DevJWTDefault),
		CORSOrigins:          cors,
		GoogleClientID:       os.Getenv("GOOGLE_CLIENT_ID"),
		GoogleClientSecret:   os.Getenv("GOOGLE_CLIENT_SECRET"),
		GoogleRedirectURL:    getenv("GOOGLE_REDIRECT_URL", "http://localhost:8082/api/v1/auth/google/callback"),
		GoogleDriveFolderID:  os.Getenv("GOOGLE_DRIVE_FOLDER_ID"),
		GoogleDriveCredsFile: os.Getenv("GOOGLE_DRIVE_CREDENTIALS_FILE"),
		CurriculumLocalPath:  getenv("CURRICULUM_LOCAL_PATH", "../../docs/curriculum"),
		WebBaseURL:           getenv("WEB_BASE_URL", "http://localhost:3001"),
		SandboxDatabaseURL:   sandboxURL,
		BootstrapAdminEmail:  strings.ToLower(strings.TrimSpace(os.Getenv("BOOTSTRAP_ADMIN_EMAIL"))),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func (c Config) PortInt() int {
	p, _ := strconv.Atoi(c.Port)
	if p == 0 {
		return 8080
	}
	return p
}

// CookieSecure is true when the web app is served over HTTPS.
func (c Config) CookieSecure() bool {
	return strings.HasPrefix(strings.ToLower(c.WebBaseURL), "https://")
}

// Validate checks deployment-critical settings.
func (c Config) Validate() error {
	return ValidateJWTSecret(c.JWTSecret)
}

// ValidateJWTSecret rejects the dev default in production.
func ValidateJWTSecret(secret string) error {
	if secret == "" || secret == DevJWTDefault {
		if isProductionEnv() {
			return fmt.Errorf("JWT_SECRET must be set to a strong value in production")
		}
	}
	return nil
}

func isProductionEnv() bool {
	switch strings.ToLower(os.Getenv("APP_ENV")) {
	case "production", "prod":
		return true
	default:
		return false
	}
}
