---
id: sql-18-aliases
track: sql-fundamentals
locale: en
slug: column-aliases
title: Renaming columns with AS
order: 18
published: true
can_do: "Give result expressions clear temporary names with AS without changing the stored schema"
objectives:
  - Separate stored column names from result labels
  - Alias multiple selected columns
  - Recognize aliases as query-output names rather than schema changes
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The task changes result labels, not stored column names."
    - "Write title AS film_name and year AS release_year."
    - "Use: SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  solution: "SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["film_name", "release_year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["Dune", 2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Database schemas often use short technical names, while a report or API may need clearer output labels. An alias changes the **name exposed by this query result**, not the stored table definition.

## Mental model

Separate source identity from output label:

| Source expression | Alias | Result heading |
| --- | --- | --- |
| `title` | `film_name` | `film_name` |
| `year` | `release_year` | `release_year` |

The source table still has columns named `title` and `year` after the query finishes.

## Predict before you run

```sql
SELECT title AS film_name,
       year AS release_year
FROM movies;
```

Predict what changes and what does not:

- result headings: change to `film_name`, `release_year`
- result values: unchanged
- stored schema: unchanged

## Worked example

```sql
SELECT title AS film_name,
       year AS release_year
FROM movies
ORDER BY release_year;
```

| film_name | release_year |
| --- | ---: |
| The Matrix | 1999 |
| Inception | 2010 |
| Interstellar | 2014 |
| Dune | 2021 |

PostgreSQL allows this result alias to be referenced by `ORDER BY`, which makes the intended output name readable here.

## Debug this

After running a SELECT with `title AS film_name`, a learner assumes this will work as a stored-column change:

```sql
SELECT film_name
FROM movies;
```

It will not: the original table still has `title`, not `film_name`. An alias normally lives only within the query/result context where it is defined.

## Common mistakes

- Treating AS as a permanent schema rename.
- Forgetting the exact alias expected by a result contract or grader.
- Assuming an alias is available in every clause or in later independent queries.

## Your turn

Return `title` as `film_name` and `year` as `release_year`, ordered by `release_year`. Predict the two output headings before running.

## Quick check

Does `SELECT title AS film_name FROM movies` rename the stored column in `movies`?

**Answer:** no. It changes only the result label for that query.
