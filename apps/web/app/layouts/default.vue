<template>
  <div class="app-shell default-shell">
    <header class="app-header">
      <NuxtLink :to="localePath('/')" class="brand">
        <span>Syn</span>taxia
      </NuxtLink>
      <div class="default-header-tools">
        <NuxtLink class="shell-search" :to="localePath('/search')">
          <span>{{ t('shell.searchPlaceholder') }}</span>
          <span class="shell-search-kbd">/</span>
        </NuxtLink>
      </div>
      <nav class="app-header-nav" aria-label="Primary">
        <ThemeMenu />
        <NuxtLink class="default-header-link" :to="localePath('/tracks')">{{ t('nav.tracks') }}</NuxtLink>
        <NuxtLink class="default-header-link" :to="localePath('/progress')">{{ t('nav.progress') }}</NuxtLink>
        <NuxtLink class="default-header-link" :to="localePath('/notes')">{{ t('nav.notes') }}</NuxtLink>
        <NuxtLink
          :to="switchLocalePath(locale === 'vi' ? 'en' : 'vi')"
          :aria-label="localeSwitchAriaLabel(locale, t)"
        >
          {{ locale === 'vi' ? 'EN' : 'VI' }}
        </NuxtLink>
        <template v-if="auth.user">
          <NuxtLink v-if="auth.isAdmin" :to="localePath('/admin')">{{ t('nav.admin') }}</NuxtLink>
          <NuxtLink :to="localePath('/account')">{{ t('nav.account') }}</NuxtLink>
        </template>
        <template v-else>
          <NuxtLink :to="localePath('/login')">{{ t('nav.login') }}</NuxtLink>
        </template>
      </nav>
    </header>
    <div class="app-main">
      <slot />
    </div>
    <nav class="learn-footer default-footer" :aria-label="t('nav.footerNav')">
      <NuxtLink class="learn-footer-item" :to="localePath('/')">
        <span class="learn-footer-mark" aria-hidden="true" />
        <span>{{ t('nav.home') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item footer-tracks" :to="localePath('/tracks')">
        <span class="learn-footer-mark learn-footer-mark-menu" aria-hidden="true" />
        <span>{{ t('nav.tracks') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/search')">
        <span class="learn-footer-mark learn-footer-mark-search" aria-hidden="true" />
        <span>{{ t('nav.search') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/notes')">
        <span class="learn-footer-mark learn-footer-mark-notes" aria-hidden="true" />
        <span>{{ t('nav.notes') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/progress')">
        <span class="learn-footer-mark learn-footer-mark-track" aria-hidden="true" />
        <span>{{ t('nav.progress') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/account')">
        <span class="learn-footer-mark learn-footer-mark-user" aria-hidden="true" />
        <span>{{ t('nav.account') }}</span>
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

onMounted(() => {
  auth.fetchMe()
})
</script>
