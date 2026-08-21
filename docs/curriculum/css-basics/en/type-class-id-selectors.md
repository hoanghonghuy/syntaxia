---
id: css-02-selectors
track: css-basics
locale: en
slug: type-class-id-selectors
title: Type, class, and ID selectors
order: 2
published: true
can_do: "Choose type, class, or ID selectors from the intended reuse scope and predict exactly which elements each selector matches"
objectives:
  - Use type selectors for broad element defaults
  - Use classes for reusable styling hooks
  - Recognize IDs as unique document identifiers with high specificity
exercise:
  mode: both
  starterHtml: |
    <p class="note">Reusable note</p>
    <p id="hero">Unique hero copy</p>
  starter: |
    /* TODO: make .note navy and #hero bold */
  hints:
    - Classes use a dot in CSS; IDs use a hash.
    - Write separate .note and #hero rules so each target has one job.
    - Use .note { color: navy; } and #hero { font-weight: bold; }.
  solution: |
    .note { color: navy; }
    #hero { font-weight: bold; }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: navy
      - selector: "#hero"
        declarations:
          font-weight: bold
---

Selector choice expresses **how broadly a style should match**.

## Mental model

| Selector | Match scope | Typical intent |
| --- | --- | --- |
| `p` | all elements of that type | broad defaults |
| `.note` | every element carrying that class | reusable component/state style |
| `#hero` | the element with that unique id | unique hook; use sparingly for styling |

Classes are usually the most reusable styling primitive. IDs also affect specificity strongly, so they are easy to overuse.

## Predict the rendered result

With two paragraphs where only the first has class `note` and only the second has id `hero`, predict that `.note` and `#hero` match different elements. The punctuation belongs in CSS selectors, not inside HTML attribute values.

## Worked example

```css
p { line-height: 1.5; }
.note { color: navy; }
#hero { font-weight: bold; }
```

An element can match more than one rule. Which declaration wins on a conflict is handled by the cascade later.

## Debug this

```html
<p class=".note">Hello</p>
```

```css
.note { color: navy; }
```

The class value is literally `.note`, so the intended class name `note` is missing. Dots and hashes are selector syntax, not part of ordinary HTML class/id names.

## Common mistakes

- Reusing the same ID on several elements.
- Adding `.` or `#` inside HTML class/id values.
- Reaching for IDs when a reusable class better matches the styling intent.

## Your turn

Style the reusable class and unique ID with separate rules.

## Quick check

Which selector is normally the better choice for a card style reused 20 times?

**Answer:** a class selector.
