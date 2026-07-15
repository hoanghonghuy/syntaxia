---
id: sql-05-and-or-not
track: sql-fundamentals
locale: en
slug: and-or-not
title: Combining filters with AND, OR, NOT
order: 5
published: true
objectives:
  - Combine two conditions with AND
  - Keep only rows that match every required filter
exercise:
  starter: "SELECT title FROM movies WHERE year > 2000;"
  hints:
    - "year > 2000 alone still includes every post-2000 film, not only Nolan’s."
    - "Join a second condition with AND so both must be true."
    - "Try: SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Interstellar', 2014, 'Nolan');"
---

One filter is often not enough. `AND` keeps a row only when **every** condition is true — like two spreadsheet filters applied together.

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Interstellar | 2014 | Nolan |

## Worked example

```sql
SELECT title FROM movies
WHERE year > 2000 AND director = 'Nolan'
ORDER BY title;
```

- `year > 2000` drops The Matrix (1999).
- `director = 'Nolan'` keeps only Nolan’s films among what remains.
- `AND` requires both checks to pass: Inception and Interstellar.
- `ORDER BY title` sorts the titles alphabetically.

`OR` would keep a row if **either** condition is true. `NOT` flips a condition (true becomes false). This lesson focuses on `AND`.

## Common mistakes

- Using `OR` when you meant “both must match” — `OR` widens the result; `AND` narrows it.
- Comparing text without quotes (`director = Nolan`) — text values need single quotes: `'Nolan'`.
- Forgetting that `year > 2000` alone still returns every post-2000 title, including non-Nolan films.

## Your turn

List titles where `year` is greater than 2000 **and** `director` is `'Nolan'`, ordered by `title`.
