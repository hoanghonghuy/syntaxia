package drive

import "testing"

func TestRelPathToParts(t *testing.T) {
	track, locale, slug, ok := RelPathToParts("sql-fundamentals/en/select-queries.md")
	if !ok {
		t.Fatal("expected ok")
	}
	if track != "sql-fundamentals" || locale != "en" || slug != "select-queries" {
		t.Fatalf("got %s %s %s", track, locale, slug)
	}
	if _, _, _, ok := RelPathToParts("bad.md"); ok {
		t.Fatal("expected fail")
	}
}

func TestParseLessonFile(t *testing.T) {
	raw := `---
id: sql-01-select
track: sql-fundamentals
locale: en
slug: select-queries
title: Writing SQL Queries
order: 1
published: true
objectives:
  - Use SELECT
exercise:
  starter: "SELECT 1;"
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE t (id INT);"
---

# Hello
`
	l, err := ParseLessonFile(FileEntry{Path: "sql-fundamentals/en/select-queries.md", Content: raw, FileID: "abc"})
	if err != nil {
		t.Fatal(err)
	}
	if l.ID != "sql-01-select" || l.Slug != "select-queries" || !l.Published {
		t.Fatalf("unexpected lesson: %+v", l)
	}
	if l.DriveFileID == nil || *l.DriveFileID != "abc" {
		t.Fatal("drive file id missing")
	}
}
