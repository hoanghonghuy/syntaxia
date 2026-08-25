---
id: js-01-variables
track: javascript-basics
locale: en
slug: variables
title: Bindings with const and let
order: 1
published: true
can_do: "Choose const or let from reassignment intent and trace the value a binding refers to over time"
objectives:
  - Prefer const when a binding is not reassigned
  - Use let when the binding must point to a new value later
  - Distinguish a binding name from its current value
exercise:
  starter: |
    const name = "Syntaxia";
    // TODO: return how many characters are in name
  hints:
    - "The binding itself does not need reassignment, so const is appropriate."
    - "Strings expose a .length property."
    - "Use: return name.length;"
  solution: |
    const name = "Syntaxia";
    return name.length;
  expected:
    type: returnValue
    value: 8
---

Variables let code give meaningful names to values. In modern JavaScript, the important choice is usually whether the **binding** will be reassigned.

## Execution model

| declaration | can reassign binding? | good default use |
| --- | --- | --- |
| `const x = value` | no | use when `x` will keep referring to the same value |
| `let x = value` | yes | use when `x` must later refer to another value |

Prefer `const` until the algorithm genuinely requires reassignment. That makes changing state explicit.

A subtle but important future-facing rule: `const` protects the binding from reassignment; it does not deep-freeze an object or array stored behind that binding.

## Trace it

```javascript
let score = 0;
score = score + 10;
const player = "Sam";
```

| step | `score` | `player` |
| ---: | ---: | --- |
| after declaration | 0 | not created yet |
| after assignment | 10 | not created yet |
| after const | 10 | Sam |

## Predict before you run

`"Syntaxia"` contains 8 characters. The exercise only reads `name`, so no reassignment is needed and `const` is the clearer declaration.

## Worked example

```javascript
const taxRate = 0.1;
let subtotal = 100;
subtotal = subtotal + 50;
const total = subtotal * (1 + taxRate);
```

Use `let` because `subtotal` changes; use `const` for values whose bindings do not change.

## Debug this

```javascript
const score = 0;
score = 10;
```

The second line tries to reassign a const binding and throws. Debug by asking whether the state should change; if yes, choose `let` deliberately rather than changing everything to mutable variables.

## Common mistakes

- Using `let` for every variable even when no reassignment occurs.
- Confusing assignment (`=`) with equality comparison (`===`).
- Thinking `const` means every nested value inside an object/array is automatically immutable.

## Your turn

Return the number of characters in the existing `name` string.

## Quick check

When should you choose `let` over `const`?

**Answer:** when that binding must be reassigned to a different value during the program's execution.
