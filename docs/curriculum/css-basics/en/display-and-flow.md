---
id: css-10-display
track: css-basics
locale: en
slug: display-and-flow
title: Display and flow
order: 10
published: true
objectives:
  - Contrast block and inline layout in normal flow
  - Use inline-block when you need both width and side-by-side placement
  - Hide elements with display: none
---

The `display` property controls how a box participates in **normal flow** — the default top-to-bottom, left-to-right arrangement of content. The most important beginner values are `block`, `inline`, `inline-block`, and `none`.

Think of paragraphs as full-width shelves (block) and a bold word inside a sentence as a bead on a string (inline). A small badge that needs a set width but still sits in the sentence is closer to `inline-block`.

| Value | Behavior (simplified) | Common elements |
| --- | --- | --- |
| `block` | Starts on a new line; can take `width`/`height`; stretches toward full available width by default | `div`, `p`, `h1`–`h6`, `section` |
| `inline` | Sits in the text line; `width`/`height` do not apply the same way | `span`, `a`, `em`, `strong` |
| `inline-block` | Flows with text like inline, but accepts width, height, and vertical padding more like a block | Buttons, badges, icons with labels |
| `none` | Removes the box from layout — as if it were not there | Hidden panels, toggled UI |

## Worked example

```css
.label {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #e8f5e9;
}

.sr-only-demo {
  display: none;
}

aside.note {
  display: block;
  width: 16rem;
}
```

- `.label` uses `inline-block` so several labels can sit on one line *and* keep padding and a background that looks like a chip.
- `display: none` hides `.sr-only-demo` completely from layout (also generally hides it from visual display). Use it for things that should not take space — not for temporary visual dimming alone if you still need the space reserved.
- `aside.note` as `block` with a width sits on its own flow line and respects the width you set.

Changing `display` does not change the HTML meaning — a `span` is still a span even if you make it `block`.

## Common mistakes

- Trying to set `width` or vertical margins on a pure `inline` element and wondering why nothing happens — switch to `block` or `inline-block` when you need those controls.
- Using `display: none` when you only wanted invisible text for screen readers — that pattern needs a different technique; `none` removes the box from the accessibility tree in typical cases.
- Forcing everything to `inline-block` for page layout — for rows and alignment, Flexbox (later lesson) is clearer.

## Your turn

Re-read the table and point to which display value fits a full-width paragraph, a word inside a sentence, and a chip with padding. Then mark this lesson complete.
