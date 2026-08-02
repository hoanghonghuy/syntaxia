# Language unit path hub

Show a Duolingo-style linear unit path on language track hubs (one node per lesson / Can-Do), using existing progress APIs.

## Context

- Change ID: `language-unit-path-hub`
- Pedagogy: [`docs/processes/language-learning-pedagogy-v2.md`](../../../docs/processes/language-learning-pedagogy-v2.md) — next slice after content `steps` migration
- Prior archive: `language-lesson-path-v2`

## Scope

### In

1. `buildLanguageUnitPath` helper (done / current / locked)
2. `LanguageUnitPath.vue` vertical path UI
3. Track hub: show path for `languages` category on all breakpoints; keep IT list behavior
4. i18n + tests + process note

### Out

FSRS, Stories, multi-lesson units grouping, speech, redesign LearnSidebar

## Decision

Each published lesson = one path node ordered by `sortOrder`. Sequential unlock: completed → done; first incomplete → current; later → locked.
