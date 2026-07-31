/**
 * Learning domains (IT vs languages) helpers.
 * Run: node --experimental-strip-types --test scripts/check-learning-domains.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  categoriesInDomain,
  domainForCategory,
  filterTracksByDomain,
  parseDomainQuery,
} from '../app/utils/learningDomains.ts'
import {
  filterTracksByDomainAndCategory,
  parseTracksQuery,
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
  track('js-a', 'code', 3),
  track('zh-a', 'languages', 100),
  track('html-a', 'web', 5),
]

describe('learningDomains', () => {
  it('maps categories to domains', () => {
    assert.equal(domainForCategory('sql'), 'it')
    assert.equal(domainForCategory('web'), 'it')
    assert.equal(domainForCategory('code'), 'it')
    assert.equal(domainForCategory('languages'), 'languages')
    assert.equal(domainForCategory(undefined), 'it')
  })

  it('filters tracks by domain', () => {
    assert.deepEqual(
      filterTracksByDomain(sample, 'it').map((t) => t.id),
      ['sql-a', 'js-a', 'html-a'],
    )
    assert.deepEqual(
      filterTracksByDomain(sample, 'languages').map((t) => t.id),
      ['zh-a'],
    )
  })

  it('lists categories inside a domain only', () => {
    assert.deepEqual(categoriesInDomain(sample, 'it'), ['code', 'sql', 'web'])
    assert.deepEqual(categoriesInDomain(sample, 'languages'), ['languages'])
  })

  it('defaults missing domain query to it', () => {
    assert.equal(parseDomainQuery(undefined), 'it')
    assert.equal(parseDomainQuery('languages'), 'languages')
    assert.equal(parseDomainQuery('nope'), 'it')
  })

  it('parseTracksQuery includes domain', () => {
    assert.deepEqual(parseTracksQuery({ domain: 'languages', category: 'languages', page: '1' }), {
      domain: 'languages',
      category: 'languages',
      page: 1,
    })
    assert.deepEqual(parseTracksQuery({}), { domain: 'it', category: 'all', page: 1 })
  })

  it('filters by domain then category', () => {
    assert.deepEqual(
      filterTracksByDomainAndCategory(sample, 'it', 'sql').map((t) => t.id),
      ['sql-a'],
    )
    assert.deepEqual(
      filterTracksByDomainAndCategory(sample, 'languages', 'all').map((t) => t.id),
      ['zh-a'],
    )
  })
})
