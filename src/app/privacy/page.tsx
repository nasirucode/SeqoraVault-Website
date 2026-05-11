import type { Metadata } from 'next'
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How SeqoraVault collects, uses, and protects personal data.',
}

export default function PrivacyPage() {
  return <PrivacyPolicyPage />
}
