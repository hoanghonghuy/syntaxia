import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = path.resolve(import.meta.dirname, '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')

test('Nuxt loads the stabilized UI system after base tokens/layout', () => {
  const config = read('nuxt.config.ts')
  assert.match(config, /tokens\.css/) 
  assert.match(config, /layout\.css/)
  assert.match(config, /system\.css/)
  assert.ok(config.indexOf('tokens.css') < config.indexOf('system.css'))
  assert.ok(config.indexOf('layout.css') < config.indexOf('system.css'))
})

test('shared UI system protects focus, mobile actions and reduced motion', () => {
  const css = read('app/assets/css/system.css')
  assert.match(css, /:focus-visible/)
  assert.match(css, /outline-offset/)
  assert.match(css, /min-height:\s*2\.75rem/)
  assert.match(css, /max-width:\s*42rem/)
  assert.match(css, /flex:\s*1 1 100%/)
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
  assert.match(css, /transition-duration:\s*0\.01ms/)
})

test('shared empty and error states have readable system treatment', () => {
  const css = read('app/assets/css/system.css')
  assert.match(css, /\.hub-empty/)
  assert.match(css, /\.form-error/)
  assert.match(css, /\[role='alert'\]/)
})
