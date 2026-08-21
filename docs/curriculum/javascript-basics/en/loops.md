---
id: js-07-loops
track: javascript-basics
locale: en
slug: loops
title: Repetition and accumulators with loops
order: 7
published: true
can_do: "Trace each loop iteration, update an accumulator safely, and choose for...of when only collection values are needed"
objectives:
  - Trace changing state across loop iterations
  - Use for...of to iterate array values directly
  - Recognize off-by-one and non-terminating loop bugs
exercise:
  starter: |
    const values = [1, 2, 3];
    let total = 0;
    // TODO: add every value into total with a loop
    return total;
  hints:
    - "for...of gives each array value directly; no index is needed here."
    - "On each iteration update total by adding the current value."
    - "Use: for (const value of values) { total += value; }"
  solution: |
    const values = [1, 2, 3];
    let total = 0;
    for (const value of values) {
      total += value;
    }
    return total;
  expected:
    type: returnValue
    value: 6
---

Loops repeat a rule while state changes from one iteration to the next. A good way to understand them is to trace the state after **every iteration**.

## Execution model

For collection values, `for...of` says:

```text
for each value in the iterable -> run the body once with that value
```

A classic `for (initial; condition; step)` is useful when you need explicit index/control. Use `for...of` when the value itself is what matters.

## Trace it

```javascript
const values = [1, 2, 3];
let total = 0;

for (const value of values) {
  total += value;
}
```

| iteration | `value` | total before | total after |
| ---: | ---: | ---: | ---: |
| 1 | 1 | 0 | 1 |
| 2 | 2 | 1 | 3 |
| 3 | 3 | 3 | 6 |

The accumulator invariant is simple: after each iteration, `total` equals the sum of all values processed so far.

## Predict before you run

Predict the state sequence `0 → 1 → 3 → 6`, then the final returned value `6`.

## Worked example

```javascript
const prices = [5, 10, 2];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log(total); // 17
```

## Debug this

```javascript
const values = [1, 2, 3];
let total = 0;
for (let i = 0; i <= values.length; i++) {
  total += values[i];
}
```

When `i === values.length`, `values[i]` is `undefined`. Adding that to a number produces `NaN`. This is the classic off-by-one boundary bug. If you need indexes, the last valid one is `length - 1`.

## Common mistakes

- Failing to update the accumulator inside the loop.
- Using `<= length` when indexing an array and stepping one position too far.
- Using `for...in` when the intent is array values; `for...of` communicates that intent directly.

## Your turn

Use a loop to add all values `[1, 2, 3]` into `total` and return `6`.

## Quick check

Why is `for...of` a good fit here?

**Answer:** the algorithm needs each array value directly and does not need the numeric index.
