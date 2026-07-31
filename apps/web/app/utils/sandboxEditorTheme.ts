import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'

export type SandboxEditorThemeOptions = {
  minHeight?: string
  /** When true, marks the CM theme dark so baseTheme &dark rules and themeType highlighters apply. */
  dark?: boolean
}

/**
 * Shared CodeMirror chrome so SQL / JS / HTML-CSS sandboxes match theme tokens.
 * Light: soft panel. Dark: elevated code island (GitHub/VS Code pattern).
 */
export function createSandboxEditorTheme(options?: SandboxEditorThemeOptions) {
  const minHeight = options?.minHeight ?? '120px'
  const dark = !!options?.dark
  return EditorView.theme(
    {
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
    },
    { dark },
  )
}

/** Syntax colors via CSS vars so light/dark tokens drive highlighting without remount. */
export function createSandboxHighlight(): Extension {
  const style = HighlightStyle.define([
    { tag: tags.keyword, color: 'var(--color-code-keyword)' },
    { tag: [tags.string, tags.special(tags.string)], color: 'var(--color-code-string)' },
    { tag: tags.comment, color: 'var(--color-code-comment)', fontStyle: 'italic' },
    { tag: [tags.number, tags.bool, tags.null], color: 'var(--color-code-number)' },
    { tag: [tags.typeName, tags.className], color: 'var(--color-code-keyword)' },
    { tag: tags.operator, color: 'var(--color-code-fg)' },
    { tag: tags.meta, color: 'var(--color-code-comment)' },
    { tag: [tags.propertyName, tags.attributeName], color: 'var(--color-code-number)' },
    { tag: tags.tagName, color: 'var(--color-code-keyword)' },
    { tag: tags.definition(tags.variableName), color: 'var(--color-code-fg)' },
  ])
  return syntaxHighlighting(style)
}

/** Chrome + syntax for one appearance; remount editor when `dark` flips. */
export function createSandboxEditorExtensions(options?: SandboxEditorThemeOptions): Extension[] {
  return [createSandboxEditorTheme(options), createSandboxHighlight()]
}
