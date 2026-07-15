export type PostAuthRedirectInput = {
  /** Raw `?redirect=` query value (may be unsafe). */
  redirectQuery?: string | null
  /** Locale-aware home path (Continue CTA lives here). */
  homePath: string
  /** Optional resume lesson path when progress is known. */
  resumePath?: string | null
  /**
   * When true and no safe redirect query, go to resumePath instead of home.
   * Default false — prefer home so first-run sees Continue / Start CTA.
   */
  preferResume?: boolean
}

/**
 * Resolve where to send the user after login/register.
 * Safe relative paths only for redirect query (open-redirect guard).
 */
export function resolvePostAuthRedirect(input: PostAuthRedirectInput): string {
  const safe = sanitizeInternalPath(input.redirectQuery)
  if (safe) return safe
  if (input.preferResume && input.resumePath) {
    const resume = sanitizeInternalPath(input.resumePath)
    if (resume) return resume
  }
  return input.homePath || '/'
}

function sanitizeInternalPath(raw: string | null | undefined): string | null {
  if (!raw) return null
  const path = raw.trim()
  if (!path.startsWith('/')) return null
  if (path.startsWith('//')) return null
  if (path.includes('://')) return null
  if (path.includes('\\')) return null
  return path
}
