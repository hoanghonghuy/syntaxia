---
id: pg-02-null
track: postgresql
locale: en
slug: handling-null
title: Finding missing values with NULL
order: 2
published: true
objectives:
  - Treat NULL as “unknown / missing”, not as empty text
  - Filter with IS NULL and IS NOT NULL
exercise:
  starter: "SELECT name, email FROM contacts;"
  hints:
    - "Use IS NULL (not = NULL) to find missing values."
    - "Keep only the name column in the result."
    - "Try: SELECT name FROM contacts WHERE email IS NULL;"
  solution: "SELECT name FROM contacts WHERE email IS NULL;"
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

In a contact list, some people may have no email yet. In SQL that empty cell is usually stored as `NULL` — meaning “unknown” or “not provided”, not the same as the text `''`.

| id | name | email |
| --- | --- | --- |
| 1 | Ana | ana@example.com |
| 2 | Ben | *(null)* |
| 3 | Chi | chi@example.com |
| 4 | Dee | *(null)* |

## Worked example

```sql
SELECT name FROM contacts WHERE email IS NULL;
```

- `IS NULL` keeps rows where the column has no value.
- `IS NOT NULL` keeps rows that do have a value.
- Writing `email = NULL` does **not** work the way beginners expect — use `IS NULL`.

Result:

| name |
| --- |
| Ben |
| Dee |

## Common mistakes

- Using `= NULL` or `!= NULL` — comparisons with `NULL` need `IS NULL` / `IS NOT NULL`.
- Confusing `NULL` with an empty string `''`.
- Selecting every column when the task asks only for `name`.

## Your turn

List the `name` of every contact whose `email` is missing.
