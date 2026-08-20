package repository

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) IsLanguageTrack(ctx context.Context, trackID string) (bool, error) {
	var isLanguage bool
	err := r.pool.QueryRow(ctx, `
		SELECT COALESCE(category, 'sql') = 'languages'
		FROM tracks
		WHERE id = $1
	`, trackID).Scan(&isLanguage)
	return isLanguage, err
}

// SyncLanguageReviewCards keeps active review cards aligned with the currently
// published exercise definition. Review logs are intentionally left untouched.
func (r *Repository) SyncLanguageReviewCards(
	ctx context.Context,
	userID uuid.UUID,
	trackID, lessonID, locale string,
	itemKeys []string,
	due time.Time,
) error {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	seen := make(map[string]struct{}, len(itemKeys))
	keys := make([]string, 0, len(itemKeys))
	for _, itemKey := range itemKeys {
		if itemKey == "" {
			continue
		}
		if _, exists := seen[itemKey]; exists {
			continue
		}
		seen[itemKey] = struct{}{}
		keys = append(keys, itemKey)
		if _, err := tx.Exec(ctx, `
			INSERT INTO language_review_cards (
				user_id, track_id, lesson_id, locale, item_key, due_at
			) VALUES ($1, $2, $3, $4, $5, $6)
			ON CONFLICT (user_id, lesson_id, locale, item_key) DO UPDATE SET
				track_id = EXCLUDED.track_id,
				updated_at = now()
		`, userID, trackID, lessonID, locale, itemKey, due); err != nil {
			return err
		}
	}

	if len(keys) == 0 {
		if _, err := tx.Exec(ctx, `
			DELETE FROM language_review_cards
			WHERE user_id = $1 AND lesson_id = $2 AND locale = $3
		`, userID, lessonID, locale); err != nil {
			return err
		}
	} else {
		if _, err := tx.Exec(ctx, `
			DELETE FROM language_review_cards
			WHERE user_id = $1 AND lesson_id = $2 AND locale = $3
				AND NOT (item_key = ANY($4::text[]))
		`, userID, lessonID, locale, keys); err != nil {
			return err
		}
	}

	return tx.Commit(ctx)
}

func (r *Repository) GetLanguageReviewCard(
	ctx context.Context,
	userID uuid.UUID,
	lessonID, locale, itemKey string,
) (domain.LanguageReviewCard, error) {
	var card domain.LanguageReviewCard
	err := r.pool.QueryRow(ctx, `
		SELECT c.user_id, c.track_id, c.lesson_id, c.locale, c.item_key, c.due_at,
			c.stability, c.difficulty, c.scheduled_days, c.reps, c.lapses, c.state,
			c.last_review_at, c.remaining_steps
		FROM language_review_cards c
		JOIN lesson_progress p
			ON p.user_id = c.user_id AND p.lesson_id = c.lesson_id AND p.locale = c.locale
		JOIN lessons l ON l.id = c.lesson_id AND l.locale = c.locale
		JOIN tracks t ON t.id = l.track_id
		WHERE c.user_id = $1 AND c.lesson_id = $2 AND c.locale = $3 AND c.item_key = $4
			AND p.completed = true AND l.published = true AND t.category = 'languages'
	`, userID, lessonID, locale, itemKey).Scan(
		&card.UserID, &card.TrackID, &card.LessonID, &card.Locale, &card.ItemKey,
		&card.DueAt, &card.Stability, &card.Difficulty, &card.ScheduledDays,
		&card.Reps, &card.Lapses, &card.State, &card.LastReviewAt, &card.RemainingSteps,
	)
	return card, err
}

func (r *Repository) ListDueLanguageReviewCards(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	now time.Time,
	limit int,
) ([]domain.LanguageReviewCard, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT c.user_id, c.track_id, c.lesson_id, c.locale, c.item_key, c.due_at,
			c.stability, c.difficulty, c.scheduled_days, c.reps, c.lapses, c.state,
			c.last_review_at, c.remaining_steps
		FROM language_review_cards c
		JOIN lesson_progress p
			ON p.user_id = c.user_id AND p.lesson_id = c.lesson_id AND p.locale = c.locale
		JOIN lessons l ON l.id = c.lesson_id AND l.locale = c.locale
		JOIN tracks t ON t.id = l.track_id
		WHERE c.user_id = $1 AND c.track_id = $2 AND c.locale = $3 AND c.due_at <= $4
			AND p.completed = true AND l.published = true AND t.category = 'languages'
		ORDER BY c.due_at ASC, c.lesson_id ASC, c.item_key ASC
		LIMIT $5
	`, userID, trackID, locale, now, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	cards := make([]domain.LanguageReviewCard, 0)
	for rows.Next() {
		var card domain.LanguageReviewCard
		if err := rows.Scan(
			&card.UserID, &card.TrackID, &card.LessonID, &card.Locale, &card.ItemKey,
			&card.DueAt, &card.Stability, &card.Difficulty, &card.ScheduledDays,
			&card.Reps, &card.Lapses, &card.State, &card.LastReviewAt, &card.RemainingSteps,
		); err != nil {
			return nil, err
		}
		cards = append(cards, card)
	}
	return cards, rows.Err()
}

// SaveLanguageReviewCAS atomically updates a card only when it still matches
// the state that the scheduler read, then appends the review log. A false
// return means another request/device updated the card first and the caller
// must report a conflict instead of re-applying the same rating to newer state.
func (r *Repository) SaveLanguageReviewCAS(
	ctx context.Context,
	before domain.LanguageReviewCard,
	after domain.LanguageReviewCard,
	log domain.LanguageReviewLog,
) (bool, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return false, err
	}
	defer tx.Rollback(ctx)

	tag, err := tx.Exec(ctx, `
		UPDATE language_review_cards SET
			track_id = $6,
			due_at = $7,
			stability = $8,
			difficulty = $9,
			scheduled_days = $10,
			reps = $11,
			lapses = $12,
			state = $13,
			last_review_at = $14,
			remaining_steps = $15,
			updated_at = now()
		WHERE user_id = $1 AND lesson_id = $2 AND locale = $3 AND item_key = $4
			AND track_id = $5
			AND due_at = $16
			AND stability = $17
			AND difficulty = $18
			AND scheduled_days = $19
			AND reps = $20
			AND lapses = $21
			AND state = $22
			AND last_review_at IS NOT DISTINCT FROM $23
			AND remaining_steps = $24
	`, after.UserID, after.LessonID, after.Locale, after.ItemKey, before.TrackID,
		after.TrackID, after.DueAt, after.Stability, after.Difficulty, after.ScheduledDays,
		after.Reps, after.Lapses, after.State, after.LastReviewAt, after.RemainingSteps,
		before.DueAt, before.Stability, before.Difficulty, before.ScheduledDays,
		before.Reps, before.Lapses, before.State, before.LastReviewAt, before.RemainingSteps)
	if err != nil {
		return false, err
	}
	if tag.RowsAffected() != 1 {
		return false, nil
	}

	if _, err = tx.Exec(ctx, `
		INSERT INTO language_review_logs (
			user_id, track_id, lesson_id, locale, item_key, rating, response_ms,
			reviewed_at, due_before, due_after, state_before, state_after,
			stability_before, stability_after, difficulty_before, difficulty_after
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
	`, log.UserID, log.TrackID, log.LessonID, log.Locale, log.ItemKey,
		log.Rating, log.ResponseMS, log.ReviewedAt, log.DueBefore, log.DueAfter,
		log.StateBefore, log.StateAfter, log.StabilityBefore, log.StabilityAfter,
		log.DifficultyBefore, log.DifficultyAfter); err != nil {
		return false, err
	}
	if err := tx.Commit(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r *Repository) GetCompletedLanguageLesson(
	ctx context.Context,
	userID uuid.UUID,
	lessonID, locale string,
) (domain.Lesson, error) {
	var lesson domain.Lesson
	var raw []byte
	err := r.pool.QueryRow(ctx, `
		SELECT l.id, l.locale, l.track_id, l.exercise
		FROM lesson_progress p
		JOIN lessons l ON l.id = p.lesson_id AND l.locale = p.locale
		JOIN tracks t ON t.id = l.track_id
		WHERE p.user_id = $1 AND p.lesson_id = $2 AND p.locale = $3
			AND p.completed = true AND l.published = true AND t.category = 'languages'
	`, userID, lessonID, locale).Scan(&lesson.ID, &lesson.Locale, &lesson.TrackID, &raw)
	if err != nil {
		return lesson, err
	}
	if len(raw) > 0 {
		if err := json.Unmarshal(raw, &lesson.Exercise); err != nil {
			return domain.Lesson{}, err
		}
	}
	return lesson, nil
}

func (r *Repository) ListCompletedLanguageLessons(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) ([]domain.Lesson, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT l.id, l.locale, l.track_id, l.exercise
		FROM lesson_progress p
		JOIN lessons l ON l.id = p.lesson_id AND l.locale = p.locale
		JOIN tracks t ON t.id = l.track_id
		WHERE p.user_id = $1 AND p.completed = true
			AND l.track_id = $2 AND l.locale = $3
			AND l.published = true AND t.category = 'languages'
		ORDER BY l.sort_order ASC
	`, userID, trackID, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	lessons := make([]domain.Lesson, 0)
	for rows.Next() {
		var lesson domain.Lesson
		var raw []byte
		if err := rows.Scan(&lesson.ID, &lesson.Locale, &lesson.TrackID, &raw); err != nil {
			return nil, err
		}
		if len(raw) > 0 {
			if err := json.Unmarshal(raw, &lesson.Exercise); err != nil {
				return nil, err
			}
		}
		lessons = append(lessons, lesson)
	}
	return lessons, rows.Err()
}
