/**
 * Mandarin HSK Level 1 practical foundation + Language V3 contract.
 * Run: node --experimental-strip-types --test scripts/check-chinese-hsk.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  gradeLanguageExercise,
  isLanguageTrack,
  languageTargetLang,
} from '../app/utils/languageLesson.ts'
import { speechLangForTrack } from '../app/utils/languageAudio.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const UNITS = [
  { id: 'zh-hsk-b1-greeting-01', order: '1', nodes: [['greetings', 'lesson'], ['greetings-checkpoint', 'checkpoint'], ['greetings-review', 'review']] },
  { id: 'zh-hsk-b1-people-02', order: '2', nodes: [['pronouns', 'lesson'], ['family', 'lesson'], ['introductions-checkpoint', 'checkpoint'], ['introductions-review', 'review']] },
  { id: 'zh-hsk-b1-number-03', order: '3', nodes: [['numbers', 'lesson'], ['number-checkpoint', 'checkpoint'], ['number-review', 'review']] },
  { id: 'zh-hsk-b1-study-04', order: '4', nodes: [['time-of-day', 'lesson'], ['school-daily', 'lesson'], ['study-checkpoint', 'checkpoint'], ['study-review', 'review']] },
  { id: 'zh-hsk-b1-counter-05', order: '5', nodes: [['food-drink', 'lesson'], ['counter-checkpoint', 'checkpoint'], ['counter-review', 'review']] },
  { id: 'zh-hsk-b1-info-06', order: '6', nodes: [['places', 'lesson'], ['questions', 'lesson'], ['info-checkpoint', 'checkpoint'], ['info-review', 'review']] },
  { id: 'zh-hsk-b1-describe-07', order: '7', nodes: [['adjectives', 'lesson'], ['describe-checkpoint', 'checkpoint'], ['describe-review', 'review']] },
  { id: 'zh-hsk-b1-travel-08', order: '8', nodes: [['transport', 'lesson'], ['travel-checkpoint', 'checkpoint'], ['travel-review', 'review']] },
  { id: 'zh-hsk-b1-device-09', order: '9', nodes: [['devices', 'lesson'], ['device-checkpoint', 'checkpoint'], ['device-review', 'review']] },
  { id: 'zh-hsk-b1-weather-10', order: '10', nodes: [['weather', 'lesson'], ['weather-checkpoint', 'checkpoint'], ['weather-review', 'review']] },
  { id: 'zh-hsk-b1-free-time-11', order: '11', nodes: [['free-time', 'lesson'], ['free-time-checkpoint', 'checkpoint'], ['free-time-review', 'review']] },
]

const SLUGS = UNITS.flatMap((unit) => unit.nodes.map(([slug]) => slug))

function assessedIds(raw) {
  return [...raw.matchAll(/^\s+(?:-\s+)?id:\s*([^\s]+)\s*$/gm)].map((m) => m[1])
}

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || '').trim()
}

function lessonIdentity(raw) {
  return {
    id: scalar(raw, 'id'),
    order: scalar(raw, 'order'),
    slug: scalar(raw, 'slug'),
  }
}

function assertV3Node(raw, label) {
  assert.match(raw, /^hsk_band:\s*1$/m, `${label}: HSK band`)
  assert.match(raw, /^hsk_version:\s*"3\.0"$/m, `${label}: HSK version`)
  assert.ok(scalar(raw, 'unit_title'), `${label}: unit title`)
  assert.ok(scalar(raw, 'unit_can_do'), `${label}: unit Can-Do`)
  assert.ok(scalar(raw, 'can_do'), `${label}: node Can-Do`)
  assert.match(raw, /^\s+- type:\s*scene$/m, `${label}: scene`)
  assert.match(raw, /^\s+- type:\s*dialogue$/m, `${label}: dialogue`)
  assert.match(raw, /^\s+- type:\s*listen$/m, `${label}: listen`)
  assert.match(raw, /reading:\s*"[^"]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][^"]*"/i, `${label}: tone-marked pinyin`)
  assert.match(raw, /kind:\s*audio_choice/, `${label}: listening assessment`)
  assert.match(raw, /kind:\s*dialogue_choice/, `${label}: interaction`)
  assert.match(raw, /kind:\s*(?:type_answer|listen_type)/, `${label}: production`)
  assert.match(raw, /^\s+- type:\s*checkpoint$/m, `${label}: checkpoint`)
  assert.doesNotMatch(raw, /kind:\s*mcq/, `${label}: generic MCQ regression`)
  assert.ok(assessedIds(raw).length >= 5, `${label}: stable assessed IDs`)
}

describe('Mandarin runtime contract', () => {
  it('maps Chinese HSK to Mandarin language and speech tags', () => {
    assert.equal(isLanguageTrack('chinese-hsk'), true)
    assert.equal(languageTargetLang('chinese-hsk'), 'zh-Hans')
    assert.equal(speechLangForTrack('chinese-hsk'), 'zh-CN')
  })

  it('keeps CJK grading strict for different characters', () => {
    assert.equal(gradeLanguageExercise({ answer: '你好' }, '你好', 'zh-Hans'), true)
    assert.equal(gradeLanguageExercise({ answer: '你好' }, '您好', 'zh-Hans'), false)
  })
})

describe('Mandarin HSK Level 1 practical foundation', () => {
  it('documents the current official Level 1 boundary and 2026 transition', () => {
    const map = read(join(repoRoot, 'docs/processes/chinese-hsk-band1-map.md'))
    assert.match(map, /chinesetest\.cn\/HSK\/1/)
    assert.match(map, /150/)
    assert.match(map, /2026-09-20/)
    assert.match(map, /11 communicative units/i)
  })

  it('ships exactly 36 paired EN/VI language nodes across eleven units', () => {
    assert.equal(SLUGS.length, 36)
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${locale}`)
      assert.equal(existsSync(dir), true)
      const actual = readdirSync(dir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''))
        .sort()
      assert.deepEqual(actual, [...SLUGS].sort())

      for (const unit of UNITS) {
        for (const [slug, role] of unit.nodes) {
          const raw = read(join(dir, `${slug}.md`))
          const label = `${locale}/${slug}`
          assert.equal(scalar(raw, 'unit_id'), unit.id, `${label}: unit id`)
          assert.equal(scalar(raw, 'unit_order'), unit.order, `${label}: unit order`)
          assert.equal(scalar(raw, 'unit_role'), role, `${label}: unit role`)
          assertV3Node(raw, label)
        }
      }
    }
  })

  it('keeps identity and assessed review IDs aligned across locales', () => {
    for (const slug of SLUGS) {
      const en = read(join(repoRoot, `docs/curriculum/chinese-hsk/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/chinese-hsk/vi/${slug}.md`))
      assert.deepEqual(lessonIdentity(en), lessonIdentity(vi), `${slug}: lesson identity drift`)
      assert.deepEqual(assessedIds(en), assessedIds(vi), `${slug}: review id drift`)
    }
  })

  it('ships app-owned semantic context for the new foundation units', () => {
    assert.equal(existsSync(join(webRoot, 'public/language/scenes/weather-window.svg')), true)
    for (const locale of ['en', 'vi']) {
      const weather = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/weather.md`))
      const freeTime = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/free-time.md`))
      assert.match(weather, /imageUrl:\s*"\/language\/scenes\/weather-window\.svg"/)
      assert.match(freeTime, /visualKey:\s*"weekend-plan"/)
    }
  })

  it('grades every published authored fallback answer against itself', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${locale}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        assert.ok(answerMatch, `${locale}/${file} missing answer`)
        assert.equal(gradeLanguageExercise({ answer: answerMatch[1] }, answerMatch[1], 'zh-Hans'), true)
      }
    }
  })

  it('keeps pragmatic corrections in the curriculum', () => {
    const greetings = read(join(repoRoot, 'docs/curriculum/chinese-hsk/en/greetings.md'))
    assert.doesNotMatch(greetings, /你好！谢谢！/)
    assert.match(greetings, /谢谢你。/)
    assert.match(greetings, /不客气。/)

    const adjectives = read(join(repoRoot, 'docs/curriculum/chinese-hsk/en/adjectives.md'))
    assert.match(adjectives, /Avoid the beginner error \*水是冷/)
    assert.match(adjectives, /answer:\s*"水很冷。"/)
  })
})
