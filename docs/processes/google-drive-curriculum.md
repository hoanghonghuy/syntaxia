# Google Drive curriculum sync

## Purpose

Curriculum Markdown is stored in a platform Google Drive folder. Postgres caches metadata and body for fast reads. Local `docs/curriculum/` is the dev fallback when Drive is not configured.

## When to use

- Setting up content storage for the first time
- Switching between local mirror and real Drive
- Debugging sync failures (`POST /api/v1/admin/content/sync`)

## Steps

### Local (default)

1. Leave `GOOGLE_DRIVE_FOLDER_ID` and `GOOGLE_DRIVE_CREDENTIALS_FILE` empty.
2. Put lessons under `docs/curriculum/<track>/<locale>/<slug>.md`.
3. Start API — startup sync imports local files; or call admin sync.

### Google Drive (production / shared curriculum)

1. Create a Google Cloud project; enable **Google Drive API**.
2. Create a **service account**; download JSON key.
3. Create a Drive folder for curriculum; **share it with the service account email** (Editor).
4. Set env:
   - `GOOGLE_DRIVE_FOLDER_ID=<folder id from Drive URL>`
   - `GOOGLE_DRIVE_CREDENTIALS_FILE=/absolute/path/to/service-account.json`
5. Restart API — log should show `content backend=google-drive`.
6. Layout on Drive mirrors local: `<track>/<locale>/<slug>.md`.
7. Admin sync pulls all `.md` files into Postgres.

## Do

- Share the folder with the service account before syncing.
- Keep frontmatter valid (`id`, `track`, `locale`, `slug`, …).
- Prefer Drive as source of truth when credentials are set; edit via admin API/UI so writes go to Drive.

## Don't

- Commit the service account JSON key.
- Use each learner’s personal Drive for curriculum (MVP uses one platform folder).
- Expect `drive.file` alone to read a pre-existing shared folder — this client uses Drive scope for the shared platform folder.

## Related

- [`mvp-completion-checklist.md`](./mvp-completion-checklist.md)
- [`product-baseline.md`](./product-baseline.md)
- `apps/api/internal/drive/`
