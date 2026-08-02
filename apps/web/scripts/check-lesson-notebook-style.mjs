/**
 * Static gate for lesson notebook CSS theme (OpenSpec lesson-notebook-style).
 * Run: node --test scripts/check-lesson-notebook-style.mjs
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => readFileSync(join(webRoot, rel), 'utf8')

describe('lesson notebook style', () => {
  it('ships pastel + hand tokens (light and dark)', () => {
    const tokens = read('app/assets/css/tokens.css')
    assert.match(tokens, /--color-pastel-blue/)
    assert.match(tokens, /--font-hand/)
    assert.match(tokens, /--radius-pill|--radius-card/)
    assert.match(tokens, /data-theme=['"]dark['"]/)
  })

  it('styles .prose-lesson grid, pill h2, hand h3, code, pre', () => {
    const layout = read('app/assets/css/layout.css')
    assert.match(layout, /\.prose-lesson\s*\{[\s\S]*background-image/)
    assert.match(layout, /\.prose-lesson h2/)
    assert.match(layout, /--font-hand/)
    assert.match(layout, /\.prose-lesson[^\n]*code|prose-lesson code/)
    assert.match(layout, /\.prose-lesson pre|prose-lesson pre/)
  })

  it('imports Playpen Sans', () => {
    const nuxt = read('nuxt.config.ts')
    assert.match(nuxt, /Playpen\+Sans|Playpen Sans/)
  })
})
