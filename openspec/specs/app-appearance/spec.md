# App appearance — delta spec

## Scope

Global visual theme for Syntaxia web chrome and shared surfaces. Mintlify IA unchanged.

## Requirements

### ADDED REQ-APP-NOTEBOOK-001 Canvas grid

**When** any authenticated or guest page loads  
**Then** the app canvas shows a subtle graph-paper grid (lower opacity than lesson prose)  
**And** grid works in light and dark themes

### ADDED REQ-APP-NOTEBOOK-002 Shared card chrome

**When** UI uses `.card` or hub/catalog cards  
**Then** border-radius uses `--radius-card`  
**And** surfaces use soft fills / hairline borders consistent with notebook language

### ADDED REQ-APP-NOTEBOOK-003 Heading typography

**When** page or section headings render in shell or hub content  
**Then** they use handwritten/display notebook heading font  
**And** body copy remains Source Sans 3 (or current `--font-body`)

### ADDED REQ-APP-NOTEBOOK-004 Accent coexistence

**When** primary buttons and active nav states render  
**Then** interactive accent remains brand/emerald (or user accent preset)  
**And** pastel tokens are used for decorative surfaces, not as the sole CTA fill

### ADDED REQ-APP-NOTEBOOK-005 Sandbox editor isolation

**When** SQL/JS/HTML sandbox editors render  
**Then** CodeMirror / terminal surfaces stay dark  
**And** only outer panel/toolbar chrome follows notebook styling

### ADDED REQ-APP-NOTEBOOK-006 IA unchanged

**When** learner navigates tracks and lessons  
**Then** sidebar / lesson / TOC / mobile drawer behavior is unchanged  
**And** only visual skin differs from pre-theme chrome

### ADDED REQ-APP-NOTEBOOK-007 No kawaii clutter

**When** theme is applied  
**Then** no sticker, doodle, washi-tape, or mascot decorations are required  
**And** decorative elements remain CSS-only tokens and shapes
