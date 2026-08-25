---
id: js-05-arrays
track: javascript-basics
locale: en
slug: arrays
title: Arrays, indexes, and mutation
order: 5
published: true
can_do: "Trace an array before and after mutation while distinguishing a const binding from the mutable array value it references"
objectives:
  - Read array indexes from zero
  - Mutate an array with push and observe the new state
  - Explain why a const array binding can still reference a mutated array
exercise:
  starter: |
    const fruits = ["apple", "pear", "orange"];
    // TODO: add "mango" to the end, then return fruits.length
  hints:
    - "push mutates the existing array by appending one item."
    - "The const binding fruits is not reassigned; the array it references changes."
    - "Use: fruits.push('mango'); then return fruits.length;"
  solution: |
    const fruits = ["apple", "pear", "orange"];
    fruits.push("mango");
    return fruits.length;
  expected:
    type: returnValue
    value: 4
---

An array stores an ordered sequence of values. Learning arrays means tracking both **positions** and **state changes**.

## Execution model

```javascript
const fruits = ["apple", "pear", "orange"];
```

| index | 0 | 1 | 2 |
| ---: | --- | --- | --- |
| value | apple | pear | orange |

`fruits.length` is `3`; the last valid index is `length - 1`, which is `2`.

The declaration uses `const`, but that protects the **binding** from reassignment. It does not make the referenced array immutable.

## Trace it

```javascript
const fruits = ["apple", "pear", "orange"];
fruits.push("mango");
```

| moment | array state | length |
| --- | --- | ---: |
| before `push` | apple, pear, orange | 3 |
| after `push` | apple, pear, orange, mango | 4 |

`push` mutates the array and returns the new length.

## Predict before you run

Predict two things before executing: `fruits[3]` becomes `"mango"`, and `fruits.length` becomes `4`.

## Worked example

```javascript
const queue = ["A", "B"];
const newLength = queue.push("C");

console.log(queue);     // ["A", "B", "C"]
console.log(newLength); // 3
```

The returned number and the mutated array are different values.

## Debug this

```javascript
const fruits = ["apple", "pear"];
const result = fruits.push("mango");
return result[0];
```

`result` is a number, not the array. The method changed `fruits` and returned its new length. Debug method calls by asking separately: **what state changed? what value was returned?**

## Common mistakes

- Treating index `1` as the first array item instead of index `0`.
- Assuming `const` makes the array contents immutable.
- Assuming `push()` returns the whole array instead of the new length.

## Your turn

Append `"mango"` to the existing array and return its new length.

## Quick check

Why can `fruits.push(...)` work when `fruits` was declared with `const`?

**Answer:** the binding is not reassigned; the same referenced array object is being mutated.
