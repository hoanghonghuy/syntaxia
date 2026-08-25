---
id: sql-30-alter
track: sql-fundamentals
locale: en
slug: alter-table
title: Changing a table with ALTER TABLE
order: 30
published: true
can_do: "Evolve an existing table schema with ALTER TABLE while predicting the new structure"
objectives:
  - Distinguish schema evolution from row mutation
  - Add a typed column with ALTER TABLE
  - Verify the resulting table structure
exercise:
  starter: "ALTER TABLE movies ADD COLUMN "
  hints:
    - "The table already exists; change its schema rather than recreating it."
    - "ADD COLUMN needs both the column name and its type."
    - "Use: ALTER TABLE movies ADD COLUMN year INT;"
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

Applications evolve, so schemas do too. `ALTER TABLE` changes the contract of a table that already exists without pretending it is a brand-new table.

## Mental model

Before:

| column | type |
| --- | --- |
| id | INT |
| title | TEXT |

Transformation:

```text
existing schema + ADD COLUMN year INT -> evolved schema
```

After:

| column | type |
| --- | --- |
| id | INT |
| title | TEXT |
| year | INT |

On a table that already has rows, a newly added nullable column begins as `NULL` for those rows until values are supplied.

## Predict before you run

`ALTER TABLE movies ADD COLUMN year INT;` should change **structure**, not add or remove movie rows. The verifier asks the database catalog whether exactly one `year` column exists.

## Worked example

```sql
ALTER TABLE movies
ADD COLUMN year INT;
```

The command names the existing table, the structural operation, the new column, and its type.

## Debug this

```sql
CREATE TABLE movies (year INT);
```

This is not “add a column”. It attempts to create another table named `movies` and conflicts with the existing table. Use `ALTER TABLE` when the object already exists and its schema must evolve.

## Common mistakes

- Recreating an existing table instead of altering it.
- Omitting the type of the new column.
- Confusing a schema change with an `UPDATE` of row values.

## Your turn

Add an integer column named `year` to `movies`. Predict the column list after the change before running it.

## Quick check

Which changes structure: `UPDATE movies SET ...` or `ALTER TABLE movies ...`?

**Answer:** `ALTER TABLE` changes structure; `UPDATE` changes values in existing rows.
