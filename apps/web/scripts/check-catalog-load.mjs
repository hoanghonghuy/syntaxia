/**
 * Catalog load error helpers.
 * Run: node --experimental-strip-types --test scripts/check-catalog-load.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  formatCatalogLoadError,
  shouldShowCatalogError,
} from '../app/utils/catalogLoad.ts'
import { googleOAuthStartUrl } from '../app/utils/googleOAuth.ts'

describe('catalogLoad', () => {
  it('formats Error messages', () => {
    assert.equal(formatCatalogLoadError(new Error('network down')), 'network down')
    assert.equal(formatCatalogLoadError(null), 'load failed')
  })

  it('shows error only when not loading', () => {
    assert.equal(shouldShowCatalogError('x', false), true)
    assert.equal(shouldShowCatalogError('x', true), false)
    assert.equal(shouldShowCatalogError(null, false), false)
  })
})

describe('googleOAuthStartUrl', () => {
  it('appends safe redirect query', () => {
    const url = googleOAuthStartUrl(
      'http://localhost:8082',
      '/tracks/sql-fundamentals/lessons/intro',
      '/',
    )
    assert.ok(url.includes('redirect=%2Ftracks%2Fsql-fundamentals%2Flessons%2Fintro'))
  })

  it('omits redirect for unsafe targets', () => {
    const url = googleOAuthStartUrl('http://localhost:8082', 'https://evil.example', '/')
    assert.equal(url, 'http://localhost:8082/api/v1/auth/google')
  })
})
