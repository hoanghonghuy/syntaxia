/**
 * Theme accent derivation helpers.
 * Run: node --experimental-strip-types --test scripts/check-theme-accent.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  ACCENT_PRESETS,
  DEFAULT_ACCENT,
  applyAccentCssVars,
  deriveAccentTokens,
  getThemeBootScript,
  normalizeHex,
  parseHex,
} from '../app/utils/themeAccent.ts'

describe('themeAccent', () => {
  it('normalizeHex accepts #RGB and #RRGGBB', () => {
    assert.equal(normalizeHex('#0b8'), '#00bb88')
    assert.equal(normalizeHex('00b48a'), '#00b48a')
    assert.equal(normalizeHex('xyz'), null)
  })

  it('parseHex returns rgb channels', () => {
    assert.deepEqual(parseHex('#00b48a'), { r: 0, g: 180, b: 138 })
  })

  it('deriveAccentTokens builds brand / deep / soft / onBrand', () => {
    const tokens = deriveAccentTokens(DEFAULT_ACCENT, 'light')
    assert.equal(tokens.brand, '#00b48a')
    assert.match(tokens.deep, /^#[0-9a-f]{6}$/)
    assert.match(tokens.soft, /^#[0-9a-f]{6}$/)
    assert.equal(tokens.onBrand, '#ffffff')
  })

  it('dark mode uses a lighter brand tint for contrast', () => {
    const light = deriveAccentTokens(DEFAULT_ACCENT, 'light')
    const dark = deriveAccentTokens(DEFAULT_ACCENT, 'dark')
    assert.notEqual(light.brand, dark.brand)
    assert.match(dark.onBrand, /^#[0-9a-f]{6}$/)
  })

  it('ships emerald as default preset', () => {
    assert.equal(ACCENT_PRESETS[0].id, 'emerald')
    assert.equal(ACCENT_PRESETS[0].hex, DEFAULT_ACCENT)
  })

  it('ships pastel pink preset', () => {
    const pastel = ACCENT_PRESETS.find((p) => p.id === 'pastelPink')
    assert.ok(pastel)
    assert.equal(pastel.hex, '#f4a7c3')
    assert.equal(pastel.labelKey, 'theme.accents.pastelPink')
    const tokens = deriveAccentTokens(pastel.hex, 'light')
    assert.equal(tokens.onBrand, '#0f1419')
  })

  it('boot script sets CSS accent vars before paint', () => {
    const boot = getThemeBootScript()
    assert.match(boot, /--color-brand/)
    assert.match(boot, /setProperty/)
    assert.match(boot, /syntaxia_accent/)
  })

  it('applyAccentCssVars writes brand tokens', () => {
    const props = {}
    applyAccentCssVars(
      {
        setProperty(name, value) {
          props[name] = value
        },
      },
      '#f4a7c3',
      'light',
    )
    assert.equal(props['--color-brand'], '#f4a7c3')
    assert.match(props['--color-brand-deep'], /^#[0-9a-f]{6}$/)
    assert.match(props['--color-hero-from'], /^#[0-9a-f]{6}$/)
  })
})
