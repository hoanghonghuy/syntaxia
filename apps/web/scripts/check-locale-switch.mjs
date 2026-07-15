/**
 * Locale switch labels (i18n).
 * Run: node --experimental-strip-types --test scripts/check-locale-switch.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  localeDisplayName,
  localeSwitchAriaLabel,
} from '../app/utils/localeSwitch.ts'

const t = (key) => key

describe('localeSwitch', () => {
  it('aria label points to target locale', () => {
    assert.equal(localeSwitchAriaLabel('vi', t), 'locale.switchToEn')
    assert.equal(localeSwitchAriaLabel('en', t), 'locale.switchToVi')
  })

  it('display name uses i18n keys', () => {
    assert.equal(localeDisplayName('vi', t), 'locale.nameVi')
    assert.equal(localeDisplayName('en', t), 'locale.nameEn')
  })
})
