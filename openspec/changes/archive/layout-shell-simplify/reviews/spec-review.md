## Spec Review: layout-shell-simplify

**Date:** 2026-07-30
**Iterations:** 1/5
**Verdict:** PASS WITH WARNINGS

### Summary
| Check | Status |
|-------|--------|
| openspec_verify (TasksDraft) | SKIPPED |
| tasks.md present | PASS |
| review-gate quorum | SKIPPED |
| Artifact coherence | PASS |

### Issues
#### CRITICAL
- (none)

#### WARNING
- **W1** — Design allows hamburger OR footer Lessons; implement with footer Lessons in track context + keep hamburger (Mintlify), remove track-hub duplicate ghost only.
- **W2** — Progress “reduce mega dump” is soft; keep track bars, trim per-track full lesson lists if duplicated.

#### SUGGESTION
- Update `check-shell-ux.mjs` in same PR as footer markup.

### Next step
- PASS WITH WARNINGS → `/syn-apply layout-shell-simplify`
