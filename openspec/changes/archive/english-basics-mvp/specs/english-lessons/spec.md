# English lessons — delta spec

## ADDED REQ-EN-001 A1 map precedes content

Published `english-basics` lessons must appear in `english-basics-a1-map.md` with cited open sources.

## ADDED REQ-EN-002 English vocab frontmatter

Vocab entries may use `word` / optional `ipa` / `gloss`; sync preserves them for the client.

## ADDED REQ-EN-003 Language player for english-basics

Lesson page uses language player (not IT sandboxes) when category is `languages`.

## ADDED REQ-EN-004 Starter slice size

Ship only the mapped 5–8 lessons (v1: 6), not a full A1 stub dump.

## ADDED REQ-EN-005 Track-scoped lesson fetch

**Given** another languages track may reuse the same `slug` (e.g. `greetings`)  
**When** the client fetches `GET /api/v1/lessons/:slug`  
**Then** it must pass `track=<track_id>`  
**And** the API returns the lesson for that track (not an arbitrary colliding row)
