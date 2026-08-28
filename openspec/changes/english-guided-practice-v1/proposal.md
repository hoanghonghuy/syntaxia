# Proposal — english-guided-practice-v1

## Why

Learning Intelligence V1 can identify weak English skills and compose a Today plan, but the product still sends learners back only to authored lesson/review flows. English now needs a richer application step that lets learners use already-taught A1 language in a bounded interaction without giving an AI model authority over curriculum or mastery.

## Change

- Add a stable guided-practice blueprint registry for English Units 1–9.
- Treat guided practice as post-checkpoint unit consolidation; Unit 0 and delayed review nodes are not text-practice prerequisites.
- Add deterministic, authenticated eligibility derived from published curriculum and learner progress.
- Reference existing stable checkpoint item identities for future authoritative exit checks instead of duplicating answer truth.
- Build the later P2 state machine so deterministic fallback works without an AI provider.
- Allow optional AI variation/feedback only behind curriculum/blueprint validation and deterministic fallback.
- Preserve the P1 server-graded attempt → FSRS → evidence → mastery boundary for authoritative exit grading.

## Out of scope

- Generic chatbot
- Voice/STT/pronunciation scoring
- English A2 curriculum
- AI-written production curriculum
- AI-authored mastery/progress updates
- Persisted raw conversation transcripts
- New recommendation or psychometric model
