const MESSAGE_TO_KEY: Record<string, string> = {
  'password must be at least 8 characters': 'auth.errors.passwordMin',
  'new password must differ from current password': 'auth.errors.passwordSame',
  'current password is incorrect': 'auth.errors.currentPassword',
  'display name is required': 'auth.errors.displayNameRequired',
  'display name must be at most 80 characters': 'auth.errors.displayNameMax',
  'invalid credentials': 'auth.errors.invalidCredentials',
  'email already registered': 'auth.errors.emailTaken',
  'invalid email': 'auth.errors.invalidEmail',
  'email is required': 'auth.errors.emailRequired',
  'use Google login for this account': 'auth.errors.useGoogle',
  'invalid body': 'auth.errors.generic',
}

/** Map API auth error message → i18n key (vi/en). */
export function authErrorI18nKey(message: string | null | undefined): string {
  if (!message) return 'auth.errors.generic'
  const key = MESSAGE_TO_KEY[message.trim()]
  return key || 'auth.errors.generic'
}
