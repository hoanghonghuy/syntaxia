# Sandbox — delta spec

## REQ-SANDBOX-001 Execute

**Given** an authenticated learner on a lesson with sandbox config  
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
