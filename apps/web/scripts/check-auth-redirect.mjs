/**
 * Node test for post-auth redirect + auth error mapping.
 * Run: node --experimental-strip-types --test scripts/check-auth-redirect.mjs
 */
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { resolvePostAuthRedirect } from '../app/utils/postAuthRedirect.ts'
import { authErrorI18nKey } from '../app/utils/authErrors.ts'
import { oauthLoginErrorKey } from '../app/utils/oauthLoginError.ts'

describe('resolvePostAuthRedirect', () => {
  it('uses safe relative redirect query when present', () => {
    assert.equal(
      resolvePostAuthRedirect({
        redirectQuery: '/tracks/sql-fundamentals/lessons/select',
        homePath: '/',
        resumePath: '/tracks/sql-fundamentals/lessons/intro',
      }),
      '/tracks/sql-fundamentals/lessons/select',
    )
  })

  it('rejects absolute or protocol-relative redirect', () => {
    assert.equal(
      resolvePostAuthRedirect({
        redirectQuery: 'https://evil.example/phish',
        homePath: '/',
      }),
      '/',
    )
    assert.equal(
      resolvePostAuthRedirect({
        redirectQuery: '//evil.example/phish',
        homePath: '/',
      }),
      '/',
    )
  })

  it('prefers home when no safe redirect (Continue CTA lives there)', () => {
    assert.equal(
      resolvePostAuthRedirect({
        redirectQuery: null,
        homePath: '/',
        resumePath: '/tracks/sql-fundamentals/lessons/intro',
      }),
      '/',
    )
  })

  it('uses resume only when preferResume is true', () => {
    assert.equal(
      resolvePostAuthRedirect({
        homePath: '/',
        resumePath: '/tracks/sql-fundamentals/lessons/intro',
        preferResume: true,
      }),
      '/tracks/sql-fundamentals/lessons/intro',
    )
  })
})

describe('authErrorI18nKey', () => {
  it('maps known API messages to i18n keys', () => {
    assert.equal(
      authErrorI18nKey('password must be at least 8 characters'),
      'auth.errors.passwordMin',
    )
    assert.equal(authErrorI18nKey('invalid credentials'), 'auth.errors.invalidCredentials')
    assert.equal(authErrorI18nKey('email already registered'), 'auth.errors.emailTaken')
    assert.equal(authErrorI18nKey('invalid email'), 'auth.errors.invalidEmail')
    assert.equal(authErrorI18nKey('email is required'), 'auth.errors.emailRequired')
    assert.equal(authErrorI18nKey('use Google login for this account'), 'auth.errors.useGoogle')
    assert.equal(
      authErrorI18nKey('current password is incorrect'),
      'auth.errors.currentPassword',
    )
    assert.equal(
      authErrorI18nKey('new password must differ from current password'),
      'auth.errors.passwordSame',
    )
    assert.equal(authErrorI18nKey('display name is required'), 'auth.errors.displayNameRequired')
  })

  it('falls back to generic key', () => {
    assert.equal(authErrorI18nKey('something weird'), 'auth.errors.generic')
    assert.equal(authErrorI18nKey(''), 'auth.errors.generic')
  })
})

describe('oauthLoginErrorKey', () => {
  it('maps known OAuth callback errors', () => {
    assert.equal(oauthLoginErrorKey('oauth'), 'auth.errors.oauth')
    assert.equal(oauthLoginErrorKey('state'), 'auth.errors.oauthState')
    assert.equal(oauthLoginErrorKey('exchange'), 'auth.errors.oauthExchange')
    assert.equal(oauthLoginErrorKey('userinfo'), 'auth.errors.oauthUserinfo')
    assert.equal(oauthLoginErrorKey('auth'), 'auth.errors.oauthAuth')
  })

  it('returns null when no error query', () => {
    assert.equal(oauthLoginErrorKey(null), null)
    assert.equal(oauthLoginErrorKey(''), null)
  })

  it('falls back for unknown codes', () => {
    assert.equal(oauthLoginErrorKey('weird'), 'auth.errors.oauth')
  })
})
