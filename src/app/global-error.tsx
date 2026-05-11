'use client'

import Link from 'next/link'
import { type CSSProperties, useEffect } from 'react'

const shell: CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '48px 24px',
  background:
    'radial-gradient(900px 500px at 50% -40px, rgba(210, 173, 73, 0.16), transparent 62%), #fff',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
}

const card: CSSProperties = {
  width: 'min(440px, 100%)',
  padding: '32px 28px',
  borderRadius: 20,
  border: '1px solid rgba(16, 24, 40, 0.12)',
  boxShadow: '0 18px 40px rgba(16, 24, 40, 0.08)',
  textAlign: 'center',
}

const title: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(22px, 4vw, 28px)',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: '#2d3250',
}

const text: CSSProperties = {
  margin: '12px 0 0',
  fontSize: 15,
  lineHeight: 1.55,
  color: 'rgba(16, 24, 40, 0.56)',
}

const actions: CSSProperties = {
  marginTop: 22,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  justifyContent: 'center',
}

const btn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 44,
  padding: '0 18px',
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  border: '1px solid rgba(31, 42, 68, 0.18)',
  background: 'linear-gradient(180deg, #2d3250, #2d3250)',
  color: '#fff',
  boxShadow: '0 10px 22px rgba(31, 42, 68, 0.18)',
}

const btnSecondary: CSSProperties = {
  ...btn,
  background: '#fff',
  color: '#2d3250',
  borderColor: 'rgba(16, 24, 40, 0.14)',
  boxShadow: '0 8px 18px rgba(16, 24, 40, 0.06)',
  textDecoration: 'none',
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={shell}>
          <div style={card}>
            <h1 style={title}>Something went wrong</h1>
            <p style={text}>
              SeqoraVault hit a critical error. Please reload the page or go back home.
            </p>
            {error.digest ? (
              <p style={{ ...text, marginTop: 16, fontSize: 12 }} suppressHydrationWarning>
                Reference: {error.digest}
              </p>
            ) : null}
            <div style={actions}>
              <button type="button" style={btn} onClick={() => reset()}>
                Try again
              </button>
              <Link href="/" style={btnSecondary}>
                Back home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
