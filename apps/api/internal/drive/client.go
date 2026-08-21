package drive

import (
	"context"
	"fmt"
	"strings"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/internal/markdown"
)

type FileEntry struct {
	Path    string
	Content string
	FileID  string
}

type Client interface {
	Backend() string
	ListLessonFiles(ctx context.Context) ([]FileEntry, error)
	WriteLessonFile(ctx context.Context, relPath, content string) (fileID string, err error)
	DeleteLessonFile(ctx context.Context, fileID string) error
}

// NewClient returns a Google Drive client when folder ID + credentials are set;
// otherwise falls back to the local curriculum mirror.
func NewClient(folderID, credsFile, localRoot string) (Client, error) {
	local, err := NewLocalClient(localRoot)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(folderID) == "" || strings.TrimSpace(credsFile) == "" {
		return local, nil
	}
	return NewGoogleDriveClient(folderID, credsFile)
}

func ParseLessonFile(entry FileEntry) (domain.Lesson, error) {
	doc, err := markdown.Parse(entry.Content)
	if err != nil {
		return domain.Lesson{}, err
	}
	fm := doc.Frontmatter
	getStr := func(k string) string {
		if v, ok := fm[k].(string); ok {
			return v
		}
		return ""
	}
	getInt := func(k string) int {
		switch v := fm[k].(type) {
		case int:
			return v
		case int64:
			return int(v)
		case float64:
			return int(v)
		default:
			return 0
		}
	}
	getBool := func(k string) bool {
		if v, ok := fm[k].(bool); ok {
			return v
		}
		return false
	}
	l := domain.Lesson{
		ID:        getStr("id"),
		Locale:    getStr("locale"),
		TrackID:   getStr("track"),
		Slug:      getStr("slug"),
		Title:     getStr("title"),
		SortOrder: getInt("order"),
		Published: getBool("published"),
		BodyMD:    doc.Body,
		BodyHTML:  markdown.SimpleRender(doc.Body),
		Version:   1,
	}
	if l.Locale == "" {
		l.Locale = "en"
	}
	if obj, ok := fm["objectives"].([]any); ok {
		for _, o := range obj {
			l.Objectives = append(l.Objectives, fmt.Sprint(o))
		}
	}
	if ex, ok := fm["exercise"].(map[string]any); ok {
		l.Exercise = ex
	}
	ensureExercise := func() {
		if l.Exercise == nil {
			l.Exercise = map[string]any{}
		}
	}
	// Language lessons: top-level authoring metadata is stored in exercise JSONB
	// so the existing lesson schema remains stable while the player can evolve.
	if vocab, ok := fm["vocab"]; ok {
		ensureExercise()
		if _, exists := l.Exercise["vocab"]; !exists {
			l.Exercise["vocab"] = vocab
		}
	}
	if band := getInt("hsk_band"); band > 0 {
		ensureExercise()
		if _, exists := l.Exercise["hskBand"]; !exists {
			l.Exercise["hskBand"] = band
		}
	}
	if ver := getStr("hsk_version"); ver != "" {
		ensureExercise()
		if _, exists := l.Exercise["hskVersion"]; !exists {
			l.Exercise["hskVersion"] = ver
		}
	}
	if cefr := getStr("cefr_level"); cefr != "" {
		ensureExercise()
		if _, exists := l.Exercise["cefrLevel"]; !exists {
			l.Exercise["cefrLevel"] = cefr
		}
	}
	if jlpt := getStr("jlpt_level"); jlpt != "" {
		ensureExercise()
		if _, exists := l.Exercise["jlptLevel"]; !exists {
			l.Exercise["jlptLevel"] = jlpt
		}
	}
	if steps, ok := fm["steps"]; ok {
		ensureExercise()
		if _, exists := l.Exercise["steps"]; !exists {
			l.Exercise["steps"] = steps
		}
	}
	if canDo := getStr("can_do"); canDo != "" {
		ensureExercise()
		if _, exists := l.Exercise["canDo"]; !exists {
			l.Exercise["canDo"] = canDo
		}
	}
	if pattern := getStr("pattern"); pattern != "" {
		ensureExercise()
		if _, exists := l.Exercise["pattern"]; !exists {
			l.Exercise["pattern"] = pattern
		}
	}
	unitStrings := []struct {
		frontmatter string
		exercise    string
	}{
		{frontmatter: "unit_id", exercise: "unitId"},
		{frontmatter: "unit_title", exercise: "unitTitle"},
		{frontmatter: "unit_can_do", exercise: "unitCanDo"},
		{frontmatter: "unit_role", exercise: "unitRole"},
	}
	for _, field := range unitStrings {
		if value := strings.TrimSpace(getStr(field.frontmatter)); value != "" {
			ensureExercise()
			if _, exists := l.Exercise[field.exercise]; !exists {
				l.Exercise[field.exercise] = value
			}
		}
	}
	if unitOrder := getInt("unit_order"); unitOrder > 0 {
		ensureExercise()
		if _, exists := l.Exercise["unitOrder"]; !exists {
			l.Exercise["unitOrder"] = unitOrder
		}
	}
	if seed, ok := fm["sandbox_seed"].(map[string]any); ok {
		l.SandboxSeed = seed
	}
	fileID := entry.FileID
	l.DriveFileID = &fileID
	if l.ID == "" || l.Slug == "" || l.TrackID == "" {
		return domain.Lesson{}, fmt.Errorf("invalid frontmatter in %s", entry.Path)
	}
	return l, nil
}

// RelPathToParts splits "track/locale/slug.md" into components.
func RelPathToParts(relPath string) (track, locale, slug string, ok bool) {
	relPath = strings.TrimPrefix(strings.ReplaceAll(relPath, "\\", "/"), "/")
	parts := strings.Split(relPath, "/")
	if len(parts) != 3 {
		return "", "", "", false
	}
	name := parts[2]
	if !strings.HasSuffix(strings.ToLower(name), ".md") {
		return "", "", "", false
	}
	return parts[0], parts[1], strings.TrimSuffix(name, ".md"), true
}
