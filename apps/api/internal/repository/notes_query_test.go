package repository

import "testing"

func TestListAllNotesQuery_filtersPublishedLessons(t *testing.T) {
	q := listAllNotesSQL()
	if q == "" {
		t.Fatal("expected non-empty query")
	}
	if !containsAll(q, "l.published = true", "JOIN lessons l") {
		t.Fatalf("query missing published filter: %s", q)
	}
}

func containsAll(s string, subs ...string) bool {
	for _, sub := range subs {
		if !contains(s, sub) {
			return false
		}
	}
	return true
}

func contains(s, sub string) bool {
	return len(s) >= len(sub) && (s == sub || len(sub) == 0 || indexOf(s, sub) >= 0)
}

func indexOf(s, sub string) int {
	for i := 0; i+len(sub) <= len(s); i++ {
		if s[i:i+len(sub)] == sub {
			return i
		}
	}
	return -1
}
