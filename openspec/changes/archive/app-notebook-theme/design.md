# Design — App-wide notebook theme

## Approach

CSS-token-first expansion of `lesson-notebook-style` onto shared surfaces. Keep Mintlify layout structure; restyle chrome and containers.

### Phase 1 — Global tokens + shell

1. Move/ensure notebook tokens in `tokens.css` (already present): pastels, `--font-hand`, `--radius-card`, `--radius-pill`.
2. Apply subtle grid to `body` / `.app-shell` / `.learn-body` canvas (lower opacity than `.prose-lesson` so chrome stays calm).
3. Header: soft surface, thin border; brand can use display or hand font lightly.
4. Footer / hamburger: rounded, pastel active states (keep emerald for primary interactive).

### Phase 2 — Shared components

1. `.card` → larger radius (`--radius-card`), optional pastel soft fill variants by context.
2. `.btn-primary` keeps brand emerald; `.btn-ghost` / chips get pill or soft pastel borders.
3. Category chips / track meta: pastel pills.

### Phase 3 — Pages

1. Home hero + track catalog cards.
2. Hub pages (`progress`, `notes`, `account`, `search`): same card/header patterns.
3. Learn sidebar + TOC: soft surfaces, not loud pastels.

### Phase 4 — Sandbox chrome

1. `.sandbox-panel` outer frame: card radius + hairline.
2. Toolbar: soft surface.
3. **Do not** restyle CodeMirror / terminal `pre` into pastel — keep dark editor.

### Typography rules

| Role | Font |
|------|------|
| Brand wordmark (`.brand`) | `--font-display` (Fraunces) |
| Page / section headings (h1–h3 in chrome, cards, hubs) | `--font-hand` (Playpen Sans) |
| Body / long copy | `--font-body` (Source Sans 3) |
| Code | `--font-mono` |

Shell canvas grid uses `--notebook-grid-opacity` (~0.35 of hairline strength) so it stays calmer than `.prose-lesson`.

### Accent coexistence

- Interactive primary: `--color-brand` (emerald + user accent presets)
- Decorative surfaces: pastel tokens
- Do not make pastel pink the default brand accent

## Risks

- **Pastel overload on hub lists** — use soft surface + hairline more than filled pastel on every row.
- **Dark mode contrast** — reuse desaturated pastel tokens from lesson theme; verify WCAG on chips.
- **Baseline conflict** — product baseline locks Mintlify IA + emerald; this change updates visual skin only and must update `product-baseline.md` + `lesson-notebook-style.md` (or new `app-notebook-theme.md`) to record the expanded skin.
- **Performance** — full-page grid gradients are cheap; avoid animated wobble.

## Change

- ID: `app-notebook-theme`
- Primary files: `apps/web/app/assets/css/tokens.css`, `apps/web/app/assets/css/layout.css`, possibly small layout Vue tweaks if class hooks needed
- Process docs: `docs/processes/app-notebook-theme.md`, update `product-baseline.md` Design section
