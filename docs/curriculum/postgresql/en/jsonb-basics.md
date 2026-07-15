---
id: pg-12-jsonb
track: postgresql
locale: en
slug: jsonb-basics
title: Reading JSONB fields
order: 12
published: true
objectives:
  - Store structured data in a JSONB column
  - Extract a text field with ->>
exercise:
  starter: "SELECT data FROM profiles;"
  hints:
    - "->> reads a JSON key and returns plain text."
    - "Select the name field from the data column."
    - "Try: SELECT data->>'name' AS name FROM profiles;"
  solution: "SELECT data->>'name' AS name FROM profiles;"
  preview:
    columns: ["id", "data"]
    rows:
      - [1, "{\"name\": \"Ana\", \"city\": \"Hanoi\"}"]
      - [2, "{\"name\": \"Ben\", \"city\": \"Hue\"}"]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Ben"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE profiles (id INTEGER, data JSONB);"
    - "INSERT INTO profiles VALUES (1, '{\"name\": \"Ana\", \"city\": \"Hanoi\"}'::jsonb), (2, '{\"name\": \"Ben\", \"city\": \"Hue\"}'::jsonb);"
---

Sometimes one cell holds a small nested document — name, city, and more — instead of many separate columns. PostgreSQL’s `JSONB` type stores that JSON in a binary form that is efficient to query. The operator `->>` pulls out a key as plain text.

| id | data |
| --- | --- |
| 1 | `{"name": "Ana", "city": "Hanoi"}` |
| 2 | `{"name": "Ben", "city": "Hue"}` |

## Worked example

```sql
SELECT data->>'name' AS name FROM profiles;
```

- `data` is a `JSONB` column.
- `->>'name'` reads the `name` key and returns text (not nested JSON).
- `->` (one arrow) would return JSON; `->>` returns text — prefer `->>` when you want a normal string column.

Result:

| name |
| --- |
| Ana |
| Ben |

## Common mistakes

- Using `->` when you need a text result for grading or display.
- Misspelling the JSON key (`'Name'` vs `'name'`).
- Treating `data` like a normal `TEXT` column with `LIKE` instead of JSON operators.

## Your turn

Return each profile’s `name` from the `data` JSONB column (alias the column `name`).
