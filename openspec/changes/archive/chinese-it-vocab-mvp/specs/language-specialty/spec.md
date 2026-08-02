# Language specialty — delta (content MVP)

## ADDED REQ-SPEC-IT-003 Mapped specialty lessons

**Given** map `chinese-it-vocab-map.md` cites szdict  
**When** MVP ships  
**Then** exactly the mapped slugs exist as paired en/vi Markdown  
**And** each vocab hanzi is a szdict lemma from the map table

## ADDED REQ-SPEC-IT-004 Language player only

**When** opening a `chinese-it-vocab` lesson  
**Then** the language player mounts  
**And** SQL/JS/HTML sandboxes do not
