---
id: sql-36-wildcards
track: sql-fundamentals
locale: en
slug: sql-wildcards
title: Wildcards with % and _
order: 36
published: true
objectives:
  - Use % to match any number of characters
  - Use _ to match exactly one character
  - Combine wildcards inside a LIKE pattern
exercise:
  starter: "SELECT code FROM products;"
  hints:
    - "LIKE with wildcards filters text by pattern, not exact equality."
    - "Underscore _ matches exactly one character — A_C matches ABC but not AC."
    - "Try: SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
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

`LIKE` uses **wildcards** — special characters that stand for “something else” in the text. Think of a spreadsheet filter where you type `A?C` and the `?` means “any one letter”.

| Wildcard | Plain meaning | Example pattern | Matches |
| --- | --- | --- | --- |
| `%` | Any characters (zero or more) | `'In%'` | `In`, `Inception`, `Interstellar` |
| `_` | Exactly **one** character | `'A_C'` | `ABC`, `A1C` — not `AC`, not `AXYC` |

**products** (the full table you will query)

| id | code | name |
| --- | --- | --- |
| 1 | ABC | Alpha |
| 2 | A1C | Beta |
| 3 | AC | Short |
| 4 | AXYC | Long |
| 5 | ZBC | Other |

## Worked example

Find every product whose `code` is exactly three characters: starts with `A`, ends with `C`, and has **one** character in the middle.

```sql
SELECT code
FROM products
WHERE code LIKE 'A_C'
ORDER BY code;
```

- `'A_C'` means: letter `A`, then exactly one character (`_`), then letter `C`.
- `ABC` and `A1C` match.
- `AC` is too short (nothing in the middle).
- `AXYC` has two characters between `A` and `C`, so it does not match.
- `ZBC` does not start with `A`.

Result:

| code |
| --- |
| A1C |
| ABC |

Compare with `%` (any length in the middle):

```sql
SELECT code FROM products WHERE code LIKE 'A%C' ORDER BY code;
```

That pattern would also include `AC` and `AXYC`, because `%` can be empty or many characters.

## Common mistakes

- Mixing up `%` and `_` — `%` is “any length”; `_` is “exactly one”. Learn `_` in depth in the next lesson on wildcards (`sql-wildcards`).
- Expecting `_` to mean “optional” — it always consumes one character.
- Forgetting quotes — patterns are text: `'In%'`, not `In%` without quotes.

## Your turn

List every `code` that matches the pattern `A_C` (A, one character, C). Order by `code`.
