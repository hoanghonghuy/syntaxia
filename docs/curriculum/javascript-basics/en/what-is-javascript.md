---
id: js-00-intro
track: javascript-basics
locale: en
slug: what-is-javascript
title: What is JavaScript?
order: 0
published: true
can_do: "Trace a tiny JavaScript program from values to variables to observable output"
objectives:
  - Distinguish JavaScript behavior from HTML structure and CSS presentation
  - Trace statements in execution order
  - Produce observable output with console.log
exercise:
  starter: |
    const name = "Ada";
    // TODO: log exactly: Hello, Ada
  hints:
    - "The value Ada is already stored in name; your job is to produce output."
    - "Use console.log(...) and a template literal with ${name}."
    - "Use: console.log(`Hello, ${name}`);"
  solution: |
    const name = "Ada";
    console.log(`Hello, ${name}`);
  expected:
    type: console
    lines:
      - "Hello, Ada"
---

JavaScript is the programming language that adds behavior and logic to web experiences. The same language also runs outside a web page in environments such as servers and tooling; what APIs are available depends on the runtime.

## Execution model

For now, read a small script as a sequence of instructions:

```text
source code -> evaluate statement 1 -> update program state -> evaluate statement 2 -> observable result
```

Three building blocks:

| idea | example | role |
| --- | --- | --- |
| value | `"Ada"`, `42`, `true` | information |
| binding | `const name = "Ada"` | gives a value a name |
| statement | `console.log(name)` | performs an instruction |

HTML describes page structure; CSS describes presentation; JavaScript evaluates logic and can react to changing state/events.

## Trace it

```javascript
const name = "Ada";
console.log(`Hello, ${name}`);
```

| step | state / effect |
| ---: | --- |
| 1 | binding `name` now refers to string `"Ada"` |
| 2 | template literal reads `name` and creates `"Hello, Ada"` |
| 3 | `console.log` exposes that string in the console output |

## Predict before you run

Before pressing Run, write the exact console line including comma and space: `Hello, Ada`.

## Worked example

```javascript
const language = "JavaScript";
const message = `Learning ${language}`;
console.log(message);
```

The program creates values first, derives a new value, then performs an observable side effect by logging it.

## Debug this

```javascript
const name = Ada;
console.log(`Hello, ${name}`);
```

`Ada` without quotes is treated as an identifier. If no binding named `Ada` exists, execution fails with a reference error before the log can succeed. Debug by asking whether each token is intended to be **data** or an **identifier**.

## Common mistakes

- Thinking JavaScript, HTML, and CSS have the same responsibility.
- Reading only the final line instead of tracing how values reached it.
- Removing quotes from string data and accidentally turning it into an identifier lookup.

## Your turn

Complete the sandbox so it logs exactly `Hello, Ada` using the existing `name` binding.

## Quick check

What is the main difference between a value like `"Ada"` and an identifier like `name`?

**Answer:** the value is the data itself; the identifier is a name the program uses to refer to a value.
