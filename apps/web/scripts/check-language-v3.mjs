import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  gradeLanguageExercise,
  languageTargetLang,
  normalizeLanguageAnswer,
  practiceFromStep,
  reviewKeyForStep,
} from '../app/utils/languageLesson.ts'
import { languageTrackProfile } from '../app/utils/languageTrackProfile.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (path) => readFileSync(path, 'utf8')
const englishSlugs = ['greetings', 'people', 'numbers', 'family', 'food-drink', 'places']

function assessedIds(body) {
  return [...body.matchAll(/^\s+(?:-\s+)?id:\s*([a-z0-9-]+)\s*$/gim)].map((match) => match[1])
}

describe('language learning v3', () => {
  it('ships a dedicated production pedagogy lock', () => {
    const path = join(repoRoot, 'docs/processes/language-learning-pedagogy-v3.md')
    assert.equal(existsSync(path), true)
    const body = read(path)
    assert.match(body, /scene -> notice\/listen -> understand -> manipulate -> respond -> produce -> retrieve later/)
    assert.match(body, /FSRS/)
    assert.match(body, /natural language/i)
  })

  it('maps target languages from one profile source and does not guess Mandarin', () => {
    assert.equal(languageTargetLang('english-basics'), 'en')
    assert.equal(languageTargetLang('japanese-jlpt'), 'ja')
    assert.equal(languageTargetLang('chinese-hsk'), 'zh-Hans')
    assert.equal(languageTargetLang('future-language-track'), 'und')
    assert.deepEqual(languageTrackProfile('english-basics'), {
      targetLang: 'en',
      speechLang: 'en-US',
    })
    assert.deepEqual(languageTrackProfile('future-language-track'), {
      targetLang: 'und',
      speechLang: '',
    })
  })

  it('normalizes English production without weakening CJK grading', () => {
    assert.equal(normalizeLanguageAnswer('  Hello!  ', 'en'), 'hello')
    assert.equal(gradeLanguageExercise({ answer: 'Hello.' }, 'HELLO!', 'en'), true)
    assert.equal(gradeLanguageExercise({ answer: '你好' }, '您好', 'zh-Hans'), false)
  })

  it('parses v3 exercise kinds and stable review keys', () => {
    const exercise = practiceFromStep({
      type: 'practice',
      id: 'greet-build-1',
      kind: 'order_words',
      prompt: 'Build the greeting',
      tokens: ['Hello', 'Mai'],
      answer: 'Hello Mai',
    })
    assert.equal(exercise?.type, 'order_words')
    assert.equal(exercise?.id, 'greet-build-1')
    assert.equal(reviewKeyForStep({ type: 'practice', id: 'greet-build-1' }, 3), 'greet-build-1')
    assert.equal(reviewKeyForStep({ type: 'practice' }, 3), 'step-4')
    assert.equal(reviewKeyForStep({ type: 'practice' }, 3, 1), 'step-4-item-2')
  })

  it('shared language exercise does not hard-code zh-Hans', () => {
    const body = read(join(webRoot, 'app/components/LanguageExercise.vue'))
    assert.doesNotMatch(body, /lang="zh-Hans"/)
    assert.match(body, /languageTargetLang/)
    assert.match(body, /order_words/)
    assert.match(body, /match_pairs/)
  })

  it('English A1 lessons all use the v3 communicative session contract', () => {
    for (const slug of englishSlugs) {
      for (const locale of ['en', 'vi']) {
        const body = read(join(repoRoot, `docs/curriculum/english-basics/${locale}/${slug}.md`))
        assert.match(body, /^can_do:\s*".+"/m, `${locale}/${slug} missing Can-Do`)
        assert.match(body, /^\s+- type:\s*scene\s*$/m, `${locale}/${slug} missing scene`)
        assert.match(body, /^\s+- type:\s*dialogue\s*$/m, `${locale}/${slug} missing dialogue`)
        assert.match(body, /^\s+- type:\s*listen\s*$/m, `${locale}/${slug} missing listen`)
        assert.match(body, /^\s+- type:\s*practice\s*$/m, `${locale}/${slug} missing practice`)
        assert.match(body, /^\s+- type:\s*checkpoint\s*$/m, `${locale}/${slug} missing checkpoint`)
        assert.match(
          body,
          /^\s+kind:\s*(?:type_answer|order_words|listen_type)\s*$/m,
          `${locale}/${slug} missing controlled recall/production`,
        )
        assert.doesNotMatch(body, /^\s+kind:\s*mcq\s*$/m, `${locale}/${slug} still authors generic mcq`)
        assert.ok(assessedIds(body).length >= 5, `${locale}/${slug} needs stable assessed IDs`)
      }
    }
  })

  it('English A1 vi/en variants preserve the same assessed item IDs', () => {
    for (const slug of englishSlugs) {
      const en = read(join(repoRoot, `docs/curriculum/english-basics/en/${slug}.md`))
      const vi = read(join(repoRoot, `docs/curriculum/english-basics/vi/${slug}.md`))
      assert.deepEqual(assessedIds(vi), assessedIds(en), `${slug} assessed IDs drifted between locales`)
    }
  })

  it('English greeting content keeps a pragmatic first-meeting exchange', () => {
    for (const locale of ['en', 'vi']) {
      const body = read(join(repoRoot, `docs/curriculum/english-basics/${locale}/greetings.md`))
      assert.doesNotMatch(body, /Hi! Thank you\./)
      assert.match(body, /id:\s*greet-/)
      assert.match(body, /kind:\s*dialogue_choice/)
      assert.match(body, /kind:\s*order_words/)
      assert.match(body, /kind:\s*type_answer/)
    }
  })
})
