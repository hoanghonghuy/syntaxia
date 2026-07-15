package drive

import (
	"context"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

type LocalClient struct {
	root string
}

func NewLocalClient(root string) (*LocalClient, error) {
	abs, err := filepath.Abs(root)
	if err != nil {
		return nil, err
	}
	return &LocalClient{root: abs}, nil
}

func (c *LocalClient) Backend() string { return "local" }

func (c *LocalClient) ListLessonFiles(ctx context.Context) ([]FileEntry, error) {
	var entries []FileEntry
	err := filepath.WalkDir(c.root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(strings.ToLower(d.Name()), ".md") {
			return nil
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}
		raw, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		rel, _ := filepath.Rel(c.root, path)
		entries = append(entries, FileEntry{
			Path:    filepath.ToSlash(rel),
			Content: string(raw),
			FileID:  "local:" + filepath.ToSlash(rel),
		})
		return nil
	})
	return entries, err
}

func (c *LocalClient) WriteLessonFile(ctx context.Context, relPath, content string) (string, error) {
	select {
	case <-ctx.Done():
		return "", ctx.Err()
	default:
	}
	full := filepath.Join(c.root, filepath.FromSlash(relPath))
	if err := os.MkdirAll(filepath.Dir(full), 0o755); err != nil {
		return "", err
	}
	if err := os.WriteFile(full, []byte(content), 0o644); err != nil {
		return "", err
	}
	return "local:" + filepath.ToSlash(relPath), nil
}

func (c *LocalClient) DeleteLessonFile(ctx context.Context, fileID string) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}
	path := strings.TrimPrefix(fileID, "local:")
	full := filepath.Join(c.root, filepath.FromSlash(path))
	return os.Remove(full)
}
