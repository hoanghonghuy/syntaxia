import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => readFileSync(join(webRoot, rel), 'utf8')

describe('UI refresh contract', () => {
  it('keeps the home page domain-first, concise, and motion-safe', () => {
    const home = read('app/pages/index.vue')
    assert.match(home, /class="hero home-hero"/)
    assert.match(home, /home-learning-map/)
    assert.match(home, /domain-card--it/)
    assert.match(home, /domain-card--languages/)
    assert.match(home, /domain:\s*'it'/)
    assert.match(home, /domain:\s*'languages'/)
    assert.match(home, /prefers-reduced-motion:\s*reduce/)
    assert.match(home, /localePath\('\/tracks'\)/)
    assert.doesNotMatch(home, /firstTrackId/)
    assert.doesNotMatch(home, /domain\.underDevelopment/)
    assert.doesNotMatch(home, /home\.subtitle/)
    assert.doesNotMatch(home, /track\.description/)
  })

  it('keeps the loading skeleton structurally aligned with the new home', () => {
    const skeleton = read('app/components/SkeletonHome.vue')
    assert.match(skeleton, /skeleton-home-hero/)
    assert.match(skeleton, /skeleton-home-visual/)
    assert.match(skeleton, /skeleton-domain-grid/)
    assert.match(skeleton, /skeleton-home-featured/)
  })

  it('keeps the tracks catalog compact with visible progress and reduced motion', () => {
    const tracks = read('app/pages/tracks/index.vue')
    assert.match(tracks, /catalog-track-card/)
    assert.match(tracks, /catalog-track-progress/)
    assert.match(tracks, /prefers-reduced-motion:\s*reduce/)
    assert.doesNotMatch(tracks, /track\.description/)
    assert.doesNotMatch(tracks, /catalog\.tracksLead/)
  })

  it('keeps authentication screens focused on the task', () => {
    for (const file of ['app/pages/login.vue', 'app/pages/register.vue']) {
      const page = read(file)
      assert.match(page, /auth-page/)
      assert.match(page, /auth-brand/)
      assert.doesNotMatch(page, /auth\.loginSubtitle|auth\.registerSubtitle/)
    }
  })

  it('uses canonical theme tokens for the communicative unit path', () => {
    const path = read('app/components/LanguageUnitPath.vue')
    assert.match(path, /--color-brand/)
    assert.match(path, /--color-ink-muted/)
    assert.match(path, /--color-hairline/)
    assert.match(path, /prefers-reduced-motion:\s*reduce/)
    assert.doesNotMatch(path, /--color-accent|--color-muted|--color-border/)
  })
})
