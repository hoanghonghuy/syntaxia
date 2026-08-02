## Verification Report: english-basics-mvp

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
| openspec_verify | SKIPPED (skills-only; no Synapse MCP) |
| review-gate | SKIPPED |

### Saturation trace
| Iter | Static CRITICAL | Agent CRITICAL | Action |
|------|-----------------|----------------|--------|
| 1 | 0 | 0 (skipped) | Write reports; fix slug collision |

### Issues

#### CRITICAL
_(none)_

#### WARNING
1. **Synapse MCP** — project policy is skills-only; no `openspec_verify` / `diff_impact`.
2. **Slug collision fix** — shared slugs (`greetings`, `food-drink`, `places`) required `?track=` on lesson/notes/solution; shipped in same change window.
3. **Neon** — apply `008` + `009` + API restart when prod parity needed.

#### SUGGESTION
- UI smoke: `/tracks/english-basics/lessons/greetings` shows English vocab (`word`/`ipa`), not Chinese hanzi.

### Evidence (tests)
- `apps/web`: `npm run test:english-basics` — PASS (map, 12 files, grade smoke, track fetch)
- `apps/api`: `go test ./internal/drive/ -run Cefr|ChineseHSK|LanguageVocab` — PASS
- `apps/api`: `go test ./internal/repository/ -run GetLessonDisambiguatesByTrack` — PASS
- Live API: `GET .../lessons/greetings?track=english-basics` → `en-a1-01-greetings`; `track=chinese-hsk` → `zh-hsk-b1-01-greetings`
- Curriculum sync after API restart: 6 English lessons listed

### Spec coverage (D2)
| Req | Evidence |
|-----|----------|
| REQ-EN-001 | `english-basics-a1-map.md` cites ozbonus/yle-vocabulary-dataset |
| REQ-EN-002 | `ParseLessonFile` cefr + word/ipa; LanguageVocabList form/reading |
| REQ-EN-003 | Lesson page `isLanguageTrack` gate |
| REQ-EN-004 | 6 slugs × en/vi under `docs/curriculum/english-basics/` |
| REQ-EN-005 | `GetLesson(..., trackID)` + `useApi.lesson(..., track)` |

### Final assessment
**Ready for archive** (skills-only path).
