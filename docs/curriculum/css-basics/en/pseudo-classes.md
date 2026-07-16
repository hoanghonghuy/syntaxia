---
id: css-04-pseudo
track: css-basics
locale: en
slug: pseudo-classes
title: Pseudo-classes for links
order: 4
published: true
objectives:
  - Style link states with :link, :visited, :hover, and :focus
  - Explain what a pseudo-class represents
  - Prefer visible focus styles for keyboard users
---

A **pseudo-class** styles an element in a special *state*, without adding a new class in HTML. Link styling is the classic beginner use: unvisited, visited, hovered, and focused. The colon (`:`) marks the pseudo-class name.

Think of a physical button that looks different when you press it or when it is selected. The button is still the same object; its state changed. Pseudo-classes describe those moments for elements on the page.

| Pseudo-class | Typical meaning for links |
| --- | --- |
| `:link` | Unvisited link |
| `:visited` | Link the user has already opened |
| `:hover` | Pointer is over the link |
| `:focus` | Link is focused (often via keyboard Tab) |
| `:active` | Link is being activated (mouse down / key press) |

## Worked example

```css
a:link {
  color: #0b57d0;
}

a:visited {
  color: #681da8;
}

a:hover {
  text-decoration: underline;
}

a:focus {
  outline: 2px solid #0b57d0;
  outline-offset: 2px;
}
```

- `a:link` and `a:visited` set base colors for new and previously visited destinations.
- `a:hover` adds an underline when the pointer rests on the link — feedback that it is interactive.
- `a:focus` draws an **outline** so keyboard users can see which link is active. Do not remove focus styles without providing a clear replacement.

A common order for link rules is link → visited → hover → focus → active, so later interaction states can override earlier colors when needed.

## Common mistakes

- Styling only `:hover` and removing `:focus` outlines — keyboard and assistive-tech users lose their place on the page.
- Expecting `:visited` to reveal private browsing history in detail — browsers limit what visited styles can change for privacy.
- Writing `a :hover` (with a space) — that looks for a hovered *descendant* inside the link, not the link’s own hover state.

## Your turn

Re-read the worked example and name the four states shown. Notice which rule helps keyboard users. Then mark this lesson complete.
