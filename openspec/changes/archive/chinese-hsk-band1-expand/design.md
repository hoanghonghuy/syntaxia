# Design — Chinese HSK Band 1 expand

## Approach

- Reuse language player and frontmatter (`hsk_band: 1`, vocab hanzi/pinyin/gloss).
- Themes chosen from Band 1 categories not yet covered: **question words** and **adjectives/descriptions** (community category framing; membership still leonsilicon level-1).
- Slugs: `questions`, `adjectives` — low collision risk with EN/JA tracks.
- IDs: `zh-hsk-b1-09-questions`, `zh-hsk-b1-10-adjectives`.

## Tests

- Extend `check-chinese-hsk.mjs` expected file count / slug list.
- Update `e2e-api-catalog.ps1` chinese-hsk min lessons 8 → 10.
- Restart API after MD land for sync.
