/**
 * Languages category + chinese-hsk track seed (curriculum lessons covered in check-chinese-hsk).
 * Run: node --test scripts/check-languages-placeholder.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('languages category placeholder', () => {
  it('ships migration + init seed for chinese-hsk under languages', () => {
    const mig = join(repoRoot, 'apps/api/migrations/006_languages_tracks.sql')
    assert.equal(existsSync(mig), true, 'missing 006_languages_tracks.sql')
    const sql = read(mig)
    assert.match(sql, /chinese-hsk/)
    assert.match(sql, /'languages'/)
    assert.match(sql, /ON CONFLICT/)

    const init = read(join(repoRoot, 'apps/api/migrations/init.sql'))
    assert.match(init, /chinese-hsk/)
    assert.match(init, /'languages'/)
  })

  it('ships catalog.category.languages in en + vi', () => {
    for (const loc of ['en', 'vi']) {
      const json = JSON.parse(read(join(webRoot, `i18n/locales/${loc}.json`)))
      assert.equal(typeof json.catalog?.category?.languages, 'string', `${loc} missing catalog.category.languages`)
      assert.ok(json.catalog.category.languages.length > 0)
    }
  })

  it('wires 006 and 007 into docker-up and neon migrate lists', () => {
    const dockerUp = read(join(repoRoot, 'scripts/docker-up.ps1'))
    assert.match(dockerUp, /006_languages_tracks\.sql/)
    assert.match(dockerUp, /007_chinese_hsk_band1_copy\.sql/)
    const neon = read(join(repoRoot, 'scripts/db/migrate-neon.ps1'))
    assert.match(neon, /006_languages_tracks\.sql/)
    assert.match(neon, /007_chinese_hsk_band1_copy\.sql/)
  })
})
