/**
 * Language review session helpers.
 * Run: node --experimental-strip-types --test scripts/check-language-review.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  buildReviewSession,
  completedLessonSummaries,
  extractReviewExercisesFromLesson,
} from '../app/utils/languageReview.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (abs) => readFileSync(abs, 'utf8')

const sampleLesson = {
  exercise: {
    steps: [
      { type: 'dialogue', lines: [{ text: '你好' }] },
      {
        type: 'practice',
        kind: 'mcq',
        prompt: 'Hello?',
        choices: ['你好', '再见'],
        answer: '你好',
      },
      {
        type: 'checkpoint',
        items: [
          {
            kind: 'mcq',
            prompt: 'Bye?',
            choices: ['再见', '谢谢'],
            answer: '再见',
          },
        ],
      },
    ],
  },
}

describe('language-review-session', () => {
  it('extracts practice and checkpoint items from steps', () => {
    const items = extractReviewExercisesFromLesson(sampleLesson)
    assert.equal(items.length, 2)
    assert.equal(items[0].answer, '你好')
    assert.equal(items[1].answer, '再见')
  })

  it('builds capped shuffled session deterministically with rng', () => {
    const session = buildReviewSession([sampleLesson, sampleLesson], {
      size: 1,
      rng: () => 0,
    })
    assert.equal(session.length, 1)
  })

  it('lists completed lesson summaries only', () => {
    const lessons = [
      { id: 'a', slug: 'one', sortOrder: 1 },
      { id: 'b', slug: 'two', sortOrder: 2 },
    ]
    const progress = [
      { lessonId: 'b', locale: 'en', completed: true },
      { lessonId: 'a', locale: 'vi', completed: true },
    ]
    const done = completedLessonSummaries(lessons, progress, 'en')
    assert.deepEqual(
      done.map((d) => d.id),
      ['b'],
    )
  })

  it('ships review page and hub CTA wiring', () => {
    assert.equal(
      existsSync(join(webRoot, 'app/pages/tracks/[track]/review.vue')),
      true,
    )
    const hub = read(join(webRoot, 'app/pages/tracks/[track]/index.vue'))
    assert.match(hub, /\/review/)
    assert.match(hub, /reviewSession|unitReview/)
  })
})
