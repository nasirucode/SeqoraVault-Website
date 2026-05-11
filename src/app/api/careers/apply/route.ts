import { NextResponse } from 'next/server'
import { submitJobApplicantApplication } from '@/lib/hrms-job-openings'

export const runtime = 'nodejs'

const MAX_RESUME_BYTES = 3 * 1024 * 1024
const MAX_NAME = 140
const MAX_EMAIL = 254
const MAX_PHONE = 40
const MAX_COVER = 12000

const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 })
}

function trimStr(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return badRequest('Invalid form data')
  }

  const honeypot = trimStr(form.get('company_website'), 200)
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const job_opening = trimStr(form.get('job_opening'), 200)
  const applicant_name = trimStr(form.get('applicant_name'), MAX_NAME)
  const email_id = trimStr(form.get('email_id'), MAX_EMAIL).toLowerCase()
  const phone_number = trimStr(form.get('phone_number'), MAX_PHONE)
  const cover_letter = trimStr(form.get('cover_letter'), MAX_COVER)

  if (!job_opening) return badRequest('Job opening is required')
  if (!applicant_name) return badRequest('Name is required')
  if (!email_id || !isValidEmail(email_id)) return badRequest('Valid email is required')

  const resumeEntry = form.get('resume')
  let resume_base64: string | undefined
  let resume_filename: string | undefined

  if (resumeEntry instanceof File && resumeEntry.size > 0) {
    if (resumeEntry.size > MAX_RESUME_BYTES) {
      return badRequest('Resume must be 3 MB or smaller')
    }
    const mime = (resumeEntry.type || '').toLowerCase()
    if (mime && !ALLOWED_RESUME_TYPES.has(mime)) {
      return badRequest('Resume must be PDF or Word (.doc, .docx)')
    }
    const buf = Buffer.from(await resumeEntry.arrayBuffer())
    resume_base64 = buf.toString('base64')
    resume_filename = resumeEntry.name.replace(/[^\w.\- ]+/g, '').slice(0, 200) || 'resume.pdf'
  }

  try {
    const result = await submitJobApplicantApplication({
      job_opening,
      applicant_name,
      email_id,
      phone_number: phone_number || undefined,
      cover_letter: cover_letter || undefined,
      resume_base64,
      resume_filename,
    })

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.message || 'Could not submit application' },
        { status: 422 },
      )
    }

    return NextResponse.json({
      ok: true,
      applicantDocName: result.applicantDocName,
      message: result.message,
    })
  } catch (e) {
    console.error('[careers/apply]', e)
    return NextResponse.json(
      { ok: false, error: 'We could not reach our careers system. Please try again or use contact.' },
      { status: 502 },
    )
  }
}
