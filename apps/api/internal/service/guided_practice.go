package service

import (
	"context"
	"strings"

	"github.com/google/uuid"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/learning"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/validate"
)

func (s *LearningService) GetGuidedPracticeEligibility(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) (domain.GuidedPracticeEligibility, error) {
	trackID = strings.TrimSpace(trackID)
	locale = strings.TrimSpace(locale)
	if trackID == "" || locale == "" {
		return domain.GuidedPracticeEligibility{}, apperrors.Validation("track and locale are required")
	}
	if trackID != learning.EnglishGuidedPracticeTrackID {
		return domain.GuidedPracticeEligibility{}, apperrors.Validation("guided practice v1 is only available for english-basics")
	}
	if err := validate.Locale(locale); err != nil {
		return domain.GuidedPracticeEligibility{}, err
	}

	blueprints := learning.EnglishGuidedPracticeBlueprints()
	if err := learning.ValidateGuidedPracticeBlueprints(blueprints); err != nil {
		return domain.GuidedPracticeEligibility{}, apperrors.Internal(err)
	}
	lessons, err := s.repo.ListLessons(ctx, trackID, locale, true)
	if err != nil {
		return domain.GuidedPracticeEligibility{}, apperrors.Internal(err)
	}
	progress, err := s.repo.ListProgress(ctx, userID)
	if err != nil {
		return domain.GuidedPracticeEligibility{}, apperrors.Internal(err)
	}
	return learning.EvaluateGuidedPracticeEligibility(trackID, locale, blueprints, lessons, progress), nil
}
