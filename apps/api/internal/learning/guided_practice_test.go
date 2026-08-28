package learning

import (
	"testing"

	"syntaxia/apps/api/internal/domain"
)

func TestEnglishGuidedPracticeBlueprintsCoverUnitsOneToNine(t *testing.T) {
	blueprints := EnglishGuidedPracticeBlueprints()
	if len(blueprints) != 9 {
		t.Fatalf("expected 9 English guided-practice blueprints, got %d", len(blueprints))
	}
	if err := ValidateGuidedPracticeBlueprints(blueprints); err != nil {
		t.Fatalf("blueprints should validate: %v", err)
	}
	for i, bp := range blueprints {
		wantOrder := i + 1
		if bp.UnitOrder != wantOrder {
			t.Fatalf("blueprint %s has unit order %d, want %d", bp.ID, bp.UnitOrder, wantOrder)
		}
		for _, slug := range bp.RequiredLessonSlugs {
			if len(slug) >= 7 && slug[len(slug)-7:] == "-review" {
				t.Fatalf("delayed review must not gate blueprint %s", bp.ID)
			}
		}
	}
	if blueprints[0].ExitCheckItemKeys[0] != "en-u01-check-produce" {
		t.Fatalf("unexpected Unit 1 exit-check identity: %v", blueprints[0].ExitCheckItemKeys)
	}
	if blueprints[8].UnitID != "en-a1-personal-09" {
		t.Fatalf("unexpected Unit 9 blueprint: %s", blueprints[8].UnitID)
	}
}

func TestEnglishGuidedPracticeBlueprintsReturnDefensiveCopies(t *testing.T) {
	first := EnglishGuidedPracticeBlueprints()
	first[0].TargetSkills[0] = "mutated"
	second := EnglishGuidedPracticeBlueprints()
	if second[0].TargetSkills[0] == "mutated" {
		t.Fatal("blueprint registry leaked mutable slice state")
	}
}

func TestEvaluateGuidedPracticeEligibilityRequiresPublishedCompletedPrerequisites(t *testing.T) {
	blueprints := []domain.GuidedPracticeBlueprint{{
		ID: "test", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "unit-1", UnitOrder: 1,
		RequiredLessonSlugs: []string{"lesson", "checkpoint"},
	}}
	lessons := []domain.LessonSummary{
		{ID: "lesson-id", TrackID: EnglishGuidedPracticeTrackID, Locale: "en", Slug: "lesson", Published: true},
		{ID: "checkpoint-id", TrackID: EnglishGuidedPracticeTrackID, Locale: "en", Slug: "checkpoint", Published: true},
	}
	progress := []domain.Progress{{LessonID: "lesson-id", Locale: "en", Completed: true}}

	model := EvaluateGuidedPracticeEligibility(EnglishGuidedPracticeTrackID, "en", blueprints, lessons, progress)
	unit := model.Units[0]
	if !unit.CurriculumReady || unit.Eligible {
		t.Fatalf("expected ready curriculum but blocked progress: %+v", unit)
	}
	if len(unit.MissingPrerequisiteSlugs) != 1 || unit.MissingPrerequisiteSlugs[0] != "checkpoint" {
		t.Fatalf("unexpected missing prerequisites: %v", unit.MissingPrerequisiteSlugs)
	}

	progress = append(progress, domain.Progress{LessonID: "checkpoint-id", Locale: "en", Completed: true})
	model = EvaluateGuidedPracticeEligibility(EnglishGuidedPracticeTrackID, "en", blueprints, lessons, progress)
	if !model.Units[0].Eligible {
		t.Fatalf("expected completed unit to be eligible: %+v", model.Units[0])
	}
}

func TestEvaluateGuidedPracticeEligibilityFailsClosedForMissingCurriculumAndLocaleMismatch(t *testing.T) {
	blueprints := []domain.GuidedPracticeBlueprint{{
		ID: "test", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "unit-1", UnitOrder: 1,
		RequiredLessonSlugs: []string{"lesson", "checkpoint"},
	}}
	lessons := []domain.LessonSummary{
		{ID: "lesson-id", TrackID: EnglishGuidedPracticeTrackID, Locale: "en", Slug: "lesson", Published: true},
	}
	progress := []domain.Progress{
		{LessonID: "lesson-id", Locale: "vi", Completed: true},
		{LessonID: "checkpoint-id", Locale: "en", Completed: true},
	}

	model := EvaluateGuidedPracticeEligibility(EnglishGuidedPracticeTrackID, "en", blueprints, lessons, progress)
	unit := model.Units[0]
	if unit.CurriculumReady || unit.Eligible {
		t.Fatalf("missing published checkpoint must fail closed: %+v", unit)
	}
	if len(unit.MissingPrerequisiteSlugs) != 2 {
		t.Fatalf("expected lesson incomplete plus checkpoint unavailable, got %v", unit.MissingPrerequisiteSlugs)
	}
}
