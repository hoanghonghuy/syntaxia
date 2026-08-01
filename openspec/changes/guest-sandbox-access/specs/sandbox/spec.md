# Sandbox access — delta spec

## Scope

Sandbox API endpoints (`/api/v1/sandbox/*`) and frontend sandbox components.

## Requirements

### MODIFIED REQ-SANDBOX-ACCESS-001 Guest sandbox execution

**When** an unauthenticated request hits `POST /sandbox/run`, `POST /sandbox/js/grade`, or `POST /sandbox/htmlcss/grade`  
**Then** the request is accepted (no 401)  
**And** the sandbox executes the query/code against temp schema  
**And** the result is returned to the client

### ADDED REQ-SANDBOX-ACCESS-002 Rate limit for sandbox

**When** any client (guest or authed) sends sandbox requests  
**Then** rate is limited to 30 requests per minute per IP  
**And** exceeding the limit returns 429 Too Many Requests

### MODIFIED REQ-SANDBOX-ACCESS-003 Authed user continuity

**When** an authenticated request hits sandbox endpoints  
**Then** user claims are still attached to context  
**And** sandbox behavior is identical to before the change

### MODIFIED REQ-SANDBOX-ACCESS-004 Frontend always shows editor

**When** lesson page renders with any sandbox component (SQL, JS, HTML-CSS)  
**Then** the interactive editor and Run/Check button are always visible  
**And** no auth gate ("Log in to run") blocks the sandbox  
**And** the soft "Log in to save progress" prompt still appears below for guests

### MODIFIED REQ-SANDBOX-ACCESS-005 Progress and notes remain auth-gated

**When** a guest user completes a sandbox exercise  
**Then** progress is NOT saved  
**And** notes section still shows login prompt  
**And** no guest session entity is created
