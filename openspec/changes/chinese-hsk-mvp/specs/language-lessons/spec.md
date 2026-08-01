# Language lessons — delta spec

## Scope

Track `chinese-hsk` (category `languages`, domain Languages): Markdown curriculum, language player blocks, progress reuse.

## Requirements

### ADDED REQ-LANG-001 HSK Band 1 map precedes content

**Given** authors add lessons under `docs/curriculum/chinese-hsk/`  
**When** a lesson is published  
**Then** its theme/vocab cluster is listed in `docs/processes/chinese-hsk-band1-map.md`  
**And** the map cites an open HSK 3.0 Band 1 source (not invented word lists)

### ADDED REQ-LANG-002 Language frontmatter

**Given** a `chinese-hsk` lesson Markdown file  
**When** it is synced  
**Then** metadata includes `hsk_band`, explain `locale`, optional `vocab[]` (`hanzi`, `pinyin`, `gloss`), and language `exercise` (`type` mcq|fill_blank, prompt, answer, optional choices/hints)  
**And** those fields are available to the lesson API/client

### ADDED REQ-LANG-003 Language player blocks

**When** the lesson page loads a published `chinese-hsk` lesson  
**Then** the UI shows Markdown body, vocab list (when present), and language exercise (when present)  
**And** `SqlSandbox`, `JsSandbox`, and `HtmlCssSandbox` are **not** mounted

### ADDED REQ-LANG-004 Language exercise check

**When** the learner submits an answer for a language exercise  
**Then** the client (or thin API) grades against the expected answer  
**And** a correct result enables the existing mark-complete flow for authenticated users

### ADDED REQ-LANG-005 Explain locales

**Given** app locale `en` or `vi`  
**When** fetching a `chinese-hsk` lesson  
**Then** the matching explain-locale body and glosses are returned when published  
**And** target language remains Mandarin (simplified hanzi + pinyin)

### ADDED REQ-LANG-006 Progress reuse

**When** an authenticated learner marks a `chinese-hsk` lesson complete  
**Then** progress is stored via existing progress APIs  
**And** no FSRS / review-queue persistence is required in this change

### ADDED REQ-LANG-007 No Band 1 stub dump

**When** shipping this MVP  
**Then** only the mapped 5–8 lessons (plus any explicitly unpublished drafts) exist  
**And** the full ~300-word Band 1 list is not published as empty stubs

### MODIFIED REQ-LEARN-001 Lesson reader (languages)

**Given** a published language lesson  
**When** GET lesson by slug/track  
**Then** rendered markdown body and language exercise/vocab metadata are returned (same transport as IT lessons)
