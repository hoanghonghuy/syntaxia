# Language lesson path v2 — sentence steps + Can-Do units

## Context

- Change ID: `language-lesson-path-v2`
- Pedagogy lock: [`docs/processes/language-learning-pedagogy-v2.md`](../../../docs/processes/language-learning-pedagogy-v2.md)
- User feedback: current glossary+MCQ is not how Duolingo/HelloChinese/Busuu teach

## Why

v1 language player teaches recognition of word lists, not communicative use. Research (Duolingo Method/Path; HelloChinese unit micro-exercises) requires sentence-first practice, tips, and review.

## Scope

### In

1. Pedagogy v2 process (done in research gate)
2. Frontmatter `steps[]` schema + parser merge into lesson payload
3. Web player: render ordered steps (dialogue, tip, teach, practice, checkpoint)
4. Legacy fallback when `steps` missing
5. Pilot: rewrite Chinese `greetings` (en+vi) as Can-Do unit lesson with steps
6. Tests (TDD) + freeze note on maps/roadmap (no new v1 themes)

### Out

FSRS engine, speech recognition, stroke canvas, full path chrome redesign, rewriting all tracks in this change

## Decision

Option C from pedagogy v2 — incremental player + one pilot lesson.
