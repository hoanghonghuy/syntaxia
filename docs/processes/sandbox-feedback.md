# Sandbox feedback loop

## Purpose

Define how learners get clear fail feedback, progressive hints, error-aware SQL guidance, and optional solution reveal in the SQL sandbox.

## When to use

- Changing fail copy, hints, or solution reveal UX
- Mapping new Postgres error codes to stable API codes
- Adding `exercise.solution` to curriculum lessons
- Touching `SqlSandbox.vue` or `apps/api/internal/sandbox/errors.go`

## Steps

1. **API error humanization** (`apps/api/internal/sandbox/errors.go`):
   - Map Postgres SQLSTATE → stable `code` + English fallback `message`
   - Codes: `syntax`, `undefined_column`, `undefined_table`, `permission`, `wrong_result`, `generic`
   - Runner attaches `code` / `message` on failed runs (SQL errors and grade mismatches)
2. **Web i18n**: map `code` → `lesson.error.*` or `lesson.failedWrongResult` (vi + en together)
3. **Hints**: keep progressive `exercise.hints` via “Show hint” (unchanged)
4. **Solution reveal** (`SqlSandbox.vue`):
   - Public lesson JSON exposes `exercise.solutionAvailable` only — never the solution text
   - Count failed runs (`passed === false`)
   - After **3** failed attempts, enable **Show solution** (still requires click)
   - On reveal: authed `GET /api/v1/lessons/:slug/solution?locale=` fetches SQL; show read-only box + **Use this query**
   - Reset sandbox UI state when `lessonId` changes (`:key` + `createSandboxUiState`)
5. **Curriculum**: put `exercise.solution` in frontmatter (same SQL for en/vi when portable)
6. Tests: `go test ./internal/sandbox/` before shipping API changes

## Do

- Prefer stable error **codes** from the API; localize on the web
- Ship vi + en UI strings and lesson `solution` pairs together
- Keep solution optional — lessons without `solution` simply omit the reveal UI
- Document new error codes here when added

## Don't

- Dump raw Postgres `err.Error()` as the only learner-facing copy
- Expose `exercise.solution` or `exercise.expected` on public `GET /lessons/:slug`
- Auto-fill the editor on reveal without an explicit **Use this query** click
- Start curriculum voice rewrite (#3) while only changing feedback UX
- Invent solutions that do not match `exercise.expected`

## Related

- [`sql-sandbox.md`](./sql-sandbox.md) — isolation / security runner
- [`product-quality-lock.md`](./product-quality-lock.md) — lock #6 (wrong-answer UX)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) — row #2
- `apps/web/app/components/SqlSandbox.vue`
- `apps/api/internal/sandbox/errors.go`
