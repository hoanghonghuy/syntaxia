package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) CountDueLanguageReviewCards(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	now time.Time,
) (int, error) {
	var count int
	err := r.pool.QueryRow(ctx, `
		SELECT COUNT(*)
		FROM language_review_cards c
		JOIN lesson_progress p
			ON p.user_id = c.user_id AND p.lesson_id = c.lesson_id AND p.locale = c.locale
		JOIN lessons l ON l.id = c.lesson_id AND l.locale = c.locale
		JOIN tracks t ON t.id = l.track_id
		WHERE c.user_id = $1 AND c.track_id = $2 AND c.locale = $3 AND c.due_at <= $4
			AND p.completed = true AND l.published = true AND t.category = 'languages'
	`, userID, trackID, locale, now).Scan(&count)
	return count, err
}

func (r *Repository) GetNextPublishedLearningLesson(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) (*domain.LearningLessonRef, error) {
	var lesson domain.LearningLessonRef
	err := r.pool.QueryRow(ctx, `
		SELECT l.id, l.slug, l.title, l.sort_order
		FROM lessons l
		LEFT JOIN lesson_progress p
			ON p.user_id = $1 AND p.lesson_id = l.id AND p.locale = l.locale
		WHERE l.track_id = $2
			AND l.locale = $3
			AND l.published = true
			AND COALESCE(p.completed, false) = false
		ORDER BY l.sort_order ASC, l.id ASC
		LIMIT 1
	`, userID, trackID, locale).Scan(
		&lesson.LessonID,
		&lesson.Slug,
		&lesson.Title,
		&lesson.SortOrder,
	)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &lesson, nil
}
