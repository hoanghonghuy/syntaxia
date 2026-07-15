package content

import (
	"testing"

	"syntaxia/apps/api/internal/domain"
)

func TestLessonForLearner_stripsGradingSecrets(t *testing.T) {
	in := domain.Lesson{
		ID:    "lesson-1",
		Slug:  "select",
		Title: "SELECT",
		Exercise: map[string]any{
			"starter":  "SELECT 1",
			"hints":    []any{"hint"},
			"expected": map[string]any{"columns": []any{"x"}},
			"solution": "SELECT * FROM movies",
			"preview":  map[string]any{"columns": []any{"title"}},
		},
		SandboxSeed: map[string]any{
			"ddl":         []any{"CREATE TEMP TABLE movies (title text)"},
			"verify_sql":  "SELECT 1",
			"allow_mutations": false,
		},
	}

	out := LessonForLearner(in)

	if out.SandboxSeed != nil {
		t.Fatal("expected sandboxSeed stripped")
	}
	if out.Exercise["expected"] != nil {
		t.Fatal("expected exercise.expected stripped")
	}
	if out.Exercise["solution"] != nil {
		t.Fatal("expected exercise.solution stripped")
	}
	if out.Exercise["starter"] != "SELECT 1" {
		t.Fatal("starter should remain")
	}
	if out.Exercise["solutionAvailable"] != true {
		t.Fatal("expected solutionAvailable flag")
	}
}

func TestLessonForLearner_noSolutionFlagWhenAbsent(t *testing.T) {
	in := domain.Lesson{
		Exercise: map[string]any{"starter": "SELECT 1"},
	}
	out := LessonForLearner(in)
	if _, ok := out.Exercise["solutionAvailable"]; ok {
		t.Fatal("solutionAvailable should not be set")
	}
}

func TestExerciseSolutionText(t *testing.T) {
	sol, ok := ExerciseSolutionText(map[string]any{"solution": " SELECT 1 "})
	if !ok || sol != "SELECT 1" {
		t.Fatalf("got %q ok=%v", sol, ok)
	}
	_, ok = ExerciseSolutionText(map[string]any{"starter": "x"})
	if ok {
		t.Fatal("expected false when no solution")
	}
}
