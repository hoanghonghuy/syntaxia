---
id: sql-09-schema
track: sql-fundamentals
locale: en
slug: creating-tables
title: Tables and columns
order: 29
published: true
can_do: "Read a CREATE TABLE schema as a data contract and insert values that match its columns and types"
objectives:
  - Read table, column, and type definitions
  - Distinguish schema from the rows stored under that schema
  - Insert a row that satisfies the prepared schema
exercise:
  starter: "SELECT id, name FROM actors;"
  hints:
    - "The actors table already exists; read its schema first, then insert a matching row."
    - "The column order is id INT, name TEXT."
    - "Use: INSERT INTO actors (id, name) VALUES (1, 'DiCaprio');"
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

A table is more than a grid of values. Its **schema** is a contract that says which columns exist and what kind of values belong in each column.

## Mental model

```sql
CREATE TABLE actors (
  id INT,
  name TEXT
);
```

Read this definition before thinking about rows:

| Schema part | Contract |
| --- | --- |
| `actors` | table name |
| `id INT` | `id` accepts whole numbers |
| `name TEXT` | `name` accepts text |

Schema and data are different layers:

| Layer | Example | Changes with |
| --- | --- | --- |
| structure | columns `id`, `name` | `CREATE/ALTER/DROP` |
| data | row `(1, 'DiCaprio')` | `INSERT/UPDATE/DELETE` |

The sandbox has already created the empty table so this exercise can focus on using the contract correctly.

## Predict before you run

If you insert `(1, 'DiCaprio')`, predict the result of `SELECT id, name FROM actors`: one row, with an integer in `id` and text in `name`.

## Worked example

```sql
INSERT INTO actors (id, name)
VALUES (1, 'DiCaprio');
```

| id | name |
| ---: | --- |
| 1 | DiCaprio |

The explicit column list makes the mapping visible and protects you from relying on an assumed physical column order.

## Debug this

```sql
INSERT INTO actors (id, name)
VALUES ('DiCaprio', 1);
```

The values are reversed relative to the schema. Debug inserts by matching each destination column to its value and type before running the statement.

## Common mistakes

- Treating schema and data as the same thing.
- Omitting a column list and then losing track of which value maps to which column.
- Using a text value where the schema expects a number, or vice versa.

## Your turn

Insert actor `id = 1`, `name = 'DiCaprio'`. Before running, map each value to the schema column it satisfies.

## Quick check

Does `INSERT` change the table's schema?

**Answer:** no. It adds data that must conform to the existing schema.
