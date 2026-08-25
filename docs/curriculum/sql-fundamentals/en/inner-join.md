---
id: sql-03-join
track: sql-fundamentals
locale: en
slug: inner-join
title: Combining tables with INNER JOIN
order: 19
published: true
can_do: "Match related rows from two tables with an ON condition and predict the combined result"
objectives:
  - Identify the foreign-key-like column that points to the other table
  - Trace row pairs that satisfy a join condition
  - Select columns from both matched rows
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "The relationship is movies.director_id -> directors.id."
    - "Use INNER JOIN directors ON movies.director_id = directors.id."
    - "Use: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Interstellar", 1]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Interstellar", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

Relational data is often split so the same director name is not copied into every movie row. A join reconstructs a useful view by matching related rows at query time.

## Mental model

Do not think “merge two tables blindly”. Think **find valid row pairs using the `ON` rule**.

**movies**

| title | director_id |
| --- | ---: |
| Inception | 1 |
| The Matrix | 2 |
| Interstellar | 1 |

**directors**

| id | name |
| ---: | --- |
| 1 | Nolan |
| 2 | Wachowski |

The join condition is:

```sql
movies.director_id = directors.id
```

Trace the pairs:

| movie | director_id | matching directors.id | combined name |
| --- | ---: | ---: | --- |
| Inception | 1 | 1 | Nolan |
| The Matrix | 2 | 2 | Wachowski |
| Interstellar | 1 | 1 | Nolan |

## Predict before you run

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors
  ON movies.director_id = directors.id;
```

Predict the result shape: **2 columns, 3 rows**. Every movie in this dataset finds a matching director. With INNER JOIN, a source row that finds no valid pair is absent from the result.

## Worked example

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors
  ON movies.director_id = directors.id
ORDER BY movies.title;
```

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |

Notice two separate jobs: `ON` decides which rows relate; `SELECT` decides which columns from those matched rows appear.

## Debug this

Why is this relationship wrong?

```sql
ON movies.id = directors.id
```

`movies.id` identifies a movie. It does not store the director reference. The relationship lives in `movies.director_id`, so matching the two independent primary IDs would create accidental, semantically wrong pairs.

## Common mistakes

- Joining columns because their values happen to look similar instead of following the real relationship.
- Forgetting table qualification when the same column name exists on both sides.
- Expecting unmatched rows to survive INNER JOIN.

## Your turn

Return each movie title with its director name, ordered by movie title. Before running, trace all three `director_id -> id` matches by hand.

## Quick check

What does the `ON` clause primarily define in a join?

**Answer:** the rule that decides which row from one input can pair with which row from the other input.
