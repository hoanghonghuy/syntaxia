package repository

import (
	"context"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) EnsureLanguageReviewCards(
	ctx context.Context,
	userID uuid.UUID,
	trackID, lessonID, locale string,
	itemKeys []string,
	due time.Time,
) error {
	if len(itemKeys) == 0 {
		return nil
	}
	batch := &pgx.Batch{}
	for _, itemKey := range itemKeys {
		batch.Queue(`
			INSERT INTO language_review_cards (
				user_id, track_id, lesson_id, locale, item_key, due_at
			) VALUES ($1, $2, $3, $4, $5, $6)
			ON CONFLICT (user_id, lesson_id, locale, item_key) DO NOTHING
		`, userID, trackID, lessonID, locale, itemKey, due)
	}
	results := r.pool.SendBatch(ctx, batch)
	defer results.Close()
	for range itemKeys {
		if _, err := results.Exec(); err != nil {
			return err
		}
	}
	return nil
}

func (r *Repository) GetLanguageReviewCard(
	ctx context.Context,
	userID uuid.UUID,
	lessonID, locale, itemKey string,
) (domain.LanguageReviewCard, error) {
	var card domain.LanguageReviewCard
	err := r.pool.QueryRow(ctx, `
		SELECT user_id, track_id, lesson_id, locale, item_key, due_at,
			stability, difficulty, scheduled_days, reps, lapses, state,
			last_review_at, remaining_steps
		FROM language_review_cards
		WHERE user_id = $1 AND lesson_id = $2 AND locale = $3 AND item_key = $4
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
		SELECT user_id, track_id, lesson_id, locale, item_key, due_at,
			stability, difficulty, scheduled_days, reps, lapses, state,
			last_review_at, remaining_steps
		FROM language_review_cards
		WHERE user_id = $1 AND track_id = $2 AND locale = $3 AND due_at <= $4
		ORDER BY due_at ASC, lesson_id ASC, item_key ASC
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

func (r *Repository) SaveLanguageReview(
	ctx context.Context,
	card domain.LanguageReviewCard,
	log domain.LanguageReviewLog,
) error {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)
	_, err = tx.Exec(ctx, `
		INSERT INTO language_review_cards (
			user_id, track_id, lesson_id, locale, item_key, due_at,
			stability, difficulty, scheduled_days, reps, lapses, state,
			last_review_at, remaining_steps, updated_at
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,now())
		ON CONFLICT (user_id, lesson_id, locale, item_key) DO UPDATE SET
			track_id = EXCLUDED.track_id,
			due_at = EXCLUDED.due_at,
			stability = EXCLUDED.stability,
			difficulty = EXCLUDED.difficulty,
			scheduled_days = EXCLUDED.scheduled_days,
			reps = EXCLUDED.reps,
			lapses = EXCLUDED.lapses,
			state = EXCLUDED.state,
			last_review_at = EXCLUDED.last_review_at,
			remaining_steps = EXCLUDED.remaining_steps,
			updated_at = now()
	`, card.UserID, card.TrackID, card.LessonID, card.Locale, card.ItemKey,
		card.DueAt, card.Stability, card.Difficulty, card.ScheduledDays, card.Reps,
		card.Lapses, card.State, card.LastReviewAt, card.RemainingSteps)
	if err != nil {
		return err
	}
	_, err = tx.Exec(ctx, `
		INSERT INTO language_review_logs (
			user_id, track_id, lesson_id, locale, item_key, rating, response_ms,
			reviewed_at, due_before, due_after, state_before, state_after,
			stability_before, stability_after, difficulty_before, difficulty_after
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
	`, log.UserID, log.TrackID, log.LessonID, log.Locale, log.ItemKey,
		log.Rating, log.ResponseMS, log.ReviewedAt, log.DueBefore, log.DueAfter,
		log.StateBefore, log.StateAfter, log.StabilityBefore, log.StabilityAfter,
		log.DifficultyBefore, log.DifficultyAfter)
	if err != nil {
		return err
	}
	return tx.Commit(ctx)
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
