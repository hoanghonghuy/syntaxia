package service

import (
	"context"

	"syntaxia/apps/api/internal/content"
	"syntaxia/apps/api/pkg/apperrors"
)

// EnsureBuiltinTracks reconciles application-owned catalog metadata before
// curriculum sync. This makes startup safe for long-lived databases created
// before later language tracks were introduced.
func (s *ContentService) EnsureBuiltinTracks(ctx context.Context) (int, error) {
	tracks := content.BuiltinTracks()
	for _, track := range tracks {
		if err := s.repo.UpsertTrack(ctx, track); err != nil {
			return 0, apperrors.Internal(err)
		}
	}
	return len(tracks), nil
}
