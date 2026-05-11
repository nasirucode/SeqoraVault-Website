import sanitizeHtml from 'sanitize-html'

/** Tags Quill + Bootstrap-style job specs often emit (tables, lists, headings). */
const EXTRA_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'div',
  'img',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'colgroup',
  'col',
] as const

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, ...EXTRA_TAGS],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class', 'style'],
    a: ['href', 'target', 'rel', 'class', 'style'],
    span: ['class', 'style'],
    p: ['class', 'style'],
    li: ['class', 'style', 'data-list'],
    div: ['class', 'style'],
    td: ['class', 'style', 'data-row', 'colspan', 'rowspan'],
    th: ['class', 'style', 'data-row', 'colspan', 'rowspan'],
    tr: ['class', 'style'],
    table: ['class', 'style'],
    thead: ['class', 'style'],
    tbody: ['class', 'style'],
    img: ['src', 'alt', 'width', 'height', 'class', 'style'],
  },
  /** Quill / table specs use rgb(), backgrounds, widths */
  allowedStyles: {
    '*': {
      color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(/, /^rgba\(/],
      'background-color': [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(/, /^rgba\(/],
      'text-align': [/^(left|right|center|justify)$/],
      width: [/^\d+(?:px|%|em|rem)$/],
      'font-weight': [/^\d+$/, /^(bold|normal|bolder|lighter)$/],
      'font-style': [/^(italic|normal)$/],
      'vertical-align': [/^(top|middle|bottom|baseline)$/],
    },
  },
  allowedSchemes: ['http', 'https', 'mailto'],
}

/** Sanitize ERPNext / Quill HTML for safe rendering. */
export function sanitizeQuillHtml(dirty: string | null | undefined): string {
  if (!dirty || typeof dirty !== 'string') return ''
  return sanitizeHtml(dirty, SANITIZE_OPTIONS)
}

/** Plain-text excerpt for listing cards (strips tags). */
export function excerptFromHtml(html: string | null | undefined, maxLen = 220): string {
  if (!html) return ''
  const plain = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
  const text = plain.replace(/\s+/g, ' ').trim()
  if (text.length <= maxLen) return text
  return `${text.slice(0, maxLen - 1)}…`
}
