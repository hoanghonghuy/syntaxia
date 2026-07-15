# SQL sandbox hardening

## Purpose

Learner SQL runs against real Postgres in an isolated TEMP context with a restricted DB role. Results are graded; nothing persists.

## When to use

- Changing sandbox security
- Debugging “permission denied” or leaked session state
- Adding DML exercises (`allow_mutations: true` in `sandbox_seed`)

## Steps

1. Ensure role exists: apply `apps/api/migrations/init.sql` (fresh) or `002_sandbox_harden.sql` (existing volume).
2. Set `SANDBOX_DATABASE_URL=postgres://syntaxia_sandbox:syntaxia_sandbox@localhost:5432/syntaxia?sslmode=disable`.
3. Keep app `DATABASE_URL` on the main `syntaxia` user.
4. Runner flow per request:
   - Acquire connection from sandbox pool
   - `BEGIN` → `SET LOCAL statement_timeout` → `SET LOCAL search_path TO pg_temp`
   - Apply seed DDL (TEMP tables)
   - Run single learner statement
   - Grade → **always `ROLLBACK`**
   - Rollback the transaction (TEMP objects created in-tx are dropped); release connection
   - Do **not** run `DISCARD ALL` on pooled connections — it drops prepared statements and breaks pgx statement cache (SQLSTATE 26000)
5. Block multi-statement and dangerous DDL. Block INSERT/UPDATE/DELETE unless `sandbox_seed.allow_mutations: true`.
6. Read-only exercises: allow only statements starting with `SELECT`, `WITH`, `EXPLAIN`, or `TABLE`. With `allow_mutations`: also `INSERT`/`UPDATE`/`DELETE`/`CREATE`/`ALTER`/`DROP`. Always block `COPY`, `DO`, `CALL`, `EXECUTE`, `TRUNCATE`, `GRANT`, `REVOKE`.
7. **Grading inputs are server-side only:** `POST /api/v1/sandbox/run` accepts `{ sql, lessonId, locale }` (or `slug` instead of `lessonId`). The API loads `sandbox_seed` and `exercise.expected` from Postgres — never trust `seed`/`expected` from the client.
8. `grade()` must fail when `expected` is missing or malformed (no implicit pass).
9. Public `GET /lessons/:slug` uses `content.LessonForLearner` (strips `expected`, `solution`, `sandboxSeed`; sets `exercise.solutionAvailable`). Solution text only via authed `GET /lessons/:slug/solution`.

## Do

- Use TEMP tables in lesson seeds (`CREATE TEMP TABLE …`).
- Prefer the sandbox role for all learner queries.
- Document any new allowlist flags in this file.
- Keep unpublished lessons out of sandbox runs, notes, and progress writes.

## Don't

- Run learner SQL on the app owner role.
- Commit sandbox transactions.
- Allow multi-statement batches.

## Related

- [`mvp-completion-checklist.md`](./mvp-completion-checklist.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md) — fail copy, hints, solution reveal
- `apps/api/internal/sandbox/runner.go`
