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
exercise:
  mode: html
  starter: |
    <!-- Build a form with label, input, and button -->
    
  hints:
    - Wrap controls in a form element.
    - Pair label with input using for and id.
    - Add a button to submit.
  solution: |
    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email">
      <button type="submit">Send</button>
    </form>
  expected:
    type: htmlTags
    tags:
      - tag: form
        minCount: 1
      - tag: label
        minCount: 1
      - tag: input
        minCount: 1
      - tag: button
        minCount: 1
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

Use the sandbox below to build a form with label, input, and button. When the checker shows **Correct**, mark this lesson complete.
