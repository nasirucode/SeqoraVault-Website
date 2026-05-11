import type { Metadata } from 'next'
import { CookiesPolicyPage } from '@/components/CookiesPolicyPage'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description:
    'Cookie Policy for SeqoraVault Ltd (UK & Nigeria): cookies, similar technologies, consent, and processors.',
}

export default function CookiesPage() {
  return <CookiesPolicyPage />
}
