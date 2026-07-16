---
id: js-06-conditionals
track: javascript-basics
locale: en
slug: conditionals
title: Making decisions with if and else
order: 6
published: true
objectives:
  - Run one branch when a test is true
  - Use else for the other path
  - Compare values with ===
exercise:
  starter: |
    const lives = 0;
    // If lives is 0, log "Game over". Otherwise log "Keep playing".
  hints:
    - "When lives is 0, the if test is true."
    - "Only the if block runs — use console.log inside it."
    - 'Print exactly: Game over'
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

Every day you choose: if it is raining, take an umbrella; otherwise walk as usual. A **conditional** lets code make that kind of choice.

| Piece | Plain meaning | Example |
| --- | --- | --- |
| `if (test)` | Run block when test is true | `if (score >= 10)` |
| `else` | Run when test is false | `else { ... }` |
| `===` | Same value and type | `lives === 0` |

Use `===` (three equals) to compare without surprises. It checks value **and** type.

## Worked example

```javascript
const lives = 0;

if (lives === 0) {
  console.log("Game over");
} else {
  console.log("Keep playing");
}

const score = 12;
if (score >= 10) {
  console.log("You passed");
}
```

- When `lives` is `0`, only the `if` block runs.
- The `else` block runs when the `if` test is false.
- A second `if` can stand alone — no `else` required.

## Common mistakes

- Using `=` inside the test — that assigns, it does not compare. Use `===`.
- Using `==` as a beginner — stick to `===` for clear comparisons.
- Forgetting `{ }` around multi-line blocks — braces group the lines that belong to the branch.

## Your turn

With `lives` set to `0`, run the sandbox so the console shows **Game over**. Mark complete when the checker passes.
