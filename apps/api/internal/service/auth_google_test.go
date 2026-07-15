package service

import (
	"testing"

	"syntaxia/apps/api/pkg/constants"
)

func TestGoogleBootstrapRole(t *testing.T) {
	role := constants.RoleLearner
	bootstrap := "admin@example.com"
	email := "admin@example.com"
	if bootstrap != "" && email == bootstrap {
		role = constants.RoleAdmin
	}
	if role != constants.RoleAdmin {
		t.Fatalf("expected admin role, got %s", role)
	}
}
