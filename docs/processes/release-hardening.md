# Release hardening

## Purpose

Ordered smoke and light hardening gate before treating a local build as release-ready. Covers automated scripts/tests plus a short manual UI pass. Google OAuth and Drive sync stay deferred (see [`auth-email-local-phase.md`](./auth-email-local-phase.md)).

## When to use

- Before marking product-perfection checklist **#12** done
- After stacking changes that touch auth, sandbox, curriculum, catalog, or i18n
- Before tagging or handing off a “good local build”

## Steps

Run from the **repo root** unless noted. Prefer fail-closed: stop on the first red step.

### 1. Stack up

```powershell
powershell -File scripts/docker-up.ps1
```

Confirm `GET http://127.0.0.1:8082/health` returns `status=ok`. Web: `http://localhost:3001`.

### 2. SQL Fundamentals E2E

```powershell
powershell -File scripts/e2e-sql-fundamentals.ps1
```

Expect exit **0** and `PASS: SQL Fundamentals E2E gate`. Details: [`e2e-smoke.md`](./e2e-smoke.md).

### 3. Catalog smoke (if script present)

```powershell
powershell -File scripts/check-catalog.ps1
```

Expect exit **0** (sql + code categories; tracks include `sql-fundamentals`, `postgresql`, `javascript-basics`).

### 4. Frontend parity / TOC gates

```bash
cd apps/web
npm run test:i18n
npm run test:toc
```

### 5. Go package tests

```bash
cd apps/api
go test ./internal/learning ./internal/sandbox ./internal/markdown
```

### 6. Manual UI (light)

With web open at `http://localhost:3001`:

1. **Home Continue** — signed-in learner sees Continue toward the next incomplete lesson.
2. **Lesson TOC** — headings appear in the TOC; jump scrolls to the section.
3. **Sandbox hint / solution** — Show hint advances; Show solution reveals after attempts / button; Use solution fills the editor.

### Light a11y / perf (basics only)

- Interactive controls must have visible text or an accessible name (`aria-label` / `aria-labelledby`).
- `<html lang>` must reflect the active locale (set in `app.vue` via `useHead` + `useI18n`).
- Do **not** start large perf/a11y refactors in this gate.

## Do

- Keep env/port docs in [`environment.md`](./environment.md) aligned with `.env.example` and Compose.
- Re-run steps 2–5 after fixing any failure; do not weaken assertions.
- Leave Google login and Drive sync out of this gate until those phases are unlocked.

## Don't

- Skip the E2E or Go tests because “UI looks fine”.
- Treat Playwright as required — API/script smokes are the locked automated path for now.
- Commit secrets, `.synapse/`, or `memory-bank/`.

## Related

- [`e2e-smoke.md`](./e2e-smoke.md)
- [`environment.md`](./environment.md)
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`i18n.md`](./i18n.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#12)
- Scripts: `scripts/docker-up.ps1`, `scripts/e2e-sql-fundamentals.ps1`, `scripts/check-catalog.ps1`
