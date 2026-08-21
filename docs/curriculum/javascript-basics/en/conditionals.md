---
id: js-06-conditionals
track: javascript-basics
locale: en
slug: conditionals
title: Branching with if and else
order: 6
published: true
can_do: "Trace a boolean condition into exactly one branch and use strict equality to avoid unintended coercion"
objectives:
  - Evaluate a condition before choosing a branch
  - Use strict equality for explicit type-aware comparison
  - Distinguish assignment from comparison
exercise:
  starter: |
    const lives = 0;
    // TODO: if lives is 0 log "Game over", otherwise log "Keep playing"
  hints:
    - "Evaluate lives === 0 first; with lives equal to number 0, it is true."
    - "Only the matching branch should log a line."
    - "Use an if/else with lives === 0 and console.log('Game over') in the true branch."
  solution: |
    const lives = 0;
    if (lives === 0) {
      console.log("Game over");
    } else {
      console.log("Keep playing");
    }
  expected:
    type: console
    lines:
      - "Game over"
---

A conditional turns a boolean decision into control flow. The useful skill is not memorizing braces; it is predicting **which path executes and why**.

## Execution model

```text
evaluate condition
    |
    +-- true  -> execute if block
    |
    +-- false -> execute else block
```

For equality, `===` compares without performing the type coercion associated with `==`.

## Trace it

```javascript
const lives = 0;
if (lives === 0) {
  console.log("Game over");
} else {
  console.log("Keep playing");
}
```

| step | result |
| ---: | --- |
| read `lives` | number `0` |
| evaluate `lives === 0` | `true` |
| run `if` block | logs `Game over` |
| `else` block | skipped |

## Predict before you run

Predict exactly one console line: `Game over`. Both branches never run for a single if/else evaluation.

## Worked example

```javascript
const age = 20;

if (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}
```

The comparison creates a boolean; the boolean controls the branch.

## Debug this

```javascript
let lives = 3;
if (lives = 0) {
  console.log("Game over");
}
```

`=` assigns a new value; it does not compare. The assignment expression evaluates to `0`, which is falsy, so the branch is skipped—and `lives` has also been changed. This is a state bug and a control-flow bug at once.

## Common mistakes

- Writing assignment `=` when the intention is comparison.
- Using coercive `==` without understanding the conversions it permits.
- Reading the code as if both branches execute instead of tracing the condition first.

## Your turn

Complete the if/else so `lives = 0` produces exactly `Game over`.

## Quick check

What is the key difference between `=` and `===`?

**Answer:** `=` assigns a value; `===` compares value and type without coercive equality conversion.
