---
id: html-10-controls
track: html-basics
locale: en
slug: form-controls
title: More form controls
order: 10
published: true
objectives:
  - Use checkbox, radio, select, and textarea controls
  - Group related radios with a shared name
  - Mark a field as required when the answer is mandatory
---

Text boxes are only one kind of answer. Forms also need **yes/no choices**, **one-of-many choices**, **dropdown lists**, and **multi-line text**. Each control has a suitable HTML element or `input` type. The `required` attribute tells the browser a value must be filled before submit.

Match the control to the question: a short comment needs `textarea`; a country list fits `select`; “newsletter?” fits a checkbox.

| Control | Markup | User choice |
| --- | --- | --- |
| Checkbox | `input type="checkbox"` | Zero or more independent options |
| Radio | `input type="radio"` (same `name`) | Exactly one option in the group |
| Select | `select` > `option` | One (or more) from a list |
| Textarea | `textarea` | Multi-line text |
| Required | `required` attribute | Must be completed to submit |

## Worked example

```html
<form action="/rsvp" method="post">
  <label>
    <input type="checkbox" name="vegetarian" value="yes" />
    Vegetarian meal
  </label>

  <fieldset>
    <legend>Attendance</legend>
    <label>
      <input type="radio" name="attend" value="yes" required />
      Yes
    </label>
    <label>
      <input type="radio" name="attend" value="no" />
      No
    </label>
  </fieldset>

  <label for="seat">Seat preference</label>
  <select id="seat" name="seat">
    <option value="window">Window</option>
    <option value="aisle">Aisle</option>
  </select>

  <label for="notes">Notes</label>
  <textarea id="notes" name="notes" rows="4"></textarea>

  <button type="submit">Send RSVP</button>
</form>
```

- Checkbox values stand alone; unchecked boxes typically send nothing.
- Radios share `name="attend"` so only one can be selected; `required` on one radio in the group makes a choice mandatory.
- `select` lists options; `textarea` holds longer text (content goes between its tags, not in a `value` attribute).
- Wrapping a control inside its `label` is another valid way to associate them.

## Common mistakes

- Giving each radio a different `name` — then multiple radios can stay selected and they are not one group.
- Using a text input for long comments — prefer `textarea`.
- Marking every field `required` without need — reserve it for answers you truly cannot proceed without.

## Your turn

Scan the worked example and name each control type (checkbox, radio group, select, textarea). Confirm the two radios share one `name`. Then mark this lesson complete.
