# Proposal: Syntaxia MVP

## Problem

Need a mobile-first IT learning platform starting with SQL: lesson reader, progress tracking, admin content management, and an interactive SQL sandbox — without inventing curriculum from scratch.

## Solution

Monorepo (`apps/web` Nuxt 4 + Pinia + i18n, `apps/api` Go Gin + pgx) with:

- Auth (email/password + Google OAuth), roles `admin` / `learner`
- Curriculum Markdown on Google Drive (platform folder) with Postgres metadata cache
- Lesson reader, progress, notes CRUD
- Postgres-backed SQL sandbox (TEMP seed, grade)
- Mintlify-inspired design tokens and mobile-first layout
- Tracks: SQL Fundamentals → PostgreSQL (basic → advanced)

## Out of scope (phase 1)

- Full PostgreSQL track content
- Learner personal Drive sync
- Gamification / leaderboards
- Locales beyond vi/en
