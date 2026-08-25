---
id: css-04-pseudo
track: css-basics
locale: en
slug: pseudo-classes
title: Styling element states with pseudo-classes
order: 4
published: true
can_do: "Use pseudo-classes to style an existing element in interaction states while preserving a visible keyboard-focus state"
objectives:
  - Read pseudo-classes as state conditions on an element
  - Style hover and focus separately
  - Avoid removing focus indication without a replacement
exercise:
  mode: both
  starterHtml: |
    <a href="/docs">Documentation</a>
  starter: |
    /* TODO: make the link orange on hover and add a visible outline on focus */
  hints:
    - Append :hover and :focus to the anchor selector.
    - The two interaction states should be separate rules.
    - Use a:hover { color: orange; } and a:focus { outline: 2px solid blue; }.
  solution: |
    a:hover { color: orange; }
    a:focus { outline: 2px solid blue; }
  expected:
    type: cssRules
    rules:
      - selector: a:hover
        declarations:
          color: orange
      - selector: a:focus
        declarations:
          outline: 2px solid blue
---

A pseudo-class adds a **state condition** to a selector. The element does not become a new element; its current state changes which rules match.

## Mental model

```text
anchor + state condition -> matching state rule

a:hover  pointer is over the anchor
a:focus  anchor currently has focus
```

Focus is especially important for keyboard users navigating with Tab.

## Predict the rendered result

Before previewing, predict that moving the pointer over the link changes its color, while keyboard focus creates an outline. The two states can occur independently.

## Worked example

```css
a:hover { color: orange; }
a:focus { outline: 2px solid blue; }
```

Pseudo-classes such as `:link`, `:visited`, `:hover`, `:focus`, and `:active` represent different link states. Keep focus visibly perceivable.

## Debug this

```css
a:focus { outline: none; }
```

Removing the default focus indicator without providing an alternative makes keyboard position hard to see. If you customize focus, replace it with another visible style.

## Common mistakes

- Treating `:hover` as a class that must be added to HTML.
- Designing only pointer hover and forgetting keyboard focus.
- Removing focus outlines for appearance without an accessible replacement.

## Your turn

Implement both hover and focus styles. The grader verifies each declaration on the corresponding state selector.

## Quick check

Does `:focus` require adding `class="focus"` in HTML?

**Answer:** no. It matches the element's current focus state automatically.
