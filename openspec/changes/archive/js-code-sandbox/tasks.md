# Tasks: js-code-sandbox

## 1. API grading

- [x] 1.1 Add `gradeJs` in `apps/api/internal/sandbox/` with `returnValue` + `console` types (TDD)
- [x] 1.2 Add `SandboxService.GradeJSForLesson` loading expected from content repo
- [x] 1.3 Register `POST /api/v1/sandbox/js/grade` (auth required)
- [x] 1.4 Handler tests: missing expected → fail closed

## 2. Web worker

- [x] 2.1 Add `apps/web/public/workers/js-sandbox.worker.js`
- [x] 2.2 Add `apps/web/app/utils/jsSandboxWorker.ts` (spawn, timeout, terminate)
- [x] 2.3 Node gate `check-js-sandbox-worker.mjs` (deferred — covered by `check-js-sandbox.ps1`)

## 3. UI

- [x] 3.1 `JsSandbox.vue` (CodeMirror JS, hints, solution reveal, grade flow)
- [x] 3.2 Wire `[slug].vue` track branch
- [x] 3.3 i18n keys en+vi for JS-specific errors (if any beyond shared `lesson.error.*`)

## 4. Curriculum pilots

- [x] 4.1 `variables` exercise en+vi (`returnValue`)
- [x] 4.2 All 9 lessons exercise en+vi (`returnValue` or `console`)
- [x] 4.3 Update `check-i18n-parity.mjs` if exercise presence affects parity rules

## 5. Release gates

- [x] 5.1 `check-js-sandbox.ps1`
- [x] 5.2 Add step to `release-smoke.ps1`
- [x] 5.3 Mark checklist row **#24** done in `product-perfection-checklist.md`
- [x] 5.4 Update `javascript-track.md` sandbox phase to **shipped**

## 6. Progress sync (quality slice #25)

- [x] 6.1 `JsSandbox` + `SqlSandbox` emit `passed` on grade success
- [x] 6.2 Lesson page auto `setProgress(true)` + `loadProgress`
- [x] 6.3 `/progress` lesson checklist via `trackLessonStatusRows`
- [x] 6.4 Docs: `progress-sandbox-sync.md`
