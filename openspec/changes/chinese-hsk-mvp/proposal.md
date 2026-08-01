# Chinese HSK Band 1 MVP — language lesson player + first mapped lessons

Ship the first **Languages** vertical slice on track `chinese-hsk`: HSK 3.0 Band 1–mapped Markdown lessons (5–8) with a language lesson player (`text` + `vocab` + `exercise`), explain locales `vi`/`en`, and existing progress APIs. No SQL/JS sandboxes; no FSRS/stroke/AI/Talkory CMS merge.

## Context

- Change ID: `chinese-hsk-mvp`
- Flow: `sdd`
- Research lock: [`docs/processes/chinese-hsk-pedagogy.md`](../../../docs/processes/chinese-hsk-pedagogy.md)
- Roadmap: Phase 3 of [`docs/processes/multi-domain-roadmap.md`](../../../docs/processes/multi-domain-roadmap.md)
- Prerequisite shipping: domain IA + `chinese-hsk` placeholder (migration `006`)

## Motivation

Home and `/tracks?domain=languages` already surface Chinese, but the track hub is empty and the lesson page only mounts IT sandboxes. Learners need a real Mandarin path that follows HSK 3.0 Band 1 (open lists, not invented outlines) and a pedagogy suited to characters + pinyin — not a SQL sandbox clone.

## Scope

### In

1. **Band 1 map doc** — `docs/processes/chinese-hsk-band1-map.md` (and/or curriculum README) tying open HSK 3.0 Band 1 vocab clusters → first 5–8 lesson slugs
2. **Markdown curriculum** — `docs/curriculum/chinese-hsk/{en,vi}/*.md` with frontmatter: `track`, `locale`, `order`, `objectives`, `hsk_band`, `vocab`, language `exercise` payload
3. **Language lesson player** — render prose + vocab table + MCQ/fill-blank; **do not** mount `SqlSandbox` / `JsSandbox` / `HtmlCssSandbox` for this track
4. **Grading** — client-side check preferred for v1; thin API only if needed for parity with existing patterns
5. **Catalog / hub** — sync so `chinese-hsk` lists real lessons; Languages Continue works when progress exists
6. **Tests + process docs** — player + frontmatter parsing; update pedagogy/roadmap “done when”

### Out

- FSRS / spaced repetition engine
- Stroke-order canvas / handwriting
- Speech recognition / AI tutor
- Full Band 1 (~300 words) dump as empty stubs
- JLPT, English-as-target track, other language tracks
- Talkory DB CMS / wholesale code merge
- DB `tracks.domain` column (still map in `learningDomains.ts`)

## Decision

**Option C from pedagogy lock:** Markdown lessons + text/vocab/exercise player, HSK 3.0 Band 1 thematic slice — fits Syntaxia ops and ships end-to-end without merging Talkory.
