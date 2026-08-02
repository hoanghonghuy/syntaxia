# Language unit path hub

## Purpose

How language track hubs show a **linear unit path** (Duolingo-style sequential unlock) instead of only a flat list.

## When to use

- Changing track hub UX for `category === 'languages'`
- Adjusting unlock rules for path nodes

## Steps

1. Nodes come from `buildLanguageUnitPath` in `apps/web/app/utils/learningPath.ts`.
2. UI: `LanguageUnitPath.vue` on `tracks/[track]/index.vue` when `showLanguagePath`.
3. Unlock: completed → `done`; first incomplete → `current` (clickable); later → `locked`.
4. IT tracks keep the previous narrow list + sidebar behavior.

## Do / Don't

### Do

- Keep path language-only until IT explicitly opts in
- Reuse existing progress APIs

### Don't

- Skip-ahead unlock without a product decision
- Clone full Duolingo chrome (stories, chests, FSRS)

## Related

- [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)
- OpenSpec archive: `openspec/changes/archive/language-unit-path-hub/`
