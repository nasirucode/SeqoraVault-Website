'use client'

import Link from 'next/link'
import { LegalPolicyLayout, type LegalSection } from '@/components/legal/LegalPolicyLayout'
import { resetCookieConsentPreference } from '@/lib/cookieConsent'

export function CookiesPolicyPage() {
  const sections: LegalSection[] = [
    {
      id: 'section-01',
      num: '01',
      title: 'About this Cookie Policy',
      content: (
        <>
          <p className="legalPolicyEffective">Effective: 10 May 2026</p>
          <p>
            This Cookie Policy explains how SeqoraVault Ltd (&quot;SeqoraVault&quot;, &quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies on the website at{' '}
            <a href="https://seqoravault.co.uk">seqoravault.co.uk</a> and within the SeqoraVault mobile
            applications (together, our &quot;Services&quot;).
          </p>
          <p>
            It should be read alongside our{' '}
            <Link href="/privacy">Privacy Statement</Link>, which describes how we handle personal data
            more broadly. Where this Cookie Policy refers to specific personal-data practices, the
            Privacy Statement governs.
          </p>
          <p>
            This policy applies in the United Kingdom and Nigeria, our initial launch markets. The
            legal frameworks behind it are the UK Privacy and Electronic Communications Regulations 2003
            (PECR), UK GDPR, and the Nigeria Data Protection Act 2023.
          </p>
        </>
      ),
    },
    {
      id: 'section-02',
      num: '02',
      title: 'What is a cookie?',
      content: (
        <>
          <p>
            A cookie is a small text file placed on your device when you visit a website. Cookies let
            the site remember things about you between visits or pages — for example, that you are
            logged in or that you have already accepted the cookie banner.
          </p>
          <h3>Types of cookies</h3>
          <ul>
            <li>
              <strong>Session cookies</strong> are deleted automatically when you close your browser.
              They typically support log-in sessions or short-lived security tokens.
            </li>
            <li>
              <strong>Persistent cookies</strong> remain on your device for a set period (anything from
              hours to years), or until you delete them. They remember things across visits, like your
              language preference.
            </li>
            <li>
              <strong>First-party cookies</strong> are set by SeqoraVault directly.
            </li>
            <li>
              <strong>Third-party cookies</strong> are set by another organisation — for example a payment
              processor or a security provider — acting under our instructions.
            </li>
          </ul>
          <h3>&quot;Similar technologies&quot;</h3>
          <p>
            PECR and the ICO treat any technology that stores or accesses information on your device the
            same way as cookies. In our Services this also covers:
          </p>
          <ul>
            <li>Local storage and session storage in your browser</li>
            <li>
              Mobile SDK identifiers (e.g. push-notification tokens, crash-reporting identifiers)
            </li>
            <li>Web beacons and pixel tags (we do not currently use any)</li>
          </ul>
          <h3>In plain English</h3>
          <p>
            Cookies and similar tools aren&apos;t inherently bad — some are essential for the site to
            work. The key question is which ones you actually need, and which categories you let in by
            default. Our answer to both is: as few as possible.
          </p>
        </>
      ),
    },
    {
      id: 'section-03',
      num: '03',
      title: 'Our commitment — what we will not do',
      content: (
        <>
          <p>
            Many of our customers are choosing SeqoraVault precisely because they&apos;re uncomfortable
            with how the wider web tracks them. We&apos;ve built our cookie practices around that.
            Here&apos;s what we publicly commit to never doing on our Services:
          </p>
          <h3>Our Commitment</h3>
          <p>
            <strong>We will not, ever:</strong>
          </p>
          <ul className="legalPolicyCommitList">
            <li>
              Use third-party advertising or marketing cookies (no Meta Pixel, no Google Ads, no LinkedIn
              Insight, no TikTok Pixel)
            </li>
            <li>Run cross-site tracking, remarketing, or behavioural-advertising profiles</li>
            <li>Sell, rent, or share cookie data with data brokers or ad networks</li>
            <li>Use third-party social-media tracking widgets that load before consent</li>
            <li>Use &quot;cookie walls&quot; that block access unless you accept optional cookies</li>
            <li>Pre-tick consent boxes or default optional cookies to &quot;on&quot;</li>
          </ul>
          <p>
            If we ever needed to change any of these commitments — for instance, if our business model
            evolved — we would notify users in advance, update this policy, and re-request consent. We
            would not change this quietly.
          </p>
        </>
      ),
    },
    {
      id: 'section-04',
      num: '04',
      title: 'Cookies we use on our website',
      content: (
        <>
          <p>
            The tables below list every category of cookie we use on seqoravault.co.uk, what each is
            for, who provides it, and how long it lasts.
          </p>
          <h3>Strictly necessary</h3>
          <p>
            These cookies are essential for the website and the SeqoraVault product to function. Without
            them, the service cannot operate securely. They do not require your consent under PECR.
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Cookie / token</th>
                  <th>Purpose</th>
                  <th>Provider</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>cookie_consent</td>
                  <td>Records your cookie preferences so the banner doesn&apos;t reappear on every visit</td>
                  <td>SeqoraVault</td>
                  <td>12 months</td>
                </tr>
                <tr>
                  <td>__Host-session</td>
                  <td>Maintains your authenticated session and protects against session-fixation attacks</td>
                  <td>SeqoraVault</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>csrf_token</td>
                  <td>Protects forms and account actions from cross-site request forgery</td>
                  <td>SeqoraVault</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>Cognito ID / access tokens</td>
                  <td>Securely identifies you across the app once you&apos;ve signed in</td>
                  <td>AWS Cognito</td>
                  <td>1 hour to 30 days (refreshed)</td>
                </tr>
                <tr>
                  <td>AWSALB / AWSALBCORS</td>
                  <td>Routes your requests to the correct application server (load balancing)</td>
                  <td>Amazon Web Services</td>
                  <td>7 days</td>
                </tr>
                <tr>
                  <td>CloudFront cookies</td>
                  <td>
                    Delivers website content from the closest edge location and applies WAF protection
                  </td>
                  <td>Amazon Web Services</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>__stripe_mid / __stripe_sid</td>
                  <td>Fraud prevention during payment processing (only set when you reach a checkout flow)</td>
                  <td>Stripe Payments</td>
                  <td>1 year / 30 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Functional preferences</h3>
          <p>
            These store your preferences so the site behaves the way you expect it to. They&apos;re not
            strictly required but are not used to track you.
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Provider</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>theme</td>
                  <td>Remembers your light/dark mode preference</td>
                  <td>SeqoraVault</td>
                  <td>12 months</td>
                </tr>
                <tr>
                  <td>language</td>
                  <td>Remembers your chosen language</td>
                  <td>SeqoraVault</td>
                  <td>12 months</td>
                </tr>
                <tr>
                  <td>region</td>
                  <td>Remembers your country (UK or Nigeria) for content localisation</td>
                  <td>SeqoraVault</td>
                  <td>12 months</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Performance &amp; error monitoring (optional)</h3>
          <p>
            These help us spot bugs and crashes so we can fix them quickly. They only run after you
            consent.
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Cookie / identifier</th>
                  <th>Purpose</th>
                  <th>Provider</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sentry session ID</td>
                  <td>
                    Identifies the session that produced an error report so engineers can reproduce and fix
                    bugs
                  </td>
                  <td>Functional Software, Inc. (Sentry)</td>
                  <td>30 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Analytics (optional)</h3>
          <p>
            We use Plausible Analytics, a privacy-first analytics tool. Plausible doesn&apos;t use
            traditional persistent cookies and doesn&apos;t track you across sites. It generates
            anonymous, aggregated statistics about page views — no personal profile is created.
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Identifier</th>
                  <th>Purpose</th>
                  <th>Provider</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily anonymous hash</td>
                  <td>Aggregated, non-identifying counts of unique daily visitors and page views</td>
                  <td>Plausible Insights OÜ</td>
                  <td>24 hours (rotates daily)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      id: 'section-05',
      num: '05',
      title: 'Similar technologies in our mobile apps',
      content: (
        <>
          <p>
            Our iOS and Android apps don&apos;t use browser cookies, but they do use functionally
            equivalent technologies that PECR and UK GDPR treat the same way. Here&apos;s the full list:
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Identifier / SDK</th>
                  <th>Purpose</th>
                  <th>Provider</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Push notification token (APNs / FCM)</td>
                  <td>
                    Delivers heartbeat reminders, security alerts, and release-workflow notifications
                  </td>
                  <td>Apple / Google</td>
                  <td>Essential when enabled</td>
                </tr>
                <tr>
                  <td>Authentication tokens (secure storage)</td>
                  <td>Maintains your signed-in state on the device</td>
                  <td>AWS Cognito</td>
                  <td>Essential</td>
                </tr>
                <tr>
                  <td>Sentry React Native SDK</td>
                  <td>Crash and error reporting to help us fix app bugs</td>
                  <td>Functional Software, Inc.</td>
                  <td>Optional</td>
                </tr>
                <tr>
                  <td>Plausible mobile beacon</td>
                  <td>Anonymous, aggregated usage analytics for the app</td>
                  <td>Plausible Insights OÜ</td>
                  <td>Optional</td>
                </tr>
                <tr>
                  <td>IDFA / Android Advertising ID</td>
                  <td>Mobile advertising identifier</td>
                  <td>—</td>
                  <td>Not collected</td>
                </tr>
                <tr>
                  <td>Meta / Google Ads SDKs</td>
                  <td>Ad attribution and conversion tracking</td>
                  <td>—</td>
                  <td>Not used</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>In plain English</h3>
          <p>
            We deliberately don&apos;t collect mobile advertising identifiers (IDFA on iOS, AAID on
            Android). When the app first launches, you&apos;ll be asked to set permissions for push
            notifications and crash reporting separately — you can change them at any time in your device
            settings.
          </p>
        </>
      ),
    },
    {
      id: 'section-06',
      num: '06',
      title: 'Third-party processors',
      content: (
        <>
          <p>
            A small number of providers help us deliver the Services. They act as data processors on our
            behalf, under written agreements that bind them to UK GDPR / NDPA standards.
          </p>
          <div className="legalPolicyTableWrap">
            <table className="legalPolicyTable">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>What they do</th>
                  <th>Where data is processed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Amazon Web Services</td>
                  <td>
                    Hosting, content delivery (CloudFront), web application firewall, authentication
                    (Cognito)
                  </td>
                  <td>United Kingdom (eu-west-2) primary; EU regions for failover</td>
                </tr>
                <tr>
                  <td>Stripe Payments Europe Ltd</td>
                  <td>Payment processing and fraud prevention</td>
                  <td>Ireland and United States (under EU SCCs)</td>
                </tr>
                <tr>
                  <td>Functional Software, Inc. (Sentry)</td>
                  <td>Error and crash monitoring</td>
                  <td>United States (under SCCs / UK IDTA)</td>
                </tr>
                <tr>
                  <td>Plausible Insights OÜ</td>
                  <td>Privacy-first website analytics</td>
                  <td>European Union (Estonia)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Where any provider transfers data outside the UK, we use the UK International Data Transfer
            Agreement (IDTA), the UK Addendum to the EU Standard Contractual Clauses, or NDPC SCCs as
            appropriate. Full details are in our <Link href="/privacy">Privacy Statement</Link>.
          </p>
        </>
      ),
    },
    {
      id: 'section-07',
      num: '07',
      title: 'How we get your consent',
      content: (
        <>
          <p>
            When you first visit seqoravault.co.uk you&apos;ll see a cookie banner with three options:
          </p>
          <ul>
            <li>
              <strong>Accept all</strong> — enables strictly necessary, functional, performance and
              analytics cookies.
            </li>
            <li>
              <strong>Reject optional</strong> — leaves only strictly necessary and functional cookies in
              place. The site will work normally.
            </li>
            <li>
              <strong>Manage preferences</strong> — lets you turn individual categories on or off.
            </li>
          </ul>
          <p>
            No optional cookies run before you make a choice. You can revisit your preferences at any time
            using the &quot;Cookie settings&quot; control in the website footer (or the button below).
          </p>
          <h3>In plain English</h3>
          <p>
            Withdrawing consent is just as easy as giving it. Open the cookie settings, switch off what
            you no longer want, and the corresponding cookies are deleted on your next page load.
          </p>
        </>
      ),
    },
    {
      id: 'section-08',
      num: '08',
      title: 'How to manage cookies in your browser',
      content: (
        <>
          <p>
            Beyond our own cookie banner, you can manage or delete cookies directly through your browser.
            Most browsers also let you block all cookies, though this may break sites that rely on
            essential cookies.
          </p>
          <ul>
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
            </li>
            <li>
              <strong>Safari:</strong> Settings → Privacy
            </li>
            <li>
              <strong>Firefox:</strong> Settings → Privacy &amp; Security
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions
            </li>
          </ul>
          <p>
            We also honour the Global Privacy Control (GPC) signal. If your browser sends a GPC signal,
            we treat it as a withdrawal of consent for optional cookies.
          </p>
          <p>
            For an independent guide to cookies and how to manage them, the ICO maintains useful guidance
            at{' '}
            <a href="https://ico.org.uk/for-the-public/your-data-matters/online/">
              ico.org.uk/for-the-public/your-data-matters/online/
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'section-09',
      num: '09',
      title: 'Changes to this Cookie Policy',
      content: (
        <>
          <p>
            We&apos;ll update this policy whenever we change which cookies we use — for example, if we
            add a new processor or remove an existing one. The &quot;Effective&quot; date at the top will
            reflect the most recent revision.
          </p>
          <p>
            For any material change — such as adding a new category of cookie or a new third-party
            provider — we&apos;ll notify you and re-request consent before the change takes effect.
          </p>
          <p>
            Questions? Reach us via our <Link href="/contact">contact page</Link>.
          </p>
          <button type="button" className="legalPolicyResetBtn" onClick={() => resetCookieConsentPreference()}>
            Open cookie preferences again
          </button>
          <p>
            After resetting, choose Accept all, Reject optional, or Manage preferences when the banner
            appears.
          </p>
        </>
      ),
    },
  ]

  return (
    <LegalPolicyLayout
      badge="Cookie policy"
      titleBefore="Cookies, kept"
      titleHighlight="deliberately short."
      lead="SeqoraVault Ltd operates in the UK and Nigeria under PECR, UK GDPR, and the Nigeria Data Protection Act 2023. This page explains every cookie and similar technology we use—and what we refuse to use."
      shortVersionHeading="What we want you to know first"
      highlights={[
        {
          icon: 'message',
          titleLead: 'We are cookie-light by design.',
          rest: 'Only what the Services need to function securely, remember real preferences, and—if you opt in—diagnostics and privacy-first analytics.',
        },
        {
          icon: 'ban',
          titleLead: 'Zero advertising or marketing cookies.',
          rest: 'No Meta Pixel, Google Ads, LinkedIn Insight, TikTok Pixel, or cross-site remarketing—ever.',
        },
        {
          icon: 'shield',
          titleLead: 'Essentials stay on.',
          rest: 'Strictly necessary cookies operate without consent under PECR; functional preferences keep the experience predictable.',
        },
        {
          icon: 'gear',
          titleLead: 'Everything else is optional.',
          rest: 'Performance and analytics load only after you enable them. Support chat is on by default — you can switch it off in cookie preferences.',
        },
      ]}
      sections={sections}
    />
  )
}
