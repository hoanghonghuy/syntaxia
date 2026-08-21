---
id: js-02-numbers
track: javascript-basics
locale: en
slug: numbers-and-operators
title: Numbers, operators, and evaluation order
order: 2
published: true
can_do: "Trace a numeric expression through types and operator precedence to predict the resulting JavaScript value"
objectives:
  - Use arithmetic operators with Number values
  - Apply multiplication/division precedence before addition/subtraction
  - Recognize when strings cause coercion instead of numeric addition
exercise:
  starter: |
    const price = 12;
    const quantity = 3;
    // TODO: return the numeric total
  hints:
    - "Both inputs are Number values, so multiplication is numeric."
    - "Use the * operator between price and quantity."
    - "Use: return price * quantity;"
  solution: |
    const price = 12;
    const quantity = 3;
    return price * quantity;
  expected:
    type: returnValue
    value: 36
---

Arithmetic bugs are often type or evaluation-order bugs, not calculator mistakes. Trace both the operands and the operator.

## Execution model

Common numeric operators:

| expression | result |
| --- | ---: |
| `2 + 3` | 5 |
| `10 - 4` | 6 |
| `3 * 2` | 6 |
| `5 / 2` | 2.5 |
| `2 + 3 * 4` | 14 |
| `(2 + 3) * 4` | 20 |

Multiplication/division have higher precedence than addition/subtraction; parentheses make intended grouping explicit.

## Trace it

```javascript
const price = 12;
const quantity = 3;
const total = price * quantity;
```

| expression | operand types | result |
| --- | --- | --- |
| `price * quantity` | number × number | number `36` |

Now contrast `"12" + 3`: because one operand is a string, `+` performs concatenation and yields string `"123"`.

## Predict before you run

The exercise operands are both numbers. Predict return value **36** with type Number.

## Worked example

```javascript
const subtotal = 12 * 3;
const shipping = 5;
const total = subtotal + shipping;
console.log(total); // 41
```

Trace intermediate values instead of trying to evaluate a long expression mentally all at once.

## Debug this

```javascript
const price = "12";
const quantity = 3;
return price + quantity;
```

This returns `"123"`, not `15`. The syntax is valid; the bug is a type/coercion mismatch. Fix data types at the boundary rather than sprinkling conversions blindly.

## Common mistakes

- Using `x` instead of `*` for multiplication.
- Assuming `+` always means numeric addition.
- Ignoring precedence and relying on a reader to guess intended grouping.

## Your turn

Return the numeric product of `price` and `quantity`.

## Quick check

Why does `"12" + 3` produce `"123"` while `12 + 3` produces `15`?

**Answer:** the first expression includes a string so `+` concatenates; the second has two numbers so `+` performs numeric addition.
