---
id: css-10-display
track: css-basics
locale: en
slug: display-and-flow
title: Display and normal flow
order: 10
published: true
can_do: "Predict how block, inline, inline-block, and none participate in normal flow and choose inline-block when inline placement still needs box sizing"
objectives:
  - Contrast block and inline outer behavior
  - Use inline-block for an inline-level box that accepts dimensions
  - Understand that display none removes the box from layout
exercise:
  mode: both
  starterHtml: |
    <span class="badge">A</span>
    <span>following text</span>
  starter: |
    /* TODO: keep .badge in the line but give it a box width and padding */
  hints:
    - Plain inline boxes do not use width in the same way as inline-block.
    - Use display: inline-block so the badge stays in inline flow and accepts box dimensions.
    - Set display: inline-block; width: 3rem; padding: 0.5rem;.
  solution: |
    .badge { display: inline-block; width: 3rem; padding: 0.5rem; }
  expected:
    type: cssRules
    rules:
      - selector: .badge
        declarations:
          display: inline-block
          width: 3rem
          padding: 0.5rem
---

`display` changes how a box participates in layout. Start from **normal flow** before reaching for complex layout systems.

## Mental model

| Value | Simplified behavior |
| --- | --- |
| `block` | new line, block-level outer flow |
| `inline` | participates in a text line |
| `inline-block` | inline outer flow + box-like dimensions |
| `none` | no generated box in layout |

The inner content formatting and outer participation are related but distinct concepts.

## Predict the rendered result

A `span` is inline by default. Setting a width alone may not create the badge geometry you expect. Changing it to `inline-block` lets it stay beside text while accepting the declared box width.

## Worked example

```css
.badge {
  display: inline-block;
  width: 3rem;
  padding: 0.5rem;
}
```

`display: none` is different from visually transparent content: it removes the box from layout rather than merely making it invisible.

## Debug this

```css
.badge { width: 3rem; }
```

If the element remains an inline box, the requested width is not applied as a normal block dimension. Inspect display behavior before assuming width is broken.

## Common mistakes

- Treating block/inline as merely visual labels.
- Using `display: none` when content must remain available to assistive interaction.
- Adding width to inline content and assuming normal block sizing rules apply unchanged.

## Your turn

Turn the badge into an inline-block with the requested dimensions.

## Quick check

What is the key advantage of `inline-block` in this example?

**Answer:** it stays in inline flow while accepting box dimensions such as width.
