'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
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
    <div className="errorShell">
      <div className="errorCard">
        <h1 className="errorTitle">Something went wrong</h1>
        <p className="errorText">
          An unexpected error occurred while loading this page. You can try again or return to the
          homepage.
        </p>
        {error.digest ? (
          <p className="errorCode" suppressHydrationWarning>
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="errorActions">
          <button type="button" className="errorBtn" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="errorBtn errorBtnSecondary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}
