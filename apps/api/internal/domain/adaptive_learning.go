package domain

import (
	"time"

	"github.com/google/uuid"
)

// SkillEvidence is one immutable learner observation derived from an accepted
// server-side learning event.
type SkillEvidence struct {
	UserID           uuid.UUID
	TrackID          string
	LessonID         string
	Locale           string
	ItemKey          string
	SkillID          string
	Source           string
	Rating           int16
	ObservationScore float64
	Confidence       float64
	ObservedAt       time.Time
}

// LanguageAttemptLog captures the minimum durable audit metadata for one
// deterministic server-graded language answer. The raw submission is
// intentionally not persisted.
type LanguageAttemptLog struct {
	UserID        uuid.UUID
	TrackID       string
	LessonID      string
	Locale        string
	ItemKey       string
	Correct       bool
	ResponseMS    *int
	GraderVersion string
	Confidence    float64
	GradedAt      time.Time
}

// LanguageAttemptResult is returned after the authoritative server grader and
// FSRS scheduler have committed one attempt atomically.
type LanguageAttemptResult struct {
	Correct    bool               `json:"correct"`
	Rating     int                `json:"rating"`
	Confidence float64            `json:"confidence"`
	Card       LanguageReviewCard `json:"card"`
}

// SkillMastery is the current aggregate for one stable authored skill id.
type SkillMastery struct {
	TrackID        string    `json:"trackId"`
	Locale         string    `json:"locale"`
	SkillID        string    `json:"skillId"`
	Score          float64   `json:"score"`
	EvidenceCount  int64     `json:"evidenceCount"`
	EvidenceWeight float64   `json:"evidenceWeight"`
	LastEvidenceAt time.Time `json:"lastEvidenceAt"`
}
