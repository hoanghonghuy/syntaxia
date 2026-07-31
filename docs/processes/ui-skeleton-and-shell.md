# UI skeleton and shell foundation

## Purpose

How Syntaxia shows loading skeletons and reserves navigation/pages for features that are not fully built yet — so later work does not reshape the IA.

## When to use

- Adding a loading state for catalog, lesson, or sidebar content
- Introducing a future feature that needs a stable route + nav entry
- After layout changes look stale in Docker: restart web / clear `.nuxt`

## Skeleton system

| Piece | Path |
|-------|------|
| Base block | `apps/web/app/components/UiSkeleton.vue` |
| Lesson | `SkeletonLesson.vue` |
| Sidebar | `SkeletonSidebar.vue` |
| Home | `SkeletonHome.vue` |
| Styles | `.ui-skeleton` + `@keyframes skeleton-pulse` in `layout.css` |

### Steps

1. Set a local `loading` ref `true` before fetch; `false` in `finally`.
2. Show the matching skeleton only when loading **and** there is no cached content yet (`shouldShowSkeleton` in `utils/softLoading.ts`). Soft refresh keeps the previous UI.
3. Keep `role="status"` + `shell.loading` aria label on composite skeletons.
4. Respect `prefers-reduced-motion` (already in CSS).
5. Skeleton colors use `--color-skeleton` / `--color-skeleton-shine` (light + dark tokens) — never hardcode a white shimmer mix.

## Soft loading (anti-flash)

```ts
import { shouldShowSkeleton } from '~/utils/softLoading'
const showSkeleton = computed(() =>
  shouldShowSkeleton(loading.value, catalog.tracks.length > 0),
)
```

Use `v-if="showSkeleton"` instead of `v-if="loading"` on hubs that already have Pinia cache.

## Shell scaffold pages

| Route | Role now | Later |
|-------|----------|-------|
| `/progress` | **Live hub** — overall %, per-track bars, Continue (see `progress-hub.md`) | Charts, streaks |
| `/notes` | **Live hub** — list + filter + deep link (see `notes-hub-and-search.md`) | Rich editor / tags |
| `/account` | **Live hub** — profile + password forms (see `account-profile-password.md`) | Change email |
| `/search` | **Live** — title filter for tracks/lessons | Full-text / AI search |

Shared panel: `ComingSoonPanel.vue`.

Nav entry points: learn header tools, learn footer (Home · Lessons · Progress · Account), sidebar Menu section, home quick links, default layout header.

## Tests

```bash
cd apps/web
npm run test:shell-ux
npm run test:i18n
```

## Do

- Ship en+vi keys under `nav.*` and `shell.*` together
- Use `layout: 'learn'` for scaffold pages so chrome stays consistent
- Prefer skeleton over blank flash when data is in flight

## Don't

- Invent a second mobile menu pattern for scaffold pages
- Hide future routes only in docs — keep a real page + nav affordance
- Animate skeletons when the user prefers reduced motion

## Related

- [`responsive-lesson-layout.md`](./responsive-lesson-layout.md)
- [`learning-path-progress.md`](./learning-path-progress.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
