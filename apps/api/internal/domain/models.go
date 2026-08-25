package domain

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `json:"id"`
	Email        string    `json:"email"`
	DisplayName  string    `json:"displayName"`
	Role         string    `json:"role"`
	HasPassword  bool      `json:"hasPassword"`
	PasswordHash string    `json:"-"`
	GoogleID     *string   `json:"-"`
	CreatedAt    time.Time `json:"createdAt"`
}

type Track struct {
	ID          string            `json:"id"`
	Title       map[string]string `json:"title"`
	Description map[string]string `json:"description"`
	Category    string            `json:"category"`
	Level       string            `json:"level"`
	SortOrder   int               `json:"sortOrder"`
}

type Lesson struct {
	ID           string         `json:"id"`
	Locale       string         `json:"locale"`
	TrackID      string         `json:"trackId"`
	Slug         string         `json:"slug"`
	Title        string         `json:"title"`
	SortOrder    int            `json:"sortOrder"`
	Objectives   []string       `json:"objectives"`
	DriveFileID  *string        `json:"driveFileId,omitempty"`
	BodyMD       string         `json:"bodyMd,omitempty"`
	BodyHTML     string         `json:"bodyHtml,omitempty"`
	Exercise     map[string]any `json:"exercise,omitempty"`
	SandboxSeed  map[string]any `json:"sandboxSeed,omitempty"`
	Published    bool           `json:"published"`
	Version      int            `json:"version"`
}

type LessonSummary struct {
	ID        string `json:"id"`
	Locale    string `json:"locale"`
	TrackID   string `json:"trackId"`
	Slug      string `json:"slug"`
	Title     string `json:"title"`
	SortOrder int    `json:"sortOrder"`
	Published bool   `json:"published"`
	UnitID    string `json:"unitId,omitempty"`
	UnitTitle string `json:"unitTitle,omitempty"`
	// UnitOrder intentionally serializes zero: unit 0 is a valid authored
	// pronunciation/foundation unit, not the absence of ordering metadata.
	UnitOrder int    `json:"unitOrder"`
	UnitCanDo string `json:"unitCanDo,omitempty"`
	UnitRole  string `json:"unitRole,omitempty"`
}

type Progress struct {
	LessonID    string     `json:"lessonId"`
	Locale      string     `json:"locale"`
	Completed   bool       `json:"completed"`
	CompletedAt *time.Time `json:"completedAt,omitempty"`
}

type Note struct {
	ID        uuid.UUID `json:"id"`
	LessonID  string    `json:"lessonId"`
	Locale    string    `json:"locale"`
	Body      string    `json:"body"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// NoteListItem is a notes-hub row with lesson metadata for deep links.
type NoteListItem struct {
	ID        uuid.UUID `json:"id"`
	LessonID  string    `json:"lessonId"`
	Locale    string    `json:"locale"`
	Body      string    `json:"body"`
	UpdatedAt time.Time `json:"updatedAt"`
	Slug      string    `json:"slug"`
	Title     string    `json:"title"`
	TrackID   string    `json:"trackId"`
	Preview   string    `json:"preview"`
}

type SandboxResult struct {
	Columns []string       `json:"columns"`
	Rows    [][]any        `json:"rows"`
	Passed  bool           `json:"passed"`
	Code    string         `json:"code,omitempty"`
	Message string         `json:"message,omitempty"`
	Meta    map[string]any `json:"meta,omitempty"`
}

type LessonFrontmatter struct {
	ID          string         `yaml:"id"`
	Track       string         `yaml:"track"`
	Locale      string         `yaml:"locale"`
	Slug        string         `yaml:"slug"`
	Title       string         `yaml:"title"`
	Order       int            `yaml:"order"`
	Objectives  []string       `yaml:"objectives"`
	Exercise    map[string]any `yaml:"exercise"`
	SandboxSeed map[string]any `yaml:"sandbox_seed"`
	Published   bool           `yaml:"published"`
}
