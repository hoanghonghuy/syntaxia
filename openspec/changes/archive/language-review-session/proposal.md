# Language review session

Client-built review practice for language tracks: reuse practice/checkpoint items from **completed** lessons (no invented outlines).

## Context

- Change ID: `language-review-session`
- Pedagogy: [`language-learning-pedagogy-v2.md`](../../../docs/processes/language-learning-pedagogy-v2.md) — interleaved review
- Hub path: [`language-unit-path-hub.md`](../../../docs/processes/language-unit-path-hub.md)

## Scope

### In

1. `buildReviewExercisesFromLessons` util (from `exercise.steps`)
2. Page `/tracks/:track/review` with sequential `LanguageExercise`
3. Hub CTA when ≥1 lesson completed (language tracks)
4. Tests + process doc

### Out

FSRS scheduling, review MD curriculum files, XP/streaks

## Decision

Fetch completed lesson bodies → extract practice/checkpoint → shuffled session (cap 8). Empty state if nothing completed.
