<template>
  <div class="card auth-card">
    <h1>{{ t('auth.loginTitle') }}</h1>
    <p class="auth-subtitle">{{ t('auth.loginSubtitle') }}</p>
    <form class="form-stack" @submit.prevent="onSubmit">
      <div class="form-field">
        <label for="login-email">{{ t('auth.email') }}</label>
        <input id="login-email" v-model="email" type="email" required autocomplete="email" />
      </div>
      <div class="form-field">
        <label for="login-password">{{ t('auth.password') }}</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
        />
      </div>
      <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
      <button class="btn btn-primary" type="submit" :disabled="submitting">
        {{ t('auth.submitLogin') }}
      </button>
      <a
        v-if="providers?.google"
        class="btn btn-ghost"
        :href="googleAuthHref"
      >{{ t('auth.google') }}</a>
      <p class="auth-switch">
        {{ t('auth.noAccount') }}
        <NuxtLink :to="registerLink">{{ t('nav.register') }}</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authErrorI18nKey } from '~/utils/authErrors'
import { googleOAuthStartUrl } from '~/utils/googleOAuth'
import { oauthLoginErrorKey } from '~/utils/oauthLoginError'
import { resolvePostAuthRedirect } from '~/utils/postAuthRedirect'

const config = useRuntimeConfig()

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const api = useApi()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)
const providers = ref<{ email: boolean; google: boolean; contentBackend: string } | null>(null)

const redirectQuery = computed(() => {
  const q = route.query.redirect
  return typeof q === 'string' ? q : null
})

const registerLink = computed(() => {
  const base = localePath('/register')
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
  const oauthKey = oauthLoginErrorKey(
    typeof route.query.error === 'string' ? route.query.error : null,
  )
  if (oauthKey) {
    error.value = t(oauthKey)
  }
  try {
    providers.value = await api.providers()
  } catch {
    providers.value = { email: true, google: false, contentBackend: 'local' }
  }
})

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await auth.login(email.value, password.value)
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
