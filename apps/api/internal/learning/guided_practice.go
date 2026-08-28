package learning

import (
	"fmt"
	"strings"

	"syntaxia/apps/api/internal/domain"
)

const EnglishGuidedPracticeTrackID = "english-basics"

var englishGuidedPracticeBlueprints = []domain.GuidedPracticeBlueprint{
	{
		ID: "en-a1-u01-meeting-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-meeting-01", UnitOrder: 1,
		ScenarioGoal: "Meet someone, introduce yourself, respond, and close the short exchange.",
		RequiredLessonSlugs: []string{"greetings", "meeting-checkpoint"},
		TargetSkills: []string{"en.communication.greeting", "en.communication.self-introduction", "en.communication.closing"},
		AllowedPatterns: []string{"Hi, I'm …", "Nice to meet you.", "See you later."},
		ExitCheckLessonSlug: "meeting-checkpoint",
		ExitCheckItemKeys: []string{"en-u01-check-produce", "en-u01-check-close"},
	},
	{
		ID: "en-a1-u02-people-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-people-02", UnitOrder: 2,
		ScenarioGoal: "Identify a familiar person and introduce a friend or family member.",
		RequiredLessonSlugs: []string{"people", "family", "people-checkpoint"},
		TargetSkills: []string{"en.communication.people-identification", "en.communication.people-introduction", "en.vocabulary.family"},
		AllowedPatterns: []string{"Who's that?", "This is …", "He's my …", "She's my …"},
		ExitCheckLessonSlug: "people-checkpoint",
		ExitCheckItemKeys: []string{"en-u02-check-produce", "en-u02-check-question"},
	},
	{
		ID: "en-a1-u03-find-way-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-find-way-03", UnitOrder: 3,
		ScenarioGoal: "Confirm a room number, ask where a familiar place is, and understand a short location answer.",
		RequiredLessonSlugs: []string{"numbers", "places", "find-way-checkpoint"},
		TargetSkills: []string{"en.number.basic", "en.communication.location-question", "en.listening.location"},
		AllowedPatterns: []string{"Room …?", "Where's the …?", "It's here.", "It's over there."},
		ExitCheckLessonSlug: "find-way-checkpoint",
		ExitCheckItemKeys: []string{"en-u03-check-number", "en-u03-check-place", "en-u03-check-location"},
	},
	{
		ID: "en-a1-u04-cafe-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-cafe-04", UnitOrder: 4,
		ScenarioGoal: "Order one familiar item politely and close a short cafe exchange.",
		RequiredLessonSlugs: []string{"food-drink", "cafe-checkpoint"},
		TargetSkills: []string{"en.communication.cafe-ordering", "en.communication.polite-request", "en.communication.service-closing"},
		AllowedPatterns: []string{"I'd like …, please.", "Anything else?", "No, that's all. Thank you."},
		ExitCheckLessonSlug: "cafe-checkpoint",
		ExitCheckItemKeys: []string{"en-u04-check-order", "en-u04-check-extra"},
	},
	{
		ID: "en-a1-u05-routine-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-routine-05", UnitOrder: 5,
		ScenarioGoal: "Ask when a familiar routine happens and give a short two-step daily schedule.",
		RequiredLessonSlugs: []string{"time-of-day", "daily-routine", "routine-checkpoint"},
		TargetSkills: []string{"en.communication.time-question", "en.communication.daily-routine", "en.communication.sequence"},
		AllowedPatterns: []string{"What time do you …?", "I … at …", "Then I …"},
		ExitCheckLessonSlug: "routine-checkpoint",
		ExitCheckItemKeys: []string{"en-u05-check-produce", "en-u05-check-time-question"},
	},
	{
		ID: "en-a1-u06-shopping-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-shopping-06", UnitOrder: 6,
		ScenarioGoal: "Ask a price, choose one familiar item, and finish a simple purchase.",
		RequiredLessonSlugs: []string{"prices", "shopping", "shopping-checkpoint"},
		TargetSkills: []string{"en.communication.price-question", "en.communication.purchase-decision", "en.communication.shopping"},
		AllowedPatterns: []string{"How much is this?", "I'd like this …, please.", "I'll take it.", "Thank you."},
		ExitCheckLessonSlug: "shopping-checkpoint",
		ExitCheckItemKeys: []string{"en-u06-check-question", "en-u06-check-purchase"},
	},
	{
		ID: "en-a1-u07-home-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-home-07", UnitOrder: 7,
		ScenarioGoal: "Describe one familiar room object and help someone locate another object.",
		RequiredLessonSlugs: []string{"home-things", "where-things", "home-checkpoint"},
		TargetSkills: []string{"en.grammar.there-is", "en.communication.object-location", "en.grammar.prepositions-place"},
		AllowedPatterns: []string{"There's a …", "Where's the …?", "It's on …", "It's under …", "It's in …"},
		ExitCheckLessonSlug: "home-checkpoint",
		ExitCheckItemKeys: []string{"en-u07-check-describe", "en-u07-check-locate"},
	},
	{
		ID: "en-a1-u08-free-time-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-free-time-08", UnitOrder: 8,
		ScenarioGoal: "State a preference, invite someone, and agree on a simple free-time plan.",
		RequiredLessonSlugs: []string{"hobbies", "invitations", "free-time-checkpoint"},
		TargetSkills: []string{"en.communication.preference", "en.communication.invitation", "en.communication.planning"},
		AllowedPatterns: []string{"I like …", "Do you want to …?", "Yes, let's …", "See you there."},
		ExitCheckLessonSlug: "free-time-checkpoint",
		ExitCheckItemKeys: []string{"en-u08-check-like", "en-u08-check-invite", "en-u08-check-finish"},
	},
	{
		ID: "en-a1-u09-personal-practice", TrackID: EnglishGuidedPracticeTrackID,
		UnitID: "en-a1-personal-09", UnitOrder: 9,
		ScenarioGoal: "Exchange age, place, and one concrete possession with a new classmate.",
		RequiredLessonSlugs: []string{"personal-details", "possessions", "personal-checkpoint"},
		TargetSkills: []string{"en.communication.personal-details", "en.communication.possession", "en.grammar.do-question", "en.grammar.possession"},
		AllowedPatterns: []string{"How old are you?", "Where do you live?", "I live in …", "I have a …", "Do you have a …?"},
		ExitCheckLessonSlug: "personal-checkpoint",
		ExitCheckItemKeys: []string{"en-u09-check-age", "en-u09-check-have", "en-u09-check-ask-age", "en-u09-check-have-no"},
	},
}

func EnglishGuidedPracticeBlueprints() []domain.GuidedPracticeBlueprint {
	out := make([]domain.GuidedPracticeBlueprint, len(englishGuidedPracticeBlueprints))
	for i, bp := range englishGuidedPracticeBlueprints {
		out[i] = bp
		out[i].RequiredLessonSlugs = append([]string(nil), bp.RequiredLessonSlugs...)
		out[i].TargetSkills = append([]string(nil), bp.TargetSkills...)
		out[i].AllowedPatterns = append([]string(nil), bp.AllowedPatterns...)
		out[i].ExitCheckItemKeys = append([]string(nil), bp.ExitCheckItemKeys...)
	}
	return out
}

func ValidateGuidedPracticeBlueprints(blueprints []domain.GuidedPracticeBlueprint) error {
	ids := map[string]bool{}
	units := map[string]bool{}
	orders := map[int]bool{}
	for _, bp := range blueprints {
		if strings.TrimSpace(bp.ID) == "" || bp.TrackID != EnglishGuidedPracticeTrackID || strings.TrimSpace(bp.UnitID) == "" {
			return fmt.Errorf("invalid guided-practice identity")
		}
		if bp.UnitOrder < 1 || bp.UnitOrder > 9 {
			return fmt.Errorf("guided-practice unit order must be 1..9: %s", bp.ID)
		}
		if ids[bp.ID] || units[bp.UnitID] || orders[bp.UnitOrder] {
			return fmt.Errorf("duplicate guided-practice identity: %s", bp.ID)
		}
		ids[bp.ID], units[bp.UnitID], orders[bp.UnitOrder] = true, true, true
		if len(bp.RequiredLessonSlugs) == 0 || len(bp.TargetSkills) == 0 || len(bp.AllowedPatterns) == 0 || len(bp.ExitCheckItemKeys) == 0 {
			return fmt.Errorf("incomplete guided-practice blueprint: %s", bp.ID)
		}
		exitLessonRequired := false
		for _, slug := range bp.RequiredLessonSlugs {
			if slug == bp.ExitCheckLessonSlug {
				exitLessonRequired = true
			}
			if strings.HasSuffix(slug, "-review") {
				return fmt.Errorf("delayed review must not gate guided practice: %s", bp.ID)
			}
		}
		if !exitLessonRequired {
			return fmt.Errorf("exit-check lesson must be a prerequisite: %s", bp.ID)
		}
		for _, skillID := range bp.TargetSkills {
			if !strings.HasPrefix(skillID, "en.") {
				return fmt.Errorf("English guided-practice skill must use en.* id: %s", bp.ID)
			}
		}
	}
	return nil
}

func EvaluateGuidedPracticeEligibility(
	trackID, locale string,
	blueprints []domain.GuidedPracticeBlueprint,
	lessons []domain.LessonSummary,
	progress []domain.Progress,
) domain.GuidedPracticeEligibility {
	published := make(map[string]domain.LessonSummary, len(lessons))
	for _, lesson := range lessons {
		if lesson.TrackID == trackID && lesson.Locale == locale && lesson.Published {
			published[lesson.Slug] = lesson
		}
	}
	completed := make(map[string]bool, len(progress))
	for _, row := range progress {
		if row.Locale == locale && row.Completed {
			completed[row.LessonID] = true
		}
	}

	model := domain.GuidedPracticeEligibility{TrackID: trackID, Locale: locale}
	for _, bp := range blueprints {
		unit := domain.GuidedPracticeUnitEligibility{Blueprint: bp, CurriculumReady: true}
		for _, slug := range bp.RequiredLessonSlugs {
			lesson, ok := published[slug]
			if !ok {
				unit.CurriculumReady = false
				unit.MissingPrerequisiteSlugs = append(unit.MissingPrerequisiteSlugs, slug)
				continue
			}
			if !completed[lesson.ID] {
				unit.MissingPrerequisiteSlugs = append(unit.MissingPrerequisiteSlugs, slug)
			}
		}
		unit.Eligible = unit.CurriculumReady && len(unit.MissingPrerequisiteSlugs) == 0
		model.Units = append(model.Units, unit)
	}
	return model
}
