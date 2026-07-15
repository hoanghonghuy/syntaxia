/**
 * Audit remediation: sandbox state reset on lesson change.
 * Run: node --experimental-strip-types --test scripts/check-sandbox-state.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  createSandboxUiState,
  shouldResetSandbox,
} from '../app/utils/sandboxState.ts'

describe('sandboxState', () => {
  it('creates fresh defaults from starter', () => {
    const s = createSandboxUiState('SELECT 2;')
    assert.equal(s.sql, 'SELECT 2;')
    assert.equal(s.hintIndex, 0)
    assert.equal(s.failedAttempts, 0)
    assert.equal(s.solutionRevealed, false)
    assert.equal(s.fetchedSolution, '')
  })

  it('detects lesson change for reset', () => {
    assert.equal(shouldResetSandbox('a', 'b'), true)
    assert.equal(shouldResetSandbox('a', 'a'), false)
    assert.equal(shouldResetSandbox(undefined, 'a'), true)
  })
})
