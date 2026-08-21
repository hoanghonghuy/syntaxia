---
id: pg-02-null
track: postgresql
locale: en
slug: handling-null
title: NULL and three-valued logic
order: 2
published: true
can_do: "Reason about PostgreSQL NULL as unknown and choose IS NULL / IS NOT NULL instead of ordinary equality"
objectives:
  - Distinguish NULL from zero, empty text, and false
  - Explain why comparisons with NULL become unknown
  - Filter missing values with IS NULL
exercise:
  starter: "SELECT name, email FROM contacts;"
  hints:
    - "Missing email is represented by NULL, not by the text 'NULL'."
    - "Ordinary = comparison does not turn unknown into true. Use IS NULL."
    - "Use: SELECT name FROM contacts WHERE email IS NULL ORDER BY name;"
  solution: "SELECT name FROM contacts WHERE email IS NULL ORDER BY name;"
  preview:
    columns: ["id", "name", "email"]
    rows:
      - [1, "Ana", "ana@example.com"]
      - [2, "Ben", null]
      - [3, "Chi", "chi@example.com"]
      - [4, "Dee", null]
  expected:
    columns: ["name"]
    rows:
      - ["Ben"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE contacts (id INTEGER, name TEXT, email TEXT);"
    - "INSERT INTO contacts VALUES (1, 'Ana', 'ana@example.com'), (2, 'Ben', NULL), (3, 'Chi', 'chi@example.com'), (4, 'Dee', NULL);"
---

SQL `NULL` represents missing or unknown information. That creates a third logical state beyond ordinary true and false.

## Mental model

Compare these values carefully:

| value | meaning |
| --- | --- |
| `0` | known numeric zero |
| `''` | known empty text |
| `FALSE` | known boolean false |
| `NULL` | unknown / missing value |

An expression such as `email = NULL` does not become true for a missing email. The comparison result is unknown, which does not pass a WHERE filter. SQL provides `IS NULL` and `IS NOT NULL` for this question.

## Predict before you run

Ben and Dee have missing emails, so `email IS NULL` should keep exactly those two rows. Ana and Chi have known text values.

## Worked example

```sql
SELECT name
FROM contacts
WHERE email IS NULL
ORDER BY name;
```

| name |
| --- |
| Ben |
| Dee |

## Debug this

```sql
WHERE email = NULL
```

This looks like an equality check, but NULL is not an ordinary value to compare with `=`. Replace the question “equals NULL?” with the predicate “is missing?” → `IS NULL`.

## Common mistakes

- Treating NULL as a special string value.
- Assuming NULL and empty text mean the same thing.
- Using `= NULL` / `<> NULL` instead of null-aware predicates.

## Your turn

Return contact names whose email is missing, ordered by name.

## Quick check

Is `NULL` the same as boolean `FALSE`?

**Answer:** no. NULL represents unknown/missing information; FALSE is a known boolean value.
