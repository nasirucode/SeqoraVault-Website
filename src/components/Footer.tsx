import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/seqoravault-logo.svg'

/** Site-wide footer — use on every page with `<Footer />`. */
export function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <footer className="footer">
      <div className="footerBackdrop" aria-hidden="true" />
      <div className="container footerShell">
        <div className="footerCard">
          <div className="footerTop">
            <Link className="brand footerBrandMark" to="/">
              <span className="logoCutout" aria-hidden="true">
                <span className="logoBlueDot" />
                <img className="logoImg" src={logo} alt="" />
              </span>
              <span className="brandName">SeqoraVault</span>
            </Link>

            <nav className="footerNav" aria-label="Footer">
              <div className="footerCol">
                <div className="footerColTitle">Product</div>
                <ul className="footerColList">
                  <li>
                    {isHome ? (
                      <a href="#features">Features</a>
                    ) : (
                      <Link to="/#features">Features</Link>
                    )}
                  </li>
                  <li>
                    {isHome ? (
                      <a href="#vaults">Vaults</a>
                    ) : (
                      <Link to="/#vaults">Vaults</Link>
                    )}
                  </li>
                  <li>
                    <NavLink
                      to="/pricing"
                      className={({ isActive }) =>
                        isActive ? 'footerNavLink--active' : undefined
                      }
                    >
                      Pricing
                    </NavLink>
                  </li>
                  <li>
                    {isHome ? (
                      <a href="#security">Security</a>
                    ) : (
                      <Link to="/#security">Security</Link>
                    )}
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
                    <a href="/careers">Career</a>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? 'footerNavLink--active' : undefined
                      }
                    >
                      Contact
                    </NavLink>
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
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      x.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
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
            <a className="footerLegalLink" href="/terms">
              Terms
            </a>
            <span className="footerLegalSep" aria-hidden="true">
              ·
            </span>
            <a className="footerLegalLink" href="/privacy">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
