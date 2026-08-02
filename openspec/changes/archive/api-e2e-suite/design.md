# Design — API + E2E smoke suite

## Approach

1. **Shared helper** — extract `Invoke-Api` / Fail / Ok into `scripts/lib/Invoke-SyntaxiaApi.ps1`; existing SQL script can keep its inline copy or dot-source (prefer dot-source to avoid drift).
2. **Catalog gate** — assert language tracks + minimum lesson counts; assert `greetings` resolves differently for `chinese-hsk` vs `english-basics` when `track` is set.
3. **Languages flow** — one register session; for each of chinese/english/japanese: list → get first lesson with track → PUT progress → POST note with track → list notes.
4. **Orchestrator** — `e2e-all.ps1` runs catalog + sql + languages; release-smoke calls orchestrator (or individual scripts) fail-closed.

## Risks

- Flaky if API not synced — document restart requirement.
- Rate limits on auth — unique emails; reuse one session in languages script.
