import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DownloadSection } from '../components/DownloadSection'
import { FaqSection } from '../components/FaqSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { usePreloaderReady } from '../components/Preloader'
import '../App.css'
import './ContactPage.css'

export function ContactPage() {
  const ready = usePreloaderReady()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={`page contactPage ${ready ? 'page--visible' : ''}`}>
      <Header />

      <main className="contactMain" id="top">
        <section className="contactHero" aria-labelledby="contact-heading">
          <div className="contactHeroOrb contactHeroOrb--a" aria-hidden="true" />
          <div className="contactHeroOrb contactHeroOrb--b" aria-hidden="true" />
          <div className="container contactHeroInner">
            <p className="contactEyebrow">We&apos;d love to hear from you</p>
            <h1 id="contact-heading" className="contactTitle">
              Contact us
            </h1>
            <p className="contactLead">
              Questions about plans, security, or getting started? Send a message and our team
              will get back to you as soon as we can.
            </p>
          </div>
        </section>

        <section className="contactFormSection" aria-label="Contact form">
          <div className="container contactGrid">
            <div className="contactFormCard">
              {sent ? (
                <p className="contactSuccess" role="status">
                  Thanks — your message has been noted. This demo doesn&apos;t send email yet;
                  connect your form handler or chat widget for real replies.
                </p>
              ) : (
                <form className="contactFields" onSubmit={handleSubmit} noValidate>
                  <label className="contactLabel">
                    Name
                    <input
                      className="contactInput"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                    />
                  </label>
                  <label className="contactLabel">
                    Email
                    <input
                      className="contactInput"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="contactLabel">
                    Message
                    <textarea
                      className="contactTextarea"
                      name="message"
                      required
                      placeholder="How can we help?"
                      rows={5}
                    />
                  </label>
                  <button type="submit" className="contactSubmit">
                    Send message
                  </button>
                </form>
              )}
            </div>

            <aside className="contactAside">
              <div className="contactAsideBlock">
                <h2 className="contactAsideTitle">Prefer the app?</h2>
                <p className="contactAsideText">
                  Download SeqoraVault and manage your vault on the go. You can also use the chat
                  bubble on this site for quick questions.
                </p>
                <Link className="contactAsideLink" to="/#contact">
                  Get the app
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </div>
              <div className="contactAsideBlock">
                <h2 className="contactAsideTitle">Response time</h2>
                <p className="contactAsideText">
                  We aim to reply within one business day. For urgent account issues, mention it in
                  your message so we can prioritise.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <FaqSection id="faq" />

        <DownloadSection id="contact" />
      </main>

      <Footer />
    </div>
  )
}
