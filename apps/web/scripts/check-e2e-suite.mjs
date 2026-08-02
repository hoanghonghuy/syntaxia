/**
 * Meta-check: API/E2E suite scripts exist and are wired.
 * Run: node --test scripts/check-e2e-suite.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..')
const read = (rel) => readFileSync(join(repoRoot, rel), 'utf8')

describe('api-e2e-suite scripts', () => {
  it('ships helper + catalog + languages + orchestrator', () => {
    for (const rel of [
      'scripts/lib/Invoke-SyntaxiaApi.ps1',
      'scripts/e2e-api-catalog.ps1',
      'scripts/e2e-languages.ps1',
      'scripts/e2e-all.ps1',
      'scripts/e2e-sql-fundamentals.ps1',
    ]) {
      assert.equal(existsSync(join(repoRoot, rel)), true, `missing ${rel}`)
    }
  })

  it('catalog smoke asserts language tracks and track query', () => {
    const src = read('scripts/e2e-api-catalog.ps1')
    assert.match(src, /japanese-jlpt/)
    assert.match(src, /english-basics/)
    assert.match(src, /chinese-hsk/)
    assert.match(src, /chinese-it-vocab/)
    assert.match(src, /track=chinese-hsk/)
    assert.match(src, /track=english-basics/)
  })

  it('languages e2e covers progress and notes with track', () => {
    const src = read('scripts/e2e-languages.ps1')
    assert.match(src, /\/progress\//)
    assert.match(src, /\/notes/)
    assert.match(src, /track=/)
  })

  it('e2e-all and release-smoke wire the suite', () => {
    const all = read('scripts/e2e-all.ps1')
    assert.match(all, /e2e-api-catalog\.ps1/)
    assert.match(all, /e2e-sql-fundamentals\.ps1/)
    assert.match(all, /e2e-languages\.ps1/)
    const release = read('scripts/release-smoke.ps1')
    assert.match(release, /e2e-all\.ps1/)
  })

  it('process doc documents the suite', () => {
    const doc = read('docs/processes/e2e-smoke.md')
    assert.match(doc, /e2e-all\.ps1/)
    assert.match(doc, /e2e-languages\.ps1/)
    assert.match(doc, /e2e-api-catalog\.ps1/)
  })
})
