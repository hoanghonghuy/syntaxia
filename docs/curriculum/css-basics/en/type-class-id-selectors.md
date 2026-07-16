---
id: css-02-selectors
track: css-basics
locale: en
slug: type-class-id-selectors
title: Type, class, and ID selectors
order: 2
published: true
objectives:
  - Use type selectors for element names
  - Target reusable groups with class selectors
  - Reserve ID selectors for unique elements
exercise:
  mode: both
  starterHtml: |
    <p class="note" id="hero">Hi</p>
  starter: |
    /* Style .note and #hero */
    
  hints:
    - "Classes use .name; ids use #name."
    - You can write two separate rules.
    - "font-weight: bold makes text heavier."
  solution: |
    .note { color: navy; }
    #hero { font-weight: bold; }
  expected:
    type: cssIncludes
    needles:
      - .note
      - "#hero"
---

**Selectors** tell the browser which elements a rule should affect. Three selectors appear in almost every beginner stylesheet: the **type** selector (element name), the **class** selector (a reusable label), and the **ID** selector (a unique label on one element).

Think of a classroom roster. “All students” is like a type. “Math club members” is like a class — several people can share it. “Student number 42” is like an ID — it should identify only one person.

| Selector | Syntax | Matches | Typical use |
| --- | --- | --- | --- |
| Type | `p` | Every `p` | Base styles for a kind of element |
| Class | `.card` | Elements with `class="card"` | Reusable patterns (cards, notes, buttons) |
| ID | `#hero` | The element with `id="hero"` | One unique landmark on the page |

## Worked example

```css
p {
  color: #333;
}

.highlight {
  background-color: #fff3cd;
}

#main-title {
  font-size: 2rem;
}
```

- `p` styles every paragraph on the page.
- `.highlight` styles only elements that include the class name `highlight` in HTML (`class="highlight"`). An element can have several classes separated by spaces.
- `#main-title` styles the single element whose `id` is `main-title`. IDs must be unique in a document.

Prefer classes for most styling. Use type selectors for broad defaults. Use IDs sparingly — they are stronger in the cascade (next lessons) and harder to reuse.

## Common mistakes

- Writing `.highlight` in CSS but forgetting `class="highlight"` in HTML — the rule matches nothing.
- Putting a hash or dot on the HTML attribute (`id=".hero"`) — HTML uses plain names; the `#` and `.` belong only in CSS.
- Giving the same `id` to two elements — IDs must be unique; use a class when several items share a look.

## Your turn

Use the sandbox below to style the class and id selectors. When the checker shows **Correct**, mark this lesson complete.
