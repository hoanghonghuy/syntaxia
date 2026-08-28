package domain

import "time"

const (
	DailyItemReview = "review"
	DailyItemRepair = "repair"
	DailyItemLesson = "lesson"
)

// DailyLearningItem is one explainable action in the bounded Today plan.
// The server returns product facts only; clients own presentation/localization.
type DailyLearningItem struct {
	Type             string             `json:"type"`
	EstimatedMinutes int                `json:"estimatedMinutes"`
	ReviewCount      int                `json:"reviewCount,omitempty"`
	SkillID          string             `json:"skillId,omitempty"`
	Priority         string             `json:"priority,omitempty"`
	Reasons          []string           `json:"reasons,omitempty"`
	MasteryScore     *float64           `json:"masteryScore,omitempty"`
	Lesson           *LearningLessonRef `json:"lesson,omitempty"`
}

// DailyLearningSession is a stateless read model rebuilt from current learner
// truth. It is intentionally not persisted so stale plans cannot outlive new
// progress, reviews, or mastery evidence.
type DailyLearningSession struct {
	TrackID          string              `json:"trackId"`
	Locale           string              `json:"locale"`
	AsOf             time.Time           `json:"asOf"`
	TargetMinutes    int                 `json:"targetMinutes"`
	EstimatedMinutes int                 `json:"estimatedMinutes"`
	DueReviewCount   int                 `json:"dueReviewCount"`
	WeakSkillCount   int                 `json:"weakSkillCount"`
	Items            []DailyLearningItem `json:"items"`
}
