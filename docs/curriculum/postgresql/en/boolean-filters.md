---
id: pg-04-boolean
track: postgresql
locale: en
slug: boolean-filters
title: Filtering with BOOLEAN columns
order: 4
published: true
objectives:
  - Use a BOOLEAN column in WHERE
  - Compare with true / false without quotes
exercise:
  starter: "SELECT name, active FROM members;"
  hints:
    - "Keep only rows where active is true."
    - "Compare the BOOLEAN column to true — no quotes around true."
    - "Try: SELECT name FROM members WHERE active = true;"
  solution: "SELECT name FROM members WHERE active = true;"
  preview:
    columns: ["id", "name", "active"]
    rows:
      - [1, "Ana", true]
      - [2, "Ben", false]
      - [3, "Chi", true]
      - [4, "Dee", false]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE members (id INTEGER, name TEXT, active BOOLEAN);"
    - "INSERT INTO members VALUES (1, 'Ana', true), (2, 'Ben', false), (3, 'Chi', true), (4, 'Dee', false);"
---

A membership list often has a yes/no column: still active, or not. In PostgreSQL that column type is `BOOLEAN`, and you filter it with `WHERE` just like other columns — but you compare to `true` or `false`, not to text.

| id | name | active |
| --- | --- | --- |
| 1 | Ana | true |
| 2 | Ben | false |
| 3 | Chi | true |
| 4 | Dee | false |

## Worked example

```sql
SELECT name FROM members WHERE active = true;
```

- `active` is a `BOOLEAN` column.
- `= true` keeps only active members.
- Ben and Dee are dropped because `active` is `false`.

Result:

| name |
| --- |
| Ana |
| Chi |

You can also write `WHERE active` (same meaning as `= true`) or `WHERE NOT active` for inactive rows. Prefer the explicit form while learning.

## Common mistakes

- Writing `'true'` in quotes — that is text, not a boolean.
- Using `1` / `0` as if this were another database dialect.
- Selecting every column when the task asks only for `name`.

## Your turn

Return the `name` of every member who is currently active.
