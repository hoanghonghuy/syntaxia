package sandbox

import (
	"testing"
)

func TestGradeMatchesExpected(t *testing.T) {
	cols := []string{"title", "year"}
	rows := [][]any{{"Inception", int32(2010)}, {"The Matrix", int32(1999)}}
	expected := map[string]any{
		"columns": []any{"title", "year"},
		"rows":    []any{[]any{"Inception", 2010}, []any{"The Matrix", 1999}},
	}
	passed, msg := grade(cols, rows, expected)
	if !passed {
		t.Fatalf("expected pass, got: %s", msg)
	}
}

func TestGradeRejectsNilExpected(t *testing.T) {
	passed, _ := grade([]string{"a"}, [][]any{{1}}, nil)
	if passed {
		t.Fatal("expected fail when expected is nil")
	}
}

func TestGradeRejectsMalformedExpected(t *testing.T) {
	passed, _ := grade([]string{"a"}, [][]any{{1}}, map[string]any{"columns": "bad"})
	if passed {
		t.Fatal("expected fail when expected columns are invalid")
	}
}

func TestGradeRejectsWrongRowCount(t *testing.T) {
	cols := []string{"title"}
	rows := [][]any{{"A"}}
	expected := map[string]any{
		"columns": []any{"title"},
		"rows":    []any{[]any{"A"}, []any{"B"}},
	}
	passed, _ := grade(cols, rows, expected)
	if passed {
		t.Fatal("expected fail")
	}
}

func TestStatementAllowed(t *testing.T) {
	cases := []struct {
		sql      string
		allowMut bool
		want     bool
	}{
		{"SELECT 1", false, true},
		{"UPDATE movies SET year = 1", false, false},
		{"UPDATE movies SET year = 1", true, true},
		{"ALTER TABLE movies ADD COLUMN year INT", false, false},
		{"ALTER TABLE movies ADD COLUMN year INT", true, true},
		{"CREATE INDEX idx ON movies (title)", true, true},
		{"DROP TABLE obsolete", true, true},
		{"CREATE TEMP VIEW v AS SELECT 1", true, true},
		{"GRANT SELECT ON movies TO public", true, false},
		{"TRUNCATE movies", true, false},
		{"COPY movies FROM STDIN", true, false},
		{"DO $$ BEGIN NULL; END $$", true, false},
		{"CALL refresh_movies()", true, false},
		{"EXPLAIN SELECT 1", false, true},
	}
	for _, tc := range cases {
		got := statementAllowed(tc.sql, tc.allowMut)
		if got != tc.want {
			t.Fatalf("%q allowMut=%v: got %v want %v", tc.sql, tc.allowMut, got, tc.want)
		}
	}
}
