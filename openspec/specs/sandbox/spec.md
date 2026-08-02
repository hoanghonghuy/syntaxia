# Sandbox

SQL / JS / HTML-CSS sandboxes: execute, grade, safety, and guest access.

## REQ-SANDBOX-001 Execute

**Given** a learner on a lesson with sandbox config  
**When** POST `/api/v1/sandbox/run` with SQL  
**Then** query runs in isolated TEMP context and rows are returned

## REQ-SANDBOX-002 Grade

**Given** expected result definition on the lesson  
**When** learner submits correct query  
**Then** response includes `passed: true`

## REQ-SANDBOX-003 Safety

**Given** any sandbox request  
**When** SQL contains multiple statements or blocked operations  
**Then** request is rejected with 400

## REQ-SANDBOX-ACCESS-001 Guest sandbox execution

**When** an unauthenticated request hits `POST /sandbox/run`, `POST /sandbox/js/grade`, or `POST /sandbox/htmlcss/grade`  
**Then** the request is accepted (no 401)  
**And** the sandbox executes against temp schema and returns a result

## REQ-SANDBOX-ACCESS-002 Rate limit for sandbox

**When** any client sends sandbox requests  
**Then** rate is limited to 30 requests per minute per IP  
**And** exceeding the limit returns 429

## REQ-SANDBOX-ACCESS-003 Authed user continuity

**When** an authenticated request hits sandbox endpoints  
**Then** user claims remain attached and behavior matches prior authed path

## REQ-SANDBOX-ACCESS-004 Frontend always shows editor

**When** the lesson page renders a sandbox  
**Then** the editor and Run/Check are always visible (no auth gate blocking Run)  
**And** the soft “Log in to save progress” prompt still appears for guests

## REQ-SANDBOX-ACCESS-005 Progress and notes remain auth-gated

**When** a guest completes a sandbox exercise  
**Then** progress is not saved and notes remain login-gated
