/**
 * English Basics CEFR A1 foundation curriculum + map.
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

const SLUGS = [
  'greetings',
  'meeting-checkpoint',
  'meeting-review',
  'people',
  'family',
  'people-checkpoint',
  'people-review',
  'numbers',
  'places',
  'find-way-checkpoint',
  'find-way-review',
  'food-drink',
  'cafe-checkpoint',
  'cafe-review',
  'time-of-day',
  'daily-routine',
  'routine-checkpoint',
  'routine-review',
  'prices',
  'shopping',
  'shopping-checkpoint',
  'shopping-review',
  'home-things',
  'where-things',
  'home-checkpoint',
  'home-review',
  'hobbies',
  'invitations',
  'free-time-checkpoint',
  'free-time-review',
]

const FOUNDATION_UNITS = new Map([
  ['en-a1-meeting-01', 1],
  ['en-a1-people-02', 2],
  ['en-a1-find-way-03', 3],
  ['en-a1-cafe-04', 4],
  ['en-a1-routine-05', 5],
  ['en-a1-shopping-06', 6],
  ['en-a1-home-07', 7],
  ['en-a1-free-time-08', 8],
])

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || '').trim()
}

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

describe('english-basics A1 foundation curriculum', () => {
  it('ships the A1 foundation map process doc', () => {
    const map = join(repoRoot, 'docs/processes/english-basics-a1-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /Council of Europe/i)
    assert.match(body, /ozbonus\/yle-vocabulary-dataset/)
    assert.match(body, /8 units/i)
    assert.match(body, /30 nodes/i)
  })

  it('ships exactly 30 paired EN/VI V3 nodes', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${loc}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
      assert.deepEqual(files.map((f) => f.replace(/\.md$/, '')).sort(), [...SLUGS].sort())

      for (const slug of SLUGS) {
        const raw = read(join(dir, `${slug}.md`))
        assert.match(raw, /track:\s*english-basics/)
        assert.match(raw, new RegExp(`locale:\\s*${loc}`))
        assert.match(raw, /cefr_level:\s*a1/)
        assert.match(raw, /^can_do:\s*".+"/m)
        assert.match(raw, /^unit_id:\s*[a-z0-9-]+\s*$/m)
        assert.match(raw, /^unit_role:\s*(?:lesson|checkpoint|review)\s*$/m)
        assert.match(raw, /^steps:/m)
        assert.match(raw, /^\s+- type:\s*scene\s*$/m)
        assert.match(raw, /^\s+- type:\s*dialogue\s*$/m)
        assert.match(raw, /^\s+- type:\s*listen\s*$/m)
        assert.match(raw, /^\s+- type:\s*practice\s*$/m)
        assert.match(raw, /^\s+- type:\s*checkpoint\s*$/m)
        assert.doesNotMatch(raw, /^\s+kind:\s*mcq\s*$/m, `${loc}/${slug} still authors generic mcq`)
        assert.ok(assessedIds(raw).length >= 5, `${loc}/${slug} needs >=5 stable assessed ids`)

        const unitId = scalar(raw, 'unit_id')
        assert.equal(FOUNDATION_UNITS.has(unitId), true, `${loc}/${slug}: unknown unit ${unitId}`)
        assert.equal(Number(scalar(raw, 'unit_order')), FOUNDATION_UNITS.get(unitId), `${loc}/${slug}: bad unit order`)
      }
    }
  })

  it('keeps assessed identities aligned between EN and VI for every node', () => {
    for (const slug of SLUGS) {
      const en = read(join(repoRoot, `docs/curriculum/english-basics/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/english-basics/vi/${slug}.md`))
      assert.deepEqual(assessedIds(vi), assessedIds(en), `${slug}: assessed IDs drifted between locales`)
      assert.equal(scalar(vi, 'id'), scalar(en, 'id'), `${slug}: lesson id drifted between locales`)
      assert.equal(scalar(vi, 'unit_id'), scalar(en, 'unit_id'), `${slug}: unit id drifted between locales`)
      assert.equal(scalar(vi, 'unit_role'), scalar(en, 'unit_role'), `${slug}: role drifted between locales`)
    }
  })

  it('grades each published fallback exercise answer against itself', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/english-basics/${loc}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        assert.ok(answerMatch, `${loc}/${file} missing answer`)
        assert.equal(gradeLanguageExercise({ answer: answerMatch[1] }, answerMatch[1], 'en'), true)
      }
    }
  })

  it('placeholder test no longer forbids english curriculum', () => {
    const placeholder = read(join(webRoot, 'scripts/check-languages-placeholder.mjs'))
    assert.match(placeholder, /english-basics/)
    assert.doesNotMatch(placeholder, /docs\/curriculum\/english-basics[\s\S]*invent/)
  })

  it('lesson fetch includes track so shared slugs do not collide', () => {
    const api = read(join(webRoot, 'app/composables/useApi.ts'))
    assert.match(api, /lesson:\s*\([^)]*track[^)]*\)[\s\S]*\/lessons\/\$\{slug\}\?[^`]*track=/)
    const page = read(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'))
    assert.match(page, /api\.lesson\([^)]*trackId/)
  })
})
