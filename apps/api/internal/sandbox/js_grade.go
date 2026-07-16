package sandbox

import (
	"fmt"
	"reflect"
	"strings"
)

// JsGradeInput is learner output from the browser worker.
type JsGradeInput struct {
	ReturnValue  any
	ConsoleLines []string
}

// GradeJs compares worker output to exercise.expected for JS lessons.
// Returns passed, stable code, and English fallback message.
func GradeJs(expected map[string]any, input JsGradeInput) (bool, string, string) {
	if expected == nil {
		return false, "no_expected", "no expected result configured"
	}
	typ, _ := expected["type"].(string)
	switch typ {
	case "returnValue":
		expVal := expected["value"]
		if reflect.DeepEqual(input.ReturnValue, expVal) {
			return true, "", ""
		}
		return false, "wrong_result", "return value does not match the expected answer"
	case "console":
		expLines, ok := anyStringSlice(expected["lines"])
		if !ok {
			return false, "invalid_expected", "invalid expected console lines"
		}
		got := trimConsoleLines(input.ConsoleLines)
		if len(got) != len(expLines) {
			return false, "wrong_result", fmt.Sprintf("expected %d console line(s), got %d", len(expLines), len(got))
		}
		for i := range expLines {
			if got[i] != expLines[i] {
				return false, "wrong_result", fmt.Sprintf("console line %d does not match", i+1)
			}
		}
		return true, "", ""
	default:
		return false, "invalid_expected", "unknown or unsupported expected type"
	}
}

func anyStringSlice(raw any) ([]string, bool) {
	items, ok := raw.([]any)
	if !ok {
		return nil, false
	}
	out := make([]string, len(items))
	for i, v := range items {
		s, ok := v.(string)
		if !ok {
			return nil, false
		}
		out[i] = strings.TrimSpace(s)
	}
	return out, true
}

func trimConsoleLines(lines []string) []string {
	out := make([]string, len(lines))
	for i, line := range lines {
		out[i] = strings.TrimSpace(line)
	}
	return out
}
