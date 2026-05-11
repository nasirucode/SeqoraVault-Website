import type { Metadata } from 'next'
import { TermsPolicyPage } from '@/components/TermsPolicyPage'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'Terms governing use of SeqoraVault websites and services.',
}

export default function TermsPage() {
  return <TermsPolicyPage />
}
