---
id: js-02-numbers
track: javascript-basics
locale: en
slug: numbers-and-operators
title: Numbers and basic operators
order: 2
published: true
objectives:
  - Use +, -, *, and / with numbers
  - Store a calculation result in a variable
  - Read a short expression left to right with parentheses when needed
---

A calculator combines numbers with symbols like + and ×. JavaScript does the same with **operators**. You write the numbers and symbols; the browser computes the result.

Common operators:

| Symbol | Plain meaning | Example |
| --- | --- | --- |
| `+` | Add | `2 + 3` → `5` |
| `-` | Subtract | `10 - 4` → `6` |
| `*` | Multiply | `3 * 2` → `6` |
| `/` | Divide | `8 / 2` → `4` |

## Worked example

```javascript
const price = 12;
const quantity = 3;
const total = price * quantity;

console.log(total);
console.log((price + 2) * quantity);
```

- `price * quantity` multiplies 12 by 3 and stores `36` in `total`.
- Parentheses `(price + 2)` run first, then multiply by `quantity` → `42`.
- Without parentheses, multiplication happens before addition — parentheses make the order obvious.

## Common mistakes

- Using `x` for multiply — in JavaScript multiply is `*`, not the letter x.
- Joining text by accident (`"12" + 3` becomes `"123"`) — quotes make text, not a number.
- Forgetting that `/` can produce decimals (`5 / 2` is `2.5`).

## Your turn

In the worked example, what is `total` after `price * quantity`? Confirm the number, then mark this lesson complete.
