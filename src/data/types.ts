export type ProductItem = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
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
}

export type ServiceItem = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
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
