'use client'

import { QRCodeSVG } from 'qrcode.react'
import '@/components/DownloadQrPanel.css'

export type DownloadQrPanelProps = {
  /** Encoded URL (App Store / landing page link). */
  value: string
  /** Pixel size of the QR module grid (excluding quiet zone). */
  size?: number
  caption?: string
  className?: string
}

export function DownloadQrPanel({
  value,
  size = 84,
  caption = 'Scan to download',
  className,
}: DownloadQrPanelProps) {
  const captionText = caption === '' ? null : (caption ?? 'Scan to download')

  return (
    <div
      className={`downloadQrPanel ${className ?? ''}`.trim()}
      role="group"
      aria-label="Scan this QR code with your phone to download the SeqoraVault app"
    >
      <div className="downloadQrFrameOuter">
        <div className="downloadQrFrameGlow" aria-hidden="true" />
        <div className="downloadQrFrame">
          <div className="downloadQrSvgWrap">
            <QRCodeSVG
              value={value}
              size={size}
              level="M"
              marginSize={2}
              fgColor="#2d3250"
              bgColor="#ffffff"
              includeMargin={false}
            />
          </div>
        </div>
      </div>
      {captionText ? <p className="downloadQrCaption">{captionText}</p> : null}
    </div>
  )
}
