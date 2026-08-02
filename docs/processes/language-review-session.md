# Language review session

## Purpose

How Syntaxia runs **review practice** on language tracks: reuse practice/checkpoint items from completed units (no new invented lemmas).

## When to use

- Changing review unlock rules or session size
- Wiring hub CTAs for review

## Steps

1. Learner completes ≥1 unit → hub shows **Review**.
2. Page `/tracks/:track/review` loads completed lesson bodies and builds a session via `buildReviewSession` (cap 8).
3. Practice only — does not write progress.

## Do / Don't

### Do

- Pool only from completed lessons when progress exists
- Reuse existing `LanguageExercise` grading

### Don't

- Invent review word lists outside completed lesson steps
- Treat review as a substitute for FSRS (deferred)

## Related

- [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)
- OpenSpec archive: `openspec/changes/archive/language-review-session/`
