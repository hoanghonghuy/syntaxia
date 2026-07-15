/**
 * Audit remediation: locale switch reloads progress when logged in.
 * Run: node --experimental-strip-types --test scripts/check-locale-reload.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { reloadOnLocaleChange } from '../app/utils/localeReload.ts'

describe('localeReload', () => {
  it('reloads catalog always', async () => {
    const calls = []
    await reloadOnLocaleChange({
      locale: 'vi',
      isLoggedIn: false,
      loadCatalog: async (loc) => {
        calls.push(`catalog:${loc}`)
      },
    })
    assert.deepEqual(calls, ['catalog:vi'])
  })

  it('reloads progress when logged in', async () => {
    const calls = []
    await reloadOnLocaleChange({
      locale: 'en',
      isLoggedIn: true,
      loadCatalog: async (loc) => {
        calls.push(`catalog:${loc}`)
      },
      loadProgress: async () => {
        calls.push('progress')
      },
    })
    assert.deepEqual(calls, ['catalog:en', 'progress'])
  })
})
