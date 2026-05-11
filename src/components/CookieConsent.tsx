'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Cookie, X } from 'lucide-react'
import {
  COOKIE_CONSENT_RESET_EVENT,
  defaultCookiePrefs,
  getConsentPreferences,
  saveConsentPreferences,
  shouldShowCookieBanner,
  type CookieConsentPrefs,
} from '@/lib/cookieConsent'
import { usePreloaderReady } from '@/components/Preloader'
import '@/components/CookieConsent.css'

function setPref<K extends keyof CookieConsentPrefs>(
  prefs: CookieConsentPrefs,
  key: K,
  value: CookieConsentPrefs[K],
): CookieConsentPrefs {
  return { ...prefs, [key]: value }
}

export function CookieConsent() {
  const preloaderDone = usePreloaderReady()
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [prefs, setPrefs] = useState<CookieConsentPrefs>(() => defaultCookiePrefs(false))

  useEffect(() => {
    if (!preloaderDone) return
    const id = requestAnimationFrame(() => {
      const visible = shouldShowCookieBanner()
      setShow(visible)
      if (visible) {
        setManageOpen(false)
        setPrefs(getConsentPreferences() ?? defaultCookiePrefs(false))
      }
    })
    return () => cancelAnimationFrame(id)
  }, [preloaderDone, pathname])

  useEffect(() => {
    const onReset = () => {
      setPrefs(defaultCookiePrefs(false))
      setManageOpen(false)
      setShow(true)
    }
    window.addEventListener(COOKIE_CONSENT_RESET_EVENT, onReset)
    return () => window.removeEventListener(COOKIE_CONSENT_RESET_EVENT, onReset)
  }, [])

  const acceptAll = () => {
    saveConsentPreferences(defaultCookiePrefs(true))
    setShow(false)
  }

  const rejectOptional = () => {
    saveConsentPreferences(defaultCookiePrefs(false))
    setShow(false)
  }

  const saveCustom = () => {
    saveConsentPreferences(prefs)
    setShow(false)
  }

  const toggleManage = () => setManageOpen((o) => !o)

  if (!preloaderDone || !show) return null

  return (
    <div
      className="cookieConsent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookieConsentCard">
        <div className="cookieConsentIconWrap" aria-hidden="true">
          <Cookie size={22} strokeWidth={2} className="cookieConsentIcon" />
        </div>
        <div className="cookieConsentBody">
          <h2 id="cookie-consent-title" className="cookieConsentTitle">
            Cookie preferences
          </h2>
          <p id="cookie-consent-desc" className="cookieConsentText">
            Support chat is <strong>on by default</strong> — turn it off under Manage if you prefer.
            Optional performance monitoring and analytics are off until you enable them. Read our{' '}
            <Link href="/cookies" className="cookieConsentLink">
              Cookie Policy
            </Link>
            .
          </p>

          <div className="cookieConsentActions">
            <button type="button" className="cookieConsentBtn cookieConsentBtn--ghost" onClick={rejectOptional}>
              Reject optional
            </button>
            <button
              type="button"
              className="cookieConsentBtn cookieConsentBtn--ghost cookieConsentBtn--manage"
              onClick={toggleManage}
              aria-expanded={manageOpen}
              aria-controls="cookie-consent-manage"
            >
              Manage preferences
              <ChevronDown
                size={18}
                strokeWidth={2.2}
                className={`cookieConsentManageChevron${manageOpen ? ' cookieConsentManageChevron--open' : ''}`}
                aria-hidden
              />
            </button>
            <button type="button" className="cookieConsentBtn cookieConsentBtn--primary" onClick={acceptAll}>
              Accept all
            </button>
          </div>

          <div
            id="cookie-consent-manage"
            className={`cookieConsentPrefs${manageOpen ? ' cookieConsentPrefs--open' : ''}`}
            aria-hidden={!manageOpen}
          >
            <div className="cookieConsentPrefsInner">
              <p className="cookieConsentPrefsLead">
                Strictly necessary cookies always stay active. Support chat defaults to on — switch it off
                here if you don&apos;t want the widget.
              </p>

              <div className="cookieConsentToggleList">
                <div className="cookieConsentToggleRow">
                  <div className="cookieConsentToggleText">
                    <span className="cookieConsentToggleLabel">Performance &amp; error monitoring</span>
                    <span className="cookieConsentToggleDesc">
                      Helps us spot crashes and fix bugs faster (e.g. Sentry).
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.performance}
                    aria-label="Performance and error monitoring"
                    className="cookieConsentSwitch"
                    onClick={() => setPrefs((p) => setPref(p, 'performance', !p.performance))}
                  >
                    <span
                      className="cookieConsentSwitchTrack"
                      data-on={prefs.performance ? 'true' : 'false'}
                    >
                      <span className="cookieConsentSwitchThumb" />
                    </span>
                  </button>
                </div>

                <div className="cookieConsentToggleRow">
                  <div className="cookieConsentToggleText">
                    <span className="cookieConsentToggleLabel">Analytics</span>
                    <span className="cookieConsentToggleDesc">
                      Anonymous, aggregated usage — no cross-site profiles (e.g. Plausible).
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.analytics}
                    aria-label="Analytics"
                    className="cookieConsentSwitch"
                    onClick={() => setPrefs((p) => setPref(p, 'analytics', !p.analytics))}
                  >
                    <span
                      className="cookieConsentSwitchTrack"
                      data-on={prefs.analytics ? 'true' : 'false'}
                    >
                      <span className="cookieConsentSwitchThumb" />
                    </span>
                  </button>
                </div>

                <div className="cookieConsentToggleRow">
                  <div className="cookieConsentToggleText">
                    <span className="cookieConsentToggleLabel">Support chat</span>
                    <span className="cookieConsentToggleDesc">
                      Live chat (Tawk.to). On by default — turn off to hide the widget.
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.chat}
                    aria-label="Support chat"
                    className="cookieConsentSwitch"
                    onClick={() => setPrefs((p) => setPref(p, 'chat', !p.chat))}
                  >
                    <span className="cookieConsentSwitchTrack" data-on={prefs.chat ? 'true' : 'false'}>
                      <span className="cookieConsentSwitchThumb" />
                    </span>
                  </button>
                </div>
              </div>

              <button type="button" className="cookieConsentBtn cookieConsentBtn--save" onClick={saveCustom}>
                Save my preferences
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="cookieConsentClose"
          onClick={rejectOptional}
          aria-label="Reject optional cookies and close"
        >
          <X size={18} strokeWidth={2.2} aria-hidden />
        </button>
      </div>
    </div>
  )
}
