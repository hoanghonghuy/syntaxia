package learning

import "strings"

const SkillEvidenceSourceLanguageReview = "language_review"
const SkillEvidenceSourceServerGradedAttempt = "server_graded_attempt"

const LanguageReviewEvidenceConfidence = 0.5
const ServerGradedAttemptEvidenceConfidence = 1.0

// ReviewObservationScore maps the existing 1..4 FSRS answer rating to an
// explainable 0..100 mastery observation. The aggregate is intentionally
// deterministic in V1; this is not presented as a psychometric probability.
func ReviewObservationScore(rating int) (float64, bool) {
	switch rating {
	case 1:
		return 20, true
	case 2:
		return 50, true
	case 3:
		return 80, true
	case 4:
		return 100, true
	default:
		return 0, false
	}
}

// LanguageReviewItemSkills returns authored stable skill ids for one assessed
// language item. No grammar/skill inference is performed from prompt text.
func LanguageReviewItemSkills(exercise map[string]any, itemKey string) []string {
	item, ok := languageReviewItem(exercise, itemKey)
	if !ok {
		return nil
	}
	return authoredSkillIDs(item)
}

func languageReviewItem(exercise map[string]any, itemKey string) (map[string]any, bool) {
	itemKey = strings.TrimSpace(itemKey)
	if exercise == nil || itemKey == "" {
		return nil, false
	}
	rawSteps, ok := exercise["steps"].([]any)
	if !ok {
		return nil, false
	}
	for stepIndex, raw := range rawSteps {
		step, ok := raw.(map[string]any)
		if !ok {
			continue
		}
		typeName, _ := step["type"].(string)
		switch typeName {
		case "practice":
			if reviewItemKey(step, stepIndex, -1) == itemKey {
				return step, true
			}
		case "checkpoint":
			if rawItems, ok := step["items"].([]any); ok {
				for itemIndex, rawItem := range rawItems {
					item, ok := rawItem.(map[string]any)
					if !ok {
						continue
					}
					if reviewItemKey(item, stepIndex, itemIndex) == itemKey {
						return item, true
					}
				}
			} else if reviewItemKey(step, stepIndex, -1) == itemKey {
				return step, true
			}
		}
	}
	return nil, false
}

func authoredSkillIDs(item map[string]any) []string {
	raw, ok := item["skills"]
	if !ok {
		return nil
	}
	seen := map[string]struct{}{}
	out := make([]string, 0)
	appendSkill := func(value string) {
		value = strings.TrimSpace(value)
		if value == "" {
			return
		}
		if _, exists := seen[value]; exists {
			return
		}
		seen[value] = struct{}{}
		out = append(out, value)
	}
	switch values := raw.(type) {
	case []any:
		for _, value := range values {
			if skill, ok := value.(string); ok {
				appendSkill(skill)
			}
		}
	case []string:
		for _, skill := range values {
			appendSkill(skill)
		}
	case string:
		appendSkill(values)
	}
	return out
}
