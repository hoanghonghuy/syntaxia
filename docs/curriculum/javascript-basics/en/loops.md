---
id: js-07-loops
track: javascript-basics
locale: en
slug: loops
title: Repeating work with loops
order: 7
published: true
objectives:
  - Repeat code with a for loop
  - Use a counter variable i
  - Visit each array item by index
exercise:
  starter: |
    let total = 0;
    // Use a for loop to add 1, 2, and 3 into total
    return total;
  hints:
    - "The loop adds 1, then 2, then 3 into total."
    - "Use return after the loop finishes."
    - "1 + 2 + 3 is the answer."
  solution: |
    let total = 0;
    for (let n = 1; n <= 3; n++) {
      total = total + n;
    }
    return total;
  expected:
    type: returnValue
    value: 6
---

Washing ten plates one recipe at a time is tedious. A **loop** repeats a small block of code for each step — same pattern, many times.

| Piece | Plain meaning | Example |
| --- | --- | --- |
| `for (...)` | Controlled repeat | `for (let i = 0; i < 3; i++)` |
| `i` | Counter, often starts at 0 | `i++` adds 1 each round |
| `array[i]` | Item at position `i` | `names[i]` inside the loop |

A common `for` loop has three parts: start (`let i = 0`), keep going while (`i < length`), step (`i++`).

## Worked example

```javascript
const names = ["Ana", "Bo", "Cy"];

for (let i = 0; i < names.length; i++) {
  console.log(i + ": " + names[i]);
}

let total = 0;
for (let n = 1; n <= 3; n++) {
  total = total + n;
}
console.log(total);
```

- The first loop prints each name with its index.
- `names.length` is `3`, so `i` runs `0`, `1`, `2` then stops.
- The second loop adds `1 + 2 + 3` into `total` → `6`.

## Common mistakes

- Off-by-one — `i < length` stops at the last index; `i <= length` goes one past the end.
- Reusing `i` outside the loop — `let i` inside `for` stays inside the loop block.
- Infinite loops — if the counter never moves toward the end (`i++` missing), the loop never finishes.

## Your turn

Return the sum `1 + 2 + 3` using the `for` loop pattern from the worked example. Mark complete when the checker shows **6**.
