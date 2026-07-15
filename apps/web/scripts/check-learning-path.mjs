/**
 * Learning path helpers used by Progress hub.
 * Run: node --experimental-strip-types --test scripts/check-learning-path.mjs
 * Or: npm run test:learning-path
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  nextIncompleteLesson,
  overallProgress,
  trackProgress,
  trackProgressRows,
} from '../app/utils/learningPath.ts'

const lessonsA = [
  { id: 'a1', locale: 'en', trackId: 't1', slug: 'one', title: 'One', sortOrder: 1, published: true },
  { id: 'a2', locale: 'en', trackId: 't1', slug: 'two', title: 'Two', sortOrder: 2, published: true },
]
const lessonsB = [
  { id: 'b1', locale: 'en', trackId: 't2', slug: 'alpha', title: 'Alpha', sortOrder: 1, published: true },
]

describe('learningPath', () => {
  it('trackProgress counts completed lessons for locale', () => {
    const progress = [
      { lessonId: 'a1', locale: 'en', completed: true },
      { lessonId: 'a2', locale: 'vi', completed: true },
    ]
    assert.deepEqual(trackProgress(lessonsA, progress, 'en'), { done: 1, total: 2, percent: 50 })
  })

  it('nextIncompleteLesson returns first unfinished in sort order', () => {
    const progress = [{ lessonId: 'a1', locale: 'en', completed: true }]
    const next = nextIncompleteLesson(lessonsA, progress, 'en')
    assert.equal(next?.id, 'a2')
  })

  it('overallProgress aggregates across tracks', () => {
    const byTrack = { t1: lessonsA, t2: lessonsB }
    const progress = [
      { lessonId: 'a1', locale: 'en', completed: true },
      { lessonId: 'b1', locale: 'en', completed: true },
    ]
    assert.deepEqual(overallProgress(byTrack, progress, 'en'), {
      done: 2,
      total: 3,
      percent: 66,
    })
  })

  it('trackProgressRows sorts by track sortOrder and includes next lesson', () => {
    const tracks = [
      {
        id: 't2',
        title: { en: 'B' },
        description: { en: '' },
        category: 'sql',
        level: 'basic',
        sortOrder: 2,
      },
      {
        id: 't1',
        title: { en: 'A' },
        description: { en: '' },
        category: 'sql',
        level: 'basic',
        sortOrder: 1,
      },
    ]
    const byTrack = { t1: lessonsA, t2: lessonsB }
    const progress = [{ lessonId: 'a1', locale: 'en', completed: true }]
    const rows = trackProgressRows(tracks, byTrack, progress, 'en')
    assert.equal(rows[0].trackId, 't1')
    assert.equal(rows[0].done, 1)
    assert.equal(rows[0].next?.id, 'a2')
    assert.equal(rows[1].trackId, 't2')
    assert.equal(rows[1].next?.id, 'b1')
  })
})
