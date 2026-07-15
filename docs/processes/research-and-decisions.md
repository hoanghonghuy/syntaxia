# Research and decisions

## Purpose

Ensure non-trivial choices are evidence-based, then written down so later sessions follow the same locked approach.

## When to use

- Architecture, stack, or design-system questions
- Curriculum structure or lesson outline design
- Security-sensitive features (SQL sandbox, OAuth, Google Drive scopes)
- Any “how should we do X?” that would be expensive to reverse
- Before opening a large OpenSpec change

## Steps

1. Invoke `/opsx-research` and follow `.cursor/skills/opsx-research/SKILL.md`.
2. Use Context7 for libraries/frameworks/APIs; use web search/fetch for comparisons and platform docs.
3. Produce the required research template (question → assumptions → sources → analysis → comparison → **single recommendation**).
4. If the recommendation is adopted (by user or as the default in an approved plan), **write or update** a process doc under `docs/processes/` in the same session.
5. For implementation, continue with `/opsx-propose` → verify → `/opsx-apply` as appropriate.
6. After implementation changes the procedure, update the matching process doc again.

## Do

- End research with one clear recommended path (no open optionality left for future agents).
- Cite sources (Context7 library IDs, URLs, file paths).
- Persist locked decisions in `docs/processes/` (durable), not only in chat or memory-bank.
- Prefer established reference products for curriculum and learning UX (e.g. SQLBolt, Mode, Mintlify IA).

## Don't

- Skip research for stack/design/security decisions and invent from memory alone.
- Leave “Option A vs B” unresolved in process docs.
- Treat memory-bank handoff as a substitute for process docs.
- Auto-run `/opsx-propose` from research unless the user asks.

## Related

- [`AGENTS.md`](../../AGENTS.md) — research-first gate
- [`product-baseline.md`](./product-baseline.md) — current locked baseline
- `.cursor/skills/opsx-research/SKILL.md`
- `.cursor/commands/opsx-research.md`
