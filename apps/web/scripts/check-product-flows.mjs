import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = path.resolve(import.meta.dirname, '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')
const exists = (relative) => fs.existsSync(path.join(root, relative))

const coreRoutes = [
  'app/pages/index.vue',
  'app/pages/tracks/index.vue',
  'app/pages/progress.vue',
  'app/pages/notes.vue',
  'app/pages/search.vue',
  'app/pages/account.vue',
  'app/pages/login.vue',
  'app/pages/register.vue',
  'app/pages/tracks/[track]/index.vue',
  'app/pages/tracks/[track]/lessons/[slug].vue',
  'app/pages/tracks/[track]/review.vue',
]

test('all existing core product routes remain present', () => {
  for (const route of coreRoutes) assert.ok(exists(route), `missing core route ${route}`)
})

test('catalog hubs expose loading, failure recovery and empty states', () => {
  for (const route of ['app/pages/tracks/index.vue', 'app/pages/progress.vue', 'app/pages/search.vue']) {
    const source = read(route)
    assert.match(source, /SkeletonHub|showSkeleton/, `${route} missing loading state`)
    assert.match(source, /loadError/, `${route} missing load error state`)
    assert.match(source, /retry/i, `${route} missing retry path`)
  }

  const tracks = read('app/pages/tracks/index.vue')
  assert.match(tracks, /emptyCategory/, 'tracks missing empty-category state')
  const progress = read('app/pages/progress.vue')
  assert.match(progress, /emptyDomain/, 'progress missing empty-domain state')
  const search = read('app/pages/search.vue')
  assert.match(search, /noMatch/, 'search missing no-result state')
})

test('member hubs preserve guest gates and return paths', () => {
  for (const route of ['app/pages/progress.vue', 'app/pages/notes.vue', 'app/pages/account.vue']) {
    const source = read(route)
    assert.match(source, /!auth\.user/, `${route} missing guest gate`)
    assert.match(source, /loginPath/, `${route} missing login CTA`)
    assert.match(source, /registerPath/, `${route} missing registration CTA`)
    assert.match(source, /redirect:/, `${route} must preserve the requested destination`)
  }
})

test('notes and search remain recoverable discovery flows', () => {
  const notes = read('app/pages/notes.vue')
  assert.match(notes, /notes\.empty/, 'notes missing empty state')
  assert.match(notes, /notes\.noMatch/, 'notes missing filtered-empty state')
  assert.match(notes, /type="search"/, 'notes missing filter control')

  const search = read('app/pages/search.vue')
  assert.match(search, /type="search"/, 'search missing search control')
  assert.match(search, /visually-hidden/, 'search control needs an accessible label')
  assert.match(search, /hits\.tracks/, 'search must surface track matches')
  assert.match(search, /hits\.lessons/, 'search must surface lesson matches')
})

test('lesson and review routes use the production language flow', () => {
  const lesson = read('app/pages/tracks/[track]/lessons/[slug].vue')
  assert.match(lesson, /LanguageLessonPlayer/, 'lesson route missing dedicated language player')
  assert.match(lesson, /catalog\.loadError|loadError/, 'lesson route missing recoverable load state')

  const review = read('app/pages/tracks/[track]/review.vue')
  assert.match(review, /dueLanguageReviews\(/, 'review route missing due-card flow')
  assert.match(review, /recordLanguageAttempt\(/, 'review route missing server-graded persisted attempt')
  assert.doesNotMatch(review, /recordLanguageReview\(/, 'review route must not persist client-decided ratings')
  assert.match(review, /completedLessonSummaries/, 'review route must derive reviewable completed lessons')
  assert.match(review, /extractIndexedReviewExercisesFromLesson/, 'review route must map authored stable review items')
})

test('home adapts from discovery map to a recoverable Today plan for returning learners', () => {
  const map = read('app/components/HomeLearningMap.vue')
  const today = read('app/components/HomeTodaySession.vue')
  const api = read('app/composables/useApi.ts')

  assert.match(map, /HomeTodaySession/, 'home learning map missing adaptive Today surface')
  assert.match(map, /progressLoaded/, 'Today surface must wait for authoritative progress state')
  assert.match(map, /completedAt/, 'Today surface must prefer the recently studied track')
  assert.match(api, /\/api\/v1\/learning\/today/, 'web API missing Today session endpoint')
  assert.match(today, /dailyLearningSession\(/, 'Today surface does not load the server-composed plan')
  assert.match(today, /loading/, 'Today surface missing loading state')
  assert.match(today, /loadError/, 'Today surface missing recoverable error state')
  assert.match(today, /loadSession/, 'Today surface missing retry path')
  assert.match(today, /\/review/, 'Today review item must navigate to the review route')
  assert.match(today, /\/lessons\//, 'Today repair/new-lesson items must navigate to lessons')
})

test('auth pages keep explicit redirect handling', () => {
  for (const route of ['app/pages/login.vue', 'app/pages/register.vue']) {
    const source = read(route)
    assert.match(source, /redirect/, `${route} missing redirect handling`)
    assert.match(source, /role="alert"/, `${route} missing accessible error announcement`)
  }
})
