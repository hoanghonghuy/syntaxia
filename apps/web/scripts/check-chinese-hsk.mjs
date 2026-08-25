/**
 * Mandarin Level 1 practical foundation + Language V3 contract.
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

const FOUNDATION_UNIT = {
  id: 'zh-hsk-b1-pronunciation-00',
  order: '0',
  kind: 'pronunciation',
  nodes: [
    ['pinyin-syllables', 'lesson'],
    ['tones', 'lesson'],
    ['tone-changes', 'lesson'],
    ['pronunciation-checkpoint', 'checkpoint'],
    ['pronunciation-review', 'review'],
  ],
}

const COMMUNICATIVE_UNITS = [
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

const UNITS = [FOUNDATION_UNIT, ...COMMUNICATIVE_UNITS]
const SLUGS = UNITS.flatMap((unit) => unit.nodes.map(([slug]) => slug))
const FOUNDATION_SLUGS = new Set(FOUNDATION_UNIT.nodes.map(([slug]) => slug))

function assessedIds(raw) {
  return [...raw.matchAll(/^\s+(?:-\s+)?id:\s*([^\s]+)\s*$/gm)].map((m) => m[1])
}

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|'([^']+)'|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || match?.[3] || '').trim()
}

function lessonIdentity(raw) {
  return {
    id: scalar(raw, 'id'),
    order: scalar(raw, 'order'),
    slug: scalar(raw, 'slug'),
  }
}

function assertCoreNode(raw, label) {
  assert.equal(scalar(raw, 'hsk_band'), '1', `${label}: HSK band`)
  assert.equal(scalar(raw, 'hsk_version'), '3.0', `${label}: HSK version`)
  assert.ok(scalar(raw, 'unit_title'), `${label}: unit title`)
  assert.ok(scalar(raw, 'unit_can_do'), `${label}: unit Can-Do`)
  assert.ok(scalar(raw, 'can_do'), `${label}: node Can-Do`)
  assert.match(raw, /^\s+- type:\s*scene$/m, `${label}: scene`)
  assert.match(raw, /^\s+- type:\s*listen$/m, `${label}: listen`)
  assert.match(raw, /reading:\s*"[^"]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][^"]*"/i, `${label}: tone-marked Pinyin`)
  assert.match(raw, /kind:\s*audio_choice/, `${label}: listening assessment`)
  assert.match(raw, /kind:\s*(?:type_answer|listen_type)/, `${label}: production`)
  assert.match(raw, /^\s+- type:\s*checkpoint$/m, `${label}: checkpoint`)
  assert.doesNotMatch(raw, /kind:\s*mcq/, `${label}: generic MCQ regression`)
  assert.ok(assessedIds(raw).length >= 5, `${label}: stable assessed IDs`)
}

function assertFoundationNode(raw, label, role) {
  assertCoreNode(raw, label)
  assert.equal(scalar(raw, 'foundation_focus'), 'pronunciation', `${label}: foundation focus`)
  assert.match(raw, /imageUrl:\s*"\/language\/scenes\/(?:pinyin-syllable-anatomy|mandarin-tone-ladder|mandarin-tone-flow)\.svg"/, `${label}: app-owned pronunciation visual`)
  if (role === 'lesson') {
    assert.match(raw, /^\s+- type:\s*teach$/m, `${label}: explicit sound teaching`)
    assert.match(raw, /^vocab:/m, `${label}: anchored vocabulary`)
  }
}

function assertCommunicativeNode(raw, label) {
  assertCoreNode(raw, label)
  assert.match(raw, /^\s+- type:\s*dialogue$/m, `${label}: dialogue`)
  assert.match(raw, /kind:\s*dialogue_choice/, `${label}: interaction`)
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

describe('Mandarin Level 1 practical foundation', () => {
  it('documents the official proficiency foundation and the 2026 HSK transition', () => {
    const map = read(join(repoRoot, 'docs/processes/chinese-hsk-band1-map.md'))
    assert.match(map, /moe\.gov\.cn\/jyb_xwfb\/gzdt_gzdt\/s5987\/202103\/t20210329_523304\.html/)
    assert.match(map, /chinesetest\.cn\/HSK\/1/)
    assert.match(map, /150/)
    assert.match(map, /2026-09-20/)
    assert.match(map, /pronunciation foundation/i)
    assert.match(map, /11 communicative units/i)
    assert.match(map, /41 nodes per locale/i)
  })

  it('ships exactly 41 paired EN/VI nodes: pronunciation foundation plus eleven communicative units', () => {
    assert.equal(SLUGS.length, 41)
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
          if (FOUNDATION_SLUGS.has(slug)) assertFoundationNode(raw, label, role)
          else assertCommunicativeNode(raw, label)
        }
      }
    }
  })

  it('places foundation at sort orders -5..-1 without renumbering the published communicative sequence', () => {
    const enRoot = join(repoRoot, 'docs/curriculum/chinese-hsk/en')
    const foundationOrders = FOUNDATION_UNIT.nodes.map(([slug]) => Number(scalar(read(join(enRoot, `${slug}.md`)), 'order')))
    assert.deepEqual(foundationOrders, [-5, -4, -3, -2, -1])
    assert.equal(scalar(read(join(enRoot, 'greetings.md')), 'order'), '1')
    assert.equal(scalar(read(join(enRoot, 'free-time-review.md')), 'unit_order'), '11')
  })

  it('keeps identity and assessed review IDs aligned across locales', () => {
    for (const slug of SLUGS) {
      const en = read(join(repoRoot, `docs/curriculum/chinese-hsk/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/chinese-hsk/vi/${slug}.md`))
      assert.deepEqual(lessonIdentity(en), lessonIdentity(vi), `${slug}: lesson identity drift`)
      assert.deepEqual(assessedIds(en), assessedIds(vi), `${slug}: review id drift`)
    }
  })

  it('ships app-owned visuals for pronunciation and later communicative contexts', () => {
    for (const asset of ['pinyin-syllable-anatomy.svg', 'mandarin-tone-ladder.svg', 'mandarin-tone-flow.svg', 'weather-window.svg']) {
      assert.equal(existsSync(join(webRoot, `public/language/scenes/${asset}`)), true, `${asset} missing`)
    }
    for (const locale of ['en', 'vi']) {
      const pinyin = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/pinyin-syllables.md`))
      const tones = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/tones.md`))
      const flow = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/tone-changes.md`))
      const weather = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/weather.md`))
      const freeTime = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/free-time.md`))
      assert.match(pinyin, /imageUrl:\s*"\/language\/scenes\/pinyin-syllable-anatomy\.svg"/)
      assert.match(tones, /imageUrl:\s*"\/language\/scenes\/mandarin-tone-ladder\.svg"/)
      assert.match(flow, /imageUrl:\s*"\/language\/scenes\/mandarin-tone-flow\.svg"/)
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
