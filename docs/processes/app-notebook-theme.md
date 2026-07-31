# App-wide notebook theme

## Purpose

How the digital bullet journal visual language extends from `.prose-lesson` to the full Syntaxia UI chrome and shared surfaces — while keeping Mintlify IA.

## When to use

- Changing global canvas grid, card radius, heading font scope
- Restyling shell (header/footer/sidebar/TOC) or shared `.card` / `.btn`
- Deciding whether a new surface should use pastel decoration vs brand accent

## Steps

1. **Tokens** (`tokens.css`): pastels, `--font-hand`, `--radius-card`, `--radius-pill`, `--notebook-grid-size`, `--notebook-grid-opacity`.
2. **Canvas**: body is solid `--color-canvas` (no global grid). Soft grid only on `.home-page`; stronger grid stays on `.prose-lesson`.
3. **Typography**: brand wordmark = Fraunces (`--font-display`); page/section headings = Playpen Sans (`--font-hand`); body = Source Sans 3.
4. **Chrome**: header/footer/sidebar/TOC use soft pastel surface mixes; primary CTA stays `--color-brand`.
5. **Cards / chips / ghost buttons**: `--radius-card` / `--radius-pill` + pastel soft fills.
6. **Sandbox**: panel chrome uses surface tokens; CodeMirror + textarea + lesson `pre` share `--color-code-*` (light soft panel; dark elevated island like GitHub `#0d1117`). Shared helper: `utils/sandboxEditorTheme.ts` (`createSandboxEditorExtensions` + syntax vars + CM `dark` flag; remount on appearance change).
7. **Breathing room**: lesson main + editor content keep ≥ `--space-5` horizontal padding so fences/editors are not flush to the viewport edge.
8. **Dark grid**: `--notebook-grid-opacity` drops to `0.2` in dark so graph paper stays subtle.

## Do

- Keep Mintlify IA (sidebar / lesson / TOC / mobile drawer)
- Prefer soft surface + hairline over loud pastel on every list row
- Keep graph-paper grid on home + lesson prose only — not catalog/progress/search hubs
- Test light + dark + accent presets together; theme popover teleports to `body` (fixed under trigger) so shell `overflow` cannot clip it

## Don't

- Handwritten body text
- Stickers / doodles / mascots
- Pastel as the sole primary CTA fill
- Restyle sandbox editors into pastel sticky-note fills (use `--color-code-*` instead)
- Paint the notebook grid on every route via `body`
- Make dark code blocks the same color as `--color-surface` (muddy “no island” look)

## Related

- [`lesson-notebook-style.md`](./lesson-notebook-style.md)
- [`product-baseline.md`](./product-baseline.md)
- [`appearance-theme.md`](./appearance-theme.md)
- `openspec/changes/app-notebook-theme/`
