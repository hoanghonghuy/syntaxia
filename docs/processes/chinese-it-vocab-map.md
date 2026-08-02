# Chinese IT vocabulary — first lesson map

## Purpose

Map open **szdict** (CC BY-SA 3.0) Chinese–English tech terms into the first Syntaxia `chinese-it-vocab` lessons. Authors must not invent term lists outside this map for the MVP slice.

## When to use

- Before adding or publishing a `docs/curriculum/chinese-it-vocab/` lesson
- When reviewing OpenSpec `chinese-it-vocab-mvp` content tasks

## Sources (cited)

| Source | License | Role |
|--------|---------|------|
| [mhagiwara/szdict](https://github.com/mhagiwara/szdict) `szdict.yml` | CC BY-SA 3.0 | **Primary** membership — every hanzi lemma in MVP `vocab` must appear as a `word:` entry (or listed `var:`) in that file |
| [EarsEyesMouth/computerese-cross-references](https://github.com/EarsEyesMouth/computerese-cross-references) | MIT | Optional clustering / EN–ZH cross-check (not required for membership) |
| [dahlia/cjk-compsci-terms](https://github.com/dahlia/cjk-compsci-terms) | CC BY-SA 4.0 | Optional regional-variant notes — do not replace szdict membership |

**Rule:** Do **not** redistribute NC/ND lists (e.g. ITEC BY-NC-ND, Synced AI BY-NC-SA) as curriculum dumps.

Glosses and explain prose are original Syntaxia copy (en/vi). Pinyin follows szdict romanization (normalized spacing for learner UI).

**Attribution:** Term lemmas adapted from szdict (CC BY-SA 3.0). Share-alike applies to adapted glossary subsets in curriculum frontmatter.

## First slice (6 lessons)

szdict is ML/startup/hardware-leaning — themes follow **what the dictionary contains**, not a generic OS/security syllabus.

| Order | Slug | Theme | Target lemmas (szdict `word`) |
|------:|------|-------|-------------------------------|
| 1 | `hardware-software` | Hardware & software | 硬件, 软件, 芯片 |
| 2 | `internet-apps` | Internet & apps | 互联网, 微信, 扫码 |
| 3 | `ai-basics` | AI basics | 人工智能, 机器学习, 算法, 模型 |
| 4 | `deep-learning` | Deep learning | 深度学习, 神经网络, 训练, 过拟合 |
| 5 | `nlp-basics` | Language & NLP | 自然语言处理, 语言模型, 词向量, 上下文 |
| 6 | `tech-hubs` | China tech hubs | 深圳, 华强北, 中关村, 独角兽企业 |

Lesson ids: `zh-it-{order}-{slug}` (e.g. `zh-it-01-hardware-software`). Locales: `en` + `vi` paired files.

Frontmatter: `specialty: it-vocab`, `source: szdict`.

## Do

- Cite this map in PRs that add specialty lessons
- Keep paired en/vi; language player only (no sandboxes)
- Prefer lemmas present in `szdict.yml`
- Lessons use **`steps`** per [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)

## Don't

- Invent hardware/OS/security outlines not covered by cited membership
- Copy textbook paragraphs
- Mix HSK Band pacing into this track
- Add glossary-only lessons without `steps`

## Related

- [`language-specialty-it-vocab.md`](./language-specialty-it-vocab.md)
- [`languages-tracks.md`](./languages-tracks.md)
- OpenSpec: `openspec/changes/archive/chinese-it-vocab-mvp/`
