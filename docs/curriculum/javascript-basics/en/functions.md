---
id: js-08-functions
track: javascript-basics
locale: en
slug: functions
title: Reusable blocks with functions
order: 8
published: true
objectives:
  - Define a function with function and a name
  - Pass values in as parameters
  - Call a function and use its return value
exercise:
  starter: |
    function add(a, b) {
      // return the sum of a and b
    }
    console.log(add(4, 5));
  hints:
    - "Call add with 4 and 5."
    - "console.log prints to the output panel."
    - "The expected line is just the number 9."
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

A recipe card holds steps you can follow anytime without rewriting them. A **function** is a named, reusable block of code. You **call** it when you need the job done.

| Piece | Plain meaning | Example |
| --- | --- | --- |
| `function name()` | Define the block | `function greet() { ... }` |
| Parameters | Inputs the caller passes | `function add(a, b)` |
| `return` | Send a result back | `return a + b` |
| Call | Run the function | `greet()` or `add(2, 3)` |

## Worked example

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

function add(a, b) {
  return a + b;
}

console.log(greet("Sam"));
const sum = add(4, 5);
console.log(sum);
```

- `greet` takes one parameter `name` and returns a string.
- `add` takes two numbers and returns their sum.
- `greet("Sam")` runs the function once and uses the returned text.
- `add(4, 5)` returns `9`, stored in `sum`.

## Common mistakes

- Calling a function before it is defined — in small scripts, define functions above the calls (or use consistent order).
- Forgetting `return` — the function runs but gives back `undefined` when you expected a value.
- Mixing up parameters and arguments — parameters are names in the definition; arguments are the values you pass in the call.

## Your turn

Run the sandbox: `add(4, 5)` should print **9** to the console. When the checker passes, mark complete — you have finished the JavaScript Basics readings.
