# Product baseline

## Purpose

Record the locked product and technical baseline for Syntaxia so agents do not re-litigate settled decisions without new research and user approval.

## When to use

- Starting a new session or feature
- Scaffolding monorepo apps
- Choosing design, curriculum, storage, auth, or sandbox approach
- Before proposing changes that would contradict this baseline

## Steps

1. Read this file and [`AGENTS.md`](../../AGENTS.md).
2. If a change would contradict a locked item below, run `/opsx-research`, present the conflict, and wait for explicit user approval.
3. After an approved change to the baseline, update **this file** in the same session.

## Locked baseline

### Product shape

- Learning platform: personal knowledge base + light LMS + interactive SQL sandbox
- Multi-user (small team first); roles `admin` and `learner`
- Monorepo: `apps/web` (Nuxt + Pinia) + `apps/api` (Go + Gin + pgx)
- Curriculum Markdown: **local `docs/curriculum/` for current phase**; Google Drive platform folder when you opt in later
- Postgres holds metadata, content cache, progress, and notes
- Auth (current phase): **email/password only** (accounts in Postgres). Google OAuth deferred until product feels right
- UI languages: `vi` + `en` first; more locales later
- Content CRUD (admin) and progress/notes CRUD (learner) both required

### Deferred (do not block MVP polish)

- Google login/register
- Google Drive as curriculum source of truth (code path exists; keep env empty)

### Design

- Primary IA: **Mintlify-style** learning layout (nav / lesson prose / TOC; mobile drawer)
- Visual skin: **digital notebook / bullet-journal** (canvas grid, pastel soft surfaces, Playpen Sans for section headings, larger card/pill radii). See [`app-notebook-theme.md`](./app-notebook-theme.md) and [`lesson-notebook-style.md`](./lesson-notebook-style.md)
- Custom CSS design tokens; expressive non-default fonts (do not use Inter, Roboto, Arial, or system UI stacks as the brand voice)
- Brand wordmark: Fraunces; body: Source Sans 3; lesson/section headings: Playpen Sans
- **Appearance:** learner can choose `system` / `light` / `dark` plus accent presets or custom hex (default emerald `#00b48a`). See [`appearance-theme.md`](./appearance-theme.md)
- Avoid purple-on-white and cream+terracotta AI-default looks as the *default* brand; custom accents are user-controlled
- Interactive accent remains brand/emerald (or user preset); pastels are decorative surfaces only

### Curriculum

- Do not invent outlines: map from public references (SQLBolt-style fundamentals, then PostgreSQL track)
- Tracks: **SQL Fundamentals** → **PostgreSQL** (basic to advanced)
- Lesson MD frontmatter should support identity, track, order, locale, objectives, exercise, and sandbox seed metadata

### SQL sandbox

- Required for the W3Schools/SQLBolt-like experience
- Execute against **real Postgres** with isolation (TEMP/seed, restricted role, statement timeout, single-statement policy where appropriate, grade vs expected)
- Fundamentals lessons stay on portable SQL; Postgres-specific features belong in the PG track

### Google Drive

- Curriculum source of truth = platform Drive folder (not each learner’s personal Drive in MVP)
- Prefer narrow scopes (e.g. `drive.file`) and encrypted refresh tokens on the server
- Cache/sync into Postgres for read performance

## Do

- Follow this baseline unless the user explicitly changes it after research.
- Add new process files for workflows that grow out of this baseline (auth, drive-sync, sandbox-runner, i18n, etc.).

## Don't

- Replace Drive with “DB-only content” or drop the sandbox without an approved research revision.
- Use SQLite-WASM as the only engine if it would teach a dialect that fights the PostgreSQL track (Postgres is the exercise engine).
- Store secrets in the repo.

## Related

- [`research-and-decisions.md`](./research-and-decisions.md)
- External design refs: `awesome-design-md/design-md/mintlify/DESIGN.md`
- Plan: Syntaxia MVP Architecture (Cursor plan)
