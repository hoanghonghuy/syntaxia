---
name: opsx-verify-change
description: >-
  Implementation gate for /opsx-verify — validate code and artifacts match before
  archive. D-series dimensions, tests, Synapse MCP, saturation loop, structured reports.
---

# opsx-verify-change

Implementation verification gate. **Read this skill when `/opsx-verify` is invoked.**

Pair with slash command: `.cursor/commands/opsx-verify.md`

## Constants

| Constant | Value |
|----------|------:|
| `SATURATION_CEILING_CHANGE` | 3 |
| `MAX_EXPANDED_FILES` | 50 (from `review-gate`) |

## Workflow (execute in order)

### 1. Select change

If `change_id` not provided: list active changes or infer from session. Ask if ambiguous.

Confirm change is **not** under `openspec/changes/archive/`.

### 2. Pre-flight

Call MCP `search_decisions` with keywords from `proposal.md` / change id (limit 10).

- ADR violation vs implementation → **CRITICAL**
- Tool failure → **WARNING**, continue

### 3. Load context

Read `openspec/changes/<id>/`: `proposal.md`, `design.md`, `tasks.md`, `specs/**`, prior `reviews/spec-review.md` if present.

### 4. Run scoped tests

From `tasks.md` and changed files, run appropriate commands:

- Go: `go test ./path/...` (scoped packages)
- Node: `npm test` in relevant package dir
- Other: project test command from `AGENTS.md` / docs

Test failure → **CRITICAL** (list failing test output).

### 5. Mechanical gate

```json
{ "change_id": "<id>", "workflow_step": "Verifying" }
```

`openspec_verify` failure → **CRITICAL** (list `errors`).

Optional: `workflow_status` — note current step; expect `Verifying` → `Done` when passing.

### 6. Unified saturation loop (max 3 outer)

For `iteration = 1..SATURATION_CEILING_CHANGE`:

#### 6.1 Static gates (D1–D5)

Run in order; tag findings `source: static`, `iteration: N`.

**D5 — Blast radius (first)**

- MCP `diff_impact` (or `code_impact` if diff unavailable)
- High-impact paths not mentioned in `tasks.md` or `design.md` → **CRITICAL**
- Medium impact → **WARNING**
- Tool failure → **WARNING**, note in report

**D1 — Completeness**

- Parse `tasks.md`: `- [ ]` vs `- [x]`
- Incomplete implementation tasks → **CRITICAL** each
- Section `## Verification Checklist`: incomplete items → **CRITICAL**
- Checked `- [x]` without evidence in code or test output → **WARNING**

**D2 — Correctness** (when `specs/` exists)

- For each `### Requirement:` in delta specs:
  - MCP `code_query` / `search_docs` for keywords
  - No plausible implementation → **CRITICAL**
  - Likely divergence → **WARNING**
- For each `#### Scenario:`:
  - Missing test or handler → **WARNING**

**D3 — Coherence**

- Compare `design.md` decisions to changed code via `code_context`
- Contradiction → **WARNING** (CRITICAL if security/safety)

**D4 — Constraints**

- Cross-check `search_decisions` results vs code paths

**Graceful degradation**

- tasks only → D1 + D5; note skipped dimensions
- tasks + specs → D1, D2, D5
- full artifacts → all dimensions

#### 6.2 Fix static CRITICAL

If static CRITICAL remain → apply fixes (code, tasks, specs) → **continue** outer loop (skip agent this iteration unless user requests).

#### 6.3 AI review (optional quorum)

When static CRITICAL = 0: run `review-gate` on changed source files + delta specs (not full repo).

Map BLOCKER → **CRITICAL**; merge into D1–D5.

If agent CRITICAL require code fix → fix → restart outer loop from 6.1.

#### 6.4 Exit

When static and agent layers both have zero CRITICAL → exit loop.

Progress: `[Verify i/3] Static: PASS | Agent: k CRITICAL`

Stall: same CRITICAL twice without fix → HALT.

If iteration 3 ends with CRITICAL → HALT; do not archive.

### 7. Human checkpoint

After loop exits with zero CRITICAL:

- Present WARNING list; user may accept or fix
- Do not finalize until user acknowledges or waives warnings explicitly

### 8. Write reports

Create `openspec/changes/<id>/reviews/` if needed.

- **`verification-report.md`** — scorecard + final assessment (template below)
- **`verification-findings.md`** — all findings with iteration tags

### 9. Final response

```markdown
## Verify: PASS | FAIL

**Change:** <id>

Checks:
- tests: PASS / FAIL
- openspec_verify: PASS / FAIL
- D1–D5: …
- saturation: <n> iterations

Reports: openspec/changes/<id>/reviews/

Next: `/opsx-archive` if PASS and user OK, else fix and re-run `/opsx-verify`.
```

Reply in **Vietnamese**; keep identifiers in English.

## Scorecard template (`verification-report.md`)

```markdown
## Verification Report: <change-id>

**Date:** <ISO date>
**Iterations:** <n>/3

### Summary
| Dimension | Status |
|-----------|--------|
| D1: Completeness | PASS / WARNING / FAIL |
| D2: Correctness | PASS / WARNING / FAIL |
| D3: Coherence | PASS / WARNING / FAIL |
| D4: Constraints | PASS / WARNING / FAIL |
| D5: Blast Radius | PASS / WARNING / FAIL |
| Tests | PASS / FAIL |
| openspec_verify | PASS / FAIL |
| review-gate | PASS / FAIL / SKIPPED |

### Saturation trace
| Iter | Static CRITICAL | Agent CRITICAL | Action |
|------|-----------------|----------------|--------|

### Issues
#### CRITICAL
#### WARNING
#### SUGGESTION

### Final assessment
Ready for archive | Fix before archiving
```

## Severity policy

| Severity | Blocks archive | Auto-loop |
|----------|----------------|-----------|
| CRITICAL | Yes | Yes (saturation) |
| WARNING | No | No — user HITL |
| SUGGESTION | No | No |

## Guardrails

- Do not archive inside verify
- When uncertain, prefer SUGGESTION over WARNING, WARNING over CRITICAL
- Every issue should include actionable recommendation with `file:line` when possible
- Re-run verify if user edits code after PASS but before archive

## Related

- `opsx-verify-spec`, `review-gate`, `openspec-change-lifecycle`, `artifact-generation-core`
