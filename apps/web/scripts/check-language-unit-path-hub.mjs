/**
 * Language unit path hub chrome.
 * Run: node --test scripts/check-language-unit-path-hub.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('language-unit-path-hub', () => {
  it('ships LanguageUnitPath component', () => {
    const path = join(webRoot, 'app/components/LanguageUnitPath.vue')
    assert.equal(existsSync(path), true)
    const src = read(path)
    assert.match(src, /buildLanguageUnitPath/)
    assert.match(src, /is-locked|locked/)
    assert.match(src, /is-current|current/)
  })

  it('track hub mounts unit path for language tracks', () => {
    const hub = read(join(webRoot, 'app/pages/tracks/[track]/index.vue'))
    assert.match(hub, /LanguageUnitPath/)
    assert.match(hub, /showLanguagePath|isLanguageHub/)
  })

  it('ships path i18n keys in en + vi', () => {
    for (const loc of ['en', 'vi']) {
      const json = JSON.parse(read(join(webRoot, `i18n/locales/${loc}.json`)))
      assert.equal(typeof json.lesson?.unitPath, 'string')
      assert.equal(typeof json.lesson?.unitUpNext, 'string')
      assert.equal(typeof json.lesson?.unitLocked, 'string')
    }
  })
})
