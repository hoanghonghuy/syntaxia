---
id: html-09-forms
track: html-basics
locale: en
slug: forms-basics
title: Forms, labels, and submitted names
order: 9
published: true
can_do: "Build an accessible basic form where a visible label targets its input and the control has a submission name and explicit button type"
objectives:
  - Associate a label's for value with an input id
  - Distinguish control id from submitted name
  - Use an explicit submit button type
exercise:
  mode: html
  starter: |
    <!-- TODO: build an email form with associated label, named email input, and submit button -->
  hints:
    - Put label, input, and button inside a form.
    - Match label for="email" with input id="email"; give the input name="email" and type="email".
    - Use <button type="submit"> for the submission action.
  solution: |
    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email">
      <button type="submit">Subscribe</button>
    </form>
  expected:
    type: htmlTags
    tags:
      - tag: form
        minCount: 1
      - tag: label
        minCount: 1
        requiredAttrs: [for]
      - tag: input
        minCount: 1
        requiredAttrs: [id, name, type]
        attrEquals:
          type: email
      - tag: button
        minCount: 1
        attrEquals:
          type: submit
    relations:
      - kind: attributeReference
        fromTag: label
        fromAttr: for
        toTag: input
        toAttr: id
        minCount: 1
---

A form control needs more than a visible box. It needs an **accessible name**, a control identity in the document, and usually a key for submitted data.

## Mental model

```text
label for="email" ─────┐
                       v
input id="email" name="email" type="email"
       |             |
   label target   submission key
```

`id` connects document relationships such as labels; `name` is the key used when successful form data is submitted.

## Predict the rendered structure

For a correctly associated label, predict what happens when the user clicks the word “Email”: focus moves to the email input. Also predict the submitted key: it comes from `name`, not from the visible label text.

## Worked example

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <button type="submit">Subscribe</button>
</form>
```

The browser gains built-in email-input behavior and label interaction because the markup describes the relationship instead of imitating it visually.

## Debug this

```html
<label for="contact-email">Email</label>
<input id="email" name="email" type="email">
```

The label points to an id that does not exist, so the association is broken. The two values must match exactly.

## Common mistakes

- Using placeholder text instead of a persistent visible label.
- Confusing `id` with `name` and leaving one of their responsibilities missing.
- Leaving button type implicit in reusable form markup.

## Your turn

Build the associated email form. The grader now verifies that `label.for` actually references an existing `input.id`, not merely that both tags exist.

## Quick check

Which attribute normally becomes the key in submitted form data: `id` or `name`?

**Answer:** `name`.
