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

  it('filterCatalog scopes hits to a learning domain', () => {
    const tracks = [
      {
        id: 'sql-fundamentals',
        title: { en: 'SQL Fundamentals', vi: 'SQL cơ bản' },
        description: { en: 'queries', vi: '' },
        category: 'sql',
        level: 'basic',
        sortOrder: 1,
      },
      {
        id: 'chinese-hsk',
        title: { en: 'Chinese (HSK)', vi: 'Tiếng Trung' },
        description: { en: 'Mandarin greetings', vi: '' },
        category: 'languages',
        level: 'basic',
        sortOrder: 100,
      },
    ]
    const lessonsByTrack = {
      'sql-fundamentals': [
        {
          id: 'l1',
          locale: 'en',
          trackId: 'sql-fundamentals',
          slug: 'select',
          title: 'SELECT queries',
          sortOrder: 1,
          published: true,
        },
      ],
      'chinese-hsk': [
        {
          id: 'z1',
          locale: 'en',
          trackId: 'chinese-hsk',
          slug: 'greetings',
          title: 'Greetings',
          sortOrder: 1,
          published: true,
        },
      ],
    }
    const itHits = filterCatalog(tracks, lessonsByTrack, 'en', 'greet', 'it')
    assert.equal(itHits.tracks.length, 0)
    assert.equal(itHits.lessons.length, 0)
    const langHits = filterCatalog(tracks, lessonsByTrack, 'en', 'greet', 'languages')
    assert.equal(langHits.tracks.length, 1)
    assert.equal(langHits.tracks[0].id, 'chinese-hsk')
    assert.equal(langHits.lessons.length, 1)
    assert.equal(langHits.lessons[0].slug, 'greetings')
    const sqlInLang = filterCatalog(tracks, lessonsByTrack, 'en', 'select', 'languages')
    assert.equal(sqlInLang.tracks.length, 0)
    assert.equal(sqlInLang.lessons.length, 0)
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
