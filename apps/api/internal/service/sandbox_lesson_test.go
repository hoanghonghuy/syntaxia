package service

import (
	"testing"

	"syntaxia/apps/api/pkg/apperrors"
)

func TestSandboxExerciseExpected(t *testing.T) {
	expected := map[string]any{"columns": []any{"a"}}
	got, err := sandboxExerciseExpected(map[string]any{"expected": expected})
	if err != nil || got == nil {
		t.Fatalf("got %v err %v", got, err)
	}

	_, err = sandboxExerciseExpected(nil)
	if err == nil {
		t.Fatal("expected error for nil exercise")
	}
	if ae, ok := err.(*apperrors.AppError); !ok || ae.Code != "BAD_REQUEST" {
		t.Fatalf("want BAD_REQUEST, got %v", err)
	}

	_, err = sandboxExerciseExpected(map[string]any{"starter": "SELECT 1"})
	if err == nil {
		t.Fatal("expected error for missing expected")
	}
}
