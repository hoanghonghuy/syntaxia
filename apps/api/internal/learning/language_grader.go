package learning

import (
	"sort"
	"strings"

	"golang.org/x/text/unicode/norm"
)

const LanguageAttemptGraderVersion = "language-v1"

// GradeLanguageReviewSubmission deterministically grades a raw learner answer
// against the authored answer/acceptedAnswers for one stable review item.
// The second return value is false when the item cannot be graded from the
// published curriculum contract.
func GradeLanguageReviewSubmission(
	exercise map[string]any,
	itemKey, trackID, submission string,
) (bool, bool) {
	item, ok := languageReviewItem(exercise, itemKey)
	if !ok {
		return false, false
	}
	kind, _ := item["kind"].(string)
	answer, _ := item["answer"].(string)
	if strings.TrimSpace(answer) == "" && kind == "match_pairs" {
		answer = canonicalPairAnswer(item["pairs"])
	}
	if strings.TrimSpace(answer) == "" {
		return false, false
	}

	got := NormalizeLanguageSubmission(submission, trackID)
	if kind == "match_pairs" {
		got = canonicalPairSubmission(got)
	}
	if got == "" {
		return false, true
	}
	accepted := []string{answer}
	if raw, ok := item["acceptedAnswers"].([]any); ok {
		for _, value := range raw {
			if text, ok := value.(string); ok {
				accepted = append(accepted, text)
			}
		}
	}
	if raw, ok := item["acceptedAnswers"].([]string); ok {
		accepted = append(accepted, raw...)
	}
	for _, value := range accepted {
		want := NormalizeLanguageSubmission(value, trackID)
		if kind == "match_pairs" {
			want = canonicalPairSubmission(want)
		}
		if want == got {
			return true, true
		}
	}
	return false, true
}

// NormalizeLanguageSubmission mirrors the deterministic production language
// grader contract. NFKC + whitespace normalization applies to every track;
// English additionally ignores case and terminal .!? punctuation.
func NormalizeLanguageSubmission(value, trackID string) string {
	normalized := norm.NFKC.String(value)
	normalized = strings.Join(strings.Fields(normalized), " ")
	if trackID == "english-basics" {
		normalized = strings.ToLower(normalized)
		normalized = strings.TrimSpace(strings.TrimRight(normalized, ".!?"))
	}
	return normalized
}

func canonicalPairAnswer(raw any) string {
	pairs, ok := raw.([]any)
	if !ok {
		return ""
	}
	out := make([]string, 0, len(pairs))
	for _, value := range pairs {
		pair, ok := value.(map[string]any)
		if !ok {
			continue
		}
		left, lok := pair["left"].(string)
		right, rok := pair["right"].(string)
		if !lok || !rok {
			continue
		}
		out = append(out, left+"="+right)
	}
	sort.Strings(out)
	return strings.Join(out, "|")
}

func canonicalPairSubmission(value string) string {
	parts := strings.Split(value, "|")
	out := make([]string, 0, len(parts))
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part != "" {
			out = append(out, part)
		}
	}
	sort.Strings(out)
	return strings.Join(out, "|")
}
