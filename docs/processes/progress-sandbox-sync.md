# Progress and sandbox sync

## Purpose

Define how **lesson progress** (`lesson_progress.completed`) stays in sync when a learner passes a SQL or JavaScript sandbox exercise — so Progress hub, Continue CTAs, and track % reflect real practice, not only manual Mark complete.

## When to use

- Changing `JsSandbox.vue`, `SqlSandbox.vue`, or lesson complete UX
- Debugging “passed but not showing on /progress”
- Adding a new graded exercise type

## Steps

1. **Grade pass** — `JsSandbox` / `SqlSandbox` emit `passed` when server grade returns `passed: true` (logged-in users only).
2. **Lesson page** — `[slug].vue` handles `@passed` → `api.setProgress(lessonId, locale, true)` → `catalog.loadProgress()` (idempotent if already complete; no extra toast — sandbox already shows pass).
3. **Manual complete** — Mark complete / Mark incomplete buttons remain for lessons without exercises or learner preference.
4. **Progress hub** — `/progress` uses `trackLessonStatusRows()` for per-track lesson checklists (✓ + `is-next` highlight).
5. **Tests** — `npm run test:learning-path` for helpers; `release-smoke.ps1` for JS/SQL grade gates.

## Do / Don't

**Do**

- Keep SQL and JS sandbox parity for progress writes.
- Allow **Mark incomplete** when the learner wants to reset status.
- Ship `lesson.completed` / `lesson.markIncomplete` en+vi together.

**Don't**

- Write progress for guests (soft gate only).
- Auto-navigate away after pass — learner may re-read the lesson.
- Store sandbox attempt history in Postgres (progress remains a boolean per lesson+locale).

## Related

- [`progress-hub.md`](./progress-hub.md)
- [`learning-path-progress.md`](./learning-path-progress.md)
- [`javascript-sandbox.md`](./javascript-sandbox.md)
- [`sql-sandbox.md`](./sql-sandbox.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
- Checklist row **#25** in [`product-perfection-checklist.md`](./product-perfection-checklist.md)
