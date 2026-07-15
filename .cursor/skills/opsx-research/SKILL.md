---
name: opsx-research
description: >-
  Research mode for /opsx-research — mandatory Context7 library docs and web lookup,
  structured comparison table and recommended approach. Use when the user invokes
  /opsx-research or asks for evidence-based guidance (any topic, not limited to code/spec).
---

# opsx-research

Evidence-based research and advisory output. **Read this skill when `/opsx-research` is invoked.**

Pair with slash command: `.cursor/commands/opsx-research.md`

## vs `/opsx-explore`

| | `/opsx-explore` | `/opsx-research` |
|--|-----------------|------------------|
| Focus | Repo, OpenSpec, change prep | **Any user question** |
| External docs | Optional | **Required when relevant** |
| Output | Open-ended thinking | **Structured + recommendation** |

## Research workflow (execute in order)

1. **Restate** the question and list assumptions if information is missing.
2. **Context7** (when question mentions a library, framework, API, SDK, or version):
   - Call `resolve-library-id` with `libraryName` + full user question as `query`
   - Call `query-docs` with selected `libraryId` + specific question
   - Do not answer version-sensitive API details from memory alone
3. **Web** (when Context7 is insufficient or topic is not a library):
   - Use WebSearch for releases, comparisons, platform quirks, current events
   - Use WebFetch for official docs URLs when needed
4. **Synapse repo** (only when question touches this workspace):
   - MCP: `search_docs`, `memory_context`, `code_context`, `code_query`
   - Read `openspec/changes/` if spec-related
5. **Synthesize** using the output template below — **always conclude with a single recommended approach**.

If a source is unavailable, say so explicitly (UNCONFIRMED). Do not fabricate citations.

## Output template (required)

Respond in **Vietnamese** (clear, simple); keep English for code, commands, and identifiers.

```markdown
## Câu hỏi
(one-sentence restatement)

## Giả định
(bullets, or "Không có" if none)

## Đã tra cứu
| Nguồn | Đã xem | Ghi chú |
| Context7 | … | library ID, topic |
| Web | … | URLs |
| Repo / MCP | … | paths or tools |

## Phân tích
(constraints, root cause, risks)

## So sánh phương án
| Tiêu chí | A | B | … |
|----------|---|---|---|
| … | … | … | … |

## Khuyến nghị (chốt)
**Chọn … vì …**

## Bước tiếp theo
1. …
2. …
→ (if code/spec change needed) `/opsx-explore` or `/opsx-propose <change-id>`
```

## Guardrails

- **Read-only** — do not implement application code or edit specs unless user explicitly asks to capture artifacts
- **Cite sources** — URLs, Context7 library IDs, file paths
- **Fail closed** — if docs contradict memory, trust fetched docs
- **Proportional** — simple questions get shorter output; still include recommendation
- Do not auto-run `/opsx-propose` or `/opsx-apply`

## Context7 quick reference

```
resolve-library-id(libraryName, query)
query-docs(libraryId, query)
```

Max 3 resolve calls per question; max 3 query-docs calls per question.

## Related skills

- `openspec-integration` — OpenSpec lifecycle after research points to a code change
- `web-research-tools` — gateway MCP web tools (when stack is up)
