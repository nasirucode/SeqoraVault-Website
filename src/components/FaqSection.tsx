'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import './FaqSection.css'

export type FaqItem = {
  question: string
  answer: string
}

export type FaqSectionProps = {
  /** Root `id` for anchor links (e.g. `#faq`). */
  id?: string
  heading?: string
  subheading?: string
  items?: FaqItem[]
  ctaHeading?: string
  ctaSubheading?: string
  contactHref?: string
  contactLabel?: string
  /** Initially open panel index, or `null` for all closed. Default: `0`. */
  defaultOpenIndex?: number | null
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: 'What is SeqoraVault?',
    answer:
      'SeqoraVault is a secure vault for organising your assets, documents, and personal wishes in one place, and ensuring the right people can access them when it matters.',
  },
  {
    question: 'Is my data really secure?',
    answer:
      'Yes. Your information is protected with encryption and a zero-knowledge architecture, so only you can access what you store.',
  },
  {
    question: 'Who can access my vault?',
    answer:
      'You decide. You control permissions, nominees, and sharing — no one else can see your vault unless you explicitly allow it.',
  },
  {
    question: 'What is a nominee?',
    answer:
      'A nominee is someone you trust to receive access or instructions for specific assets or vaults when the time comes, according to your rules.',
  },
  {
    question: 'Can I change or remove nominee?',
    answer:
      'Yes. You can add, update, or remove nominees at any time from the app.',
  },
  {
    question: 'What happens if something happens to me?',
    answer:
      'Your inheritance process and nominees are designed so the right people can follow the steps you set up — clearly and securely.',
  },
]

export function FaqSection({
  id = 'faq',
  heading = 'Frequently Asked Questions',
  subheading = 'Quick answers to common questions about using SeqoraVault.',
  items = DEFAULT_ITEMS,
  ctaHeading = 'Still have a question?',
  ctaSubheading = 'Contact us if you have any other questions.',
  contactHref = '/contact',
  contactLabel = 'Contact Us',
  defaultOpenIndex = 0,
}: FaqSectionProps) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)
  const contactIsAppRoute =
    contactHref.startsWith('/') &&
    !contactHref.startsWith('//') &&
    !contactHref.includes('#')

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id={id} className="section sectionFaq" aria-labelledby={`${baseId}-heading`}>
      <div className="container">
        <div className="faqHead">
          <h2 id={`${baseId}-heading`} className="faqTitle">
            {heading}
          </h2>
          <p className="faqSubtitle">{subheading}</p>
        </div>

        <div className="faqList" role="list">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-trigger-${index}`

            return (
              <div key={index} className="faqItem" role="listitem">
                <h3 className="faqQuestionWrap">
                  <button
                    id={buttonId}
                    type="button"
                    className="faqTrigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faqQuestion">{item.question}</span>
                    <span className="faqChevronWrap" aria-hidden="true">
                      <ChevronDown
                        className={`faqChevron${isOpen ? ' faqChevronOpen' : ''}`}
                        size={22}
                        strokeWidth={2.2}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faqAnswerShell${isOpen ? ' faqAnswerShellOpen' : ''}`}
                >
                  <div className="faqAnswerInner">
                    <p className="faqAnswer">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="faqCta">
          <h3 className="faqCtaTitle">{ctaHeading}</h3>
          <p className="faqCtaSubtitle">{ctaSubheading}</p>
          {contactIsAppRoute ? (
            <Link className="btn btnPrimary faqCtaBtn" href={contactHref}>
              {contactLabel}
            </Link>
          ) : (
            <a className="btn btnPrimary faqCtaBtn" href={contactHref}>
              {contactLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
