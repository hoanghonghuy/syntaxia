package learning

import (
	"sort"

	"syntaxia/apps/api/internal/domain"
)

// TrackProgress returns completed count, total lessons, and percent (0–100).
func TrackProgress(lessons []domain.LessonSummary, progress []domain.Progress, locale string) (done, total, percent int) {
	total = len(lessons)
	if total == 0 {
		return 0, 0, 0
	}
	completed := completedSet(progress, locale)
	for _, l := range lessons {
		if completed[l.ID] {
			done++
		}
	}
	percent = (done * 100) / total
	return done, total, percent
}

// NextIncomplete returns the first lesson by sort order that is not completed.
func NextIncomplete(lessons []domain.LessonSummary, progress []domain.Progress, locale string) *domain.LessonSummary {
	if len(lessons) == 0 {
		return nil
	}
	sorted := append([]domain.LessonSummary(nil), lessons...)
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].SortOrder < sorted[j].SortOrder
	})
	completed := completedSet(progress, locale)
	for i := range sorted {
		if !completed[sorted[i].ID] {
			lesson := sorted[i]
			return &lesson
		}
	}
	return nil
}

// ResumeAcrossTracks picks the first track (by SortOrder) that still has an incomplete lesson.
func ResumeAcrossTracks(
	tracks []domain.Track,
	lessonsByTrack map[string][]domain.LessonSummary,
	progress []domain.Progress,
	locale string,
) (trackID string, lesson *domain.LessonSummary) {
	sorted := append([]domain.Track(nil), tracks...)
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].SortOrder < sorted[j].SortOrder
	})
	for _, tr := range sorted {
		next := NextIncomplete(lessonsByTrack[tr.ID], progress, locale)
		if next != nil {
			return tr.ID, next
		}
	}
	return "", nil
}

func completedSet(progress []domain.Progress, locale string) map[string]bool {
	out := make(map[string]bool)
	for _, p := range progress {
		if p.Locale == locale && p.Completed {
			out[p.LessonID] = true
		}
	}
	return out
}
