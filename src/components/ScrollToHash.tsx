'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function applyScrollFromLocation() {
  if (typeof window === 'undefined') return

  const { hash } = window.location
  if (hash && hash.length > 1) {
    const id = hash.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    return
  }

  window.scrollTo(0, 0)
}

/** Scroll to top on route change; smooth-scroll to `#id` when the hash is set or changes. */
export function ScrollToHash() {
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    applyScrollFromLocation()
    window.addEventListener('hashchange', applyScrollFromLocation)
    return () => window.removeEventListener('hashchange', applyScrollFromLocation)
  }, [pathname])

  return null
}
