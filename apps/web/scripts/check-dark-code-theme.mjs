/**
 * Dark-mode code island tokens + shared sandbox editor theme.
 * Run: node --test scripts/check-dark-code-theme.mjs
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => readFileSync(join(root, rel), 'utf8')

describe('dark code theme', () => {
  it('defines code island tokens in light and dark', () => {
    const tokens = read('app/assets/css/tokens.css')
    for (const name of [
      '--color-code-bg',
      '--color-code-fg',
      '--color-code-border',
      '--color-code-gutter',
      '--color-code-keyword',
      '--color-code-string',
      '--color-code-comment',
      '--color-code-number',
    ]) {
      assert.ok(tokens.includes(name), `missing ${name}`)
    }
    assert.match(tokens, /html\[data-theme='dark'\][\s\S]*--color-code-bg:\s*#0d1117/)
    assert.match(tokens, /html\[data-theme='dark'\][\s\S]*--notebook-grid-opacity:\s*0\.2/)
  })

  it('lesson fences and textarea fallbacks use code tokens', () => {
    const layout = read('app/assets/css/layout.css')
    assert.match(layout, /\.prose-lesson pre \{[\s\S]*background:\s*var\(--color-code-bg\)/)
    assert.match(layout, /\.sandbox-editor \{[\s\S]*background:\s*var\(--color-code-bg\)/)
    assert.doesNotMatch(
      layout,
      /html\[data-theme='dark'\] \.prose-lesson pre \{[\s\S]*surface-soft/,
    )
  })

  it('sandbox theme helper marks dark and ships syntax highlighting', () => {
    const themeUtil = read('app/utils/sandboxEditorTheme.ts')
    assert.ok(themeUtil.includes('createSandboxEditorTheme'))
    assert.ok(themeUtil.includes('createSandboxHighlight'))
    assert.ok(themeUtil.includes('createSandboxEditorExtensions'))
    assert.match(themeUtil, /const dark = !!options\?\.dark/)
    assert.ok(themeUtil.includes('{ dark }') || themeUtil.includes('{ dark:'), 'EditorView.theme must pass dark option')
    assert.ok(themeUtil.includes('syntaxHighlighting'))
    assert.ok(themeUtil.includes('var(--color-code-keyword)'))
  })

  it('sandboxes remount editor when appearance resolves and share theme helper', () => {
    for (const file of [
      'app/components/SqlSandbox.vue',
      'app/components/JsSandbox.vue',
      'app/components/HtmlCssSandbox.vue',
    ]) {
      const src = read(file)
      assert.ok(src.includes('createSandboxEditorExtensions'), `${file} must use shared extensions`)
      assert.ok(src.includes('useTheme'), `${file} must read appearance`)
      assert.ok(/:key="[^"]*editorAppearance/.test(src) || /:key="`[^`]*\$\{editorAppearance\}/.test(src), `${file} must key Codemirror on theme so dark flag applies`)
      assert.ok(!src.includes("backgroundColor: 'var(--color-surface-soft)'"), `${file} must not hardcode surface-soft editor`)
    }
  })
})
