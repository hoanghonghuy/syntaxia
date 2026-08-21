# Proposal — language-v3-quality-listen

## Problem

Language Learning V3 has the correct high-level pedagogy, but two production gaps remain in the current implementation:

1. `language-learning-pedagogy-v3.md` references a language content quality document that does not exist, so naturalness, visual semantics, audio behavior, and accessibility are not enforced as an authoring contract.
2. Dedicated `listen` steps reveal the transcript immediately after Listen is activated, which defeats the intended listening-first interaction.

Process indexes and the perfection checklist also still describe v2/FSRS as the current state, which can steer later work back toward stale rules.

## Change

- Add a production language-content-quality v3 playbook.
- Make dedicated listen steps audio-first: successful playback keeps text hidden; the learner can reveal it after a listen attempt; unavailable playback reveals text automatically.
- Add regression coverage for the transcript behavior.
- Refresh process/source-of-truth documentation so Language V3 is the active quality arc.

## Non-goals

- No mass curriculum rewrite in this change.
- No visual asset pipeline or golden-unit illustration set yet.
- No true-unit navigation schema yet.
- No speech recognition or handwriting.
