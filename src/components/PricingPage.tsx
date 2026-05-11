'use client'

import { Check, Infinity, User, Users } from 'lucide-react'
import { DownloadSection } from '@/components/DownloadSection'
import { usePreloaderReady } from '@/components/Preloader'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const PLANS = [
  {
    key: 'personal',
    name: 'Personal',
    price: '$95.88/year',
    description: 'For individuals who want to get started.',
    highlighted: false,
    icon: User,
    features: ['6 vaults, up to 6 nominee', 'Proof of life engine'],
  },
  {
    key: 'family',
    name: 'Family',
    price: '$179.88/year',
    description: 'For a family of three (3).',
    highlighted: true,
    icon: Users,
    features: ['6 vaults, up to 6 nominee', 'Shared family access', 'Proof of life engine'],
  },
  {
    key: 'lifetime',
    name: 'Lifetime',
    price: '$199',
    description: 'For first 500 users.',
    highlighted: false,
    icon: Infinity,
    features: [
      '6 vaults, up to 6 nominee',
      'Proof of life engine',
      'One-time payment',
    ],
  },
] as const

export function PricingPage() {
  const ready = usePreloaderReady()

  return (
    <div className={`page ${ready ? 'page--visible' : ''}`}>
      <Header />

      <main className="pricingPageMain" id="top">
        <section className="section pricingSection" aria-labelledby="pricing-heading">
          <div className="container">
            <div className="pricingHead">
              <h1 id="pricing-heading" className="pricingTitle">
                Plans and pricing
              </h1>
              <p className="pricingSubtitle">
                Simple, flexible plans designed to grow with you, with payments
                handled securely through the app.
              </p>
            </div>

            <div className="pricingGrid">
              {PLANS.map((plan) => {
                const Icon = plan.icon
                return (
                  <article
                    key={plan.key}
                    className={`pricingCard${plan.highlighted ? ' pricingCard--featured' : ''}`}
                  >
                    <div className="pricingCardHeader">
                      <h2 className="pricingCardName">{plan.name}</h2>
                      <div className="pricingCardIconWrap" aria-hidden="true">
                        <Icon
                          className="pricingCardIcon"
                          size={20}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <div className="pricingCardPrice">{plan.price}</div>
                    <p className="pricingCardDesc">{plan.description}</p>
                    <div className="pricingCardDivider" role="presentation" />
                    <a
                      className={`pricingCardCta${plan.highlighted ? ' pricingCardCta--inverse' : ''}`}
                      href="#contact"
                    >
                      Start for free
                    </a>
                    <ul className="pricingCardFeatures">
                      {plan.features.map((line, i) => (
                        <li key={`${plan.key}-${i}`} className="pricingCardFeature">
                          <span className="pricingCardCheckBadge" aria-hidden="true">
                            <Check
                              className="pricingCardCheckIcon"
                              size={11}
                              strokeWidth={3}
                            />
                          </span>
                          <span className="pricingCardFeatureText">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
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
