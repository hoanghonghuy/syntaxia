# Language review session — FSRS

## Purpose

How Syntaxia runs persistent language review for signed-in learners. Review is per assessed item, scheduled server-side with FSRS, and backed by append-only review history.

This replaces the historical random-sample review implementation.

## When to use

- Changing review unlock rules, session size, grading-to-rating policy, or review UI
- Adding/changing reviewable language exercises
- Changing FSRS parameters, persistence, migrations, or API routes
- Migrating old language lessons to stable assessed item IDs

## Model

Lesson completion and memory are separate:

- `lesson_progress` records whether a lesson was completed.
- `language_review_cards` stores current FSRS state per user + lesson + locale + item key.
- `language_review_logs` stores every submitted FSRS rating with before/after scheduling state.

A completed language lesson becomes eligible for review. Review cards are lazily created when due review is requested, so existing v2 lessons can migrate without a destructive backfill job.

## Stable item keys

1. New v3 assessed steps MUST have an authored `id`.
2. Authored `id` is the persistent review key.
3. Legacy v2 items without IDs receive deterministic compatibility keys:
   - practice: `step-N`
   - checkpoint item: `step-N-item-M`
4. Reordering an id-less legacy assessed step changes its compatibility key. Therefore add authored IDs before materially restructuring old lessons.

## API

Authenticated routes:

- `GET /api/v1/language/review/due?track=<track>&locale=<locale>&limit=<n>`
  - validates the language track request
  - ensures cards exist for completed lessons
  - returns only cards whose `due_at <= now`
  - ordered by due time
- `POST /api/v1/language/review`
  - body: `lessonId`, `locale`, `itemKey`, `rating`, optional `responseMs`
  - applies FSRS
  - updates the card and appends a review log in one transaction

## Rating policy

FSRS ratings are `Again=1`, `Hard=2`, `Good=3`, `Easy=4`.

Current product interaction:

- an incorrect submitted attempt records `Again`
- a resolved/correct attempt records `Good`
- writes for one screen are serialized so a rapid wrong -> correct retry cannot reorder `Again` and `Good`

Hard/Easy self-assessment can be exposed later without changing persistence or the scheduler contract.

## Session flow

1. Learner signs in and opens Review from a language track.
2. Web requests due cards from the API.
3. Web loads only completed lesson bodies required by those due cards.
4. Stable `(lessonId, itemKey)` maps each card to the exact exercise definition.
5. The learner resolves the item.
6. The web records the rating; API schedules the next due time with FSRS.
7. When the due queue is exhausted, the session ends.

The server is the scheduling source of truth. The browser must never invent a due date.

## Guest behavior

Guests can complete normal lesson practice, but scheduled review is an account feature because persistence must survive reloads and devices. Do not simulate cross-session FSRS in localStorage and present it as synchronized review.

## Migration / deploy

Migration: `apps/api/migrations/014_language_review_fsrs.sql`.

Keep it wired into:

- local Docker Postgres initialization (`docker-compose.yml`)
- production/Neon migration order (`scripts/db/migrate-neon.ps1`)

The API runtime uses `github.com/open-spaced-repetition/go-fsrs/v4` (FSRS v6 aligned) and Go 1.26.

## Do

- Keep authored item IDs stable after publishing.
- Store scheduler state and logs server-side.
- Keep card update + log insert transactional.
- Preserve review history when changing UI.
- Treat failed attempts as useful scheduling evidence.

## Don't

- Do not randomly sample completed questions and call it spaced repetition.
- Do not delete review logs when a lesson is merely marked incomplete.
- Do not derive due dates in the frontend.
- Do not mass-reorder legacy id-less assessed steps before adding stable IDs.
- Do not mix lesson-completion semantics with memory-state semantics.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-step-audio.md`](./language-step-audio.md)
- `apps/api/internal/learning/language_review.go`
- `apps/api/internal/service/language_review.go`
- `apps/web/app/utils/languageReview.ts`
