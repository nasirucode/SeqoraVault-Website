/** Stored in `localStorage` — legacy `'accepted' | 'declined'` or JSON v2 with granular optional categories. */
export const COOKIE_CONSENT_STORAGE_KEY = 'seqoravault_cookie_consent'

export const COOKIE_CONSENT_EVENT = 'seqoravault:cookie-consent'

export const COOKIE_CONSENT_RESET_EVENT = 'seqoravault:cookie-consent-reset'

const PREFS_VERSION = 2 as const

/** Optional categories only (strictly necessary + functional preferences are always applied separately). */
export type CookieConsentPrefs = {
  /** Crash / error monitoring (e.g. Sentry) */
  performance: boolean
  /** Privacy-first analytics (e.g. Plausible) */
  analytics: boolean
  /** Support chat (Tawk.to) — defaults to on until the user turns it off */
  chat: boolean
}

/** `true` = all optional categories on; `false` = all optional off (minimal / “reject optional”). */
export function defaultCookiePrefs(allOptional: boolean): CookieConsentPrefs {
  if (allOptional) {
    return { performance: true, analytics: true, chat: true }
  }
  return { performance: false, analytics: false, chat: false }
}

function readRaw(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Returns `null` when the user has not yet made a choice (banner should show). */
export function getConsentPreferences(): CookieConsentPrefs | null {
  const raw = readRaw()
  if (raw === null) return null
  if (raw === 'accepted') return defaultCookiePrefs(true)
  if (raw === 'declined') return defaultCookiePrefs(false)
  try {
    const o = JSON.parse(raw) as {
      v?: number
      performance?: boolean
      analytics?: boolean
      chat?: boolean
    }
    if (o && typeof o === 'object' && o.v === PREFS_VERSION) {
      return {
        performance: Boolean(o.performance),
        analytics: Boolean(o.analytics),
        chat: o.chat === undefined ? true : Boolean(o.chat),
      }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function saveConsentPreferences(prefs: CookieConsentPrefs): void {
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ v: PREFS_VERSION, ...prefs }),
    )
  } catch {
    /* private mode / blocked */
  }
  window.dispatchEvent(
    new CustomEvent<{ prefs: CookieConsentPrefs }>(COOKIE_CONSENT_EVENT, {
      detail: { prefs },
    }),
  )
}

/**
 * Banner stays hidden only after the user opts into at least one optional category (Accept all,
 * Save with a toggle on, or legacy `accepted`). If they reject / leave all optional off / never
 * chose, we show again on the next visit or navigation.
 */
export function shouldShowCookieBanner(): boolean {
  const p = getConsentPreferences()
  if (p === null) return true
  return !p.performance && !p.analytics && !p.chat
}

/**
 * Legacy helper — “accepted” if any optional category is on. Prefer `getConsentPreferences()` for
 * granular logic.
 */
export function getCookieConsent(): 'accepted' | 'declined' | null {
  const p = getConsentPreferences()
  if (!p) return null
  if (p.performance || p.analytics || p.chat) return 'accepted'
  return 'declined'
}

/** Tawk loads when `true`. No stored prefs yet → on by default. */
export function isChatOptedIn(): boolean {
  const p = getConsentPreferences()
  if (p === null) return true
  return p.chat === true
}

/** Clears the saved choice so the consent bar appears again on next paint. */
export function resetCookieConsentPreference(): void {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_RESET_EVENT))
}

/** Tawk.to embed — inject only when `isChatOptedIn()` (see `TawkChatLoader`). */
export const TAWK_EMBED_SCRIPT_SRC =
  'https://embed.tawk.to/69fa7bb03527a91c38586e02/1jnt76alv'
