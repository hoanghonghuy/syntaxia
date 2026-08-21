---
id: css-05-cascade
track: css-basics
locale: en
slug: cascade-and-specificity
title: Resolving conflicts with the cascade
order: 5
published: true
can_do: "Predict the winning declaration when type, class, inheritance, and source order compete without reaching for !important"
objectives:
  - Compare selector specificity at a beginner-safe level
  - Use source order only after specificity ties
  - Distinguish inherited properties from non-inherited box properties
exercise:
  mode: both
  starterHtml: |
    <p class="note">Which color wins?</p>
  starter: |
    /* TODO: keep the type rule black, then make the class rule win with purple */
  hints:
    - Both selectors match the paragraph, but a class selector is more specific than a type selector.
    - Write the broad p rule and the narrower .note rule separately.
    - Use p { color: black; } and .note { color: purple; }.
  solution: |
    p { color: black; }
    .note { color: purple; }
  expected:
    type: cssRules
    rules:
      - selector: p
        declarations:
          color: black
      - selector: .note
        declarations:
          color: purple
---

The cascade is the algorithm that resolves competing declarations. Specificity is one input to that algorithm, not the whole algorithm.

## Mental model

For beginner author styles with the same importance:

```text
match rules -> compare specificity -> if tied, later source order wins -> inherit where applicable
```

A rough selector hierarchy for this track is ID > class/pseudo-class > type. Real specificity is calculated from selector components rather than a simple global score.

## Predict the rendered result

```css
p { color: black; }
.note { color: purple; }
```

For `<p class="note">...</p>`, predict purple. Both rules match, but the class selector is more specific. Reversing their source order would not make the less-specific `p` rule win.

## Worked example

```css
body { color: #333; }
p { color: black; }
.note { color: purple; }
```

`color` can inherit from body, but a declaration directly matching the paragraph overrides the inherited value. The class then beats the type rule on specificity.

## Debug this

```css
.note { color: purple !important; }
```

`!important` can change cascade priority, but using it to avoid understanding ordinary conflicts makes future overrides harder. First inspect matches, specificity, inheritance, and source order.

## Common mistakes

- Thinking “the last rule always wins” even when specificity differs.
- Assuming margin/padding inherit like text color often does.
- Escalating every conflict with IDs or `!important`.

## Your turn

Write both matching rules and predict purple before opening the preview.

## Quick check

If `.note` appears before `p` in the same author stylesheet, which color wins here?

**Answer:** `.note` still wins because its selector is more specific.
