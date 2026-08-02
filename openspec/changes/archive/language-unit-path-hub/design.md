# Design — language-unit-path-hub

## Unlock rule

- `done`: progress.completed for locale
- `current`: first incomplete in sort order (same as `nextIncompleteLesson`)
- `locked`: incomplete and after current
- Links: only `done` and `current` navigate; locked is non-interactive

## UI

- Vertical spine + circular nodes (emerald accent tokens already in design system)
- Label: sort order + title; checkmark when done; “Up next” on current
- Language tracks only (`isLanguageTrack` / category languages)

## IT tracks

Unchanged: narrow hub list + sidebar.
