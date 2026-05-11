'use client'

import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { Loader2, X } from 'lucide-react'

export type CareerApplyModalProps = {
  jobOpeningId: string
  jobTitle: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function CareerApplyModal({ jobOpeningId, jobTitle }: CareerApplyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const onClose = () => {
      setOpen(false)
      setStatus('idle')
      setErrorMessage(null)
    }
    el.addEventListener('close', onClose)
    return () => el.removeEventListener('close', onClose)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setStatus('submitting')

    const form = e.currentTarget
    const fd = new FormData(form)

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  const close = () => {
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        type="button"
        className="careerDetailApplyBtn"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="career-apply-dialog"
      >
        Apply for this role
      </button>

      <dialog
        id="career-apply-dialog"
        ref={dialogRef}
        className="careerApplyDialog"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div className="careerApplyDialogPanel">
          <header className="careerApplyDialogHeader">
            <div>
              <h2 id={titleId} className="careerApplyDialogTitle">
                Apply
              </h2>
              <p id={descId} className="careerApplyDialogSubtitle">
                {jobTitle}
              </p>
            </div>
            <button
              type="button"
              className="careerApplyDialogClose"
              onClick={close}
              aria-label="Close application form"
            >
              <X size={20} strokeWidth={2.2} aria-hidden />
            </button>
          </header>

          {status === 'success' ? (
            <div className="careerApplySuccess" role="status">
              <p className="careerApplySuccessTitle">Application received</p>
              <p className="careerApplySuccessText">
                Thank you — we&apos;ll review your details and be in touch if there&apos;s a match.
              </p>
              <button type="button" className="careerDetailApplyBtn careerApplyDialogDone" onClick={close}>
                Close
              </button>
            </div>
          ) : (
            <form className="careerApplyForm" onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="job_opening" value={jobOpeningId} />

              <label className="careerApplyLabel careerApplyLabel--hp" aria-hidden="true">
                Company website
                <input
                  className="careerApplyInput"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <label className="careerApplyLabel">
                Full name
                <input
                  className="careerApplyInput"
                  name="applicant_name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  disabled={status === 'submitting'}
                />
              </label>

              <label className="careerApplyLabel">
                Email
                <input
                  className="careerApplyInput"
                  name="email_id"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={status === 'submitting'}
                />
              </label>

              <label className="careerApplyLabel">
                Phone <span className="careerApplyOptional">(optional)</span>
                <input
                  className="careerApplyInput"
                  name="phone_number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+44 …"
                  disabled={status === 'submitting'}
                />
              </label>

              <label className="careerApplyLabel">
                Cover note <span className="careerApplyOptional">(optional)</span>
                <textarea
                  className="careerApplyTextarea"
                  name="cover_letter"
                  rows={4}
                  placeholder="A few lines on why you’re interested in this role…"
                  disabled={status === 'submitting'}
                />
              </label>

              <label className="careerApplyLabel">
                Resume <span className="careerApplyOptional">(optional)</span>
                <input
                  className="careerApplyFile"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  disabled={status === 'submitting'}
                />
                <span className="careerApplyHint">PDF or Word, up to 3 MB.</span>
              </label>

              {errorMessage ? (
                <p className="careerApplyError" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="careerApplyActions">
                <button
                  type="button"
                  className="careerApplySecondary"
                  onClick={close}
                  disabled={status === 'submitting'}
                >
                  Cancel
                </button>
                <button type="submit" className="careerDetailApplyBtn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="careerApplySpinner" size={18} aria-hidden />
                      Submitting…
                    </>
                  ) : (
                    'Submit application'
                  )}
                </button>
              </div>

              <p className="careerApplyFooterNote">
                Prefer email? You can still reach us via{' '}
                <Link href="/contact" onClick={close}>
                  contact
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  )
}
