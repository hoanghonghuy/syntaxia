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

func TestParseLessonFileLanguageVocabMergedIntoExercise(t *testing.T) {
	raw := `---
id: zh-hsk-b1-01-greetings
track: chinese-hsk
locale: en
slug: greetings
title: Greetings
order: 1
published: true
hsk_band: 1
hsk_version: "3.0"
objectives:
  - Say hello
vocab:
  - hanzi: "你好"
    pinyin: "nǐ hǎo"
    gloss: "hello"
exercise:
  type: mcq
  prompt: "Which means hello?"
  choices:
    - "你好"
    - "再见"
  answer: "你好"
---

Hello.
`
	l, err := ParseLessonFile(FileEntry{Path: "chinese-hsk/en/greetings.md", Content: raw, FileID: "zh1"})
	if err != nil {
		t.Fatal(err)
	}
	if l.Exercise == nil {
		t.Fatal("expected exercise map")
	}
	if l.Exercise["type"] != "mcq" {
		t.Fatalf("type=%v", l.Exercise["type"])
	}
	if l.Exercise["hskBand"] != 1 {
		t.Fatalf("hskBand=%v", l.Exercise["hskBand"])
	}
	if l.Exercise["hskVersion"] != "3.0" {
		t.Fatalf("hskVersion=%v", l.Exercise["hskVersion"])
	}
	vocab, ok := l.Exercise["vocab"].([]any)
	if !ok || len(vocab) != 1 {
		t.Fatalf("vocab=%v", l.Exercise["vocab"])
	}
}
