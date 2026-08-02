/**
 * Learning path helpers used by Progress hub.
 * Run: node --experimental-strip-types --test scripts/check-learning-path.mjs
 * Or: npm run test:learning-path
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildLanguageUnitPath,
  nextIncompleteLesson,
  overallProgress,
  overallProgressForDomain,
  resumeTargetForDomain,
  trackLessonStatusRows,
  trackProgress,
  trackProgressRows,
  trackProgressRowsForDomain,
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

  it('trackLessonStatusRows marks completed lessons and highlights next', () => {
    const progress = [{ lessonId: 'a1', locale: 'en', completed: true }]
    const rows = trackLessonStatusRows(lessonsA, progress, 'en')
    assert.equal(rows.length, 2)
    assert.equal(rows[0].completed, true)
    assert.equal(rows[0].isNext, false)
    assert.equal(rows[1].completed, false)
    assert.equal(rows[1].isNext, true)
    assert.equal(rows[1].slug, 'two')
  })

  it('scopes overall / rows / resume by learning domain', () => {
    const tracks = [
      {
        id: 't1',
        title: { en: 'SQL' },
        description: { en: '' },
        category: 'sql',
        level: 'basic',
        sortOrder: 1,
      },
      {
        id: 'zh',
        title: { en: 'Chinese' },
        description: { en: '' },
        category: 'languages',
        level: 'basic',
        sortOrder: 100,
      },
    ]
    const lessonsZh = [
      {
        id: 'z1',
        locale: 'en',
        trackId: 'zh',
        slug: 'hi',
        title: 'Hi',
        sortOrder: 1,
        published: true,
      },
    ]
    const byTrack = { t1: lessonsA, zh: lessonsZh }
    const progress = [
      { lessonId: 'a1', locale: 'en', completed: true },
      { lessonId: 'z1', locale: 'en', completed: false },
    ]
    assert.deepEqual(overallProgressForDomain(tracks, byTrack, progress, 'en', 'it'), {
      done: 1,
      total: 2,
      percent: 50,
    })
    assert.deepEqual(overallProgressForDomain(tracks, byTrack, progress, 'en', 'languages'), {
      done: 0,
      total: 1,
      percent: 0,
    })
    const itRows = trackProgressRowsForDomain(tracks, byTrack, progress, 'en', 'it')
    assert.deepEqual(
      itRows.map((r) => r.trackId),
      ['t1'],
    )
    const langRows = trackProgressRowsForDomain(tracks, byTrack, progress, 'en', 'languages')
    assert.deepEqual(
      langRows.map((r) => r.trackId),
      ['zh'],
    )
    const resumeLang = resumeTargetForDomain(tracks, byTrack, progress, 'en', 'languages')
    assert.equal(resumeLang?.trackId, 'zh')
    assert.equal(resumeLang?.lesson.id, 'z1')
    const resumeIt = resumeTargetForDomain(tracks, byTrack, progress, 'en', 'it')
    assert.equal(resumeIt?.trackId, 't1')
    assert.equal(resumeIt?.lesson.id, 'a2')
  })

  it('buildLanguageUnitPath marks done / current / locked sequentially', () => {
    const progress = [{ lessonId: 'a1', locale: 'en', completed: true }]
    const nodes = buildLanguageUnitPath(lessonsA, progress, 'en')
    assert.equal(nodes.length, 2)
    assert.equal(nodes[0].state, 'done')
    assert.equal(nodes[0].clickable, true)
    assert.equal(nodes[1].state, 'current')
    assert.equal(nodes[1].clickable, true)
    const three = [
      ...lessonsA,
      {
        id: 'a3',
        locale: 'en',
        trackId: 't1',
        slug: 'three',
        title: 'Three',
        sortOrder: 3,
        published: true,
      },
    ]
    const lockedPath = buildLanguageUnitPath(three, progress, 'en')
    assert.equal(lockedPath[2].state, 'locked')
    assert.equal(lockedPath[2].clickable, false)
  })
})
