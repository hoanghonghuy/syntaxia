package learning

import (
	"reflect"
	"testing"
)

func TestReviewObservationScore(t *testing.T) {
	cases := []struct {
		rating int
		want   float64
	}{
		{rating: 1, want: 20},
		{rating: 2, want: 50},
		{rating: 3, want: 80},
		{rating: 4, want: 100},
	}
	for _, tc := range cases {
		got, ok := ReviewObservationScore(tc.rating)
		if !ok || got != tc.want {
			t.Fatalf("rating %d: got score=%v ok=%v, want %v/true", tc.rating, got, ok, tc.want)
		}
	}
	if _, ok := ReviewObservationScore(0); ok {
		t.Fatal("invalid rating must not produce mastery evidence")
	}
}

func TestLanguageReviewItemSkillsPracticeAndCheckpoint(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{
			map[string]any{
				"type":   "practice",
				"id":     "practice-1",
				"skills": []any{" en.sound.spelling ", "en.listening.word-recognition", "en.sound.spelling"},
			},
			map[string]any{
				"type": "checkpoint",
				"items": []any{
					map[string]any{
						"id":     "check-1",
						"skills": []any{"en.grammar.do-question", "en.communication.possession"},
					},
				},
			},
		},
	}

	if got, want := LanguageReviewItemSkills(exercise, "practice-1"), []string{"en.sound.spelling", "en.listening.word-recognition"}; !reflect.DeepEqual(got, want) {
		t.Fatalf("practice skills=%v, want %v", got, want)
	}
	if got, want := LanguageReviewItemSkills(exercise, "check-1"), []string{"en.grammar.do-question", "en.communication.possession"}; !reflect.DeepEqual(got, want) {
		t.Fatalf("checkpoint skills=%v, want %v", got, want)
	}
	if got := LanguageReviewItemSkills(exercise, "missing"); len(got) != 0 {
		t.Fatalf("missing item returned skills %v", got)
	}
}

func TestLanguageReviewItemSkillsDoesNotInferMissingMetadata(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{map[string]any{
			"type": "practice",
			"id":   "question-about-possession",
		}},
	}
	if got := LanguageReviewItemSkills(exercise, "question-about-possession"); len(got) != 0 {
		t.Fatalf("skills must be authored explicitly, got %v", got)
	}
}
