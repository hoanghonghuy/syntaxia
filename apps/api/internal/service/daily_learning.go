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

const dailyWeakSkillLimit = 3

func (s *LearningService) GetDailyLearningSession(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	targetMinutes int,
) (domain.DailyLearningSession, error) {
	trackID = strings.TrimSpace(trackID)
	locale = strings.TrimSpace(locale)
	if trackID == "" || locale == "" {
		return domain.DailyLearningSession{}, apperrors.Validation("track and locale are required")
	}
	if err := validate.Locale(locale); err != nil {
		return domain.DailyLearningSession{}, err
	}
	if targetMinutes <= 0 {
		targetMinutes = learning.DefaultDailyTargetMinutes
	}
	if targetMinutes < learning.MinDailyTargetMinutes || targetMinutes > learning.MaxDailyTargetMinutes {
		return domain.DailyLearningSession{}, apperrors.Validation("targetMinutes must be between 10 and 30")
	}

	weakModel, err := s.ListWeakSkills(ctx, userID, trackID, locale, dailyWeakSkillLimit)
	if err != nil {
		return domain.DailyLearningSession{}, err
	}
	now := weakModel.AsOf
	if now.IsZero() {
		now = time.Now().UTC()
	}

	dueCount, err := s.repo.CountDueLanguageReviewCards(ctx, userID, trackID, locale, now)
	if err != nil {
		return domain.DailyLearningSession{}, apperrors.Internal(err)
	}
	nextLesson, err := s.repo.GetNextPublishedLearningLesson(ctx, userID, trackID, locale)
	if err != nil {
		return domain.DailyLearningSession{}, apperrors.Internal(err)
	}

	session := learning.ComposeDailyLearningSession(trackID, locale, targetMinutes, learning.DailySessionInput{
		DueReviewCount: dueCount,
		WeakSkills:     weakModel.Candidates,
		NextLesson:     nextLesson,
	})
	session.AsOf = now
	return session, nil
}
