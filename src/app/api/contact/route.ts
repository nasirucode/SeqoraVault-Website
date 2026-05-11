import { NextResponse } from 'next/server'
import { submitContactUs } from '@/lib/hrms-job-openings'

export const runtime = 'nodejs'

const MAX_NAME = 140
const MAX_EMAIL = 254
const MAX_PHONE = 40
const MAX_MESSAGE = 12000

const ALLOWED_CONTACT_TYPES = new Set(['waiting_list', 'general_enquiry'])

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
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return badRequest('Invalid JSON')
  }

  const honeypot = trimStr(body.company_website, 200)
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const full_name = trimStr(body.full_name, MAX_NAME)
  const email = trimStr(body.email, MAX_EMAIL).toLowerCase()
  const phone = trimStr(body.phone, MAX_PHONE)
  const message = trimStr(body.message, MAX_MESSAGE)
  const contact_type = trimStr(body.contact_type, 80)

  if (!full_name) return badRequest('Name is required')
  if (!email || !isValidEmail(email)) return badRequest('Valid email is required')
  if (!message) return badRequest('Message is required')
  if (contact_type && !ALLOWED_CONTACT_TYPES.has(contact_type)) {
    return badRequest('Invalid enquiry type')
  }

  const result = await submitContactUs({
    full_name,
    email,
    phone: phone || undefined,
    message,
    contact_type: contact_type || undefined,
  })

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.message || 'We could not send your message. Please try again.' },
      { status: 422 },
    )
  }

  return NextResponse.json({ ok: true, message: result.message })
}
