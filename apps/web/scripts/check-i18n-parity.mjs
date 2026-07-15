/**
 * i18n parity: en.json / vi.json key trees must match; SQL Fundamentals lesson pairs must match.
 * Run: node --test scripts/check-i18n-parity.mjs
 * Or: npm run test:i18n
 */
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesDir = join(__dirname, '../i18n/locales')
const curriculumRoot = join(__dirname, '../../../docs/curriculum')

/**
 * @param {unknown} value
 * @param {string} prefix
 * @returns {string[]}
 */
export function flattenKeys(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : []
  }
  /** @type {string[]} */
  const keys = []
  for (const [k, v] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, path))
    } else {
      keys.push(path)
    }
  }
  return keys
}

/**
 * @param {string[]} left
 * @param {string[]} right
 */
export function missingKeys(left, right) {
  const set = new Set(right)
  return left.filter((k) => !set.has(k)).sort()
}

/**
 * @param {string} trackId
 */
export function listLessonSlugs(trackId) {
  const trackDir = join(curriculumRoot, trackId)
  /** @type {Record<string, string[]>} */
  const byLocale = {}
  for (const locale of ['en', 'vi']) {
    const dir = join(trackDir, locale)
    byLocale[locale] = readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .sort()
  }
  return byLocale
}

describe('i18n locale key parity', () => {
  const en = JSON.parse(readFileSync(join(localesDir, 'en.json'), 'utf8'))
  const vi = JSON.parse(readFileSync(join(localesDir, 'vi.json'), 'utf8'))
  const enKeys = flattenKeys(en).sort()
  const viKeys = flattenKeys(vi).sort()

  it('en and vi have the same flattened key set', () => {
    const onlyEn = missingKeys(enKeys, viKeys)
    const onlyVi = missingKeys(viKeys, enKeys)
    assert.deepEqual(
      { onlyEn, onlyVi, enCount: enKeys.length, viCount: viKeys.length },
      { onlyEn: [], onlyVi: [], enCount: enKeys.length, viCount: enKeys.length },
      `key mismatch — onlyEn=${JSON.stringify(onlyEn)} onlyVi=${JSON.stringify(onlyVi)}`,
    )
  })

  it('reports key counts (smoke)', () => {
    assert.ok(enKeys.length > 0, 'en.json should have keys')
    assert.equal(enKeys.length, viKeys.length)
    console.log(`i18n key count: en=${enKeys.length} vi=${viKeys.length}`)
  })
})

describe('SQL Fundamentals lesson locale pairs', () => {
  it('en and vi lesson slug sets match', () => {
    const { en, vi } = listLessonSlugs('sql-fundamentals')
    const onlyEn = missingKeys(en, vi)
    const onlyVi = missingKeys(vi, en)
    assert.deepEqual(
      { onlyEn, onlyVi, enCount: en.length, viCount: vi.length },
      { onlyEn: [], onlyVi: [], enCount: en.length, viCount: en.length },
      `lesson pair mismatch — onlyEn=${JSON.stringify(onlyEn)} onlyVi=${JSON.stringify(onlyVi)}`,
    )
    console.log(`sql-fundamentals lessons: en=${en.length} vi=${vi.length}`)
  })
})
