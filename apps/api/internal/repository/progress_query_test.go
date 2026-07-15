package repository

import "testing"

func TestListProgressQuery_filtersPublishedLessons(t *testing.T) {
	q := listProgressSQL()
	if q == "" {
		t.Fatal("expected non-empty query")
	}
	if !containsAll(q, "l.published = true", "JOIN lessons l") {
		t.Fatalf("query missing published filter: %s", q)
	}
}
