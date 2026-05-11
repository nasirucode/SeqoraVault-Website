'use client'

import { useEffect, useRef } from 'react'
import {
  COOKIE_CONSENT_EVENT,
  isChatOptedIn,
  TAWK_EMBED_SCRIPT_SRC,
} from '@/lib/cookieConsent'

type TawkApi = {
  showWidget?: () => void
  hideWidget?: () => void
}

function getTawkApi(): TawkApi | undefined {
  return (window as Window & { Tawk_API?: TawkApi }).Tawk_API
}

function syncWidgetVisibility() {
  const api = getTawkApi()
  if (!api) return
  try {
    if (isChatOptedIn()) {
      api.showWidget?.()
    } else {
      api.hideWidget?.()
    }
  } catch {
    /* widget not ready */
  }
}

export function TawkChatLoader() {
  const inserted = useRef(false)

  useEffect(() => {
    let cancelled = false

    function insertScript() {
      if (!isChatOptedIn()) return
      if (inserted.current) return
      if (document.querySelector(`script[src="${TAWK_EMBED_SCRIPT_SRC}"]`)) {
        inserted.current = true
        return
      }

      inserted.current = true
      const w = window as Window & { Tawk_API?: TawkApi & { onLoad?: () => void }; Tawk_LoadStart?: Date }
      w.Tawk_API = w.Tawk_API || {}
      const prevOnLoad = w.Tawk_API.onLoad
      w.Tawk_API.onLoad = function tawkOnLoad() {
        prevOnLoad?.()
        syncWidgetVisibility()
      }
      w.Tawk_LoadStart = new Date()
      const s1 = document.createElement('script')
      s1.async = true
      s1.src = TAWK_EMBED_SCRIPT_SRC
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      const s0 = document.getElementsByTagName('script')[0]
      s0?.parentNode?.insertBefore(s1, s0)
    }

    function reconcile() {
      if (cancelled) return
      insertScript()
      syncWidgetVisibility()
      ;[50, 200, 600, 1600].forEach((ms) => {
        setTimeout(() => {
          if (!cancelled) syncWidgetVisibility()
        }, ms)
      })
    }

    reconcile()
    const onConsent = () => reconcile()
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)

    return () => {
      cancelled = true
      window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
    }
  }, [])

  return null
}
