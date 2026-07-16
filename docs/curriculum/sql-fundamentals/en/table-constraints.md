---
id: sql-40-constraints
track: sql-fundamentals
locale: en
slug: table-constraints
title: Column rules with UNIQUE, CHECK, and DEFAULT
order: 40
published: true
objectives:
  - Read UNIQUE, CHECK, and DEFAULT on a CREATE TABLE
  - Insert rows that respect those rules
  - See how DEFAULT fills a missing column
exercise:
  starter: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  hints:
    - "status has DEFAULT 'open' — omit it and the row still gets open."
    - "Insert code and seats only; let DEFAULT fill status."
    - "Try: INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  solution: "INSERT INTO tickets (code, seats) VALUES ('T1', 2);"
  preview:
    columns: ["code", "seats", "status"]
    rows:
      - ["T1", 2, "open"]
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

Primary keys and foreign keys are two kinds of **constraints** (rules on columns). Three more everyday rules appear on many tables:

| Constraint | Plain meaning | Everyday analogy |
| --- | --- | --- |
| `UNIQUE` | No two rows share this value | Ticket codes must not collide |
| `CHECK (…)` | Value must pass a test | Seats must be greater than 0 |
| `DEFAULT …` | If you omit the column, use this value | New tickets start as `open` |

**tickets** — how the empty table is defined (rules, not data yet):

```sql
CREATE TABLE tickets (
  code   TEXT UNIQUE,
  seats  INT CHECK (seats > 0),
  status TEXT DEFAULT 'open'
);
```

| Column | Rule in words |
| --- | --- |
| `code` | Each code appears at most once |
| `seats` | Must be a positive number |
| `status` | If you skip it on INSERT, store `'open'` |

At the start of the exercise the table has **no rows**.

## Worked example

Insert one ticket. You supply `code` and `seats` only — `status` is filled by `DEFAULT`.

```sql
INSERT INTO tickets (code, seats)
VALUES ('T1', 2);
```

- `UNIQUE` on `code` allows the first `'T1'`. A second `'T1'` would fail.
- `CHECK (seats > 0)` accepts `2`. Inserting `0` or `-1` would fail.
- `status` was omitted, so the database stores `'open'`.

After the insert, the table looks like this:

| code | seats | status |
| --- | --- | --- |
| T1 | 2 | open |

Check with:

```sql
SELECT code, seats, status FROM tickets ORDER BY code;
```

## Common mistakes

- Omitting a required value when there is **no** DEFAULT — then INSERT fails; here `status` is safe to omit.
- Breaking CHECK — `seats` must stay greater than 0.
- Reusing the same `code` twice — UNIQUE rejects the duplicate.

## Your turn

Insert one row with `code = 'T1'` and `seats = 2`. Let `DEFAULT` set `status`. The checker reads all three columns ordered by `code`.
