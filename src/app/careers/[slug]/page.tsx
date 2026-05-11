import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CareerDetailPage } from '@/components/CareerDetailPage'
import { fetchJobOpeningById } from '@/lib/hrms-job-openings'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const opening = await fetchJobOpeningById(slug)
  if (!opening) {
    return { title: 'Role · Careers' }
  }
  return {
    title: `${opening.title} · Careers`,
    description: opening.summary || `${opening.title} at SeqoraVault`,
  }
}

export default async function CareerOpeningRoute({ params }: Props) {
  const { slug } = await params
  const opening = await fetchJobOpeningById(slug)
  if (!opening) {
    notFound()
  }
  return <CareerDetailPage opening={opening} />
}
