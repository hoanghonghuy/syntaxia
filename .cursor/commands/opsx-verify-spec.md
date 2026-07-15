---
name: /opsx-verify-spec
id: opsx-verify-spec
category: Workflow
description: "Review OpenSpec artifacts before implementation"
---

Review proposed change artifacts until quality gate passes — **before** `/opsx-apply`.

**Prerequisites:** `syn up`, MCP `synapse` green. Read skill **`opsx-verify-spec`** (`.cursor/skills/opsx-verify-spec/SKILL.md`) and follow it completely.

**Input:** Optional `change_id` after `/opsx-verify-spec`. If omitted, list active changes under `openspec/changes/` (exclude `archive/`) and ask the user to choose.

---

## Stance

- **Artifact-only** — review proposal, design, tasks, delta specs; do not implement code
- **Gate before apply** — CRITICAL findings block `/opsx-apply` until resolved
- **Structured report** — write `reviews/spec-review.md` per skill template

---

## When to use vs other slashes

| User need | Slash |
|-----------|-------|
| Review artifacts before coding | **`/opsx-verify-spec`** |
| Explore ideas, no formal gate | `/opsx-explore` |
| Implement tasks | `/opsx-apply` (run verify-spec first if not done) |
| Verify implementation before archive | `/opsx-verify` |

---

## Guardrails

- Do not implement application code in this command
- Do not archive
- Do not guess `change_id` when multiple active changes exist
- Fail closed when `tasks.md` is missing
