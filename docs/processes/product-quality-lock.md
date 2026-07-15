# Product quality lock (2026-07-11)

## Purpose

Locked product bar and learner UX decisions from owner Q&A. All later work (checklist, research, subagents) must obey this file.

## When to use

- Before any curriculum, IA, sandbox feedback, or i18n polish
- When a subagent starts a checklist item
- When `/opsx-research` would otherwise re-open a settled choice

## Locked answers

| # | Topic | Lock |
|---|--------|------|
| 1 | Audience | Absolute non-tech first (never coded) |
| 2 | Voice (vi/en) | Neutral textbook clarity **plus** professional reference tone (Mode / SQLBolt / Khan-style). Not chatty “AI buddy”, not slang |
| 3 | Lesson depth | Medium-long: concept + visual table + worked example + common mistakes + 2–3 progressive hints + optional reveal solution |
| 4 | Scope | Full product: SQL → then code tracks; **category** + **level** (basic → advanced); not SQL-only forever |
| 5 | First UX priority | Learning path / navigation / progress (then content depth, then sandbox feedback) |
| 6 | On wrong answer | All three: clear fail message + progressive hints + error-aware guidance when possible + reveal solution after N attempts (or explicit button) |
| 7 | Locales | `vi` and `en` same quality, ship together |
| 8 | Execution | Ordered checklist; **one** subagent (or one human slice) at a time; `/opsx-research` before non-trivial direction; **TDD** on every feature/bugfix |

## Learning path IA (research chốt)

Evidence: Duolingo path ([blog](https://blog.duolingo.com/new-duolingo-home-screen-design/)) clarifies “what’s next” but long scroll hurts overview ([UX critique](https://uxdesign.cc/down-the-wrong-path-the-disaster-of-the-latest-duolingo-ui-update-a4cdd1e6ea1c)). Mode uses **Basic → Intermediate → Advanced** sections. SQLBolt uses linear lessons + free skip. Mintlify IA (product baseline) = sidebar + lesson + TOC.

**Choose hybrid (not pure Duolingo path):**

1. **Catalog:** Category → Level (basic / intermediate / advanced) → Track → Lessons  
2. **Home / track hub:** one clear **Continue** (next incomplete lesson) + progress `done/total` + %  
3. **Lesson chrome:** ordered sidebar with completed checks, current highlight, prev/next (keep free revisit inside a track)  
4. **Do not** ship endless gamified path as the only navigation  

Curriculum mapping: SQLBolt-style fundamentals → Mode-style intermediate/advanced (Postgres track), then code categories later.

## Content voice rules

- Teach like a careful instructor: short sentences, define jargon once, spreadsheet analogies for non-tech  
- Avoid filler, hype, emoji clusters, “Let’s dive in!”, “Amazing!”  
- `vi` and `en` both human-edited quality; no machine-translated feel  

## Engineering rules

- TDD: Red → Green → Refactor for features and bug fixes  
- Verify with runnable tests + smoke against local stack when touching API/web  
- Update `docs/processes/` when procedure changes  
- Do not enable Google/Drive until owner asks (email + local curriculum phase still stands)

## Related

- [`product-perfection-checklist.md`](./product-perfection-checklist.md) — ordered execution  
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)  
- [`auth-email-local-phase.md`](./auth-email-local-phase.md)  
- [`product-baseline.md`](./product-baseline.md)
