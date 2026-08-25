package repository

import (
	"context"
	"encoding/json"

	"syntaxia/apps/api/internal/domain"
)

func (r *Repository) UpsertTrack(ctx context.Context, track domain.Track) error {
	title, err := json.Marshal(track.Title)
	if err != nil {
		return err
	}
	description, err := json.Marshal(track.Description)
	if err != nil {
		return err
	}

	_, err = r.pool.Exec(ctx, `
		INSERT INTO tracks (id, title, description, category, level, sort_order)
		VALUES ($1, $2::jsonb, $3::jsonb, $4, $5, $6)
		ON CONFLICT (id) DO UPDATE SET
			title = EXCLUDED.title,
			description = EXCLUDED.description,
			category = EXCLUDED.category,
			level = EXCLUDED.level,
			sort_order = EXCLUDED.sort_order
	`, track.ID, title, description, track.Category, track.Level, track.SortOrder)
	return err
}
