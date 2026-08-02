# English lessons

Track `english-basics` (category `languages`, domain Languages): CEFR A1 Markdown curriculum, shared language player, progress reuse.

## REQ-EN-001 A1 map precedes content

**Given** authors add lessons under `docs/curriculum/english-basics/`  
**When** a lesson is published  
**Then** its theme appears in `docs/processes/english-basics-a1-map.md`  
**And** the map cites an open beginner English source (not invented word lists)

## REQ-EN-002 English vocab frontmatter

**Given** an `english-basics` lesson Markdown file  
**When** it is synced  
**Then** vocab entries may use `word` / optional `ipa` / `gloss`  
**And** `cefr_level` is preserved on the exercise payload for the client

## REQ-EN-003 Language player for english-basics

**When** the lesson page loads a published `english-basics` lesson  
**Then** the UI shows Markdown body, vocab list (when present), and language exercise (when present)  
**And** IT sandboxes (`SqlSandbox`, `JsSandbox`, `HtmlCssSandbox`) are **not** mounted

## REQ-EN-004 Starter slice size

**When** shipping the CEFR A1 starter slice  
**Then** only the mapped thematic lessons (v1: 6 slugs × en/vi) exist  
**And** a full A1 word-list dump is not published as empty stubs

## REQ-EN-005 Track-scoped lesson fetch

**Given** another languages track may reuse the same `slug` (e.g. `greetings`)  
**When** the client fetches `GET /api/v1/lessons/:slug`  
**Then** it must pass `track=<track_id>`  
**And** the API returns the lesson for that track (not an arbitrary colliding row)
