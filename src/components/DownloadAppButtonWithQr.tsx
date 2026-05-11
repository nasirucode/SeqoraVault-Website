'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { DownloadQrPanel } from '@/components/DownloadQrPanel'
import '@/components/DownloadAppButtonWithQr.css'

const DESKTOP_MQ = '(min-width: 769px)'

export type DownloadAppButtonWithQrProps = {
  href: string
  /** Encoded in the QR (store / landing URL). */
  qrValue: string
  className: string
  children: React.ReactNode
}

export function DownloadAppButtonWithQr({
  href,
  qrValue,
  className,
  children,
}: DownloadAppButtonWithQrProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      if (!el.open) el.showModal()
    } else if (el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const onClose = () => setOpen(false)
    el.addEventListener('close', onClose)
    return () => el.removeEventListener('close', onClose)
  }, [])

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return
    if (window.matchMedia(DESKTOP_MQ).matches) {
      e.preventDefault()
      setOpen(true)
    }
  }

  const close = () => {
    dialogRef.current?.close()
  }

  return (
    <>
      <a
        className={className}
        href={href}
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {children}
      </a>

      <dialog
        ref={dialogRef}
        className="downloadQrModal"
        aria-labelledby={titleId}
        aria-modal="true"
      >
        <div className="downloadQrModalPanel">
          <header className="downloadQrModalHeader">
            <h2 id={titleId} className="downloadQrModalTitle">
              Scan to download
            </h2>
            <button type="button" className="downloadQrModalClose" onClick={close} aria-label="Close">
              <X size={18} strokeWidth={2.2} aria-hidden />
            </button>
          </header>
          <div className="downloadQrModalBody">
            <DownloadQrPanel value={qrValue} size={88} caption="" />
          </div>
          <p className="downloadQrModalHint">Use your phone camera to scan the code.</p>
        </div>
      </dialog>
    </>
  )
}
