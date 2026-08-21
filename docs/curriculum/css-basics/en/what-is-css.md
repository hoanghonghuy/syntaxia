---
id: css-00-intro
track: css-basics
locale: en
slug: what-is-css
title: CSS as rules over HTML
order: 0
published: true
can_do: "Trace a CSS rule from selector match to declaration and predict which existing HTML element changes presentation"
objectives:
  - Separate HTML semantics from CSS presentation
  - Read selector, property, and value as one styling rule
  - Predict the visible effect only on matching elements
exercise:
  mode: both
  starterHtml: |
    <h1>Welcome</h1>
    <p>Start here.</p>
  starter: |
    /* TODO: make only the h1 text teal */
  hints:
    - The target is the h1 element, so use the type selector h1.
    - The property that changes text color is color.
    - Use: h1 { color: teal; }
  solution: |
    h1 { color: teal; }
  expected:
    type: cssRules
    rules:
      - selector: h1
        declarations:
          color: teal
---

CSS does not create the page structure; it attaches presentation rules to HTML that already exists.

## Mental model

```text
HTML element -> selector match? -> declarations -> rendered style
```

For `h1 { color: teal; }`, the browser first finds matching `h1` elements, then applies the `color` declaration to them. A paragraph does not change just because it sits nearby.

## Predict the rendered result

```html
<h1>Welcome</h1>
<p>Start here.</p>
```

```css
h1 { color: teal; }
```

Predict before previewing: the heading text becomes teal; the paragraph keeps its current color.

## Worked example

```css
h1 {
  color: teal;
  font-size: 2rem;
}
```

A rule is **selector + declarations**. Each declaration is **property: value**. The HTML keeps its heading semantics even if the visual design changes completely.

## Debug this

```css
p { color: teal; }
```

The syntax is valid, but it targets the wrong element for a heading-color requirement. Debug CSS by asking both “is the declaration right?” and “does this selector match the intended element?”.

## Common mistakes

- Expecting CSS to invent missing HTML content.
- Checking only the property while ignoring which selector receives it.
- Confusing appearance changes with semantic changes.

## Your turn

Make only the existing `h1` teal. The grader now requires `color: teal` on an actual `h1` rule.

## Quick check

If no `h1` exists in the HTML, what does `h1 { color: teal; }` visibly change?

**Answer:** nothing; the selector matches no element.
