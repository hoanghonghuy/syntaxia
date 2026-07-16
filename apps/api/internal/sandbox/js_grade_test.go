package sandbox

import "testing"

func TestGradeJs_returnValue_pass(t *testing.T) {
	expected := map[string]any{
		"type":  "returnValue",
		"value": float64(8),
	}
	passed, code, _ := GradeJs(expected, JsGradeInput{ReturnValue: float64(8)})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeJs_returnValue_fail(t *testing.T) {
	expected := map[string]any{
		"type":  "returnValue",
		"value": float64(8),
	}
	passed, code, _ := GradeJs(expected, JsGradeInput{ReturnValue: float64(7)})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result, got passed=%v code=%q", passed, code)
	}
}

func TestGradeJs_console_pass(t *testing.T) {
	expected := map[string]any{
		"type":  "console",
		"lines": []any{"9"},
	}
	passed, code, _ := GradeJs(expected, JsGradeInput{ConsoleLines: []string{"9"}})
	if !passed || code != "" {
		t.Fatalf("expected pass, got passed=%v code=%q", passed, code)
	}
}

func TestGradeJs_console_fail(t *testing.T) {
	expected := map[string]any{
		"type":  "console",
		"lines": []any{"9"},
	}
	passed, code, _ := GradeJs(expected, JsGradeInput{ConsoleLines: []string{"8"}})
	if passed || code != "wrong_result" {
		t.Fatalf("expected wrong_result, got passed=%v code=%q", passed, code)
	}
}

func TestGradeJs_noExpected(t *testing.T) {
	passed, code, _ := GradeJs(nil, JsGradeInput{})
	if passed || code != "no_expected" {
		t.Fatalf("expected no_expected, got passed=%v code=%q", passed, code)
	}
}

func TestGradeJs_invalidType(t *testing.T) {
	passed, code, _ := GradeJs(map[string]any{"type": "dom"}, JsGradeInput{})
	if passed || code != "invalid_expected" {
		t.Fatalf("expected invalid_expected, got passed=%v code=%q", passed, code)
	}
}
