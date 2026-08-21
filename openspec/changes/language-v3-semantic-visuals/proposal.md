# Proposal — language-v3-semantic-visuals

## Why

Language v3 already has `scene.imageUrl` and `image_choice`, but the published curriculum is still effectively text-first and has no stable visual asset contract. External image URLs would create provenance, availability, theme, and accessibility problems.

## Change

- Introduce a closed app-owned `visualKey` registry with provenance and learning-signal metadata.
- Render reusable semantic visuals as Syntaxia-owned SVG/UI through `LanguageSemanticVisual.vue`.
- Make `visualKey` the preferred scene and image-choice authoring path.
- Restrict legacy/static `imageUrl` fallback to app-owned `/language/` paths.
- Hide internal image-choice IDs when a visual is available and expose localized equivalent accessible names.
- Upgrade English A1 greetings EN/VI as the first golden visual lesson with both a semantic scene and a real `image_choice` item.
- Add regression coverage for registry stability, parser preservation, renderer wiring, locale parity, and external-image rejection.

## Out of scope

- Mass-adding images to every lesson
- Photographic/third-party asset ingestion
- True communicative unit metadata/path (L4)
- Full English/Mandarin/Japanese golden units (L5)
