---
id: sql-40-constraints
track: sql-fundamentals
locale: en
slug: table-constraints
title: Column rules with UNIQUE, CHECK, and DEFAULT
order: 40
published: true
can_do: "Predict how UNIQUE, CHECK, and DEFAULT constraints accept, reject, or fill values during INSERT"
objectives:
  - Read constraints as executable data rules
  - Predict UNIQUE and CHECK violations before mutation
  - Understand when DEFAULT supplies a value
exercise:
  starter: "INSERT INTO tickets (code, seats) VALUES "
  hints:
    - "Supply a unique code and a positive seats value."
    - "Omit status so DEFAULT 'open' supplies it."
    - "Use: INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  solution: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  preview:
    columns: ["code", "seats", "status"]
    rows: []
  expected:
    columns: ["code", "seats", "status"]
    rows:
      - ["T1", 2, "open"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT code, seats, status FROM tickets ORDER BY code;"
  ddl:
    - "CREATE TEMP TABLE tickets (code TEXT UNIQUE, seats INT CHECK (seats > 0), status TEXT DEFAULT 'open');"
---

Constraints turn business rules into rules the database can enforce every time data is written. They are part of the schema contract, not comments that developers merely promise to follow.

## Mental model

Prepared schema:

```sql
CREATE TABLE tickets (
  code   TEXT UNIQUE,
  seats  INT CHECK (seats > 0),
  status TEXT DEFAULT 'open'
);
```

Evaluate candidate writes:

| candidate | UNIQUE | CHECK | DEFAULT | result |
| --- | --- | --- | --- | --- |
| `('T1', 2)`, status omitted | pass | pass | fills `open` | accepted |
| duplicate `T1` | fail | — | — | rejected |
| seats `0` | pass | fail | — | rejected |

A DEFAULT is used when the column is omitted (or explicitly requested as `DEFAULT`). It does not mean every explicit `NULL` magically becomes the default.

## Predict before you run

The table begins empty. Predict the after-state for `INSERT INTO tickets (code, seats) VALUES ('T1', 2);`: one row with status `open`.

## Worked example

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 2);
```

| code | seats | status |
| --- | ---: | --- |
| T1 | 2 | open |

The database evaluates the rules as part of the write.

## Debug this

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 0);
```

The syntax is fine, but `CHECK (seats > 0)` rejects the row. Database errors can represent violated domain rules, not merely malformed SQL.

## Common mistakes

- Thinking constraints matter only when creating the table, not when writing later rows.
- Assuming DEFAULT replaces every explicit NULL value.
- Treating UNIQUE and PRIMARY KEY as identical concepts; they overlap in uniqueness but have different identity/nullability semantics.

## Your turn

Insert ticket `T1` with 2 seats and omit status so the default fills it. Evaluate all three rules before running.

## Quick check

What happens if `status` is omitted from this INSERT?

**Answer:** the database supplies the declared default value `'open'`.
