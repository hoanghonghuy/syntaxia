---
id: sql-05-and-or-not
track: sql-fundamentals
locale: en
slug: and-or-not
title: Combining filters with AND, OR, NOT
order: 5
published: true
can_do: "Combine boolean conditions and choose AND, OR, or NOT from the requirement"
objectives:
  - Evaluate two conditions for the same row
  - Use AND when every required condition must be true
  - Explain how OR and NOT change a filter
exercise:
  starter: "SELECT title FROM movies WHERE year > 2000;"
  hints:
    - "The year filter alone still keeps Dune, so one more condition is needed."
    - "Use AND when both year and director requirements must be true for the same row."
    - "Use: SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Requirements often contain words such as **and**, **or**, and **not**. The important skill is translating those words into a condition you can evaluate for each row.

## Mental model

For two conditions `A` and `B`:

| A | B | `A AND B` | `A OR B` |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

`NOT A` flips the truth value of `A`.

Now apply that to the lesson data:

| title | `year > 2000` | `director = 'Nolan'` | AND result |
| --- | --- | --- | --- |
| Inception | true | true | keep |
| The Matrix | false | false | drop |
| Interstellar | true | true | keep |
| Dune | true | false | drop |

## Predict before you run

```sql
SELECT title
FROM movies
WHERE year > 2000 AND director = 'Nolan';
```

Predict the survivors before running: **Inception** and **Interstellar**. Dune passes the year check but fails the director check, so `AND` removes it.

## Worked example

```sql
SELECT title
FROM movies
WHERE year > 2000 AND director = 'Nolan'
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

Use the requirement to choose the operator:

- **both conditions required** -> `AND`
- **either condition is enough** -> `OR`
- **exclude a condition** -> `NOT`

When a filter mixes `AND` and `OR`, parentheses make the intended grouping visible and prevent precedence assumptions from hiding in the query.

## Debug this

The requirement is “after 2000 **and** directed by Nolan”, but the query uses:

```sql
WHERE year > 2000 OR director = 'Nolan'
```

`OR` is broader: Dune passes because it is after 2000 even though Villeneuve directed it. The bug is not syntax; it is the wrong boolean logic for the requirement.

## Common mistakes

- Using `OR` for a requirement where every condition must match.
- Forgetting quotes around text values such as `'Nolan'`.
- Mixing `AND` and `OR` without parentheses when the intended grouping is not obvious.

## Your turn

Return titles released after 2000 **and** directed by Nolan, ordered by title. Evaluate both conditions against Dune before pressing Run.

## Quick check

Which operator usually makes a filter stricter when you add another required condition?

**Answer:** `AND`, because every connected condition must be true.
