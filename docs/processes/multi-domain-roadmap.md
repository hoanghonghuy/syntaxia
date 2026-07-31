# Multi-domain learning platform roadmap

## Purpose

Complete plan for Syntaxia as **one app, multiple learning domains**: IT first (shipping), Languages next (Chinese → more), then additional domains — without mixing pedagogies or inventing curricula.

## When to use

- Prioritizing work after domain IA + languages placeholder
- Opening an OpenSpec change for languages / domain maturity
- Deciding what to pull from Talkory vs design in Syntaxia

## North star

```
Syntaxia (one product, one account, shared shell)
├── Domain: IT          — sandboxes, MD curriculum, Continue/progress as today
├── Domain: Languages   — HSK-first pedagogy (Talkory-inspired), UI locale vi/en explains
└── Domain: … later     — same pattern: domain → category → track → lessons
```

**Hard rules (locked):**

1. One app; Mintlify-style chrome shared.
2. Domain UI ≠ lesson pedagogy — language players must not clone SQL/JS sandboxes.
3. Do not invent outlines — map public curricula (HSK 3.0, etc.).
4. Placeholder / under-development before empty lesson spam.
5. Talkory is a **spec reference**, not a wholesale code merge, until an OpenSpec change says otherwise.

---

## Current state (done)

| Layer | Status |
|-------|--------|
| IT catalog (SQL / web / code) + sandboxes | Shipping |
| Domain IA (home cards, `/tracks?domain=`) | Shipping — [`learning-domains.md`](./learning-domains.md) |
| Languages category + `chinese-hsk` placeholder | Shipping — [`languages-tracks.md`](./languages-tracks.md), migration `006` |
| Dark code islands + CM theme | Shipping |
| DB `domain` column | **Not yet** (map in `learningDomains.ts`) |

---

## Phased plan

### Phase 0 — Stabilize what just shipped (short)

**Goal:** Domain IA + placeholder feel intentional; prod/local parity.

| # | Work | Done when |
|---|------|-----------|
| 0.1 | Apply `006_languages_tracks.sql` on Neon/prod (if not yet) | `chinese-hsk` in API tracks |
| 0.2 | Smoke: home domains → IT catalog → Languages hub coming soon | Manual + hard-refresh |
| 0.3 | Optional UX polish: domain-scoped Continue, progress domain filter tabs | Tests green |
| 0.4 | Commit/PR the domain + languages + dark-code batch if still uncommitted | Reviewable diff |

**Out of scope:** HSK lessons, SRS, AI tutor.

---

### Phase 1 — Domain IA maturity (optional, before languages content)

**Goal:** Orientation scales when a 3rd domain appears; less “chip soup”.

| # | Work | Notes |
|---|------|-------|
| 1.1 | Persist last domain (`localStorage`) | Soft default for `/tracks` |
| 1.2 | Progress hub filter by domain | IT vs Languages progress lists |
| 1.3 | Search scoped by domain (or clear domain badge on results) | Avoid SQL results when browsing languages |
| 1.4 | Decide URL polish: keep `?domain=` vs `/it` + `/languages` hubs | Research already favors query first; routes later |
| 1.5 | Optional DB column `tracks.domain` | Only if map becomes messy |

**OpenSpec:** `learning-domains-ia` (retro-spec if code already landed) or small follow-ups.

---

### Phase 2 — Languages pedagogy foundation (research → design)

**Goal:** Lock *how* Chinese is learned in Syntaxia before writing lessons.

| # | Work | Gate |
|---|------|------|
| 2.1 | `/opsx-research` (or `/syn-research`): HSK 3.0 map, lesson unit shape, SRS yes/no for v1, writing/stroke scope | Single recommended approach |
| 2.2 | Compare Talkory blocks (vocab / grammar / reading / writing / IT-specialty) vs Syntaxia MVP language slice | Chốt scope cắt nhỏ |
| 2.3 | Target × explain languages: learn **zh** with UI **vi/en**; later **en** with vi/zh | Product rule in process doc |
| 2.4 | `/opsx-propose language-lesson-player` (or similar) | Spec + design + tasks |
| 2.5 | Content pipeline: MD vs DB-driven (Talkory is DB; Syntaxia IT is MD) — pick one for languages v1 | Research + lock |

**Do not start Phase 3 until 2.1–2.4 accepted.**

---

### Phase 3 — Chinese (HSK) vertical slice

**Goal:** First real language track learners can complete end-to-end (narrow).

Suggested vertical (adjust after Phase 2 research):

1. HSK 1 unit outline mapped (not invented) — limited lessons.
2. Language lesson player (blocks: explain + practice) — **not** SQL sandbox.
3. Progress/completion reuse existing progress APIs where possible.
4. Track hub / Continue work inside `domain=languages`.
5. en+vi UI strings; lesson explain locale = UI locale.

**Deferred in Phase 3 (unless research says must-have):** full FSRS, stroke-order canvas, AI tutor, monetization, JLPT.

---

### Phase 4 — Languages expansion

| Order | Item |
|-------|------|
| 4.1 | More HSK bands / units after HSK 1 slice is solid |
| 4.2 | Placeholder → real **English** track (learn EN with vi/zh explain) |
| 4.3 | Optional JP (JLPT) if still desired — Talkory dual-lang heritage |
| 4.4 | Specialty language tracks (e.g. IT vocab) only after core path exists |

---

### Phase 5 — More domains (beyond IT + Languages)

**Pattern only — do not pre-build content:**

1. Add domain id to `LEARNING_DOMAIN_IDS` + i18n + home card.
2. Map categories → domain.
3. Placeholder track(s) with under-development.
4. Pedagogy research per domain (never assume sandbox).

Examples (not committed): Design, Cloud, Career — only when owner prioritizes.

---

## OpenSpec change sequence (recommended)

```
[done-ish] languages placeholder + domain IA (code)
    → optional: /opsx-propose learning-domains-ia (archive/sync specs)
    → /opsx-research language pedagogy
    → /opsx-propose chinese-hsk-mvp (player + first units)
    → /opsx-apply → /opsx-verify → archive
    → later: english-track / hsk-expansion / domain-N
```

Active unrelated openspec folders may still exist (`js-code-sandbox`, `guest-sandbox-access`, `lesson-notebook-style`) — finish or archive those separately so they do not block languages.

---

## Dependencies & risks

| Risk | Mitigation |
|------|------------|
| Mixing sandboxes into language lessons | Process lock + OpenSpec “Don't” |
| Inventing HSK outlines | Map HSK 3.0 / open datasets only |
| Scope explosion (Talkory full merge) | Phase 2 cut; vertical slice Phase 3 |
| Progress/Continue confusion across domains | Phase 1.2–1.3 |
| Neon missing `006` | Phase 0.1 |

---

## Success metrics (lightweight)

- Learner can name and enter **IT** vs **Languages** without confusion.
- Languages hub never shows fake empty lessons.
- First HSK slice: complete one unit with clear next step.
- Adding a 3rd domain needs **config + i18n**, not a home rewrite.

---

## Do / Don't

### Do

- One phase at a time; research before pedagogy code
- Keep IT quality bar while languages grow
- Update this file when a phase’s approach is locked

### Don't

- Build SRS + AI + stroke + HSK 1–6 in one change
- Put language tracks back into a flat SQL/Web/Code chip row
- Copy copyrighted textbook content

## Related

- [`learning-domains.md`](./learning-domains.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- Talkory: `docs/spec/overview.md`, `content-strategy.md`
