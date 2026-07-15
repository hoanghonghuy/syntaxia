package service

import "syntaxia/apps/api/internal/domain"

// userResponse strips secret fields and exposes hasPassword for API clients.
func userResponse(u domain.User) domain.User {
	if u.PasswordHash != "" {
		u.HasPassword = true
	}
	u.PasswordHash = ""
	u.GoogleID = nil
	return u
}
