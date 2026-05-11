'use client'

import { useEffect, useId, useState } from 'react'
import { useIsClient } from '@/hooks/useIsClient'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { isHomePath, sectionLink } from '@/lib/site'
import logo from '@/assets/seqoravault-logo.png'

/** Site-wide navigation — use on every page with `<Header />`. */
export function Header() {
  const pathname = usePathname() ?? '/'
  const isHome = isHomePath(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  /** Same tree during SSR + hydration; portal mounts only after client takeover (`useSyncExternalStore`). */
  const portalReady = useIsClient()
  const menuId = useId()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset drawer when navigating
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const menuOverlay =
    portalReady
      ? createPortal(
          <div
            className={`headerMenuShell${menuOpen ? ' headerMenuShell--open' : ''}`}
            aria-hidden={!menuOpen}
          >
            <button
              type="button"
              className="headerMenuBackdrop"
              tabIndex={-1}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="headerMenuPanel"
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="headerMenuTop">
                <span className="headerMenuTitle">Menu</span>
                <button
                  type="button"
                  className="headerMenuClose"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={22} strokeWidth={2.2} />
                </button>
              </div>
              <nav className="headerMenuNav" aria-label="Primary mobile">
                {!isHome ? (
                  <Link
                    className="headerMenuLink"
                    href="/"
                    prefetch
                    onPointerDown={closeMenu}
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                ) : null}
                <Link
                  className="headerMenuLink"
                  href={sectionLink('features', isHome)}
                  prefetch
                  onPointerDown={closeMenu}
                  onClick={closeMenu}
                >
                  Features
                </Link>
                <Link
                  className="headerMenuLink"
                  href={sectionLink('vaults', isHome)}
                  prefetch
                  onPointerDown={closeMenu}
                  onClick={closeMenu}
                >
                  Vaults
                </Link>
                <Link
                  className={`headerMenuLink${pathname === '/pricing' ? ' headerMenuLink--active' : ''}`}
                  href="/pricing"
                  prefetch
                  onPointerDown={closeMenu}
                  onClick={closeMenu}
                >
                  Pricing
                </Link>
                <Link
                  className="headerMenuLink"
                  href={sectionLink('security', isHome)}
                  prefetch
                  onPointerDown={closeMenu}
                  onClick={closeMenu}
                >
                  Security
                </Link>

                <Link
                  className="headerMenuCta"
                  href="/contact"
                  prefetch
                  onPointerDown={closeMenu}
                  onClick={closeMenu}
                >
                  Contact us
                </Link>
              </nav>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <header className="header">
        <div className="container headerInner">
          <Link className="brand" href="/" aria-label="SeqoraVault home">
            <span className="logoCutout" aria-hidden="true">
              <span className="logoBlueDot" />
              <img className="logoImg" src={typeof logo === 'string' ? logo : logo.src} alt="" />
            </span>
            <span className="brandText">
              <span className="brandName">
                <span className="srOnly">SeqoraVault</span>
                <span className="brandNameSpread" aria-hidden="true">
                  {'SeqoraVault'.split('').map((ch, i) => (
                    <span key={i} className="brandNameLetter">
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
              <span className="brandTagline">your legacy, their certainty</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {!isHome ? (
              <Link className="navLink" href="/" prefetch>
                Home
              </Link>
            ) : null}
            <Link className="navLink" href={sectionLink('features', isHome)} prefetch>
              Features
            </Link>
            <Link className="navLink" href={sectionLink('vaults', isHome)} prefetch>
              Vaults
            </Link>
            <Link
              className={`navLink${pathname === '/pricing' ? ' navLink--active' : ''}`}
              href="/pricing"
              prefetch
            >
              Pricing
            </Link>
            <Link className="navLink" href={sectionLink('security', isHome)} prefetch>
              Security
            </Link>
          </nav>

          <div className="headerEnd">
            <button
              type="button"
              className="headerMenuBtn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
            </button>
            <Link
              className="btn btnGhost headerContactBtn"
              href="/contact"
              prefetch
              onPointerDown={closeMenu}
              onClick={closeMenu}
            >
              Contact us
            </Link>
          </div>
        </div>
      </header>
      <Link
        className="headerInfoBar"
        href="/contact"
        prefetch
        onPointerDown={closeMenu}
        onClick={closeMenu}
        aria-label="Coming soon — join waiting list"
      >
        <span className="headerInfoBarInner">
          <span className="headerInfoPill" aria-hidden="true">
            Coming soon
          </span>
          <span className="headerInfoText">Join the waiting list</span>
          <span className="headerInfoSep" aria-hidden="true">
            ·
          </span>
          <span className="headerInfoNote">First 500 subscribers get lifetime access</span>
          <span className="headerInfoArrow" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
      {menuOverlay}
    </>
  )
}
