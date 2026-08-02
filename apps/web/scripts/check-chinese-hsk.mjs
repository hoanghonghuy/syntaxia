/**
 * Chinese HSK language player + curriculum map.
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
  languageExerciseFromLesson,
  languageVocabFromLesson,
} from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('languageLesson utils', () => {
  it('treats chinese-hsk as a language track', () => {
    assert.equal(isLanguageTrack('chinese-hsk'), true)
    assert.equal(isLanguageTrack('english-basics'), true)
    assert.equal(isLanguageTrack('japanese-jlpt'), true)
    assert.equal(isLanguageTrack('sql-fundamentals'), false)
    assert.equal(isLanguageTrack('javascript-basics'), false)
    assert.equal(isLanguageTrack('anything', 'languages'), true)
    assert.equal(isLanguageTrack('sql-fundamentals', 'sql'), false)
  })

  it('reads vocab and language exercise from lesson.exercise payload', () => {
    const lesson = {
      exercise: {
        type: 'mcq',
        prompt: 'Which means hello?',
        choices: ['你好', '再见'],
        answer: '你好',
        vocab: [{ hanzi: '你好', pinyin: 'nǐ hǎo', gloss: 'hello' }],
        hskBand: 1,
      },
    }
    assert.equal(languageVocabFromLesson(lesson).length, 1)
    assert.equal(languageVocabFromLesson(lesson)[0].form, '你好')
    assert.equal(languageExerciseFromLesson(lesson)?.type, 'mcq')
    assert.equal(gradeLanguageExercise(lesson.exercise, '你好'), true)
    assert.equal(gradeLanguageExercise(lesson.exercise, '再见'), false)
  })

  it('normalizes English word/ipa vocab entries', () => {
    const lesson = {
      exercise: {
        type: 'mcq',
        prompt: 'Which means hello?',
        answer: 'hello',
        vocab: [{ word: 'hello', ipa: '/həˈloʊ/', gloss: 'xin chào' }],
      },
    }
    const vocab = languageVocabFromLesson(lesson)
    assert.equal(vocab[0].form, 'hello')
    assert.equal(vocab[0].reading, '/həˈloʊ/')
    assert.equal(vocab[0].lang, 'en')
  })

  it('normalizes fill_blank answers (trim)', () => {
    const ex = { type: 'fill_blank', answer: '你好' }
    assert.equal(gradeLanguageExercise(ex, '  你好  '), true)
  })
})

describe('chinese-hsk curriculum slice', () => {
  it('ships Band 1 map process doc', () => {
    const map = join(repoRoot, 'docs/processes/chinese-hsk-band1-map.md')
    assert.equal(existsSync(map), true)
    const body = read(map)
    assert.match(body, /leonsilicon\/hsk3\.0|HSK3\.0_words_level1/)
    assert.match(body, /greetings/)
  })

  it('ships paired en/vi lessons for mapped slugs only', () => {
    const slugs = [
      'greetings',
      'pronouns',
      'numbers',
      'family',
      'time-of-day',
      'school-daily',
      'food-drink',
      'places',
      'questions',
      'adjectives',
      'transport',
      'devices',
    ]
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${loc}`)
      assert.equal(existsSync(dir), true, `missing ${dir}`)
      const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
      assert.deepEqual(
        files.map((f) => f.replace(/\.md$/, '')).sort(),
        [...slugs].sort(),
      )
      for (const slug of slugs) {
        const raw = read(join(dir, `${slug}.md`))
        assert.match(raw, /track:\s*chinese-hsk/)
        assert.match(raw, new RegExp(`locale:\\s*${loc}`))
        assert.match(raw, /hsk_band:\s*1/)
        assert.match(raw, /type:\s*(mcq|fill_blank)/)
        assert.match(raw, /hanzi:/)
      }
    }
  })

  it('grades each published exercise answer against itself (smoke)', () => {
    for (const loc of ['en', 'vi']) {
      const dir = join(repoRoot, `docs/curriculum/chinese-hsk/${loc}`)
      for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const raw = read(join(dir, file))
        const answerMatch = raw.match(/\n\s*answer:\s*"([^"]+)"/)
        const typeMatch = raw.match(/\n\s*type:\s*(mcq|fill_blank)/)
        assert.ok(answerMatch, `${loc}/${file} missing answer`)
        assert.ok(typeMatch, `${loc}/${file} missing type`)
        const exercise = { type: typeMatch[1], answer: answerMatch[1] }
        assert.equal(
          gradeLanguageExercise(exercise, answerMatch[1]),
          true,
          `${loc}/${file} self-grade failed`,
        )
        assert.equal(gradeLanguageExercise(exercise, 'WRONG'), false)
      }
    }
  })
})

describe('lesson page language player gate', () => {
  it('does not mount IT sandboxes for chinese-hsk', () => {
    const src = read(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'))
    assert.match(src, /isLanguageTrack|LanguageVocabList|LanguageExercise/)
    assert.match(src, /LanguageExercise/)
    // Language branch must precede SqlSandbox / use exclusive gate
    assert.match(src, /v-else-if="lesson\.exercise && !isLanguageTrack/)
  })
})
