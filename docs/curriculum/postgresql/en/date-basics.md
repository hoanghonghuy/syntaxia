---
id: pg-06-date
track: postgresql
locale: en
slug: date-basics
title: DATE, TIMESTAMP, and time-zone intent
order: 6
published: true
can_do: "Filter PostgreSQL DATE values with typed ISO literals and choose DATE versus timestamp types from domain intent"
objectives:
  - Compare DATE values with a typed ISO date literal
  - Distinguish calendar dates from timestamp values
  - Recognize when time-zone semantics matter
exercise:
  starter: "SELECT title, released FROM movies;"
  hints:
    - "The column stores calendar dates, so compare it with a typed DATE literal."
    - "On or after requires >= and the ISO date 2010-01-01."
    - "Use: SELECT title FROM movies WHERE released >= DATE '2010-01-01' ORDER BY released, title;"
  solution: "SELECT title FROM movies WHERE released >= DATE '2010-01-01' ORDER BY released, title;"
  preview:
    columns: ["id", "title", "released"]
    rows:
      - [1, "The Matrix", "1999-03-31"]
      - [2, "Inception", "2010-07-16"]
      - [3, "Dune", "2021-10-22"]
      - [4, "Arrival", "2016-11-11"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Arrival"]
      - ["Dune"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, released DATE);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', DATE '1999-03-31'), (2, 'Inception', DATE '2010-07-16'), (3, 'Dune', DATE '2021-10-22'), (4, 'Arrival', DATE '2016-11-11');"
---

Time data is easy to model incorrectly because “a date” and “an instant in time” are different domain concepts.

## Mental model

Choose from intent first:

| type | model |
| --- | --- |
| `DATE` | calendar day, no time-of-day |
| `TIMESTAMP WITHOUT TIME ZONE` | local date + clock fields, no time-zone conversion semantics |
| `TIMESTAMP WITH TIME ZONE` (`timestamptz`) | an instant whose display depends on session time zone |

This lesson's `released` field is a calendar date, so `DATE` is the appropriate type.

Use ISO `YYYY-MM-DD` forms in teaching and application boundaries because they are clear and unambiguous.

## Predict before you run

For `released >= DATE '2010-01-01'`, The Matrix is excluded. Ordered by release date, the survivors are Inception, Arrival, Dune.

## Worked example

```sql
SELECT title
FROM movies
WHERE released >= DATE '2010-01-01'
ORDER BY released, title;
```

| title |
| --- |
| Inception |
| Arrival |
| Dune |

## Debug this

A global event such as “payment received at an exact instant” is modeled as a plain `DATE`. The SQL may run, but the model loses time-of-day and zone/instant meaning. Type bugs often begin before the query—with the wrong domain model.

```sql
CREATE TABLE payments (received_on DATE);
```

For instant semantics, a timestamp type—often `timestamptz` in application systems—is generally the more appropriate starting point.

## Common mistakes

- Using locale-shaped date strings such as `01/02/2026` at system boundaries.
- Treating `timestamp without time zone` as if PostgreSQL will preserve a source time-zone offset.
- Choosing a timestamp when the domain is genuinely only a calendar day, or choosing DATE when an instant matters.

## Your turn

Return titles released on or after `2010-01-01`, ordered by release date then title.

## Quick check

Which type best represents a birthday when time-of-day is irrelevant?

**Answer:** `DATE`.
