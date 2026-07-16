---
id: css-12-sizing
track: css-basics
locale: en
slug: sizing-and-overflow
title: Sizing and overflow
order: 12
published: true
objectives:
  - Set width, height, min, and max constraints
  - Predict when content overflows its box
  - Choose overflow values for clipping or scrolling
---

**Sizing** properties set how large a box may be. **Overflow** controls what happens when content does not fit. Together they keep layouts from breaking when text is long or images are wide.

Imagine a photo frame with a fixed opening. If the photo is larger than the opening, you can crop it, let it stick out, or put it behind a sliding panel — those choices are like `hidden`, `visible`, and `scroll`/`auto`.

| Property | Role | Example |
| --- | --- | --- |
| `width` / `height` | Preferred size | `width: 20rem` |
| `min-width` / `min-height` | Floor — will not shrink below | `min-width: 12rem` |
| `max-width` / `max-height` | Ceiling — will not grow beyond | `max-width: 40rem` |
| `overflow` | Extra content behavior | `visible`, `hidden`, `scroll`, `auto` |
| `overflow-x` / `overflow-y` | Control one axis | `overflow-x: auto` |

## Worked example

```css
.article {
  max-width: 40rem;
  width: 100%;
  margin-inline: auto;
}

.panel {
  height: 12rem;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 0.75rem;
}

.thumb {
  width: 8rem;
  height: 8rem;
  overflow: hidden;
}
```

- `.article` can grow with a narrow screen (`width: 100%`) but never exceeds `40rem`, which keeps line lengths readable. `margin-inline: auto` centers the block horizontally.
- `.panel` has a fixed height; `overflow: auto` adds a scrollbar only when the content is taller than the panel.
- `.thumb` clips anything that sticks outside an 8×8 rem box — useful for cropping images inside a square.

Prefer `max-width` on reading columns over a rigid `width` alone, so small screens can still shrink.

## Common mistakes

- Setting only `height` on a text box without thinking about overflow — long translations or large fonts get clipped or spill out.
- Using `overflow: hidden` to “fix” layout bugs — content disappears for keyboard and screen-reader users who may still need it.
- Forgetting `max-width: 100%` on images inside narrow columns — large images can force horizontal page scroll.

## Your turn

Re-read the three rules. Say which one limits reading width, which one scrolls extra content, and which one clips. Then mark this lesson complete.
