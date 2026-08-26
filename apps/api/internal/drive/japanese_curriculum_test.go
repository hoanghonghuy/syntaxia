package drive

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestJapaneseN5CurriculumSmoke(t *testing.T) {
	candidates := []string{
		filepath.Join("..", "..", "..", "..", "docs", "curriculum", "japanese-jlpt"),
		filepath.Join("..", "..", "..", "docs", "curriculum", "japanese-jlpt"),
	}
	var root string
	for _, candidate := range candidates {
		if stat, err := os.Stat(candidate); err == nil && stat.IsDir() {
			root = candidate
			break
		}
	}
	if root == "" {
		t.Fatal("japanese-jlpt curriculum root not found")
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
	if len(files) != 70 {
		t.Fatalf("expected 70 japanese-jlpt lessons (35x2 locales), got %d", len(files))
	}

	foundationFiles := 0
	seenFoundationOrders := map[int]bool{}
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
		lesson, err := ParseLessonFile(FileEntry{Path: "japanese-jlpt/" + rel, Content: string(raw), FileID: rel})
		if err != nil {
			t.Fatalf("%s: %v", rel, err)
		}
		if lesson.TrackID != "japanese-jlpt" || !lesson.Published {
			t.Fatalf("%s: track=%s published=%v", rel, lesson.TrackID, lesson.Published)
		}
		if lesson.Exercise == nil {
			t.Fatalf("%s: missing exercise", rel)
		}
		if level, _ := lesson.Exercise["jlptLevel"].(string); level != "n5" {
			t.Fatalf("%s: jlptLevel=%v", rel, lesson.Exercise["jlptLevel"])
		}
		unitID, _ := lesson.Exercise["unitId"].(string)
		if strings.TrimSpace(unitID) == "" {
			t.Fatalf("%s: missing unitId", rel)
		}
		unitOrder, ok := intValue(lesson.Exercise["unitOrder"])
		if !ok || unitOrder < 0 || unitOrder > 9 {
			t.Fatalf("%s: unitOrder type/value %T=%v", rel, lesson.Exercise["unitOrder"], lesson.Exercise["unitOrder"])
		}
		role, _ := lesson.Exercise["unitRole"].(string)
		if role != "lesson" && role != "checkpoint" && role != "review" {
			t.Fatalf("%s: bad unitRole=%v", rel, lesson.Exercise["unitRole"])
		}
		steps, ok := lesson.Exercise["steps"].([]any)
		if !ok || len(steps) == 0 {
			t.Fatalf("%s: missing Language V3 steps", rel)
		}

		if unitID == "ja-n5-foundation-00" {
			foundationFiles++
			if unitOrder != 0 {
				t.Fatalf("%s: foundation unitOrder=%d, want 0", rel, unitOrder)
			}
			order, ok := frontmatterInt(string(raw), "order")
			if !ok || order < -7 || order > -1 {
				t.Fatalf("%s: foundation sort order=%d, want -7..-1", rel, order)
			}
			seenFoundationOrders[order] = true
		}
	}

	if foundationFiles != 14 {
		t.Fatalf("expected 14 Japanese Unit 0 files (7x2 locales), got %d", foundationFiles)
	}
	for order := -7; order <= -1; order++ {
		if !seenFoundationOrders[order] {
			t.Fatalf("Japanese Unit 0 missing sort order %d", order)
		}
	}
}

func intValue(value any) (int, bool) {
	switch v := value.(type) {
	case int:
		return v, true
	case int64:
		return int(v), true
	default:
		return 0, false
	}
}

func frontmatterInt(raw, key string) (int, bool) {
	frontmatter := strings.SplitN(raw, "---", 3)
	if len(frontmatter) < 3 {
		return 0, false
	}
	prefix := key + ":"
	for _, line := range strings.Split(frontmatter[1], "\n") {
		line = strings.TrimSpace(line)
		if !strings.HasPrefix(line, prefix) {
			continue
		}
		value := strings.TrimSpace(strings.TrimPrefix(line, prefix))
		if value == "-7" { return -7, true }
		if value == "-6" { return -6, true }
		if value == "-5" { return -5, true }
		if value == "-4" { return -4, true }
		if value == "-3" { return -3, true }
		if value == "-2" { return -2, true }
		if value == "-1" { return -1, true }
		return 0, false
	}
	return 0, false
}
