# Japanese lessons — delta spec

## ADDED REQ-JA-001 N5 map precedes content

Published `japanese-jlpt` lessons must appear in `japanese-jlpt-n5-map.md` with cited OpenJLPT/Waller sources.

## ADDED REQ-JA-002 Japanese vocab frontmatter

Vocab entries may use `surface` / `reading` / `gloss` (aliases `kanji`/`kana`); sync preserves them for the client.

## ADDED REQ-JA-003 Language player for japanese-jlpt

Lesson page uses language player (not IT sandboxes) when category is `languages` or track is `japanese-jlpt`.

## ADDED REQ-JA-004 Starter slice size

Ship only the mapped 5–8 lessons (v1: 6), not a full N5 stub dump.

## ADDED REQ-JA-005 Track-scoped lesson fetch

Shared thematic slugs require `?track=japanese-jlpt` on lesson fetch (same as other language tracks).
