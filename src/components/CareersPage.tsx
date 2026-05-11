'use client'

import Link from 'next/link'
import { ArrowRight, Briefcase, CircleDollarSign, MapPin } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { usePreloaderReady } from '@/components/Preloader'
import type { CareerOpeningView } from '@/lib/hrms-job-openings'
import '@/components/CareersPage.css'

type CareersPageProps = {
  openings: CareerOpeningView[]
  fetchError?: boolean
}

export function CareersPage({ openings, fetchError = false }: CareersPageProps) {
  const ready = usePreloaderReady()

  return (
    <div className={`page careersPage ${ready ? 'page--visible' : ''}`}>
      <Header />

      <main className="careersMain" id="top">
        <section className="careersHero" aria-labelledby="careers-heading">
          <div className="careersHeroGrain" aria-hidden="true" />
          <div className="careersHeroOrb careersHeroOrb--a" aria-hidden="true" />
          <div className="careersHeroOrb careersHeroOrb--b" aria-hidden="true" />
          <div className="container careersHeroInner">
            <p className="careersEyebrow">Join the team</p>
            <h1 id="careers-heading" className="careersTitle">
              Careers at SeqoraVault
            </h1>
            <p className="careersLead">
              We&apos;re building calm, secure tools for life&apos;s most important information.
              If you care about privacy, clarity, and long-term trust, we&apos;d love to hear from
              you.
            </p>
          </div>
        </section>

        <section className="careersOpeningsSection" aria-labelledby="openings-heading">
          <div className="container">
            <h2 id="openings-heading" className="careersSectionTitle">
              Open roles
            </h2>

            {fetchError ? (
              <p className="careersEmpty" role="alert">
                We couldn&apos;t load openings right now. Please try again later or{' '}
                <Link href="/contact">contact us</Link> about roles you&apos;re interested in.
              </p>
            ) : openings.length === 0 ? (
              <p className="careersEmpty">
                There are no open listings at the moment. Check back soon or{' '}
                <Link href="/contact">get in touch</Link> — we&apos;d still love to hear from you.
              </p>
            ) : (
              <div className="careersGrid">
                {openings.map((job) => (
                  <Link
                    key={job.id}
                    href={`/careers/${encodeURIComponent(job.id)}`}
                    className="careersCard"
                    aria-label={`${job.title} — view role`}
                  >
                    <div className="careersCardTop">
                      <h3 className="careersCardTitle">{job.title}</h3>
                      <span className="careersCardArrow" aria-hidden="true">
                        <ArrowRight size={20} strokeWidth={2.2} />
                      </span>
                    </div>
                    <div className="careersCardMeta">
                      <span>
                        <Briefcase size={14} strokeWidth={2.2} aria-hidden="true" />
                        {job.team}
                      </span>
                      <span>
                        <MapPin size={14} strokeWidth={2.2} aria-hidden="true" />
                        {job.location}
                      </span>
                      <span>{job.employmentType}</span>
                      {job.salaryRange ? (
                        <span>
                          <CircleDollarSign size={14} strokeWidth={2.2} aria-hidden="true" />
                          {job.salaryRange}
                        </span>
                      ) : null}
                    </div>
                    <p className="careersCardSummary">
                      {job.summary || 'View details and apply.'}
                    </p>
                    <span className="careersCardCta">
                      View role
                      <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
