/**
 * Japanese JLPT N5 curriculum + map + vocab normalization.
 * Run: node --experimental-strip-types --test scripts/check-japanese-jlpt.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  gradeLanguageExercise,
  isLanguageTrack,
  languageVocabFromLesson,
} from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const SLUGS = [
  'politeness',
  'politeness-checkpoint',
  'politeness-review',
  'people',
  'people-checkpoint',
  'people-review',
  'numbers',
  'number-checkpoint',
  'number-review',
  'family',
  'food-drink',
  'cafe-checkpoint',
  'cafe-review',
  'places',
]

describe('japanese-jlpt curriculum slice', () => {
  it('treats japanese-jlpt as a language track', () => {
    assert.equal(isLanguageTrack('japanese-jlpt'), true)
    assert.equal(isLanguageTrack('japanese-jlpt', 'languages'), true)
  })

  it('normalizes surface/reading and kanji/kana aliases', () => {
    const surface = languageVocabFromLesson({
      exercise: {
        vocab: [{ surface: '水', reading: 'みず', gloss: 'water' }],
      },
    })
    assert.equal(surface.length, 1)
    assert.equal(surface[0].form, '水')
    assert.equal(surface[0].reading, 'みず')
    assert.equal(surface[0].lang, 'ja')

    const alias = languageVocabFromLesson({
      exercise: {
        vocab: [{ kanji: '学校', kana: 'がっこう', gloss: 'school' }],
      },
    })
    assert.equal(alias[0].form, '学校')
    assert.equal(alias[0].reading, 'がっこう')
    assert.equal(alias[0].lang, 'ja')
  })

  it('ships N5 map process doc', () => {
    const map = join(repoRoot, 'docs/processes/japanese-jlpt-n5-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /evanclan\/OpenJLPT/)
    assert.match(body, /politeness/)
  })

  it('ships paired EN/VI V3 nodes for the published slice', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${loc}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
      assert.deepEqual(files.map((f) => f.replace(/\.md$/, '')).sort(), [...SLUGS].sort())
      for (const slug of SLUGS) {
        const raw = read(join(dir, `${slug}.md`))
        assert.match(raw, /track:\s*japanese-jlpt/)
        assert.match(raw, new RegExp(`locale:\\s*${loc}`))
        assert.match(raw, /jlpt_level:\s*n5/)
        assert.match(raw, /^can_do:\s*".+"/m)
        assert.match(raw, /^steps:/m)
        assert.match(raw, /^\s+- type:\s*practice\s*$/m)
        assert.match(raw, /^\s+- type:\s*checkpoint\s*$/m)
        assert.match(raw, /reading:\s*"[^\"]+"/)
      }
    }
  })

  it('grades a published authored answer against itself', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${loc}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        assert.ok(answerMatch, `${loc}/${file} missing answer`)
        assert.equal(gradeLanguageExercise({ answer: answerMatch[1] }, answerMatch[1], 'ja'), true)
      }
    }
  })

  it('placeholder test allows japanese curriculum after map', () => {
    const placeholder = read(join(webRoot, 'scripts/check-languages-placeholder.mjs'))
    assert.match(placeholder, /japanese-jlpt/)
    assert.doesNotMatch(placeholder, /docs\/curriculum\/japanese-jlpt[\s\S]*do not invent/)
  })
})
