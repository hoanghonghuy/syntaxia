# Auth — delta spec

## REQ-AUTH-001 Register with email

**Given** a valid email and password  
**When** POST `/api/v1/auth/register`  
**Then** user is created with role `learner` and session cookie is set

## REQ-AUTH-002 Login with email

**Given** registered credentials  
**When** POST `/api/v1/auth/login`  
**Then** session cookie is set and user profile is returned

## REQ-AUTH-003 Google OAuth

**Given** Google OAuth is configured  
**When** user completes Google login/register  
**Then** user account is linked or created and session cookie is set

## REQ-AUTH-004 Roles

**Given** an authenticated user  
**When** accessing admin routes  
**Then** only `admin` role is allowed
