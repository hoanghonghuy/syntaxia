# API / E2E smoke gates

## Purpose

Fail-closed **API-level** smoke for Syntaxia learning paths: IT (SQL), Languages (Chinese / English / Japanese), adaptive Today composition, and catalog integrity (tracks, lesson counts, track-scoped slug disambiguation). Prefer these scripts over Playwright until a browser E2E suite exists.

## When to use

- After auth, curriculum sync, progress/notes, sandbox, catalog, language evidence/mastery, weak-skill, or Today-session changes
- Before release hardening
- Local regression: run `e2e-all.ps1` after docker-up

## Steps

1. Start the stack (API on **8082**):
   ```powershell
   powershell -File scripts/docker-up.ps1
   ```
   Confirm `GET http://127.0.0.1:8082/health` → `status=ok`.

2. **Full API/E2E orchestrator** (recommended):
   ```powershell
   powershell -File scripts/e2e-all.ps1
   ```
   Optional sandboxes:
   ```powershell
   powershell -File scripts/e2e-all.ps1 -IncludeSandboxes
   ```

3. Or run gates individually:
   | Script | Covers |
   |--------|--------|
   | `scripts/e2e-api-catalog.ps1` | Health, providers, tracks (IT+languages), lesson counts, `?track=` slug disambiguation |
   | `scripts/e2e-sql-fundamentals.ps1` | Register → SQL intro → sandbox pass → progress → next |
   | `scripts/e2e-languages.ps1` | Register → ZH/EN/JA lesson+progress+notes → FSRS review → deterministic attempt → mastery → P1.2 weak skills |
   | `scripts/e2e-adaptive-today.ps1` | Fresh English learner → Good/Again evidence → P1.2 first repair candidate → due review + repair + next lesson in exact 15-minute Today plan; raw answers must not leak |
   | `scripts/release-smoke.ps1` | `e2e-all` + IT catalog check + sandboxes + unit tests |

4. Expect exit **0** and a final `PASS: …` line. Any assertion failure exits **non-zero**.

### Adaptive Today contract

The Today E2E intentionally does **not** hard-code a particular weak skill when one authored answer produces evidence for multiple skills. It first reads `/api/v1/learning/weak-skills` and requires `/api/v1/learning/today` to consume P1.2's deterministic first candidate. This locks the architectural boundary: P1.3 composes P1.2 rather than silently reranking weakness.

The same gate requires:

- at least one due FSRS review action;
- one frontier-safe repair action matching P1.2 candidate #1;
- one next published incomplete curriculum action;
- an exact 15-minute composed plan for the fixture;
- no raw correct/wrong submission text in the Today response.

### Shared helper

`scripts/lib/Invoke-SyntaxiaApi.ps1` — cookie-jar `Invoke-WebRequest` wrapper. New smoke scripts should dot-source it.

### Auth cookie

API sets HttpOnly **`syntaxia_token`**. Scripts use `-SessionVariable` / `WebSession` so the cookie persists. Middleware also accepts Bearer; smoke prefers the cookie path.

## Do

- Keep fail-closed; use unique `e2e+…@syntaxia.test` emails
- Assert `?track=` whenever language slugs may collide
- Assert adaptive layers against their upstream source of truth instead of duplicating ranking rules in test fixtures
- Restart API after new curriculum MD so lesson counts match

## Don't

- Depend on Google OAuth for these gates
- Weaken assertions to force green
- Hard-code an adaptive repair choice when P1.2 owns deterministic ordering
- Commit secrets

## Related

- Scripts: `e2e-all.ps1`, `e2e-api-catalog.ps1`, `e2e-sql-fundamentals.ps1`, `e2e-languages.ps1`, `e2e-adaptive-today.ps1`, `release-smoke.ps1`
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- OpenSpec: `openspec/changes/api-e2e-suite/`
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`release-hardening.md`](./release-hardening.md)
- [`languages-tracks.md`](./languages-tracks.md)
