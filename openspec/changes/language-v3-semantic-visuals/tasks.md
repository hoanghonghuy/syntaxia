# Tasks — language-v3-semantic-visuals

- [x] Add the closed app-owned `visualKey` registry with provenance and safe static-image policy.
- [x] Add `LanguageSemanticVisual.vue` for theme-aware Syntaxia-owned semantic SVG/UI visuals.
- [x] Preserve `visualKey` in scene and image-choice data contracts/parsing.
- [x] Wire semantic visuals into scene and image-choice renderers; hide internal visual choice IDs.
- [x] Add localized accessible names and reject external/static image URLs outside `/language/`.
- [x] Upgrade English A1 greetings EN/VI with semantic scene + stable `greet-scene-1` image choice.
- [x] Add `check-language-visuals-v3.mjs` and wire it into `test:language-v3`.
- [x] Update language content-quality rules and close the verified L2 smoke task.
- [x] Run targeted Node 22 semantic-visual regression: 6/6 pass.
- [x] Verify feature-branch web build/smoke after publishing: Vercel green after the `develop` sync on `870e865`.
