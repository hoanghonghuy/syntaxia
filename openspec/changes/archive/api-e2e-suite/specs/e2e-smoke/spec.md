# E2E / API smoke — delta spec

## ADDED REQ-E2E-001 Catalog API gate

Release/local smoke must assert IT + Languages tracks exist and language tracks expose mapped lesson counts.

## ADDED REQ-E2E-002 Track-scoped lesson fetch

Smoke must prove colliding slugs return different lesson ids when `track` differs.

## ADDED REQ-E2E-003 Languages learning flow

Smoke must register, fetch a language lesson with `track`, set progress, and create a note with `track`.

## ADDED REQ-E2E-004 Single orchestrator

`scripts/e2e-all.ps1` runs SQL + catalog + languages gates fail-closed; release-smoke includes them.
