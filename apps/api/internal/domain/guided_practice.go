package domain

// GuidedPracticeBlueprint is an authored, curriculum-bounded unit practice contract.
// It contains target-language practice facts only; learner-facing localized prose
// remains a presentation concern.
type GuidedPracticeBlueprint struct {
	ID                     string   `json:"id"`
	TrackID                string   `json:"trackId"`
	UnitID                 string   `json:"unitId"`
	UnitOrder              int      `json:"unitOrder"`
	ScenarioGoal           string   `json:"scenarioGoal"`
	RequiredLessonSlugs    []string `json:"requiredLessonSlugs"`
	TargetSkills           []string `json:"targetSkills"`
	AllowedPatterns        []string `json:"allowedPatterns"`
	ExitCheckLessonSlug    string   `json:"exitCheckLessonSlug"`
	ExitCheckItemKeys      []string `json:"exitCheckItemKeys"`
}

// GuidedPracticeUnitEligibility explains whether one authored unit-practice
// contract is available inside the learner's current curriculum frontier.
type GuidedPracticeUnitEligibility struct {
	Blueprint                  GuidedPracticeBlueprint `json:"blueprint"`
	CurriculumReady            bool                    `json:"curriculumReady"`
	Eligible                   bool                    `json:"eligible"`
	MissingPrerequisiteSlugs   []string                `json:"missingPrerequisiteSlugs"`
}

// GuidedPracticeEligibility is a deterministic read model. It persists no
// practice session and contains no AI-generated data.
type GuidedPracticeEligibility struct {
	TrackID string                          `json:"trackId"`
	Locale  string                          `json:"locale"`
	Units   []GuidedPracticeUnitEligibility `json:"units"`
}
