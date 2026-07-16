---
id: css-05-cascade
track: css-basics
locale: en
slug: cascade-and-specificity
title: Cascade and specificity
order: 5
published: true
objectives:
  - Explain how conflicting declarations are resolved
  - Compare type, class, and ID specificity at a beginner level
  - Recognize inheritance for properties like color and font
exercise:
  mode: both
  starterHtml: |
    <p class="note">Hi</p>
  starter: |
    /* Make .note purple */
    
  hints:
    - Class selector beats bare element names.
    - "Use .note { } to target the paragraph."
    - Set color to any value you like.
  solution: |
    .note { color: purple; }
  expected:
    type: cssIncludes
    needles:
      - .note
      - color
---

When two rules target the same element and set the same property, the browser must pick a winner. That decision process is the **cascade**. **Specificity** is one of its main tools: more specific selectors beat less specific ones. Some properties also **inherit** from parent to child (for example, `color` and `font-family`).

Think of overlapping sticky notes on a wall. A note pinned closer to the item (more specific) wins. If two notes are equally specific, the one placed later on top wins. Some instructions (“use navy ink”) pass down to nested items automatically — that is inheritance.

| Factor | Beginner idea | Example |
| --- | --- | --- |
| Origin & importance | Author styles vs browser defaults | Your stylesheet overrides defaults |
| Specificity | ID > class > type (rough order) | `#title` beats `.title` beats `h1` |
| Source order | Later rule wins if specificity ties | Second `p { color: ... }` overrides the first |
| Inheritance | Some traits flow to children | `body { color: #222; }` tints nested text |

## Worked example

```css
p {
  color: black;
}

.note {
  color: teal;
}

#alert {
  color: crimson;
}
```

Suppose the HTML is `<p id="alert" class="note">Warning</p>`:

- The type rule `p` is least specific.
- The class rule `.note` is more specific than `p`.
- The ID rule `#alert` is more specific still, so **`color: crimson`** wins for that paragraph.

If two class rules conflict and neither uses an ID, the one that appears **later** in the stylesheet usually wins. Avoid scattering `!important` — it short-circuits normal cascade learning and makes conflicts harder to fix.

## Common mistakes

- Raising specificity with long chains or IDs when a single clear class would do — styles become hard to override later.
- Assuming every property inherits — `margin`, `padding`, and `border` do **not** inherit by default.
- Relying on `!important` to “force” a win — fix selector specificity and source order first.

## Your turn

Use the sandbox below to set .note text color. When the checker shows **Correct**, mark this lesson complete.
