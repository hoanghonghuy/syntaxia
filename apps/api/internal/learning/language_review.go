package learning

import "fmt"

// LanguageReviewItemKeys returns stable keys for all assessed steps in a language lesson.
// Authored ids win. Legacy v2 lessons receive deterministic positional keys so existing
// content can enter scheduled review without a destructive content migration.
func LanguageReviewItemKeys(exercise map[string]any) []string {
	if exercise == nil {
		return nil
	}
	rawSteps, ok := exercise["steps"].([]any)
	if !ok {
		return nil
	}
	keys := make([]string, 0)
	seen := map[string]struct{}{}
	appendKey := func(key string) {
		if key == "" {
			return
		}
		if _, exists := seen[key]; exists {
			return
		}
		seen[key] = struct{}{}
		keys = append(keys, key)
	}
	for stepIndex, raw := range rawSteps {
		step, ok := raw.(map[string]any)
		if !ok {
			continue
		}
		typeName, _ := step["type"].(string)
		switch typeName {
		case "practice":
			appendKey(reviewItemKey(step, stepIndex, -1))
		case "checkpoint":
			if rawItems, ok := step["items"].([]any); ok {
				for itemIndex, rawItem := range rawItems {
					item, ok := rawItem.(map[string]any)
					if !ok {
						continue
					}
					appendKey(reviewItemKey(item, stepIndex, itemIndex))
				}
			} else {
				appendKey(reviewItemKey(step, stepIndex, -1))
			}
		}
	}
	return keys
}

func reviewItemKey(item map[string]any, stepIndex, itemIndex int) string {
	if authored, ok := item["id"].(string); ok && authored != "" {
		return authored
	}
	if itemIndex >= 0 {
		return fmt.Sprintf("step-%d-item-%d", stepIndex+1, itemIndex+1)
	}
	return fmt.Sprintf("step-%d", stepIndex+1)
}
