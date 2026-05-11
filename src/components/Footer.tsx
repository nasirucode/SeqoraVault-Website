'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { resetCookieConsentPreference } from '@/lib/cookieConsent'
import { isHomePath, sectionLink } from '@/lib/site'
import logo from '@/assets/seqoravault-logo.png'

/** Site-wide footer — use on every page with `<Footer />`. */
export function Footer() {
  const pathname = usePathname() ?? '/'
  const isHome = isHomePath(pathname)

  return (
    <footer className="footer">
      <div className="footerBackdrop" aria-hidden="true" />
      <div className="container footerShell">
        <div className="footerCard">
          <div className="footerTop">
            <Link className="brand footerBrandMark" href="/">
              <span className="logoCutout" aria-hidden="true">
                <span className="logoBlueDot" />
                <img className="logoImg" src={typeof logo === 'string' ? logo : logo.src} alt="" />
              </span>
              <span className="brandName">SeqoraVault</span>
            </Link>

            <nav className="footerNav" aria-label="Footer">
              <div className="footerCol">
                <div className="footerColTitle">Product</div>
                <ul className="footerColList">
                  <li>
                    <Link href={sectionLink('features', isHome)}>Features</Link>
                  </li>
                  <li>
                    <Link href={sectionLink('vaults', isHome)}>Vaults</Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className={pathname === '/pricing' ? 'footerNavLink--active' : undefined}
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href={sectionLink('security', isHome)}>Security</Link>
                  </li>
                </ul>
              </div>
              <div className="footerCol">
                <div className="footerColTitle">Company</div>
                <ul className="footerColList">
                  <li>
                    <a href="/about">About us</a>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className={
                        pathname.startsWith('/careers') ? 'footerNavLink--active' : undefined
                      }
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className={pathname === '/contact' ? 'footerNavLink--active' : undefined}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footerCol">
                <div className="footerColTitle">Resources</div>
                <ul className="footerColList">
                  <li>
                    <a href="/docs">Docs</a>
                  </li>
                  <li>
                    <a href="/support">Support</a>
                  </li>
                </ul>
              </div>
              <div className="footerCol">
                <div className="footerColTitle">Social</div>
                <ul className="footerColList">
                  <li>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                      x.com
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="footerRule" role="presentation" />

          <div className="footerLegal">
            <span>© {new Date().getFullYear()} SeqoraVault</span>
            <span className="footerLegalSep" aria-hidden="true">
              ·
            </span>
            <Link className="footerLegalLink" href="/terms">
              Terms
            </Link>
            <span className="footerLegalSep" aria-hidden="true">
              ·
            </span>
            <Link className="footerLegalLink" href="/privacy">
              Privacy
            </Link>
            <span className="footerLegalSep" aria-hidden="true">
              ·
            </span>
            <Link className="footerLegalLink" href="/cookies">
              Cookies
            </Link>
            <span className="footerLegalSep" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              className="footerLegalLink footerLegalBtn"
              onClick={() => resetCookieConsentPreference()}
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
