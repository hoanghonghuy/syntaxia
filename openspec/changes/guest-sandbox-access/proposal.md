# Guest sandbox access — allow unauthenticated users to run exercises

Allow unauthenticated users to run sandbox exercises (SQL, JavaScript, HTML-CSS) without login. Change API sandbox endpoints from Auth middleware to OptionalAuth so guest requests can execute queries against temp schemas with existing rate limits and restricted roles. Frontend: remove auth gate (can-run prop) from sandbox components, always render the interactive editor. Keep the existing 'Log in to save progress' soft prompt below the sandbox. No guest session entity — progress and notes still require authentication.

## Context

- Change ID: `guest-sandbox-access`
- Flow: `sdd`
- Research: `/syn-research` — SQLBolt/Mode guest pattern, Nuxt 3 optional auth middleware
- Decision: Option A — open sandbox to guests, no anonymous session entity

## Motivation

Current sandbox requires authentication (`Auth` middleware on all three endpoints). Lesson content is already public via `OptionalAuth`, but the interactive exercise — the core learning experience — is gated behind login. This contradicts the SQLBolt/Mode pattern where learners can start coding immediately without signup. Removing this friction is critical for first-time user conversion.

## Scope

- **In:** Change sandbox API middleware from `Auth` → `OptionalAuth`, add rate limit to sandbox routes, remove `canRun` auth gate from frontend sandbox components
- **Out:** Guest progress/notes (still require auth), anonymous session entity, lesson content changes
- **Non-goal:** Full guest mode with localStorage progress (future enhancement)
