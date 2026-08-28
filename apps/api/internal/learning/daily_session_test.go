package learning

import (
	"testing"

	"syntaxia/apps/api/internal/domain"
)

func TestComposeDailyLearningSessionBalancesRepairReviewAndLesson(t *testing.T) {
	repairLesson := &domain.LearningLessonRef{LessonID: "done-1", Slug: "done-1", Title: "Done 1", SortOrder: 1}
	nextLesson := &domain.LearningLessonRef{LessonID: "next-2", Slug: "next-2", Title: "Next 2", SortOrder: 2}
	weak := domain.WeakSkillCandidate{
		SkillID:      "en.sound.spelling",
		MasteryScore: 50,
		Priority:     WeakSkillPriorityHigh,
		Reasons:      []string{WeakSkillReasonRecentIncorrect, WeakSkillReasonCriticalMastery},
		RepairLesson: repairLesson,
	}

	got := ComposeDailyLearningSession("english-basics", "en", 15, DailySessionInput{
		DueReviewCount: 9,
		WeakSkills:     []domain.WeakSkillCandidate{weak},
		NextLesson:     nextLesson,
	})

	if got.EstimatedMinutes != 15 || len(got.Items) != 3 {
		t.Fatalf("session=%+v, want 15 minutes and 3 items", got)
	}
	if got.Items[0].Type != domain.DailyItemReview || got.Items[0].ReviewCount != 4 {
		t.Fatalf("review item=%+v, want 4 due reviews", got.Items[0])
	}
	if got.Items[1].Type != domain.DailyItemRepair || got.Items[1].SkillID != weak.SkillID {
		t.Fatalf("repair item=%+v", got.Items[1])
	}
	if got.Items[2].Type != domain.DailyItemLesson || got.Items[2].Lesson == nil || got.Items[2].Lesson.LessonID != "next-2" {
		t.Fatalf("lesson item=%+v", got.Items[2])
	}
}

func TestComposeDailyLearningSessionWatchSignalDoesNotBlockNewLesson(t *testing.T) {
	repairLesson := &domain.LearningLessonRef{LessonID: "done-1", Slug: "done-1", Title: "Done 1", SortOrder: 1}
	nextLesson := &domain.LearningLessonRef{LessonID: "next-2", Slug: "next-2", Title: "Next 2", SortOrder: 2}
	watch := domain.WeakSkillCandidate{
		SkillID:      "en.grammar.possession",
		MasteryScore: 50,
		Priority:     WeakSkillPriorityWatch,
		RepairLesson: repairLesson,
	}

	got := ComposeDailyLearningSession("english-basics", "en", 10, DailySessionInput{
		DueReviewCount: 8,
		WeakSkills:     []domain.WeakSkillCandidate{watch},
		NextLesson:     nextLesson,
	})
	if len(got.Items) != 2 {
		t.Fatalf("items=%+v, want review + lesson", got.Items)
	}
	if got.Items[0].Type != domain.DailyItemReview || got.Items[0].ReviewCount != 3 {
		t.Fatalf("review item=%+v, want 3", got.Items[0])
	}
	if got.Items[1].Type != domain.DailyItemLesson {
		t.Fatalf("second item=%+v, want lesson", got.Items[1])
	}
}

func TestComposeDailyLearningSessionClampsBudgetAndCanBeEmpty(t *testing.T) {
	got := ComposeDailyLearningSession("sql-fundamentals", "en", 2, DailySessionInput{})
	if got.TargetMinutes != MinDailyTargetMinutes {
		t.Fatalf("target=%d, want min=%d", got.TargetMinutes, MinDailyTargetMinutes)
	}
	if got.EstimatedMinutes != 0 || len(got.Items) != 0 {
		t.Fatalf("empty session=%+v", got)
	}
}
