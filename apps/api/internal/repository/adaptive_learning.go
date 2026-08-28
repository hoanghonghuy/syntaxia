package repository

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) ListSkillMastery(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) ([]domain.SkillMastery, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT track_id, locale, skill_id, score, evidence_count, evidence_weight, last_evidence_at
		FROM learner_skill_mastery
		WHERE user_id = $1
			AND ($2 = '' OR track_id = $2)
			AND ($3 = '' OR locale = $3)
		ORDER BY score ASC, skill_id ASC
	`, userID, trackID, locale)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := make([]domain.SkillMastery, 0)
	for rows.Next() {
		var mastery domain.SkillMastery
		if err := rows.Scan(
			&mastery.TrackID,
			&mastery.Locale,
			&mastery.SkillID,
			&mastery.Score,
			&mastery.EvidenceCount,
			&mastery.EvidenceWeight,
			&mastery.LastEvidenceAt,
		); err != nil {
			return nil, err
		}
		out = append(out, mastery)
	}
	return out, rows.Err()
}

func (r *Repository) GetLearningFrontier(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) (*domain.LearningLessonRef, error) {
	var lesson domain.LearningLessonRef
	err := r.pool.QueryRow(ctx, `
		SELECT l.id, l.slug, l.title, l.sort_order
		FROM lesson_progress p
		JOIN lessons l ON l.id = p.lesson_id AND l.locale = p.locale
		WHERE p.user_id = $1
			AND p.completed = true
			AND l.track_id = $2
			AND l.locale = $3
			AND l.published = true
		ORDER BY l.sort_order DESC, p.completed_at DESC NULLS LAST, l.id DESC
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

func (r *Repository) ListWeakSkillSignals(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
	recentSince time.Time,
) ([]domain.WeakSkillSignal, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT
			m.track_id,
			m.locale,
			m.skill_id,
			m.score,
			m.evidence_count,
			m.evidence_weight,
			m.last_evidence_at,
			COALESCE(mistakes.recent_mistakes, 0),
			mistakes.last_mistake_at,
			review.next_review_at,
			COALESCE(repair.lesson_id, ''),
			COALESCE(repair.slug, ''),
			COALESCE(repair.title, ''),
			COALESCE(repair.sort_order, 0)
		FROM learner_skill_mastery m
		LEFT JOIN LATERAL (
			SELECT COUNT(DISTINCT a.id) AS recent_mistakes,
				MAX(a.graded_at) AS last_mistake_at
			FROM language_attempt_logs a
			JOIN skill_evidence se ON se.attempt_log_id = a.id
			WHERE se.user_id = m.user_id
				AND se.track_id = m.track_id
				AND se.locale = m.locale
				AND se.skill_id = m.skill_id
				AND a.correct = false
				AND a.graded_at >= $4
		) mistakes ON true
		LEFT JOIN LATERAL (
			SELECT MIN(c.due_at) AS next_review_at
			FROM language_review_cards c
			WHERE c.user_id = m.user_id
				AND c.track_id = m.track_id
				AND c.locale = m.locale
				AND EXISTS (
					SELECT 1
					FROM skill_evidence se
					WHERE se.user_id = m.user_id
						AND se.track_id = m.track_id
						AND se.locale = m.locale
						AND se.skill_id = m.skill_id
						AND se.lesson_id = c.lesson_id
						AND se.item_key = c.item_key
				)
		) review ON true
		LEFT JOIN LATERAL (
			SELECT l.id AS lesson_id, l.slug, l.title, l.sort_order
			FROM skill_evidence se
			JOIN lessons l ON l.id = se.lesson_id AND l.locale = se.locale
			JOIN lesson_progress p
				ON p.user_id = se.user_id AND p.lesson_id = se.lesson_id AND p.locale = se.locale
			WHERE se.user_id = m.user_id
				AND se.track_id = m.track_id
				AND se.locale = m.locale
				AND se.skill_id = m.skill_id
				AND p.completed = true
				AND l.published = true
			ORDER BY se.observed_at DESC, l.sort_order DESC, l.id DESC
			LIMIT 1
		) repair ON true
		WHERE m.user_id = $1
			AND m.track_id = $2
			AND m.locale = $3
		ORDER BY m.skill_id ASC
	`, userID, trackID, locale, recentSince)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := make([]domain.WeakSkillSignal, 0)
	for rows.Next() {
		var signal domain.WeakSkillSignal
		var lastMistake pgtype.Timestamptz
		var nextReview pgtype.Timestamptz
		var repairID, repairSlug, repairTitle string
		var repairSortOrder int
		if err := rows.Scan(
			&signal.TrackID,
			&signal.Locale,
			&signal.SkillID,
			&signal.Score,
			&signal.EvidenceCount,
			&signal.EvidenceWeight,
			&signal.LastEvidenceAt,
			&signal.RecentMistakes,
			&lastMistake,
			&nextReview,
			&repairID,
			&repairSlug,
			&repairTitle,
			&repairSortOrder,
		); err != nil {
			return nil, err
		}
		if lastMistake.Valid {
			value := lastMistake.Time
			signal.LastMistakeAt = &value
		}
		if nextReview.Valid {
			value := nextReview.Time
			signal.NextReviewAt = &value
		}
		if repairID != "" {
			signal.RepairLesson = &domain.LearningLessonRef{
				LessonID:  repairID,
				Slug:      repairSlug,
				Title:     repairTitle,
				SortOrder: repairSortOrder,
			}
		}
		out = append(out, signal)
	}
	return out, rows.Err()
}
