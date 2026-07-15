---
name: /opsx-research
id: opsx-research
category: Workflow
description: "Research mode — Context7 + web + structured recommendation"
---

Enter **research mode**. Investigate the user's question with evidence; deliver a clear recommended approach.

**Prerequisites:** Read skill **`opsx-research`** (`.cursor/skills/opsx-research/SKILL.md`) and follow it completely.

**Input:** The text after `/opsx-research` is the question or problem to research (any topic).

---

## Stance

- **Evidence-first** — Context7 and web before conclusions; repo/MCP when relevant
- **Structured** — use the output template in the skill (comparison table + **chốt** recommendation)
- **Advisory, not implementing** — read-only unless user asks to capture OpenSpec artifacts
- **Honest** — mark gaps UNCONFIRMED; do not fake citations

---

## When to use vs other slashes

| User need | Slash |
|-----------|-------|
| General question, how-to, compare options, external docs | **`/opsx-research`** |
| Explore idea inside repo before a change | `/opsx-explore` |
| Create OpenSpec change folder | `/opsx-propose` |
| Implement tasks | `/opsx-apply` |

---

## Tool order

1. **Context7** — `resolve-library-id` → `query-docs` for libraries/frameworks/APIs
2. **WebSearch / WebFetch** — releases, comparisons, non-library topics
3. **Synapse MCP** (if workspace-related) — `search_docs`, `memory_context`, code intel tools

Optional: `openspec_router` only when user clearly wants a change flow after research.

---

## Output

Follow the **required template** in skill `opsx-research`:

- Câu hỏi → Giả định → Đã tra cứu (table) → Phân tích → So sánh phương án → **Khuyến nghị (chốt)** → Bước tiếp theo

Reply in Vietnamese; keep technical identifiers in English.

---

## Guardrails

- Do not implement application code in this mode
- Do not skip Context7 when the question names a library or API
- Do not auto-run `/opsx-propose`
- End with one clear recommended path
