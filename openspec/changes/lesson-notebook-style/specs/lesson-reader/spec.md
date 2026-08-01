# Lesson reader appearance — delta spec

## Scope

`.prose-lesson` visual theme within the lesson page (`tracks/[track]/lessons/[slug].vue`).

## Requirements

### ADDED REQ-LESSON-APPEARANCE-001 Grid paper background

**When** lesson content renders  
**Then** `.prose-lesson` shows a subtle grid paper background (24px cells, hairline color)  
**And** the grid is visible in both light and dark themes

### ADDED REQ-LESSON-APPEARANCE-002 Pill headings

**When** lesson content contains `h2` elements  
**Then** each `h2` renders as an inline pill with pastel blue background, rounded ends, thin border  
**And** uses handwritten font (Playpen Sans)

### ADDED REQ-LESSON-APPEARANCE-003 Handwritten h3

**When** lesson content contains `h3` elements  
**Then** each `h3` uses handwritten font (Playpen Sans) without pill background

### ADDED REQ-LESSON-APPEARANCE-004 Inline code tags

**When** lesson content contains inline `code` elements  
**Then** each renders with pastel yellow background, rounded corners, thin border

### ADDED REQ-LESSON-APPEARANCE-005 Terminal block radius

**When** lesson content contains `pre` blocks  
**Then** border-radius matches card radius (16px)

### ADDED REQ-LESSON-APPEARANCE-006 Section spacing

**When** multiple `h2` sections exist  
**Then** generous top margin separates sections visually  
**And** first `h2` has no extra top margin

### ADDED REQ-LESSON-APPEARANCE-007 Dark mode

**When** `data-theme='dark'` is active  
**Then** pastel colors desaturate for readable contrast  
**And** grid background uses darker hairline  
**And** all text remains legible

### ADDED REQ-LESSON-APPEARANCE-008 Shell isolation

**When** notebook style is applied  
**Then** sidebar, TOC, sandbox panel, prev/next pager are unchanged  
**And** only `.prose-lesson` scope is affected
