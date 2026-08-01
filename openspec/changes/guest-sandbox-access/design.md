# Design — Guest sandbox access — allow unauthenticated users to run exercises

## Approach

Minimal change: swap middleware on sandbox routes + remove frontend auth gate. No new entities, no new middleware, no database changes.

### 1. API: Auth → OptionalAuth + RateLimit

**File:** `apps/api/internal/handler/handler.go` (lines 63-68)

Current:
```go
authed := v1.Group("")
authed.Use(middleware.Auth(h.svc.Tokens))
{
    authed.POST("/sandbox/run", h.sandboxRun)
    authed.POST("/sandbox/js/grade", h.sandboxJsGrade)
    authed.POST("/sandbox/htmlcss/grade", h.sandboxHtmlCssGrade)
```

Change to:
```go
sandboxG := v1.Group("/sandbox")
sandboxG.Use(middleware.OptionalAuth(h.svc.Tokens))
sandboxG.Use(middleware.RateLimit(30, time.Minute)) // 30 req/min per IP
{
    sandboxG.POST("/run", h.sandboxRun)
    sandboxG.POST("/js/grade", h.sandboxJsGrade)
    sandboxG.POST("/htmlcss/grade", h.sandboxHtmlCssGrade)
}
```

Key decisions:
- `OptionalAuth` — attaches user claims if token present, continues if not
- `RateLimit(30, time.Minute)` — 30 sandbox requests per minute per IP to prevent abuse
- Separate group from `authed` — sandbox no longer shares the `Auth` middleware group

### 2. Frontend: Remove canRun gate

**Files:** `SqlSandbox.vue`, `JsSandbox.vue`, `HtmlCssSandbox.vue`

Remove `v-if="!canRun"` auth gate blocks. Always render the interactive editor and Run/Check button.

Keep the `canRun` prop for backward compatibility but default to always `true`. The `run()`/`check()` guard `if (!canRun.value || !props.lessonId) return` stays — it's a safety net, not an auth gate.

**File:** `apps/web/app/pages/tracks/[track]/lessons/[slug].vue` (line 33, 46, 60)

Remove `:can-run="!auth.loading && !!auth.user"` binding. Either:
- Remove the prop entirely (defaults to `true`)
- Or bind `:can-run="true"` explicitly

### 3. Keep existing soft prompts

The lesson page already has `auth.loginToSave` prompt below sandbox for unauthenticated users. This stays unchanged — guest can run code, sees prompt to login for saving progress.

## Risks

- **Abuse (spam queries):** Mitigated by `RateLimit(30/min)` + existing Postgres timeout (5s) + restricted role + temp schemas. Guest queries are isolated per-request.
- **Resource exhaustion:** Postgres pool already has connection limits. Temp tables are per-session and auto-dropped.
- **Breaking change for authed users:** None. `OptionalAuth` still attaches user claims when token is present. Sandbox handlers already check `ClaimsFromContext` for user-specific behavior (if any).
- **No rate limit currently on sandbox:** Adding one is a net improvement even for authed users.

## Change

- ID: `guest-sandbox-access`
- Files touched:
  - `apps/api/internal/handler/handler.go` — middleware swap + rate limit
  - `apps/web/app/components/SqlSandbox.vue` — remove auth gate
  - `apps/web/app/components/JsSandbox.vue` — remove auth gate
  - `apps/web/app/components/HtmlCssSandbox.vue` — remove auth gate
  - `apps/web/app/pages/tracks/[track]/lessons/[slug].vue` — remove canRun binding
