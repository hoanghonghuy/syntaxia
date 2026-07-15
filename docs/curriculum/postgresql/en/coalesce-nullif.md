---
id: pg-14-coalesce
track: postgresql
locale: en
slug: coalesce-nullif
title: Filling gaps with COALESCE
order: 14
published: true
objectives:
  - Replace NULL with a fallback using COALESCE
  - Prefer nickname when present, otherwise name
exercise:
  starter: "SELECT name, nickname FROM people;"
  hints:
    - "COALESCE returns the first argument that is not NULL."
    - "Try nickname first, then fall back to name."
    - "Try: SELECT COALESCE(nickname, name) AS label FROM people;"
  solution: "SELECT COALESCE(nickname, name) AS label FROM people;"
  preview:
    columns: ["id", "name", "nickname"]
    rows:
      - [1, "Ana Nguyen", "Ana"]
      - [2, "Ben Tran", null]
      - [3, "Chi Le", "Chi"]
  expected:
    columns: ["label"]
    rows:
      - ["Ana"]
      - ["Ben Tran"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE people (id INTEGER, name TEXT, nickname TEXT);"
    - "INSERT INTO people VALUES (1, 'Ana Nguyen', 'Ana'), (2, 'Ben Tran', NULL), (3, 'Chi Le', 'Chi');"
---

Display names often prefer a short nickname, but some people have none. `COALESCE` walks its arguments left to right and returns the first value that is not `NULL` — like “use this cell, or else that one”.

| id | name | nickname |
| --- | --- | --- |
| 1 | Ana Nguyen | Ana |
| 2 | Ben Tran | *(null)* |
| 3 | Chi Le | Chi |

## Worked example

```sql
SELECT COALESCE(nickname, name) AS label FROM people;
```

- `COALESCE(nickname, name)` uses `nickname` when it exists.
- For Ben, `nickname` is `NULL`, so `name` is used instead.
- `NULLIF(a, b)` is related: it returns `NULL` when `a` equals `b` (useful to turn empty strings into `NULL` before `COALESCE`).

Result:

| label |
| --- |
| Ana |
| Ben Tran |
| Chi |

## Common mistakes

- Putting `name` before `nickname` so the nickname never wins.
- Using `ISNULL` from other databases — PostgreSQL uses `COALESCE`.
- Forgetting an alias when the task expects a column named `label`.

## Your turn

Return a `label` column: each person’s `nickname`, or their `name` when nickname is missing.
