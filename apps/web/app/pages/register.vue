<template>
  <div class="card auth-card">
    <h1>{{ t('auth.registerTitle') }}</h1>
    <p class="auth-subtitle">{{ t('auth.registerSubtitle') }}</p>
    <form class="form-stack" @submit.prevent="onSubmit">
      <div class="form-field">
        <label for="reg-name">{{ t('auth.displayName') }}</label>
        <input id="reg-name" v-model="displayName" type="text" autocomplete="name" />
      </div>
      <div class="form-field">
        <label for="reg-email">{{ t('auth.email') }}</label>
        <input id="reg-email" v-model="email" type="email" required autocomplete="email" />
      </div>
      <div class="form-field">
        <label for="reg-password">{{ t('auth.password') }}</label>
        <input
          id="reg-password"
          v-model="password"
          type="password"
          required
          minlength="8"
          autocomplete="new-password"
        />
        <p class="field-hint">{{ t('auth.passwordHint') }}</p>
      </div>
      <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
      <button class="btn btn-primary" type="submit" :disabled="submitting">
        {{ t('auth.submitRegister') }}
      </button>
      <a
        v-if="providers?.google"
        class="btn btn-ghost"
        :href="googleAuthHref"
      >{{ t('auth.google') }}</a>
      <p class="auth-switch">
        {{ t('auth.hasAccount') }}
        <NuxtLink :to="loginLink">{{ t('nav.login') }}</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authErrorI18nKey } from '~/utils/authErrors'
import { googleOAuthStartUrl } from '~/utils/googleOAuth'
import { resolvePostAuthRedirect } from '~/utils/postAuthRedirect'

const config = useRuntimeConfig()

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const api = useApi()

const displayName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)
const providers = ref<{ email: boolean; google: boolean; contentBackend: string } | null>(null)

const redirectQuery = computed(() => {
  const q = route.query.redirect
  return typeof q === 'string' ? q : null
})

const loginLink = computed(() => {
  const base = localePath('/login')
  if (!redirectQuery.value) return base
  return { path: base, query: { redirect: redirectQuery.value } }
})

const googleAuthHref = computed(() =>
  googleOAuthStartUrl(
    config.public.apiBase as string,
    redirectQuery.value,
    localePath('/'),
  ),
)

onMounted(async () => {
  try {
    providers.value = await api.providers()
  } catch {
    providers.value = { email: true, google: false, contentBackend: 'local' }
  }
})

async function onSubmit() {
  error.value = ''
  if (password.value.length < 8) {
    error.value = t('auth.errors.passwordMin')
    return
  }
  submitting.value = true
  try {
    await auth.register(email.value, password.value, displayName.value)
    const target = resolvePostAuthRedirect({
      redirectQuery: redirectQuery.value,
      homePath: localePath('/'),
    })
    await router.push(target)
  } catch (e) {
    error.value = t(authErrorI18nKey((e as Error).message))
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.auth-card {
  max-width: 24rem;
  margin: 3rem auto;
}
.auth-subtitle {
  color: var(--color-ink-muted);
  font-size: 0.95rem;
  margin: 0 0 1.25rem;
  line-height: 1.45;
}
.field-hint {
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  color: var(--color-ink-muted);
}
.auth-error {
  color: var(--color-error);
  margin: 0;
  font-size: 0.9rem;
}
.auth-switch {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--color-ink-muted);
}
</style>
