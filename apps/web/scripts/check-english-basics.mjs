/**
 * English Basics CEFR A1 language foundation curriculum + map.
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
  'sound-spelling',
  'vowel-contrasts',
  'consonant-clarity',
  'word-stress',
  'sentence-melody',
  'core-sentences',
  'basic-questions',
  'foundation-checkpoint',
  'foundation-review',
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
  ['en-a1-foundation-00', 0],
  ['en-a1-meeting-01', 1],
  ['en-a1-people-02', 2],
  ['en-a1-find-way-03', 3],
  ['en-a1-cafe-04', 4],
  ['en-a1-routine-05', 5],
  ['en-a1-shopping-06', 6],
  ['en-a1-home-07', 7],
  ['en-a1-free-time-08', 8],
])

const FOUNDATION_SLUGS = [
  'sound-spelling',
  'vowel-contrasts',
  'consonant-clarity',
  'word-stress',
  'sentence-melody',
  'core-sentences',
  'basic-questions',
  'foundation-checkpoint',
  'foundation-review',
]

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || '').trim()
}

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

describe('english-basics A1 language foundation curriculum', () => {
  it('ships a foundation-first CEFR A1 source map', () => {
    const map = join(repoRoot, 'docs/processes/english-basics-a1-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /Council of Europe/i)
    assert.match(body, /CEFR Companion Volume 2020/i)
    assert.match(body, /phonological/i)
    assert.match(body, /core grammar/i)
    assert.match(body, /Vocabulary/i)
    assert.match(body, /9 units/i)
    assert.match(body, /39 nodes/i)
    assert.match(body, /sound.*spelling/i)
    assert.match(body, /vowel/i)
    assert.match(body, /consonant/i)
    assert.match(body, /word stress/i)
    assert.match(body, /subject pronouns/i)
    assert.match(body, /Do you like/i)
    assert.match(body, /ozbonus\/yle-vocabulary-dataset/)
  })

  it('ships exactly 39 paired EN/VI V3 nodes', () => {
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
        assert.match(
          raw,
          /^\s+kind:\s*(?:type_answer|order_words|listen_type)\s*$/m,
          `${loc}/${slug} missing controlled recall/production`,
        )
        assert.doesNotMatch(raw, /^\s+kind:\s*mcq\s*$/m, `${loc}/${slug} still authors generic mcq`)
        assert.ok(assessedIds(raw).length >= 5, `${loc}/${slug} needs >=5 stable assessed ids`)

        const unitId = scalar(raw, 'unit_id')
        assert.equal(FOUNDATION_UNITS.has(unitId), true, `${loc}/${slug}: unknown unit ${unitId}`)
        assert.equal(Number(scalar(raw, 'unit_order')), FOUNDATION_UNITS.get(unitId), `${loc}/${slug}: bad unit order`)
      }
    }
  })

  it('locks Unit 0 as pronunciation -> grammar -> checkpoint -> review', () => {
    const expected = new Map([
      ['sound-spelling', ['pronunciation', 'lesson', '-9']],
      ['vowel-contrasts', ['pronunciation', 'lesson', '-8']],
      ['consonant-clarity', ['pronunciation', 'lesson', '-7']],
      ['word-stress', ['pronunciation', 'lesson', '-6']],
      ['sentence-melody', ['pronunciation', 'lesson', '-5']],
      ['core-sentences', ['grammar', 'lesson', '-4']],
      ['basic-questions', ['grammar', 'lesson', '-3']],
      ['foundation-checkpoint', ['integrated', 'checkpoint', '-2']],
      ['foundation-review', ['integrated', 'review', '-1']],
    ])

    for (const loc of ['en', 'vi']) {
      for (const slug of FOUNDATION_SLUGS) {
        const raw = read(join(repoRoot, `docs/curriculum/english-basics/${loc}/${slug}.md`))
        const [focus, role, order] = expected.get(slug)
        assert.equal(scalar(raw, 'unit_id'), 'en-a1-foundation-00')
        assert.equal(scalar(raw, 'unit_order'), '0')
        assert.equal(scalar(raw, 'foundation_focus'), focus)
        assert.equal(scalar(raw, 'unit_role'), role)
        assert.equal(scalar(raw, 'order'), order)
      }
    }
  })

  it('ships app-owned pronunciation diagrams and no external image hotlinks in Unit 0', () => {
    for (const asset of [
      'english-sound-spelling.svg',
      'english-core-vowels.svg',
      'english-core-consonants.svg',
      'english-word-stress.svg',
      'english-sentence-melody.svg',
    ]) {
      assert.equal(existsSync(join(webRoot, `public/language/scenes/${asset}`)), true, `missing ${asset}`)
    }

    for (const loc of ['en', 'vi']) {
      for (const slug of FOUNDATION_SLUGS) {
        const raw = read(join(repoRoot, `docs/curriculum/english-basics/${loc}/${slug}.md`))
        assert.doesNotMatch(raw, /imageUrl:\s*"https?:\/\//i, `${loc}/${slug} hotlinks an image`)
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