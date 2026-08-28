package learning

import (
	"reflect"
	"testing"
	"time"

	"syntaxia/apps/api/internal/domain"
)

func TestBuildWeakSkillCandidatesExplainsAndOrdersRepairs(t *testing.T) {
	now := time.Date(2026, 8, 28, 3, 0, 0, 0, time.UTC)
	past := now.Add(-time.Hour)
	future := now.Add(24 * time.Hour)
	mistakeAt := now.Add(-2 * time.Hour)
	lesson := &domain.LearningLessonRef{LessonID: "lesson-1", Slug: "lesson-1", Title: "Lesson 1", SortOrder: 1}

	signals := []domain.WeakSkillSignal{
		{
			SkillID:        "skill.recent",
			Score:          90,
			EvidenceCount:  4,
			EvidenceWeight: 4,
			LastEvidenceAt: now,
			RecentMistakes: 1,
			LastMistakeAt:  &mistakeAt,
			NextReviewAt:   &future,
			RepairLesson:   lesson,
		},
		{
			SkillID:        "skill.critical",
			Score:          45,
			EvidenceCount:  2,
			EvidenceWeight: 2,
			LastEvidenceAt: now,
			NextReviewAt:   &past,
			RepairLesson:   lesson,
		},
		{
			SkillID:        "skill.medium",
			Score:          70,
			EvidenceCount:  2,
			EvidenceWeight: 2,
			LastEvidenceAt: now,
			NextReviewAt:   &future,
		},
		{
			SkillID:        "skill.thin",
			Score:          50,
			EvidenceCount:  1,
			EvidenceWeight: 0.5,
			LastEvidenceAt: now,
			NextReviewAt:   &past,
		},
		{
			SkillID:        "skill.strong",
			Score:          85,
			EvidenceCount:  3,
			EvidenceWeight: 3,
			LastEvidenceAt: now,
		},
	}

	got := BuildWeakSkillCandidates(signals, now, 10)
	if len(got) != 4 {
		t.Fatalf("candidate count=%d, want 4", len(got))
	}
	if got[0].SkillID != "skill.critical" || got[0].Priority != WeakSkillPriorityHigh {
		t.Fatalf("first candidate=%+v, want critical/high", got[0])
	}
	if got[1].SkillID != "skill.recent" || got[1].Priority != WeakSkillPriorityHigh {
		t.Fatalf("second candidate=%+v, want recent/high", got[1])
	}
	if got[2].SkillID != "skill.medium" || got[2].Priority != WeakSkillPriorityMedium {
		t.Fatalf("third candidate=%+v, want medium", got[2])
	}
	if got[3].SkillID != "skill.thin" || got[3].Priority != WeakSkillPriorityWatch {
		t.Fatalf("fourth candidate=%+v, want thin/watch", got[3])
	}

	if want := []string{WeakSkillReasonCriticalMastery, WeakSkillReasonReviewDue}; !reflect.DeepEqual(got[0].Reasons, want) {
		t.Fatalf("critical reasons=%v, want %v", got[0].Reasons, want)
	}
	if want := []string{WeakSkillReasonRecentIncorrect}; !reflect.DeepEqual(got[1].Reasons, want) {
		t.Fatalf("recent reasons=%v, want %v", got[1].Reasons, want)
	}
	if want := []string{WeakSkillReasonCriticalMastery, WeakSkillReasonReviewDue, WeakSkillReasonLimitedEvidence}; !reflect.DeepEqual(got[3].Reasons, want) {
		t.Fatalf("thin reasons=%v, want %v", got[3].Reasons, want)
	}
	if !got[0].ReviewDue || got[1].ReviewDue {
		t.Fatalf("unexpected due flags: critical=%v recent=%v", got[0].ReviewDue, got[1].ReviewDue)
	}
	if got[0].RepairLesson == nil || got[0].RepairLesson.LessonID != "lesson-1" {
		t.Fatalf("repair lesson not preserved: %+v", got[0].RepairLesson)
	}
}

func TestBuildWeakSkillCandidatesCapsResult(t *testing.T) {
	now := time.Now().UTC()
	signals := []domain.WeakSkillSignal{
		{SkillID: "a", Score: 20, EvidenceWeight: 1, LastEvidenceAt: now},
		{SkillID: "b", Score: 30, EvidenceWeight: 1, LastEvidenceAt: now},
	}
	got := BuildWeakSkillCandidates(signals, now, 1)
	if len(got) != 1 || got[0].SkillID != "a" {
		t.Fatalf("capped result=%v, want [a]", got)
	}
}
