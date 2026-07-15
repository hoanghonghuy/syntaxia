# Home + hub UI polish

## Purpose

Shared layout, typography, and loading patterns for home, tracks catalog, and learn-layout hub pages (progress, notes, search, account).

## When to use

- Changing hub spacing, card styles, empty/error states, or catalog chrome
- Adding a new hub route — reuse classes here instead of page-local duplicates
- After CSS changes: hard-refresh browser; clear `.nuxt` if styles look stale

## Locked approach (2026-07-15)

### Layout shells

| Route | Shell | Max width |
|-------|--------|-----------|
| `/` | `default` layout, `.hero.home-hero` + `.catalog-section` | Catalog preview 56rem |
| `/tracks` | `default` layout, `.hub-page-wide` | 56rem |
| `/progress`, `/notes`, `/search`, `/account` | `learn` + `hub-mode`, `.hub-page.learn-scroll` | 40rem |
| `/tracks/:track` | `learn`, `.hub-page.learn-scroll` + `HubHeader` | 40rem |

Home keeps a custom hero (path-first); other hubs use `AppBreadcrumb` + `HubHeader`.

### Shared CSS (`layout.css`)

- **Text:** `.muted`, `.track-meta`, `.card-title`, `.card-actions`
- **Cards:** global `.card`; stacked rows use `.card.card--stack` (progress)
- **Catalog:** `.catalog-section`, `.catalog-heading-row`, `.category-chip`, `.catalog-pager`
- **Empty / error:** `.hub-empty`, `.hub-empty--center`, `.hub-error-panel`
- **Progress bars:** `.hub-progress-bar`, `.hub-progress-bar-fill`
- **Wide catalog:** `.hub-page-wide`, `.track-grid--flush`

Use theme tokens (`--color-brand*`, `--space-*`, `--font-display`) — no hardcoded accent hex in pages.

### Loading

| Page | Skeleton |
|------|----------|
| Home | `SkeletonHome` |
| Tracks / progress / notes / search / account | `SkeletonHub` (+ optional slot for search filter) |
| Track hub (`/tracks/:id`) | `SkeletonHub` + lesson list slot |

### Error chrome

Hub pages: breadcrumb → `HubHeader` with `lead=hub.loadError` → `.muted` detail → retry button.

Home catalog error: `.hub-error-panel` (no breadcrumb — home is root).

Track hub and catalog pages call `retryLoad` / `retryCatalog` on catalog API failures.

### Account

- Shared `.account-facts`, `.account-section`, `.section-lead` in `layout.css`
- Footer quick links use `.hub-footer-links` (not `HubHeader` `#actions` slot)

## Steps

1. Prefer extending `layout.css` over scoped duplicates in `pages/*.vue`.
2. Run gates:
   ```bash
   cd apps/web
   npm run test:shell-ux
   npm run test:i18n
   npm run test:theme
   ```
3. Smoke: home hero, `/tracks` chips + pagination, `/progress` bars, empty catalog on home.

## Do

- Use `card-title` on all track card headings (home + tracks + progress).
- Use `hub.loadError` for catalog/API load failures on hub headers.
- Keep home catalog preview capped (`HOME_TRACKS_PER_CATEGORY`).

## Don't

- Redefine `.muted`, `.track-meta`, or `.hub-page` in page scoped CSS.
- Duplicate category chip styles outside `layout.css`.
- Put full track dump on home (see `homepage-path-first.md`).

## Related

- [`homepage-path-first.md`](./homepage-path-first.md)
- [`appearance-theme.md`](./appearance-theme.md)
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)
- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
- `apps/web/app/components/SkeletonHub.vue`
- `apps/web/scripts/check-shell-ux.mjs`
