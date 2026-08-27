package service

import (
	"context"
	"strings"

	"github.com/google/uuid"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/validate"
)

func (s *LearningService) ListSkillMastery(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) ([]domain.SkillMastery, error) {
	trackID = strings.TrimSpace(trackID)
	locale = strings.TrimSpace(locale)
	if trackID == "" || locale == "" {
		return nil, apperrors.Validation("track and locale are required")
	}
	if err := validate.Locale(locale); err != nil {
		return nil, err
	}
	mastery, err := s.repo.ListSkillMastery(ctx, userID, trackID, locale)
	if err != nil {
		return nil, apperrors.Internal(err)
	}
	return mastery, nil
}
