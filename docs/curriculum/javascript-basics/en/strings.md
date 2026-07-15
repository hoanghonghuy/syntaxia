---
id: js-03-strings
track: javascript-basics
locale: en
slug: strings
title: Creating and joining text
order: 3
published: true
objectives:
  - Store text in a string with quotes
  - Join two strings with +
  - Tell text apart from numbers
---

Words on a page are **text**. In JavaScript, a piece of text is called a **string**. You wrap it in quotes so the computer knows it is words, not a command name.

| Style | Example | Plain meaning |
| --- | --- | --- |
| Double quotes | `"Hello"` | Text inside `"..."` |
| Single quotes | `'Hello'` | Same idea with `'...'` |

Pick one style and stay consistent in a small script. Both work the same for beginners.

## Worked example

```javascript
const greeting = "Hello";
const name = "Sam";
const message = greeting + ", " + name + "!";

console.log(message);
console.log("Score: " + 10);
```

- `"Hello"` and `"Sam"` are strings — quoted text.
- `+` between strings **joins** them into one longer string.
- `"Score: " + 10` joins text with a number; JavaScript turns `10` into text for the join.

## Common mistakes

- Forgetting quotes — `Hello` without quotes is treated as a label, not text, and causes an error.
- Using smart quotes from a word processor (`“Hello”`) — use straight `"` or `'` on the keyboard.
- Expecting `+` to always add numbers — `"2" + 3` becomes `"23"` because one side is text.

## Your turn

In the worked example, what full text does `message` hold after the joins? Read it aloud once, then mark this lesson complete.
