# Appearance theme (light / dark / accent)

## Purpose

How Syntaxia lets learners choose appearance mode and accent color while keeping Mintlify-style IA and readable contrast.

## When to use

- Changing light/dark tokens or accent presets
- Adjusting ThemePicker / ThemeMenu UI
- After theme CSS/JS changes: clear web `.nuxt` cache and restart web container

## Locked approach (2026-07-11)

Research chốt:

1. Mode: `system` | `light` | `dark` (default `system`)
2. Accent: curated swatches + custom hex color input
3. Derive `--color-brand` / `--brand-deep` / `--brand-soft` / `--on-brand` per resolved appearance
4. Persist in `localStorage` (`syntaxia_theme`, `syntaxia_accent`)
5. Inline head script prevents flash by setting **mode + derived CSS vars** (`--color-brand` …) before paint; client plugin re-applies from storage
6. Footer/nav active state: use `router-link-exact-active` for Home (Vue treats `/` as a prefix of every route)

## Files

| Piece | Path |
|-------|------|
| Tokens | `apps/web/app/assets/css/tokens.css` (`data-theme`) |
| Derive helpers | `apps/web/app/utils/themeAccent.ts` |
| Runtime | `apps/web/app/composables/useTheme.ts`, `plugins/theme.client.ts` |
| UI | `ThemePicker.vue`, `ThemeMenu.vue` (header + Account) |
| Boot script | `nuxt.config.ts` `app.head.script` |

## Tests

```bash
cd apps/web
npm run test:theme
npm run test:i18n
```

## Local refresh

```powershell
docker compose exec web sh -c "rm -rf /app/.nuxt /app/node_modules/.cache"
docker compose restart web
```

Hard-refresh the browser (`Ctrl+Shift+R`).

## Do

- Keep emerald `#00b48a` as default accent
- Curated presets include `pastelPink` `#f4a7c3` (distinct from vivid `rose`)
- Ship `theme.*` en+vi together
- Prefer presets for non-tech users; hex is optional power-user control

## Don't

- Hardcode light-only hex in layout CSS (use tokens)
- Add a full free-form theme builder that breaks contrast
- Require VueUse for this phase

## Related

- [`product-baseline.md`](./product-baseline.md)
- [`account-profile-password.md`](./account-profile-password.md)
- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)
