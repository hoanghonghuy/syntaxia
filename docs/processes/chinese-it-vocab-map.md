# Chinese IT vocabulary — production mini-course map

## Purpose

Map the open **szdict** (CC BY-SA 3.0) Chinese–English technology vocabulary into a focused Syntaxia specialty-language mini-course. The source controls **term membership**; Syntaxia supplies original communicative situations, explanations, exercises, visuals, and vi/en learning copy.

This track follows **Language V3**. It is not a glossary dump and must not fall back to generic vocabulary MCQs.

## When to use

- Writing or reviewing `docs/curriculum/chinese-it-vocab/`
- Checking whether a proposed term belongs in the current six-lesson scope
- Reviewing semantic visuals, assessed item IDs, or EN/VI parity for the specialty track

## Sources and license

| Source | License | Role |
|--------|---------|------|
| [mhagiwara/szdict](https://github.com/mhagiwara/szdict) `szdict.yml` | CC BY-SA 3.0 | **Primary membership** — every target Hanzi lemma in this mini-course must appear as a `word:` entry (or listed `var:`) in that file |
| [EarsEyesMouth/computerese-cross-references](https://github.com/EarsEyesMouth/computerese-cross-references) | MIT | Optional EN–ZH cross-check and clustering aid |
| [dahlia/cjk-compsci-terms](https://github.com/dahlia/cjk-compsci-terms) | CC BY-SA 4.0 | Optional regional-variant notes; never a replacement for szdict membership |

Do **not** redistribute NC/ND term lists as curriculum dumps. Pinyin follows the mapped source convention with learner-friendly spacing. Explanations, dialogues, exercises, and semantic visuals are original Syntaxia learning content.

**Attribution:** target lemmas are adapted from szdict (CC BY-SA 3.0); share-alike applies to the adapted glossary subset in curriculum frontmatter.

## Locked six-lesson scope

The source is ML/startup/hardware-heavy, so the syllabus follows the vocabulary actually supported by the source rather than inventing a generic operating-system or security course.

| Order | Slug | Workplace Can-Do | Target lemmas | Semantic visual |
|------:|------|------------------|---------------|-----------------|
| 1 | `hardware-software` | Ask whether a simple computer problem is hardware or software and mention the chip | 硬件, 软件, 芯片 | `tech-repair-desk` |
| 2 | `internet-apps` | Follow a WeChat + QR-code login flow and refer to the Internet connection | 互联网, 微信, 扫码 | `qr-code-login` |
| 3 | `ai-basics` | Say a project uses AI/ML and identify its algorithm and model | 人工智能, 机器学习, 算法, 模型 | `ai-project-flow` |
| 4 | `deep-learning` | Report that a model uses deep learning / a neural network and flag overfitting | 深度学习, 神经网络, 训练, 过拟合 | `model-training-monitor` |
| 5 | `nlp-basics` | Explain an NLP project using language-model, word-vector, and context vocabulary | 自然语言处理, 语言模型, 词向量, 上下文 | `nlp-context-window` |
| 6 | `tech-hubs` | Distinguish Shenzhen, Huaqiangbei, Zhongguancun, and the company term 独角兽企业 | 深圳, 华强北, 中关村, 独角兽企业 | `china-tech-hubs` |

Lesson IDs remain `zh-it-{order}-{slug}` and EN/VI files ship together.

## Language V3 authoring contract

Every published specialty lesson must provide one complete guided session:

`scene -> dialogue -> listen -> teach -> contextual practice -> listening assessment -> controlled production -> checkpoint -> scheduled review evidence`

Required properties:

- observable `can_do`, plus explicit `unit_id`, `unit_title`, `unit_order`, `unit_can_do`, `unit_role`
- a semantic `visualKey` with localized `imageAlt`
- natural Mandarin in a believable technology/work action
- at least five stable assessed IDs per locale pair
- at least one `dialogue_choice`, one `audio_choice`, and one `type_answer`
- progressive hints for controlled production
- no authored generic `mcq`
- the same assessed IDs and grading intent in EN and VI
- no external `imageUrl` hotlinks

The fallback `exercise` remains for compatibility but must use a production-oriented V3 type such as `type_answer`, not legacy `mcq` / `fill_blank` authoring.

## Do

- Keep the target-lemma set traceable to this map and its cited source
- Put terminology inside realistic actions: inspect, log in, describe, report, compare, or troubleshoot
- Keep target Mandarin identical across EN/VI while localizing prompts, hints, explanations, and alt text naturally
- Preserve stable assessed IDs because they are review/persistence contracts
- Use app-owned semantic visuals only

## Don't

- Add glossary-only lessons
- Generate a long IT syllabus from terms not supported by the locked source map
- Teach every item through meaning-selection questions
- Treat a decorative image as “visual learning”
- Mix the HSK Band pacing contract into this specialty mini-course
- Copy source definitions or textbook paragraphs into lesson prose

## Verification

Run:

```bash
cd apps/web
npm run test:chinese-it-vocab
npm run test:language-v3
npm run test:language-visuals-v3
```

The Product CI Language V3 gate includes `check-chinese-it-vocab.mjs`, so this specialty track cannot silently regress to legacy quiz authoring.

## Related

- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-specialty-it-vocab.md`](./language-specialty-it-vocab.md)
- [`languages-tracks.md`](./languages-tracks.md)
- `apps/web/app/utils/languageVisual.ts`
- `apps/web/scripts/check-chinese-it-vocab.mjs`
