/**
 * Snackbar queue + breadcrumb builders.
 * Run: node --experimental-strip-types --test scripts/check-feedback-nav.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildHubBreadcrumbs,
  buildLearnBreadcrumbs,
  normalizeBreadcrumbs,
} from '../app/utils/breadcrumbs.ts'
import {
  SNACKBAR_DEFAULT_DURATION,
  SNACKBAR_MAX,
  createSnackbarItem,
  dismissSnackbar,
  pushSnackbar,
} from '../app/utils/snackbar.ts'

describe('snackbar', () => {
  it('creates items and rejects empty messages', () => {
    assert.equal(createSnackbarItem({ message: '   ' }), null)
    const item = createSnackbarItem({ message: ' Saved ', tone: 'success' })
    assert.ok(item)
    assert.equal(item.message, 'Saved')
    assert.equal(item.tone, 'success')
    assert.equal(item.duration, SNACKBAR_DEFAULT_DURATION)
  })

  it('caps queue length and dismisses by id', () => {
    assert.equal(SNACKBAR_MAX, 3)
    let q = []
    for (let i = 0; i < 4; i++) {
      const item = createSnackbarItem({ message: `m${i}`, id: `id-${i}` })
      q = pushSnackbar(q, item)
    }
    assert.equal(q.length, 3)
    assert.equal(q[0].id, 'id-1')
    q = dismissSnackbar(q, 'id-2')
    assert.deepEqual(
      q.map((x) => x.id),
      ['id-1', 'id-3'],
    )
  })
})

describe('breadcrumbs', () => {
  it('builds learn hierarchy with current lesson unlinked', () => {
    const crumbs = buildLearnBreadcrumbs({
      homeLabel: 'Home',
      homeTo: '/vi',
      tracksLabel: 'Tracks',
      tracksTo: '/vi/tracks',
      categoryLabel: 'SQL',
      categoryTo: '/vi/tracks?category=sql',
      trackLabel: 'SQL Basics',
      trackTo: '/vi/tracks/sql-fundamentals',
      lessonLabel: 'SELECT',
    })
    assert.equal(crumbs.length, 5)
    assert.equal(crumbs[4].label, 'SELECT')
    assert.equal(crumbs[4].to, null)
    assert.equal(crumbs[3].to, '/vi/tracks/sql-fundamentals')
  })

  it('builds hub crumbs Home → page', () => {
    const crumbs = buildHubBreadcrumbs({
      homeLabel: 'Home',
      homeTo: '/',
      pageLabel: 'Progress',
    })
    assert.deepEqual(crumbs, [
      { label: 'Home', to: '/' },
      { label: 'Progress', to: null },
    ])
  })

  it('drops empty labels', () => {
    assert.deepEqual(normalizeBreadcrumbs([{ label: '  ', to: '/' }, { label: 'A' }]), [
      { label: 'A', to: null },
    ])
  })
})
