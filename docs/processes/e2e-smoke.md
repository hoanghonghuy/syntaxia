# API / E2E smoke gates

## Purpose

Fail-closed **API-level** smoke for Syntaxia learning paths: IT (SQL) and Languages (Chinese / English / Japanese), plus catalog integrity (tracks, lesson counts, track-scoped slug disambiguation). Prefer these scripts over Playwright until a browser E2E suite exists.

## When to use

- After auth, curriculum sync, progress/notes, sandbox, or catalog changes
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
   | `scripts/e2e-languages.ps1` | Register → ZH/EN/JA lesson+progress+notes with `?track=` |
   | `scripts/release-smoke.ps1` | `e2e-all` + IT catalog check + sandboxes + unit tests |

4. Expect exit **0** and a final `PASS: …` line. Any assertion failure exits **non-zero**.

### Shared helper

`scripts/lib/Invoke-SyntaxiaApi.ps1` — cookie-jar `Invoke-WebRequest` wrapper. New smoke scripts should dot-source it.

### Auth cookie

API sets HttpOnly **`syntaxia_token`**. Scripts use `-SessionVariable` / `WebSession` so the cookie persists. Middleware also accepts Bearer; smoke prefers the cookie path.

## Do

- Keep fail-closed; use unique `e2e+…@syntaxia.test` emails
- Assert `?track=` whenever language slugs may collide
- Restart API after new curriculum MD so lesson counts match

## Don't

- Depend on Google OAuth for these gates
- Weaken assertions to force green
- Commit secrets

## Related

- Scripts: `e2e-all.ps1`, `e2e-api-catalog.ps1`, `e2e-sql-fundamentals.ps1`, `e2e-languages.ps1`, `release-smoke.ps1`
- OpenSpec: `openspec/changes/api-e2e-suite/`
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`release-hardening.md`](./release-hardening.md)
- [`languages-tracks.md`](./languages-tracks.md)
