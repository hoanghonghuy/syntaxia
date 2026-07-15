/**
 * Shell UX foundation: skeletons + scaffold pages for future features.
 * Run: node --test scripts/check-shell-ux.mjs
 * Or: npm run test:shell-ux
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = join(__dirname, '..')
const appRoot = join(webRoot, 'app')

function read(rel) {
  return readFileSync(join(webRoot, rel), 'utf8')
}

describe('shell UX foundation', () => {
  it('ships UiSkeleton + page skeleton components', () => {
    for (const file of [
      'app/components/UiSkeleton.vue',
      'app/components/SkeletonLesson.vue',
      'app/components/SkeletonSidebar.vue',
      'app/components/SkeletonHome.vue',
      'app/components/SkeletonHub.vue',
      'app/components/ComingSoonPanel.vue',
    ]) {
      assert.equal(existsSync(join(webRoot, file)), true, `missing ${file}`)
    }
  })

  it('defines skeleton pulse styles', () => {
    const css = read('app/assets/css/layout.css')
    assert.match(css, /\.ui-skeleton/)
    assert.match(css, /@keyframes\s+skeleton-pulse/)
  })

  it('ships live notes and search hubs', () => {
    for (const file of ['app/pages/notes.vue', 'app/pages/search.vue']) {
      assert.equal(existsSync(join(webRoot, file)), true, `missing ${file}`)
      const src = read(file)
      assert.match(src, /HubHeader/, `${file} should use HubHeader`)
      assert.match(src, /loading/, `${file} should have a loading state`)
    }
    assert.match(read('app/pages/notes.vue'), /listAllNotes/)
    assert.match(read('app/pages/search.vue'), /filterCatalog/)
  })

  it('lesson page shows skeleton while loading', () => {
    const src = read('app/pages/tracks/[track]/lessons/[slug].vue')
    assert.match(src, /SkeletonLesson/)
    assert.match(src, /loading/)
  })

  it('ships shell i18n keys in en + vi', () => {
    const required = [
      'nav.progress',
      'nav.account',
      'nav.search',
      'nav.notes',
      'nav.allTracks',
      'nav.backToTracks',
      'catalog.tracksTitle',
      'catalog.tracksLead',
      'catalog.allCategories',
      'catalog.pageOf',
      'catalog.prevPage',
      'catalog.nextPage',
      'catalog.emptyCategory',
      'catalog.openTrack',
      'catalog.viewAllTracks',
      'catalog.sidebarPickTrack',
      'shell.loading',
      'shell.comingSoonTitle',
      'shell.comingSoonBody',
      'shell.searchPlaceholder',
      'shell.searchHint',
    ]
    for (const locale of ['en', 'vi']) {
      const json = JSON.parse(read(`i18n/locales/${locale}.json`))
      for (const path of required) {
        const parts = path.split('.')
        let cur = json
        for (const part of parts) {
          cur = cur?.[part]
        }
        assert.equal(typeof cur, 'string', `${locale} missing ${path}`)
      }
    }
  })

  it('learn sidebar is lesson-only (no track switcher or hub menu)', () => {
    const src = read('app/components/LearnSidebar.vue')
    assert.match(src, /nav\.backToTracks|backToTracks/)
    assert.match(src, /lessonSlug|lessons/)
    assert.doesNotMatch(src, /sidebar-tracks/)
    assert.doesNotMatch(src, /localePath\('\/progress'\)/)
    assert.doesNotMatch(src, /localePath\('\/notes'\)/)
    assert.doesNotMatch(src, /localePath\('\/account'\)/)
  })

  it('ships paginated tracks catalog page', () => {
    const src = read('app/pages/tracks/index.vue')
    assert.match(src, /paginateItems|TRACKS_PAGE_SIZE/)
    assert.match(src, /filterTracksByCategory|parseTracksQuery/)
    assert.match(src, /catalog\.category/)
    assert.doesNotMatch(src, /--color-border/)
  })

  it('learn layout hides sidebar outside track context', () => {
    const src = read('app/layouts/learn.vue')
    assert.match(src, /inTrackContext/)
    assert.match(src, /hub-mode/)
    assert.match(src, /localePath\('\/tracks'\)/)
    assert.match(src, /nav\.tracks/)
  })

  it('home is path-first with catalog preview (not full dump or quick-nav clutter)', () => {
    const src = read('app/pages/index.vue')
    assert.match(src, /previewTracksByCategory|HOME_TRACKS/)
    assert.match(src, /overallProgress|hero-progress/)
    assert.doesNotMatch(src, /hero-brand/)
    assert.doesNotMatch(src, /home-quick/)
    assert.doesNotMatch(src, /sql-fundamentals/)
  })

  it('ships slash-to-search shortcut plugin', () => {
    const src = read('app/plugins/search-shortcut.client.ts')
    assert.match(src, /keydown/)
    assert.match(src, /\/search/)
  })

  it('ships snackbar + breadcrumb shell', () => {
    assert.equal(existsSync(join(webRoot, 'app/components/AppSnackbar.vue')), true)
    assert.equal(existsSync(join(webRoot, 'app/components/AppBreadcrumb.vue')), true)
    assert.match(read('app/app.vue'), /AppSnackbar/)
    assert.match(read('app/composables/useSnackbar.ts'), /success/)
    assert.match(read('app/pages/tracks/[track]/lessons/[slug].vue'), /AppBreadcrumb/)
    assert.match(read('app/pages/tracks/[track]/lessons/[slug].vue'), /snackbar\.success/)
    for (const locale of ['en', 'vi']) {
      const json = JSON.parse(read(`i18n/locales/${locale}.json`))
      assert.equal(typeof json.breadcrumb?.label, 'string')
      assert.equal(typeof json.snackbar?.dismiss, 'string')
      assert.equal(typeof json.snackbar?.noteSaved, 'string')
    }
  })

  it('ships shared hub-page styles and exact footer active state', () => {
    const css = read('app/assets/css/layout.css')
    assert.match(css, /\.hub-page\s*\{/)
    assert.match(css, /\.hub-page-wide\s*\{/)
    assert.match(css, /\.muted\s*\{/)
    assert.match(css, /\.track-meta\s*\{/)
    assert.match(css, /\.card-actions\s*\{/)
    assert.match(css, /\.card-title\s*\{/)
    assert.match(css, /\.hub-footer-links/)
    assert.match(css, /\.account-section/)
    assert.match(css, /\.hub-filter/)
    assert.match(css, /router-link-exact-active/)
    for (const file of [
      'app/pages/search.vue',
      'app/pages/notes.vue',
      'app/pages/progress.vue',
    ]) {
      assert.match(read(file), /hub-page/, `${file} should use hub-page`)
      assert.doesNotMatch(read(file), /\.hub-page\s*\{/, `${file} should not define hub-page locally`)
    }
    assert.match(read('app/pages/tracks/index.vue'), /hub-page-wide/)
    assert.match(read('app/pages/progress.vue'), /SkeletonHub/)
    assert.match(read('app/pages/tracks/index.vue'), /SkeletonHub/)
    assert.match(read('app/pages/account.vue'), /SkeletonHub/)
    assert.match(read('app/pages/tracks/[track]/index.vue'), /hub-page/)
    assert.match(read('app/pages/tracks/[track]/index.vue'), /HubHeader/)
    assert.match(read('app/pages/tracks/[track]/index.vue'), /retryLoad/)
    assert.match(read('app/pages/account.vue'), /hub-footer-links/)
    assert.match(read('app/pages/index.vue'), /card-title/)
    assert.match(read('app/pages/index.vue'), /hub-error-panel/)
    assert.doesNotMatch(read('app/pages/tracks/index.vue'), /\.track-meta\s*\{/)
    assert.doesNotMatch(read('app/pages/index.vue'), /\.track-meta\s*\{/)
  })
})
