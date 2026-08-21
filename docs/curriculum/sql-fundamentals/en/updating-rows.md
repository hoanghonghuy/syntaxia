---
id: sql-07-update
track: sql-fundamentals
locale: en
slug: updating-rows
title: Changing rows with UPDATE
order: 10
published: true
can_do: "Update only intended rows by combining SET with a precise WHERE predicate and verify the after-state"
objectives:
  - Distinguish the new value in SET from the target rows in WHERE
  - Predict the blast radius of an UPDATE before running it
  - Verify the table after an UPDATE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "The row already exists, so use UPDATE rather than INSERT."
    - "SET defines the new year; WHERE must identify only the Interstellar row."
    - "Use: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2010, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
      - [3, "The Matrix", 1999]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2010, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski');"
---

`UPDATE` changes values in rows that already exist. The dangerous part is not usually `SET`; it is choosing the wrong set of rows to update.

## Mental model

An UPDATE has two independent questions:

| Question | Clause |
| --- | --- |
| What new value should be written? | `SET` |
| Which existing rows are allowed to change? | `WHERE` |

**Before**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | Interstellar | 2010 | Nolan |
| 3 | The Matrix | 1999 | Wachowski |

Only Interstellar is wrong. The intended state change is one cell: its year becomes 2014.

## Predict before you run

Compare these statements:

```sql
UPDATE movies SET year = 2014;
```

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

The first matches **every row**, so all three years would become 2014. The second should match exactly one row. Before an UPDATE, always predict the number of rows that the predicate is supposed to affect.

## Worked example

```sql
UPDATE movies
SET year = 2014
WHERE title = 'Interstellar';
```

**After**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Interstellar | 2014 |
| 3 | The Matrix | 1999 |

`SET` describes the change. `WHERE` defines its blast radius. The sandbox then runs a verification SELECT so the mutation is graded by resulting state rather than by matching your SQL text.

## Debug this

The intent is to fix Interstellar only:

```sql
UPDATE movies
SET year = 2014
WHERE director = 'Nolan';
```

This is valid SQL but wrong logic. Both Inception and Interstellar are directed by Nolan, so the predicate is too broad. A syntactically valid UPDATE can still damage the wrong rows.

## Common mistakes

- Omitting `WHERE` and updating every row.
- Choosing a predicate that matches more rows than intended.
- Using INSERT when the target row already exists instead of changing that row with UPDATE.

## Your turn

Set Interstellar's `year` to `2014`. Before pressing Run, inspect the table and confirm your WHERE condition should match exactly one row.

## Quick check

In an UPDATE, which clause controls the **new value**, and which clause controls the **affected rows**?

**Answer:** `SET` controls the new value; `WHERE` controls which rows are affected.
