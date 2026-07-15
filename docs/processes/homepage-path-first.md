# Homepage path-first UX

## Purpose

How the Syntaxia home page presents brand, Continue / progress, and a **preview** catalog without duplicating `/tracks` or cluttering the first viewport.

## When to use

- Changing `pages/index.vue`, home hero copy, or home catalog preview size
- After home UI looks stale: clear web `.nuxt` and restart the web container

## Locked approach (2026-07-11)

Audit chốt (illogical UX fixed):

1. **Hero:** one headline + lead + CTA group (brand lives in the header wordmark — do not duplicate “Syntaxia” in the hero).
2. **Path-first:** Logged-in users see overall `done/total · %` and a Continue CTA with lesson title (`overallProgress` + `resumeTarget`).
3. **Catalog preview:** At most `HOME_TRACKS_PER_CATEGORY` (3) tracks per category; full browse + pagination on `/tracks`.
4. **Guest CTA:** First track by `sortOrder` (`firstTrackId`) — never hardcode `sql-fundamentals`.
5. **Chrome:** Home uses `default` layout with mobile footer (Home · Tracks · Progress · Account). Hub pages under `learn` use `hub-mode` (no orphan lesson sidebar) and shared `.hub-page` styles in `layout.css`.

## Do

- Keep one job per section: hero = path; catalog sections = browse preview
- Ship `home.emptyCatalog` and related keys en+vi together
- Prefer `/tracks` for “view all”

## Don't

- Dump every track on home
- Put Progress / Notes / Search quick links inside the hero
- Show the lesson sidebar on Progress / Notes / Search / Account

## Related

- [`product-quality-lock.md`](./product-quality-lock.md)
- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- `apps/web/app/utils/catalogBrowse.ts`
