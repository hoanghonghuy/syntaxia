---
id: js-01-variables
track: javascript-basics
locale: en
slug: variables
title: Storing values with variables
order: 1
published: true
objectives:
  - Create a variable with let or const
  - Update a let variable and read its value
  - Prefer const when the value should not change
exercise:
  starter: |
    let name = "Syntaxia";
    // return how many characters are in name
  hints:
    - "Strings have a .length property."
    - "Use return at the end with name.length."
    - "The answer is a number, not text."
  solution: |
    let name = "Syntaxia";
    return name.length;
  expected:
    type: returnValue
    value: 8
---

In everyday life you put a sticky note on a box: “apples = 4”. Later you can change the number or read it again. In JavaScript, that labeled box is a **variable**.

Two common ways to create one:

| Keyword | Plain meaning | When to use |
| --- | --- | --- |
| `let` | A box you may refill | Values that can change |
| `const` | A box you fill once | Values that should stay fixed |

## Worked example

```javascript
let score = 0;
score = 10;

const player = "Sam";
console.log(player + " scored " + score);
```

- `let score = 0;` creates `score` and puts `0` inside.
- `score = 10;` replaces the contents with `10` (allowed with `let`).
- `const player = "Sam";` creates `player` and locks that text in place.
- The last line builds a short message from both values.

## Common mistakes

- Using a name before creating it — declare with `let` or `const` first.
- Trying to reassign a `const` (`player = "Alex"`) — that causes an error; use `let` if you need to change it.
- Mixing up the label and the value — `score` is the name; `10` is what is stored.

## Your turn

Use the sandbox below: return the length of the string `"Syntaxia"`. When the checker says **Correct**, mark this lesson complete.
