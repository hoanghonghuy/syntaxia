# Homepage path-first UX

## Purpose

How the Syntaxia home page presents brand, Continue / progress, and a **preview** catalog without duplicating `/tracks` or cluttering the first viewport.

## When to use

- Changing `pages/index.vue`, home hero copy, or home catalog preview size
- After home UI looks stale: clear web `.nuxt` and restart the web container

## Locked approach (2026-07-30)

1. **Hero:** one headline + lead + **one** primary CTA (Continue / Start). Optional secondary: Login (guest) or View tracks.
2. **Path-first:** Logged-in users see overall `done/total · %` and a Continue CTA with lesson title (`overallProgress` + `resumeTarget`).
3. **Featured tracks:** Flat list via `featuredTracks()` / `HOME_FEATURED_TRACKS` (≤3). Full browse + pagination on `/tracks`.
4. **Guest CTA:** First track by `sortOrder` (`firstTrackId`) — never hardcode `sql-fundamentals`.
5. **Chrome:** Home uses `default` layout; mobile footer is Tracks · Search · Progress · Account/Login (brand = home). See [layout-shell-simplify.md](./layout-shell-simplify.md).

## Do

- Keep one job per section: hero = path; featured = browse peek
- Ship `home.featured` / `home.emptyCatalog` en+vi together
- Prefer `/tracks` for “view all”

## Don't

- Dump every track or multi-category card grids on home
- Put Progress / Notes / Search quick links inside the hero
- Show the lesson sidebar on Progress / Notes / Search / Account

## Related

- [`layout-shell-simplify.md`](./layout-shell-simplify.md)
- [`product-quality-lock.md`](./product-quality-lock.md)
- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- `apps/web/app/utils/catalogBrowse.ts`
