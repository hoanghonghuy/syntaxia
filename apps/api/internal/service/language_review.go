package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	fsrs "github.com/open-spaced-repetition/go-fsrs/v4"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/learning"
	"syntaxia/apps/api/pkg/apperrors"
)

const defaultLanguageReviewLimit = 12
const maxLanguageReviewLimit = 50

func (s *LearningService) DueLanguageReviews(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	limit int,
) ([]domain.LanguageReviewCard, error) {
	trackID = strings.TrimSpace(trackID)
	locale = strings.TrimSpace(locale)
	if trackID == "" || locale == "" {
		return nil, apperrors.Validation("track and locale are required")
	}
	if limit <= 0 {
		limit = defaultLanguageReviewLimit
	}
	if limit > maxLanguageReviewLimit {
		limit = maxLanguageReviewLimit
	}
	now := time.Now().UTC()
	lessons, err := s.repo.ListCompletedLanguageLessons(ctx, userID, trackID, locale)
	if err != nil {
		return nil, apperrors.Internal(err)
	}
	for _, lesson := range lessons {
		keys := learning.LanguageReviewItemKeys(lesson.Exercise)
		if err := s.repo.EnsureLanguageReviewCards(
			ctx, userID, lesson.TrackID, lesson.ID, lesson.Locale, keys, now,
		); err != nil {
			return nil, apperrors.Internal(err)
		}
	}
	cards, err := s.repo.ListDueLanguageReviewCards(ctx, userID, trackID, locale, now, limit)
	if err != nil {
		return nil, apperrors.Internal(err)
	}
	return cards, nil
}

func (s *LearningService) RecordLanguageReview(
	ctx context.Context,
	userID uuid.UUID,
	lessonID, locale, itemKey string,
	rating int,
	responseMS *int,
) (domain.LanguageReviewCard, error) {
	lessonID = strings.TrimSpace(lessonID)
	locale = strings.TrimSpace(locale)
	itemKey = strings.TrimSpace(itemKey)
	if lessonID == "" || locale == "" || itemKey == "" {
		return domain.LanguageReviewCard{}, apperrors.Validation("lessonId, locale and itemKey are required")
	}
	if rating < int(fsrs.Again) || rating > int(fsrs.Easy) {
		return domain.LanguageReviewCard{}, apperrors.Validation("rating must be between 1 and 4")
	}
	if responseMS != nil && *responseMS < 0 {
		return domain.LanguageReviewCard{}, apperrors.Validation("responseMs must be non-negative")
	}
	before, err := s.repo.GetLanguageReviewCard(ctx, userID, lessonID, locale, itemKey)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.LanguageReviewCard{}, apperrors.NotFound("review item not found")
	}
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	card, err := toFSRSCard(before)
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	now := time.Now().UTC()
	scheduler := fsrs.NewFSRS(fsrs.DefaultParam())
	result, err := scheduler.Next(card, now, fsrs.Rating(rating))
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	after := fromFSRSCard(before, result.Card)
	log := domain.LanguageReviewLog{
		UserID:           userID,
		TrackID:          before.TrackID,
		LessonID:         before.LessonID,
		Locale:           before.Locale,
		ItemKey:          before.ItemKey,
		Rating:           int16(rating),
		ResponseMS:       responseMS,
		ReviewedAt:       now,
		DueBefore:        before.DueAt,
		DueAfter:         after.DueAt,
		StateBefore:      before.State,
		StateAfter:       after.State,
		StabilityBefore:  before.Stability,
		StabilityAfter:   after.Stability,
		DifficultyBefore: before.Difficulty,
		DifficultyAfter:  after.Difficulty,
	}
	if err := s.repo.SaveLanguageReview(ctx, after, log); err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	return after, nil
}

func toFSRSCard(card domain.LanguageReviewCard) (fsrs.Card, error) {
	if card.ScheduledDays < 0 || card.Reps < 0 || card.Lapses < 0 {
		return fsrs.Card{}, errors.New("invalid persisted FSRS counters")
	}
	lastReview := time.Time{}
	if card.LastReviewAt != nil {
		lastReview = *card.LastReviewAt
	}
	return fsrs.Card{
		Due:            card.DueAt,
		Stability:      card.Stability,
		Difficulty:     card.Difficulty,
		ScheduledDays:  uint64(card.ScheduledDays),
		Reps:           uint64(card.Reps),
		Lapses:         uint64(card.Lapses),
		State:          fsrs.State(card.State),
		LastReview:     lastReview,
		RemainingSteps: card.RemainingSteps,
	}, nil
}

func fromFSRSCard(base domain.LanguageReviewCard, card fsrs.Card) domain.LanguageReviewCard {
	base.DueAt = card.Due
	base.Stability = card.Stability
	base.Difficulty = card.Difficulty
	base.ScheduledDays = int64(card.ScheduledDays)
	base.Reps = int64(card.Reps)
	base.Lapses = int64(card.Lapses)
	base.State = int16(card.State)
	base.RemainingSteps = card.RemainingSteps
	if !card.LastReview.IsZero() {
		lastReview := card.LastReview
		base.LastReviewAt = &lastReview
	}
	return base
}
