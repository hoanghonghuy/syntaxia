---
id: html-04-lists
track: html-basics
locale: en
slug: lists
title: Lists
order: 4
published: true
can_do: "Choose unordered, ordered, or description-list structure from the relationship between items and keep list items nested correctly"
objectives:
  - Choose list type from whether order has meaning
  - Keep li elements as children of ul or ol
  - Recognize term-description structure with dl, dt, and dd
exercise:
  mode: html
  starter: |
    <!-- TODO: build an unordered list with at least two items -->
  hints:
    - Use ul because these practice items do not need a sequence number.
    - Each list item must be inside an li element.
    - Build <ul> with at least two <li>...</li> children.
  solution: |
    <ul>
      <li>Water</li>
      <li>Flour</li>
    </ul>
  expected:
    type: htmlTags
    tags:
      - tag: ul
        minCount: 1
      - tag: li
        minCount: 2
---

A list communicates a relationship between several items. The important decision is whether **sequence matters**, not whether you prefer bullets or numbers visually.

## Mental model

```text
unordered: ul -> li, li, li
ordered:   ol -> li, li, li
description: dl -> dt + dd, dt + dd
```

`ul` and `ol` are containers; their actual items are `li` elements.

## Predict the rendered structure

A recipe sequence should remain meaningful if someone reads “step 1, step 2, step 3”. A shopping set usually does not. Predict which should use `ol` and which should use `ul` before writing markup.

## Worked example

```html
<ul>
  <li>Water</li>
  <li>Flour</li>
</ul>

<ol>
  <li>Mix the dough.</li>
  <li>Rest for 30 minutes.</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>Markup for document structure.</dd>
</dl>
```

The element choice preserves the relationship even if CSS later changes markers.

## Debug this

```html
<ul>
  Water
  <li>Flour</li>
</ul>
```

`Water` is bare text instead of a list item. Make every item an `li`; a nested list should likewise live inside an `li`, not beside one.

## Common mistakes

- Using `ol` only because you like numbers, even when order has no meaning.
- Putting bare item text directly under `ul` or `ol`.
- Creating visual bullet characters manually instead of real list structure.

## Your turn

Build an unordered list with at least two list items and inspect the resulting list structure in the preview.

## Quick check

When should a list be ordered?

**Answer:** when the position/sequence of its items is meaningful, such as steps or rankings.
