package drive

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"path"
	"strings"

	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
)

const mimeMarkdown = "text/markdown"

// GoogleDriveClient stores curriculum Markdown under a platform Drive folder
// using nested paths: <track>/<locale>/<slug>.md
type GoogleDriveClient struct {
	svc      *drive.Service
	folderID string
}

func NewGoogleDriveClient(folderID, credsFile string) (*GoogleDriveClient, error) {
	ctx := context.Background()
	svc, err := drive.NewService(ctx,
		option.WithCredentialsFile(credsFile),
		option.WithScopes(drive.DriveScope),
	)
	if err != nil {
		return nil, fmt.Errorf("drive service: %w", err)
	}
	return &GoogleDriveClient{svc: svc, folderID: folderID}, nil
}

func (c *GoogleDriveClient) Backend() string { return "google-drive" }

func (c *GoogleDriveClient) ListLessonFiles(ctx context.Context) ([]FileEntry, error) {
	var out []FileEntry
	err := c.walkFolder(ctx, c.folderID, "", func(relPath, fileID string) error {
		content, err := c.download(ctx, fileID)
		if err != nil {
			return err
		}
		out = append(out, FileEntry{Path: relPath, Content: content, FileID: fileID})
		return nil
	})
	return out, err
}

func (c *GoogleDriveClient) WriteLessonFile(ctx context.Context, relPath, content string) (string, error) {
	relPath = strings.TrimPrefix(strings.ReplaceAll(relPath, "\\", "/"), "/")
	track, locale, slug, ok := RelPathToParts(relPath)
	if !ok {
		return "", fmt.Errorf("invalid lesson path %q (want track/locale/slug.md)", relPath)
	}
	trackID, err := c.ensureFolder(ctx, c.folderID, track)
	if err != nil {
		return "", err
	}
	localeID, err := c.ensureFolder(ctx, trackID, locale)
	if err != nil {
		return "", err
	}
	name := slug + ".md"
	existing, err := c.findChildFile(ctx, localeID, name)
	if err != nil {
		return "", err
	}
	media := bytes.NewReader([]byte(content))
	if existing != nil {
		updated, err := c.svc.Files.Update(existing.Id, &drive.File{}).
			Context(ctx).
			Media(media).
			Fields("id").
			Do()
		if err != nil {
			return "", fmt.Errorf("drive update %s: %w", relPath, err)
		}
		return updated.Id, nil
	}
	created, err := c.svc.Files.Create(&drive.File{
		Name:     name,
		Parents:  []string{localeID},
		MimeType: mimeMarkdown,
	}).Context(ctx).Media(media).Fields("id").Do()
	if err != nil {
		return "", fmt.Errorf("drive create %s: %w", relPath, err)
	}
	return created.Id, nil
}

func (c *GoogleDriveClient) DeleteLessonFile(ctx context.Context, fileID string) error {
	if fileID == "" || strings.HasPrefix(fileID, "local:") {
		return fmt.Errorf("invalid drive file id")
	}
	return c.svc.Files.Delete(fileID).Context(ctx).Do()
}

func (c *GoogleDriveClient) walkFolder(ctx context.Context, parentID, prefix string, fn func(relPath, fileID string) error) error {
	query := fmt.Sprintf("'%s' in parents and trashed = false", parentID)
	pageToken := ""
	for {
		call := c.svc.Files.List().
			Context(ctx).
			Q(query).
			Fields("nextPageToken, files(id, name, mimeType)").
			PageSize(100)
		if pageToken != "" {
			call = call.PageToken(pageToken)
		}
		resp, err := call.Do()
		if err != nil {
			return fmt.Errorf("drive list: %w", err)
		}
		for _, f := range resp.Files {
			rel := f.Name
			if prefix != "" {
				rel = path.Join(prefix, f.Name)
			}
			if f.MimeType == "application/vnd.google-apps.folder" {
				if err := c.walkFolder(ctx, f.Id, rel, fn); err != nil {
					return err
				}
				continue
			}
			if !strings.HasSuffix(strings.ToLower(f.Name), ".md") {
				continue
			}
			if err := fn(rel, f.Id); err != nil {
				return err
			}
		}
		pageToken = resp.NextPageToken
		if pageToken == "" {
			return nil
		}
	}
}

func (c *GoogleDriveClient) download(ctx context.Context, fileID string) (string, error) {
	resp, err := c.svc.Files.Get(fileID).Context(ctx).Download()
	if err != nil {
		return "", fmt.Errorf("drive download %s: %w", fileID, err)
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

func (c *GoogleDriveClient) ensureFolder(ctx context.Context, parentID, name string) (string, error) {
	existing, err := c.findChildFolder(ctx, parentID, name)
	if err != nil {
		return "", err
	}
	if existing != nil {
		return existing.Id, nil
	}
	created, err := c.svc.Files.Create(&drive.File{
		Name:     name,
		MimeType: "application/vnd.google-apps.folder",
		Parents:  []string{parentID},
	}).Context(ctx).Fields("id").Do()
	if err != nil {
		return "", fmt.Errorf("drive mkdir %s: %w", name, err)
	}
	return created.Id, nil
}

func (c *GoogleDriveClient) findChildFolder(ctx context.Context, parentID, name string) (*drive.File, error) {
	return c.findChild(ctx, parentID, name, true)
}

func (c *GoogleDriveClient) findChildFile(ctx context.Context, parentID, name string) (*drive.File, error) {
	return c.findChild(ctx, parentID, name, false)
}

func (c *GoogleDriveClient) findChild(ctx context.Context, parentID, name string, folder bool) (*drive.File, error) {
	escaped := strings.ReplaceAll(name, `'`, `\'`)
	mimeCond := "mimeType != 'application/vnd.google-apps.folder'"
	if folder {
		mimeCond = "mimeType = 'application/vnd.google-apps.folder'"
	}
	q := fmt.Sprintf("'%s' in parents and name = '%s' and %s and trashed = false", parentID, escaped, mimeCond)
	resp, err := c.svc.Files.List().Context(ctx).Q(q).Fields("files(id, name)").PageSize(1).Do()
	if err != nil {
		return nil, err
	}
	if len(resp.Files) == 0 {
		return nil, nil
	}
	return resp.Files[0], nil
}
