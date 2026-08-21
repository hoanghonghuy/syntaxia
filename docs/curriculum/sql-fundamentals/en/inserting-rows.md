---
id: sql-06-insert
track: sql-fundamentals
locale: en
slug: inserting-rows
title: Adding rows with INSERT
order: 9
published: true
can_do: "Insert one new row by mapping a column list to matching VALUES and verify the resulting table state"
objectives:
  - Distinguish reading data from changing stored state
  - Map INSERT columns to VALUES by position
  - Verify the table after a mutation
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "The table needs one additional row, so use INSERT rather than SELECT."
    - "List id, title, year and provide exactly one value for each column in the same order."
    - "Use: INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  solution: "INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Until now, the query result changed while the stored table stayed the same. `INSERT` is different: it changes table state by adding a new row.

## Mental model

Treat an INSERT as a mapping from **named columns** to **new values**.

**Before**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

The target row is:

| id | title | year |
| --- | --- | --- |
| 3 | Dune | 2021 |

The column list and value list line up by position:

| Position | Column | Value |
| ---: | --- | --- |
| 1 | `id` | `3` |
| 2 | `title` | `'Dune'` |
| 3 | `year` | `2021` |

## Predict before you run

```sql
INSERT INTO movies (id, title, year)
VALUES (3, 'Dune', 2021);
```

Predict the state transition:

- row count: **2 -> 3**
- existing rows: unchanged
- new row: `(3, 'Dune', 2021)`

An INSERT does not need to return the whole table for the change to exist. The sandbox verifies the new state with a separate SELECT.

## Worked example

```sql
INSERT INTO movies (id, title, year)
VALUES (3, 'Dune', 2021);
```

**After**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Dune | 2021 |

The checker runs `SELECT id, title, year FROM movies ORDER BY id;` after your statement. This is an important database habit: **mutate, then verify the resulting state**.

## Debug this

What is wrong here?

```sql
INSERT INTO movies (id, title, year)
VALUES ('Dune', 3, 2021);
```

The values are matched to columns by position. This attempt tries to put `'Dune'` into `id` and `3` into `title`. Keep the column/value mapping aligned.

## Common mistakes

- Using double quotes for text values; SQL string literals use single quotes such as `'Dune'`.
- Supplying values in an order that does not match the explicit column list.
- Running only a SELECT and expecting it to add stored data.

## Your turn

Insert `id = 3`, `title = 'Dune'`, `year = 2021`. Before running, trace the three column/value pairs and predict the final row count.

## Quick check

What is the simplest way to confirm an INSERT produced the intended state?

**Answer:** run a SELECT that reads the affected rows/table after the mutation. The sandbox's verifier does this automatically.
