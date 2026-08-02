# Language lessons — delta path v2

## ADDED REQ-LANG-010 Sentence-step lessons

**When** a language lesson includes `steps`  
**Then** the player presents ordered dialogue/tip/teach/practice/checkpoint steps  
**And** practice items prefer sentence-level prompts over bare word lists

## ADDED REQ-LANG-011 Freeze v1 glossary expansion

**When** pedagogy v2 is locked  
**Then** new thematic glossary-only lessons (vocab table + single MCQ) must not be added  
**Until** the unit is authored with `steps` per `language-learning-pedagogy-v2.md`

## ADDED REQ-LANG-012 Legacy fallback

**Given** a published language lesson without `steps`  
**When** the lesson page loads  
**Then** legacy vocab + single exercise still work  
**And** the UI may note the older format
