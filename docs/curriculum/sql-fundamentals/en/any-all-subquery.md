---
id: sql-39-any-all
track: sql-fundamentals
locale: en
slug: any-all-subquery
title: Comparing with ANY and ALL
order: 39
published: true
objectives:
  - Use = ANY with a subquery list of values
  - Understand ALL as “compared to every value”
  - Read a subquery that returns one column of numbers
exercise:
  starter: "SELECT title, rating FROM movies;"
  hints:
    - "ANY compares one value to each result of the subquery."
    - "rating = ANY (SELECT …) keeps movies whose rating appears in that list."
    - "Try: SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
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

`EXISTS` asks “is there at least one related row?”. `ANY` and `ALL` ask a different question: compare this value to **a list** returned by a subquery — like checking whether a score is in a shortlist of “favorite ratings”.

| Operator | Plain meaning | Example idea |
| --- | --- | --- |
| `= ANY (…)` | Equal to **at least one** value in the list | rating is 8 or 9 |
| `> ALL (…)` | Greater than **every** value in the list | rating beats every favorite |

**movies** (full table)

| id | title | rating |
| --- | --- | --- |
| 1 | The Matrix | 7 |
| 2 | Inception | 9 |
| 3 | Dune | 8 |
| 4 | Old Film | 5 |

**favorites** (a short list of ratings you care about)

| rating |
| --- |
| 9 |
| 8 |

## Worked example

Keep movies whose `rating` equals **any** of the favorite ratings (8 or 9).

```sql
SELECT title, rating
FROM movies
WHERE rating = ANY (
  SELECT rating FROM favorites
)
ORDER BY title;
```

- The subquery `SELECT rating FROM favorites` returns the list `9`, `8`.
- `rating = ANY (…)` is true when the movie’s rating is 9 **or** 8.
- The Matrix (7) and Old Film (5) are out.

Result:

| title | rating |
| --- | --- |
| Dune | 8 |
| Inception | 9 |

**Note:** `= ANY (…)` often behaves like `IN (…)` for equality. This lesson practices the `ANY` spelling used on the W3Schools path.

For contrast, `rating > ALL (SELECT rating FROM favorites)` would mean “higher than both 8 and 9” — only a rating of 10+ would pass. That is not your exercise today.

## Common mistakes

- Writing `= ALL` when you meant “any of these” — `ALL` means every value; for a membership list use `ANY` or `IN`.
- Subquery returning multiple columns — `ANY` needs one column of values to compare.
- Forgetting parentheses around the subquery.

## Your turn

List `title` and `rating` for movies whose rating equals **any** favorite rating. Order by `title`.
