# Guest sandbox access

## Purpose

How unauthenticated users can run sandbox exercises (SQL, JavaScript, HTML-CSS) without login — matching the SQLBolt/Mode pattern of zero-friction learning.

## When to use

- Debugging guest sandbox execution failures
- Adjusting rate limits for sandbox endpoints
- Adding new sandbox types (future language tracks)
- Verifying auth gate is not accidentally re-added to sandbox components

## Steps

### 1. API middleware (`handler.go`)

Sandbox routes live in their own group with `OptionalAuth` + `RateLimit`:

```go
sandboxG := v1.Group("/sandbox")
sandboxG.Use(middleware.OptionalAuth(h.svc.Tokens))
sandboxG.Use(middleware.RateLimit(30, time.Minute))
{
    sandboxG.POST("/run", h.sandboxRun)
    sandboxG.POST("/js/grade", h.sandboxJsGrade)
    sandboxG.POST("/htmlcss/grade", h.sandboxHtmlCssGrade)
}
```

Key decisions:
- `OptionalAuth` — attaches user claims if JWT cookie present, continues if not
- `RateLimit(30, time.Minute)` — 30 requests per minute per IP to prevent abuse
- Separate from `authed` group — sandbox no longer shares `Auth` middleware

### 2. Frontend sandbox components

All three sandbox components (`SqlSandbox.vue`, `JsSandbox.vue`, `HtmlCssSandbox.vue`) no longer have the `v-if="!canRun"` auth gate block. The interactive editor and Run/Check button are always visible.

The `canRun` prop and its guard in `run()`/`check()` methods remain for backward compatibility but default to `true`.

### 3. Lesson page binding

`tracks/[track]/lessons/[slug].vue` no longer passes `:can-run` or `:login-path` props to sandbox components. The soft "Log in to save progress" prompt below the sandbox remains unchanged.

### 4. Testing guest access

```bash
# Test SQL sandbox without auth cookie
curl -X POST http://localhost:8080/api/v1/sandbox/run \
  -H "Content-Type: application/json" \
  -d '{"lessonId":"...","query":"SELECT 1"}'

# Expected: 200 OK with result (not 401)
```

```bash
# Test rate limit (31 requests in 1 minute)
for i in $(seq 1 31); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8080/api/v1/sandbox/run \
    -H "Content-Type: application/json" \
    -d '{"lessonId":"...","query":"SELECT 1"}'
done

# Expected: first 30 return 200, 31st returns 429
```

## Do

- Keep `OptionalAuth` on sandbox routes — never downgrade to no middleware
- Keep `RateLimit` — adjust threshold if needed but never remove
- Test both guest and authed flows after any sandbox change
- Keep the soft login prompt below sandbox for guest users

## Don't

- Re-add `Auth` middleware to sandbox routes
- Re-add `v-if="!canRun"` auth gate to sandbox components
- Create anonymous user entities or guest sessions (future enhancement)
- Remove the `canRun` prop guard in `run()`/`check()` — it's a safety net

## Related

- [`progress-sandbox-sync.md`](./progress-sandbox-sync.md) — progress tracking
- [`html-css-sandbox.md`](./html-css-sandbox.md) — HTML-CSS sandbox
- [`javascript-sandbox.md`](./javascript-sandbox.md) — JS sandbox
- `openspec/changes/guest-sandbox-access/` — change artifacts
- `apps/api/internal/handler/handler.go` — route registration
- `apps/api/internal/middleware/middleware.go` — OptionalAuth, RateLimit
- `apps/web/app/components/SqlSandbox.vue`
- `apps/web/app/components/JsSandbox.vue`
- `apps/web/app/components/HtmlCssSandbox.vue`
