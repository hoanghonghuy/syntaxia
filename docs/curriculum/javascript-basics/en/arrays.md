---
id: js-05-arrays
track: javascript-basics
locale: en
slug: arrays
title: Lists with arrays
order: 5
published: true
objectives:
  - Create an array with square brackets
  - Read one item by index starting at 0
  - Add an item with push and read length
---

A shopping list holds many item names in order. An **array** is JavaScript’s ordered list — several values under one variable name.

| Idea | Plain meaning | Example |
| --- | --- | --- |
| Create | Square brackets with commas | `["apple", "pear"]` |
| Index | Position, starting at 0 | first item is `[0]` |
| `.length` | How many items | `list.length` |
| `.push(item)` | Add to the end | `list.push("banana")` |

## Worked example

```javascript
const fruits = ["apple", "pear", "orange"];

console.log(fruits[0]);
console.log(fruits.length);

fruits.push("mango");
console.log(fruits[fruits.length - 1]);
```

- `fruits[0]` is the first item → `"apple"`.
- `.length` is `3` before the push.
- `.push("mango")` adds a fourth item; `fruits.length - 1` is the index of the last item.

## Common mistakes

- Using index 1 for the first item — arrays start at **0**.
- Mixing array and object syntax — arrays use `[ ]`, not `{ }`.
- Expecting `push` to return the whole list — it returns the new length; read the array variable to see items.

## Your turn

After `push("mango")`, how many items are in `fruits`? Count on your fingers, then mark this lesson complete.
