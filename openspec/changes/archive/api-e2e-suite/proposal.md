# API + E2E smoke suite — full catalog and learning flows

Add fail-closed PowerShell gates that exercise **catalog/auth/lesson APIs** across IT + Languages tracks, plus a languages learning flow and a single orchestrator used by release smoke — so slug collisions, missing tracks, and broken cookie auth are caught early.

## Context

- Change ID: `api-e2e-suite`
- Existing: `scripts/e2e-sql-fundamentals.ps1`, `scripts/release-smoke.ps1`, `docs/processes/e2e-smoke.md`
- Gap: no languages E2E; catalog check omits language tracks; no single “run all API/E2E” entry

## Scope

### In

1. Shared `scripts/lib/Invoke-SyntaxiaApi.ps1` helpers (session cookie jar)
2. `scripts/e2e-api-catalog.ps1` — health, providers, tracks (IT + languages), lesson list counts, track-scoped slug disambiguation
3. `scripts/e2e-languages.ps1` — register → JP/EN/ZH lesson with `?track=` → progress → notes
4. `scripts/e2e-all.ps1` — orchestrates SQL + languages + catalog (+ optional sandbox scripts)
5. Wire into `release-smoke.ps1`; expand `docs/processes/e2e-smoke.md`

### Out

Playwright/browser UI E2E; Google OAuth; admin CMS; load/perf testing

## Decision

Extend PowerShell API smoke (locked for SQL #8) rather than introducing Playwright yet.
