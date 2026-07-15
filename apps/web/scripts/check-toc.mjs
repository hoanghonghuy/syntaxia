/**
 * Node test for extractToc (no vitest in this package).
 * Run: node --experimental-strip-types --test scripts/check-toc.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { extractToc } from '../app/utils/toc.ts'

describe('extractToc', () => {
  it('returns empty for empty or missing html', () => {
    assert.deepEqual(extractToc(''), [])
    assert.deepEqual(extractToc(undefined), [])
  })

  it('extracts h2 and h3 with ids in document order', () => {
    const html = [
      '<p>intro</p>',
      '<h2 id="try-it">Try it</h2>',
      '<p>body</p>',
      '<h3 id="common-mistakes">Common mistakes</h3>',
      '<h2 id="exercise">Exercise</h2>',
    ].join('')
    assert.deepEqual(extractToc(html), [
      { id: 'try-it', text: 'Try it', level: 2 },
      { id: 'common-mistakes', text: 'Common mistakes', level: 3 },
      { id: 'exercise', text: 'Exercise', level: 2 },
    ])
  })

  it('skips headings without id', () => {
    const html = '<h2>No id</h2><h2 id="ok">Ok</h2>'
    assert.deepEqual(extractToc(html), [{ id: 'ok', text: 'Ok', level: 2 }])
  })

  it('strips nested tags from heading text', () => {
    const html = '<h2 id="select"><code>SELECT</code> basics</h2>'
    assert.deepEqual(extractToc(html), [
      { id: 'select', text: 'SELECT basics', level: 2 },
    ])
  })

  it('ignores h1 and h4', () => {
    const html =
      '<h1 id="title">Title</h1><h2 id="a">A</h2><h4 id="x">X</h4>'
    assert.deepEqual(extractToc(html), [{ id: 'a', text: 'A', level: 2 }])
  })
})
