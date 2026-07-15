/**
 * Audit remediation: note save upsert mode.
 * Run: node --experimental-strip-types --test scripts/check-note-save.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { pickPrimaryNote, resolveNoteSaveMode } from '../app/utils/noteSave.ts'

describe('noteSave', () => {
  it('chooses update when note id exists', () => {
    assert.equal(resolveNoteSaveMode('uuid-1'), 'update')
    assert.equal(resolveNoteSaveMode(null), 'create')
    assert.equal(resolveNoteSaveMode(undefined), 'create')
  })

  it('picks first note as primary', () => {
    assert.deepEqual(pickPrimaryNote([]), { body: '' })
    assert.deepEqual(pickPrimaryNote([{ id: 'n1', body: 'hello' }]), {
      noteId: 'n1',
      body: 'hello',
    })
  })
})
