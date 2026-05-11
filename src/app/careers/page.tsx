import type { Metadata } from 'next'
import { CareersPage } from '@/components/CareersPage'
import type { CareerOpeningView } from '@/lib/hrms-job-openings'
import { fetchOpenJobOpenings } from '@/lib/hrms-job-openings'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join SeqoraVault — open roles from our team. Remote-friendly roles; apply via contact.',
}

export const revalidate = 300

export default async function Careers() {
  let openings: CareerOpeningView[] = []
  let fetchError = false
  try {
    openings = await fetchOpenJobOpenings()
  } catch (err) {
    fetchError = true
    if (process.env.NODE_ENV === 'development') {
      console.error('[careers] Failed to load job openings from HRMS', err)
    }
  }

  return <CareersPage openings={openings} fetchError={fetchError} />
}
