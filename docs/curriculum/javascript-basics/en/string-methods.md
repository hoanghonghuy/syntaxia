---
id: js-04-string-methods
track: javascript-basics
locale: en
slug: string-methods
title: Useful string methods
order: 4
published: true
objectives:
  - Read a string's length
  - Change case with toUpperCase and toLowerCase
  - Take a slice of text with slice
exercise:
  starter: |
    const code = "Syntaxia";
    // return the first three letters using slice
  hints:
    - "slice(start, end) takes from start up to (not including) end."
    - "Start at index 0; end before index 3."
    - 'The answer is three letters: Syn.'
  solution: |
    const code = "Syntaxia";
    return code.slice(0, 3);
  expected:
    type: returnValue
    value: "Syn"
---

A string is more than a label on a box — it is text you can **inspect** and **reshape** a little. JavaScript gives each string small built-in tools called **methods**. You call them with a dot after the string (or a variable holding text).

| Method / property | Plain meaning | Example |
| --- | --- | --- |
| `.length` | How many characters | `"hi".length` → `2` |
| `.toUpperCase()` | ALL CAPS copy | `"hi".toUpperCase()` → `"HI"` |
| `.toLowerCase()` | all lowercase copy | `"HI".toLowerCase()` → `"hi"` |
| `.slice(start)` | Substring from an index | `"hello".slice(1)` → `"ello"` |

Indexes start at **0** — the first letter is position 0.

## Worked example

```javascript
const code = "Syntaxia";
const short = code.slice(0, 3);

console.log(code.length);
console.log(code.toLowerCase());
console.log(short);
```

- `.length` counts every character in `code` → `8`.
- `.toLowerCase()` returns a new lowercase string; `code` itself stays the same.
- `.slice(0, 3)` takes characters from index 0 up to (but not including) 3 → `"Syn"`.

## Common mistakes

- Forgetting parentheses on methods — `code.toUpperCase` without `()` does not run the tool.
- Thinking methods change the original string — they return a **new** string; store it if you need it.
- Off-by-one on slice — index `3` is the **fourth** character; slice end is exclusive.

## Your turn

Return `code.slice(0, 3)` for `"Syntaxia"` in the sandbox. Mark complete when you get **Syn**.
