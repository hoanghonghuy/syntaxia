---
id: css-11-lists-links
track: css-basics
locale: en
slug: styling-lists-and-links
title: Styling navigation without losing semantics
order: 11
published: true
can_do: "Restyle semantic list-and-link navigation while keeping recognisable focus behavior and separating list presentation from link presentation"
objectives:
  - Remove list markers without changing list semantics
  - Style links through descendant selectors
  - Preserve an explicit focus indicator
exercise:
  mode: both
  starterHtml: |
    <ul class="menu"><li><a href="/home">Home</a></li><li><a href="/docs">Docs</a></li></ul>
  starter: |
    /* TODO: remove list markers, remove normal underline, and add focus outline */
  hints:
    - Style the list container and its anchors with separate selectors.
    - Use list-style: none on .menu and text-decoration: none on .menu a.
    - Add .menu a:focus { outline: 2px solid blue; } so keyboard focus stays visible.
  solution: |
    .menu { list-style: none; }
    .menu a { text-decoration: none; }
    .menu a:focus { outline: 2px solid blue; }
  expected:
    type: cssRules
    rules:
      - selector: .menu
        declarations:
          list-style: none
      - selector: .menu a
        declarations:
          text-decoration: none
      - selector: .menu a:focus
        declarations:
          outline: 2px solid blue
---

CSS can radically change navigation appearance without throwing away the underlying list and link semantics.

## Mental model

```text
HTML semantics stay: ul -> li -> a
CSS presentation changes: markers, decoration, interaction states
```

Keep styling responsibilities on selectors that match the relevant box or state.

## Predict the rendered result

Removing `list-style` hides bullets but the HTML remains a list. Removing normal text decoration changes the visual link treatment, so a clear hover/focus design becomes even more important.

## Worked example

```css
.menu { list-style: none; }
.menu a { text-decoration: none; }
.menu a:focus { outline: 2px solid blue; }
```

Presentation should not be used as a reason to replace semantic links with non-link elements.

## Debug this

```css
.menu { text-decoration: none; }
```

`text-decoration` needs to affect the anchors in this task. Styling only the list container does not reliably express the intended link rule; target `.menu a` explicitly.

## Common mistakes

- Removing every visual link cue without adding useful interaction states.
- Replacing list/link markup with generic divs just to style navigation.
- Applying declarations to the wrong box in the structure.

## Your turn

Restyle the semantic navigation and preserve a visible focus state.

## Quick check

Does `list-style: none` turn a `ul` into non-list HTML?

**Answer:** no. It changes presentation, not the document semantics.
