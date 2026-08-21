package drive

import (
	"context"
	"os"
	"path/filepath"
	"testing"
)

func TestRepositoryCurriculumLessonFilesParse(t *testing.T) {
	root := filepath.Join("..", "..", "..", "..", "docs", "curriculum")
	client, err := NewLocalClient(root)
	if err != nil {
		t.Fatal(err)
	}
	files, err := client.ListLessonFiles(context.Background())
	if err != nil {
		t.Fatal(err)
	}

	parsed := 0
	for _, file := range files {
		if _, _, _, ok := RelPathToParts(file.Path); !ok {
			continue
		}
		if _, err := ParseLessonFile(file); err != nil {
			t.Errorf("%s: %v", file.Path, err)
			continue
		}
		parsed++
	}
	if parsed == 0 {
		if _, err := os.Stat(root); err != nil {
			t.Fatalf("curriculum root unavailable: %v", err)
		}
		t.Fatal("no curriculum lesson files parsed")
	}
}
