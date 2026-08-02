# Design — chinese-hsk-band1-expand-2

## Approach

- Same frontmatter/player as existing HSK lessons (`hsk_band: 1`, hanzi+pinyin).
- Ids: `zh-hsk-b1-11-transport`, `zh-hsk-b1-12-devices`.
- No new migration (track copy already “starter path”).
- API restart syncs local curriculum.

## Risks

- Shared slug risk low (new slugs). Still use `?track=chinese-hsk`.
