import { resolvePostAuthRedirect } from './postAuthRedirect.ts'

/** Build Google OAuth start URL with optional safe post-login redirect. */
export function googleOAuthStartUrl(
  apiBase: string,
  redirectQuery: string | null | undefined,
  homePath: string,
): string {
  const base = `${apiBase.replace(/\/$/, '')}/api/v1/auth/google`
  const safe = resolvePostAuthRedirect({ redirectQuery, homePath })
  if (!redirectQuery || safe === homePath) {
    return base
  }
  return `${base}?redirect=${encodeURIComponent(safe)}`
}
