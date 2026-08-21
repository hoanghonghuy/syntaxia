# Proposal — Language V3 golden units

## Goal

Lock one production-quality communicative unit for each core language before migrating the rest of the curriculum.

The three references are:

- English A1 — meet someone
- Mandarin HSK Band 1 — greet and close a short exchange
- Japanese N5 — ask for an item at a shop

## Required unit shape

Each golden unit contains three path nodes:

`lesson -> checkpoint -> review`

Every node must keep the same stable `unit_id`, localized unit title/Can-Do, explicit `unit_role`, stable assessed IDs, and EN/VI learning-intent parity.

## Quality bar

A golden unit must include:

- a believable communicative situation;
- semantic visual information where it helps inference;
- listening-first input;
- interaction plus controlled recall/production;
- an end-of-unit checkpoint;
- a separate retrieval/review node;
- language-specific form support (English natural chunks, Mandarin Hanzi+pinyin+audio, Japanese reading/register);
- keyboard/mobile/screen-reader-compatible rendering;
- automated regression coverage.

## Non-goal

Do not mass-migrate the remaining language curriculum until all three reference units pass the same integration gate.
