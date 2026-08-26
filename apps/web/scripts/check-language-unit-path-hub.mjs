/**
 * Language communicative-unit path contract.
 * Run: node --experimental-strip-types --test scripts/check-language-unit-path-hub.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  buildLanguageUnits,
  nextLanguageLesson,
  orderLanguageLessons,
} from '../app/utils/languageUnits.ts'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(webRoot, '..', '..')
const read = (abs) => readFileSync(abs, 'utf8')

function lesson(id, slug, title, sortOrder, unit = {}) {
  return {
    id,
    locale: 'en',
    trackId: 'english-basics',
    slug,
    title,
    sortOrder,
    published: true,
    ...unit,
  }
}

describe('language communicative unit path', () => {
  it('orders a complete unit as lesson -> checkpoint -> review before the next unit', () => {
    const lessons = [
      lesson('next', 'people', 'Talk about people', 2),
      lesson('review', 'meeting-review', 'Review', 3, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'review',
      }),
      lesson('lesson', 'greetings', 'Say hello', 1, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'lesson',
      }),
      lesson('checkpoint', 'meeting-checkpoint', 'Checkpoint', 2, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'checkpoint',
      }),
    ]

    assert.deepEqual(
      orderLanguageLessons(lessons).map((item) => item.id),
      ['lesson', 'checkpoint', 'review', 'next'],
    )
  })

  it('keeps an explicit foundation unit at unit order zero before unit one', () => {
    const lessons = [
      lesson('u1-lesson', 'greetings', 'Say hello', 1, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start a short meeting', unitRole: 'lesson',
      }),
      lesson('u0-review', 'pronunciation-review', 'Review sounds', -1, {
        unitId: 'u0', unitTitle: 'Pronunciation foundation', unitOrder: 0,
        unitCanDo: 'Hear and reproduce core sounds', unitRole: 'review',
      }),
      lesson('u0-lesson', 'pinyin-syllables', 'Build a syllable', -5, {
        unitId: 'u0', unitTitle: 'Pronunciation foundation', unitOrder: 0,
        unitCanDo: 'Hear and reproduce core sounds', unitRole: 'lesson',
      }),
    ]

    assert.deepEqual(
      orderLanguageLessons(lessons).map((item) => item.id),
      ['u0-lesson', 'u0-review', 'u1-lesson'],
    )
    const units = buildLanguageUnits(lessons, [], 'en')
    assert.deepEqual(units.map((unit) => unit.id), ['u0', 'u1'])
    assert.equal(units[0]?.sortOrder, 0)
    assert.equal(units[0]?.nodes[0]?.state, 'current')
    assert.equal(units[1]?.nodes[0]?.state, 'locked')
  })

  it('does not rewind a returning learner when earlier curriculum is inserted', () => {
    const lessons = [
      lesson('u0-lesson', 'pinyin-syllables', 'Build a syllable', -5, {
        unitId: 'u0', unitTitle: 'Pronunciation foundation', unitOrder: 0,
        unitCanDo: 'Hear and reproduce core sounds', unitRole: 'lesson',
      }),
      lesson('u0-review', 'pronunciation-review', 'Review sounds', -1, {
        unitId: 'u0', unitTitle: 'Pronunciation foundation', unitOrder: 0,
        unitCanDo: 'Hear and reproduce core sounds', unitRole: 'review',
      }),
      lesson('u1-lesson', 'greetings', 'Say hello', 1, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start a short meeting', unitRole: 'lesson',
      }),
      lesson('u1-checkpoint', 'greetings-checkpoint', 'Greeting checkpoint', 2, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start a short meeting', unitRole: 'checkpoint',
      }),
      lesson('u2-lesson', 'people', 'Talk about people', 3, {
        unitId: 'u2', unitTitle: 'People', unitOrder: 2,
        unitCanDo: 'Identify a person', unitRole: 'lesson',
      }),
    ]
    const progress = [{ lessonId: 'u1-lesson', locale: 'en', completed: true }]

    assert.equal(nextLanguageLesson(lessons, progress, 'en')?.id, 'u1-checkpoint')
    const units = buildLanguageUnits(lessons, progress, 'en')
    assert.deepEqual(units[0]?.nodes.map((node) => node.state), ['available', 'available'])
    assert.deepEqual(units[1]?.nodes.map((node) => node.state), ['done', 'current'])
    assert.equal(units[0]?.nodes.every((node) => node.clickable), true)
    assert.equal(units[2]?.nodes[0]?.state, 'locked')
  })

  it('returns to an earlier inserted gap after the established frontier is complete', () => {
    const lessons = [
      lesson('foundation', 'pinyin-syllables', 'Build a syllable', -5, {
        unitId: 'u0', unitTitle: 'Pronunciation foundation', unitOrder: 0, unitRole: 'lesson',
      }),
      lesson('old-1', 'greetings', 'Say hello', 1, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1, unitRole: 'lesson',
      }),
    ]
    const progress = [{ lessonId: 'old-1', locale: 'en', completed: true }]
    assert.equal(nextLanguageLesson(lessons, progress, 'en')?.id, 'foundation')
  })

  it('groups explicit summary metadata and preserves lesson/checkpoint/review roles', () => {
    const lessons = [
      lesson('l1', 'hello', 'Say hello', 1, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'lesson',
      }),
      lesson('l2', 'meeting-check', 'Meeting checkpoint', 2, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'checkpoint',
      }),
      lesson('l5', 'meeting-review', 'Meeting review', 3, {
        unitId: 'u1', unitTitle: 'Meet someone', unitOrder: 1,
        unitCanDo: 'Start and close a short first meeting', unitRole: 'review',
      }),
      lesson('l3', 'food', 'Order food', 3, {
        unitId: 'u2', unitTitle: 'At a café', unitOrder: 2,
        unitCanDo: 'Order one simple item politely', unitRole: 'lesson',
      }),
      lesson('l4', 'cafe-review', 'Café review', 4, {
        unitId: 'u2', unitTitle: 'At a café', unitOrder: 2,
        unitCanDo: 'Order one simple item politely', unitRole: 'review',
      }),
    ]
    const progress = [{ lessonId: 'l1', locale: 'en', completed: true }]

    const units = buildLanguageUnits(lessons, progress, 'en')

    assert.equal(units.length, 2)
    assert.equal(units[0].id, 'u1')
    assert.equal(units[0].title, 'Meet someone')
    assert.equal(units[0].canDo, 'Start and close a short first meeting')
    assert.deepEqual(units[0].nodes.map((node) => node.role), ['lesson', 'checkpoint', 'review'])
    assert.deepEqual(units[0].nodes.map((node) => node.state), ['done', 'current', 'locked'])
    assert.deepEqual(units[1].nodes.map((node) => node.role), ['lesson', 'review'])
    assert.deepEqual(units[1].nodes.map((node) => node.state), ['locked', 'locked'])
  })

  it('keeps unmigrated lessons visible without guessing groups from slugs or titles', () => {
    const units = buildLanguageUnits([
      lesson('legacy-1', 'greetings-part-1', 'Greetings', 1),
      lesson('legacy-2', 'greetings-part-2', 'Greetings', 2),
    ], [], 'en')

    assert.deepEqual(units.map((unit) => unit.id), ['lesson:legacy-1', 'lesson:legacy-2'])
    assert.deepEqual(units.map((unit) => unit.nodes.length), [1, 1])
    assert.deepEqual(units.flatMap((unit) => unit.nodes.map((node) => node.state)), ['current', 'locked'])
  })

  it('ships grouped unit UI backed by lean lesson-summary metadata', () => {
    const path = join(webRoot, 'app/components/LanguageUnitPath.vue')
    assert.equal(existsSync(path), true)
    const src = read(path)
    assert.match(src, /buildLanguageUnits/)
    assert.match(src, /unit\.canDo/)
    assert.match(src, /is-checkpoint/)
    assert.match(src, /is-review/)
    assert.match(src, /is-available/)
    assert.match(src, /nodeIndex \+ 1/)

    const hub = read(join(webRoot, 'app/pages/tracks/[track]/index.vue'))
    assert.match(hub, /:lessons="hubLessons"/)
    assert.doesNotMatch(hub, /Promise\.all\([^)]*api\.lesson/)

    const sidebar = read(join(webRoot, 'app/components/LearnSidebar.vue'))
    assert.match(sidebar, /orderLanguageLessons\(rawLessons\.value\)/)
    assert.match(sidebar, /v-for="\(item, index\) in lessons"/)
    assert.match(sidebar, /index \+ 1/)
    assert.doesNotMatch(sidebar, /\{\{ item\.sortOrder \}\}/)

    const catalog = read(join(webRoot, 'app/stores/catalog.ts'))
    assert.match(catalog, /nextLessonForTrack/)
    const learningPath = read(join(webRoot, 'app/utils/learningPath.ts'))
    assert.match(learningPath, /nextLanguageLesson/)
    assert.match(learningPath, /isLanguageTrack\(trackId\)/)

    const types = read(join(webRoot, 'app/types/api.ts'))
    for (const field of ['unitId', 'unitTitle', 'unitOrder', 'unitCanDo', 'unitRole']) {
      assert.match(types, new RegExp(`${field}\\?`))
    }

    const repo = read(join(repoRoot, 'apps/api/internal/repository/repository.go'))
    assert.match(repo, /exercise->>'unitId'/)
    assert.match(repo, /exercise->>'unitRole'/)
  })

  it('ships path i18n keys in en + vi', () => {
    for (const loc of ['en', 'vi']) {
      const json = JSON.parse(read(join(webRoot, `i18n/locales/${loc}.json`)))
      assert.equal(typeof json.lesson?.unitPath, 'string')
      assert.equal(typeof json.lesson?.unitUpNext, 'string')
      assert.equal(typeof json.lesson?.unitLocked, 'string')
    }
  })
})
