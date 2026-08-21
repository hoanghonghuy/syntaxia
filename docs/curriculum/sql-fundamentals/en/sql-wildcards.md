---
id: sql-36-wildcards
track: sql-fundamentals
locale: en
slug: sql-wildcards
title: Wildcards with % and _
order: 36
published: true
can_do: "Translate text-shape requirements into LIKE patterns using % for variable length and _ for exactly one character"
objectives:
  - Distinguish % from _ by how many characters they consume
  - Trace a LIKE pattern against candidate strings
  - Build a pattern from a text-shape requirement
exercise:
  starter: "SELECT code FROM products;"
  hints:
    - "The required shape is A + exactly one character + C."
    - "Use _ for exactly one character; % would allow zero or many."
    - "Use: SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  solution: "SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  preview:
    columns: ["code"]
    rows:
      - ["ABC"]
      - ["A1C"]
      - ["AC"]
      - ["AXYC"]
  expected:
    columns: ["code"]
    rows:
      - ["A1C"]
      - ["ABC"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE products (id INT, code TEXT, name TEXT);"
    - "INSERT INTO products VALUES (1, 'ABC', 'Alpha'), (2, 'A1C', 'Beta'), (3, 'AC', 'Short'), (4, 'AXYC', 'Long'), (5, 'ZBC', 'Other');"
---

Wildcards let a `LIKE` predicate describe the **shape** of text instead of one exact string. The key is to reason about how many characters each wildcard can consume.

## Mental model

| wildcard | consumes | pattern example | meaning |
| --- | --- | --- | --- |
| `%` | zero or more characters | `'A%C'` | starts A, ends C, middle can have any length |
| `_` | exactly one character | `'A_C'` | A, one middle character, C |

Trace the exercise candidates:

| code | `LIKE 'A_C'` | why |
| --- | --- | --- |
| ABC | true | B fills `_` |
| A1C | true | 1 fills `_` |
| AC | false | no character for `_` |
| AXYC | false | two middle characters |
| ZBC | false | wrong first character |

## Predict before you run

Before executing anything, predict exactly two rows for `'A_C'`: `A1C` and `ABC`. Then compare with `'A%C'`, which would also match `AC` and `AXYC`.

## Worked example

```sql
SELECT code
FROM products
WHERE code LIKE 'A_C'
ORDER BY code;
```

| code |
| --- |
| A1C |
| ABC |

The pattern is data: keep it quoted like any other text literal.

## Debug this

The requirement says “exactly one character between A and C”, but this query uses:

```sql
WHERE code LIKE 'A%C'
```

It is too permissive because `%` can consume zero, one, or many characters. Debug wildcard queries by testing strings that are deliberately too short and too long.

## Common mistakes

- Swapping `%` and `_` semantics.
- Forgetting that `_` is mandatory exactly once, not optional.
- Testing only a string that should pass and missing false positives at the boundaries.

## Your turn

List every code matching `A_C`, ordered by code. Classify all five source codes before running the query.

## Quick check

Which wildcard should you use for “any suffix, including an empty suffix”?

**Answer:** `%`, because it can match zero or more characters.
