<template>
  <div class="app-shell default-shell">
    <header class="app-header">
      <NuxtLink :to="localePath('/')" class="brand">
        <span>Syn</span>taxia
      </NuxtLink>
      <nav class="app-header-nav" aria-label="Primary">
        <ThemeMenu />
        <NuxtLink class="default-header-link" :to="localePath('/tracks')">{{ t('nav.tracks') }}</NuxtLink>
        <NuxtLink class="default-header-link" :to="localePath('/progress')">{{ t('nav.progress') }}</NuxtLink>
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
      <NuxtLink class="learn-footer-item footer-tracks" :to="localePath('/tracks')">
        <FooterNavIcon name="tracks" />
        <span>{{ t('nav.tracks') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/search')">
        <FooterNavIcon name="search" />
        <span>{{ t('nav.search') }}</span>
      </NuxtLink>
      <NuxtLink class="learn-footer-item" :to="localePath('/progress')">
        <FooterNavIcon name="progress" />
        <span>{{ t('nav.progress') }}</span>
      </NuxtLink>
      <NuxtLink
        class="learn-footer-item"
        :to="auth.user ? localePath('/account') : localePath('/login')"
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

onMounted(() => {
  auth.fetchMe()
})
</script>
