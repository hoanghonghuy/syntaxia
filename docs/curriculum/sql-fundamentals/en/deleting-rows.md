---
id: sql-08-delete
track: sql-fundamentals
locale: en
slug: deleting-rows
title: Removing rows with DELETE
order: 11
published: true
can_do: "Delete only rows that match an intended predicate and verify which rows remain"
objectives:
  - Distinguish deleting rows from updating values
  - Predict which rows a DELETE predicate will remove
  - Protect unrelated rows with a precise WHERE clause
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "DELETE removes complete rows; use FROM movies to name the target table."
    - "Translate 'before 2000' into a WHERE condition on year using <."
    - "Use: DELETE FROM movies WHERE year < 2000;"
  solution: "DELETE FROM movies WHERE year < 2000;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Old Cut", 1985, "Unknown"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Old Cut', 1985, 'Unknown');"
---

`DELETE` removes complete rows from stored state. As with UPDATE, the central safety question is not “does this SQL run?” but “exactly which rows does its predicate target?”.

## Mental model

A DELETE has two parts:

- `DELETE FROM movies` chooses the table whose rows may be removed.
- `WHERE ...` chooses the subset of rows that actually disappear.

**Before**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Old Cut | 1985 | Unknown |

For the requirement “remove movies released before 2000”, evaluate `year < 2000` against every row.

| title | `year < 2000` | Action |
| --- | --- | --- |
| Inception | false | keep |
| The Matrix | true | delete |
| Dune | false | keep |
| Old Cut | true | delete |

## Predict before you run

```sql
DELETE FROM movies
WHERE year < 2000;
```

Predict the state transition:

- row count: **4 -> 2**
- removed: The Matrix, Old Cut
- remaining: Inception, Dune

That prediction gives you a target to verify after the mutation.

## Worked example

```sql
DELETE FROM movies
WHERE year < 2000;
```

**After**

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 3 | Dune | 2021 |

The sandbox verifies the remaining rows with a SELECT after the DELETE.

## Debug this

What is the blast radius of this valid statement?

```sql
DELETE FROM movies;
```

Without a `WHERE` predicate, every row in `movies` is a target. This is why mutation safety starts with predicting affected rows before execution.

## Common mistakes

- Omitting `WHERE` and deleting every row.
- Reversing `<` and `>` when translating “before” versus “after”.
- Using DELETE when the row should remain and only one of its values should change; that is an UPDATE problem.

## Your turn

Delete movies released before 2000. Before pressing Run, name the two rows that should disappear and the two that must remain.

## Quick check

If a row must stay in the table but one field is wrong, should you use DELETE or UPDATE?

**Answer:** UPDATE. DELETE removes the entire matching row.
