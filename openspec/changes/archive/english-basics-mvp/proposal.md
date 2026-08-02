# English Basics CEFR A1 MVP — vocab UI + first mapped lessons

Ship the first **English** vertical slice on track `english-basics`: CEFR A1–mapped Markdown lessons (6), language vocab support for `word` / `ipa` / `gloss`, explain locales `vi`/`en`, existing progress APIs. No IT sandboxes; no FSRS/speech.

## Context

- Change ID: `english-basics-mvp`
- Pedagogy: [`docs/processes/english-basics-pedagogy.md`](../../../docs/processes/english-basics-pedagogy.md)
- Map: [`docs/processes/english-basics-a1-map.md`](../../../docs/processes/english-basics-a1-map.md)
- Track seed: migration `008_english_basics_track.sql`

## Scope

### In

1. A1 map doc (cited open YLE dataset themes)
2. Vocab model/UI: Chinese `hanzi`/`pinyin` **or** English `word`/`ipa` → shared `form`/`reading` display
3. Sync: preserve top-level `vocab`, `cefr_level` into exercise JSONB
4. Six paired lessons `docs/curriculum/english-basics/{en,vi}/`
5. Hub eyebrow “CEFR A1”; tests + process docs

### Out

FSRS, speech, full A1 dump, JLPT, British-only track variant, Talkory CMS merge

## Decision

Option C from pedagogy lock: CEFR A1 thematic MD + language player.
