'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DownloadSection } from '@/components/DownloadSection'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { usePreloaderReady } from '@/components/Preloader'
import '@/components/ContactPage.css'

type SubmitStatus = 'idle' | 'loading' | 'success'

export function ContactPage() {
  const ready = usePreloaderReady()
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const contactType = trimStr(fd.get('type'), 80)
    if (!contactType) {
      setErrorMessage('Please select an enquiry type.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: trimStr(fd.get('full_name'), 200),
          email: trimStr(fd.get('email'), 254),
          phone: trimStr(fd.get('phone'), 40) || undefined,
          message: trimStr(fd.get('message'), 12000),
          contact_type: contactType,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setErrorMessage(
          typeof data.error === 'string' && data.error.trim()
            ? data.error
            : 'We could not send your message. Please try again.',
        )
        setStatus('idle')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('idle')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrorMessage('')
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
              {status === 'success' ? (
                <div className="contactSuccessBlock">
                  <p className="contactSuccess" role="status">
                    Thanks — your message has been sent. We&apos;ll get back to you as soon as we can.
                  </p>
                  <button type="button" className="contactSubmit contactSubmit--secondary" onClick={resetForm}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contactFields" onSubmit={handleSubmit} noValidate>
                  <input
                    type="text"
                    name="company_website"
                    className="contactHoneypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  {errorMessage ? (
                    <p className="contactError" role="alert">
                      {errorMessage}
                    </p>
                  ) : null}
                  <label className="contactLabel">
                    Type
                    <select className="contactSelect" name="type" required defaultValue="waiting_list">
                      <option value="waiting_list">Join Waiting List</option>
                      <option value="general_enquiry">General Enquiry</option>
                    </select>
                  </label>
                  <label className="contactLabel">
                    Name
                    <input
                      className="contactInput"
                      name="full_name"
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
                    Phone <span className="contactOptionalMark">(optional)</span>
                    <input
                      className="contactInput"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+44 …"
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
                  <button type="submit" className="contactSubmit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending…' : 'Send message'}
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
                <Link className="contactAsideLink" href="/#contact">
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

function trimStr(v: FormDataEntryValue | null, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}
