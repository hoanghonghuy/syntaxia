---
id: js-03-strings
track: javascript-basics
locale: en
slug: strings
title: Strings and template literals
order: 3
published: true
can_do: "Build readable strings from literals and values using template literals while predicting the exact resulting text"
objectives:
  - Distinguish string data from identifiers and numbers
  - Insert values into template literals with ${...}
  - Predict spacing and punctuation exactly
exercise:
  starter: |
    const greeting = "Hello";
    const name = "Sam";
    // TODO: build and return "Hello, Sam!"
  hints:
    - "A template literal uses backticks instead of quote-plus chains."
    - "Insert bindings with ${greeting} and ${name}."
    - "Use: return `${greeting}, ${name}!`;"
  solution: |
    const greeting = "Hello";
    const name = "Sam";
    return `${greeting}, ${name}!`;
  expected:
    type: returnValue
    value: "Hello, Sam!"
---

A string is text data. Modern JavaScript template literals make interpolation explicit and reduce punctuation/spacing bugs when a message contains dynamic values.

## Execution model

| syntax | example | result |
| --- | --- | --- |
| quoted literal | `"Hello"` | string `Hello` |
| template literal | `` `Hello` `` | string `Hello` |
| interpolation | `` `Hello, ${name}` `` | inserts current value of `name` |

Template literals use backticks. `${expression}` is evaluated, converted for string interpolation, and inserted into the surrounding text.

## Trace it

```javascript
const greeting = "Hello";
const name = "Sam";
const message = `${greeting}, ${name}!`;
```

| piece | contributes |
| --- | --- |
| `${greeting}` | `Hello` |
| `, ` | comma + one space |
| `${name}` | `Sam` |
| `!` | exclamation mark |

Final value: `"Hello, Sam!"`.

## Predict before you run

Count punctuation and whitespace before running. The checker compares the exact returned string.

## Worked example

```javascript
const product = "Notebook";
const quantity = 2;
const message = `${quantity} × ${product}`;
console.log(message); // 2 × Notebook
```

Use ordinary quote literals when no interpolation is needed; template literals shine when values are inserted.

## Debug this

```javascript
const message = "Hello, ${name}!";
```

Double quotes create a normal string; `${name}` stays literal text. Interpolation requires backticks.

## Common mistakes

- Using smart typography quotes instead of JavaScript quote/backtick characters.
- Forgetting that interpolation works only inside template literals.
- Losing spaces or punctuation when building strings with many `+` operators.

## Your turn

Return exactly `Hello, Sam!` using a template literal and the two existing bindings.

## Quick check

What must surround a JavaScript string if you want `${name}` interpolation to run?

**Answer:** backticks, creating a template literal.
