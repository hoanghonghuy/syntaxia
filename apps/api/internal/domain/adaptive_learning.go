package domain

import (
	"time"

	"github.com/google/uuid"
)

// SkillEvidence is one immutable learner observation derived from an accepted
// server-side learning event. Adaptive V1 only emits language_review evidence.
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
	ObservedAt       time.Time
}

// SkillMastery is the current aggregate for one stable authored skill id.
type SkillMastery struct {
	TrackID        string    `json:"trackId"`
	Locale         string    `json:"locale"`
	SkillID        string    `json:"skillId"`
	Score          float64   `json:"score"`
	EvidenceCount  int64     `json:"evidenceCount"`
	LastEvidenceAt time.Time `json:"lastEvidenceAt"`
}
