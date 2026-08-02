# Language specialty — Chinese IT vocabulary (locked for Syntaxia Phase 4.4)

## Purpose

Locked decisions for a **specialty** languages track: Chinese IT/tech terminology with vi/en explain — after core HSK / English / JLPT paths exist. Completes research gate for Phase 4.4 of [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).

## When to use

- Before `/syn-propose` for `language-specialty-it-vocab` content MVP
- When mapping IT term lists into thematic lessons
- When tempted to invent bilingual glossaries without citation

## Research inputs (2026-08-02)

| Source | License | Takeaway |
|--------|---------|----------|
| [mhagiwara/szdict](https://github.com/mhagiwara/szdict) | CC BY-SA 3.0 | Dedicated EN↔ZH **tech terms** YAML — primary cite for specialty mapping |
| [EarsEyesMouth/computerese-cross-references](https://github.com/EarsEyesMouth/computerese-cross-references) | MIT | Broad CS/IT EN–ZH glossary — membership / clustering cross-check |
| [dahlia/cjk-compsci-terms](https://github.com/dahlia/cjk-compsci-terms) | CC BY-SA 4.0 | CJK CS term **comparison** (regional variants) — optional for gloss notes |
| [jeffreybaoshenlee/IT-Terms-EN-CN](https://github.com/jeffreybaoshenlee/IT-Terms-EN-CN) | CC BY-NC-ND 4.0 | **Do not** use as redistribution source (NC/ND) |
| Synced AI terminology DB | CC BY-NC-SA | **Avoid** for commercial product redistribution |
| Syntaxia today | — | Language player; tracks under `languages`; explain = app `vi`/`en` |

## Locked approach (chốt)

### 1. Product shape

- Track id: **`chinese-it-vocab`** (category `languages`, sort_order **130**).
- UI label: specialty / IT vocab (not HSK band).
- **Target language:** Mandarin simplified lemmas (hanzi + pinyin) for IT terms.
- **Explain:** `vi` + `en` (same as other language tracks).
- Reuse language player (`text` + `vocab` + `exercise`); **never** mount SQL/JS/HTML sandboxes.

### 2. Curriculum rule

- Do **not** invent term lists — map from **szdict** (primary) and optionally MIT computerese for clustering; document URLs + licenses in a future `chinese-it-vocab-map.md`.
- Author original explain prose; do not paste textbook chapters.
- First content MVP: **6** thematic lessons — see [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md).
- Path: `docs/curriculum/chinese-it-vocab/{en,vi}/`.

### 3. What not to do

- Do not ship NC/ND lists as redistributed curriculum dumps.
- Do not mix HSK Band pacing with specialty IT dump.
- Do not create a separate product domain — stay under Languages.

## Comparison (research)

| Option | Pros | Cons |
|--------|------|------|
| A. English-only IT vocab track | Fits EN learners | Overlaps CEFR track; weaker “specialty” vs HSK heritage |
| B. Full ITEC / NC dumps | Large coverage | License blocks commercial reuse |
| **C. Placeholder + szdict/MIT-mapped Chinese IT track** | Fits Syntaxia; share-alike/MIT OK | Content delayed until map |

**Chốt: Option C** (placeholder shipped; content MVP via `chinese-it-vocab-mvp`).

## Related

- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) Phase 4.4
- OpenSpec archive: `openspec/changes/archive/language-specialty-it-vocab/`; main: `openspec/specs/language-specialty/`
