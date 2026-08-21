import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (path) => readFileSync(path, 'utf8')

const goldenUnits = [
  {
    track: 'english-basics',
    unitId: 'en-a1-meeting-01',
    visualKey: 'classmates-meeting',
    nodes: [
      ['greetings', 'lesson'],
      ['meeting-checkpoint', 'checkpoint'],
      ['meeting-review', 'review'],
    ],
  },
  {
    track: 'chinese-hsk',
    unitId: 'zh-hsk-b1-greeting-01',
    visualKey: 'classmates-meeting',
    nodes: [
      ['greetings', 'lesson'],
      ['greetings-checkpoint', 'checkpoint'],
      ['greetings-review', 'review'],
    ],
  },
  {
    track: 'japanese-jlpt',
    unitId: 'ja-n5-shop-request-01',
    visualKey: 'shop-counter-request',
    nodes: [
      ['politeness', 'lesson'],
      ['politeness-checkpoint', 'checkpoint'],
      ['politeness-review', 'review'],
    ],
  },
]

const migratedUnits = [
  {
    track: 'english-basics',
    unitId: 'en-a1-people-02',
    unitOrder: '2',
    nodes: [
      ['people', 'lesson'],
      ['family', 'lesson'],
      ['people-checkpoint', 'checkpoint'],
      ['people-review', 'review'],
    ],
  },
  {
    track: 'english-basics',
    unitId: 'en-a1-find-way-03',
    unitOrder: '3',
    nodes: [
      ['numbers', 'lesson'],
      ['places', 'lesson'],
      ['find-way-checkpoint', 'checkpoint'],
      ['find-way-review', 'review'],
    ],
  },
  {
    track: 'english-basics',
    unitId: 'en-a1-cafe-04',
    unitOrder: '4',
    nodes: [
      ['food-drink', 'lesson'],
      ['cafe-checkpoint', 'checkpoint'],
      ['cafe-review', 'review'],
    ],
  },
  {
    track: 'chinese-hsk',
    unitId: 'zh-hsk-b1-people-02',
    unitOrder: '2',
    nodes: [
      ['pronouns', 'lesson'],
      ['family', 'lesson'],
      ['introductions-checkpoint', 'checkpoint'],
      ['introductions-review', 'review'],
    ],
  },
  {
    track: 'chinese-hsk',
    unitId: 'zh-hsk-b1-number-03',
    unitOrder: '3',
    nodes: [
      ['numbers', 'lesson'],
      ['number-checkpoint', 'checkpoint'],
      ['number-review', 'review'],
    ],
  },
]

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || '').trim()
}

function assertV3Node(body, label) {
  assert.ok(scalar(body, 'unit_title'), `${label}: unit title`)
  assert.ok(scalar(body, 'unit_can_do'), `${label}: unit Can-Do`)
  assert.ok(scalar(body, 'can_do'), `${label}: node Can-Do`)
  assert.match(body, /^\s+- type:\s*scene\s*$/m, `${label}: scene`)
  assert.match(body, /^\s+- type:\s*dialogue\s*$/m, `${label}: dialogue`)
  assert.match(body, /^\s+- type:\s*listen\s*$/m, `${label}: listen`)
  assert.match(body, /^\s+- type:\s*practice\s*$/m, `${label}: practice`)
  assert.match(body, /^\s+- type:\s*checkpoint\s*$/m, `${label}: checkpoint`)
  assert.match(
    body,
    /^\s+kind:\s*(?:type_answer|listen_type|order_words)\s*$/m,
    `${label}: controlled recall/production`,
  )
  assert.doesNotMatch(body, /^\s+kind:\s*mcq\s*$/m, `${label}: generic MCQ`)
  assert.ok(assessedIds(body).length >= 5, `${label}: stable assessed IDs`)
}

describe('Language V3 golden communicative units', () => {
  it('ships one complete lesson -> checkpoint -> review unit for each core language', () => {
    for (const unit of goldenUnits) {
      for (const locale of ['en', 'vi']) {
        const roles = []
        for (const [slug, role] of unit.nodes) {
          const body = read(join(repoRoot, `docs/curriculum/${unit.track}/${locale}/${slug}.md`))
          const label = `${unit.track}/${locale}/${slug}`
          assert.equal(scalar(body, 'unit_id'), unit.unitId, `${label}: unit id`)
          assert.equal(scalar(body, 'unit_order'), '1', `${label}: unit order`)
          assert.equal(scalar(body, 'unit_role'), role, `${label}: role`)
          assertV3Node(body, label)
          roles.push(role)
        }
        assert.deepEqual(roles, ['lesson', 'checkpoint', 'review'])
      }
    }
  })

  it('keeps stable assessed identities aligned between EN and VI for every golden node', () => {
    for (const unit of goldenUnits) {
      for (const [slug] of unit.nodes) {
        const en = read(join(repoRoot, `docs/curriculum/${unit.track}/en/${slug}.md`))
        const vi = read(join(repoRoot, `docs/curriculum/${unit.track}/vi/${slug}.md`))
        assert.deepEqual(
          assessedIds(vi),
          assessedIds(en),
          `${unit.track}/${slug}: assessed IDs drifted between locales`,
        )
      }
    }
  })

  it('keeps migrated communicative units explicit and complete', () => {
    for (const unit of migratedUnits) {
      for (const locale of ['en', 'vi']) {
        const roles = []
        for (const [slug, role] of unit.nodes) {
          const body = read(join(repoRoot, `docs/curriculum/${unit.track}/${locale}/${slug}.md`))
          const label = `${unit.track}/${locale}/${slug}`
          assert.equal(scalar(body, 'unit_id'), unit.unitId, `${label}: unit id`)
          assert.equal(scalar(body, 'unit_order'), unit.unitOrder, `${label}: unit order`)
          assert.equal(scalar(body, 'unit_role'), role, `${label}: role`)
          assertV3Node(body, label)
          roles.push(role)
        }
        assert.deepEqual(roles, unit.nodes.map(([, role]) => role))
        assert.equal(roles.at(-2), 'checkpoint')
        assert.equal(roles.at(-1), 'review')
      }
    }
  })

  it('keeps migrated assessed identities aligned between EN and VI', () => {
    for (const unit of migratedUnits) {
      for (const [slug] of unit.nodes) {
        const en = read(join(repoRoot, `docs/curriculum/${unit.track}/en/${slug}.md`))
        const vi = read(join(repoRoot, `docs/curriculum/${unit.track}/vi/${slug}.md`))
        assert.deepEqual(
          assessedIds(vi),
          assessedIds(en),
          `${unit.track}/${slug}: assessed IDs drifted between locales`,
        )
      }
    }
  })

  it('uses semantic visuals in each golden unit instead of decorative hotlinks', () => {
    for (const unit of goldenUnits) {
      for (const locale of ['en', 'vi']) {
        const primary = read(join(repoRoot, `docs/curriculum/${unit.track}/${locale}/${unit.nodes[0][0]}.md`))
        assert.match(primary, new RegExp(`visualKey: "${unit.visualKey}"`))
        assert.match(primary, /imageAlt: ".+"/)
        assert.doesNotMatch(primary, /imageUrl:\s*["']?https?:\/\//i)
      }
    }
  })

  it('keeps language-specific production evidence in the golden units', () => {
    for (const locale of ['en', 'vi']) {
      const english = read(join(repoRoot, `docs/curriculum/english-basics/${locale}/meeting-checkpoint.md`))
      assert.match(english, /answer:\s*"Hi, I'm Nam"/)

      const mandarin = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/greetings-checkpoint.md`))
      assert.match(mandarin, /answer:\s*"你好"/)
      assert.match(mandarin, /reading:\s*"[^"]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][^"]*"/i)

      const japanese = read(join(repoRoot, `docs/curriculum/japanese-jlpt/${locale}/politeness-checkpoint.md`))
      assert.match(japanese, /answer:\s*"ありがとうございます"/)
      assert.match(japanese, /reading:\s*"これをください。"/)
    }
  })
})
