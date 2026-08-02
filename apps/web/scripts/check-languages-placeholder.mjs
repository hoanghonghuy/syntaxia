/**
 * Languages category tracks (HSK + English + JLPT + Chinese IT specialty placeholder).
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

describe('languages category tracks', () => {
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

  it('ships english-basics track seed; curriculum covered by check-english-basics', () => {
    const mig = join(repoRoot, 'apps/api/migrations/008_english_basics_track.sql')
    assert.equal(existsSync(mig), true, 'missing 008_english_basics_track.sql')
    const sql = read(mig)
    assert.match(sql, /english-basics/)
    assert.match(sql, /'languages'/)
    assert.match(sql, /110/)
    assert.match(sql, /ON CONFLICT/)

    const init = read(join(repoRoot, 'apps/api/migrations/init.sql'))
    assert.match(init, /english-basics/)
  })

  it('ships japanese-jlpt track seed; curriculum covered by check-japanese-jlpt', () => {
    const mig = join(repoRoot, 'apps/api/migrations/010_japanese_jlpt_track.sql')
    assert.equal(existsSync(mig), true, 'missing 010_japanese_jlpt_track.sql')
    const sql = read(mig)
    assert.match(sql, /japanese-jlpt/)
    assert.match(sql, /'languages'/)
    assert.match(sql, /120/)
    assert.match(sql, /ON CONFLICT/)

    const init = read(join(repoRoot, 'apps/api/migrations/init.sql'))
    assert.match(init, /japanese-jlpt/)

    const pedagogy = join(repoRoot, 'docs/processes/japanese-jlpt-pedagogy.md')
    assert.equal(existsSync(pedagogy), true, 'missing japanese-jlpt-pedagogy.md')
  })

  it('ships chinese-it-vocab specialty track seed; curriculum covered by check-chinese-it-vocab', () => {
    const mig = join(repoRoot, 'apps/api/migrations/012_chinese_it_vocab_track.sql')
    assert.equal(existsSync(mig), true, 'missing 012_chinese_it_vocab_track.sql')
    const sql = read(mig)
    assert.match(sql, /chinese-it-vocab/)
    assert.match(sql, /'languages'/)
    assert.match(sql, /130/)
    assert.match(sql, /ON CONFLICT/)

    const init = read(join(repoRoot, 'apps/api/migrations/init.sql'))
    assert.match(init, /chinese-it-vocab/)

    const pedagogy = join(repoRoot, 'docs/processes/language-specialty-it-vocab.md')
    assert.equal(existsSync(pedagogy), true, 'missing language-specialty-it-vocab.md')

    const map = join(repoRoot, 'docs/processes/chinese-it-vocab-map.md')
    assert.equal(existsSync(map), true, 'missing chinese-it-vocab-map.md')

    const copyMig = join(repoRoot, 'apps/api/migrations/013_chinese_it_vocab_copy.sql')
    assert.equal(existsSync(copyMig), true, 'missing 013_chinese_it_vocab_copy.sql')
  })

  it('ships catalog.category.languages + jlptN5 + itVocab eyebrow keys in en + vi', () => {
    for (const loc of ['en', 'vi']) {
      const json = JSON.parse(read(join(webRoot, `i18n/locales/${loc}.json`)))
      assert.equal(typeof json.catalog?.category?.languages, 'string', `${loc} missing catalog.category.languages`)
      assert.ok(json.catalog.category.languages.length > 0)
      assert.equal(typeof json.catalog?.jlptN5, 'string', `${loc} missing catalog.jlptN5`)
      assert.equal(typeof json.catalog?.itVocab, 'string', `${loc} missing catalog.itVocab`)
    }
    const hub = read(join(webRoot, 'app/pages/tracks/[track]/index.vue'))
    assert.match(hub, /japanese-jlpt/)
    assert.match(hub, /catalog\.jlptN5/)
    assert.match(hub, /chinese-it-vocab/)
    assert.match(hub, /catalog\.itVocab/)
  })

  it('wires 006–013 into docker-up and neon migrate lists', () => {
    const dockerUp = read(join(repoRoot, 'scripts/docker-up.ps1'))
    assert.match(dockerUp, /006_languages_tracks\.sql/)
    assert.match(dockerUp, /007_chinese_hsk_band1_copy\.sql/)
    assert.match(dockerUp, /008_english_basics_track\.sql/)
    assert.match(dockerUp, /009_english_basics_a1_copy\.sql/)
    assert.match(dockerUp, /010_japanese_jlpt_track\.sql/)
    assert.match(dockerUp, /011_japanese_jlpt_n5_copy\.sql/)
    assert.match(dockerUp, /012_chinese_it_vocab_track\.sql/)
    assert.match(dockerUp, /013_chinese_it_vocab_copy\.sql/)
    const neon = read(join(repoRoot, 'scripts/db/migrate-neon.ps1'))
    assert.match(neon, /006_languages_tracks\.sql/)
    assert.match(neon, /007_chinese_hsk_band1_copy\.sql/)
    assert.match(neon, /008_english_basics_track\.sql/)
    assert.match(neon, /009_english_basics_a1_copy\.sql/)
    assert.match(neon, /010_japanese_jlpt_track\.sql/)
    assert.match(neon, /011_japanese_jlpt_n5_copy\.sql/)
    assert.match(neon, /012_chinese_it_vocab_track\.sql/)
    assert.match(neon, /013_chinese_it_vocab_copy\.sql/)
  })
})
