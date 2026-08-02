# OpenSpec via skills only (no Synapse runtime)

## Purpose

Lock how agents run OpenSpec / Synapse-named workflows on Syntaxia **without** the local Synapse stack or MCP tools.

## When to use

- Every session that would have called `syn up` or MCP `user-synapse`
- Propose / apply / verify / archive of OpenSpec changes
- Session start / handoff habits

## Steps

1. Read the relevant skill under `.cursor/skills/syn-*` or `.cursor/skills/opsx-*` (and matching `.cursor/commands/`).
2. Follow the skill as a **checklist**: create or edit files under `openspec/changes/`, `openspec/specs/`, `docs/processes/` yourself.
3. Run project tests (`npm run test:*`, `go test`) for evidence — not MCP `openspec_verify`.
4. Archive by moving `openspec/changes/<id>/` → `openspec/changes/archive/<id>/` and merging delta specs into `openspec/specs/` when the skill says to sync.
5. Keep durable notes in `docs/processes/` (not `memory-bank/` / MCP handoff).

## Do

- Use skill markdown and slash-command procedures
- Prefer Context7 / repo search / git for code intel
- Leave Synapse stack **down** (`syn down` if anything is still listening)

## Don't

- Run `syn up`, `syn migrate`, or rely on mcp-gateway / Surreal for this repo
- Call Synapse MCP tools (`memory_context`, `openspec_propose`, `openspec_archive`, `diff_impact`, etc.)
- Block work because Synapse MCP is disconnected or points at another workspace

## Related

- [`AGENTS.md`](../../AGENTS.md) — session policy
- OpenSpec skills: `.cursor/skills/syn-*/`, `.cursor/commands/syn-*.md`
