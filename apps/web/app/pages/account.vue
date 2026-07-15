<template>
  <div class="hub-page learn-scroll">
    <template v-if="loading">
      <UiSkeleton width="35%" height="0.75rem" />
      <UiSkeleton width="45%" height="2rem" />
      <UiSkeleton width="70%" height="0.95rem" />
      <UiSkeleton width="12rem" height="2.5rem" radius="6px" />
    </template>

    <template v-else-if="!auth.user">
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.account')"
        :title="t('account.title')"
        :lead="t('account.guestBody')"
      >
        <template #actions>
          <NuxtLink class="btn btn-primary" :to="loginPath">{{ t('nav.login') }}</NuxtLink>
          <NuxtLink class="btn btn-ghost" :to="registerPath">{{ t('nav.register') }}</NuxtLink>
        </template>
      </HubHeader>
    </template>

    <template v-else>
      <AppBreadcrumb :items="crumbs" />
      <HubHeader
        :eyebrow="t('nav.account')"
        :title="t('account.title')"
        :lead="t('account.lead')"
      />

      <dl class="account-facts">
        <div>
          <dt>{{ t('auth.email') }}</dt>
          <dd>{{ auth.user.email }}</dd>
        </div>
        <div>
          <dt>{{ t('account.role') }}</dt>
          <dd>{{ auth.isAdmin ? t('nav.admin') : t('account.roleLearner') }}</dd>
        </div>
        <div>
          <dt>{{ t('account.locale') }}</dt>
          <dd>{{ localeDisplayName(locale, t) }}</dd>
        </div>
      </dl>

      <section class="account-section" aria-labelledby="theme-heading">
        <h2 id="theme-heading">{{ t('theme.title') }}</h2>
        <p class="section-lead">{{ t('theme.lead') }}</p>
        <ThemePicker />
      </section>

      <section class="account-section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">{{ t('account.profileSection') }}</h2>
        <form class="form-stack" @submit.prevent="onSaveProfile">
          <div class="form-field">
            <label for="displayName">{{ t('account.displayName') }}</label>
            <input id="displayName" v-model="displayName" type="text" maxlength="80" required>
          </div>
          <p v-if="profileError" class="form-error" role="alert">{{ profileError }}</p>
          <button class="btn btn-primary" type="submit" :disabled="profileSaving">
            {{ profileSaving ? t('account.saving') : t('account.saveProfile') }}
          </button>
        </form>
      </section>

      <section v-if="canChangePassword" class="account-section" aria-labelledby="password-heading">
        <h2 id="password-heading">{{ t('account.passwordSection') }}</h2>
        <p class="section-lead">{{ t('account.passwordLead') }}</p>
        <form class="form-stack" @submit.prevent="onChangePassword">
          <div class="form-field">
            <label for="currentPassword">{{ t('account.currentPassword') }}</label>
            <input id="currentPassword" v-model="currentPassword" type="password" autocomplete="current-password" required>
          </div>
          <div class="form-field">
            <label for="newPassword">{{ t('account.newPassword') }}</label>
            <input id="newPassword" v-model="newPassword" type="password" autocomplete="new-password" required minlength="8">
            <p class="field-hint">{{ t('auth.passwordHint') }}</p>
          </div>
          <div class="form-field">
            <label for="confirmPassword">{{ t('account.confirmPassword') }}</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" autocomplete="new-password" required minlength="8">
          </div>
          <p v-if="passwordError" class="form-error" role="alert">{{ passwordError }}</p>
          <button class="btn btn-primary" type="submit" :disabled="passwordSaving">
            {{ passwordSaving ? t('account.saving') : t('account.changePassword') }}
          </button>
        </form>
      </section>

      <section v-else class="account-section" aria-labelledby="password-heading">
        <h2 id="password-heading">{{ t('account.passwordSection') }}</h2>
        <p class="section-lead">{{ t('account.googlePasswordHint') }}</p>
      </section>

      <div class="hub-actions">
        <NuxtLink class="btn btn-ghost" :to="localePath('/progress')">{{ t('nav.progress') }}</NuxtLink>
        <NuxtLink class="btn btn-ghost" :to="localePath('/notes')">{{ t('nav.notes') }}</NuxtLink>
        <NuxtLink v-if="auth.isAdmin" class="btn btn-ghost" :to="localePath('/admin')">{{ t('nav.admin') }}</NuxtLink>
        <button class="btn btn-ghost" type="button" @click="onLogout">{{ t('nav.logout') }}</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { buildHubBreadcrumbs } from '~/utils/breadcrumbs'
import { authErrorI18nKey } from '~/utils/authErrors'
import { localeDisplayName } from '~/utils/localeSwitch'

definePageMeta({ layout: 'learn' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const auth = useAuthStore()
const router = useRouter()
const snackbar = useSnackbar()
const loading = ref(true)

const displayName = ref('')
const profileSaving = ref(false)
const profileError = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordSaving = ref(false)
const passwordError = ref('')

const canChangePassword = computed(() => auth.user?.hasPassword !== false)

const crumbs = computed(() =>
  buildHubBreadcrumbs({
    homeLabel: t('nav.home'),
    homeTo: localePath('/'),
    pageLabel: t('nav.account'),
  }),
)

const loginPath = computed(() => ({
  path: localePath('/login'),
  query: { redirect: localePath('/account') },
}))
const registerPath = computed(() => ({
  path: localePath('/register'),
  query: { redirect: localePath('/account') },
}))

async function onSaveProfile() {
  profileError.value = ''
  profileSaving.value = true
  try {
    await auth.updateProfile(displayName.value)
    snackbar.success(t('account.profileSaved'))
  } catch (e) {
    const msg = e instanceof Error ? e.message : ''
    profileError.value = t(authErrorI18nKey(msg))
  } finally {
    profileSaving.value = false
  }
}

async function onChangePassword() {
  passwordError.value = ''
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = t('account.passwordMismatch')
    return
  }
  passwordSaving.value = true
  try {
    await auth.changePassword(currentPassword.value, newPassword.value)
    snackbar.success(t('account.passwordChanged'))
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e) {
    const msg = e instanceof Error ? e.message : ''
    passwordError.value = t(authErrorI18nKey(msg))
  } finally {
    passwordSaving.value = false
  }
}

async function onLogout() {
  await auth.logout()
  router.push(localePath('/'))
}

onMounted(async () => {
  loading.value = true
  try {
    await auth.fetchMe()
    displayName.value = auth.user?.displayName || ''
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.account-facts {
  margin: 0;
  display: grid;
  gap: 0.9rem;
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
}

.account-facts dt {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.account-facts dd {
  margin: 0.25rem 0 0;
  color: var(--color-ink);
}

.account-section {
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
}

.account-section h2 {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
}

.section-lead {
  margin: -0.25rem 0 0.85rem;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
  line-height: 1.45;
}

.field-hint {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: var(--color-ink-faint);
}

.form-error {
  margin: 0;
  color: var(--color-error);
  font-size: 0.92rem;
}

.form-ok {
  margin: 0;
  color: var(--color-success);
  font-size: 0.92rem;
}

.hub-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
