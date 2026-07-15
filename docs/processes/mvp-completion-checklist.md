# MVP completion checklist

Ordered work remaining after the initial scaffold. Do one item at a time; mark done only after code + process doc (when applicable) land.

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | **Google Drive API (real)** | done | Service account client + local fallback; see `google-drive-curriculum.md` |
| 2 | **Admin UI CRUD** | done | `/admin` list/create/edit/delete/publish; see `admin-content-crud.md` |
| 3 | **Sandbox harden** | done | ROLLBACK + DISCARD ALL + `syntaxia_sandbox`; see `sql-sandbox.md` |
| 4 | **Curriculum DML + schema** | done | Lessons 6–9 (INSERT/UPDATE/DELETE/tables) en+vi |
| 5 | **Local E2E verify** | done | sync 18 → 9 en lessons → sandbox SELECT+INSERT → progress+notes |
| 6 | **Process docs** | done | Drive, admin, sandbox, checklist under `docs/processes/` |

## Done earlier (scaffold)

- Monorepo, Docker Postgres, OpenSpec change
- Auth email + Google login (code)
- Lesson reader, progress, notes (basic)
- Sandbox + grade (basic → hardened)
- SQL Fundamentals lessons 1–9 (en/vi)
- Design tokens + Mintlify-style layout

## Completion note (2026-07-11)

All checklist rows above are **done** (initial MVP scaffold).

**Active checklist:** [`product-perfection-checklist.md`](./product-perfection-checklist.md)  
**Quality bar lock:** [`product-quality-lock.md`](./product-quality-lock.md)

