# Admin content CRUD

## Purpose

Admins manage curriculum lessons (list, create, edit, publish, delete) via `/admin`. Writes go to the content backend (local mirror or Google Drive) and Postgres cache. Sync feedback must clearly report success, empty results, and failures.

## When to use

- Adding or editing a lesson without hand-editing files only
- Publishing / unpublishing content
- Triggering a full sync from local files (default) or Drive (when configured)
- Checking empty cache / filter empty states after sync

## Steps

1. Register a user, then promote: `UPDATE users SET role = 'admin' WHERE email = '…';`
2. Open `/admin` (or `/vi/admin`).
3. Confirm **Content backend** shows `local` (default SoT) or `google-drive`.
4. **Sync** imports all MD files from the active backend:
   - Local → button label **Sync from local files**
   - Drive → button label **Sync from Drive**
   - Banner shows count (`Synced N lessons`), empty (`no lesson files found`), or failure detail
5. Empty list: follow the empty-state hint (sync or **New lesson**). Filtered empty uses a separate message.
6. **New lesson** / select a row → edit metadata, Markdown body, exercise JSON, sandbox seed JSON → **Save**.
7. **Delete** confirms with title + locale, then removes Drive/local file (when known) and the Postgres row.

## Do

- Keep `id` + `locale` stable after create (ID is disabled on edit).
- Validate exercise/seed JSON before save.
- Prefer admin UI or MD source files — avoid editing only Postgres.
- Treat **local `docs/curriculum/` as source of truth** until Drive is explicitly enabled.
- Disable sync/save/delete controls while a sync or save is in flight.
- Use `formatSyncResult` (`apps/web/app/utils/adminSync.ts`) for sync banner copy; keep vi+en keys in sync.

## Don't

- Expose admin routes without auth + `admin` role.
- Honor `?admin=true` on public `GET /lessons` without an admin JWT — use `/api/v1/admin/lessons` or admin session + `OptionalAuth` on public lesson routes for draft preview only.
- Commit secrets used for Drive.
- Label the sync button as Drive when backend is `local`.
- Rely on chat memory for admin sync UX — this file is the playbook.

## Tests

```bash
cd apps/web && npm run test:admin-sync
```

## Related

- [`google-drive-curriculum.md`](./google-drive-curriculum.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#6)
- [`mvp-completion-checklist.md`](./mvp-completion-checklist.md)
- `apps/web/app/pages/admin/index.vue`
- `apps/web/app/utils/adminSync.ts`
- `POST /api/v1/admin/content/sync` → `{ synced: number }`
