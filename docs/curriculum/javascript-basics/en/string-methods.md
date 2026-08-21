---
id: js-04-string-methods
track: javascript-basics
locale: en
slug: string-methods
title: Inspecting and transforming strings
order: 4
published: true
can_do: "Trace string indexing and immutable string transformations to predict method results without mutating the original string"
objectives:
  - Read zero-based character positions and length
  - Use slice with an exclusive end index
  - Explain why string methods return new strings
exercise:
  starter: |
    const code = "Syntaxia";
    // TODO: return the first three characters using slice
  hints:
    - "String indexes start at 0."
    - "slice(start, end) excludes the end position."
    - "Use: return code.slice(0, 3);"
  solution: |
    const code = "Syntaxia";
    return code.slice(0, 3);
  expected:
    type: returnValue
    value: "Syn"
---

Strings expose properties and methods for inspecting or deriving text. String values themselves are immutable: transformation methods produce new string values.

## Execution model

For `"Syntaxia"`:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| char | S | y | n | t | a | x | i | a |

`.length` is 8. `slice(0, 3)` starts at index 0 and stops **before** index 3, giving `"Syn"`.

## Trace it

```javascript
const code = "Syntaxia";
const short = code.slice(0, 3);
const upper = code.toUpperCase();
```

| binding | value |
| --- | --- |
| `code` | `"Syntaxia"` |
| `short` | `"Syn"` |
| `upper` | `"SYNTAXIA"` |

`code` itself still holds the original value.

## Predict before you run

Mark indexes 0, 1, 2 as included and index 3 as excluded. Predict `"Syn"`.

## Worked example

```javascript
const raw = "  Hello  ";
const cleaned = raw.trim().toLowerCase();
console.log(cleaned); // hello
```

Methods can be chained because each returns a value the next method can operate on.

## Debug this

```javascript
const code = "Syntaxia";
code.toUpperCase();
return code;
```

This returns `"Syntaxia"`, not uppercase text. The method returned a new string but its result was ignored.

## Common mistakes

- Off-by-one errors with zero-based indexes and exclusive slice end.
- Forgetting `()` when calling a method such as `toUpperCase()`.
- Assuming string methods mutate the original string.

## Your turn

Return the first three characters of `code` using `slice`.

## Quick check

Does `code.toUpperCase()` mutate the string stored in `code`?

**Answer:** no. It returns a new uppercase string value; the original string remains unchanged.
