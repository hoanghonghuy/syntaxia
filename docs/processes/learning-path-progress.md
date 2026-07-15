# Learning path and progress UX

## Purpose

How Syntaxia presents Category → Level → Track → Lessons and resume/progress.

## When to use

- Changing home / track hub / catalog store
- Adding tracks with `category` / `level`
- Debugging Continue CTA or progress %

## Steps

1. Taxonomy columns on `tracks`: `category`, `level` (migration `003_track_taxonomy.sql`).
2. Pure helpers: Go `internal/learning` (`TrackProgress`, `NextIncomplete`, `ResumeAcrossTracks`) + web `app/utils/learningPath.ts`.
3. Home: group by category, show level, Continue when logged in with incomplete lesson.
4. Track hub: Continue to next incomplete, `%`, highlight `is-next`.
5. Lesson sidebar stays Mintlify ordered list (free revisit).

## Do

- Keep hybrid IA (Mode levels + Mintlify sidebar), not Duolingo-only path.
- TDD path helpers before UI.
- Ship vi/en i18n keys together (`home.continue`, `catalog.*`, `lesson.progressPercent`).

## Don't

- Force linear lock that blocks revisiting completed lessons.
- Invent categories without updating this doc and seed data.

## Related

- [`product-quality-lock.md`](./product-quality-lock.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
