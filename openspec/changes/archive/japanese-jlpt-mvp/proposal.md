# Japanese JLPT N5 MVP — vocab UI + first mapped lessons

Ship the first **Japanese** vertical slice on track `japanese-jlpt`: JLPT N5–mapped Markdown lessons (6), language vocab support for `surface` / `reading` / `gloss` (aliases `kanji`/`kana`), explain locales `vi`/`en`, existing progress APIs. No IT sandboxes; no FSRS/stroke/speech.

## Context

- Change ID: `japanese-jlpt-mvp`
- Pedagogy: [`docs/processes/japanese-jlpt-pedagogy.md`](../../../docs/processes/japanese-jlpt-pedagogy.md)
- Map: [`docs/processes/japanese-jlpt-n5-map.md`](../../../docs/processes/japanese-jlpt-n5-map.md)
- Track seed: migration `010_japanese_jlpt_track.sql`

## Scope

### In

1. N5 map doc (cited OpenJLPT vocab-n5)
2. Vocab model: Japanese `surface`/`reading` (or `kanji`/`kana`) → shared `form`/`reading` display; `isLanguageTrack` includes `japanese-jlpt`
3. Sync: preserve top-level `vocab`, `jlpt_level` into exercise JSONB
4. Six paired lessons `docs/curriculum/japanese-jlpt/{en,vi}/`
5. Hub eyebrow already “JLPT N5”; track copy update after lessons; tests + process docs

### Out

FSRS, stroke-order canvas, speech, full N5 dump, N4+, Talkory CMS merge

## Decision

Option C from pedagogy lock: JLPT N5 thematic MD + language player.
