# Learning — delta spec

## REQ-LEARN-001 Lesson reader

**Given** a published lesson  
**When** GET `/api/v1/lessons/:slug`  
**Then** rendered markdown body and exercise metadata are returned  
**And** for language tracks (`chinese-hsk`), vocab and language exercise fields are included in the exercise payload when present

## REQ-LEARN-002 Progress

**Given** authenticated learner  
**When** marking lesson complete  
**Then** progress is persisted per user and lesson

## REQ-LEARN-003 Notes

**Given** authenticated learner  
**When** CRUD on lesson notes  
**Then** notes are scoped to user and lesson

## REQ-I18N-001 Locales

**Given** `vi` or `en` locale  
**When** fetching catalog or lesson  
**Then** localized content is returned when available
