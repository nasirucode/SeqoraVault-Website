import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/seqoravault-logo.svg'

/** Site-wide navigation — use on every page with `<Header />`. */
export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
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
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  const menuOverlay =
    typeof document !== 'undefined'
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
                  <Link className="headerMenuLink" to="/" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                ) : null}
                {isHome ? (
                  <a className="headerMenuLink" href="#features" onClick={() => setMenuOpen(false)}>
                    Features
                  </a>
                ) : (
                  <Link
                    className="headerMenuLink"
                    to="/#features"
                    onClick={() => setMenuOpen(false)}
                  >
                    Features
                  </Link>
                )}
                {isHome ? (
                  <a className="headerMenuLink" href="#vaults" onClick={() => setMenuOpen(false)}>
                    Vaults
                  </a>
                ) : (
                  <Link className="headerMenuLink" to="/#vaults" onClick={() => setMenuOpen(false)}>
                    Vaults
                  </Link>
                )}
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    `headerMenuLink${isActive ? ' headerMenuLink--active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Pricing
                </NavLink>
                {isHome ? (
                  <a className="headerMenuLink" href="#security" onClick={() => setMenuOpen(false)}>
                    Security
                  </a>
                ) : (
                  <Link
                    className="headerMenuLink"
                    to="/#security"
                    onClick={() => setMenuOpen(false)}
                  >
                    Security
                  </Link>
                )}

                <Link
                  className="headerMenuCta"
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
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
        <Link className="brand" to="/" aria-label="SeqoraVault home">
          <span className="logoCutout" aria-hidden="true">
            <span className="logoBlueDot" />
            <img className="logoImg" src={logo} alt="" />
          </span>
          <span className="brandName">SeqoraVault</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {!isHome ? (
            <Link className="navLink" to="/">
              Home
            </Link>
          ) : null}
          {isHome ? (
            <a className="navLink" href="#features">
              Features
            </a>
          ) : (
            <Link className="navLink" to="/#features">
              Features
            </Link>
          )}
          {isHome ? (
            <a className="navLink" href="#vaults">
              Vaults
            </a>
          ) : (
            <Link className="navLink" to="/#vaults">
              Vaults
            </Link>
          )}
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `navLink${isActive ? ' navLink--active' : ''}`
            }
          >
            Pricing
          </NavLink>
          {isHome ? (
            <a className="navLink" href="#security">
              Security
            </a>
          ) : (
            <Link className="navLink" to="/#security">
              Security
            </Link>
          )}
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
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
        </div>
      </div>
      </header>
      <Link
        className="headerInfoBar"
        to="/contact"
        onClick={() => setMenuOpen(false)}
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
