package learning

import "syntaxia/apps/api/internal/domain"

const (
	DefaultDailyTargetMinutes = 15
	MinDailyTargetMinutes     = 10
	MaxDailyTargetMinutes     = 30

	DailyReviewMinutesPerItem = 1
	DailyRepairMinutes        = 4
	DailyLessonMinutes        = 7
)

type DailySessionInput struct {
	DueReviewCount int
	WeakSkills     []domain.WeakSkillCandidate
	NextLesson     *domain.LearningLessonRef
}

// ComposeDailyLearningSession builds a bounded, deterministic plan from P1.2
// weakness truth, due review count, and the next published curriculum action.
// It does not calculate a new opaque recommendation score.
func ComposeDailyLearningSession(
	trackID, locale string,
	targetMinutes int,
	input DailySessionInput,
) domain.DailyLearningSession {
	if targetMinutes < MinDailyTargetMinutes {
		targetMinutes = MinDailyTargetMinutes
	}
	if targetMinutes > MaxDailyTargetMinutes {
		targetMinutes = MaxDailyTargetMinutes
	}

	session := domain.DailyLearningSession{
		TrackID:        trackID,
		Locale:         locale,
		TargetMinutes:  targetMinutes,
		DueReviewCount: max(input.DueReviewCount, 0),
		WeakSkillCount: len(input.WeakSkills),
		Items:          make([]domain.DailyLearningItem, 0, 3),
	}

	remaining := targetMinutes
	var repair *domain.WeakSkillCandidate
	if len(input.WeakSkills) > 0 && input.WeakSkills[0].RepairLesson != nil {
		repair = &input.WeakSkills[0]
	}

	// Established high/medium weakness gets a repair reservation before new
	// content. Watch-only evidence does not block curriculum progression.
	reserveRepairFirst := repair != nil && repair.Priority != WeakSkillPriorityWatch
	includeRepair := false
	includeLesson := false

	if reserveRepairFirst && remaining >= DailyRepairMinutes {
		includeRepair = true
		remaining -= DailyRepairMinutes
	}
	if input.NextLesson != nil && remaining >= DailyLessonMinutes {
		includeLesson = true
		remaining -= DailyLessonMinutes
	}
	if !includeRepair && repair != nil && remaining >= DailyRepairMinutes {
		includeRepair = true
		remaining -= DailyRepairMinutes
	}

	reviewCount := min(session.DueReviewCount, remaining/DailyReviewMinutesPerItem)
	if reviewCount > 0 {
		reviewMinutes := reviewCount * DailyReviewMinutesPerItem
		session.Items = append(session.Items, domain.DailyLearningItem{
			Type:             domain.DailyItemReview,
			EstimatedMinutes: reviewMinutes,
			ReviewCount:      reviewCount,
		})
		session.EstimatedMinutes += reviewMinutes
	}

	if includeRepair && repair != nil {
		score := repair.MasteryScore
		session.Items = append(session.Items, domain.DailyLearningItem{
			Type:             domain.DailyItemRepair,
			EstimatedMinutes: DailyRepairMinutes,
			SkillID:          repair.SkillID,
			Priority:         repair.Priority,
			Reasons:          append([]string(nil), repair.Reasons...),
			MasteryScore:     &score,
			Lesson:           repair.RepairLesson,
		})
		session.EstimatedMinutes += DailyRepairMinutes
	}

	if includeLesson && input.NextLesson != nil {
		session.Items = append(session.Items, domain.DailyLearningItem{
			Type:             domain.DailyItemLesson,
			EstimatedMinutes: DailyLessonMinutes,
			Lesson:           input.NextLesson,
		})
		session.EstimatedMinutes += DailyLessonMinutes
	}

	return session
}
