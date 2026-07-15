# SQL Fundamentals E2E smoke

## Purpose

Automated API-level smoke gate for the SQL Fundamentals learning path: register → intro lesson → sandbox pass → hints/solution present → progress → next lesson. Prefer this over Playwright until the UI E2E suite exists.

## When to use

- After curriculum, sandbox, auth, or progress changes that could break the happy path
- Before marking product-perfection checklist **#8** (or re-verifying it)
- Local regression before release hardening (#12)

## Steps

1. Start the stack (API on **8082**):
   ```powershell
   powershell -File scripts/docker-up.ps1
   ```
   Confirm `GET http://127.0.0.1:8082/health` returns `{"status":"ok",...}`.

2. Run the smoke script from the repo root:
   ```powershell
   powershell -File scripts/e2e-sql-fundamentals.ps1
   ```
   Optional base URL:
   ```powershell
   powershell -File scripts/e2e-sql-fundamentals.ps1 -BaseUrl http://127.0.0.1:8082
   ```

3. Expect exit code **0** and a final line `PASS: SQL Fundamentals E2E gate`. Any step failure exits **non-zero** with `FAIL: …`.

### What the script asserts

| Step | Call | Expect |
|------|------|--------|
| Health | `GET /health` | `status=ok` |
| Register | `POST /api/v1/auth/register` | `201` + cookie `syntaxia_token` (Path `/`) |
| Me | `GET /api/v1/auth/me` | same email (cookie jar) |
| List | `GET /api/v1/lessons?track=sql-fundamentals&locale=en` | ≥ 10 lessons, includes `what-is-sql` |
| Lesson | `GET /api/v1/lessons/what-is-sql?locale=en` | `exercise.hints`, `exercise.solution`, `bodyHtml` contains `<table>`, `sandboxSeed` |
| Sandbox | `POST /api/v1/sandbox/run` with `SELECT * FROM movies;` + lesson seed/expected | `passed=true` (auth required) |
| Progress | `PUT /api/v1/progress/{lessonId}` then `GET /api/v1/progress` | intro completed |
| Next | first incomplete by `sortOrder` | not intro; `GET` that lesson succeeds |

### Auth cookie

API sets HttpOnly cookie **`syntaxia_token`** via `SetCookie(..., path "/")` (see `apps/api/pkg/constants` + `handler.setCookie`). The script uses `Invoke-WebRequest -SessionVariable` so the cookie jar persists across calls. Middleware also accepts `Authorization: Bearer`, but the smoke path intentionally exercises the cookie.

## Do

- Keep the script fail-closed (non-zero on any assertion).
- Use a unique email (`e2e+{timestamp}@…`) so re-runs do not collide.
- Fix product bugs if smoke fails; do not weaken assertions to “make green”.

## Don't

- Depend on Google OAuth for this gate (email/password only; Google deferred).
- Treat Playwright as required for #8 — API smoke is the locked approach for now.
- Commit secrets or real user credentials into the script.

## Related

- Script: [`scripts/e2e-sql-fundamentals.ps1`](../../scripts/e2e-sql-fundamentals.ps1)
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#8)
- [`sql-sandbox.md`](./sql-sandbox.md)
- [`learning-path-progress.md`](./learning-path-progress.md)
- [`auth-email-local-phase.md`](./auth-email-local-phase.md)
