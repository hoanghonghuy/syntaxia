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
| `/tracks/:id` hub | Title + continue CTA; lesson list **only on narrow** (sidebar owns list on desktop); `.hub-page` centered | Duplicate full lesson dump beside open sidebar |
| Learn footer (`< 1100px`) | In track: Tracks · Lessons · Progress · **Profile**. On hubs: Tracks · Search · Progress · **Profile**. Guest Profile → `/login`; signed-in → `/account` | Home; Notes; Login label (login stays in header) |
| Header | Tracks / Progress (desktop) + theme + locale + auth; text links hide `< 1100px` (footer covers) | Header search pill; Notes; full lesson list |
| Default layout (home / `/tracks`) | Mobile footer: Tracks · Search · Progress · Profile; brand = home | Home tab; Notes tab; Login as footer label; header search pill; lesson sidebar |

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
