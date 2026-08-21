---
id: html-10-controls
track: html-basics
locale: en
slug: form-controls
title: Choosing and grouping form controls
order: 10
published: true
can_do: "Choose checkbox, radio, select, and textarea controls by interaction model and correctly group mutually exclusive radio options with one shared name"
objectives:
  - Match control type to the kind of answer being collected
  - Group radio choices with one shared name
  - Combine select, option, and textarea controls in a structured form
exercise:
  mode: html
  starter: |
    <!-- TODO: build a form with checkbox, two grouped radios, select with two options, and textarea -->
  hints:
    - Use input type="checkbox" for an independent yes/no choice and two input type="radio" controls for one-of-many choice.
    - Both radio inputs must share the same name so the browser treats them as one group.
    - Add a select containing at least two option elements and one textarea for multi-line notes.
  solution: |
    <form>
      <label><input type="checkbox" name="newsletter"> Newsletter</label>
      <label><input type="radio" name="plan" value="basic"> Basic</label>
      <label><input type="radio" name="plan" value="pro"> Pro</label>
      <select name="role">
        <option>Developer</option>
        <option>Designer</option>
      </select>
      <textarea name="notes"></textarea>
    </form>
  expected:
    type: htmlTags
    tags:
      - tag: form
        minCount: 1
      - tag: input
        minCount: 1
        attrEquals:
          type: checkbox
      - tag: input
        minCount: 2
        requiredAttrs: [name]
        attrEquals:
          type: radio
      - tag: select
        minCount: 1
      - tag: option
        minCount: 2
      - tag: textarea
        minCount: 1
    relations:
      - kind: sharedAttributeValue
        tag: input
        attr: name
        minCount: 2
        attrEquals:
          type: radio
---

Form controls encode different **interaction models**. Choosing the right control gives the browser useful behavior before any JavaScript is written.

## Mental model

| Question shape | Control |
| --- | --- |
| independent yes/no toggle | checkbox |
| exactly one choice from a small group | radios sharing one `name` |
| one choice from a longer list | `select` + `option` |
| free multi-line text | `textarea` |

Radio grouping is data structure: the shared `name` says these controls answer the same question.

## Predict the rendered structure

Two radios with `name="plan"` are one group. Predict what happens when the user selects Basic and then Pro: Pro becomes selected and Basic is cleared. If the names differ, the browser no longer knows they are mutually exclusive.

## Worked example

```html
<label><input type="checkbox" name="newsletter"> Newsletter</label>

<label><input type="radio" name="plan" value="basic"> Basic</label>
<label><input type="radio" name="plan" value="pro"> Pro</label>

<select name="role">
  <option>Developer</option>
  <option>Designer</option>
</select>

<textarea name="notes"></textarea>
```

The control's type should follow the answer model rather than whatever widget happens to look convenient.

## Debug this

```html
<input type="radio" name="basic" value="basic">
<input type="radio" name="pro" value="pro">
```

These are two independent radio groups because their names differ. Give both the same question name, for example `name="plan"`.

## Common mistakes

- Using radio buttons for independent toggles that should allow multiple selections.
- Giving each radio option a different `name`.
- Using a single-line input for long free-form notes instead of `textarea`.

## Your turn

Build the integrated control set from the starter. The grader now verifies that at least two radio inputs share the same non-empty `name`.

## Quick check

What makes two radio inputs part of the same mutually exclusive group?

**Answer:** a shared `name` value.
