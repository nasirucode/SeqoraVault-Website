'use client'

import Link from 'next/link'
import { LegalPolicyLayout, type LegalSection } from '@/components/legal/LegalPolicyLayout'

export function PrivacyPolicyPage() {
  const sections: LegalSection[] = [
    {
      id: 'section-01',
      num: '01',
      title: 'Introduction',
      content: (
        <p>
          SeqoraVault is built around privacy and control. This Privacy Policy explains what
          personal data we collect when you visit our marketing site or use our services, why we use
          it, and the choices available to you.
        </p>
      ),
    },
    {
      id: 'section-02',
      num: '02',
      title: 'Who we are',
      content: (
        <p>
          For the purposes of applicable data protection law, SeqoraVault acts as the controller for
          personal data processed through our websites and products described here. Contact routes are
          listed at the end of this policy.
        </p>
      ),
    },
    {
      id: 'section-03',
      num: '03',
      title: 'Data we collect',
      content: (
        <>
          <p>Depending on how you interact with us, we may process:</p>
          <ul>
            <li>
              <strong>Visit & device data:</strong> technical logs needed to operate the site (e.g.
              IP address, browser type, timestamps).
            </li>
            <li>
              <strong>Contact details:</strong> when you submit forms or join a waiting list (name,
              email, message content).
            </li>
            <li>
              <strong>Account & vault data:</strong> when you use the product—handled under strict
              security controls and described in-product.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'section-04',
      num: '04',
      title: 'How we use data',
      content: (
        <p>
          We use personal data to provide and secure services, communicate with you, improve our
          product, comply with law, and—only where permitted—market SeqoraVault in a proportionate
          way. We do not sell your personal data.
        </p>
      ),
    },
    {
      id: 'section-05',
      num: '05',
      title: 'Legal bases (UK / EEA)',
      content: (
        <p>
          Where GDPR-style rules apply, we rely on appropriate bases such as contract, legitimate
          interests (balanced against your rights), legal obligation, or consent—for example when
          optional cookies or communications require it.
        </p>
      ),
    },
    {
      id: 'section-06',
      num: '06',
      title: 'Sharing & subprocessors',
      content: (
        <p>
          We use trusted infrastructure and service providers (for example hosting, email delivery,
          or support chat when you consent). They process data only under our instructions and
          appropriate safeguards.
        </p>
      ),
    },
    {
      id: 'section-07',
      num: '07',
      title: 'International transfers',
      content: (
        <p>
          If personal data is transferred outside your country, we apply safeguards recognised under
          applicable law—such as standard contractual clauses or adequacy decisions—unless an
          exemption applies.
        </p>
      ),
    },
    {
      id: 'section-08',
      num: '08',
      title: 'Retention',
      content: (
        <p>
          We keep personal data only as long as needed for the purposes above—including legal,
          accounting, or security requirements—and then delete or anonymise it.
        </p>
      ),
    },
    {
      id: 'section-09',
      num: '09',
      title: 'Your rights',
      content: (
        <>
          <p>
            Depending on your location, you may have rights to access, rectify, erase, restrict, or
            port your data, and to object to certain processing. You may also lodge a complaint with
            a supervisory authority.
          </p>
          <p>
            To exercise rights, contact us via our <Link href="/contact">contact page</Link>. We will
            respond within statutory timelines.
          </p>
        </>
      ),
    },
    {
      id: 'section-10',
      num: '10',
      title: 'Updates & contact',
      content: (
        <p>
          We may update this policy; material changes will be communicated as required. For privacy
          questions, use <Link href="/contact">contact</Link> or see our{' '}
          <Link href="/cookies">Cookie Policy</Link> for browser technologies on this site.
        </p>
      ),
    },
  ]

  return (
    <LegalPolicyLayout
      badge="Privacy policy"
      titleBefore="Transparency about"
      titleHighlight="your information."
      lead="We minimise what we collect, protect what we hold, and give you meaningful choices—especially where sensitive life planning data is involved."
      shortVersionHeading="What we want you to know first"
      highlights={[
        {
          icon: 'shield',
          titleLead: 'Privacy by design.',
          rest: 'Features are shaped so you—not advertisers—stay in control of highly personal information.',
        },
        {
          icon: 'ban',
          titleLead: 'No selling your data.',
          rest: 'We do not monetise personal information through data brokers or hidden ad networks.',
        },
        {
          icon: 'message',
          titleLead: 'Clear purposes.',
          rest: 'We tell you why we process data and limit use to legitimate service, legal, and agreed marketing needs.',
        },
        {
          icon: 'gear',
          titleLead: 'Strong safeguards.',
          rest: 'Technical and organisational measures—including encryption and access controls—protect information in transit and at rest.',
        },
      ]}
      sections={sections}
    />
  )
}
