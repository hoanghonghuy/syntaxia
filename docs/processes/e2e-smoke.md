# API / E2E smoke gates

## Purpose

Fail-closed **API-level** smoke for Syntaxia learning paths: IT (SQL), Languages (Chinese / English / Japanese), adaptive Today composition, English guided-practice eligibility/evidence, and catalog integrity (tracks, lesson counts, track-scoped slug disambiguation). Prefer these scripts over Playwright until a browser E2E suite exists.

## When to use

- After auth, curriculum sync, progress/notes, sandbox, catalog, language evidence/mastery, weak-skill, Today-session, or guided-practice changes
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
   | `scripts/e2e-guided-practice.ps1` | Fresh English learner → exactly 9 Unit 1–9 blueprints → Unit 0 excluded → Unit 1 unlocks only after lesson + checkpoint → stable exit checks sync into P1 → server-graded Good attempts → target-skill mastery 80 |
   | `scripts/e2e-adaptive-today.ps1` | Fresh English learner → Good/Again evidence → P1.2 first repair candidate → due review + repair + next lesson in exact 15-minute Today plan; raw answers must not leak |
   | `scripts/release-smoke.ps1` | `e2e-all` + IT catalog check + sandboxes + unit tests |

4. Expect exit **0** and a final `PASS: …` line. Any assertion failure exits **non-zero**.

### Guided-practice P2.0 contract

The guided-practice E2E locks the first P2 boundary before any AI provider is introduced:

- exactly one authored blueprint exists for each English communicative Unit 1–9;
- Unit 0 pronunciation remains outside text guided practice;
- all required lesson/checkpoint slugs resolve to current published curriculum;
- a fresh learner is not eligible;
- completing only the teaching lesson is insufficient when the unit checkpoint is still incomplete;
- completing the authored lesson(s) plus checkpoint unlocks that unit only;
- delayed `*-review` nodes never appear in `requiredLessonSlugs`;
- stable blueprint target skills and existing checkpoint item identities are returned by the server, not invented by the client;
- every blueprint target skill has at least one authoritative authored exit-check evidence path, with EN/VI skill parity locked by Go regression;
- the Unit 1 fixture syncs its stable exit items into the existing P1 review engine;
- raw exit answers are graded through `POST /api/v1/language/attempt`, not by a P2 grader;
- successful exit checks persist high-confidence P1 mastery (`score=80`, `evidenceWeight=1`) for greeting, self-introduction, and closing;
- attempt responses do not echo raw learner submissions.

P2.1 must extend this same gate with the deterministic fallback state machine. Do not weaken P2.0 frontier/evidence assertions when later AI or UI layers arrive.

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
- Assert guided-practice eligibility from authored prerequisite identities rather than client/UI assumptions
- Assert guided-practice exit evidence through the shared P1 grader/mastery path, never a parallel P2 score
- Restart API after new curriculum MD so lesson counts match

## Don't

- Depend on Google OAuth for these gates
- Weaken assertions to force green
- Hard-code an adaptive repair choice when P1.2 owns deterministic ordering
- Let guided-practice smoke skip checkpoint/frontier safety merely because AI output looks valid
- Add a second grading path for guided-practice exit checks
- Commit secrets

## Related

- Scripts: `e2e-all.ps1`, `e2e-api-catalog.ps1`, `e2e-sql-fundamentals.ps1`, `e2e-languages.ps1`, `e2e-guided-practice.ps1`, `e2e-adaptive-today.ps1`, `release-smoke.ps1`
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- [`english-guided-practice-v1.md`](./english-guided-practice-v1.md)
- OpenSpec: `openspec/changes/api-e2e-suite/`, `openspec/changes/english-guided-practice-v1/`
- [`monorepo-dev.md`](./monorepo-dev.md)
- [`release-hardening.md`](./release-hardening.md)
- [`languages-tracks.md`](./languages-tracks.md)
