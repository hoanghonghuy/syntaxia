/**
 * Audit remediation: lesson load sequence guard.
 * Run: node --experimental-strip-types --test scripts/check-lesson-load.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createLessonLoadGuard, lessonLoadKey } from '../app/utils/lessonLoadGuard.ts'

describe('lessonLoadGuard', () => {
  it('ignores stale request ids', () => {
    const guard = createLessonLoadGuard()
    const first = guard.next()
    const second = guard.next()
    assert.equal(guard.isCurrent(first), false)
    assert.equal(guard.isCurrent(second), true)
  })

  it('builds stable load keys', () => {
    assert.equal(lessonLoadKey('intro', 'en'), 'en::intro')
  })
})
