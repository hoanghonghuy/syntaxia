---
id: sql-30-alter
track: sql-fundamentals
locale: en
slug: alter-table
title: Changing a table with ALTER TABLE
order: 30
published: true
objectives:
  - Add a column with ALTER TABLE … ADD COLUMN
  - Choose a type for the new column
  - Confirm the new column exists on the table
exercise:
  starter: "ALTER TABLE movies ADD COLUMN "
  hints:
    - "ALTER TABLE changes an existing table without rebuilding it."
    - "ADD COLUMN names the new column and its type."
    - "Try: ALTER TABLE movies ADD COLUMN year INT;"
  solution: "ALTER TABLE movies ADD COLUMN year INT;"
  preview:
    columns: ["id", "title"]
    rows: []
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM information_schema.columns WHERE table_name = 'movies' AND column_name = 'year';"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT);"
---

Tables change over time. `ALTER TABLE` adds (or adjusts) columns on a table that already exists — like inserting a new header into a spreadsheet without starting over.

**movies** (starting shape)

| id | title |
| --- | --- |
|  |  |

| Step | Shape |
| --- | --- |
| Before | `id`, `title` |
| After `ADD COLUMN year INT` | `id`, `title`, `year` |

Existing rows would get `NULL` in `year` until you fill them. This sandbox starts empty and checks that the column named `year` exists.

## Worked example

```sql
ALTER TABLE movies ADD COLUMN year INT;
```

- `ALTER TABLE movies` names the table to change.
- `ADD COLUMN year INT` creates a new column called `year` that holds whole numbers.
- You are not rebuilding the table with `CREATE TABLE` — you are extending it.

## Common mistakes

- Writing `CREATE TABLE` again instead of `ALTER TABLE` — the table already exists.
- Forgetting the type (`ADD COLUMN year` without `INT`).
- Using the wrong table name (`actors` instead of `movies`).

## Your turn

Add an integer column named `year` to `movies`.
