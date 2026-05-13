const DIAL_CODE_BY_REGION: Record<string, string> = {
  // Core markets + common locales (best-effort from BCP-47 region)
  GB: '+44',
  IE: '+353',
  US: '+1',
  CA: '+1',
  NG: '+234',
  GH: '+233',
  ZA: '+27',
  KE: '+254',
  UG: '+256',
  TZ: '+255',
  RW: '+250',
  EG: '+20',
  MA: '+212',
  DZ: '+213',
  TN: '+216',
  AE: '+971',
  SA: '+966',
  QA: '+974',
  KW: '+965',
  BH: '+973',
  OM: '+968',
  TR: '+90',
  IL: '+972',
  IN: '+91',
  PK: '+92',
  BD: '+880',
  LK: '+94',
  NP: '+977',
  AU: '+61',
  NZ: '+64',
  SG: '+65',
  MY: '+60',
  ID: '+62',
  PH: '+63',
  TH: '+66',
  VN: '+84',
  JP: '+81',
  KR: '+82',
  CN: '+86',
  HK: '+852',
  TW: '+886',
  FR: '+33',
  DE: '+49',
  ES: '+34',
  IT: '+39',
  NL: '+31',
  BE: '+32',
  CH: '+41',
  AT: '+43',
  SE: '+46',
  NO: '+47',
  DK: '+45',
  FI: '+358',
  PT: '+351',
  PL: '+48',
  CZ: '+420',
  HU: '+36',
  RO: '+40',
  BG: '+359',
  GR: '+30',
  UA: '+380',
  RU: '+7',
  BR: '+55',
  AR: '+54',
  CL: '+56',
  CO: '+57',
  MX: '+52',
  PE: '+51',
}

function extractRegionFromLocaleTag(tag: string): string | null {
  // Examples: en-GB, en-GB-u-ca-gregory, fr_FR, zh-Hant-HK
  const normalised = tag.replace(/_/g, '-')
  const parts = normalised.split('-').filter(Boolean)
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (/^[A-Z]{2}$/.test(p)) return p
    if (/^[a-z]{2}$/.test(p)) return p.toUpperCase()
  }
  return null
}

function detectRegion(): string | null {
  if (typeof window === 'undefined') return null

  // 1) Try timezone first — often closer to “current country” than browser language.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Very common mappings (best-effort; timezone ≠ country but helps in practice)
    const regionFromTz: Record<string, string> = {
      // UK / Ireland
      'Europe/London': 'GB',
      'Europe/Belfast': 'GB',
      'Europe/Dublin': 'IE',
      // Nigeria / Ghana
      'Africa/Lagos': 'NG',
      'Africa/Accra': 'GH',
      // South Africa
      'Africa/Johannesburg': 'ZA',
      // Kenya / Uganda / Tanzania / Rwanda
      'Africa/Nairobi': 'KE',
      'Africa/Kampala': 'UG',
      'Africa/Dar_es_Salaam': 'TZ',
      'Africa/Kigali': 'RW',
      // North Africa
      'Africa/Cairo': 'EG',
      'Africa/Casablanca': 'MA',
      'Africa/Algiers': 'DZ',
      'Africa/Tunis': 'TN',
      // US / Canada (generic)
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      'America/Los_Angeles': 'US',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      // Australia / NZ
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Australia/Perth': 'AU',
      'Pacific/Auckland': 'NZ',
      // India / UAE / Saudi
      'Asia/Kolkata': 'IN',
      'Asia/Dubai': 'AE',
      'Asia/Riyadh': 'SA',
      // Singapore / Malaysia / Indonesia / Philippines / Thailand / Vietnam
      'Asia/Singapore': 'SG',
      'Asia/Kuala_Lumpur': 'MY',
      'Asia/Jakarta': 'ID',
      'Asia/Manila': 'PH',
      'Asia/Bangkok': 'TH',
      'Asia/Ho_Chi_Minh': 'VN',
      // Japan / Korea / China / HK / Taiwan
      'Asia/Tokyo': 'JP',
      'Asia/Seoul': 'KR',
      'Asia/Shanghai': 'CN',
      'Asia/Hong_Kong': 'HK',
      'Asia/Taipei': 'TW',
      // Core Europe
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Europe/Madrid': 'ES',
      'Europe/Rome': 'IT',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Zurich': 'CH',
      'Europe/Vienna': 'AT',
      'Europe/Stockholm': 'SE',
      'Europe/Oslo': 'NO',
      'Europe/Copenhagen': 'DK',
      'Europe/Helsinki': 'FI',
      'Europe/Lisbon': 'PT',
      'Europe/Warsaw': 'PL',
      'Europe/Prague': 'CZ',
      'Europe/Budapest': 'HU',
      'Europe/Bucharest': 'RO',
      'Europe/Sofia': 'BG',
      'Europe/Athens': 'GR',
      'Europe/Kyiv': 'UA',
      'Europe/Moscow': 'RU',
      // LatAm
      'America/Sao_Paulo': 'BR',
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Santiago': 'CL',
      'America/Bogota': 'CO',
      'America/Mexico_City': 'MX',
      'America/Lima': 'PE',
    }
    const region = regionFromTz[tz]
    if (region) return region
  } catch {
    /* ignore */
  }

  const nav = window.navigator as Navigator & { languages?: string[] }
  const candidates: string[] = []
  if (typeof nav.language === 'string') candidates.push(nav.language)
  if (Array.isArray(nav.languages)) candidates.push(...nav.languages)

  for (const tag of candidates) {
    const region = extractRegionFromLocaleTag(tag)
    if (region) return region
  }

  try {
    const resolved = Intl.DateTimeFormat().resolvedOptions().locale
    const region = extractRegionFromLocaleTag(resolved)
    if (region) return region
  } catch {
    /* ignore */
  }

  return null
}

/** Best-effort dialling code from the user's locale (fallback: `+44`). */
export function getDefaultDialCode(): string {
  const region = detectRegion()
  if (region && DIAL_CODE_BY_REGION[region]) return DIAL_CODE_BY_REGION[region]
  return '+44'
}

