---
id: js-00-intro
track: javascript-basics
locale: en
slug: what-is-javascript
title: What is JavaScript?
order: 0
published: true
objectives:
  - Explain JavaScript in everyday words
  - See how a short script stores a value and shows a message
  - Run a first console.log in the JS sandbox
exercise:
  starter: |
    let name = "Ada";
    // Log a greeting: Hello, Ada
  hints:
    - "Use console.log to print a message."
    - "Join text with + between quoted strings and the name variable."
    - 'The line should read Hello, Ada (with a comma after Hello).'
  solution: |
    let name = "Ada";
    console.log("Hello, " + name);
  expected:
    type: console
    lines:
      - "Hello, Ada"
---

A web page can show text and pictures on its own. **JavaScript** is the language that makes a page *do* things — remember a name, calculate a total, or change what you see after you click.

You do not need to be a programmer to start. Think of JavaScript as a short set of instructions the browser follows, one step at a time.

Here is a tiny “sticky note” of ideas we will use:

| Idea | Plain meaning | Example |
| --- | --- | --- |
| Value | A piece of information | `"Ada"`, `3` |
| Variable | A labeled box that holds a value | `name` |
| Statement | One instruction, usually ending with `;` | `let name = "Ada";` |

## Worked example

```javascript
let name = "Ada";
console.log("Hello, " + name);
```

- `let name = "Ada";` creates a labeled box called `name` and puts the text Ada inside.
- `console.log(...)` asks the browser tools to show a message (a common way to check your work while learning).
- `"Hello, " + name` joins two pieces of text into one sentence.

If you ran this in a browser console, you would see: `Hello, Ada`.

## Common mistakes

- Thinking JavaScript is the same as HTML or CSS — HTML structures the page, CSS styles it, JavaScript adds behavior.
- Forgetting quotes around text (`Ada` vs `"Ada"`) — without quotes, the browser looks for a name that does not exist.
- Expecting Syntaxia to run JS in the SQL sandbox — that runner is for SQL only; use the **JavaScript sandbox** below on this track.

## Your turn

Run the sandbox: print `Hello, Ada` using `console.log` and the `name` variable. When the checker passes, mark this lesson complete.
