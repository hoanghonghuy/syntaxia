package drive

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

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

func TestParseLessonFileStepsMergedIntoExercise(t *testing.T) {
	raw := `---
id: zh-hsk-b1-01-greetings
track: chinese-hsk
locale: en
slug: greetings
title: Greetings
order: 1
published: true
hsk_band: 1
can_do: "Greet someone politely"
pattern: "你好"
steps:
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
  - type: practice
    kind: mcq
    prompt: "Which means hello?"
    choices: ["你好", "再见"]
    answer: "你好"
exercise:
  type: mcq
  prompt: "Which means hello?"
  choices: ["你好", "再见"]
  answer: "你好"
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "hello" }
---

Body.
`
	l, err := ParseLessonFile(FileEntry{Path: "chinese-hsk/en/greetings.md", Content: raw, FileID: "zh-steps"})
	if err != nil {
		t.Fatal(err)
	}
	if l.Exercise["canDo"] != "Greet someone politely" {
		t.Fatalf("canDo=%v", l.Exercise["canDo"])
	}
	if l.Exercise["pattern"] != "你好" {
		t.Fatalf("pattern=%v", l.Exercise["pattern"])
	}
	steps, ok := l.Exercise["steps"].([]any)
	if !ok || len(steps) != 2 {
		t.Fatalf("steps=%v", l.Exercise["steps"])
	}
}

func TestParseLessonFileCefrLevelMergedIntoExercise(t *testing.T) {
	raw := `---
id: en-a1-01-greetings
track: english-basics
locale: en
slug: greetings
title: Greetings
order: 1
published: true
cefr_level: a1
vocab:
  - word: "hello"
    ipa: "/həˈloʊ/"
    gloss: "greeting"
exercise:
  type: mcq
  prompt: "Which is a greeting?"
  choices:
    - "hello"
    - "goodbye"
  answer: "hello"
---

Hello.
`
	l, err := ParseLessonFile(FileEntry{Path: "english-basics/en/greetings.md", Content: raw, FileID: "en1"})
	if err != nil {
		t.Fatal(err)
	}
	if l.Exercise["cefrLevel"] != "a1" {
		t.Fatalf("cefrLevel=%v", l.Exercise["cefrLevel"])
	}
	vocab, ok := l.Exercise["vocab"].([]any)
	if !ok || len(vocab) != 1 {
		t.Fatalf("vocab=%v", l.Exercise["vocab"])
	}
}

func TestParseLessonFileJlptLevelMergedIntoExercise(t *testing.T) {
	raw := `---
id: ja-n5-01-politeness
track: japanese-jlpt
locale: en
slug: politeness
title: Politeness
order: 1
published: true
jlpt_level: n5
vocab:
  - surface: "はい"
    reading: "はい"
    gloss: "yes"
exercise:
  type: mcq
  prompt: "Which means yes?"
  choices:
    - "はい"
    - "いいえ"
  answer: "はい"
---

Hai.
`
	l, err := ParseLessonFile(FileEntry{Path: "japanese-jlpt/en/politeness.md", Content: raw, FileID: "ja1"})
	if err != nil {
		t.Fatal(err)
	}
	if l.Exercise["jlptLevel"] != "n5" {
		t.Fatalf("jlptLevel=%v", l.Exercise["jlptLevel"])
	}
	vocab, ok := l.Exercise["vocab"].([]any)
	if !ok || len(vocab) != 1 {
		t.Fatalf("vocab=%v", l.Exercise["vocab"])
	}
}

func TestChineseHSKCurriculumSmoke(t *testing.T) {
	// apps/api/internal/drive → repo root is ../../../..
	candidates := []string{
		filepath.Join("..", "..", "..", "..", "docs", "curriculum", "chinese-hsk"),
		filepath.Join("..", "..", "..", "docs", "curriculum", "chinese-hsk"),
	}
	var root string
	for _, c := range candidates {
		if st, err := os.Stat(c); err == nil && st.IsDir() {
			root = c
			break
		}
	}
	if root == "" {
		t.Fatal("curriculum root not found")
	}
	var files []string
	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}
		files = append(files, path)
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if len(files) != 24 {
		t.Fatalf("expected 24 chinese-hsk lessons (12x2 locales), got %d", len(files))
	}
	for _, path := range files {
		raw, err := os.ReadFile(path)
		if err != nil {
			t.Fatal(err)
		}
		rel, err := filepath.Rel(root, path)
		if err != nil {
			t.Fatal(err)
		}
		rel = filepath.ToSlash(rel)
		l, err := ParseLessonFile(FileEntry{Path: "chinese-hsk/" + rel, Content: string(raw), FileID: rel})
		if err != nil {
			t.Fatalf("%s: %v", rel, err)
		}
		if l.TrackID != "chinese-hsk" {
			t.Fatalf("%s: track=%s", rel, l.TrackID)
		}
		if !l.Published {
			t.Fatalf("%s: expected published", rel)
		}
		if l.Exercise == nil {
			t.Fatalf("%s: missing exercise", rel)
		}
		typ, _ := l.Exercise["type"].(string)
		if typ != "mcq" && typ != "fill_blank" {
			t.Fatalf("%s: bad exercise type %v", rel, l.Exercise["type"])
		}
		ans, _ := l.Exercise["answer"].(string)
		if strings.TrimSpace(ans) == "" {
			t.Fatalf("%s: empty answer", rel)
		}
		vocab, ok := l.Exercise["vocab"].([]any)
		if !ok || len(vocab) == 0 {
			t.Fatalf("%s: missing vocab merge", rel)
		}
		band := l.Exercise["hskBand"]
		switch v := band.(type) {
		case int:
			if v != 1 {
				t.Fatalf("%s: hskBand=%v", rel, band)
			}
		case int64:
			if v != 1 {
				t.Fatalf("%s: hskBand=%v", rel, band)
			}
		default:
			t.Fatalf("%s: hskBand type %T=%v", rel, band, band)
		}
	}
}

func TestChineseITVocabCurriculumSmoke(t *testing.T) {
	candidates := []string{
		filepath.Join("..", "..", "..", "..", "docs", "curriculum", "chinese-it-vocab"),
		filepath.Join("..", "..", "..", "docs", "curriculum", "chinese-it-vocab"),
	}
	var root string
	for _, c := range candidates {
		if st, err := os.Stat(c); err == nil && st.IsDir() {
			root = c
			break
		}
	}
	if root == "" {
		t.Fatal("chinese-it-vocab curriculum root not found")
	}
	var files []string
	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}
		files = append(files, path)
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if len(files) != 12 {
		t.Fatalf("expected 12 chinese-it-vocab lessons (6x2 locales), got %d", len(files))
	}
	for _, path := range files {
		raw, err := os.ReadFile(path)
		if err != nil {
			t.Fatal(err)
		}
		rel, err := filepath.Rel(root, path)
		if err != nil {
			t.Fatal(err)
		}
		rel = filepath.ToSlash(rel)
		l, err := ParseLessonFile(FileEntry{Path: "chinese-it-vocab/" + rel, Content: string(raw), FileID: rel})
		if err != nil {
			t.Fatalf("%s: %v", rel, err)
		}
		if l.TrackID != "chinese-it-vocab" {
			t.Fatalf("%s: track=%s", rel, l.TrackID)
		}
		if !l.Published {
			t.Fatalf("%s: expected published", rel)
		}
		if l.Exercise == nil {
			t.Fatalf("%s: missing exercise", rel)
		}
		typ, _ := l.Exercise["type"].(string)
		if typ != "mcq" && typ != "fill_blank" {
			t.Fatalf("%s: bad exercise type %v", rel, l.Exercise["type"])
		}
		ans, _ := l.Exercise["answer"].(string)
		if strings.TrimSpace(ans) == "" {
			t.Fatalf("%s: empty answer", rel)
		}
		vocab, ok := l.Exercise["vocab"].([]any)
		if !ok || len(vocab) == 0 {
			t.Fatalf("%s: missing vocab merge", rel)
		}
	}
}
