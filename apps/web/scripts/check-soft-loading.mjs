/**
 * Soft loading helper — keep content while refreshing.
 * Run: node --experimental-strip-types --test scripts/check-soft-loading.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { shouldShowSkeleton } from '../app/utils/softLoading.ts'

describe('softLoading', () => {
  it('shows skeleton only when loading with no content yet', () => {
    assert.equal(shouldShowSkeleton(true, false), true)
    assert.equal(shouldShowSkeleton(true, true), false)
    assert.equal(shouldShowSkeleton(false, false), false)
    assert.equal(shouldShowSkeleton(false, true), false)
  })
})
