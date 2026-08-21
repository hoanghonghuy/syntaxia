/**
 * Mandarin HSK Band 1 production curriculum contract.
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
const slugs = [
  'greetings',
  'greetings-checkpoint',
  'greetings-review',
  'pronouns',
  'numbers',
  'number-checkpoint',
  'number-review',
  'family',
  'time-of-day',
  'school-daily',
  'study-checkpoint',
  'study-review',
  'food-drink',
  'counter-checkpoint',
  'counter-review',
  'places',
  'questions',
  'info-checkpoint',
  'info-review',
  'adjectives',
  'describe-checkpoint',
  'describe-review',
  'transport',
  'travel-checkpoint',
  'travel-review',
  'devices',
  'introductions-checkpoint',
  'introductions-review',
]

function assessedIds(raw) {
  return [...raw.matchAll(/^\s+(?:-\s+)?id:\s*([^\s]+)\s*$/gm)].map((m) => m[1])
}

function lessonIdentity(raw) {
  const id = raw.match(/^id:\s*(\S+)/m)?.[1]
  const order = raw.match(/^order:\s*(\d+)/m)?.[1]
  const slug = raw.match(/^slug:\s*(\S+)/m)?.[1]
  return { id, order, slug }
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

describe('Mandarin HSK Band 1 v3 curriculum', () => {
  it('ships twenty-eight paired EN/VI language nodes', () => {
    for (const locale of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${locale}`)
      assert.equal(existsSync(dir), true)
      const actual = readdirSync(dir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''))
        .sort()
      assert.deepEqual(actual, [...slugs].sort())
    }
  })

  it('keeps identity and assessed review IDs aligned across locales', () => {
    for (const slug of slugs) {
      const en = read(join(repoRoot, `docs/curriculum/chinese-hsk/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/chinese-hsk/vi/${slug}.md`))
      assert.deepEqual(lessonIdentity(en), lessonIdentity(vi), `${slug}: lesson identity drift`)
      assert.deepEqual(assessedIds(en), assessedIds(vi), `${slug}: review id drift`)
      assert.ok(assessedIds(en).length >= 5, `${slug}: too few stable review items`)
    }
  })

  it('requires communicative, audio-first, production-oriented lesson structure', () => {
    for (const locale of ['en', 'vi']) {
      for (const slug of slugs) {
        const raw = read(join(repoRoot, `docs/curriculum/chinese-hsk/${locale}/${slug}.md`))
        assert.match(raw, /^hsk_band:\s*1$/m, `${locale}/${slug}: HSK band`)
        assert.match(raw, /^hsk_version:\s*"3\.0"$/m, `${locale}/${slug}: HSK version`)
        assert.match(raw, /^can_do:\s*".+"/m, `${locale}/${slug}: Can-Do`)
        assert.match(raw, /^\s+- type:\s*scene$/m, `${locale}/${slug}: scene`)
        assert.match(raw, /^\s+- type:\s*dialogue$/m, `${locale}/${slug}: dialogue`)
        assert.match(raw, /^\s+- type:\s*listen$/m, `${locale}/${slug}: listen`)
        assert.match(raw, /reading:\s*"[^"]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ][^"]*"/i, `${locale}/${slug}: tone-marked pinyin`)
        assert.match(raw, /kind:\s*audio_choice/, `${locale}/${slug}: listening assessment`)
        assert.match(raw, /kind:\s*dialogue_choice/, `${locale}/${slug}: interaction`)
        assert.match(raw, /kind:\s*(?:type_answer|listen_type)/, `${locale}/${slug}: production`)
        assert.match(raw, /^\s+- type:\s*checkpoint$/m, `${locale}/${slug}: checkpoint`)
        assert.doesNotMatch(raw, /kind:\s*mcq/, `${locale}/${slug}: generic MCQ regression`)
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
