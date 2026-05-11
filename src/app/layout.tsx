import type { Metadata } from 'next'
import { Chivo, Outfit } from 'next/font/google'
import { CookieConsent } from '@/components/CookieConsent'
import { Preloader } from '@/components/Preloader'
import { ScrollToHash } from '@/components/ScrollToHash'
import { TawkChatLoader } from '@/components/TawkChatLoader'
import { getSiteUrl } from '@/lib/site'
import './globals.css'
import '@/styles/app.css'

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'SeqoraVault - Secure Vaults for Your Finances, Property, Documents, and Wishes',
    template: '%s · SeqoraVault',
  },
  description:
    'Organise finances, property, documents, and wishes with SeqoraVault—secure vaults, encryption, and zero-knowledge architecture. You control access and nominees.',
  icons: {
    icon: [{ url: '/20260317_010103.jpg', type: 'image/jpeg' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'SeqoraVault',
    url: '/',
    title: 'SeqoraVault — Secure vaults for finances, property, documents & wishes',
    description:
      'Organise finances, property, documents, and wishes with SeqoraVault—secure vaults, encryption, and zero-knowledge architecture. You control access and nominees.',
    images: [
      {
        url: '/download-phone-mockup.svg',
        type: 'image/svg+xml',
        width: 1033,
        height: 697,
        alt: 'SeqoraVault — secure vaults for what matters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeqoraVault — Secure vaults for finances, property, documents & wishes',
    description:
      'Organise finances, property, documents, and wishes with SeqoraVault—secure vaults, encryption, and zero-knowledge architecture.',
    images: ['/download-phone-mockup.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${chivo.variable} ${outfit.variable}`}>
      <body>
        <Preloader>
          <ScrollToHash />
          {children}
          <CookieConsent />
        </Preloader>
        <TawkChatLoader />
      </body>
    </html>
  )
}
