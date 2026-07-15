# Snackbar and breadcrumb

## Purpose

Shared learner feedback (snackbar) and hierarchy navigation (breadcrumb) without adding UI libraries (no Nuxt UI / Tailwind).

## When to use

- Showing success/error after a user action (save note, mark complete, profile/password)
- Showing location in Category → Track → Lesson or Home → Hub
- Changing toast duration, queue cap, or crumb builders

## Locked approach (2026-07-11)

| Piece | Choice |
|-------|--------|
| Snackbar | Hand-rolled `useSnackbar` + `AppSnackbar` (aria-live polite, dismiss, auto-hide 4s, max 3) |
| Breadcrumb | WAI-ARIA pattern: `<nav aria-label>` + `<ol>` + `aria-current="page"` on current |
| Library | **No** Nuxt UI Toast — keeps custom CSS tokens |
| Builders | `utils/snackbar.ts`, `utils/breadcrumbs.ts` (unit-tested) |

## Steps

1. Call `useSnackbar().success|error|info(message)` from page actions.
2. Pass crumb arrays to `<AppBreadcrumb :items="…" />` (prefer `buildLearnBreadcrumbs` / `buildHubBreadcrumbs`).
3. Keep `AppSnackbar` mounted once in `app.vue`.
4. Ship en+vi keys under `snackbar.*` and `breadcrumb.label`.

## Tests

```bash
cd apps/web
npm run test:feedback-nav
npm run test:shell-ux
npm run test:i18n
```

## Do

- Prefer snackbar for transient success; keep inline `role="alert"` for form field errors
- Put breadcrumb above the page title / HubHeader
- CSS separators via `::after` (not in the accessibility tree as extra text nodes when possible)

## Don't

- Add a toast dependency that pulls Tailwind
- Re-introduce ad-hoc crumb markup per page
- Use snackbar for long instructional copy

## Related

- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
- [`homepage-path-first.md`](./homepage-path-first.md)
- https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
