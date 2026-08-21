/**
 * Language lesson path v2 (sentence steps).
 * Run: node --experimental-strip-types --test scripts/check-language-path-v2.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  languageHasSteps,
  languageStepsFromLesson,
  practiceFromStep,
} from '../app/utils/languageLesson.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '../..')
const read = (abs) => readFileSync(abs, 'utf8')

describe('language-lesson-path-v2', () => {
  it('ships pedagogy v2 process lock citing Duolingo path research', () => {
    const path = join(repoRoot, 'docs/processes/language-learning-pedagogy-v2.md')
    assert.equal(existsSync(path), true)
    const body = read(path)
    assert.match(body, /Duolingo/)
    assert.match(body, /HelloChinese/)
    assert.match(body, /steps/)
    assert.match(body, /Freeze|freeze|glossary/i)
  })

  it('parses steps and practice from lesson exercise payload', () => {
    const lesson = {
      exercise: {
        canDo: 'Greet',
        steps: [
          { type: 'dialogue', lines: [{ text: '你好！', reading: 'nǐ hǎo' }] },
          {
            type: 'practice',
            kind: 'mcq',
            prompt: 'Hello?',
            choices: ['你好', '再见'],
            answer: '你好',
          },
        ],
      },
    }
    assert.equal(languageHasSteps(lesson), true)
    assert.equal(languageStepsFromLesson(lesson).length, 2)
    const practice = practiceFromStep(languageStepsFromLesson(lesson)[1])
    assert.equal(practice?.answer, '你好')
  })

  it('all chinese-hsk lessons include steps + can_do (path v2)', () => {
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
      for (const slug of slugs) {
        const raw = read(join(repoRoot, `docs/curriculum/chinese-hsk/${loc}/${slug}.md`))
        assert.match(raw, /can_do:/, `${loc}/${slug} missing can_do`)
        assert.match(raw, /steps:/, `${loc}/${slug} missing steps`)
        assert.match(raw, /type:\s*dialogue/, `${loc}/${slug} missing dialogue`)
        assert.match(raw, /type:\s*practice/, `${loc}/${slug} missing practice`)
      }
    }
  })

  it('all english-basics lessons include steps + can_do (path v2)', () => {
    const slugs = ['greetings', 'people', 'numbers', 'family', 'food-drink', 'places']
    for (const loc of ['en', 'vi']) {
      for (const slug of slugs) {
        const raw = read(
          join(repoRoot, `docs/curriculum/english-basics/${loc}/${slug}.md`),
        )
        assert.match(raw, /can_do:/, `en-basics ${loc}/${slug} missing can_do`)
        assert.match(raw, /steps:/, `en-basics ${loc}/${slug} missing steps`)
        assert.match(raw, /type:\s*dialogue/, `en-basics ${loc}/${slug} missing dialogue`)
        assert.match(raw, /type:\s*practice/, `en-basics ${loc}/${slug} missing practice`)
      }
    }
  })

  it('all japanese-jlpt lessons include steps + can_do (path v2)', () => {
    const slugs = ['politeness', 'people', 'numbers', 'family', 'food-drink', 'places']
    for (const loc of ['en', 'vi']) {
      for (const slug of slugs) {
        const raw = read(
          join(repoRoot, `docs/curriculum/japanese-jlpt/${loc}/${slug}.md`),
        )
        assert.match(raw, /can_do:/, `ja ${loc}/${slug} missing can_do`)
        assert.match(raw, /steps:/, `ja ${loc}/${slug} missing steps`)
        assert.match(raw, /type:\s*dialogue/, `ja ${loc}/${slug} missing dialogue`)
        assert.match(raw, /type:\s*practice/, `ja ${loc}/${slug} missing practice`)
      }
    }
  })

  it('all chinese-it-vocab lessons include steps + can_do (path v2)', () => {
    const slugs = [
      'hardware-software',
      'internet-apps',
      'ai-basics',
      'deep-learning',
      'nlp-basics',
      'tech-hubs',
    ]
    for (const loc of ['en', 'vi']) {
      for (const slug of slugs) {
        const raw = read(
          join(repoRoot, `docs/curriculum/chinese-it-vocab/${loc}/${slug}.md`),
        )
        assert.match(raw, /can_do:/, `zh-it ${loc}/${slug} missing can_do`)
        assert.match(raw, /steps:/, `zh-it ${loc}/${slug} missing steps`)
        assert.match(raw, /type:\s*dialogue/, `zh-it ${loc}/${slug} missing dialogue`)
        assert.match(raw, /type:\s*practice/, `zh-it ${loc}/${slug} missing practice`)
      }
    }
  })

  it('routes step-based language lessons through the dedicated player', () => {
    const page = read(join(webRoot, 'app/pages/tracks/[track]/lessons/[slug].vue'))
    assert.match(page, /LanguageLessonPlayer/)
    assert.match(page, /languageHasStepPath|languageHasSteps/)
    assert.match(page, /legacyFormatNote/)

    const player = read(join(webRoot, 'app/components/LanguageLessonPlayer.vue'))
    assert.match(player, /LanguageLessonSteps/)
    assert.match(player, /:lesson="lesson"/)
    assert.match(player, /:track-id="trackId"/)
    assert.match(player, /@passed="\$emit\('passed'\)"/)
  })
})
