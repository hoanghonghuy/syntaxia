# Learning shell IA — delta spec

## Scope

Mobile/desktop shell footers, home density, lesson page section order, progress/notes hub density. Mintlify desktop sidebar+TOC retained.

## Requirements

### MODIFIED REQ-SHELL-FOOTER-001 Four-tab mobile footer

**When** learner uses mobile viewport (`<1100px`)  
**Then** both default and learn shells show at most four primary footer tabs  
**And** tabs are Tracks, Search (or Lessons in track context), Progress, and Account/Login  
**And** Home and Notes are not footer tabs

### ADDED REQ-SHELL-FOOTER-002 Guest-aware account tab

**When** user is unauthenticated  
**Then** the account footer/header control links to login (with safe redirect)  
**When** user is authenticated  
**Then** it links to `/account`

### ADDED REQ-SHELL-NAV-003 Single lesson-nav affordance

**When** on a track hub or lesson on mobile  
**Then** only one primary control opens the lesson sidebar  
**And** duplicate “open lessons” buttons are not shown alongside that control

### MODIFIED REQ-HOME-004 Slim home composition

**When** guest or learner opens `/`  
**Then** first viewport emphasizes brand, one headline, one short support line, and one primary CTA  
**And** home does not dump the full multi-category track catalog  
**And** full browse remains on `/tracks`

### MODIFIED REQ-LESSON-005 Section rhythm

**When** a lesson with exercise renders  
**Then** content order is prose → sandbox → pager/complete → notes or compact auth prompt  
**And** mark-complete is not buried only inside the notes card as the sole progress action adjacent to notes fields

### ADDED REQ-LESSON-006 Mobile objectives

**When** TOC rail is hidden (`<1100px`) and lesson has objectives  
**Then** objectives are visible in the main column near the title

### MODIFIED REQ-HUB-007 Progress and notes friendliness

**When** guest opens progress or notes  
**Then** copy offers a clear path to tracks/login without feeling like a hard wall only  
**When** authenticated user opens progress  
**Then** hub prioritizes summary and continue/track links over a single mega-list of every lesson when redundant
