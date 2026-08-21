---
id: css-12-sizing
track: css-basics
locale: en
slug: sizing-and-overflow
title: Constraints and overflow
order: 12
published: true
can_do: "Constrain a box with maximum dimensions and choose overflow behavior instead of hiding content accidentally when it exceeds the available space"
objectives:
  - Distinguish preferred size from min/max constraints
  - Predict when content exceeds a box constraint
  - Use overflow auto for conditional scrolling
exercise:
  mode: both
  starterHtml: |
    <div class="panel">A long block of content that can exceed a compact panel when space is constrained.</div>
  starter: |
    /* TODO: cap the panel at 12rem wide and 4rem tall, with scrolling only when needed */
  hints:
    - max-width and max-height set ceilings rather than forcing a fixed size in every case.
    - overflow: auto introduces scrolling when content actually overflows.
    - Use max-width: 12rem; max-height: 4rem; overflow: auto;.
  solution: |
    .panel { max-width: 12rem; max-height: 4rem; overflow: auto; }
  expected:
    type: cssRules
    rules:
      - selector: .panel
        declarations:
          max-width: 12rem
          max-height: 4rem
          overflow: auto
---

Content and available space are variable. Sizing constraints describe boundaries; overflow describes what happens when content crosses them.

## Mental model

```text
content intrinsic size
       ↓
min / preferred / max constraints
       ↓
fits? -> normal paint
no    -> overflow policy
```

`overflow: auto` differs from `scroll`: scrollbars are provided when overflow requires them rather than always reserving them.

## Predict the rendered result

A short panel can remain below its maximum dimensions. If content exceeds the height ceiling, `overflow: auto` lets the user reach hidden content through scrolling instead of silently clipping it.

## Worked example

```css
.panel {
  max-width: 12rem;
  max-height: 4rem;
  overflow: auto;
}
```

Prefer constraints when the design goal is “do not exceed this” rather than “always be exactly this size”.

## Debug this

```css
.panel { height: 4rem; overflow: hidden; }
```

This forces the height and clips excess content. If users must still access variable text, clipping is a data-loss-like presentation bug.

## Common mistakes

- Confusing `max-width` with a mandatory fixed width.
- Using `overflow: hidden` to silence layout problems without checking lost content.
- Forgetting that overflow can happen independently on horizontal and vertical axes.

## Your turn

Apply both maximum constraints and conditional scrolling.

## Quick check

When is `overflow: auto` preferable to `hidden` for text content?

**Answer:** when excess content must remain accessible instead of being clipped away.
