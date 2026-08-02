# Language lessons

Track `chinese-hsk` (category `languages`, domain Languages): Markdown curriculum, language player blocks, progress reuse.

## REQ-LANG-001 HSK Band 1 map precedes content

**Given** authors add lessons under `docs/curriculum/chinese-hsk/`  
**When** a lesson is published  
**Then** its theme/vocab cluster is listed in `docs/processes/chinese-hsk-band1-map.md`  
**And** the map cites an open HSK 3.0 Band 1 source (not invented word lists)

## REQ-LANG-002 Language frontmatter

**Given** a `chinese-hsk` lesson Markdown file  
**When** it is synced  
**Then** metadata includes `hsk_band`, explain `locale`, optional `vocab[]` (`hanzi`, `pinyin`, `gloss`), and language `exercise` (`type` mcq|fill_blank, prompt, answer, optional choices/hints)  
**And** those fields are available to the lesson API/client

## REQ-LANG-003 Language player blocks

**When** the lesson page loads a published `chinese-hsk` lesson  
**Then** the UI shows Markdown body, vocab list (when present), and language exercise (when present)  
**And** `SqlSandbox`, `JsSandbox`, and `HtmlCssSandbox` are **not** mounted

## REQ-LANG-004 Language exercise check

**When** the learner submits an answer for a language exercise  
**Then** the client (or thin API) grades against the expected answer  
**And** a correct result enables the existing mark-complete flow for authenticated users

## REQ-LANG-005 Explain locales

**Given** app locale `en` or `vi`  
**When** fetching a `chinese-hsk` lesson  
**Then** the matching explain-locale body and glosses are returned when published  
**And** target language remains Mandarin (simplified hanzi + pinyin)

## REQ-LANG-006 Progress reuse

**When** an authenticated learner marks a `chinese-hsk` lesson complete  
**Then** progress is stored via existing progress APIs  
**And** no FSRS / review-queue persistence is required for the Band 1 MVP

## REQ-LANG-007 No Band 1 stub dump

**When** shipping the Band 1 starter slice  
**Then** only the mapped thematic lessons (plus any explicitly unpublished drafts) exist  
**And** the full Band 1 word list is not published as empty stubs  
**And** the mapped set may grow (e.g. to 12 themes) only when listed in `chinese-hsk-band1-map.md`

## REQ-LANG-008 Band 1 expand themes

**Given** Band 1 expand lessons including `questions`, `adjectives`, `transport`, and `devices`  
**When** published under `chinese-hsk`  
**Then** each ships en+vi with `hsk_band: 1` and Band 1–listed hanzi only

## REQ-LANG-010 Sentence-step lessons

**When** a language lesson includes `steps`  
**Then** the player presents ordered dialogue/tip/teach/practice/checkpoint steps  
**And** practice items prefer sentence-level prompts over bare word lists

## REQ-LANG-011 Freeze v1 glossary expansion

**When** pedagogy v2 is locked  
**Then** new thematic glossary-only lessons must not be added until authored with `steps`

## REQ-LANG-012 Legacy fallback

**Given** a published language lesson without `steps`  
**When** the lesson page loads  
**Then** legacy vocab + single exercise still work with an older-format note

## REQ-LANG-013 Linear unit path on language hubs

**Given** a language track with published lessons  
**When** the learner opens the track hub  
**Then** lessons appear as an ordered vertical path  
**And** only completed and the next incomplete node are clickable  
**And** later incomplete nodes are locked

## REQ-LANG-014 Listen on dialogue and teach

**Given** a language lesson step with dialogue lines or teach items  
**When** the learner taps Listen  
**Then** the app plays `audioUrl` if provided, otherwise TTS for the track language  
**And** missing Speech API fails softly without breaking the lesson

## REQ-LANG-015 Review from completed units

**Given** a language track with at least one completed lesson  
**When** the learner opens Review  
**Then** a session of practice items drawn from completed lessons’ steps is presented  
**And** no new lemmas outside those lessons are introduced
