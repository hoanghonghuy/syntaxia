/**
 * Chinese IT vocab specialty curriculum + map.
 * Run: node --experimental-strip-types --test scripts/check-chinese-it-vocab.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  gradeLanguageExercise,
  isLanguageTrack,
} from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const SLUGS = [
  'hardware-software',
  'internet-apps',
  'ai-basics',
  'deep-learning',
  'nlp-basics',
  'tech-hubs',
]

describe('chinese-it-vocab curriculum slice', () => {
  it('treats chinese-it-vocab as a language track', () => {
    assert.equal(isLanguageTrack('chinese-it-vocab'), true)
    assert.equal(isLanguageTrack('chinese-it-vocab', 'languages'), true)
  })

  it('ships specialty map citing szdict', () => {
    const map = join(repoRoot, 'docs/processes/chinese-it-vocab-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /mhagiwara\/szdict/)
    assert.match(body, /hardware-software/)
    assert.match(body, /CC BY-SA/)
  })

  it('ships paired en/vi lessons for mapped slugs only', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-it-vocab/${loc}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
      assert.deepEqual(
        files.map((f) => f.replace(/\.md$/, '')).sort(),
        [...SLUGS].sort(),
      )
      for (const slug of SLUGS) {
        const raw = read(join(dir, `${slug}.md`))
        assert.match(raw, /track:\s*chinese-it-vocab/)
        assert.match(raw, new RegExp(`locale:\\s*${loc}`))
        assert.match(raw, /specialty:\s*it-vocab/)
        assert.match(raw, /source:\s*szdict/)
        assert.match(raw, /type:\s*(mcq|fill_blank)/)
        assert.match(raw, /hanzi:/)
      }
    }
  })

  it('grades each published exercise answer against itself (smoke)', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-it-vocab/${loc}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        const typeMatch = raw.match(/\n\s*type:\s*(mcq|fill_blank)/)
        assert.ok(answerMatch, `${loc}/${file} missing answer`)
        assert.ok(typeMatch, `${loc}/${file} missing type`)
        const exercise = { type: typeMatch[1], answer: answerMatch[1] }
        assert.equal(gradeLanguageExercise(exercise, answerMatch[1]), true)
        assert.equal(gradeLanguageExercise(exercise, 'WRONG'), false)
      }
    }
  })

  it('does not mount IT sandboxes for language tracks', () => {
    const src = read(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'))
    assert.match(src, /v-else-if="lesson\.exercise && !isLanguageTrack/)
  })
})
