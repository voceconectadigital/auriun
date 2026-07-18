/**
 * Contatos e canais — dados provisórios para validação de layout.
 * TODO: substituir pelos contatos oficiais antes do deploy final.
 * Enquanto `isIllustrative` for true, NÃO incluir em JSON-LD, metadados ou SEO.
 */
export const CONTACT = {
  /** Display: (31) 3333-0000 → tel:+553133330000 */
  phone: '(31) 3333-0000',
  /** Display + mailto */
  email: 'comercial@auriun.com.br',
  /** Display: (31) 99999-0000 → wa.me/5531999990000 */
  whatsapp: '(31) 99999-0000',
  /** Cidade/UF apenas — sem rua fictícia */
  address: 'Belo Horizonte — Minas Gerais',
  mapsUrl: '',
  /** true = dados ilustrativos; Contact page mostra; Footer/JSON-LD/SEO ocultam */
  isIllustrative: true,
} as const

export const SOCIAL = {
  linkedin: '', // PLACEHOLDER
  instagram: '', // PLACEHOLDER
} as const

export const SITE = {
  name: 'Auriun Soluções Industriais',
  shortName: 'Auriun',
  domain: 'auriun.com.br',
  tagline: 'Soluções robustas | Resultados extraordinários',
  valueProposition:
    'Soluções industriais que conectam eficiência, tecnologia e continuidade operacional.',
  description:
    'Distribuidora e integradora de soluções para o setor industrial: materiais elétricos, automação, instrumentação, tecnologia e suprimentos estratégicos.',
  topbarMessage: 'Atendimento consultivo para a indústria em todo o Brasil',
} as const

/** Caminho público único da marca — usar em Logo, SEO e JSON-LD. */
export const BRAND_LOGO = {
  src: '/aurion-logo-3d-shadow.webp',
  width: 260,
  height: 195,
  alt: 'Auriun Soluções Industriais',
} as const

const DEFAULT_WA_MESSAGE =
  'Olá! Encontrei a Auriun pelo site e gostaria de mais informações.'

export function hasValue(value: string | undefined | null): boolean {
  if (!value) return false
  return !value.toUpperCase().includes('PLACEHOLDER') && value.trim().length > 0
}

/** Contato público (Footer / JSON-LD / SEO) — ignora dados ilustrativos. */
export function isPublicContact(): boolean {
  return !CONTACT.isIllustrative
}

function toE164Digits(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  return digits.startsWith('55') ? digits : `55${digits}`
}

export function whatsappUrl(message?: string): string | null {
  if (!hasValue(CONTACT.whatsapp)) return null
  const digits = toE164Digits(CONTACT.whatsapp)
  if (!digits) return null
  const text = encodeURIComponent(message ?? DEFAULT_WA_MESSAGE)
  return `https://wa.me/${digits}?text=${text}`
}

export function telHref(): string | null {
  if (!hasValue(CONTACT.phone)) return null
  const digits = toE164Digits(CONTACT.phone)
  return digits ? `tel:+${digits}` : null
}

export function mailHref(): string | null {
  if (!hasValue(CONTACT.email)) return null
  return `mailto:${CONTACT.email}`
}
