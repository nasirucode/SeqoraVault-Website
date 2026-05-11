'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Ban, Cog, MessageCircle, Shield } from 'lucide-react'
import { usePreloaderReady } from '@/components/Preloader'
import logo from '@/assets/seqoravault-logo.png'
import '@/components/legal/LegalPolicyPages.css'

const iconMap = {
  message: MessageCircle,
  ban: Ban,
  shield: Shield,
  gear: Cog,
} as const

export type LegalHighlight = {
  icon: keyof typeof iconMap
  /** Bold lead sentence (rendered in <strong>) */
  titleLead: string
  rest: string
}

export type LegalSection = {
  id: string
  /** e.g. "01" */
  num: string
  title: string
  content: ReactNode
}

export type LegalPolicyLayoutProps = {
  badge: string
  /** First part of title (white) */
  titleBefore: string
  /** Gold italic part */
  titleHighlight: string
  lead: string
  shortVersionLabel?: string
  shortVersionHeading: string
  highlights: LegalHighlight[]
  sections: LegalSection[]
  /** "Section" label prefix in meta line */
  sectionLabel?: string
}

export function LegalPolicyLayout({
  badge,
  titleBefore,
  titleHighlight,
  lead,
  shortVersionLabel = 'The short version',
  shortVersionHeading,
  highlights,
  sections,
  sectionLabel = 'Section',
}: LegalPolicyLayoutProps) {
  const ready = usePreloaderReady()
  const logoSrc = typeof logo === 'string' ? logo : logo.src

  return (
    <div className={`legalPolicyPage ${ready ? 'page--visible' : ''}`}>
      <header className="legalPolicyBar">
        <div className="container legalPolicyBarInner">
          <Link className="legalPolicyBrand" href="/">
            <span className="logoCutout" aria-hidden="true">
              <span className="logoBlueDot" />
              <img className="logoImg" src={logoSrc} alt="" width={24} height={24} />
            </span>
            <span>SeqoraVault</span>
          </Link>
          <Link className="legalPolicyBackLink" href="/">
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="legalPolicyHero" aria-labelledby="legal-hero-title">
        <div className="container legalPolicyHeroInner">
          <p className="legalPolicyBadge">
            <span className="legalPolicyBadgeDot" aria-hidden="true" />
            {badge}
          </p>
          <h1 id="legal-hero-title" className="legalPolicyTitle">
            {titleBefore}{' '}
            <span className="legalPolicyTitleAccent">{titleHighlight}</span>
          </h1>
          <p className="legalPolicyLead">{lead}</p>
        </div>
      </section>

      <div className="legalPolicySummaryWrap">
        <div className="legalPolicySummaryCard">
          <p className="legalPolicyShortLabel">{shortVersionLabel}</p>
          <h2 className="legalPolicyShortHeading">{shortVersionHeading}</h2>
          <div className="legalPolicyGrid">
            {highlights.map((h, index) => {
              const Icon = iconMap[h.icon]
              return (
                <div key={`${h.icon}-${index}`} className="legalPolicyHighlight">
                  <div className="legalPolicyHighlightIcon" aria-hidden="true">
                    <Icon />
                  </div>
                  <p className="legalPolicyHighlightText">
                    <strong>{h.titleLead}</strong> {h.rest}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="legalPolicyMainBg">
        <div className="container legalPolicyMainInner">
          <nav className="legalPolicyToc" aria-label="Table of contents">
            <p className="legalPolicyTocTitle">Contents</p>
            <hr className="legalPolicyTocRule" />
            <ul className="legalPolicyTocList">
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="legalPolicyTocLink" href={`#${s.id}`}>
                    <span className="legalPolicyTocNum">{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="legalPolicyArticle">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="legalPolicySection">
                <p className="legalPolicySectionMeta">
                  {sectionLabel} {s.num}
                </p>
                <h2>{s.title}</h2>
                {s.content}
              </section>
            ))}
          </article>
        </div>
      </div>

      <footer className="legalPolicyMinimalFooter">
        <span>© {new Date().getFullYear()} SeqoraVault</span>
        <span className="legalPolicyMinimalFooterSep">·</span>
        <Link href="/terms">Terms</Link>
        <span className="legalPolicyMinimalFooterSep">·</span>
        <Link href="/privacy">Privacy</Link>
        <span className="legalPolicyMinimalFooterSep">·</span>
        <Link href="/cookies">Cookies</Link>
        <span className="legalPolicyMinimalFooterSep">·</span>
        <Link href="/contact">Contact</Link>
      </footer>
    </div>
  )
}
