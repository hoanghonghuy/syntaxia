---
id: js-08-functions
track: javascript-basics
locale: en
slug: functions
title: Functions, parameters, and return values
order: 8
published: true
can_do: "Trace a function call from arguments to parameter bindings through return value and caller-side use"
objectives:
  - Distinguish function definition from function call
  - Map arguments to parameters for one call
  - Distinguish returning a value from logging a value
exercise:
  starter: |
    function add(a, b) {
      // TODO: return the sum of a and b
    }
    console.log(add(4, 5));
  hints:
    - "When add(4, 5) runs, a becomes 4 and b becomes 5 for that call."
    - "The function must return a value so console.log receives it."
    - "Use: return a + b;"
  solution: |
    function add(a, b) {
      return a + b;
    }
    console.log(add(4, 5));
  expected:
    type: console
    lines:
      - "9"
---

A function packages behavior behind a name. To understand one, trace the boundary between the **caller** and the **function call**.

## Execution model

For this call:

```javascript
add(4, 5)
```

```text
caller supplies arguments 4, 5
        ↓
parameter bindings a=4, b=5
        ↓
function body executes
        ↓
return value 9
        ↓
caller receives 9
```

Parameters are names in the function definition; arguments are the actual values supplied by a particular call.

## Trace it

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(4, 5));
```

| step | value/effect |
| ---: | --- |
| call `add(4, 5)` | `a = 4`, `b = 5` |
| evaluate `a + b` | `9` |
| `return 9` | function call expression becomes `9` |
| `console.log(...)` | logs `9` |

## Predict before you run

Predict what `console.log` receives, not just what happens inside the function: one Number value `9`.

## Worked example

```javascript
function fullName(first, last) {
  return `${first} ${last}`;
}

const label = fullName("Ada", "Lovelace");
console.log(label);
```

The function computes a value; the caller decides what to do with that returned value.

## Debug this

```javascript
function add(a, b) {
  a + b;
}
console.log(add(4, 5));
```

The expression is evaluated and discarded. Without an explicit return, the function returns `undefined`. Logging and returning are different responsibilities.

## Common mistakes

- Confusing parameter names with the argument values supplied by a call.
- Logging inside a function when callers need a reusable returned value.
- Forgetting `return` and then debugging an unexpected `undefined` at the call site.

## Your turn

Make `add(4, 5)` return `9` so the existing `console.log` prints it.

## Quick check

What is the difference between `return value` and `console.log(value)`?

**Answer:** `return` sends a value back to the caller; `console.log` only produces console output as a side effect.
