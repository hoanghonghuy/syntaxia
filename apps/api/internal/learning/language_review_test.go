package learning

import (
	"reflect"
	"testing"
)

func TestLanguageReviewItemKeys(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{
			map[string]any{"type": "dialogue"},
			map[string]any{"type": "practice", "id": "greet-one"},
			map[string]any{"type": "practice"},
			map[string]any{
				"type": "checkpoint",
				"items": []any{
					map[string]any{"id": "check-one"},
					map[string]any{},
				},
			},
		},
	}
	got := LanguageReviewItemKeys(exercise)
	want := []string{"greet-one", "step-3", "check-one", "step-4-item-2"}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("keys mismatch: got %#v want %#v", got, want)
	}
}
