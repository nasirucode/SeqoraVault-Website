import { useEffect, useState } from 'react'
import { DownloadSection } from '../components/DownloadSection'
import { usePreloaderReady } from '../components/Preloader'
import { FaqSection } from '../components/FaqSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import '../App.css'
import laurel1 from '../assets/laurel-1.png'
import laurelRight from '../assets/laurel-right.png'
import shieldCheck from '../assets/shield-check.png'
import shieldLock from '../assets/shield-lock.png'
import appleIcon from '../assets/icon-apple.png'
import playIcon from '../assets/icon-play.png'
import legacyShadow from '../assets/legacy-shadow.png'
import dotsSquare from '../assets/dots-square.png'
import vaultSectionBg from '../assets/vault-section-bg.png'
import vaultSlideFinancial from '../assets/vault-financial.svg'
import vaultSlideRealestate from '../assets/vault-slide-realestate.svg'
import vaultSlideWishes from '../assets/vault-slide-wishes.svg'
import vaultSlideIdentity from '../assets/vault-slide-identity.svg'
import vaultSlideHealth from '../assets/vault-slide-health.svg'
import vaultSlideBusiness from '../assets/vault-slide-business.svg'
import securityVisualEncryption from '../assets/security-visual-encryption.png'
import securityVisualZeroKnowledge from '../assets/security-visual-zero-knowledge.png'
import securityVisualNoPasswords from '../assets/security-visual-no-passwords.png'
import {
  BedDouble,
  ChevronRight,
  Lock,
  Plus,
  Sprout,
  User,
} from 'lucide-react'

const VAULT_SLIDES = [
  {
    key: 'financial',
    label: '01',
    title: 'Financial assets',
    image: vaultSlideFinancial,
  },
  {
    key: 'realestate',
    label: '02',
    title: 'Real estate',
    image: vaultSlideRealestate,
  },
  {
    key: 'wishes',
    label: '03',
    title: 'Personal wishes',
    image: vaultSlideWishes,
  },
  {
    key: 'identity',
    label: '04',
    title: 'Digital Identity',
    image: vaultSlideIdentity,
  },
  {
    key: 'health',
    label: '05',
    title: 'Health & Medical',
    image: vaultSlideHealth,
  },
  {
    key: 'business',
    label: '06',
    title: 'Business & Professional',
    image: vaultSlideBusiness,
  },
] as const

const VAULT_AUTO_ADVANCE_MS = 5000

export function LandingPage() {
  const ready = usePreloaderReady()
  const [vaultStep, setVaultStep] = useState(0)

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const clearVaultInterval = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId)
        intervalId = null
      }
    }

    const startVaultInterval = () => {
      clearVaultInterval()
      intervalId = window.setInterval(() => {
        setVaultStep((s) => (s + 1) % VAULT_SLIDES.length)
      }, VAULT_AUTO_ADVANCE_MS)
    }

    const onVisibility = () => {
      if (document.hidden) clearVaultInterval()
      else startVaultInterval()
    }

    if (!document.hidden) startVaultInterval()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearVaultInterval()
    }
  }, [vaultStep])

  return (
    <div className={`page ${ready ? 'page--visible' : ''}`}>
      <Header />

      <main id="top">
        <section className="hero">
          <div className="container heroStack">
            <h1 className="heroTitle">
              Everything that matters. Organized,
              <br />
              protected, and ready, when it
              <br />
              counts
            </h1>
            <p className="heroSubtitle">
              SeqoraVault helps you securely manage your finances, property,
              documents, and personal wishes — and ensures the right people can
              access them when it matters most.
            </p>

            <a className="storeBtn" href="#contact">
              <span className="storeIcons" aria-hidden="true">
                <img className="storeIcon" src={appleIcon} alt="" />
                <img className="storeIcon storeIconPlay" src={playIcon} alt="" />
              </span>
              <span className="storeText">Download app</span>
            </a>

            <div className="heroAwards" aria-label="Trust badges">
              <div className="award">
                <div className="awardIcon" aria-hidden="true">
                  <img className="awardLaurel awardLaurelLeft" src={laurel1} alt="" />
                  <div className="awardCenter">
                    <img className="awardShield" src={shieldCheck} alt="" />
                    <div className="awardText">
                      Zero-knowledge
                      <br />
                      architecture
                    </div>
                  </div>
                  <img
                    className="awardLaurel awardLaurelRight"
                    src={laurelRight}
                    alt=""
                  />
                </div>
              </div>
              <div className="award">
                <div className="awardIcon" aria-hidden="true">
                  <img className="awardLaurel awardLaurelLeft" src={laurel1} alt="" />
                  <div className="awardCenter">
                    <img className="awardShield" src={shieldLock} alt="" />
                    <div className="awardText">
                      Security-first
                      <br />
                      platform
                    </div>
                  </div>
                  <img
                    className="awardLaurel awardLaurelRight"
                    src={laurelRight}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="legacySection">
          <div className="container">
            <div className="legacyGrid">
              <div className="legacyCard">
                <div className="legacyBg" aria-hidden="true">
                  <div className="legacyRing legacyRingLeft" />
                  <div className="legacyRing legacyRingRight" />
                </div>
                <div className="legacyCardTop">
                  <h3 className="legacyTitle">
                    Don&apos;t leave a mess,
                    <br />
                    Leave a legacy
                  </h3>
                  <p className="legacyBody">
                    What you leave behind shouldn&apos;t create questions. It
                    should bring clarity, direction, and peace of mind.
                  </p>
                </div>

                <div className="legacyCardBottom">
                  <div className="legacyDotsBadge" aria-hidden="true">
                    <img className="legacyDots" src={dotsSquare} alt="" />
                  </div>
                </div>
              </div>

              <div className="legacyImageCard" aria-hidden="true">
                <img className="legacyImage" src={legacyShadow} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section sectionFeatures">
          <div className="container">
            <div className="sectionHead sectionHeadFeatures">
              <h2 className="sectionTitle">
                Everything you need to organise, manage, and pass on your
                assets
              </h2>
              <p className="sectionSubtitle">
                Easily manage your assets, keep track of what matters most, and
                ensure everything is properly organised and prepared for the
                future.
              </p>
            </div>

            <div className="featuresGrid">
              <article className="featCard featCardTemplates">
                <h3 className="featCardTitle">Asset templates</h3>
                <p className="featCardDesc">
                  Pre-structured templates that makes it easy to add and organise
                  different types of assets without starting from scratch.
                </p>
                <div className="featMockStack">
                  <div className="featPill">
                    <span
                      className="featPillIcon featPillIconGreen"
                      aria-hidden
                    >
                      <Lock size={15} strokeWidth={2.4} />
                    </span>
                    <span className="featPillText">Cryptocurrency wallet</span>
                  </div>
                  <div className="featPill">
                    <span className="featPillIcon featPillIconBlue" aria-hidden>
                      <BedDouble size={15} strokeWidth={2.4} />
                    </span>
                    <span className="featPillText">Pension &amp; retirement</span>
                  </div>
                  <div className="featPill">
                    <span
                      className="featPillIcon featPillIconGreen2"
                      aria-hidden
                    >
                      <Sprout size={15} strokeWidth={2.4} />
                    </span>
                    <span className="featPillText">Investment portfolios</span>
                  </div>
                </div>
              </article>

              <article className="featCard featCardCheckins">
                <h3 className="featCardTitle">Proof of life check-ins</h3>
                <p className="featCardDesc">
                  Periodic check-ins confirm you&apos;re active — so your vault
                  only transitions when it truly needs to.
                </p>
                <div className="featGlass featCheckinPanel">
                  <div className="featCheckinStatus">
                    <span className="featDotLive" aria-hidden />
                    <span>Next check-in: 30, January, 2026</span>
                  </div>
                  <div className="featBars" aria-hidden>
                    {[
                      10, 18, 7, 22, 12, 26, 9, 20, 14, 24, 11, 28, 8, 19, 16,
                      25, 13, 21, 9, 17, 12, 23, 10, 20,
                    ].map((h, i) => (
                      <span key={i} className="featBar" style={{ height: h }} />
                    ))}
                  </div>
                  <div className="featCheckinFooter">
                    <span>Check-in interval</span>
                    <span className="featCheckinInterval">
                      90 days <ChevronRight size={14} strokeWidth={2.6} />
                    </span>
                  </div>
                </div>
              </article>

              <article className="featCard featCardNominees">
                <h3 className="featCardTitle">Nominee management</h3>
                <p className="featCardDesc">
                  Assign, update, or remove nominees at any time, so the right
                  people are always linked to the right assets.
                </p>
                <div className="featMockStack featNomineeStack">
                  <div className="featNomineeRow">
                    <span className="featNomineeIcon" aria-hidden>
                      <User size={16} strokeWidth={2.4} />
                    </span>
                    <div className="featNomineeText">
                      <div className="featNomineeName">Thomas James</div>
                      <div className="featNomineeMeta">1 vault</div>
                    </div>
                    <span className="featRadio" aria-hidden />
                  </div>
                  <div className="featNomineeRow">
                    <span className="featNomineeIcon" aria-hidden>
                      <User size={16} strokeWidth={2.4} />
                    </span>
                    <div className="featNomineeText">
                      <div className="featNomineeName">Sandra Freya</div>
                      <div className="featNomineeMeta">1 vault</div>
                    </div>
                    <span className="featRadio" aria-hidden />
                  </div>
                </div>
              </article>

              <article className="featCard featCardOverview">
                <h3 className="featCardTitle">Asset overview</h3>
                <p className="featCardDesc">
                  Get a clear, organised view of everything you&apos;ve added —
                  all in one place, easy to understand at a glance.
                </p>
                <div className="featGlass featOverviewPanel">
                  <div className="featOverviewTop">
                    <div>
                      <div className="featOverviewLabel">Assets</div>
                      <div className="featOverviewValue">12</div>
                    </div>
                    <div>
                      <div className="featOverviewLabel">Nominee</div>
                      <div className="featOverviewName">John Thomas</div>
                    </div>
                  </div>
                  <div className="featOverviewActions">
                    <button type="button" className="featChipBtn">
                      <Plus size={14} strokeWidth={2.6} /> Add nominee
                    </button>
                    <button type="button" className="featChipBtn">
                      <Plus size={14} strokeWidth={2.6} /> Add asset
                    </button>
                  </div>
                </div>
              </article>

              <article className="featCard featCardInherit">
                <h3 className="featCardTitle">Clear inheritance process</h3>
                <p className="featCardDesc">
                  A structured process that ensures your assets are passed on
                  exactly as intended
                </p>
                <div className="featGlass featTimelinePanel">
                  <ol className="featTimeline">
                    <li className="featTimelineStep">
                      <span className="featTimelineDot featDotRed" />
                      <span>Death confirmation</span>
                    </li>
                    <li className="featTimelineStep">
                      <span className="featTimelineDot featDotGold" />
                      <span>Nominee verification</span>
                    </li>
                    <li className="featTimelineStep">
                      <span className="featTimelineDot featDotGreen" />
                      <span>Assets transfer</span>
                    </li>
                  </ol>
                </div>
              </article>

              <article className="featCard featCardMore">
                <h3 className="featCardTitle featCardTitleDark">
                  Plus more features, built around you
                </h3>
                <p className="featCardDesc featCardDescDark">
                  AI assistance, identity verification, and enhanced security
                  measures work together to give you full confidence in how
                  everything is managed.
                </p>
                <div className="featMoreGlyph" aria-hidden>
                  <span className="featMoreCircle" />
                  <div className="featMoreRow">
                    <span className="featMoreCircle" />
                    <span className="featMoreCircle" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="vaults" className="section sectionVaults">
          <div
            className="vaultSectionGrain"
            style={{ backgroundImage: `url(${vaultSectionBg})` }}
            aria-hidden="true"
          />
          <div className="container">
            <div className="sectionHead sectionHeadVaults">
              <h2 className="sectionTitle">All the assets categories you need</h2>
              <p className="sectionSubtitle">
                Get started in minutes. Secure your assets, organise everything,
                and stay in control, wherever you are.
              </p>
            </div>

            <div
              className="vaultStepper"
              role="tablist"
              aria-label="Vault categories"
            >
              {VAULT_SLIDES.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  role="tab"
                  id={`vault-tab-${slide.key}`}
                  aria-selected={vaultStep === index}
                  aria-controls="vault-panel"
                  className={
                    vaultStep === index ? 'vaultStep vaultStepActive' : 'vaultStep'
                  }
                  onClick={() => setVaultStep(index)}
                >
                  <span className="vaultStepLabel">{slide.label}</span>
                  <span className="srOnly">{slide.title}</span>
                </button>
              ))}
            </div>

            <div
              id="vault-panel"
              role="tabpanel"
              aria-live="polite"
              aria-labelledby={`vault-tab-${VAULT_SLIDES[vaultStep].key}`}
              className="vaultShowcase"
            >
              <div className="vaultShowcaseInner">
                {VAULT_SLIDES.map((slide, index) => (
                  <img
                    key={slide.key}
                    className={
                      vaultStep === index
                        ? 'vaultShowcaseImg vaultShowcaseImgActive'
                        : 'vaultShowcaseImg'
                    }
                    src={slide.image}
                    alt={vaultStep === index ? slide.title : ''}
                    aria-hidden={vaultStep !== index}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="section sectionSecurity">
          <div className="container">
            <div className="securityIntro">
              <h2 className="securityHeading">
                A complete security system designed to keep your data private
                and under your control
              </h2>
              <p className="securityLead">
                We&apos;ve built in multiple layers of protection so your
                information stays secure, accessible only to you, and fully
                traceable when needed.
              </p>
            </div>

            <div className="securityCards">
              <article className="securityCard">
                <div className="securityCardVisual">
                  <img
                    className="securityCardArt"
                    src={securityVisualEncryption}
                    alt=""
                    width={856}
                    height={992}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="securityCardText">
                  <h3 className="securityCardTitle">End-to-end encryption</h3>
                  <p className="securityCardBody">
                    Your data is encrypted on your device before it&apos;s ever
                    stored — so no one else can read it.
                  </p>
                </div>
              </article>

              <article className="securityCard">
                <div className="securityCardVisual">
                  <img
                    className="securityCardArt"
                    src={securityVisualZeroKnowledge}
                    alt=""
                    width={856}
                    height={972}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="securityCardText">
                  <h3 className="securityCardTitle">
                    Zero-knowledge architecture
                  </h3>
                  <p className="securityCardBody">
                    Only you can access your vault. SeqoraVault has no
                    visibility into your data, not even behind the scenes.
                  </p>
                </div>
              </article>

              <article className="securityCard">
                <div className="securityCardVisual">
                  <img
                    className="securityCardArt"
                    src={securityVisualNoPasswords}
                    alt=""
                    width={856}
                    height={972}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="securityCardText">
                  <h3 className="securityCardTitle">No-passwords stored</h3>
                  <p className="securityCardBody">
                    We don&apos;t store your passwords. Sensitive access details
                    stay with you, not on our servers.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <FaqSection id="faq" />

        <DownloadSection id="contact" />
      </main>

      <Footer />
    </div>
  )
}
