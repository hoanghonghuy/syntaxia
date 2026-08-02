# Japanese lessons

Track `japanese-jlpt` (category `languages`, domain Languages): JLPT N5 Markdown curriculum, shared language player, progress reuse.

## REQ-JA-001 N5 map precedes content

**Given** authors add lessons under `docs/curriculum/japanese-jlpt/`  
**When** a lesson is published  
**Then** its theme appears in `docs/processes/japanese-jlpt-n5-map.md`  
**And** lemmas are cited from OpenJLPT / Waller community N5 lists

## REQ-JA-002 Japanese vocab frontmatter

**Given** a `japanese-jlpt` lesson Markdown file  
**When** it is synced  
**Then** vocab entries may use `surface` / `reading` / `gloss` (aliases `kanji`/`kana`)  
**And** `jlpt_level` is preserved on the exercise payload for the client

## REQ-JA-003 Language player for japanese-jlpt

**When** the lesson page loads a published `japanese-jlpt` lesson  
**Then** the UI shows Markdown body, vocab list (when present), and language exercise (when present)  
**And** IT sandboxes are **not** mounted

## REQ-JA-004 Starter slice size

**When** shipping the JLPT N5 starter slice  
**Then** only the mapped thematic lessons (v1: 6 slugs × en/vi) exist  
**And** a full N5 word-list dump is not published as empty stubs

## REQ-JA-005 Track-scoped lesson fetch

**Given** another languages track may reuse the same `slug`  
**When** the client fetches `GET /api/v1/lessons/:slug`  
**Then** it must pass `track=japanese-jlpt`  
**And** the API returns the lesson for that track
