package learning

import (
	"testing"

	"syntaxia/apps/api/internal/domain"
)

func TestTrackProgress(t *testing.T) {
	lessons := []domain.LessonSummary{
		{ID: "a", Locale: "en", SortOrder: 0},
		{ID: "b", Locale: "en", SortOrder: 1},
		{ID: "c", Locale: "en", SortOrder: 2},
	}
	progress := []domain.Progress{
		{LessonID: "a", Locale: "en", Completed: true},
		{LessonID: "b", Locale: "vi", Completed: true}, // wrong locale
	}
	done, total, percent := TrackProgress(lessons, progress, "en")
	if done != 1 || total != 3 || percent != 33 {
		t.Fatalf("got done=%d total=%d percent=%d", done, total, percent)
	}
}

func TestTrackProgressEmpty(t *testing.T) {
	done, total, percent := TrackProgress(nil, nil, "en")
	if done != 0 || total != 0 || percent != 0 {
		t.Fatalf("got done=%d total=%d percent=%d", done, total, percent)
	}
}

func TestNextIncomplete(t *testing.T) {
	lessons := []domain.LessonSummary{
		{ID: "a", Locale: "en", SortOrder: 2, Slug: "later"},
		{ID: "b", Locale: "en", SortOrder: 0, Slug: "first"},
		{ID: "c", Locale: "en", SortOrder: 1, Slug: "second"},
	}
	progress := []domain.Progress{
		{LessonID: "b", Locale: "en", Completed: true},
	}
	next := NextIncomplete(lessons, progress, "en")
	if next == nil || next.ID != "c" {
		t.Fatalf("expected lesson c, got %#v", next)
	}
}

func TestNextIncompleteAllDone(t *testing.T) {
	lessons := []domain.LessonSummary{
		{ID: "a", Locale: "en", SortOrder: 0},
	}
	progress := []domain.Progress{
		{LessonID: "a", Locale: "en", Completed: true},
	}
	if NextIncomplete(lessons, progress, "en") != nil {
		t.Fatal("expected nil when all complete")
	}
}

func TestResumeAcrossTracks(t *testing.T) {
	tracks := []domain.Track{
		{ID: "sql-fundamentals", SortOrder: 1},
		{ID: "postgresql", SortOrder: 2},
	}
	byTrack := map[string][]domain.LessonSummary{
		"sql-fundamentals": {
			{ID: "s1", TrackID: "sql-fundamentals", Locale: "en", SortOrder: 0, Slug: "intro"},
			{ID: "s2", TrackID: "sql-fundamentals", Locale: "en", SortOrder: 1, Slug: "select"},
		},
		"postgresql": {
			{ID: "p1", TrackID: "postgresql", Locale: "en", SortOrder: 0, Slug: "pg-intro"},
		},
	}
	progress := []domain.Progress{
		{LessonID: "s1", Locale: "en", Completed: true},
	}
	trackID, lesson := ResumeAcrossTracks(tracks, byTrack, progress, "en")
	if trackID != "sql-fundamentals" || lesson == nil || lesson.Slug != "select" {
		t.Fatalf("got track=%s lesson=%#v", trackID, lesson)
	}
}
