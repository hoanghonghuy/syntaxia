# Tasks: js-code-sandbox

## 1. API grading

- [ ] 1.1 Add `gradeJs` in `apps/api/internal/sandbox/` with `returnValue` + `console` types (TDD)
- [ ] 1.2 Add `SandboxService.GradeJSForLesson` loading expected from content repo
- [ ] 1.3 Register `POST /api/v1/sandbox/js/grade` (auth required)
- [ ] 1.4 Handler tests: missing expected → fail closed

## 2. Web worker

- [ ] 2.1 Add `apps/web/public/workers/js-sandbox.worker.js`
- [ ] 2.2 Add `apps/web/app/utils/jsSandboxWorker.ts` (spawn, timeout, terminate)
- [ ] 2.3 Node gate `check-js-sandbox-worker.mjs`

## 3. UI

- [ ] 3.1 `JsSandbox.vue` (CodeMirror JS, hints, solution reveal, grade flow)
- [ ] 3.2 Wire `[slug].vue` track branch
- [ ] 3.3 i18n keys en+vi for JS-specific errors (if any beyond shared `lesson.error.*`)

## 4. Curriculum pilots

- [ ] 4.1 `variables` exercise en+vi (`returnValue`)
- [ ] 4.2 `functions` exercise en+vi (`returnValue` or `console`)
- [ ] 4.3 Update `check-i18n-parity.mjs` if exercise presence affects parity rules

## 5. Release gates

- [ ] 5.1 `check-js-sandbox.ps1` or extend `e2e-sql-fundamentals` sibling script
- [ ] 5.2 Add step to `release-smoke.ps1`
- [ ] 5.3 Mark checklist row **#24** done in `product-perfection-checklist.md`
- [ ] 5.4 Update `javascript-track.md` sandbox phase to **shipped**
