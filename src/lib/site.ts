/** Canonical site URL for metadata and OG tags (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  return raw ? raw.replace(/\/$/, '') : 'http://localhost:3000'
}

/**
 * URL encoded in download QR codes (App Store / Play landing, or deep link).
 * Override with `NEXT_PUBLIC_DOWNLOAD_QR_URL`; otherwise site root + `#contact`.
 */
export function getDownloadQrTarget(): string {
  const explicit = process.env.NEXT_PUBLIC_DOWNLOAD_QR_URL?.trim()
  if (explicit) return explicit
  return `${getSiteUrl()}/#contact`
}

/** Home page pathname — used for section anchors vs full URLs in nav. */
export function isHomePath(pathname: string): boolean {
  return pathname === '/'
}

/**
 * Link target for a homepage section: `#features` when already on `/`,
 * `/#features` when navigating from another route.
 */
export function sectionLink(sectionId: string, isHome: boolean): string {
  const hash = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
  return isHome ? hash : `/${hash}`
}
