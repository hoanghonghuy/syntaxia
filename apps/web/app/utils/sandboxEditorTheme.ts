import { EditorView } from '@codemirror/view'

/**
 * Shared CodeMirror chrome so SQL / JS / HTML-CSS sandboxes match theme tokens.
 * Light: soft surface editor. Dark: elevated “code island” (GitHub/VS Code pattern).
 */
export function createSandboxEditorTheme(options?: { minHeight?: string }) {
  const minHeight = options?.minHeight ?? '120px'
  return EditorView.theme({
    '&': {
      fontSize: '0.9rem',
      backgroundColor: 'var(--color-code-bg)',
      color: 'var(--color-code-fg)',
    },
    '.cm-content': {
      fontFamily: 'var(--font-mono)',
      minHeight,
      padding: '0.85rem 1rem',
      caretColor: 'var(--color-brand)',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: 'var(--color-brand)',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--color-code-gutter)',
      borderRight: '1px solid var(--color-code-border)',
      color: 'var(--color-ink-faint)',
      paddingLeft: '0.35rem',
    },
    '.cm-activeLine': {
      backgroundColor: 'color-mix(in srgb, var(--color-brand) 10%, transparent)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'color-mix(in srgb, var(--color-brand) 12%, var(--color-code-gutter))',
      color: 'var(--color-ink-muted)',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
      backgroundColor: 'color-mix(in srgb, var(--color-brand) 28%, transparent) !important',
    },
    '&.cm-focused': {
      outline: '2px solid var(--color-brand)',
      outlineOffset: '-1px',
    },
  })
}
