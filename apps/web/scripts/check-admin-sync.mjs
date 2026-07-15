/**
 * Node test for admin sync result message mapping.
 * Run: node --experimental-strip-types --test scripts/check-admin-sync.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { formatSyncResult } from '../app/utils/adminSync.ts'

describe('formatSyncResult', () => {
  it('maps success with count to synced key', () => {
    assert.deepEqual(formatSyncResult({ ok: true, synced: 18 }), {
      key: 'admin.synced',
      params: { n: 18 },
      tone: 'success',
    })
  })

  it('maps zero synced to empty success key', () => {
    assert.deepEqual(formatSyncResult({ ok: true, synced: 0 }), {
      key: 'admin.syncedEmpty',
      params: { n: 0 },
      tone: 'success',
    })
  })

  it('maps failure to syncFailed with detail', () => {
    assert.deepEqual(formatSyncResult({ ok: false, errorMessage: 'drive timeout' }), {
      key: 'admin.syncFailed',
      params: { detail: ': drive timeout' },
      tone: 'error',
    })
  })

  it('uses generic detail when error message missing', () => {
    assert.deepEqual(formatSyncResult({ ok: false }), {
      key: 'admin.syncFailed',
      params: { detail: '' },
      tone: 'error',
    })
  })

  it('treats missing synced as zero on success', () => {
    assert.deepEqual(formatSyncResult({ ok: true }), {
      key: 'admin.syncedEmpty',
      params: { n: 0 },
      tone: 'success',
    })
  })
})
