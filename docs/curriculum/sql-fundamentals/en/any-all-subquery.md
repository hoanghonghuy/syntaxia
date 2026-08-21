---
id: sql-39-any-all
track: sql-fundamentals
locale: en
slug: any-all-subquery
title: Comparing with ANY and ALL
order: 39
published: true
can_do: "Evaluate a scalar comparison against a one-column subquery using ANY for at least one and ALL for every returned value"
objectives:
  - Separate the subquery result set from the outer comparison
  - Interpret ANY as at least one comparison succeeding
  - Contrast ANY with ALL using concrete values
exercise:
  starter: "SELECT title, rating FROM movies;"
  hints:
    - "First evaluate the subquery: favorites returns ratings 9 and 8."
    - "= ANY means the movie rating only needs to equal one value from that set."
    - "Use: SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
  solution: "SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
  preview:
    columns: ["title", "rating"]
    rows:
      - ["Inception", 9]
      - ["Dune", 8]
  expected:
    columns: ["title", "rating"]
    rows:
      - ["Dune", 8]
      - ["Inception", 9]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, rating INT);"
    - "CREATE TEMP TABLE favorites (rating INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 7), (2, 'Inception', 9), (3, 'Dune', 8), (4, 'Old Film', 5);"
    - "INSERT INTO favorites VALUES (9), (8);"
---

`ANY` and `ALL` combine a comparison operator with a set returned by a subquery. Learn them by evaluating the **inner set first**, then applying the comparison to that set.

## Mental model

The inner query:

```sql
SELECT rating FROM favorites;
```

returns `{9, 8}`.

Now compare one value:

| movie rating | `= ANY {9,8}` | `> ALL {9,8}` |
| ---: | --- | --- |
| 9 | true | false |
| 8 | true | false |
| 7 | false | false |
| 10 | false | true |

`ANY` means **at least one** comparison is true. `ALL` means the comparison must be true against **every** value.

## Predict before you run

For `rating = ANY ({9,8})`, predict that Inception (9) and Dune (8) survive; ratings 7 and 5 do not.

## Worked example

```sql
SELECT title, rating
FROM movies
WHERE rating = ANY (
  SELECT rating FROM favorites
)
ORDER BY title;
```

| title | rating |
| --- | ---: |
| Dune | 8 |
| Inception | 9 |

For equality, `= ANY (...)` often expresses the same membership idea as `IN (...)`; the explicit form helps you understand other operators such as `> ALL (...)`.

## Debug this

```sql
WHERE rating = ALL (SELECT rating FROM favorites)
```

A single rating would need to equal both 9 **and** 8 at the same time, so no movie passes. The keyword changes the quantifier, not just the spelling.

## Common mistakes

- Reading `ANY` or `ALL` before evaluating what the subquery returns.
- Using `ALL` when the requirement says “matches at least one”.
- Returning several columns from a subquery that must provide one comparable value column.

## Your turn

List movie title and rating when the rating equals any favorite rating, ordered by title. Write down the inner set `{9,8}` before evaluating the outer rows.

## Quick check

What does `score > ALL (subquery)` require?

**Answer:** `score` must be greater than every value returned by that subquery.
