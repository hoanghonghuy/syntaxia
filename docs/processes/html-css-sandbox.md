# HTML / CSS sandbox

## Purpose

Locked architecture for **HTML and CSS exercises** on `html-basics` and `css-basics`: live preview in a sandboxed iframe, server-side grading of submitted markup/CSS (same secret model as SQL/JS), UX parity with `JsSandbox`.

Research date: **2026-07-16** (checklist row **#27**; Phase 5 of [`html-css-basics-tracks.md`](./html-css-basics-tracks.md)).

## When to use

- Implementing `HtmlCssSandbox` (or equivalent)
- Adding `exercise` blocks to HTML/CSS lessons
- Adding `POST /api/v1/sandbox/htmlcss/grade`
- Security review of learner HTML/CSS preview

## Locked decision (chốt)

| Layer | Choice |
|-------|--------|
| **Preview** | `<iframe>` with **`srcdoc`** built from learner HTML + optional `<style>` from CSS pane. Debounce updates (~300ms). |
| **iframe sandbox** | Attribute **`sandbox`** with **no** `allow-scripts` and **no** `allow-same-origin` (fully restricted preview). Styles in `<style>` still apply; scripts do not run. |
| **Editors** | CodeMirror: HTML lang for markup pane; CSS lang for style pane. Lesson may show one or both panes via `exercise.mode`: `html` \| `css` \| `both`. |
| **Grading** | **Server-side** on submitted `{ html, css }` strings vs `exercise.expected` from Postgres. Never trust client `passed`. |
| **API** | Authed `POST /api/v1/sandbox/htmlcss/grade` → `{ passed, code?, message? }`. |
| **Secrets** | Strip `expected` / `solution` from public lesson JSON; solution via existing `GET /lessons/:slug/solution`. |
| **UX** | Hints, solution after 3 fails, guest soft gate, emit `passed` → progress sync ([`progress-sandbox-sync.md`](./progress-sandbox-sync.md)). |
| **Curriculum** | `exercise.starter` (or `starterHtml` / `starterCss`), hints, solution, expected — **no** `sandbox_seed`. |

### Expected shapes (v1)

| `expected.type` | Input used | Pass when |
|-----------------|------------|-----------|
| `htmlTags` | `html` | Each `{ tag, minCount }` appears at least `minCount` times (case-insensitive tag names; parsed with Go `golang.org/x/net/html` or equivalent already in module path — prefer stdlib/`x/net` if already depended) |
| `cssIncludes` | `css` | Each string in `needles` appears in normalized CSS (whitespace-collapsed, case-sensitive for property text as authored in needles) |
| `htmlIncludes` | `html` | Each needle appears in normalized HTML source (for attributes like `alt=`, `href=`) |

Reject DOM snapshot grading that requires `allow-same-origin` + parent access. Reject executing learner JS in this sandbox.

### Rejected options

| Option | Why not |
|--------|---------|
| Reuse `JsSandbox` / Web Worker | Wrong runtime; JS worker has no DOM/CSS preview. |
| Reuse SQL sandbox | Wrong runtime. |
| `sandbox="allow-scripts allow-same-origin"` | MDN: combination lets embedded doc remove sandbox — XSS risk. |
| Client-only grade with `expected` in bundle | Leaks answers (B1). |
| Full visual pixel / screenshot compare | Fragile, ops-heavy; out of scope for basics. |
| Server headless Chrome | Ops cost; deferred. |

## Steps (implementation order)

1. Persist this file + mark Phase 5 research **done** in [`html-css-basics-tracks.md`](./html-css-basics-tracks.md). — **done**
2. **API** — `GradeHtmlCss` + `POST /api/v1/sandbox/htmlcss/grade` (TDD). — **done**
3. **Web** — `HtmlCssSandbox.vue` + wire `[slug].vue` for `html-basics` / `css-basics` when `lesson.exercise` present. — **done**
4. **Curriculum** — add exercises to all HTML/CSS lessons. — **done** (12 + 14 × en/vi)
5. **Smoke** — `check-htmlcss-sandbox.ps1` + release-smoke step. — **done**
6. Checklist row **#27** done. — **done** (2026-07-16)

## Exercise frontmatter examples

HTML tags:

```yaml
exercise:
  mode: html
  starter: |
    <!-- Add a main heading -->
  hints:
    - "Use an h1 element for the page title."
    - "Opening and closing tags wrap the text."
  solution: |
    <h1>Welcome</h1>
  expected:
    type: htmlTags
    tags:
      - tag: h1
        minCount: 1
```

CSS includes:

```yaml
exercise:
  mode: css
  starterHtml: |
    <p class="note">Hello</p>
  starter: |
    /* Make .note text blue */
  hints:
    - "Select the class with a dot: .note"
  solution: |
    .note { color: blue; }
  expected:
    type: cssIncludes
    needles:
      - ".note"
      - "color"
```

## Do / Don't

**Do**

- Keep preview script-free for v1 HTML/CSS tracks.
- Normalize whitespace before `htmlIncludes` / `cssIncludes` compares.
- Soften starters (incomplete); keep solutions server-side.

**Don't**

- Enable scripts in the preview iframe for these tracks.
- Put `expected` in public API responses.
- Grade by asking the client “did it look right?”.

## Related

- [`html-css-basics-tracks.md`](./html-css-basics-tracks.md)
- [`javascript-sandbox.md`](./javascript-sandbox.md) — UX/API pattern to mirror
- [`progress-sandbox-sync.md`](./progress-sandbox-sync.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
- [MDN iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [MDN srcdoc](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/srcdoc)
