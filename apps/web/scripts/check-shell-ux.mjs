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
    assert.match(css, /--color-skeleton/)
    assert.doesNotMatch(
      css,
      /\.ui-skeleton\s*\{[^}]*color-mix\([^)]*white/s,
      'skeleton must not mix with white (flashes in dark mode)',
    )
    const tokens = read('app/assets/css/tokens.css')
    assert.match(tokens, /--color-skeleton-shine/)
  })

  it('lesson example fences follow theme tokens (not hardcoded black)', () => {
    const css = read('app/assets/css/layout.css')
    assert.match(css, /\.prose-lesson\s+pre\s*\{[^}]*--color-code-bg/s)
    assert.doesNotMatch(css, /\.prose-lesson\s+pre\s*\{[^}]*#1c1c1e/s)
    assert.match(css, /\.prose-lesson\s+pre\s+code\s*\{[^}]*border:\s*none/s)
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
      'nav.profile',
      'nav.search',
      'nav.notes',
      'nav.allTracks',
      'nav.backToTracks',
      'catalog.tracksTitle',
      'catalog.tracksLead',
      'catalog.allCategories',
      'catalog.allDomains',
      'catalog.pageOf',
      'domain.it',
      'domain.languages',
      'home.domainsHeading',
      'home.domainsLead',
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
    assert.match(src, /filterTracksByDomainAndCategory|parseTracksQuery/)
    assert.match(src, /LEARNING_DOMAIN|domain/)
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

  it('mobile footers use 4 tabs without Home/Notes; Account is guest-aware', () => {
    for (const file of ['app/layouts/default.vue', 'app/layouts/learn.vue']) {
      const src = read(file)
      assert.match(src, /learn-footer/, `${file} should ship footer`)
      assert.match(src, /FooterNavIcon/, `${file} should use clear SVG footer icons`)
      assert.match(src, /nav\.profile/, `${file} footer tab is Profile, not Login`)
      assert.match(src, /localePath\('\/tracks'\)/)
      assert.match(src, /localePath\('\/progress'\)/)
      assert.match(src, /auth\.user \? localePath\('\/account'\) : localePath\('\/login'\)/)
      assert.doesNotMatch(
        src,
        /learn-footer[\s\S]*t\('nav\.login'\)/,
        `${file} footer should not label the profile tab as Login`,
      )
      assert.doesNotMatch(src, /localePath\('\/notes'\)/, `${file} should not put Notes in footer`)
      assert.doesNotMatch(
        src,
        /learn-footer-item[^]*localePath\('\/'\)/,
        `${file} should not put Home in footer`,
      )
      assert.doesNotMatch(src, /learn-footer-mark/, `${file} should not use ambiguous CSS marks`)
    }
    const learn = read('app/layouts/learn.vue')
    assert.match(learn, /nav\.lessons/)
    assert.match(learn, /nav\.search/)
    const def = read('app/layouts/default.vue')
    assert.match(def, /localePath\('\/search'\)/)
    assert.equal(existsSync(join(webRoot, 'app/components/FooterNavIcon.vue')), true)
  })

  it('home is path-first with domain cards and ≤3 featured IT tracks', () => {
    const src = read('app/pages/index.vue')
    assert.match(src, /featuredTracks|HOME_FEATURED/)
    assert.match(src, /overallProgress|hero-progress/)
    assert.match(src, /filterTracksByDomain/)
    assert.match(src, /domainsHeading|home\.domainsHeading/)
    assert.match(src, /domain:\s*'it'/)
    assert.match(src, /domain:\s*'languages'/)
    assert.doesNotMatch(src, /previewTracksByCategory/)
    assert.doesNotMatch(src, /hero-brand/)
    assert.doesNotMatch(src, /home-quick/)
    assert.doesNotMatch(src, /sql-fundamentals/)
  })

  it('track hub has no duplicate open-lessons ghost button', () => {
    const src = read('app/pages/tracks/[track]/index.vue')
    assert.doesNotMatch(src, /open-lessons-btn/)
    assert.doesNotMatch(src, /openNav/)
  })

  it('lesson page puts practice before pager/complete and notes after', () => {
    const src = read('app/pages/tracks/[track]/lessons/[slug].vue')
    const prose = src.indexOf('prose-lesson')
    const sandbox = src.search(/SqlSandbox|JsSandbox|HtmlCssSandbox/)
    const pager = src.indexOf('lesson-pager')
    const notes = src.indexOf('notes-card')
    assert.ok(prose > 0 && sandbox > prose, 'sandbox after prose')
    assert.ok(pager > sandbox, 'pager after sandbox')
    assert.ok(notes > pager, 'notes after pager')
    assert.match(src, /lesson-objectives-mobile/)
  })

  it('progress hub is summary-first without mega per-track lesson dump', () => {
    const src = read('app/pages/progress.vue')
    assert.match(src, /hub-progress-tracks|trackProgressRows/)
    assert.match(src, /LEARNING_DOMAIN_IDS|domainTabs|trackProgressRowsForDomain/)
    assert.doesNotMatch(src, /hub-progress-lessons/)
    assert.doesNotMatch(src, /lessonStatuses|trackLessonStatusRows/)
  })

  it('ships slash-to-search shortcut plugin', () => {
    const src = read('app/plugins/search-shortcut.client.ts')
    assert.match(src, /keydown/)
    assert.match(src, /\/search/)
  })

  it('does not put a search pill in the header (footer + /search page own it)', () => {
    for (const file of ['app/layouts/default.vue', 'app/layouts/learn.vue']) {
      const src = read(file)
      assert.doesNotMatch(src, /shell-search/, `${file} should not ship header search`)
      assert.doesNotMatch(src, /header-tools/, `${file} should not ship header search tools`)
    }
  })

  it('theme menu teleports a fixed panel (avoids shell overflow clipping)', () => {
    const src = read('app/components/ThemeMenu.vue')
    assert.match(src, /Teleport/)
    assert.match(src, /theme-menu-backdrop/)
    assert.match(src, /getBoundingClientRect|placePanel/)
    const css = read('app/assets/css/tokens.css')
    assert.match(css, /\.home-page\s*\{[^}]*notebook-grid/s)
    assert.doesNotMatch(css, /body\s*\{[^}]*notebook-grid/s)
    // Surface theme blocks must not reset brand to emerald (causes accent flash)
    const darkBlock = css.match(/html\[data-theme='dark'\]\s*\{[^}]+\}/s)?.[0] || ''
    assert.doesNotMatch(darkBlock, /--color-brand\s*:/)
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
    // Hero wash follows accent token (not fixed pastel-green)
    assert.match(css, /\.hero\s*\{[^}]*--color-hero-from/s)
    assert.doesNotMatch(css, /\.hero\s*\{[^}]*--color-pastel-green/s)
    // Hub pages center in the main column
    assert.match(css, /\.hub-page\s*\{[^}]*margin:\s*0\s+auto/s)
    // Featured track cards equalize height + pin actions
    assert.match(css, /\.track-grid\s*>\s*\.card\s*\{[^}]*flex-direction:\s*column/s)
    assert.match(css, /\.track-grid\s*>\s*\.card\s+\.card-actions\s*\{[^}]*margin-top:\s*auto/s)
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
    // Desktop track hub: lesson list lives in sidebar — hub shows list only when narrow
    assert.match(read('app/pages/tracks/[track]/index.vue'), /isNarrow/)
    assert.doesNotMatch(read('app/pages/tracks/[track]/index.vue'), /stats\.total > 0 && !isNarrow/)
    assert.match(read('app/pages/account.vue'), /hub-footer-links/)
    assert.match(read('app/pages/index.vue'), /card-title/)
    assert.match(read('app/pages/index.vue'), /hub-error-panel/)
    assert.doesNotMatch(read('app/pages/tracks/index.vue'), /\.track-meta\s*\{/)
    assert.doesNotMatch(read('app/pages/index.vue'), /\.track-meta\s*\{/)
  })
})
