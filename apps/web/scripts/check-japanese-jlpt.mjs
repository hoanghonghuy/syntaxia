/**
 * Japanese JLPT N5 foundation curriculum + map + V3 contract.
 */
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { gradeLanguageExercise, isLanguageTrack, languageVocabFromLesson } from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const UNITS = [
  { id: 'ja-n5-foundation-00', order: '0', nodes: [['kana-sounds', 'lesson'], ['hiragana-patterns', 'lesson'], ['katakana-patterns', 'lesson'], ['mora-length', 'lesson'], ['core-sentences', 'lesson'], ['foundation-checkpoint', 'checkpoint'], ['foundation-review', 'review']] },
  { id: 'ja-n5-shop-request-01', order: '1', nodes: [['politeness', 'lesson'], ['politeness-checkpoint', 'checkpoint'], ['politeness-review', 'review']] },
  { id: 'ja-n5-people-02', order: '2', nodes: [['people', 'lesson'], ['family', 'lesson'], ['people-checkpoint', 'checkpoint'], ['people-review', 'review']] },
  { id: 'ja-n5-number-03', order: '3', nodes: [['numbers', 'lesson'], ['number-checkpoint', 'checkpoint'], ['number-review', 'review']] },
  { id: 'ja-n5-cafe-04', order: '4', nodes: [['food-drink', 'lesson'], ['cafe-checkpoint', 'checkpoint'], ['cafe-review', 'review']] },
  { id: 'ja-n5-location-05', order: '5', nodes: [['places', 'lesson'], ['location-checkpoint', 'checkpoint'], ['location-review', 'review']] },
  { id: 'ja-n5-routine-06', order: '6', nodes: [['daily-routine', 'lesson'], ['routine-checkpoint', 'checkpoint'], ['routine-review', 'review']] },
  { id: 'ja-n5-classroom-07', order: '7', nodes: [['classroom-actions', 'lesson'], ['classroom-checkpoint', 'checkpoint'], ['classroom-review', 'review']] },
  { id: 'ja-n5-train-08', order: '8', nodes: [['train-trip', 'lesson'], ['train-checkpoint', 'checkpoint'], ['train-review', 'review']] },
  { id: 'ja-n5-weekend-09', order: '9', nodes: [['weekend-plan', 'lesson'], ['weekend-checkpoint', 'checkpoint'], ['weekend-review', 'review']] },
]

const SLUGS = UNITS.flatMap((unit) => unit.nodes.map(([slug]) => slug))

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || '').trim()
}

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

function vocabCount(body) {
  const section = body.match(/^vocab:\s*\n([\s\S]*?)(?=^steps:\s*$)/m)?.[1] || ''
  return [...section.matchAll(/^\s+-\s+\{/gm)].length
}

function assertV3Node(body, label) {
  assert.match(body, /track:\s*japanese-jlpt/)
  assert.match(body, /jlpt_level:\s*n5/)
  assert.ok(scalar(body, 'unit_title'), `${label}: unit title`)
  assert.ok(scalar(body, 'unit_can_do'), `${label}: unit Can-Do`)
  assert.ok(scalar(body, 'can_do'), `${label}: node Can-Do`)
  assert.match(body, /^steps:/m, `${label}: steps`)
  assert.match(body, /^\s+- type:\s*scene\s*$/m, `${label}: scene`)
  assert.match(body, /^\s+- type:\s*dialogue\s*$/m, `${label}: dialogue`)
  assert.match(body, /^\s+- type:\s*listen\s*$/m, `${label}: listen`)
  assert.match(body, /^\s+- type:\s*practice\s*$/m, `${label}: practice`)
  assert.match(body, /^\s+- type:\s*checkpoint\s*$/m, `${label}: checkpoint`)
  assert.match(body, /reading:\s*"[^\"]+"/, `${label}: Japanese reading`)
  assert.match(body, /^\s+kind:\s*(?:type_answer|listen_type|order_words)\s*$/m, `${label}: controlled recall/production`)
  assert.doesNotMatch(body, /^\s+kind:\s*mcq\s*$/m, `${label}: generic MCQ`)
  assert.ok(assessedIds(body).length >= 5, `${label}: stable assessed IDs`)
}

describe('japanese-jlpt N5 foundation curriculum', () => {
  it('treats japanese-jlpt as a language track', () => {
    assert.equal(isLanguageTrack('japanese-jlpt'), true)
    assert.equal(isLanguageTrack('japanese-jlpt', 'languages'), true)
  })

  it('normalizes surface/reading and kanji/kana aliases', () => {
    const surface = languageVocabFromLesson({ exercise: { vocab: [{ surface: '水', reading: 'みず', gloss: 'water' }] } })
    assert.equal(surface[0].form, '水')
    assert.equal(surface[0].reading, 'みず')
    assert.equal(surface[0].lang, 'ja')
    const alias = languageVocabFromLesson({ exercise: { vocab: [{ kanji: '学校', kana: 'がっこう', gloss: 'school' }] } })
    assert.equal(alias[0].form, '学校')
    assert.equal(alias[0].reading, 'がっこう')
  })

  it('ships a source-backed foundation-first N5 map', () => {
    const body = read(join(repoRoot, 'docs/processes/japanese-jlpt-n5-map.md'))
    assert.match(body, /JLPT official level summary/)
    assert.match(body, /JLPT FAQ/)
    assert.match(body, /Irodori Starter/)
    assert.match(body, /10 units \/ 35 nodes per locale/i)
    assert.match(body, /kana ↔ sound/i)
    assert.match(body, /hiragana/i)
    assert.match(body, /katakana/i)
    assert.match(body, /mora\/length/i)
    assert.match(body, /basic sentence order \+ particles \+ polite forms/i)
    assert.match(body, /does not publish an official vocabulary\/kanji\/grammar syllabus/i)
    assert.match(body, /not official JLPT authority/i)
  })

  it('ships exactly 35 paired EN/VI V3 nodes across ten units', () => {
    assert.equal(SLUGS.length, 35)
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort()
      assert.deepEqual(files, [...SLUGS].sort())
      for (const unit of UNITS) {
        for (const [slug, role] of unit.nodes) {
          const body = read(join(dir, `${slug}.md`))
          const label = `${locale}/${slug}`
          assert.match(body, new RegExp(`locale:\\s*${locale}`))
          assert.equal(scalar(body, 'unit_id'), unit.id, `${label}: unit id`)
          assert.equal(scalar(body, 'unit_order'), unit.order, `${label}: unit order`)
          assert.equal(scalar(body, 'unit_role'), role, `${label}: unit role`)
          assertV3Node(body, label)
        }
      }
    }
  })

  it('locks Unit 0 as sound -> hiragana -> katakana -> length -> grammar -> checkpoint -> review with unique sort order', () => {
    const foundation = UNITS[0]
    const expected = [
      ['kana-sounds', '-7'],
      ['hiragana-patterns', '-6'],
      ['katakana-patterns', '-5'],
      ['mora-length', '-4'],
      ['core-sentences', '-3'],
      ['foundation-checkpoint', '-2'],
      ['foundation-review', '-1'],
    ]
    assert.deepEqual(foundation.nodes.map(([slug]) => slug), expected.map(([slug]) => slug))
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}`)
      for (let i = 0; i < foundation.nodes.length; i += 1) {
        const [slug, role] = foundation.nodes[i]
        const body = read(join(dir, `${slug}.md`))
        assert.equal(scalar(body, 'unit_role'), role)
        assert.equal(scalar(body, 'order'), expected[i][1], `${locale}/${slug}: sort order`)
        assert.ok(vocabCount(body) >= 5, `${locale}/${slug}: foundation should carry reusable material`)
      }
    }
  })

  it('keeps stable assessed identities aligned between EN and VI', () => {
    for (const slug of SLUGS) {
      const en = read(join(repoRoot, `docs/curriculum/japanese-jlpt/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/japanese-jlpt/vi/${slug}.md`))
      assert.deepEqual(assessedIds(vi), assessedIds(en), `${slug}: assessed IDs drifted`)
    }
  })

  it('ships app-owned semantic assets for routine and train scenes', () => {
    for (const asset of ['daily-clock.svg', 'train-platform.svg']) {
      assert.equal(existsSync(join(webRoot, 'public/language/scenes', asset)), true, `missing ${asset}`)
    }
  })

  it('grades every published authored fallback answer against itself', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        assert.ok(answerMatch, `${locale}/${file} missing answer`)
        assert.equal(gradeLanguageExercise({ answer: answerMatch[1] }, answerMatch[1], 'ja'), true)
      }
    }
  })
})
