---
id: sql-27-exists
track: sql-fundamentals
locale: en
slug: exists-subquery
title: Testing related rows with EXISTS
order: 27
published: true
can_do: "Use a correlated EXISTS test to keep parent rows that have at least one related child row"
objectives:
  - Treat EXISTS as a boolean existence test
  - Correlate an inner query with the current outer row
  - Distinguish checking existence from returning child data
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "For each director, the inner query only needs to find one matching movie."
    - "Correlate the rows with m.director_id = d.id."
    - "Use: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2);"
---

Sometimes the business question is only **does a related row exist?** You do not need movie columns; you need a yes/no answer for each director.

## Mental model

A correlated `EXISTS` behaves like a small test executed in the context of each outer row:

| outer director | inner condition | any matching row? | keep director? |
| --- | --- | --- | --- |
| Nolan (`d.id = 1`) | `m.director_id = 1` | yes, 2 movies | yes |
| Wachowski (`d.id = 2`) | `m.director_id = 2` | yes, 1 movie | yes |
| Villeneuve (`d.id = 3`) | `m.director_id = 3` | no | no |

`EXISTS` stops conceptually at the question “at least one row?”. It does not care which columns the inner SELECT returns, which is why `SELECT 1` communicates the intent clearly.

## Predict before you run

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1 FROM movies m
  WHERE m.director_id = d.id
);
```

Predict two names: Nolan and Wachowski. Also explain why Nolan still appears only once even though two movies match: the outer row is kept once after the existence test becomes true.

## Worked example

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1
  FROM movies m
  WHERE m.director_id = d.id
)
ORDER BY name;
```

| name |
| --- |
| Nolan |
| Wachowski |

The inner query is **correlated** because it references `d.id` from the current outer director.

## Debug this

What goes wrong if the correlation is removed?

```sql
WHERE EXISTS (SELECT 1 FROM movies)
```

Because `movies` is non-empty, that test is true for **every** director, including Villeneuve. The subquery must answer the question for the current director, not for the table in general.

## Common mistakes

- Forgetting the correlation condition and accidentally making the result independent of the outer row.
- Expecting one output row per matching movie; `EXISTS` keeps or drops the outer row.
- Using a complicated inner projection even though existence, not returned child columns, is the goal.

## Your turn

List the name of every director who has at least one movie, ordered by name. Trace the inner test for Villeneuve before running it.

## Quick check

Why can `SELECT 1` be used inside `EXISTS`?

**Answer:** because `EXISTS` cares whether the subquery returns at least one row, not which value its SELECT list contains.
