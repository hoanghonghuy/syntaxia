## Spec Review: lesson-notebook-style

**Date:** 2026-07-30
**Iterations:** 1/5
**Verdict:** PASS WITH WARNINGS

### Summary
| Check | Status |
|-------|--------|
| openspec_verify (TasksDraft) | SKIPPED (MCP not connected) |
| tasks.md present | PASS |
| review-gate quorum | SKIPPED (no .agent/skills/review-gate/) |
| Artifact coherence | PASS |

### Issues
#### CRITICAL
- (none)

#### WARNING
- **W1 — Weak task-to-spec trace:** Tasks don't reference REQ IDs (e.g. "REQ-LESSON-APPEARANCE-001"). Trace is clear by content but explicit IDs would help verification. Low severity — can fix during `/syn-apply` by adding REQ refs in task descriptions.
- **W2 — Dark mode pastel values not specified:** Design says "desaturate pastels slightly" but doesn't give exact hex values. Acceptable — can determine during implementation with visual testing.

#### SUGGESTION
- **S1 — Consider `scroll-margin-top` on h2:** Pill headings with `display: inline-block` may need `scroll-margin-top` to avoid sticky header overlap on anchor navigation. Already exists in current `.prose-lesson h2` — ensure not lost.
- **S2 — `pre` background hardcoded:** Current `#1c1c1e` is not a token. Consider adding `--color-terminal-bg` token for consistency.

### Next step
- PASS WITH WARNINGS → `/syn-apply lesson-notebook-style`
- W1 and W2 are minor; fix during implementation
