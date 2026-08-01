## Verification Report: layout-shell-simplify

**Date:** 2026-07-30
**Iterations:** 1/3
**Verdict:** PASS WITH WARNINGS

### Summary
| Dimension | Status |
|-----------|--------|
| D1: Completeness | PASS |
| D2: Correctness | PASS |
| D3: Coherence | PASS |
| D4: Constraints | WARNING |
| D5: Blast Radius | WARNING |
| Tests | PASS |
| openspec_verify | SKIPPED (MCP invoke Not connected) |
| review-gate | SKIPPED |

### Pre-flight
| Check | Status |
|-------|--------|
| `npm run test:catalog-browse` | PASS (6/6) |
| `npm run test:shell-ux` | PASS (16/16) |
| `npm run test:i18n` | PASS (7/7) |
| search_decisions | SKIPPED (MCP Not connected after auth) |
| openspec_verify | SKIPPED |
| diff_impact | SKIPPED |

### Saturation trace
| Iter | Static CRITICAL | Agent CRITICAL | Action |
|------|-----------------|----------------|--------|
| 1 | 0 | 0 (skipped) | Exit — static PASS |

### Requirement mapping
| REQ | Evidence |
|-----|----------|
| REQ-SHELL-FOOTER-001 | `default.vue` / `learn.vue` 4-tab footer; no Notes/Home tabs; shell-ux asserts |
| REQ-SHELL-FOOTER-002 | `auth.user ? /account : /login` in both layouts |
| REQ-SHELL-NAV-003 | Track hub `open-lessons-btn` removed; hamburger + footer Lessons remain (design W1) |
| REQ-HOME-004 | `featuredTracks` / `HOME_FEATURED_TRACKS=3`; no `previewTracksByCategory` on home |
| REQ-LESSON-005 | Lesson DOM: prose → sandbox → complete → pager → notes; shell-ux order check |
| REQ-LESSON-006 | `.lesson-objectives-mobile` hidden ≥1100px |
| REQ-HUB-007 | Progress without `hub-progress-lessons`; notes `guestBrowse` → `/tracks` |

### Issues
#### CRITICAL
- (none)

#### WARNING
- **W1** — Synapse MCP tools return `Not connected` on invoke (gateway health OK; `mcp_auth` succeeded). Mechanical `openspec_verify` / `diff_impact` / `search_decisions` skipped.
- **W2** — Delta `REQ-SHELL-NAV-003` says “only one” lesson-nav control; design/spec-review allow hamburger **and** footer Lessons. Implementation matches design W1 (ghost button removed only).
- **W3** — Process workspace may be `apps/web` vs repo root (syn doctor WARN) — empty memory risk for decisions.

#### SUGGESTION
- Reload Cursor MCP with workspace at repo root, then re-run mechanical verify if desired.
- Spot-check mobile footer + lesson order in browser.

### Final assessment
**Ready for archive** (PASS WITH WARNINGS — user requested `/syn-archive`).
