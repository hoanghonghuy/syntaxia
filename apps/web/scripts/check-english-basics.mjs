/**
 * English Basics CEFR A1 curriculum + map.
 * Run: node --experimental-strip-types --test scripts/check-english-basics.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { gradeLanguageExercise } from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const SLUGS = ['greetings', 'people', 'numbers', 'family', 'food-drink', 'places']

describe('english-basics curriculum slice', () => {
  it('ships A1 map process doc', () => {
    const map = join(repoRoot, 'docs/processes/english-basics-a1-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /ozbonus\/yle-vocabulary-dataset/)
    assert.match(body, /greetings/)
  })

  it('ships paired en/vi lessons for mapped slugs only', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${loc}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
      assert.deepEqual(
        files.map((f) => f.replace(/\.md$/, '')).sort(),
        [...SLUGS].sort(),
      )
      for (const slug of SLUGS) {
        const raw = read(join(dir, `${slug}.md`))
        assert.match(raw, /track:\s*english-basics/)
        assert.match(raw, new RegExp(`locale:\\s*${loc}`))
        assert.match(raw, /cefr_level:\s*a1/)
        assert.match(raw, /type:\s*(mcq|fill_blank)/)
        assert.match(raw, /word:/)
      }
    }
  })

  it('grades each published exercise answer against itself (smoke)', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${loc}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        const typeMatch = raw.match(/\n\s*type:\s*(mcq|fill_blank)/)
        assert.ok(answerMatch, `${loc}/${file} missing answer`)
        assert.ok(typeMatch, `${loc}/${file} missing type`)
        const exercise = { type: typeMatch[1], answer: answerMatch[1] }
        assert.equal(gradeLanguageExercise(exercise, answerMatch[1]), true)
      }
    }
  })

  it('placeholder test no longer forbids english curriculum', () => {
    const placeholder = read(join(webRoot, 'scripts/check-languages-placeholder.mjs'))
    assert.match(placeholder, /english-basics/)
    assert.doesNotMatch(
      placeholder,
      /docs\/curriculum\/english-basics[\s\S]*invent/,
    )
  })

  it('lesson fetch includes track so shared slugs do not collide with chinese-hsk', () => {
    const api = read(join(webRoot, 'app/composables/useApi.ts'))
    assert.match(
      api,
      /lesson:\s*\([^)]*track[^)]*\)[\s\S]*\/lessons\/\$\{slug\}\?[^`]*track=/,
    )
    const page = read(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'))
    assert.match(page, /api\.lesson\([^)]*trackId/)
  })
})
