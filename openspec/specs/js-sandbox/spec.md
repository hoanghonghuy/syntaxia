# JavaScript sandbox

Client Web Worker execution + server grading for `javascript-basics` lessons.

## REQ-JS-SANDBOX-001 Execute (client)

**Given** a learner on a JS lesson with `exercise.starter`  
**When** they click Run  
**Then** code executes in a Web Worker (not main thread) and returns serializable output or a structured error

## REQ-JS-SANDBOX-002 Grade (server)

**Given** a learner posts grade payload  
**When** POST `/api/v1/sandbox/js/grade` with `lessonId`, `locale`, `returnValue`, `consoleLines`  
**Then** the API compares against server-stored `exercise.expected` and returns `passed: true|false`

## REQ-JS-SANDBOX-003 Secrets

**Given** any public `GET /lessons/:slug`  
**When** the lesson is a JS exercise  
**Then** `exercise.expected` and `exercise.solution` are not present; `solutionAvailable` may be true

## REQ-JS-SANDBOX-004 Timeout

**Given** learner code runs longer than the configured timeout  
**When** the limit is exceeded  
**Then** the worker is terminated and the UI shows a timeout error without freezing the page

## REQ-JS-SANDBOX-005 UX parity

**Given** a JS sandbox lesson  
**When** the learner fails grading repeatedly  
**Then** progressive hints and optional solution reveal follow `docs/processes/sandbox-feedback.md`
