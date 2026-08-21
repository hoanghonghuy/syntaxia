# HTML / CSS sandbox

## Purpose

Locked architecture for HTML/CSS exercises on `html-basics` and `css-basics`: script-free live preview plus server-side structural grading. Learner code is never trusted to mark itself passed.

## Runtime and security

- Preview uses an iframe `srcdoc` assembled from learner HTML and CSS.
- The iframe remains sandboxed with no `allow-scripts` and no `allow-same-origin`.
- HTML and CSS use separate CodeMirror panes when `exercise.mode` is `html`, `css`, or `both`.
- Grading runs on the API from submitted `{ html, css }` against server-side `exercise.expected`.
- Public lesson JSON must not expose `expected` or `solution`.
- Learner JavaScript is never executed in this sandbox.

## Grading contracts

### `htmlTags` — structured HTML

The API parses tags with `golang.org/x/net/html`. A tag specification supports:

- `tag`
- `minCount` and optional `maxCount`
- `requiredAttrs`
- `attrEquals`
- optional top-level `sourceIncludes` for source-only requirements such as doctype
- optional relations:
  - `attributeReference` — e.g. `label.for` must reference an existing `input.id`
  - `sharedAttributeValue` — e.g. at least two radio inputs must share one `name`

Example:

```yaml
expected:
  type: htmlTags
  tags:
    - tag: input
      requiredAttrs: [id, name, type]
      attrEquals:
        type: email
```

### `cssRules` — structured CSS basics

The API strips CSS comments, parses top-level beginner rule blocks, normalizes basic selector whitespace, and verifies declarations on the **required selector**. A property appearing in a comment or on the wrong selector cannot satisfy the contract.

```yaml
expected:
  type: cssRules
  rules:
    - selector: .note
      declarations:
        color: blue
        font-weight: bold
```

The basics parser intentionally does not grade nested at-rules such as `@media`; those belong to a future curriculum/runtime extension.

### Legacy contracts

`htmlIncludes` and `cssIncludes` remain supported for backward compatibility with historical content. New/migrated HTML/CSS V2 lessons should prefer `htmlTags` or `cssRules` whenever the skill is structurally expressible.

## Feedback and curriculum rules

- Starters are incomplete; solutions remain server-side.
- Hints progress from concept -> relevant structure/property -> near-complete correction path.
- HTML V2 grades semantic structure and meaningful attribute relationships where practical.
- CSS V2 grades selector + declaration pairs rather than substring presence.
- Pixel-perfect screenshot comparison is deliberately rejected for basics because it is brittle and environment-dependent.

## Rejected designs

- Reusing the JS worker or SQL sandbox.
- Enabling scripts or same-origin access inside preview.
- Client-only grading.
- Headless-browser screenshot comparison for basics.

## Related

- [`html-css-basics-tracks.md`](./html-css-basics-tracks.md)
- [`it-learning-pedagogy-v2.md`](./it-learning-pedagogy-v2.md)
- [`progress-sandbox-sync.md`](./progress-sandbox-sync.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
