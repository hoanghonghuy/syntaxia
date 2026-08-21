<template>
  <div class="auth-page">
    <div class="card auth-card">
      <div class="auth-head">
        <NuxtLink :to="localePath('/')" class="auth-brand">Syntaxia</NuxtLink>
        <h1>{{ t('auth.loginTitle') }}</h1>
      </div>

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
.auth-page {
  display: grid;
  min-height: 100%;
  place-items: start center;
  padding: clamp(2rem, 8vw, 5rem) var(--space-4);
}

.auth-card {
  width: min(100%, 25rem);
  margin: 0;
  padding: clamp(1.5rem, 5vw, 2rem);
  box-shadow: 0 20px 50px color-mix(in srgb, var(--color-ink) 8%, transparent);
}

.auth-head {
  margin-bottom: var(--space-5);
}

.auth-brand {
  display: inline-block;
  margin-bottom: var(--space-4);
  color: var(--color-brand-deep);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.auth-head h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 6vw, 2.35rem);
  letter-spacing: -0.04em;
}

.auth-error {
  margin: 0;
  color: var(--color-error);
  font-size: 0.9rem;
}

.auth-switch {
  margin: 0.5rem 0 0;
  color: var(--color-ink-muted);
  font-size: 0.9rem;
}
</style>
