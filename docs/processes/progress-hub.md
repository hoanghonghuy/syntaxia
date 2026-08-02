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
   - `overallProgressForDomain`, `trackProgressRowsForDomain`, `resumeTargetForDomain`
   - `trackLessonStatusRows` (per-lesson ✓ + `is-next` for hub checklist)
2. Page: `apps/web/app/pages/progress.vue` (`layout: 'learn'`).
3. Load catalog + progress when authenticated; show guest soft gate otherwise.
4. Domain chips (`?domain=it|languages`) scope overall %, Continue, and track cards; share `syntaxia_last_domain` with `/tracks`.
5. Each track card: % bar, Continue, open track (no mega lesson dump).
6. Tests: `cd apps/web && npm run test:learning-path` (+ `test:shell-ux`, `test:i18n`).

## Do

- Keep one clear **Continue** to the next incomplete lesson in the **active domain**
- Show per-track % bars with category/level labels
- Filter by domain chips (shared last-domain storage with `/tracks`)
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
