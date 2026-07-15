# Learn navigation IA (sidebar vs catalog)

## Purpose

Keep the learn sidebar focused on **the current track’s lessons**, and put track switching / category browsing on a dedicated catalog page with pagination from day one.

## When to use

- Changing `LearnSidebar`, learn footer/header chrome, or `/tracks` catalog
- Adding many tracks or new categories
- After nav changes look stale: clear web `.nuxt` and restart the web container

## Locked IA (2026-07-11)

| Surface | Contains | Does not contain |
|---------|----------|------------------|
| Learn sidebar | Back to catalog (category-aware), current track title → hub, category·level, **lesson list only** | All-tracks switcher, Progress / Notes / Account menu |
| `/tracks` | Category filters + **paginated** track cards (`TRACKS_PAGE_SIZE = 12`) | Lesson TOC |
| Learn footer (`< 1100px`) | In track: Tracks · Lessons · Progress · Account. On hubs: Tracks · Search · Progress · Account | Duplicate track lists; orphan “Lessons” drawer with empty sidebar |
| Header | Tracks / Progress / Notes (desktop) + search + theme; text links hide `< 1100px` (footer covers) | Full lesson list |
| Default layout (home / `/tracks`) | Mobile footer: Home · Tracks · Progress · Account; search in header ≥768px | Lesson sidebar |

Hierarchy stays **Category → Level → Track → Lessons** (`catalog-architecture.md`).

## Steps

1. Edit sidebar chrome in `apps/web/app/components/LearnSidebar.vue` only for in-track lesson nav.
2. Edit catalog browse helpers in `apps/web/app/utils/catalogBrowse.ts` (filter + `paginateItems` + query parse).
3. Keep `/tracks` as the place to scale track count; do not re-add a track list inside the lesson sidebar.
4. Ship en+vi keys together (`nav.backToTracks`, `catalog.tracksTitle`, pager keys, …).

## Tests

```bash
cd apps/web
npm run test:catalog-browse
npm run test:shell-ux
npm run test:i18n
```

## Do

- Think ahead: pagination exists before track count forces a rewrite
- Link “back to tracks” with `?category=` when the active track has a category
- Put hubs (progress / notes / account) in header/footer, not the lesson sidebar

## Don't

- Show every learning path in the sidebar while the learner is already inside a track
- Stuff hub destinations into the sidebar “because there’s space”
- Defer catalog pagination until “later”

## Related

- [`responsive-lesson-layout.md`](./responsive-lesson-layout.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`product-quality-lock.md`](./product-quality-lock.md)
- `apps/web/app/pages/tracks/index.vue`
