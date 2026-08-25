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
    assert.match(home, /<HomeLearningMap/)
    assert.match(home, /resolveHomeLearningMap/)
    assert.match(home, /learningMapLinks/)
    assert.match(home, /catalog\.lessonsByTrack/)
    assert.match(home, /catalog\.progress/)
    assert.match(home, /domain-card--it/)
    assert.match(home, /domain-card--languages/)
    assert.match(home, /domain:\s*'it'/)
    assert.match(home, /domain:\s*'languages'/)
    assert.match(home, /prefers-reduced-motion:\s*reduce/)
    assert.match(home, /localePath\('\/tracks'\)/)
    assert.doesNotMatch(home, /<span class="home-learning-chip chip-(?:sql|web|js|en|zh|ja)"/)
    assert.doesNotMatch(home, /firstTrackId/)
    assert.doesNotMatch(home, /domain\.underDevelopment/)
    assert.doesNotMatch(home, /home\.subtitle/)
    assert.doesNotMatch(home, /track\.description/)
  })

  it('keeps the circular learning map interactive, accessible, and catalog-driven', () => {
    const component = read('app/components/HomeLearningMap.vue')
    const resolver = read('app/utils/homeLearningMap.ts')

    assert.match(component, /<nav class="home-learning-map" :aria-label=/)
    assert.match(component, /<NuxtLink class="home-learning-core"/)
    assert.match(component, /v-for="item in items"/)
    assert.match(component, /<span>\{\{ item\.label \}\}<\/span>/)
    assert.match(component, /--chip-progress/)
    assert.match(component, /:aria-label="item\.ariaLabel"/)
    assert.match(component, /:title="item\.title"/)
    assert.match(component, /:focus-visible/)
    assert.match(component, /prefers-reduced-motion:\s*reduce/)
    assert.doesNotMatch(component, /<nav[^>]+aria-hidden="true"/)

    for (const label of ['SQL', 'Web', 'JS', 'EN', '中文', '日本語']) {
      assert.match(resolver, new RegExp(`label: '${label}'`))
    }
    assert.match(resolver, /category:\s*'sql'/)
    assert.match(resolver, /category:\s*'web'/)
    assert.match(resolver, /category:\s*'code'/)
    assert.match(resolver, /targetLang:\s*'en'/)
    assert.match(resolver, /targetLang:\s*'zh-Hans'/)
    assert.match(resolver, /targetLang:\s*'ja'/)
    assert.match(resolver, /languageTargetLangForTrack/)
    assert.match(resolver, /trackProgress/)
    assert.match(resolver, /track\.sortOrder/)
    assert.doesNotMatch(resolver, /english-basics|chinese-hsk|japanese-jlpt/)
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

  it('uses canonical theme tokens and accessible states for the communicative unit path', () => {
    const path = read('app/components/LanguageUnitPath.vue')
    assert.match(path, /<nav class="unit-path" :aria-label=/)
    assert.match(path, /:aria-disabled="true"/)
    assert.match(path, /aria-hidden="true"/)
    assert.match(path, /@media \(max-width:\s*520px\)/)
    assert.match(path, /prefers-reduced-motion:\s*reduce/)
    assert.match(path, /--color-brand/)
    assert.match(path, /--color-ink-muted/)
    assert.match(path, /--color-hairline/)
    assert.doesNotMatch(path, /--color-accent|--color-muted|--color-border/)
  })

  it('keeps the guided language player mobile-safe and screen-reader aware', () => {
    const player = read('app/components/LanguageLessonPlayer.vue')
    const steps = read('app/components/LanguageLessonSteps.vue')

    assert.match(player, /width:\s*min\(100%,\s*48rem\)/)
    assert.match(player, /:lang="targetLang"/)

    assert.match(steps, /role="progressbar"/)
    assert.match(steps, /:aria-valuenow=/)
    assert.match(steps, /:aria-valuemax=/)
    assert.match(steps, /:aria-valuetext=/)
    assert.match(steps, /aria-live="polite"/)
    assert.match(steps, /:lang="targetLang"/)
    assert.match(steps, /@media \(max-width:\s*560px\)/)
    assert.match(steps, /flex-direction:\s*column/)
    assert.match(steps, /width:\s*100%/)
    assert.match(steps, /min-height:\s*2\.75rem/)
    assert.match(steps, /prefers-reduced-motion:\s*reduce/)
    assert.doesNotMatch(steps, /--color-accent|--color-muted|--color-border/)
  })
})
