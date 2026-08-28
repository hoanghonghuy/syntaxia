package learning

import (
	"sort"
	"time"

	"syntaxia/apps/api/internal/domain"
)

const (
	WeakSkillMasteryTarget     = 80.0
	WeakSkillCriticalThreshold = 60.0
	WeakSkillEstablishedWeight = 1.0
	WeakSkillRecentWindow      = 14 * 24 * time.Hour

	WeakSkillPriorityHigh   = "high"
	WeakSkillPriorityMedium = "medium"
	WeakSkillPriorityWatch  = "watch"

	WeakSkillReasonRecentIncorrect = "recent_incorrect_attempt"
	WeakSkillReasonCriticalMastery = "mastery_below_60"
	WeakSkillReasonBelowTarget     = "mastery_below_80"
	WeakSkillReasonReviewDue       = "review_due"
	WeakSkillReasonLimitedEvidence = "limited_evidence"
)

// BuildWeakSkillCandidates turns persisted mastery/review/attempt signals into
// a bounded, deterministic repair list. There is deliberately no hidden
// recommendation score: ordering is priority -> mastery -> recent mistakes ->
// due state -> evidence weight -> stable skill id.
func BuildWeakSkillCandidates(
	signals []domain.WeakSkillSignal,
	now time.Time,
	limit int,
) []domain.WeakSkillCandidate {
	candidates := make([]domain.WeakSkillCandidate, 0, len(signals))
	for _, signal := range signals {
		// A repair recommendation is actionable only when it resolves to a
		// currently completed, published lesson. Historical mastery survives a
		// progress reset, but P1.2 must never recommend outside today's frontier.
		if signal.RepairLesson == nil {
			continue
		}
		if signal.Score >= WeakSkillMasteryTarget && signal.RecentMistakes == 0 {
			continue
		}

		reviewDue := signal.NextReviewAt != nil && !signal.NextReviewAt.After(now)
		reasons := make([]string, 0, 4)
		if signal.RecentMistakes > 0 {
			reasons = append(reasons, WeakSkillReasonRecentIncorrect)
		}
		if signal.Score < WeakSkillCriticalThreshold {
			reasons = append(reasons, WeakSkillReasonCriticalMastery)
		} else if signal.Score < WeakSkillMasteryTarget {
			reasons = append(reasons, WeakSkillReasonBelowTarget)
		}
		if reviewDue {
			reasons = append(reasons, WeakSkillReasonReviewDue)
		}
		if signal.EvidenceWeight < WeakSkillEstablishedWeight {
			reasons = append(reasons, WeakSkillReasonLimitedEvidence)
		}

		priority := WeakSkillPriorityWatch
		switch {
		case signal.RecentMistakes > 0:
			priority = WeakSkillPriorityHigh
		case signal.Score < WeakSkillCriticalThreshold && signal.EvidenceWeight >= WeakSkillEstablishedWeight:
			priority = WeakSkillPriorityHigh
		case signal.Score < WeakSkillMasteryTarget && signal.EvidenceWeight >= WeakSkillEstablishedWeight:
			priority = WeakSkillPriorityMedium
		}

		candidates = append(candidates, domain.WeakSkillCandidate{
			SkillID:        signal.SkillID,
			MasteryScore:   signal.Score,
			EvidenceCount:  signal.EvidenceCount,
			EvidenceWeight: signal.EvidenceWeight,
			RecentMistakes: signal.RecentMistakes,
			LastMistakeAt:  signal.LastMistakeAt,
			LastEvidenceAt: signal.LastEvidenceAt,
			NextReviewAt:   signal.NextReviewAt,
			ReviewDue:      reviewDue,
			Priority:       priority,
			Reasons:        reasons,
			RepairLesson:   signal.RepairLesson,
		})
	}

	sort.SliceStable(candidates, func(i, j int) bool {
		left, right := candidates[i], candidates[j]
		if weakSkillPriorityRank(left.Priority) != weakSkillPriorityRank(right.Priority) {
			return weakSkillPriorityRank(left.Priority) < weakSkillPriorityRank(right.Priority)
		}
		if left.MasteryScore != right.MasteryScore {
			return left.MasteryScore < right.MasteryScore
		}
		if left.RecentMistakes != right.RecentMistakes {
			return left.RecentMistakes > right.RecentMistakes
		}
		if left.ReviewDue != right.ReviewDue {
			return left.ReviewDue
		}
		if left.EvidenceWeight != right.EvidenceWeight {
			return left.EvidenceWeight > right.EvidenceWeight
		}
		return left.SkillID < right.SkillID
	})

	if limit > 0 && len(candidates) > limit {
		return candidates[:limit]
	}
	return candidates
}

func weakSkillPriorityRank(priority string) int {
	switch priority {
	case WeakSkillPriorityHigh:
		return 0
	case WeakSkillPriorityMedium:
		return 1
	default:
		return 2
	}
}
