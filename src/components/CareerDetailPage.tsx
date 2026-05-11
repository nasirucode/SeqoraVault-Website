'use client'

import Link from 'next/link'
import { ArrowLeft, Briefcase, CircleDollarSign, MapPin } from 'lucide-react'
import type { CareerOpeningView } from '@/lib/hrms-job-openings'
import { CareerApplyModal } from '@/components/CareerApplyModal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { usePreloaderReady } from '@/components/Preloader'
import '@/components/CareerDetailPage.css'

export type CareerDetailPageProps = {
  opening: CareerOpeningView
}

export function CareerDetailPage({ opening }: CareerDetailPageProps) {
  const ready = usePreloaderReady()

  return (
    <div className={`page careerDetail ${ready ? 'page--visible' : ''}`}>
      <Header />

      <main className="careerDetailMain" id="top">
        <section className="container" style={{ paddingTop: 'clamp(16px, 4vw, 28px)' }}>
          <Link href="/careers" className="careerDetailBack">
            <ArrowLeft size={18} strokeWidth={2.2} aria-hidden="true" />
            Back to careers
          </Link>

          <header className="careerDetailHero">
            <div className="careerDetailHeroGlow" aria-hidden="true" />
            <h1 className="careerDetailTitle">{opening.title}</h1>
            <div className="careerDetailMeta">
              <span>
                <Briefcase size={15} strokeWidth={2.2} aria-hidden="true" />
                {opening.team}
              </span>
              <span>
                <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
                {opening.location}
              </span>
              <span>{opening.employmentType}</span>
              {opening.salaryRange ? (
                <span>
                  <CircleDollarSign size={15} strokeWidth={2.2} aria-hidden="true" />
                  {opening.salaryRange}
                </span>
              ) : null}
              <span className="careerDetailMetaStatus">{opening.status}</span>
              {opening.postedAt ? (
                <span className="careerDetailMetaPosted">Posted {opening.postedAt}</span>
              ) : null}
            </div>
          </header>

          <article className="careerDetailBody">
            {opening.descriptionHtml.trim() ? (
              <div
                className="careerDetailQuill"
                dangerouslySetInnerHTML={{ __html: opening.descriptionHtml }}
              />
            ) : (
              <p className="careerDetailNoDesc">
                A full description for this role isn&apos;t available yet. Please reach out via{' '}
                <Link href="/contact">contact</Link> if you&apos;d like to apply or learn more.
              </p>
            )}

            <aside className="careerDetailApply" aria-labelledby="apply-heading">
              <h2 id="apply-heading" className="srOnly">
                Apply
              </h2>
              <p>
                Interested in this role? Submit your details below — we read every application. You
                can also reach us via{' '}
                <Link href="/contact" className="careerDetailApplyInlineLink">
                  contact
                </Link>
                .
              </p>
              <CareerApplyModal jobOpeningId={opening.id} jobTitle={opening.title} />
            </aside>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  )
}
