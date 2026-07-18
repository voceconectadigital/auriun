export type ProductItem = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  /** Optional longer H1 for InternalHero; falls back to title */
  heroTitle?: string
  description: string
  introduction: string
  image: string
  imageAlt: string
  applications: string[]
  solutionGroups: string[]
  benefits: string[]
  relatedSegments: string[]
  relatedServices: string[]
  seoTitle: string
  seoDescription: string
  /** Optional DetailCta button label */
  ctaLabel?: string
}

export type ServiceItem = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  /** Optional longer H1 for InternalHero; falls back to title */
  heroTitle?: string
  description: string
  introduction: string
  image: string
  imageAlt: string
  challenges: string[]
  approach: string[]
  benefits: string[]
  mroCapexOpex: string[]
  relatedSegments: string[]
  relatedProducts: string[]
  relatedServices: string[]
  seoTitle: string
  seoDescription: string
  /** Optional DetailCta button label */
  ctaLabel?: string
}

/** CSS object-position values for segment photo framing by layout. */
export type SegmentImageObjectPosition = {
  /** Detail hero (desktop-first, full operation). */
  hero?: string
  /** Horizontal cards (hub grid, etc.). */
  card?: string
  /** Tall / vertical panels (home featured, mega menu). */
  panel?: string
  /** Mobile crops. */
  mobile?: string
}

export type SegmentItem = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  introduction: string
  context: string
  challenges: string[]
  support: string[]
  image: string
  imageAlt: string
  /** Alt for smaller cards; falls back to imageAlt when omitted. */
  cardImageAlt?: string
  imageObjectPosition?: SegmentImageObjectPosition
  relatedProducts: string[]
  relatedServices: string[]
  benefits: string[]
  seoTitle: string
  seoDescription: string
}

export function productPath(slug: string): string {
  return `/solucoes/produtos/${slug}/`
}

export function servicePath(slug: string): string {
  return `/solucoes/servicos/${slug}/`
}

export function segmentPath(slug: string): string {
  return `/segmentos/${slug}/`
}
