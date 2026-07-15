/**
 * Client catalog/notes search helpers.
 * Run: node --experimental-strip-types --test scripts/check-catalog-search.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { filterCatalog, filterNotes, normalizeQuery } from '../app/utils/catalogSearch.ts'

describe('catalogSearch', () => {
  it('normalizeQuery trims and lowercases', () => {
    assert.equal(normalizeQuery('  SELECT  '), 'select')
  })

  it('filterCatalog matches track and lesson titles', () => {
    const tracks = [
      {
        id: 'sql-fundamentals',
        title: { en: 'SQL Fundamentals', vi: 'SQL cơ bản' },
        description: { en: '', vi: '' },
        category: 'sql',
        level: 'basic',
        sortOrder: 1,
      },
    ]
    const lessonsByTrack = {
      'sql-fundamentals': [
        {
          id: 'l1',
          locale: 'en',
          trackId: 'sql-fundamentals',
          slug: 'what-is-sql',
          title: 'What is SQL?',
          sortOrder: 0,
          published: true,
        },
        {
          id: 'l2',
          locale: 'en',
          trackId: 'sql-fundamentals',
          slug: 'joins',
          title: 'Joins',
          sortOrder: 1,
          published: true,
        },
      ],
    }
    const hits = filterCatalog(tracks, lessonsByTrack, 'en', 'sql')
    assert.equal(hits.tracks.length, 1)
    assert.equal(hits.lessons.length, 1)
    assert.equal(hits.lessons[0].slug, 'what-is-sql')
  })

  it('filterNotes matches body and lesson title', () => {
    const notes = [
      {
        id: 'n1',
        lessonId: 'l1',
        locale: 'en',
        body: 'Remember WHERE filters rows',
        updatedAt: '2026-01-01',
        slug: 'where',
        title: 'WHERE clause',
        trackId: 'sql-fundamentals',
      },
      {
        id: 'n2',
        lessonId: 'l2',
        locale: 'en',
        body: 'JOIN combines tables',
        updatedAt: '2026-01-02',
        slug: 'joins',
        title: 'Joins',
        trackId: 'sql-fundamentals',
      },
    ]
    const hits = filterNotes(notes, 'where')
    assert.equal(hits.length, 1)
    assert.equal(hits[0].id, 'n1')
  })
})
