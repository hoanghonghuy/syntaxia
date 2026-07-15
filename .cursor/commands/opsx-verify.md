---
name: /opsx-verify
id: opsx-verify
category: Workflow
description: "Validate implementation against change artifacts before archive"
---

Validate that implementation matches change artifacts — **before** `/opsx-archive`.

**Prerequisites:** `syn up`, MCP `synapse` green. Read skill **`opsx-verify-change`** (`.cursor/skills/opsx-verify-change/SKILL.md`) and follow it completely.

**Input:** Optional `change_id` after `/opsx-verify`. If omitted, infer from context or list active changes and ask the user to choose.

---

## Stance

- **Implementation gate** — code, tests, artifacts, workflow step
- **Structured report** — write `reviews/verification-report.md` per skill template
- **Fail closed** — CRITICAL findings block archive until resolved

---

## When to use vs other slashes

| User need | Slash |
|-----------|-------|
| Review artifacts before coding | `/opsx-verify-spec` |
| Verify code + specs before archive | **`/opsx-verify`** |
| Archive completed change | `/opsx-archive` (only after verify PASS) |

---

## Guardrails

- Do not archive inside this command
- Do not skip failing tests
- Read skill for full D-series checks, saturation loop, and MCP tool order
