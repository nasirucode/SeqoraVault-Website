'use client'

import type { StaticImageData } from 'next/image'
import { useId } from 'react'
import './DownloadSection.css'
import defaultMockup from '@/assets/download-phone-mockup.svg'
import defaultApple from '@/assets/icon-apple.png'
import defaultPlay from '@/assets/icon-play.png'
import { DownloadAppButtonWithQr } from '@/components/DownloadAppButtonWithQr'
import { assetUrl } from '@/lib/assetUrl'
import { getDownloadQrTarget } from '@/lib/site'

export type DownloadSectionProps = {
  /** Root `id` for in-page links (e.g. `#contact`). */
  id?: string
  heading?: string
  subheading?: string
  downloadHref?: string
  downloadLabel?: string
  mockupSrc?: string | StaticImageData
  mockupAlt?: string
  appleIconSrc?: string | StaticImageData
  playIconSrc?: string | StaticImageData
  /** URL encoded in the desktop QR (defaults from `NEXT_PUBLIC_DOWNLOAD_QR_URL` or site + `#contact`). */
  downloadQrUrl?: string
}

export function DownloadSection({
  id = 'contact',
  heading = 'Download SeqoraVault',
  subheading =
    'Get started in minutes. Secure your assets, organise everything, and stay in control, wherever you are.',
  downloadHref = '#',
  downloadLabel = 'Download app',
  mockupSrc = defaultMockup,
  mockupAlt = 'SeqoraVault mobile app preview on a smartphone',
  appleIconSrc = defaultApple,
  playIconSrc = defaultPlay,
  downloadQrUrl = getDownloadQrTarget(),
}: DownloadSectionProps) {
  const rawId = useId()
  const svgId = `dl-${rawId.replace(/:/g, '')}`

  return (
    <section
      id={id}
      className="section sectionDownload"
      aria-labelledby={`${svgId}-heading`}
    >
      <div className="downloadDecor" aria-hidden="true">
        <svg
          className="downloadDecorSvg"
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lower-left: soft lavender / periwinkle bloom */}
            <radialGradient
              id={`${svgId}-g1`}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(120 420) rotate(-25) scale(640 520)"
            >
              <stop stopColor="rgba(190, 202, 255, 0.42)" />
              <stop offset="0.42" stopColor="rgba(232, 236, 255, 0.22)" />
              <stop offset="1" stopColor="rgba(253, 251, 247, 0)" />
            </radialGradient>
            {/* Upper-right: primary lavender-blue glow */}
            <radialGradient
              id={`${svgId}-g2`}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1260 100) rotate(40) scale(720 560)"
            >
              <stop stopColor="rgba(176, 192, 255, 0.48)" />
              <stop offset="0.48" stopColor="rgba(228, 234, 255, 0.28)" />
              <stop offset="1" stopColor="rgba(253, 251, 247, 0)" />
            </radialGradient>
            {/* Center: brightest area behind headline (spotlight) */}
            <radialGradient
              id={`${svgId}-g3`}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(720 200) rotate(0) scale(780 520)"
            >
              <stop stopColor="rgba(255, 255, 255, 0.55)" />
              <stop offset="0.35" stopColor="rgba(253, 251, 246, 0.18)" />
              <stop offset="0.65" stopColor="rgba(250, 248, 242, 0)" />
              <stop offset="1" stopColor="rgba(250, 248, 242, 0)" />
            </radialGradient>
          </defs>
          <rect width="1440" height="560" fill="#faf8f4" />
          <rect width="1440" height="560" fill={`url(#${svgId}-g1)`} />
          <rect width="1440" height="560" fill={`url(#${svgId}-g2)`} />
          <rect width="1440" height="560" fill={`url(#${svgId}-g3)`} />
        </svg>
      </div>

      <div className="container downloadInner">
        <h2 id={`${svgId}-heading`} className="downloadTitle">
          {heading}
        </h2>
        <p className="downloadSubtitle">{subheading}</p>

        <DownloadAppButtonWithQr
          className="downloadStoreBtn"
          href={downloadHref}
          qrValue={downloadQrUrl}
        >
          <span className="downloadStoreIcons" aria-hidden="true">
            <img className="downloadStoreIcon" src={assetUrl(appleIconSrc)} alt="" />
            <img
              className="downloadStoreIcon downloadStoreIconPlay"
              src={assetUrl(playIconSrc)}
              alt=""
            />
          </span>
          <span className="downloadStoreText">{downloadLabel}</span>
        </DownloadAppButtonWithQr>

        <div className="downloadMockupStage">
          <img
            className="downloadMockupImg"
            src={assetUrl(mockupSrc)}
            alt={mockupAlt}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
