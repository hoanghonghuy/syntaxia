# Content — delta spec

## REQ-CONTENT-001 Drive sync

**Given** curriculum files in the platform Drive folder (or local dev mirror)  
**When** admin triggers sync  
**Then** lesson metadata and body cache are stored in Postgres

## REQ-CONTENT-002 Catalog

**Given** published lessons  
**When** GET `/api/v1/tracks` and `/api/v1/lessons`  
**Then** tracks and lessons are listed by locale and order

## REQ-CONTENT-003 Admin CRUD

**Given** admin role  
**When** creating/updating/deleting lesson metadata  
**Then** Drive file and Postgres cache stay consistent
