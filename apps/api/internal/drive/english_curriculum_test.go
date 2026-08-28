package drive

import (
	"io/fs"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"

	"syntaxia/apps/api/internal/learning"
)

func englishCurriculumRoot(t *testing.T) string {
	t.Helper()
	candidates := []string{
		filepath.Join("..", "..", "..", "..", "docs", "curriculum", "english-basics"),
		filepath.Join("..", "..", "..", "docs", "curriculum", "english-basics"),
	}
	for _, candidate := range candidates {
		if stat, err := os.Stat(candidate); err == nil && stat.IsDir() {
			return candidate
		}
	}
	t.Fatal("english-basics curriculum root not found")
	return ""
}

func parseEnglishCurriculumLesson(t *testing.T, root, locale, slug string) map[string]any {
	t.Helper()
	path := filepath.Join(root, locale, slug+".md")
	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("%s/%s: %v", locale, slug, err)
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
	return lesson.Exercise
}

func TestEnglishA1CurriculumSmoke(t *testing.T) {
	root := englishCurriculumRoot(t)

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

func TestEnglishGuidedPracticeExitSkillCoverage(t *testing.T) {
	root := englishCurriculumRoot(t)
	blueprints := learning.EnglishGuidedPracticeBlueprints()
	if err := learning.ValidateGuidedPracticeBlueprints(blueprints); err != nil {
		t.Fatalf("guided-practice blueprints invalid: %v", err)
	}

	for _, bp := range blueprints {
		byLocale := map[string]map[string][]string{}
		for _, locale := range []string{"en", "vi"} {
			exercise := parseEnglishCurriculumLesson(t, root, locale, bp.ExitCheckLessonSlug)
			byLocale[locale] = map[string][]string{}
			covered := map[string]bool{}
			for _, itemKey := range bp.ExitCheckItemKeys {
				skills := learning.LanguageReviewItemSkills(exercise, itemKey)
				if len(skills) == 0 {
					t.Fatalf("%s %s/%s: exit item %s has no authored skills", bp.ID, locale, bp.ExitCheckLessonSlug, itemKey)
				}
				byLocale[locale][itemKey] = skills
				for _, skillID := range skills {
					covered[skillID] = true
				}
			}
			for _, target := range bp.TargetSkills {
				if !covered[target] {
					t.Fatalf("%s %s: target skill %s has no authoritative exit-check evidence path", bp.ID, locale, target)
				}
			}
		}
		for _, itemKey := range bp.ExitCheckItemKeys {
			if !reflect.DeepEqual(byLocale["en"][itemKey], byLocale["vi"][itemKey]) {
				t.Fatalf("%s: EN/VI exit skill parity mismatch for %s: en=%v vi=%v", bp.ID, itemKey, byLocale["en"][itemKey], byLocale["vi"][itemKey])
			}
		}
	}
}
