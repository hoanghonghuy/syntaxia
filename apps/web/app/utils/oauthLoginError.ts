const OAUTH_QUERY_TO_KEY: Record<string, string> = {
  oauth: 'auth.errors.oauth',
  state: 'auth.errors.oauthState',
  exchange: 'auth.errors.oauthExchange',
  userinfo: 'auth.errors.oauthUserinfo',
  auth: 'auth.errors.oauthAuth',
}

/** Map ?error= query from Google callback → i18n key, or null when absent/unknown. */
export function oauthLoginErrorKey(queryError: string | null | undefined): string | null {
  if (!queryError) return null
  const key = OAUTH_QUERY_TO_KEY[queryError.trim()]
  return key || 'auth.errors.oauth'
}
