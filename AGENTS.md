# AI Agent Instructions

<!-- synapse:init -->

## Synapse (local MCP engine)

This workspace uses **Synapse**. Start stack: `syn up` · check: `syn status` · dashboard: http://127.0.0.1:47280

### Session start

1. `syn up` (use `syn up` without `--bundled` for FastEmbed — no Ollama required).
2. Reload Cursor MCP after `.cursor/mcp.json` changes.
3. Call MCP **`memory_context`** (memory-bank, handoff, recent bugs).
4. Read **`docs/processes/`** for how this project expects work to be done (see [Process documentation](#process-documentation-mandatory) below).

### MCP server `synapse` (stdio → `.synapse/.run/mcp-gateway`)

| Tool | Purpose |
|------|---------|
| `memory_context` | Load session context |
| `memory_handoff` | End-of-session handoff |
| `code_context` / `code_impact` / `code_query` / `code_overview` | Native code graph (tree-sitter) |
| `diff_impact` | Impact from git diff |
| `search_docs` | Semantic search over indexed docs/specs |
| `search_registry` | Skills / registry lookup |
| `openspec_router` / `openspec_propose` / `openspec_apply` | OpenSpec workflow (when `openspec/` present) |

**Embed:** FastEmbed in-process (`SYNAPSE_ENGINE__EMBED_PROVIDER=fastembed`) — no external Ollama.  
**Code intel:** native `pkg/codegraph` — not GitNexus unless explicitly configured.

### Do not commit

`.synapse/`, `memory-bank/`, `.env` secrets. After provider change: `syn migrate`.

<!-- /synapse:init -->

---

## Product (Syntaxia)

Mobile-first web app for learning IT topics (SQL first, then languages, architecture, etc.).

| Layer | Choice |
|-------|--------|
| Frontend | Vue + Nuxt (latest) + Pinia, hand-rolled CSS (no Tailwind-by-default) |
| Backend | Go + Gin + PostgreSQL via **pgx** / **pgxpool** |
| Repo | Monorepo: `apps/web` + `apps/api` |
| Content | Markdown lessons; **Google Drive** is curriculum source of truth from day one; Postgres stores metadata, cache, progress, notes |
| Auth | Email/password + Google OAuth; roles `admin` / `learner` |
| Learning UX | Lesson reader + progress/notes CRUD + interactive SQL sandbox (W3Schools/SQLBolt-style) |
| i18n | Vietnamese + English first; more locales later |
| Design | Mintlify-inspired learning IA (sidebar / lesson / TOC); custom fonts (never Inter/Roboto/Arial/system defaults); emerald accent; light canvas for long reading |

**Curriculum rule:** Do not invent lesson outlines. Map from established public curricula (e.g. SQLBolt → Mode/PostgreSQL docs). Tracks: **SQL Fundamentals**, then **PostgreSQL** (basic → advanced).

**Sandbox rule:** Real Postgres for exercises (TEMP/seed + restricted role + timeout + grade). Prefer portable SQL in Fundamentals; Postgres-specific features in the PG track.

---

## Process documentation (mandatory)

**Above all else:** when you establish, change, or discover *how work must be done* on this project, you **must write it into `docs/processes/`** in English so later sessions can follow the same correct path.

### When you must write or update a process doc

Write or update a file under `docs/processes/` if any of the following is true:

- You introduce a new workflow (auth, Drive sync, sandbox, i18n, deploy, OpenSpec, design tokens, etc.).
- You change an existing workflow or reverse a prior decision.
- You hit a non-obvious pitfall and the fix should not be rediscovered.
- You finish `/opsx-research` with a **chốt** (locked recommendation) that future agents must obey.
- You complete a meaningful OpenSpec change and the “how we do X” is not already documented.

### What to put in each process doc

Use the template in [`docs/processes/README.md`](docs/processes/README.md). Every process file must include:

1. **Purpose** — what this process is for  
2. **When to use** — triggers  
3. **Steps** — ordered, concrete commands/paths  
4. **Do / Don’t** — hard rules  
5. **Related** — OpenSpec changes, skills, other process files  

Filename: `docs/processes/<kebab-case-topic>.md` (English).

### Session habit

1. Start: read relevant process docs (and Synapse `memory_context`).  
2. During work: if the “correct way” is new or changed → update `docs/processes/` in the **same session**, not “later”.  
3. End: Synapse `memory_handoff` may summarize; **process docs remain the durable source of truth** for procedures.

Do **not** rely only on chat memory or `memory-bank/` for procedures. Memory-bank is session context; **`docs/processes/` is the playbook**.

---

## Research-first gate (`/opsx-research`)

For architecture, stack, design-system, curriculum structure, security-sensitive choices (sandbox, OAuth, Drive scopes), or any non-trivial “how should we do X?”:

1. Run **`/opsx-research`** (skill: `.cursor/skills/opsx-research/SKILL.md`).  
2. Use Context7 for libraries/APIs; web for comparisons and platform docs.  
3. Deliver the skill’s structured output and a **single recommended approach**.  
4. **Persist the locked decision** into `docs/processes/` (and OpenSpec when implementing).  
5. Only then `/opsx-propose` → `/opsx-apply` (or explore) as needed.

Do not invent design or curriculum from scratch when research and reference products exist. Design references live under the external `awesome-design-md/design-md` collection; default IA is **Mintlify**.

---

## OpenSpec workflow

When changing product behavior or architecture:

| Need | Slash |
|------|-------|
| Evidence / compare options | `/opsx-research` |
| Explore inside repo | `/opsx-explore` |
| Create change folder | `/opsx-propose` |
| Implement tasks | `/opsx-apply` |
| Spec / change gates | `/opsx-verify-spec`, `/opsx-verify` |

Follow existing `.cursor/commands/opsx-*.md` and skills. After a change lands a new procedure, update `docs/processes/`.

---

## Engineering conventions (summary)

- Prefer small, localized changes; match existing patterns once code exists.  
- TDD for new features and bug fixes (Red → Green → Refactor).  
- Go API: clean layered layout (`handler` → `service` → `repository`) with shared logging, errors, validation, constants.  
- Frontend: mobile-first; one job per section; custom CSS tokens; no generic purple/cream AI-default looks.  
- Never commit secrets; never commit `.synapse/` or `memory-bank/`.  
- Do not commit or push unless the user explicitly asks.

---

## Communication

- Prefer clear Vietnamese for user-facing chat unless the user asks otherwise.  
- Keep code, identifiers, commit messages, and **`docs/processes/`** in **English**.  
- When Japanese appears in code/specs, preserve it and explain in Vietnamese if helpful.
