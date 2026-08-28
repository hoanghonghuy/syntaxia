package service

import (
	"context"
	"strings"
	"time"

	"github.com/google/uuid"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/learning"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/validate"
)

const (
	defaultWeakSkillLimit = 5
	maxWeakSkillLimit     = 20
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

func (s *LearningService) ListWeakSkills(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	limit int,
) (domain.WeakSkillReadModel, error) {
	trackID = strings.TrimSpace(trackID)
	locale = strings.TrimSpace(locale)
	if trackID == "" || locale == "" {
		return domain.WeakSkillReadModel{}, apperrors.Validation("track and locale are required")
	}
	if err := validate.Locale(locale); err != nil {
		return domain.WeakSkillReadModel{}, err
	}
	if limit <= 0 {
		limit = defaultWeakSkillLimit
	}
	if limit > maxWeakSkillLimit {
		limit = maxWeakSkillLimit
	}

	now := time.Now().UTC()
	frontier, err := s.repo.GetLearningFrontier(ctx, userID, trackID, locale)
	if err != nil {
		return domain.WeakSkillReadModel{}, apperrors.Internal(err)
	}
	signals, err := s.repo.ListWeakSkillSignals(
		ctx,
		userID,
		trackID,
		locale,
		now.Add(-learning.WeakSkillRecentWindow),
	)
	if err != nil {
		return domain.WeakSkillReadModel{}, apperrors.Internal(err)
	}

	return domain.WeakSkillReadModel{
		TrackID:          trackID,
		Locale:           locale,
		AsOf:             now,
		RecentWindowDays: int(learning.WeakSkillRecentWindow / (24 * time.Hour)),
		Frontier:         frontier,
		Candidates:       learning.BuildWeakSkillCandidates(signals, now, limit),
	}, nil
}
