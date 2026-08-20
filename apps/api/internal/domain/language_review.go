package domain

import (
	"time"

	"github.com/google/uuid"
)

// LanguageReviewCard stores the persisted FSRS state for one reviewable lesson item.
type LanguageReviewCard struct {
	UserID         uuid.UUID  `json:"-"`
	TrackID        string     `json:"trackId"`
	LessonID       string     `json:"lessonId"`
	Locale         string     `json:"locale"`
	ItemKey        string     `json:"itemKey"`
	DueAt          time.Time  `json:"dueAt"`
	Stability      float64    `json:"stability"`
	Difficulty     float64    `json:"difficulty"`
	ScheduledDays  int64      `json:"scheduledDays"`
	Reps           int64      `json:"reps"`
	Lapses         int64      `json:"lapses"`
	State          int16      `json:"state"`
	LastReviewAt   *time.Time `json:"lastReviewAt,omitempty"`
	RemainingSteps int        `json:"remainingSteps"`
}

type LanguageReviewLog struct {
	UserID           uuid.UUID
	TrackID          string
	LessonID         string
	Locale           string
	ItemKey          string
	Rating           int16
	ResponseMS       *int
	ReviewedAt       time.Time
	DueBefore        time.Time
	DueAfter         time.Time
	StateBefore      int16
	StateAfter       int16
	StabilityBefore  float64
	StabilityAfter   float64
	DifficultyBefore float64
	DifficultyAfter  float64
}
