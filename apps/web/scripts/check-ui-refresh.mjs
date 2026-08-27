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
    assert.match(home, /<HomeLearningMap\s*\/>/)
    assert.match(home, /domain-card--it/)
    assert.match(home, /domain-card--languages/)
    assert.match(home, /domain:\s*'it'/)
    assert.match(home, /domain:\s*'languages'/)
    assert.match(home, /prefers-reduced-motion:\s*reduce/)
    assert.match(home, /localePath\('\/tracks'\)/)
    assert.match(home, /t\('catalog\.hskBand1'\)/)
    assert.match(home, /t\('catalog\.cefrA1'\)/)
    assert.match(home, /t\('catalog\.jlptN5'\)/)
    assert.equal((home.match(/\}\s*catch\s*\{/g) || []).length, 3)
    assert.doesNotMatch(home, /HSK\s*3\.0/)
    assert.doesNotMatch(home, /firstTrackId/)
    assert.doesNotMatch(home, /domain\.underDevelopment/)
    assert.doesNotMatch(home, /home\.subtitle/)
    assert.doesNotMatch(home, /track\.description/)
    assert.doesNotMatch(home, /chip-(?:sql|web|js|en|zh|ja)/)
  })

  it('keeps home catalog loading atomic and resumes the learner recent track first', () => {
    const store = read('app/stores/catalog.ts')
    assert.match(store, /Promise\.allSettled/)
    assert.match(store, /loadError\.value\s*=\s*formatCatalogLoadError\(failure\.reason\)/)
    assert.match(store, /prioritizeTracksByRecentProgress\(/)
    assert.match(store, /nextLessonForTrack\(/)
    assert.doesNotMatch(store, /const sorted = \[\.\.\.tracks\.value\]\.sort\(\(a, b\) => a\.sortOrder - b\.sortOrder\)[\s\S]*for \(const tr of sorted\)/)
  })

  it('keeps Progress continuation language-aware and request failures in context', () => {
    const progress = read('app/pages/progress.vue')
    const learningPath = read('app/utils/learningPath.ts')
    assert.match(progress, /resumeTargetForDomain\(/)
    assert.equal((progress.match(/\}\s*catch\s*\{/g) || []).length, 3)
    assert.match(learningPath, /next:\s*nextLessonForTrack\(tr\.id, lessons, progress, locale\)/)
    assert.match(learningPath, /const ordered = prioritizeTracksByRecentProgress\(scopedTracks, lessonsByTrack, progress, locale\)/)
    assert.match(learningPath, /nextLessonForTrack\([\s\S]*nextLanguageLesson/)
  })

  it('keeps track-hub catalog failures inside the local retry state', () => {
    const hub = read('app/pages/tracks/[track]/index.vue')
    assert.match(hub, /v-else-if="catalog\.loadError"/)
    assert.match(hub, /async function loadHub\(\)[\s\S]*try\s*\{[\s\S]*catalog\.loadTracks\(\)[\s\S]*catalog\.loadLessons\([\s\S]*\}\s*catch\s*\{/)
    assert.match(hub, /watch\(locale,[\s\S]*reloadOnLocaleChange\([\s\S]*\}\s*catch\s*\{/)
    assert.equal((hub.match(/\}\s*catch\s*\{/g) || []).length, 2)
  })

  it('keeps catalog-list and search failures inside their local retry panels', () => {
    const tracks = read('app/pages/tracks/index.vue')
    const search = read('app/pages/search.vue')

    for (const page of [tracks, search]) {
      assert.match(page, /v-else-if="catalog\.loadError"/)
      assert.equal((page.match(/\}\s*catch\s*\{/g) || []).length, 3)
    }

    assert.match(tracks, /async function retryCatalog\(\)[\s\S]*catalog\.loadCatalogForHome\([\s\S]*\}\s*catch\s*\{/)
    assert.match(tracks, /onMounted\([\s\S]*catalog\.loadCatalogForHome\([\s\S]*\}\s*catch\s*\{/)
    assert.match(tracks, /watch\(locale,[\s\S]*reloadOnLocaleChange\([\s\S]*\}\s*catch\s*\{/)

    assert.match(search, /async function loadSearchData\(loc: string\)[\s\S]*catalog\.loadCatalogForHome\(loc\)/)
    assert.match(search, /async function retryLoad\(\)[\s\S]*loadSearchData\(locale\.value\)[\s\S]*\}\s*catch\s*\{/)
    assert.match(search, /onMounted\([\s\S]*loadSearchData\(locale\.value\)[\s\S]*\}\s*catch\s*\{/)
    assert.match(search, /watch\(locale,[\s\S]*loadSearchData\(loc\)[\s\S]*\}\s*catch\s*\{/)
  })

  it('keeps learn-layout and lesson catalog failures inside route-level recovery UI', () => {
    const layout = read('app/layouts/learn.vue')
    const lesson = read('app/pages/tracks/[track]/lessons/[slug].vue')

    assert.match(layout, /async function bootstrap\(\)[\s\S]*try\s*\{[\s\S]*catalog\.loadTracks\(\)[\s\S]*catalog\.loadLessons\([\s\S]*\}\s*catch\s*\{/)
    assert.match(layout, /watch\([\s\S]*catalog\.loadLessons\(String\(trackId\), loc\)[\s\S]*\}\s*catch\s*\{/)

    assert.match(lesson, /@click="loadPage"/)
    assert.match(lesson, /async function loadPage\(\)[\s\S]*catalog\.loadTracks\(\)[\s\S]*catalog\.loadLessons\([\s\S]*\}\s*catch \(error\)\s*\{/)
    assert.match(lesson, /loadError\.value = catalog\.loadError/)
    assert.match(lesson, /onMounted\(loadPage\)/)
    assert.match(lesson, /nextLocale !== previousLocale \|\| nextTrack !== previousTrack/)
    assert.match(lesson, /nextSlug !== previousSlug[\s\S]*loadLesson\(\)/)
  })

  it('derives the learning orbit from catalog data and keeps it accessible', () => {
    const component = read('app/components/HomeLearningMap.vue')
    const utility = read('app/utils/homeLearningMap.ts')
    const profiles = read('app/utils/languageTrackProfile.ts')

    assert.match(component, /v-for="\(item, index\) in items"/)
    assert.match(component, /buildHomeLearningMapItems\(catalog\.tracks\)/)
    assert.match(component, /<NuxtLink[\s\S]*class="home-learning-chip"/)
    assert.match(component, /itemProgress\(item\)/)
    assert.match(component, /:aria-label="itemAriaLabel\(item\)"/)
    assert.match(component, /:to="localePath\('\/tracks'\)"/)
    assert.match(component, /prefers-reduced-motion:\s*reduce/)

    assert.match(utility, /filter\(\(track\) => track\.category === config\.category\)/)
    assert.match(utility, /item\.category === 'code'/)
    assert.match(utility, /item\.category === 'languages'/)
    assert.match(utility, /languageTrackProfile\(track\.id\)/)
    assert.match(utility, /profile\.specialty/)
    assert.match(utility, /trackIds:\s*matches\.map/)
    assert.match(utility, /target:\s*\{ kind: 'track', trackId: track\.id \}/)

    assert.match(profiles, /'english-basics':[^{]*\{[^}]*homeLabel:\s*'EN'/)
    assert.match(profiles, /'chinese-hsk':[^{]*\{[^}]*homeLabel:\s*'中文'/)
    assert.match(profiles, /'japanese-jlpt':[^{]*\{[^}]*homeLabel:\s*'日本語'/)
    assert.match(profiles, /'chinese-it-vocab':[^{]*\{[^}]*specialty:\s*true/)
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

  it('keeps the guided language player reversible, mobile-safe and screen-reader aware', () => {
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
    assert.match(steps, /v-if="stepIndex > 0"/)
    assert.match(steps, /@click="previous"/)
    assert.match(steps, /function previous\(\)/)
    assert.match(steps, /const passedStepIndexes = ref<number\[\]>\(\[\]\)/)
    assert.match(steps, /const practicePassed = computed\(\(\) => passedStepIndexes\.value\.includes\(stepIndex\.value\)\)/)
    assert.match(steps, /checkpointCursorByStep/)
    assert.doesNotMatch(steps, /const practicePassed = ref\(false\)/)
    assert.match(steps, /@media \(max-width:\s*560px\)/)
    assert.match(steps, /flex-direction:\s*column/)
    assert.match(steps, /width:\s*100%/)
    assert.match(steps, /min-height:\s*2\.75rem/)
    assert.match(steps, /prefers-reduced-motion:\s*reduce/)
    assert.doesNotMatch(steps, /--color-accent|--color-muted|--color-border/)
  })
})
