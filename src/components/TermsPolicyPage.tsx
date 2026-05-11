'use client'

import Link from 'next/link'
import { LegalPolicyLayout, type LegalSection } from '@/components/legal/LegalPolicyLayout'

export function TermsPolicyPage() {
  const sections: LegalSection[] = [
    {
      id: 'section-01',
      num: '01',
      title: 'Agreement to these terms',
      content: (
        <p>
          By accessing or using SeqoraVault websites, products, or services, you agree to these
          Terms of Service and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree,
          do not use our services.
        </p>
      ),
    },
    {
      id: 'section-02',
      num: '02',
      title: 'About SeqoraVault',
      content: (
        <p>
          SeqoraVault provides tools to organise and protect sensitive personal information—such as
          finances, property records, documents, and wishes—according to the capabilities described on
          our marketing site and in-product documentation. Features may change as we improve the
          product.
        </p>
      ),
    },
    {
      id: 'section-03',
      num: '03',
      title: 'Accounts & eligibility',
      content: (
        <>
          <p>
            You must provide accurate registration information and safeguard your credentials. You are
            responsible for activity that occurs under your account unless you notify us of
            unauthorised use through channels we provide.
          </p>
          <p>You must be legally able to enter a binding contract to use paid or restricted areas.</p>
        </>
      ),
    },
    {
      id: 'section-04',
      num: '04',
      title: 'Acceptable use',
      content: (
        <>
          <p>You agree not to misuse SeqoraVault—for example by attempting to:</p>
          <ul>
            <li>probe, scan, or test vulnerabilities without authorisation;</li>
            <li>overload or disrupt infrastructure;</li>
            <li>reverse engineer except where permitted by law;</li>
            <li>upload unlawful content or violate third-party rights.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'section-05',
      num: '05',
      title: 'Intellectual property',
      content: (
        <p>
          SeqoraVault branding, software, documentation, and marketing materials are protected by
          intellectual property laws. Subject to your licence to use the service, we retain all
          rights not expressly granted.
        </p>
      ),
    },
    {
      id: 'section-06',
      num: '06',
      title: 'Disclaimers',
      content: (
        <p>
          Services are provided “as available”. To the maximum extent permitted by law, we disclaim
          implied warranties (such as merchantability or fitness for a particular purpose) except
          where non-waivable rights apply.
        </p>
      ),
    },
    {
      id: 'section-07',
      num: '07',
      title: 'Limitation of liability',
      content: (
        <p>
          Nothing in these terms excludes liability that cannot legally be excluded. Otherwise, our
          aggregate liability arising from these terms or your use of the marketing site is limited
          to the greater of amounts you paid us in the twelve months before the claim or fifty
          pounds (GBP £50), unless a different cap applies under mandatory consumer law.
        </p>
      ),
    },
    {
      id: 'section-08',
      num: '08',
      title: 'Termination',
      content: (
        <p>
          You may stop using our services at any time. We may suspend or terminate access where we
          reasonably believe there is a breach of law or these terms, risk to users, or technical
          necessity—giving notice where appropriate.
        </p>
      ),
    },
    {
      id: 'section-09',
      num: '09',
      title: 'Governing law',
      content: (
        <p>
          These terms are governed by the laws of England and Wales, subject to mandatory protections
          where you reside as a consumer. Courts of England and Wales have exclusive jurisdiction,
          unless applicable law requires otherwise.
        </p>
      ),
    },
    {
      id: 'section-10',
      num: '10',
      title: 'Contact',
      content: (
        <p>
          Questions about these terms? Visit our <Link href="/contact">contact page</Link>.
        </p>
      ),
    },
  ]

  return (
    <LegalPolicyLayout
      badge="Terms of service"
      titleBefore="Clear terms for a"
      titleHighlight="secure relationship."
      lead="These Terms of Service govern your use of SeqoraVault’s public websites and set expectations before you create an account or subscribe—fair rules for you and for us."
      shortVersionHeading="What matters before you dive in"
      highlights={[
        {
          icon: 'message',
          titleLead: 'Plain-language commitments.',
          rest: 'We describe what you can expect from our services and what we ask from you in return—without burying material terms.',
        },
        {
          icon: 'ban',
          titleLead: 'No sneaky licence grabs.',
          rest: 'You keep ownership of content you submit; we receive only the rights needed to operate and improve the service.',
        },
        {
          icon: 'shield',
          titleLead: 'Security & misuse.',
          rest: 'We outline acceptable use so everyone’s data stays safer—and bad actors don’t degrade the platform.',
        },
        {
          icon: 'gear',
          titleLead: 'Evolution with notice.',
          rest: 'Products evolve; when terms change materially we’ll tell you through sensible channels so you can review updates.',
        },
      ]}
      sections={sections}
    />
  )
}
