/**
 * Contatos e canais oficiais da Auriun.
 * Fonte única para página Contato, Footer, WhatsApp FAB e JSON-LD.
 */
export type ContactRegionId = 'es' | 'mg'

export type ContactRegion = {
  id: ContactRegionId
  /** Painel Contato — ex.: "Atendimento Espírito Santo" */
  label: string
  /** Footer compacto — ex.: "ES" */
  shortLabel: string
  /** Display: (27) 2180-2327 */
  phone: string
  /** WhatsApp da região — vazio quando o canal não é oferecido */
  whatsapp: string
}

export type ContactAddress = {
  street: string
  complement: string
  district: string
  city: string
  state: string
  postalCode: string
  /** Footer / listagens — inclui cobertura BH (não é endereço físico) */
  short: string
  /** Rótulo da nota de cobertura na página Contato */
  serviceAreaLabel: string
  /** Nota de atendimento em BH — nunca tratar como PostalAddress */
  serviceAreaNote: string
  /** Linhas para a página Contato (apenas unidade Serra) */
  lines: readonly string[]
}

export const CONTACT = {
  email: 'auriun@auriun.com.br',
  /** WhatsApp / tel principal do site (unidade ES) */
  primaryRegionId: 'es' as ContactRegionId,
  regions: [
    {
      id: 'es',
      label: 'Atendimento Espírito Santo',
      shortLabel: 'ES',
      phone: '(27) 2180-2327',
      whatsapp: '(27) 2180-2327',
    },
    {
      id: 'mg',
      label: 'Atendimento Minas Gerais',
      shortLabel: 'MG',
      phone: '(31) 3181-4897',
      whatsapp: '',
    },
  ] as const satisfies readonly ContactRegion[],
  address: {
    street: 'Rua Comendador Alcides Simão Helou, nº 1030',
    complement: 'Box 34 – Bloco 03 – Quadra 13 – Lote 003',
    district: 'Bairro Civit II',
    city: 'Serra',
    state: 'ES',
    postalCode: '29168-090',
    short: 'Serra – ES · Atendimento também em Belo Horizonte – MG',
    serviceAreaLabel: 'Área de atendimento',
    serviceAreaNote: 'Atendimento também em Belo Horizonte – MG',
    lines: [
      'Rua Comendador Alcides Simão Helou, nº 1030',
      'Box 34 – Bloco 03 – Quadra 13 – Lote 003',
      'Bairro Civit II',
      'Serra – ES',
      'CEP 29168-090',
    ],
  } as const satisfies ContactAddress,
  mapsUrl: '',
  /** false = dados oficiais — exibir em Footer, FAB, JSON-LD e SEO */
  isIllustrative: false,
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
  'Olá! Vim pelo site da Auriun e gostaria de mais informações.'

export function hasValue(value: string | undefined | null): boolean {
  if (!value) return false
  return !value.toUpperCase().includes('PLACEHOLDER') && value.trim().length > 0
}

/** Contato público (Footer / JSON-LD / SEO) — ignora dados ilustrativos. */
export function isPublicContact(): boolean {
  return !CONTACT.isIllustrative
}

export function getContactRegion(id: ContactRegionId): ContactRegion {
  const region = CONTACT.regions.find((item) => item.id === id)
  if (!region) {
    throw new Error(`Contact region not found: ${id}`)
  }
  return region
}

export function getPrimaryRegion(): ContactRegion {
  return getContactRegion(CONTACT.primaryRegionId)
}

function toE164Digits(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  return digits.startsWith('55') ? digits : `55${digits}`
}

export function telHref(phone?: string): string | null {
  const raw = phone ?? getPrimaryRegion().phone
  if (!hasValue(raw)) return null
  const digits = toE164Digits(raw)
  return digits ? `tel:+${digits}` : null
}

export function whatsappUrl(message?: string, whatsapp?: string): string | null {
  const raw = whatsapp ?? getPrimaryRegion().whatsapp
  if (!hasValue(raw)) return null
  const digits = toE164Digits(raw)
  if (!digits) return null
  const text = encodeURIComponent(message ?? DEFAULT_WA_MESSAGE)
  return `https://wa.me/${digits}?text=${text}`
}

export function mailHref(): string | null {
  if (!hasValue(CONTACT.email)) return null
  return `mailto:${CONTACT.email}`
}
