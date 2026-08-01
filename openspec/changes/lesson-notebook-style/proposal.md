# Lesson notebook style — digital bullet journal theme for .prose-lesson

Apply digital bullet journal / cheat sheet visual style to lesson content area (`.prose-lesson`) using CSS-only theme. Includes: grid paper background, pastel pill headings (h2/h3), inline code tag highlights, terminal-style code blocks, handwritten font (Playpen Sans) for headings. Keeps Mintlify shell (sidebar + TOC) intact. No backend changes — pure CSS custom properties and Google Fonts import.

## Context

- Change ID: `lesson-notebook-style`
- Flow: `sdd`
- Research: `/syn-research` — CSS grid background, Google Fonts (Playpen Sans), digital journal UI patterns
- Decision: CSS-only theme (option A), no Vue component wrapper, no Go renderer changes

## Motivation

Current `.prose-lesson` is clean but plain — standard prose typography with emerald accent. Learners coming from "studygram" / digital journal culture expect a warmer, more tactile reading experience. The bullet journal style reduces intimidation for non-technical audiences while keeping all existing content and shell intact.

## Scope

- **In:** CSS custom properties (pastel palette, grid background, pill shapes, radius), Google Fonts import (Playpen Sans), `.prose-lesson` style overrides
- **Out:** Shell layout (sidebar, TOC, sandbox), backend markdown renderer, lesson content, Vue component changes
- **Non-goal:** Section card wrapping (future enhancement), diagram/flowchart components, icon decorations
