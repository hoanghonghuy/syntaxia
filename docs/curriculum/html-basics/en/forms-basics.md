---
id: html-09-forms
track: html-basics
locale: en
slug: forms-basics
title: Forms and labels
order: 9
published: true
objectives:
  - Wrap fields in a form element
  - Connect a label to an input with for and id
  - Add a button to submit the form
---

A **form** collects answers: a name, an email, a search query. The `form` element groups the fields. Each visible field should have a **label** so visitors know what to type — and so clicking the label focuses the control.

Paper forms print the question next to the blank. On the web, `label` and `input` should be tied together the same way.

| Piece | Role |
| --- | --- |
| `form` | Groups controls and defines where data can be sent |
| `label` | Visible name for a control |
| `input` | A single-line field (type defaults to text) |
| `button` | An action control (often submit) |

## Worked example

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />

  <button type="submit">Subscribe</button>
</form>
```

- `action` and `method` describe where and how the browser may send the data (servers handle the rest).
- `for="email"` on the label matches `id="email"` on the input — that pairing is what makes the label clickable.
- `name="email"` is the key used when the value is submitted.
- `type="submit"` on the button sends the form; plain buttons can use `type="button"` when they should not submit.

Always associate labels with controls. Placeholder text alone is not a substitute for a visible label.

## Common mistakes

- Forgetting the `for`/`id` match — the label then does not activate the field.
- Using only placeholder text as the field name — placeholders disappear when the user types.
- Nesting interactive controls in confusing ways — keep one clear label per input for now.

## Your turn

In the worked example, verify that `for` and `id` use the same value, and notice which attributes are for people (`label` text) versus for submission (`name`). Then mark this lesson complete.
