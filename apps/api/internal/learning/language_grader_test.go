package learning

import "testing"

func TestGradeLanguageReviewSubmissionEnglishNormalization(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{map[string]any{
			"type":            "practice",
			"id":              "en-item",
			"answer":          "I have a book",
			"acceptedAnswers": []any{"I have a book."},
		}},
	}
	for _, submission := range []string{"I have a book", "i HAVE   a book!", " I have a book. "} {
		correct, gradable := GradeLanguageReviewSubmission(exercise, "en-item", "english-basics", submission)
		if !gradable || !correct {
			t.Fatalf("submission %q: correct=%v gradable=%v", submission, correct, gradable)
		}
	}
	correct, gradable := GradeLanguageReviewSubmission(exercise, "en-item", "english-basics", "I have a phone")
	if !gradable || correct {
		t.Fatalf("wrong English answer: correct=%v gradable=%v", correct, gradable)
	}
}

func TestGradeLanguageReviewSubmissionNFKCAndExactMeaning(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{map[string]any{
			"type":   "practice",
			"id":     "ja-item",
			"answer": "カタカナ",
		}},
	}
	correct, gradable := GradeLanguageReviewSubmission(exercise, "ja-item", "japanese-jlpt", "  カタカナ  ")
	if !gradable || !correct {
		t.Fatalf("Japanese answer: correct=%v gradable=%v", correct, gradable)
	}
	correct, gradable = GradeLanguageReviewSubmission(exercise, "ja-item", "japanese-jlpt", "ひらがな")
	if !gradable || correct {
		t.Fatalf("wrong Japanese answer: correct=%v gradable=%v", correct, gradable)
	}
}

func TestGradeLanguageReviewSubmissionCanonicalPairs(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{map[string]any{
			"type": "practice",
			"id":   "pairs-item",
			"kind": "match_pairs",
			"pairs": []any{
				map[string]any{"left": "A", "right": "1"},
				map[string]any{"left": "B", "right": "2"},
			},
		}},
	}
	correct, gradable := GradeLanguageReviewSubmission(exercise, "pairs-item", "english-basics", "B=2|A=1")
	if !gradable || !correct {
		t.Fatalf("pair answer: correct=%v gradable=%v", correct, gradable)
	}
}

func TestGradeLanguageReviewSubmissionRejectsUnknownOrUngradableItem(t *testing.T) {
	exercise := map[string]any{
		"steps": []any{map[string]any{
			"type": "practice",
			"id":   "missing-answer",
		}},
	}
	if correct, gradable := GradeLanguageReviewSubmission(exercise, "missing", "english-basics", "x"); correct || gradable {
		t.Fatalf("unknown item: correct=%v gradable=%v", correct, gradable)
	}
	if correct, gradable := GradeLanguageReviewSubmission(exercise, "missing-answer", "english-basics", "x"); correct || gradable {
		t.Fatalf("ungradable item: correct=%v gradable=%v", correct, gradable)
	}
}
