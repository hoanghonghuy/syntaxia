# Release hardening

## Purpose

Treat Syntaxia as release-ready only when the complete existing product passes the same fail-closed contract locally and in Product CI. This gate covers IT + Languages, runtime curriculum integrity, sandboxes, persistence, frontend production build and regression tests.

Google OAuth and Google Drive production integration remain deferred unless explicitly unlocked; local curriculum is the deterministic release source for automated CI.

## Branch promotion

The release path is `feature/* → develop → main`.

- Feature/fix work targets `develop` by pull request.
- `develop` is the integrated, deployable development line.
- Production promotion is a dedicated `develop → main` pull request.
- Both PR targets must pass the canonical **Product CI** and configured deployment-provider checks.
- Never weaken tests, exact inventory counts or runtime assertions to make a release green.

See [`branch-release-policy.md`](./branch-release-policy.md).

## Canonical automated gate

From the repository root:

```powershell
powershell -File scripts/release-smoke.ps1
```

With the Docker stack already running:

```powershell
powershell -File scripts/release-smoke.ps1 -SkipDocker
```

The script now runs:

1. API `/health`.
2. `e2e-all.ps1 -IncludeSandboxes`:
   - exact runtime curriculum inventory for every published track;
   - EN/VI runtime parity;
   - catalog smoke;
   - SQL Fundamentals E2E;
   - Languages E2E;
   - JavaScript sandbox grade;
   - HTML/CSS sandbox grade.
3. Legacy catalog and JavaScript-track compatibility checks.
4. `go mod verify`, `go test -mod=readonly ./...`, `go vet -mod=readonly ./...`.
5. Nuxt production build.
6. Product-flow, shell/UI system, Language V3, review, i18n, E2E wiring and audit-remediation regressions.

Any failure stops the release smoke immediately.

## Product CI

`.github/workflows/product-ci.yml` is the canonical repository gate. It runs on:

- pull requests to `develop`;
- pull requests to `main`;
- pushes to `develop` and `main`;
- manual `workflow_dispatch`.

Its DB-backed job starts PostgreSQL, applies release migrations, boots the API against local curriculum, runs the full cross-domain E2E + sandboxes and verifies persisted FSRS card/log rows.

## Promotion checklist: develop → main

Before merging the release PR:

- [ ] `develop` contains only intended release changes.
- [ ] Product CI curriculum job is green.
- [ ] Product CI API test/vet job is green.
- [ ] Product CI web build/regression job is green.
- [ ] Product CI DB-backed E2E + sandbox job is green.
- [ ] Deployment-provider status is green; external quota/rate-limit failures are resolved and re-run.
- [ ] No unresolved review comments or known P0/P1 defects.
- [ ] Manual responsive smoke covers Home → Tracks → Lesson → Exercise/Review → Progress/Notes/Account.

After merge, verify the deployment attached to the `main` commit rather than assuming the PR preview is equivalent to production.

## Manual UI smoke

Keep the manual pass short and concrete:

1. Home Continue opens the next expected lesson.
2. Track filtering and pagination remain usable on desktop/mobile.
3. Lesson TOC/navigation works and exercise feedback remains readable.
4. Language checkpoint/review completes and returns persisted state after reload.
5. Progress, Notes, Search and Account show usable guest/member/empty/error states.
6. Keyboard focus is visible and reduced-motion mode removes nonessential animation.

## Do

- Run the same full gate after fixing any release failure.
- Keep environment/port docs aligned with `.env.example` and Compose.
- Treat malformed or missing curriculum nodes as release failures.
- Record provider-only failures separately from application failures.

## Don't

- Merge `develop → main` with a red Product CI job.
- Skip sandboxes because static curriculum tests are green.
- Treat a successful build as proof that DB persistence or E2E flows work.
- Commit secrets or production credentials.

## Related

- [`branch-release-policy.md`](./branch-release-policy.md)
- [`e2e-smoke.md`](./e2e-smoke.md)
- [`environment.md`](./environment.md)
- [`production-deploy.md`](./production-deploy.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- `scripts/release-smoke.ps1`
- `scripts/e2e-all.ps1`
- `scripts/e2e-curriculum-integrity.ps1`
