package drive

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestEnglishA1CurriculumSmoke(t *testing.T) {
	candidates := []string{
		filepath.Join("..", "..", "..", "..", "docs", "curriculum", "english-basics"),
		filepath.Join("..", "..", "..", "docs", "curriculum", "english-basics"),
	}
	var root string
	for _, candidate := range candidates {
		if stat, err := os.Stat(candidate); err == nil && stat.IsDir() {
			root = candidate
			break
		}
	}
	if root == "" {
		t.Fatal("english-basics curriculum root not found")
	}

	var files []string
	if err := filepath.WalkDir(root, func(path string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !entry.IsDir() && strings.HasSuffix(path, ".md") {
			files = append(files, path)
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	if len(files) != 86 {
		t.Fatalf("expected 86 english-basics lessons (43x2 locales), got %d", len(files))
	}

	foundationNodes := 0
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
		lesson, err := ParseLessonFile(FileEntry{Path: "english-basics/" + rel, Content: string(raw), FileID: rel})
		if err != nil {
			t.Fatalf("%s: %v", rel, err)
		}
		if lesson.TrackID != "english-basics" || !lesson.Published {
			t.Fatalf("%s: track=%s published=%v", rel, lesson.TrackID, lesson.Published)
		}
		if lesson.Exercise == nil {
			t.Fatalf("%s: missing exercise", rel)
		}
		if level, _ := lesson.Exercise["cefrLevel"].(string); level != "a1" {
			t.Fatalf("%s: cefrLevel=%v", rel, lesson.Exercise["cefrLevel"])
		}
		unitID, _ := lesson.Exercise["unitId"].(string)
		if strings.TrimSpace(unitID) == "" {
			t.Fatalf("%s: missing unitId", rel)
		}
		order, ok := lesson.Exercise["unitOrder"].(int)
		if !ok {
			if order64, ok64 := lesson.Exercise["unitOrder"].(int64); ok64 {
				order = int(order64)
				ok = true
			}
		}
		if !ok || order < 0 || order > 9 {
			t.Fatalf("%s: unitOrder type/value %T=%v", rel, lesson.Exercise["unitOrder"], lesson.Exercise["unitOrder"])
		}
		if unitID == "en-a1-foundation-00" {
			foundationNodes++
			if order != 0 {
				t.Fatalf("%s: foundation unitOrder=%d, want 0", rel, order)
			}
		}
	}

	if foundationNodes != 18 {
		t.Fatalf("expected 18 English Unit 0 files (9x2 locales), got %d", foundationNodes)
	}
}
