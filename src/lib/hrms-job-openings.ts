import { excerptFromHtml, sanitizeQuillHtml } from '@/lib/sanitizeQuill'

/** Custom whitelisted method path (after `/api`). */
const GET_CAREERS_METHOD = '/method/seqoravault.apis.career.get_careers'

/** Requested columns — must match `get_careers` on the HRMS side. */
export const CAREER_API_FIELDS = [
  'name',
  'job_title',
  'employment_type',
  'department',
  'short_description',
  'description',
  'location',
  'lower_range',
  'upper_range',
  'currency',
  'creation',
] as const

/** ERPNext / Frappe REST base — override with HRMS_API_BASE_URL (include `/api`, no trailing slash). */
function getApiBase(): string {
  const raw = process.env.HRMS_API_BASE_URL?.trim() || 'https://hrms.seqoravault.co.uk/api'
  return raw.replace(/\/$/, '')
}

/**
 * Optional Frappe token auth (server-only env).
 * Set `HRMS_API_TOKEN` to `api_key:api_secret` when the method requires an authenticated user.
 */
function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  const token = process.env.HRMS_API_TOKEN?.trim()
  if (token) {
    headers.Authorization = `token ${token}`
  }
  return headers
}

export type ErpJobOpeningRow = {
  name: string
  job_title?: string | null
  employment_type?: string | null | { name?: string | null }
  department?: string | null | { name?: string | null }
  /** Plain text or HTML teaser for listing cards (preferred over excerpting full description). */
  short_description?: string | null
  description?: string | null
  location?: string | null | { name?: string | null }
  status?: string | null
  lower_range?: number | string | null
  upper_range?: number | string | null
  currency?: string | null
  creation?: string | null
}

function asText(value: unknown, fallback: string): string {
  if (value == null || value === '') return fallback
  if (typeof value === 'string') return value.trim() || fallback
  if (typeof value === 'object' && value !== null && 'name' in value) {
    const n = (value as { name?: unknown }).name
    if (typeof n === 'string' && n.trim()) return n.trim()
  }
  return fallback
}

function toNum(value: unknown): number | null {
  if (value == null || value === '') return null
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

/** Compact salary band from ERPNext numeric ranges + ISO currency code. */
export function formatSalaryBand(
  lower: unknown,
  upper: unknown,
  currencyCode: string | null | undefined,
): string | undefined {
  const lo = toNum(lower)
  const hi = toNum(upper)
  if (lo == null && hi == null) return undefined

  const code = (currencyCode || 'GBP').trim().toUpperCase()
  const locale = code === 'NGN' ? 'en-NG' : 'en-GB'
  try {
    const fmt = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code.length === 3 ? code : 'GBP',
      maximumFractionDigits: 0,
    })
    if (lo != null && hi != null) return `${fmt.format(lo)} – ${fmt.format(hi)}`
    if (lo != null) return `From ${fmt.format(lo)}`
    if (hi != null) return `Up to ${fmt.format(hi)}`
  } catch {
    const sym =
      code === 'USD' ? '$' : code === 'GBP' ? '£' : code === 'NGN' ? '₦' : ''
    if (lo != null && hi != null) return `${sym}${lo} – ${sym}${hi}`
    if (lo != null) return `From ${sym}${lo}`
    if (hi != null) return `Up to ${sym}${hi}`
  }
  return undefined
}

function formatPostedAt(creation: unknown): string | undefined {
  if (creation == null || typeof creation !== 'string') return undefined
  const d = new Date(creation)
  if (Number.isNaN(d.getTime())) return undefined
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(d)
}

const LISTING_SUMMARY_MAX = 280

/** Text shown on /careers cards: `short_description` when set, else excerpt from full description. */
function listingSummary(row: ErpJobOpeningRow): string {
  const raw = row.short_description
  if (raw != null && String(raw).trim() !== '') {
    const s = String(raw).trim()
    if (s.includes('<')) {
      return excerptFromHtml(s, LISTING_SUMMARY_MAX)
    }
    return s.length > LISTING_SUMMARY_MAX ? `${s.slice(0, LISTING_SUMMARY_MAX - 1)}…` : s
  }
  return excerptFromHtml(row.description || '', LISTING_SUMMARY_MAX)
}

function rowToView(row: ErpJobOpeningRow, includeDescriptionHtml: boolean): CareerOpeningView {
  const html = row.description || ''
  const salaryRange = formatSalaryBand(row.lower_range, row.upper_range, row.currency)

  return {
    id: row.name,
    title: asText(row.job_title, row.name),
    team: asText(row.department, 'Team'),
    location: asText(row.location, 'Location TBC'),
    employmentType: asText(row.employment_type, 'Role'),
    status: asText(row.status, 'Open'),
    summary: listingSummary(row),
    descriptionHtml: includeDescriptionHtml ? sanitizeQuillHtml(html) : '',
    salaryRange,
    postedAt: formatPostedAt(row.creation),
  }
}

/** Normalised opening for the marketing site (listing + detail). */
export type CareerOpeningView = {
  id: string
  title: string
  team: string
  location: string
  employmentType: string
  status: string
  /** Listing card teaser — from API `short_description` or excerpt of full `description`. */
  summary: string
  descriptionHtml: string
  salaryRange?: string
  postedAt?: string
}

async function postMethod(url: string, body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HRMS API ${res.status}: ${text.slice(0, 280)}`)
  }

  return res.json() as Promise<unknown>
}

/**
 * Default whitelisted path for career applications. Override with env if your function name differs
 * (e.g. `submit_job_application`): `HRMS_SUBMIT_APPLICATION_METHOD=/method/seqoravault.apis.career.submit_job_application`
 */
function getSubmitApplicationMethodPath(): string {
  const fromEnv = process.env.HRMS_SUBMIT_APPLICATION_METHOD?.trim()
  if (fromEnv) {
    const p = fromEnv.replace(/\/$/, '')
    return p.startsWith('/') ? p : `/${p}`
  }
  return '/method/seqoravault.apis.career.submit_application'
}

type HrmsErrorContext = 'careers' | 'contact'

/** Frappe 417 / ValidationError body — turn into a short, safe user message (no tracebacks). */
function humanizeFrappeException(raw: string, context: HrmsErrorContext = 'careers'): string {
  const firstLine = raw.split('\n')[0].trim()
  const isDev = process.env.NODE_ENV === 'development'
  if (
    /Failed to get method for command/i.test(firstLine) ||
    /has no attribute ['"]?\w+['"]?/i.test(firstLine)
  ) {
    if (context === 'contact') {
      if (isDev) {
        return `${firstLine.slice(0, 300)} — Set HRMS_CONTACT_US_METHOD in .env to the exact /method/... path whitelisted on HRMS for your contact_us handler (then restart dev server).`
      }
      return 'We could not send your message right now. Please try again in a few minutes, or use the chat option on this page.'
    }
    return 'Applications are temporarily unavailable. Please try again later or use our contact form.'
  }
  const cleaned = firstLine
    .replace(/^(?:frappe\.exceptions\.)?\w+Error:\s*/i, '')
    .replace(/^ValidationError:\s*/i, '')
    .trim()
  const out = cleaned || firstLine
  return out.length > 280 ? `${out.slice(0, 277)}…` : out
}

function extractFrappeUserMessage(p: Record<string, unknown>): string | undefined {
  const raw = p._server_messages
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const arr = JSON.parse(raw) as unknown[]
      if (Array.isArray(arr)) {
        for (const item of arr) {
          if (item && typeof item === 'object' && 'message' in item) {
            const m = (item as { message?: unknown }).message
            if (typeof m === 'string' && m.trim()) return m.trim()
          }
        }
      }
    } catch {
      /* ignore */
    }
  }
  if (typeof p.message === 'string' && p.message.trim() && !p.message.startsWith('Traceback')) {
    return p.message.trim()
  }
  return undefined
}

/** Best-effort message from failed HRMS JSON (417, 500, etc.). */
function extractHrmsApiFailureMessage(
  parsed: Record<string, unknown>,
  status: number,
  rawText: string,
  context: HrmsErrorContext = 'careers',
): string {
  const fromServer = extractFrappeUserMessage(parsed)
  if (fromServer) return fromServer

  if (typeof parsed.exception === 'string' && parsed.exception.trim()) {
    return humanizeFrappeException(parsed.exception, context)
  }

  if (typeof parsed.exc === 'string' && parsed.exc.includes('Traceback')) {
    if (context === 'contact') {
      return status === 417 || status === 404
        ? 'We could not send your message. Please try again in a few minutes.'
        : 'We could not send your message. Please try again or use the chat option on this site.'
    }
    return status === 417 || status === 404
      ? 'Applications are temporarily unavailable. Please try again later or use our contact form.'
      : 'Application could not be saved. Please try again or contact us.'
  }

  const slice = rawText.trim().slice(0, 280)
  return slice || `Request failed (${status})`
}

function frappeResponseHasError(p: Record<string, unknown>): boolean {
  return Boolean(
    p.exc ||
      p.exception ||
      (typeof p.exc_type === 'string' && p.exc_type.length > 0),
  )
}

function unwrapSubmitApplicationMethod(payload: Record<string, unknown>): JobApplicantSubmitResult {
  if (frappeResponseHasError(payload)) {
    const msg =
      extractFrappeUserMessage(payload) ||
      (typeof payload.exception === 'string' ? humanizeFrappeException(payload.exception, 'careers') : undefined) ||
      'Application could not be saved'
    return { ok: false, message: msg }
  }

  const msg = payload.message
  if (msg && typeof msg === 'object') {
    const m = msg as Record<string, unknown>
    if (m.ok === false || (typeof m.error === 'string' && m.error.trim())) {
      return { ok: false, message: typeof m.error === 'string' ? m.error.trim() : 'Submission failed' }
    }
    const docName = typeof m.name === 'string' ? m.name : undefined
    if (docName || m.ok === true || m.success === true) {
      return {
        ok: true,
        applicantDocName: docName,
        message: typeof m.message === 'string' ? m.message : undefined,
      }
    }
  }

  if (msg === true || msg === 'ok' || msg === 'success') {
    return { ok: true }
  }

  if (typeof msg === 'string' && msg.trim()) {
    if (/traceback|exception:/i.test(msg)) {
      return { ok: false, message: 'Application could not be saved' }
    }
    return { ok: true, message: msg.trim() }
  }

  return { ok: true }
}

async function callCareerSubmitApplication(body: Record<string, unknown>): Promise<JobApplicantSubmitResult> {
  const path = getSubmitApplicationMethodPath()
  const url = `${getApiBase()}${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const text = await res.text().catch(() => '')
  let json: Record<string, unknown> | null = null
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null
  } catch {
    json = null
  }

  const parsed = json ?? {}

  if (!res.ok) {
    const message = extractHrmsApiFailureMessage(parsed, res.status, text, 'careers')
    if (process.env.NODE_ENV === 'development') {
      console.error('[HRMS submit]', res.status, path, message, text.slice(0, 500))
    } else {
      console.error('[HRMS submit]', res.status, path, message)
    }
    return {
      ok: false,
      message,
    }
  }

  const unwrapped = unwrapSubmitApplicationMethod(parsed)
  if (!unwrapped.ok && process.env.NODE_ENV === 'development') {
    console.error('[HRMS submit] bad payload', path, parsed)
  }
  return unwrapped
}

/**
 * Values passed into `submit_application` on HRMS (multipart route maps filenames → base64).
 * Server expects: `job_opening`, `applicant_name`, `email_id`, `phone_number`, `cover_letter`, `resume_attachment`.
 */
export type JobApplicantSubmitPayload = {
  job_opening: string
  applicant_name: string
  email_id: string
  phone_number?: string
  cover_letter?: string
  /** Sent as `resume_attachment` (e.g. base64 string). */
  resume_base64?: string
  resume_filename?: string
}

export type JobApplicantSubmitResult = {
  ok: boolean
  applicantDocName?: string
  message?: string
}

export async function submitJobApplicantApplication(
  payload: JobApplicantSubmitPayload,
): Promise<JobApplicantSubmitResult> {
  const body: Record<string, unknown> = {
    job_opening: payload.job_opening,
    applicant_name: payload.applicant_name,
    email_id: payload.email_id,
  }

  if (payload.phone_number?.trim()) {
    body.phone_number = payload.phone_number.trim()
  }
  if (payload.cover_letter?.trim()) {
    body.cover_letter = payload.cover_letter.trim()
  }
  if (payload.resume_base64) {
    body.resume_attachment = payload.resume_base64
  }

  return callCareerSubmitApplication(body)
}

/**
 * Parse HRMS JSON: `{ "message": "Success string", "data": [ ... rows ] }`
 * or legacy Frappe shapes where `message` is the array.
 */
function unwrapCareersPayload(payload: unknown): ErpJobOpeningRow[] {
  if (!payload || typeof payload !== 'object') return []
  const p = payload as Record<string, unknown>

  if (Array.isArray(p.data)) {
    return p.data as ErpJobOpeningRow[]
  }

  const msg = p.message
  if (Array.isArray(msg)) {
    return msg as ErpJobOpeningRow[]
  }

  if (msg && typeof msg === 'object') {
    const inner = msg as Record<string, unknown>
    const list =
      inner.data ??
      inner.careers ??
      inner.openings ??
      inner.records ??
      inner.items ??
      inner.rows
    if (Array.isArray(list)) {
      return list as ErpJobOpeningRow[]
    }
  }

  return []
}

async function fetchCareersRows(): Promise<ErpJobOpeningRow[]> {
  const url = `${getApiBase()}${GET_CAREERS_METHOD}`
  const payload = await postMethod(url, {
    fields: [...CAREER_API_FIELDS],
  })
  return unwrapCareersPayload(payload)
}

export async function fetchOpenJobOpenings(): Promise<CareerOpeningView[]> {
  const rows = await fetchCareersRows()
  return rows.map((row) => rowToView(row, false))
}

export async function fetchJobOpeningById(name: string): Promise<CareerOpeningView | null> {
  const trimmed = decodeURIComponent(name).trim()
  if (!trimmed) return null

  try {
    const rows = await fetchCareersRows()
    const row = rows.find((r) => r.name === trimmed)
    if (!row) return null
    return rowToView(row, true)
  } catch {
    return null
  }
}

/**
 * Whitelisted method path for `contact_us` on HRMS. Must match Frappe (Server Script / API method).
 * Override with `HRMS_CONTACT_US_METHOD` only if your site uses a different path.
 */
function getContactUsMethodPath(): string {
  const fromEnv = process.env.HRMS_CONTACT_US_METHOD?.trim()
  if (fromEnv) {
    const p = fromEnv.replace(/\/$/, '')
    return p.startsWith('/') ? p : `/${p}`
  }
  return '/method/seqoravault.apis.contact.contact_us'
}

export type ContactUsSubmitPayload = {
  full_name: string
  email: string
  phone?: string
  message: string
  contact_type?: string
}

export type ContactUsSubmitResult = {
  ok: boolean
  message?: string
}

function unwrapContactUsMethod(payload: Record<string, unknown>): ContactUsSubmitResult {
  if (frappeResponseHasError(payload)) {
    const msg =
      extractFrappeUserMessage(payload) ||
      (typeof payload.exception === 'string' ? humanizeFrappeException(payload.exception, 'contact') : undefined) ||
      'Your message could not be sent'
    return { ok: false, message: msg }
  }

  const msg = payload.message
  if (msg && typeof msg === 'object') {
    const m = msg as Record<string, unknown>
    if (m.ok === false || m.success === false) {
      return { ok: false, message: typeof m.error === 'string' ? m.error.trim() : 'Submission failed' }
    }
    if (typeof m.error === 'string' && m.error.trim()) {
      return { ok: false, message: m.error.trim() }
    }
    if (m.ok === true || m.ok === 1 || m.success === true || m.success === 1) {
      return { ok: true, message: typeof m.message === 'string' ? m.message : undefined }
    }
    if (typeof m.name === 'string' && m.name.trim()) {
      return { ok: true, message: typeof m.message === 'string' ? m.message : undefined }
    }
    if (m.status === 'success' || m.status === 'ok') {
      return { ok: true, message: typeof m.message === 'string' ? m.message : undefined }
    }
  }

  if (msg === true || msg === 'ok' || msg === 'success' || msg === 1) {
    return { ok: true }
  }

  if (typeof msg === 'string' && msg.trim()) {
    if (/traceback|exception:/i.test(msg)) {
      return { ok: false, message: 'Your message could not be sent' }
    }
    return { ok: true, message: msg.trim() }
  }

  return { ok: true }
}

async function callContactUsSubmit(body: Record<string, unknown>): Promise<ContactUsSubmitResult> {
  const path = getContactUsMethodPath()
  const url = `${getApiBase()}${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const text = await res.text().catch(() => '')
  let json: Record<string, unknown> | null = null
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null
  } catch {
    json = null
  }

  const parsed = json ?? {}

  if (!res.ok) {
    const message = extractHrmsApiFailureMessage(parsed, res.status, text, 'contact')
    if (process.env.NODE_ENV === 'development') {
      console.error('[HRMS contact]', res.status, path, message, text.slice(0, 500))
    } else {
      console.error('[HRMS contact]', res.status, path, message)
    }
    return {
      ok: false,
      message,
    }
  }

  const unwrapped = unwrapContactUsMethod(parsed)
  if (!unwrapped.ok && process.env.NODE_ENV === 'development') {
    console.error('[HRMS contact] bad payload', path, parsed)
  }
  return unwrapped
}

/** POST body keys: `full_name`, `email`, optional `phone`, `message`, optional `contact_type`. */
export async function submitContactUs(payload: ContactUsSubmitPayload): Promise<ContactUsSubmitResult> {
  const body: Record<string, unknown> = {
    full_name: payload.full_name,
    email: payload.email,
    message: payload.message,
  }

  if (payload.phone?.trim()) {
    body.phone = payload.phone.trim()
  }
  if (payload.contact_type?.trim()) {
    body.contact_type = payload.contact_type.trim()
  }

  return callContactUsSubmit(body)
}
