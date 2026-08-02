# AI Agent Instructions

<!-- synapse:init -->

## Synapse workflow skills (no local stack)

**Locked (2026-08-02):** Do **not** start or use the Synapse runtime for this repo (`syn up`, `syn status`, MCP server `user-synapse` / mcp-gateway, `memory_context`, `openspec_*` MCP tools, Surreal/dashboard). Keep the stack **down**.

**Do use** the OpenSpec slash commands and skill markdown under `.cursor/commands/syn-*.md` and `.cursor/skills/syn-*/` (and `opsx-*` aliases) as **procedural checklists** — propose / apply / verify / archive by editing `openspec/` files directly.

See [`docs/processes/openspec-skills-only.md`](docs/processes/openspec-skills-only.md).

### Do not commit

`.synapse/`, `memory-bank/`, `.env` secrets.

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

1. Start: read relevant process docs (see [`openspec-skills-only.md`](docs/processes/openspec-skills-only.md) — no Synapse MCP).  
2. During work: if the “correct way” is new or changed → update `docs/processes/` in the **same session**, not “later”.  
3. End: summarize in chat if useful; **process docs remain the durable source of truth** for procedures.

Do **not** rely only on chat memory or `memory-bank/` for procedures. **`docs/processes/` is the playbook**.

---

## Research-first gate (`/opsx-research` / `/syn-research` skill)

For architecture, stack, design-system, curriculum structure, security-sensitive choices (sandbox, OAuth, Drive scopes), or any non-trivial “how should we do X?”:

1. Run the research **skill** (`.cursor/skills/opsx-research/SKILL.md` or `syn-research`) — file edits only, no Synapse MCP.  
2. Use Context7 for libraries/APIs; web for comparisons and platform docs.  
3. Deliver the skill’s structured output and a **single recommended approach**.  
4. **Persist the locked decision** into `docs/processes/` (and OpenSpec when implementing).  
5. Only then propose → apply (or explore) via skill checklists as needed.

Do not invent design or curriculum from scratch when research and reference products exist. Design references live under the external `awesome-design-md/design-md` collection; default IA is **Mintlify**.

---

## OpenSpec workflow

When changing product behavior or architecture, use slash commands / skills as **checklists** (edit `openspec/` directly — no `openspec_*` MCP):

| Need | Slash / skill |
|------|-------|
| Evidence / compare options | `/opsx-research` or `/syn-research` |
| Explore inside repo | `/opsx-explore` / `/syn-explore` |
| Create change folder | `/opsx-propose` / `/syn-propose` |
| Implement tasks | `/opsx-apply` / `/syn-apply` |
| Spec / change gates | `/opsx-verify-spec`, `/opsx-verify` (or syn-*) |

Follow `.cursor/commands/*` and `.cursor/skills/*`. After a change lands a new procedure, update `docs/processes/`. See [`openspec-skills-only.md`](docs/processes/openspec-skills-only.md).

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
