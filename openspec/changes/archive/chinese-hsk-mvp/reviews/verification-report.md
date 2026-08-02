## Verification Report: chinese-hsk-mvp

**Date:** 2026-08-02  
**Iterations:** 1/3

### Summary
| Dimension | Status |
|-----------|--------|
| D1: Completeness | PASS |
| D2: Correctness | PASS |
| D3: Coherence | PASS |
| D4: Constraints | WARNING |
| D5: Blast Radius | WARNING |
| Tests | PASS |
| openspec_verify | FAIL (tool/workspace) |
| review-gate | SKIPPED |

### Saturation trace
| Iter | Static CRITICAL | Agent CRITICAL | Action |
|------|-----------------|----------------|--------|
| 1 | 0 | 0 (skipped) | Write reports; note MCP warnings |

### Issues

#### CRITICAL
_(none)_

#### WARNING
1. **openspec_verify** — Cursor MCP `user-synapse` reported `Not connected` / previously pointed at another workspace (`taskflow-mvp`). Local Synapse stack for **syntaxia** is up (`syn up`), but IDE MCP did not verify this change folder. Manual artifact check: `proposal.md`, `design.md`, `tasks.md`, `meta.json`, `specs/language-lessons/spec.md` present.
2. **search_decisions / diff_impact** — Surreal/brain for MCP either offline or wrong workspace; D4/D5 degraded to static review.
3. **Browser smoke** — API/web not running locally during verify; curriculum/player smoke covered by automated tests instead of live mark-complete UI.

#### SUGGESTION
- Reload Cursor MCP after `syn up` so `openspec_verify` targets syntaxia.
- Apply migration `007_chinese_hsk_band1_copy.sql` + restart API to sync MD lessons into Postgres before manual UI pass.

### Evidence (tests)
- `apps/web`: `npm run test:chinese-hsk` — PASS (utils, 12 lessons, self-grade smoke, lesson-page gate)
- `apps/web`: `test:languages-placeholder`, `test:i18n`, `test:learning-domains`, `test:shell-ux` — PASS (earlier this session)
- `apps/api`: `go test ./internal/drive/ -run ChineseHSK|LanguageVocab` — PASS (parse merge + curriculum smoke)

### Spec coverage (D2)
| Req | Evidence |
|-----|----------|
| REQ-LANG-001 | `docs/processes/chinese-hsk-band1-map.md` cites leonsilicon/hsk3.0 |
| REQ-LANG-002 | `ParseLessonFile` merges vocab/hsk_band; Go smoke on 12 files |
| REQ-LANG-003 | Lesson page mounts Language* components; IT sandboxes require `!isLanguageTrack` |
| REQ-LANG-004 | `gradeLanguageExercise` + LanguageExercise.vue |
| REQ-LANG-005 | Paired en/vi MD under `docs/curriculum/chinese-hsk/` |
| REQ-LANG-006 | Existing mark-complete path unchanged (LanguageExercise `@passed`) |
| REQ-LANG-007 | Exactly 6 slugs × 2 locales |

### Final assessment
**Ready for archive** with warnings accepted (MCP verify + live UI smoke deferred). Prefer user UI smoke after API sync before `/syn-archive` if prod/Neon must show lessons immediately.
