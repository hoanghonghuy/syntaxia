# Progress hub

## Purpose

How the `/progress` page shows cross-track learning progress (path-first UX from [`product-quality-lock.md`](./product-quality-lock.md)).

## When to use

- Changing overall / per-track progress UI
- Adding resume / Continue behavior on the progress hub
- Extending `learningPath` helpers used by home and progress

## Steps

1. Helpers live in `apps/web/app/utils/learningPath.ts`:
   - `trackProgress`, `nextIncompleteLesson`
   - `overallProgress`, `trackProgressRows`
   - `trackLessonStatusRows` (per-lesson ✓ + `is-next` for hub checklist)
2. Page: `apps/web/app/pages/progress.vue` (`layout: 'learn'`).
3. Load catalog + progress when authenticated; show guest soft gate otherwise.
4. Each track card: % bar, Continue, **ordered lesson list** with completion marks.
5. Tests: `cd apps/web && npm run test:learning-path`.

## Do

- Keep one clear **Continue** to the next incomplete lesson (via `resumeTarget`)
- Show per-track % bars with category/level labels
- List lessons per track with ✓ and highlight the next incomplete (`is-next`)
- Treat sandbox pass as complete — see [`progress-sandbox-sync.md`](./progress-sandbox-sync.md)
- Ship `progress.*` en+vi together; use skeleton while loading

## Don't

- Replace the hub with a gamified Duolingo-only path
- Require Google auth for progress (email session is enough)
- Lock revisiting completed lessons

## Related

- [`learning-path-progress.md`](./learning-path-progress.md)
- [`progress-sandbox-sync.md`](./progress-sandbox-sync.md)
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)
- [`onboarding.md`](./onboarding.md)
