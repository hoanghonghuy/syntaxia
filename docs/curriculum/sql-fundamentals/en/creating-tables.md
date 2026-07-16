---
id: sql-09-schema
track: sql-fundamentals
locale: en
slug: creating-tables
title: Tables and columns
order: 29
published: true
objectives:
  - Understand CREATE TABLE column definitions
  - Match INSERT column lists to typed columns
  - Insert into a prepared empty table
exercise:
  starter: "SELECT id, name FROM actors;"
  hints:
    - "The empty actors table already exists — you only need to INSERT."
    - "List columns (id, name) then VALUES with matching types."
    - "Try: INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
  solution: "INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
  preview:
    columns: ["id", "name"]
    rows: []
  expected:
    columns: ["id", "name"]
    rows:
      - [1, "DiCaprio"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, name FROM actors ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE actors (id INT, name TEXT);"
---

A table is a named grid with typed columns — the “header row” of your spreadsheet, defined once.

```sql
CREATE TABLE actors (
  id INT,
  name TEXT
);
```

| Part | Meaning |
| --- | --- |
| `actors` | table name |
| `id INT` | whole-number column |
| `name TEXT` | text column |

In this sandbox the empty `actors` table is already created for you (same shape). Your job is to add the first row with `INSERT`.

**actors** (before your insert)

| id | name |
| --- | --- |
|  |  |

**actors** (after a successful insert)

| id | name |
| --- | --- |
| 1 | DiCaprio |

## Worked example

```sql
INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');
```

- You do not need to run `CREATE TABLE` here — it is already done.
- `(id, name)` lists the columns you fill.
- `VALUES (1, 'DiCaprio')` fills `id` then `name` in that order.
- Text values use **single** quotes.

## Common mistakes

- Trying to `CREATE TABLE actors` again — the table already exists in the sandbox.
- Using double quotes around the name (`"DiCaprio"`) instead of single quotes.
- Inserting into the wrong table name (`movies` instead of `actors`).
- Wanting UNIQUE / CHECK / DEFAULT on columns — see the later lesson `table-constraints`.

## Your turn

Insert `(1, 'DiCaprio')` into `actors`.
