/**
 * Chinese IT specialty curriculum production-quality contract.
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
  languageTargetLang,
} from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

const LESSONS = [
  {
    slug: 'hardware-software',
    order: 1,
    unitId: 'zh-it-device-support-01',
    visualKey: 'tech-repair-desk',
    terms: ['硬件', '软件', '芯片'],
  },
  {
    slug: 'internet-apps',
    order: 2,
    unitId: 'zh-it-digital-access-02',
    visualKey: 'qr-code-login',
    terms: ['互联网', '微信', '扫码'],
  },
  {
    slug: 'ai-basics',
    order: 3,
    unitId: 'zh-it-ai-project-03',
    visualKey: 'ai-project-flow',
    terms: ['人工智能', '机器学习', '算法', '模型'],
  },
  {
    slug: 'deep-learning',
    order: 4,
    unitId: 'zh-it-model-training-04',
    visualKey: 'model-training-monitor',
    terms: ['深度学习', '神经网络', '训练', '过拟合'],
  },
  {
    slug: 'nlp-basics',
    order: 5,
    unitId: 'zh-it-nlp-project-05',
    visualKey: 'nlp-context-window',
    terms: ['自然语言处理', '语言模型', '词向量', '上下文'],
  },
  {
    slug: 'tech-hubs',
    order: 6,
    unitId: 'zh-it-tech-ecosystem-06',
    visualKey: 'china-tech-hubs',
    terms: ['深圳', '华强北', '中关村', '独角兽企业'],
  },
]

function scalar(body, key) {
  const match = body.match(new RegExp(`^${key}:\\s*(?:"([^"]+)"|'([^']+)'|([^\\n#]+))`, 'm'))
  return (match?.[1] || match?.[2] || match?.[3] || '').trim()
}

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

function topLevelExercise(body) {
  const match = body.match(/^exercise:\s*\n([\s\S]*?)(?=\n---\s*$)/m)
  if (!match) return null
  const block = match[1]
  const type = block.match(/^\s{2}type:\s*([a-z_]+)\s*$/m)?.[1] || ''
  const answer = block.match(/^\s{2}answer:\s*"([^"]+)"\s*$/m)?.[1] || ''
  return type && answer ? { type, answer } : null
}

describe('chinese-it-vocab production curriculum', () => {
  it('uses the Language V3 player and Mandarin speech profile', () => {
    assert.equal(isLanguageTrack('chinese-it-vocab'), true)
    assert.equal(isLanguageTrack('chinese-it-vocab', 'languages'), true)
    assert.equal(languageTargetLang('chinese-it-vocab'), 'zh-Hans')
  })

  it('keeps the cited szdict syllabus map and production authoring rules', () => {
    const map = join(repoRoot, 'docs/processes/chinese-it-vocab-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /mhagiwara\/szdict/)
    assert.match(body, /CC BY-SA/)
    assert.match(body, /Language V3/)
    assert.match(body, /hardware-software/)
  })

  it('ships exactly six paired V3 specialty lessons with semantic learning scenes', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-it-vocab/${locale}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((file) => file.endsWith('.md'))
      assert.deepEqual(
        files.map((file) => file.replace(/\.md$/, '')).sort(),
        LESSONS.map(({ slug }) => slug).sort(),
      )

      for (const lesson of LESSONS) {
        const raw = read(join(dir, `${lesson.slug}.md`))
        const label = `${locale}/${lesson.slug}`
        assert.equal(scalar(raw, 'id'), `zh-it-0${lesson.order}-${lesson.slug}`, `${label}: id`)
        assert.equal(scalar(raw, 'track'), 'chinese-it-vocab', `${label}: track`)
        assert.equal(scalar(raw, 'locale'), locale, `${label}: locale`)
        assert.equal(scalar(raw, 'order'), String(lesson.order), `${label}: order`)
        assert.equal(scalar(raw, 'published'), 'true', `${label}: published`)
        assert.equal(scalar(raw, 'specialty'), 'it-vocab', `${label}: specialty`)
        assert.equal(scalar(raw, 'source'), 'szdict', `${label}: source`)
        assert.equal(scalar(raw, 'unit_id'), lesson.unitId, `${label}: unit id`)
        assert.equal(scalar(raw, 'unit_order'), String(lesson.order), `${label}: unit order`)
        assert.equal(scalar(raw, 'unit_role'), 'lesson', `${label}: unit role`)
        assert.ok(scalar(raw, 'unit_title'), `${label}: unit title`)
        assert.ok(scalar(raw, 'unit_can_do'), `${label}: unit Can-Do`)
        assert.ok(scalar(raw, 'can_do'), `${label}: lesson Can-Do`)

        for (const term of lesson.terms) {
          assert.match(raw, new RegExp(`hanzi:\\s*"${term}"`), `${label}: mapped term ${term}`)
        }

        assert.match(raw, /^\s+- type:\s*scene\s*$/m, `${label}: scene`)
        assert.match(raw, new RegExp(`visualKey: "${lesson.visualKey}"`), `${label}: semantic visual`)
        assert.match(raw, /imageAlt:\s*".+"/, `${label}: visual alt`)
        assert.match(raw, /^\s+- type:\s*dialogue\s*$/m, `${label}: dialogue`)
        assert.match(raw, /^\s+- type:\s*listen\s*$/m, `${label}: listen-first step`)
        assert.match(raw, /^\s+- type:\s*teach\s*$/m, `${label}: teach step`)
        assert.match(raw, /^\s+- type:\s*practice\s*$/m, `${label}: practice`)
        assert.match(raw, /^\s+- type:\s*checkpoint\s*$/m, `${label}: checkpoint`)
        assert.match(raw, /^\s+kind:\s*dialogue_choice\s*$/m, `${label}: contextual interaction`)
        assert.match(raw, /^\s+kind:\s*audio_choice\s*$/m, `${label}: listening assessment`)
        assert.match(raw, /^\s+kind:\s*type_answer\s*$/m, `${label}: controlled production`)
        assert.doesNotMatch(raw, /^\s+kind:\s*mcq\s*$/m, `${label}: generic MCQ is not V3 authoring`)
        assert.doesNotMatch(raw, /imageUrl:\s*["']?https?:\/\//i, `${label}: external image hotlink`)
        assert.ok(assessedIds(raw).length >= 5, `${label}: stable assessed IDs`)
        assert.match(raw, /kind:\s*type_answer[\s\S]{0,900}?hints:\s*\n\s+-\s+.+/m, `${label}: progressive production hint`)

        const exercise = topLevelExercise(raw)
        assert.ok(exercise, `${label}: top-level fallback exercise`)
        assert.notEqual(exercise?.type, 'mcq', `${label}: fallback must not be generic MCQ`)
        assert.notEqual(exercise?.type, 'fill_blank', `${label}: fallback must use semantic V3 production`)
        assert.equal(gradeLanguageExercise(exercise, exercise?.answer || '', 'zh-Hans'), true, `${label}: fallback grades`)
      }
    }
  })

  it('keeps unit identity and assessed review keys aligned between EN and VI', () => {
    for (const lesson of LESSONS) {
      const en = read(join(repoRoot, `docs/curriculum/chinese-it-vocab/en/${lesson.slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/chinese-it-vocab/vi/${lesson.slug}.md`))
      assert.equal(scalar(vi, 'unit_id'), scalar(en, 'unit_id'), `${lesson.slug}: unit id parity`)
      assert.equal(scalar(vi, 'unit_order'), scalar(en, 'unit_order'), `${lesson.slug}: unit order parity`)
      assert.equal(scalar(vi, 'unit_role'), scalar(en, 'unit_role'), `${lesson.slug}: unit role parity`)
      assert.deepEqual(assessedIds(vi), assessedIds(en), `${lesson.slug}: assessed IDs parity`)
    }
  })
})
