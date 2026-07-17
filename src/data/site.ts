/**
 * Contatos e canais — preencha quando os dados reais estiverem disponíveis.
 * Valores vazios ou com prefixo PLACEHOLDER não são exibidos na interface.
 */
export const CONTACT = {
  phone: '', // PLACEHOLDER: ex. '(31) 0000-0000'
  email: '', // PLACEHOLDER: ex. 'comercial@auriun.com.br'
  whatsapp: '', // PLACEHOLDER: apenas dígitos com DDI, ex. '5531999999999'
  address: '', // PLACEHOLDER: endereço completo
  mapsUrl: '', // PLACEHOLDER: URL do Google Maps
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

export function hasValue(value: string | undefined | null): boolean {
  if (!value) return false
  return !value.toUpperCase().includes('PLACEHOLDER') && value.trim().length > 0
}

export function whatsappUrl(message?: string): string | null {
  if (!hasValue(CONTACT.whatsapp)) return null
  const text = encodeURIComponent(
    message ??
      'Olá! Gostaria de solicitar um orçamento com a Auriun Soluções Industriais.',
  )
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`
}

export function telHref(): string | null {
  if (!hasValue(CONTACT.phone)) return null
  const digits = CONTACT.phone.replace(/\D/g, '')
  return digits ? `tel:+${digits.startsWith('55') ? digits : `55${digits}`}` : null
}

export function mailHref(): string | null {
  if (!hasValue(CONTACT.email)) return null
  return `mailto:${CONTACT.email}`
}
