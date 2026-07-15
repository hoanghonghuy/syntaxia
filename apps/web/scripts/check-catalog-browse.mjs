/**
 * Tracks catalog browse helpers (category filter + pagination).
 * Run: node --experimental-strip-types --test scripts/check-catalog-browse.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  TRACKS_PAGE_SIZE,
  HOME_TRACKS_PER_CATEGORY,
  filterTracksByCategory,
  firstTrackId,
  groupTracksByCategory,
  paginateItems,
  parseTracksQuery,
  previewTracksByCategory,
} from '../app/utils/catalogBrowse.ts'

function track(id, category, sortOrder) {
  return {
    id,
    title: { en: id },
    description: { en: id },
    category,
    level: 'basic',
    sortOrder,
  }
}

const sample = [
  track('sql-a', 'sql', 1),
  track('sql-b', 'sql', 2),
  track('js-a', 'code', 3),
  track('sql-c', 'sql', 4),
]

describe('catalogBrowse', () => {
  it('filters by category and keeps sort order', () => {
    const sql = filterTracksByCategory(sample, 'sql')
    assert.deepEqual(
      sql.map((t) => t.id),
      ['sql-a', 'sql-b', 'sql-c'],
    )
    assert.equal(filterTracksByCategory(sample, 'all').length, 4)
  })

  it('groups tracks by category', () => {
    const groups = groupTracksByCategory(sample)
    assert.deepEqual(
      groups.map((g) => g.category),
      ['sql', 'code'],
    )
    assert.equal(groups[0].tracks.length, 3)
  })

  it('paginates with a stable page size and clamps page', () => {
    assert.equal(TRACKS_PAGE_SIZE, 12)
    const many = Array.from({ length: 25 }, (_, i) => track(`t${i}`, 'sql', i))
    const page1 = paginateItems(many, 1, 12)
    assert.equal(page1.items.length, 12)
    assert.equal(page1.totalPages, 3)
    assert.equal(page1.page, 1)
    const page99 = paginateItems(many, 99, 12)
    assert.equal(page99.page, 3)
    assert.equal(page99.items.length, 1)
  })

  it('parses category and page from route query', () => {
    assert.deepEqual(parseTracksQuery({ category: 'code', page: '2' }), {
      category: 'code',
      page: 2,
    })
    assert.deepEqual(parseTracksQuery({}), { category: 'all', page: 1 })
  })

  it('previews a capped home list per category', () => {
    assert.equal(HOME_TRACKS_PER_CATEGORY, 3)
    const many = [
      track('a', 'sql', 1),
      track('b', 'sql', 2),
      track('c', 'sql', 3),
      track('d', 'sql', 4),
      track('e', 'code', 5),
    ]
    const preview = previewTracksByCategory(many, 3)
    assert.equal(preview[0].tracks.length, 3)
    assert.equal(preview[0].total, 4)
    assert.equal(preview[0].hasMore, true)
    assert.equal(preview[1].hasMore, false)
    assert.equal(firstTrackId(many), 'a')
    assert.equal(firstTrackId([]), null)
  })
})
