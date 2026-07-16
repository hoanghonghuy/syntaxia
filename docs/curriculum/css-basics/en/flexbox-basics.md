---
id: css-13-flexbox
track: css-basics
locale: en
slug: flexbox-basics
title: Flexbox basics
order: 13
published: true
objectives:
  - Turn a container into a flex formatting context
  - Control direction and gap between items
  - Align items with justify-content and align-items
exercise:
  mode: both
  starterHtml: |
    <div class="row"><span>A</span><span>B</span></div>
  starter: |
    /* Lay out .row with flex */
    
  hints:
    - "display: flex turns on flex layout."
    - gap adds space between flex items.
    - Apply both on the .row container.
  solution: |
    .row { display: flex; gap: 1rem; }
  expected:
    type: cssIncludes
    needles:
      - "display: flex"
      - gap
---

**Flexbox** is a layout model for arranging items in a row or a column. You set `display: flex` on a **container**; its children become **flex items**. Flexbox shines for toolbars, card rows, and centering — one-dimensional layouts (a single row *or* a single column).

Think of books on a shelf. The shelf is the flex container. You choose whether books stand in a row or stack in a column, how much space sits between them, and whether they pack to the start, end, or center of the shelf.

| Property (on container) | Role | Common values |
| --- | --- | --- |
| `display: flex` | Activates flex layout | `flex` |
| `flex-direction` | Main axis direction | `row` (default), `column` |
| `gap` | Space between items | `0.5rem`, `1rem` |
| `justify-content` | Distribution along the main axis | `flex-start`, `center`, `space-between` |
| `align-items` | Alignment on the cross axis | `stretch` (default), `center`, `flex-start` |

## Worked example

```css
.toolbar {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: center;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

- `.toolbar` lays its children in a **row**, with `0.75rem` gaps. `justify-content: space-between` pushes items toward opposite ends (useful for a title on the left and actions on the right). `align-items: center` vertically centers items that have different heights.
- `.stack` is the same idea in a **column** — a simple vertical stack with consistent spacing, without leftover margin tricks on every child.
- Flexbox is for one main direction. CSS Grid (outside this track) is better when you need full two-dimensional page grids.

Start with the container properties above before diving into per-item `flex-grow` tricks.

## Common mistakes

- Putting `justify-content` on the items instead of the flex container — alignment properties belong on the parent with `display: flex`.
- Using huge margins between flex items instead of `gap` — margins fight the flex alignment model and are harder to keep even.
- Reaching for Flexbox for a full page grid of rows *and* columns at once — learn Flexbox for strips and stacks first; Grid comes later.

## Your turn

Use the sandbox below to lay out .row with flexbox. When the checker shows **Correct**, mark this lesson complete.
