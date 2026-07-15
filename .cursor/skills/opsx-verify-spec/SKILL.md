---
name: opsx-verify-spec
description: >-
  Planning gate for /opsx-verify-spec — review OpenSpec artifacts (proposal, design,
  tasks, delta specs) before implementation. Use after propose/ff and before /opsx-apply.
---

# opsx-verify-spec

Artifact quality gate. **Read this skill when `/opsx-verify-spec` is invoked.**

Pair with slash command: `.cursor/commands/opsx-verify-spec.md`

## Constants

| Constant | Value |
|----------|------:|
| `SATURATION_CEILING_SPEC` | 5 |
| `MAX_EXPANDED_FILES` | 50 (from `review-gate`) |

## Workflow (execute in order)

### 1. Select change

If `change_id` not provided: list `openspec/changes/` (exclude `archive/`). Ask user to choose. Do not auto-select when ambiguous.

### 2. Load artifacts

Read under `openspec/changes/<id>/`:

- `proposal.md`, `design.md`, `tasks.md`, `meta.json`
- `specs/**` if present

### 3. Mechanical gate

Call MCP `openspec_verify`:

```json
{ "change_id": "<id>", "workflow_step": "TasksDraft" }
```

If `tasks.md` does not exist → **CRITICAL HALT**. Tell user to add tasks (via `/opsx-continue`, `/opsx-ff`, or manual edit) before continuing.

If delta specs expected but missing for step → fix artifacts and re-run.

### 4. Artifact review (`review-gate`)

Read skill `review-gate` (`.agent/skills/review-gate/SKILL.md`). Dispatch review on artifact paths only:

- `openspec/changes/<id>/proposal.md`
- `openspec/changes/<id>/design.md`
- `openspec/changes/<id>/tasks.md`
- `openspec/changes/<id>/specs/**`

Use personas from `.synapse/agents/` when available; otherwise default reviewers from `review-gate`.

Map reviewer BLOCKER → **CRITICAL**; concerns → **WARNING**.

### 5. Static checks (same iteration)

| Check | Severity if fail |
|-------|------------------|
| `tasks.md` has unchecked implementation tasks that should be done pre-apply | WARNING (expected before apply) |
| Delta specs: each `### Requirement:` has clear acceptance text | WARNING if vague |
| `proposal.md` goals align with `design.md` approach | WARNING on contradiction |
| `tasks.md` traces to specs (REQ ids or section refs) | SUGGESTION if weak trace |

Optional: `search_docs` with change keywords to catch duplicate/conflicting canonical specs.

### 6. Saturation loop

Repeat steps 3–5 up to `SATURATION_CEILING_SPEC` times:

1. Run mechanical + static + review-gate
2. If **CRITICAL** remain → fix artifacts (not code) → next iteration
3. If zero CRITICAL → exit loop

Display progress: `[Spec review i/N] CRITICAL: k | WARNING: w`

If still CRITICAL after ceiling → HALT; do not recommend `/opsx-apply`.

### 7. Write report

Create directory `openspec/changes/<id>/reviews/` if needed.

Write **`spec-review.md`** using template below.

### 8. User checkpoint

After zero CRITICAL:

- If WARNING only → ask user: fix now, accept with notes, or abort
- If clear → recommend `/opsx-apply <id>`

## Output template (`reviews/spec-review.md`)

```markdown
## Spec Review: <change-id>

**Date:** <ISO date>
**Iterations:** <n>/<SATURATION_CEILING_SPEC>
**Verdict:** PASS | PASS WITH WARNINGS | FAIL

### Summary
| Check | Status |
|-------|--------|
| openspec_verify (TasksDraft) | PASS / FAIL |
| tasks.md present | PASS / FAIL |
| review-gate quorum | PASS / FAIL / SKIPPED |
| Artifact coherence | PASS / WARNING / FAIL |

### Issues
#### CRITICAL
- …

#### WARNING
- …

#### SUGGESTION
- …

### Next step
- PASS → `/opsx-apply <id>`
- FAIL → fix artifacts, re-run `/opsx-verify-spec`
```

Reply to user in **Vietnamese**; keep paths and MCP names in English.

## Guardrails

- **No application code** — edit artifacts only
- **No archive**
- When uncertain, prefer WARNING over CRITICAL
- If `review-gate` / MCP unavailable, run static checks only and note SKIPPED in report

## Related

- `review-gate`, `openspec-change-lifecycle`, `opsx-verify-change`
