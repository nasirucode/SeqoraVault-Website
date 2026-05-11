import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="errorShell">
      <div className="errorCard">
        <h1 className="errorTitle">Page not found</h1>
        <p className="errorText">
          We couldn&apos;t find that page. It may have been moved or the link might be outdated.
        </p>
        <div className="errorActions">
          <Link href="/" className="errorBtn">
            Back home
          </Link>
          <Link href="/contact" className="errorBtn errorBtnSecondary">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
