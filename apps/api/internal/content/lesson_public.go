package content

import (
	"strings"

	"syntaxia/apps/api/internal/domain"
)

// LessonForLearner returns a copy safe for learner-facing GET /lessons/:slug.
// Grading inputs (expected, solution, sandbox seed) stay server-side only.
func LessonForLearner(l domain.Lesson) domain.Lesson {
	l.SandboxSeed = nil
	if l.Exercise == nil {
		return l
	}
	ex := make(map[string]any, len(l.Exercise))
	for k, v := range l.Exercise {
		if k == "expected" || k == "solution" {
			continue
		}
		ex[k] = v
	}
	if sol, ok := ExerciseSolutionText(l.Exercise); ok && sol != "" {
		ex["solutionAvailable"] = true
	}
	l.Exercise = ex
	return l
}

// ExerciseSolutionText extracts trimmed solution SQL from exercise metadata.
func ExerciseSolutionText(exercise map[string]any) (string, bool) {
	if exercise == nil {
		return "", false
	}
	raw, ok := exercise["solution"].(string)
	if !ok {
		return "", false
	}
	trimmed := strings.TrimSpace(raw)
	if trimmed == "" {
		return "", false
	}
	return trimmed, true
}
