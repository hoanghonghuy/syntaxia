<template>
  <div
    class="app-shell learn-shell"
    :class="{ 'nav-open': navOpen, 'hub-mode': !inTrackContext }"
  >
    <header class="app-header learn-header">
      <div class="learn-header-start">
        <button
          v-if="inTrackContext"
          class="hamburger learn-hamburger"
          type="button"
          :class="{ 'is-open': navOpen }"
          :aria-expanded="navOpen"
          aria-controls="learn-sidebar"
          :aria-label="navOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="toggleNav"
        >
          <span class="hamburger-bar" />
          <span class="hamburger-bar" />
          <span class="hamburger-bar" />
        </button>
        <NuxtLink :to="localePath('/')" class="brand" @click="closeNav">
          <span>Syn</span>taxia
        </NuxtLink>
      </div>
      <nav class="app-header-nav" aria-label="Primary">
        <ThemeMenu />
        <NuxtLink
          class="learn-header-link"
          :to="localePath('/tracks')"
          @click="closeNav"
        >
          {{ t('nav.tracks') }}
        </NuxtLink>
        <NuxtLink
          class="learn-header-link"
          :to="localePath('/progress')"
          @click="closeNav"
        >
          {{ t('nav.progress') }}
        </NuxtLink>
        <NuxtLink
          :to="switchLocalePath(locale === 'vi' ? 'en' : 'vi')"
          :aria-label="localeSwitchAriaLabel(locale, t)"
        >
          {{ locale === 'vi' ? 'EN' : 'VI' }}
        </NuxtLink>
        <template v-if="auth.user">
          <NuxtLink v-if="auth.isAdmin" :to="localePath('/admin')">{{ t('nav.admin') }}</NuxtLink>
          <NuxtLink :to="localePath('/account')" @click="closeNav">{{ t('nav.account') }}</NuxtLink>
        </template>
        <template v-else>
          <NuxtLink class="learn-header-login" :to="localePath('/login')">{{ t('nav.login') }}</NuxtLink>
        </template>
      </nav>
    </header>

    <div class="learn-body">
      <div v-if="navOpen && isNarrow && inTrackContext" class="overlay learn-overlay" @click="closeNav" />
      <aside
        v-if="inTrackContext"
        id="learn-sidebar"
        class="learn-sidebar"
        :class="{ 'is-open': navOpen || !isNarrow }"
      >
        <LearnSidebar @navigate="closeNav" />
      </aside>
      <div class="learn-main">
        <slot />
      </div>
    </div>

    <nav class="learn-footer" :aria-label="t('nav.footerNav')">
      <NuxtLink class="learn-footer-item footer-tracks" :to="localePath('/tracks')" @click="closeNav">
        <FooterNavIcon name="tracks" />
        <span>{{ t('nav.tracks') }}</span>
      </NuxtLink>
      <button
        v-if="inTrackContext"
        class="learn-footer-item"
        type="button"
        :class="{ 'is-active': navOpen }"
        :aria-expanded="navOpen"
        aria-controls="learn-sidebar"
        @click="toggleNav"
      >
        <FooterNavIcon name="lessons" />
        <span>{{ t('nav.lessons') }}</span>
      </button>
      <NuxtLink
        v-else
        class="learn-footer-item"
        :to="localePath('/search')"
        @click="closeNav"
      >
        <FooterNavIcon name="search" />
        <span>{{ t('nav.search') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/progress')" @click="closeNav">
        <FooterNavIcon name="progress" />
        <span>{{ t('nav.progress') }}</span>
      </NuxtLink>
      <NuxtLink
        class="learn-footer-item"
        :to="auth.user ? localePath('/account') : localePath('/login')"
        @click="closeNav"
      >
        <FooterNavIcon name="account" />
        <span>{{ t('nav.profile') }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { localeSwitchAriaLabel } from '~/utils/localeSwitch'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const auth = useAuthStore()
const catalog = useCatalogStore()
const route = useRoute()
const { navOpen, isNarrow, syncViewport, toggleNav, closeNav } = useLearnNav()

/** Lesson sidebar only inside a track (hub or lesson) — never on Progress/Notes/etc. */
const inTrackContext = computed(() => Boolean(route.params.track))

async function bootstrap() {
  await catalog.loadTracks()
  const trackId = route.params.track as string | undefined
  if (trackId) {
    await catalog.loadLessons(trackId, locale.value)
  }
  await auth.fetchMe()
  if (auth.user) await catalog.loadProgress()
}

onMounted(() => {
  syncViewport()
  window.addEventListener('resize', syncViewport)
  bootstrap()
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', syncViewport)
    document.body.classList.remove('lesson-nav-locked')
  }
})

watch(navOpen, (open) => {
  if (!import.meta.client) return
  document.body.classList.toggle(
    'lesson-nav-locked',
    open && isNarrow.value && inTrackContext.value,
  )
})

watch(inTrackContext, (inTrack) => {
  if (!inTrack) closeNav()
})

watch(
  () => [route.params.track, locale.value] as const,
  async ([trackId, loc]) => {
    if (trackId) await catalog.loadLessons(String(trackId), loc)
  },
)
</script>
