---
id: css-13-flexbox
track: css-basics
locale: en
slug: flexbox-basics
title: Flexbox as a one-dimensional layout system
order: 13
published: true
can_do: "Turn a container into a flex formatting context and reason about main-axis distribution, cross-axis alignment, and gap in an integrated toolbar layout"
objectives:
  - Identify the flex container and direct flex items
  - Distinguish main and cross axes
  - Combine gap, justify-content, and align-items intentionally
exercise:
  mode: both
  starterHtml: |
    <div class="toolbar"><span>Menu</span><button>Save</button><button>Publish</button></div>
  starter: |
    /* TODO: make .toolbar a flex row with 1rem gap, space between groups, and centered cross-axis alignment */
  hints:
    - Flex properties belong on the container; its direct children become flex items.
    - In the default row direction, the main axis is horizontal and cross axis is vertical.
    - Use display: flex; gap: 1rem; justify-content: space-between; align-items: center;.
  solution: |
    .toolbar {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;
    }
  expected:
    type: cssRules
    rules:
      - selector: .toolbar
        declarations:
          display: flex
          gap: 1rem
          justify-content: space-between
          align-items: center
---

Flexbox is a **one-dimensional** layout model: it reasons primarily along a main axis, with alignment on the perpendicular cross axis.

## Mental model

```text
flex container
main axis  ------------------>
items:        A      B      C
cross axis             ↓
```

`display: flex` establishes the flex formatting context on the container. Its direct children become flex items.

## Predict the rendered result

With the default `flex-direction: row`, `justify-content` acts horizontally and `align-items` acts vertically. If direction changes to column, those axis roles rotate with it.

## Worked example

```css
.toolbar {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
```

`gap` adds inter-item spacing without pretending that outer margins are part of every item's component contract.

## Debug this

```css
.toolbar button {
  display: flex;
  justify-content: space-between;
}
```

This creates flex formatting inside each button, not across the toolbar's direct children. Layout properties must be applied to the container whose children you intend to arrange.

## Common mistakes

- Putting container alignment properties on the items.
- Memorizing “justify = horizontal” instead of following the current main axis.
- Using flexbox as if it were inherently two-dimensional grid layout.

## Your turn

Complete the integrated toolbar rule with all four declarations and predict both axes before previewing.

## Quick check

If `flex-direction` becomes `column`, is `justify-content` still the horizontal alignment control?

**Answer:** no. It follows the main axis, which becomes vertical in a column.
