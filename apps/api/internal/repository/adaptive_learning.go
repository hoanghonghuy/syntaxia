package repository

import (
	"context"

	"github.com/google/uuid"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) ListSkillMastery(
	ctx context.Context,
	userID uuid.UUID,
	trackID, locale string,
) ([]domain.SkillMastery, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT track_id, locale, skill_id, score, evidence_count, last_evidence_at
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
			&mastery.LastEvidenceAt,
		); err != nil {
			return nil, err
		}
		out = append(out, mastery)
	}
	return out, rows.Err()
}
