/**
 * Language communicative-unit path contract.
 * Run: node --experimental-strip-types --test scripts/check-language-unit-path-hub.mjs
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { buildLanguageUnits, orderLanguageLessons } from '../app/utils/languageUnits.ts'

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

    const hub = read(join(webRoot, 'app/pages/tracks/[track]/index.vue'))
    assert.match(hub, /:lessons="hubLessons"/)
    assert.doesNotMatch(hub, /Promise\.all\([^)]*api\.lesson/)

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
