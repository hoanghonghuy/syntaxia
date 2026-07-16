# HTML Basics + CSS Basics tracks (locked)

## Purpose

Lock the **curriculum shape** for Syntaxia’s next learning path after `javascript-basics`: two MDN-mapped tracks under category **`web`**, Phase 1 without a code sandbox, so agents do not invent outlines or merge HTML/CSS into one track.

**Status:** **locked** (owner confirm + `/opsx-research` 2026-07-16).

## When to use

- Scaffolding `html-basics` / `css-basics` tracks or lessons
- Choosing category / sort order / sandbox timing
- Before OpenSpec for an HTML/CSS preview sandbox

## Locked product decisions

| Decision | Choice |
|----------|--------|
| Track count | **Two** tracks: `html-basics` then `css-basics` |
| Category | **`web`** (new; i18n `catalog.category.web`) — keep `sql` and `code` as today |
| Level | Both **`basic`** |
| Curriculum source | [MDN Semantic HTML](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/) + [MDN CSS fundamentals](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/) + Learn modules [Structuring content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) / [CSS styling basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics) / [CSS text styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling) / [CSS layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout) (Flexbox only in v1) |
| Pedagogy | Depth B ([`curriculum-pedagogy.md`](./curriculum-pedagogy.md)): hook + sample + worked example + mistakes + your turn; **en + vi** together |
| Sandbox Phase 1 | **No** graded runner — omit `exercise` / `sandbox_seed`; Mark complete (same pattern as early JS before #24) |
| Sandbox Phase 2 | Separate `/opsx-research` + OpenSpec (HTML/CSS preview or structural compare) — **do not** reuse SQL or JS worker graders |
| Learner order | Prefer **HTML → CSS** in catalog `sort_order`; JS syntax already exists under `code` |

## `html-basics` — 12 lessons (orders 0–11)

Map from MDN curriculum §§2.1–2.8 (challenges / debugging deferred).

| Order | Slug | Topic | MDN map |
|------:|------|-------|---------|
| 0 | `what-is-html` | What HTML is; elements/tags/attributes | Basic HTML syntax |
| 1 | `document-structure` | doctype, `html`/`head`/`body`, `lang`, charset, title | What's in the head? |
| 2 | `headings-and-paragraphs` | `h1`–`h6`, `p`; no skipping heading levels | Headings and paragraphs |
| 3 | `emphasis-and-importance` | `em`, `strong` (not presentational bold/italic tags) | Emphasis and importance |
| 4 | `lists` | `ul` / `ol` / `li` (+ brief `dl`) | Lists |
| 5 | `links` | `a`, `href`, absolute vs relative | Creating links |
| 6 | `images` | `img`, `src`, `alt`, width/height | HTML images |
| 7 | `semantic-landmarks` | `header`, `nav`, `main`, `article`, `section`, `footer` | Structuring documents |
| 8 | `tables` | `table`, `tr`, `th`, `td`, `thead`/`tbody` | HTML table basics |
| 9 | `forms-basics` | `form`, `label`, `input`, `button` | Forms and buttons |
| 10 | `form-controls` | checkbox, radio, `select`, `textarea`, `required` | Forms (common controls) |
| 11 | `html-entities` | entities + light text extras (`br`, `hr`, abbr/time intro) | Advanced text / entities |

**Out of `html-basics` v1:** video/audio deep dive, SVG, iframe/object, planet-table challenge as graded task, HTML validator lesson as its own slug (mention in mistakes only).

## `css-basics` — 14 lessons (orders 0–13)

Map from MDN CSS fundamentals §§3.1–3.8 + text styling essentials + Flexbox intro from CSS layout. Grid / float-as-layout / responsive deep dive deferred.

| Order | Slug | Topic | MDN map |
|------:|------|-------|---------|
| 0 | `what-is-css` | What CSS is; cascade idea; how styles attach | What is CSS? |
| 1 | `css-syntax` | rules, declarations; external vs internal stylesheet | Getting started with CSS |
| 2 | `type-class-id-selectors` | type, class, id | Basic CSS selectors |
| 3 | `combinators-and-groups` | descendant/child/sibling; selector lists | Combinators |
| 4 | `pseudo-classes` | `:hover`, `:focus`, `:visited` (link states) | Pseudo-classes |
| 5 | `cascade-and-specificity` | cascade, specificity, inheritance | Handling conflicts |
| 6 | `box-model` | content, padding, border, margin; `box-sizing` | The box model |
| 7 | `colors-and-units` | colors; px/em/rem/% | Values and units |
| 8 | `text-and-fonts` | font-family, size, weight, line-height, align | Fundamental text and font styling |
| 9 | `backgrounds-and-borders` | background, border, `border-radius` | Backgrounds and borders |
| 10 | `display-and-flow` | `block` / `inline` / `inline-block` / `none` | Box model / display |
| 11 | `styling-lists-and-links` | list-style; link states | Styling lists / links |
| 12 | `sizing-and-overflow` | width/height, min/max; overflow basics | Sizing / Overflow |
| 13 | `flexbox-basics` | `display: flex`, direction, gap, justify/align intro | Flexbox (CSS layout) |

**Out of `css-basics` v1:** CSS Grid, multi-column, positioning deep dive, animations, cascade layers, web fonts (`@font-face`) as required, form-control styling deep dive, float layouts.

## Catalog seeding

1. Migration (e.g. `005_web_tracks.sql`) + mirror in `init.sql`:
   - `html-basics`: `category=web`, `level=basic`, `sort_order` **before** `javascript-basics` (suggested **5**)
   - `css-basics`: `category=web`, `level=basic`, `sort_order` **6**
   - Keep `javascript-basics` at **10** under `code`
2. i18n: `catalog.category.web` en+vi (“Web” / “Web”).
3. Update [`catalog-architecture.md`](./catalog-architecture.md) table when migration lands.
4. Curriculum paths: `docs/curriculum/html-basics/{en,vi}/`, `docs/curriculum/css-basics/{en,vi}/`.

## Execution phases

| Phase | Scope | Done when |
|------:|-------|-----------|
| **0** | This file locked | **done** (2026-07-16) |
| **1** | Seed tracks + i18n + empty hubs (“Coming soon”) | **done** — `html-basics` + `css-basics` seeded |
| **2** | Publish `html-basics` 0–11 en+vi Depth B | **done** — 12×2 lessons |
| **3** | Publish `css-basics` 0–13 en+vi Depth B | **done** — 14×2 lessons |
| **4** | Checklist + track-completion snapshot | **done** |
| **5** | `/opsx-research` HTML/CSS sandbox | **done** — see [`html-css-sandbox.md`](./html-css-sandbox.md) |
| **6** | Implement HTML/CSS sandbox + exercises | **done** — grader API, `HtmlCssSandbox`, **26/26** lessons with `exercise` |

## Do / Don't

**Do**

- One MDN concept ≈ one slug; ship en+vi together.
- Put sample markup/CSS in Markdown fences; “Your turn” uses the HTML/CSS sandbox when `exercise` is present.
- Finish `html-basics` before expanding CSS beyond the locked table.

**Don't**

- Invent topics outside the tables above.
- Reuse SQL/`JsSandbox` for HTML/CSS grading — use `HtmlCssSandbox` + `POST /sandbox/htmlcss/grade`.
- Merge HTML+CSS into a single track.
- Put video/audio, Grid, or responsive modules into v1.

## Related

- [`catalog-architecture.md`](./catalog-architecture.md)
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`javascript-track.md`](./javascript-track.md) — pattern for MDN-mapped code track
- [`curriculum-track-completion.md`](./curriculum-track-completion.md)
- [MDN Curriculum — Semantic HTML](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/)
- [MDN Curriculum — CSS fundamentals](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/)
- [MDN — Structuring content with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)
- [MDN — CSS styling basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
