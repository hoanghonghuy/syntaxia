package service

import (
	"context"
	"errors"
	"slices"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	fsrs "github.com/open-spaced-repetition/go-fsrs/v4"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/learning"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/validate"
)

const defaultLanguageReviewLimit = 12
const maxLanguageReviewLimit = 50
const maxLanguageReviewResponseMS = 24 * 60 * 60 * 1000

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
	if err := validate.Locale(locale); err != nil {
		return nil, err
	}
	if limit <= 0 {
		limit = defaultLanguageReviewLimit
	}
	if limit > maxLanguageReviewLimit {
		limit = maxLanguageReviewLimit
	}

	isLanguageTrack, err := s.repo.IsLanguageTrack(ctx, trackID)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, apperrors.NotFound("track not found")
	}
	if err != nil {
		return nil, apperrors.Internal(err)
	}
	if !isLanguageTrack {
		return nil, apperrors.Validation("track must be a language track")
	}

	now := time.Now().UTC()
	lessons, err := s.repo.ListCompletedLanguageLessons(ctx, userID, trackID, locale)
	if err != nil {
		return nil, apperrors.Internal(err)
	}
	for _, lesson := range lessons {
		keys := learning.LanguageReviewItemKeys(lesson.Exercise)
		if err := s.repo.SyncLanguageReviewCards(
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
	if err := validate.Locale(locale); err != nil {
		return domain.LanguageReviewCard{}, err
	}
	if rating < int(fsrs.Again) || rating > int(fsrs.Easy) {
		return domain.LanguageReviewCard{}, apperrors.Validation("rating must be between 1 and 4")
	}
	if responseMS != nil && (*responseMS < 0 || *responseMS > maxLanguageReviewResponseMS) {
		return domain.LanguageReviewCard{}, apperrors.Validation("responseMs must be between 0 and 86400000")
	}

	lesson, err := s.repo.GetCompletedLanguageLesson(ctx, userID, lessonID, locale)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.LanguageReviewCard{}, apperrors.NotFound("review item not found")
	}
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	if !slices.Contains(learning.LanguageReviewItemKeys(lesson.Exercise), itemKey) {
		return domain.LanguageReviewCard{}, apperrors.NotFound("review item not found")
	}

	before, err := s.repo.GetLanguageReviewCard(ctx, userID, lessonID, locale, itemKey)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.LanguageReviewCard{}, apperrors.NotFound("review item not found")
	}
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}

	after, log, err := scheduleLanguageReview(before, fsrs.Rating(rating), responseMS, time.Now().UTC())
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	applied, err := s.repo.SaveLanguageReviewCAS(ctx, before, after, log)
	if err != nil {
		return domain.LanguageReviewCard{}, apperrors.Internal(err)
	}
	if !applied {
		return domain.LanguageReviewCard{}, apperrors.Conflict("review state changed; retry the answer")
	}
	return after, nil
}

func scheduleLanguageReview(
	before domain.LanguageReviewCard,
	rating fsrs.Rating,
	responseMS *int,
	now time.Time,
) (domain.LanguageReviewCard, domain.LanguageReviewLog, error) {
	card, err := toFSRSCard(before)
	if err != nil {
		return domain.LanguageReviewCard{}, domain.LanguageReviewLog{}, err
	}
	scheduler := fsrs.NewFSRS(fsrs.DefaultParam())
	result, err := scheduler.Next(card, now, rating)
	if err != nil {
		return domain.LanguageReviewCard{}, domain.LanguageReviewLog{}, err
	}
	after := fromFSRSCard(before, result.Card)
	log := domain.LanguageReviewLog{
		UserID:           before.UserID,
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
	return after, log, nil
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
	if card.LastReview.IsZero() {
		base.LastReviewAt = nil
	} else {
		lastReview := card.LastReview
		base.LastReviewAt = &lastReview
	}
	return base
}
