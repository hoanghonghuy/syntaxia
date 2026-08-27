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
  nextLessonForTrack,
  overallProgress,
  overallProgressForDomain,
  prioritizeTracksByRecentProgress,
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

  it('does not rewind a returning language learner to an inserted Unit 0', () => {
    const lessons = [
      {
        id: 'foundation', locale: 'en', trackId: 'english-basics', slug: 'foundation', title: 'Foundation',
        sortOrder: -1, published: true, unitId: 'en-a1-foundation-00', unitOrder: 0, unitRole: 'lesson',
      },
      {
        id: 'old-1', locale: 'en', trackId: 'english-basics', slug: 'old-1', title: 'Old 1',
        sortOrder: 1, published: true, unitId: 'en-a1-meeting-01', unitOrder: 1, unitRole: 'lesson',
      },
      {
        id: 'old-2', locale: 'en', trackId: 'english-basics', slug: 'old-2', title: 'Old 2',
        sortOrder: 2, published: true, unitId: 'en-a1-meeting-01', unitOrder: 1, unitRole: 'lesson',
      },
    ]
    const progress = [{ lessonId: 'old-1', locale: 'en', completed: true }]
    assert.equal(nextIncompleteLesson(lessons, progress, 'en')?.id, 'foundation')
    assert.equal(nextLessonForTrack('english-basics', lessons, progress, 'en')?.id, 'old-2')
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

  it('prioritizes the most recently studied track for a global Continue action', () => {
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
        id: 't2',
        title: { en: 'Japanese' },
        description: { en: '' },
        category: 'languages',
        level: 'basic',
        sortOrder: 120,
      },
    ]
    const byTrack = { t1: lessonsA, t2: lessonsB }
    const progress = [
      { lessonId: 'a1', locale: 'en', completed: true, completedAt: '2026-08-20T10:00:00Z' },
      { lessonId: 'b1', locale: 'en', completed: true, completedAt: '2026-08-25T10:00:00Z' },
    ]
    assert.deepEqual(
      prioritizeTracksByRecentProgress(tracks, byTrack, progress, 'en').map((track) => track.id),
      ['t2', 't1'],
    )
    assert.deepEqual(
      prioritizeTracksByRecentProgress(tracks, byTrack, progress, 'vi').map((track) => track.id),
      ['t1', 't2'],
    )
  })

  it('keeps catalog order for learners without history', () => {
    const tracks = [
      {
        id: 't2',
        title: { en: 'B' },
        description: { en: '' },
        category: 'languages',
        level: 'basic',
        sortOrder: 120,
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
    assert.deepEqual(
      prioritizeTracksByRecentProgress(tracks, { t1: lessonsA, t2: lessonsB }, [], 'en')
        .map((track) => track.id),
      ['t1', 't2'],
    )
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

  it('resumes the most recently studied unfinished track inside a domain', () => {
    const tracks = [
      {
        id: 'chinese-hsk', title: { en: 'Mandarin' }, description: { en: '' },
        category: 'languages', level: 'basic', sortOrder: 100,
      },
      {
        id: 'japanese-jlpt', title: { en: 'Japanese' }, description: { en: '' },
        category: 'languages', level: 'basic', sortOrder: 120,
      },
    ]
    const mandarin = [
      { id: 'zh1', locale: 'en', trackId: 'chinese-hsk', slug: 'zh1', title: 'ZH 1', sortOrder: 1, published: true, unitId: 'zh-u1', unitOrder: 1, unitRole: 'lesson' },
      { id: 'zh2', locale: 'en', trackId: 'chinese-hsk', slug: 'zh2', title: 'ZH 2', sortOrder: 2, published: true, unitId: 'zh-u1', unitOrder: 1, unitRole: 'lesson' },
    ]
    const japanese = [
      { id: 'ja1', locale: 'en', trackId: 'japanese-jlpt', slug: 'ja1', title: 'JA 1', sortOrder: 1, published: true, unitId: 'ja-u1', unitOrder: 1, unitRole: 'lesson' },
      { id: 'ja2', locale: 'en', trackId: 'japanese-jlpt', slug: 'ja2', title: 'JA 2', sortOrder: 2, published: true, unitId: 'ja-u1', unitOrder: 1, unitRole: 'lesson' },
    ]
    const byTrack = { 'chinese-hsk': mandarin, 'japanese-jlpt': japanese }
    const progress = [
      { lessonId: 'zh1', locale: 'en', completed: true, completedAt: '2026-08-20T10:00:00Z' },
      { lessonId: 'ja1', locale: 'en', completed: true, completedAt: '2026-08-25T10:00:00Z' },
    ]
    const resume = resumeTargetForDomain(tracks, byTrack, progress, 'en', 'languages')
    assert.equal(resume?.trackId, 'japanese-jlpt')
    assert.equal(resume?.lesson.id, 'ja2')
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
