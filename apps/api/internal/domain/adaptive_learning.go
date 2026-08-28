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

// LearningLessonRef identifies a published lesson without returning its body.
// Weak-skill recommendations use these refs to stay inside the learner's
// completed curriculum frontier.
type LearningLessonRef struct {
	LessonID  string `json:"lessonId"`
	Slug      string `json:"slug"`
	Title     string `json:"title"`
	SortOrder int    `json:"sortOrder"`
}

// WeakSkillSignal is repository-level evidence used to construct an
// explainable repair candidate. It is intentionally not serialized directly.
type WeakSkillSignal struct {
	TrackID        string
	Locale         string
	SkillID        string
	Score          float64
	EvidenceCount  int64
	EvidenceWeight float64
	LastEvidenceAt time.Time
	RecentMistakes int64
	LastMistakeAt  *time.Time
	NextReviewAt   *time.Time
	RepairLesson   *LearningLessonRef
}

// WeakSkillCandidate is an explainable skill repair recommendation. Priority
// and reasons are deterministic product rules rather than an opaque score.
type WeakSkillCandidate struct {
	SkillID        string             `json:"skillId"`
	MasteryScore   float64            `json:"masteryScore"`
	EvidenceCount  int64              `json:"evidenceCount"`
	EvidenceWeight float64            `json:"evidenceWeight"`
	RecentMistakes int64              `json:"recentMistakes"`
	LastMistakeAt  *time.Time         `json:"lastMistakeAt,omitempty"`
	LastEvidenceAt time.Time          `json:"lastEvidenceAt"`
	NextReviewAt   *time.Time         `json:"nextReviewAt,omitempty"`
	ReviewDue      bool               `json:"reviewDue"`
	Priority       string             `json:"priority"`
	Reasons        []string           `json:"reasons"`
	RepairLesson   *LearningLessonRef `json:"repairLesson,omitempty"`
}

// WeakSkillReadModel is the bounded P1.2 response consumed by later adaptive
// session composition. Frontier is the furthest completed published lesson in
// this track/locale; candidates never invent curriculum beyond it.
type WeakSkillReadModel struct {
	TrackID          string               `json:"trackId"`
	Locale           string               `json:"locale"`
	AsOf             time.Time            `json:"asOf"`
	RecentWindowDays int                  `json:"recentWindowDays"`
	Frontier         *LearningLessonRef   `json:"frontier,omitempty"`
	Candidates       []WeakSkillCandidate `json:"candidates"`
}
