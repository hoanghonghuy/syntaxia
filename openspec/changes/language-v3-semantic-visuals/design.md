# Design — language-v3-semantic-visuals

## Visual identity

Curriculum refers to reusable semantic visuals by `visualKey`, not by a remote URL. The registry in `languageVisual.ts` defines each supported key together with:

- visual kind (`scene` or `choice`)
- provenance (`syntaxia-original` for the initial set)
- a short, durable description of the learning signal

A published key is part of the curriculum contract. Its meaning should remain stable across visual polish.

## Renderer

`LanguageSemanticVisual.vue` owns the initial visual vocabulary as inline SVG/UI. It uses product theme tokens instead of hard-coded photographic assets, so visuals remain app-owned, small, dark-mode-compatible, and deterministic.

Scene behavior:

1. If `scene.visualKey` exists in the registry, render the semantic component with localized `imageAlt`.
2. Otherwise, allow `scene.imageUrl` only when it is an app-owned `/language/` path.
3. Invalid/external image URLs are not rendered.

Image-choice behavior:

1. `choiceMedia[].visualKey` is preferred.
2. Internal `value` remains the stable grading key but is hidden from sighted UI when a visual is present.
3. The choice button receives localized `choiceMedia[].alt` as its accessible name.
4. The nested semantic vector/static image is decorative inside that already-labeled button, preventing duplicate announcements.
5. Static image fallback follows the same `/language/` restriction.

## Accessibility

Alternative text describes the same observable information available to a sighted learner. It must not intentionally withhold essential information from assistive-technology users. If a visual task cannot be made equivalent without fundamentally changing the difficulty, author an equivalent non-visual assessment instead.

## Golden lesson

English A1 greetings is the first vertical slice:

- scene `classmates-meeting`
- assessed item `greet-scene-1`
- three semantic choices: meeting / leaving / studying
- identical stable IDs and visual keys in EN/VI
- localized scene and choice descriptions

This proves the complete authoring → parser → renderer → assessment path before visual coverage expands.

## Static asset policy

Future non-vector assets may live under `/language/` with explicit provenance/license documentation. Hotlinks, protocol-relative URLs, and traversal paths are rejected by the v3 renderer and regression gate.
