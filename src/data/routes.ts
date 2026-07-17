import { SITE } from './site'
import { products } from './products'
import { services } from './services'
import { segments } from './segments'
import { productPath, servicePath, segmentPath } from './types'

export type StaticRoute = {
  path: string
  seoTitle: string
  seoDescription: string
  ogImage?: string
}

export const staticRoutes: StaticRoute[] = [
  {
    path: '/',
    seoTitle: `${SITE.name} | Soluções que mantêm a indústria em movimento`,
    seoDescription: SITE.description,
  },
  {
    path: '/a-auriun/',
    seoTitle: `A Auriun | ${SITE.shortName}`,
    seoDescription:
      'Conheça a Auriun Soluções Industriais: distribuição e integração de soluções para a indústria com atendimento consultivo.',
  },
  {
    path: '/solucoes/',
    seoTitle: `Soluções | ${SITE.shortName}`,
    seoDescription:
      'Produtos e serviços industriais da Auriun: elétrica, automação, instrumentação, MRO, sourcing e supply chain.',
  },
  {
    path: '/segmentos/',
    seoTitle: `Segmentos atendidos | ${SITE.shortName}`,
    seoDescription:
      'Segmentos industriais atendidos pela Auriun: mineração, óleo e gás, energia, manufatura e outros setores estratégicos.',
  },
  {
    path: '/contato/',
    seoTitle: `Contato | ${SITE.shortName}`,
    seoDescription:
      'Entre em contato com a Auriun Soluções Industriais para orçamentos, suporte técnico-comercial e demandas industriais.',
  },
]

export function getAllRoutes(): StaticRoute[] {
  const productRoutes = products.map((item) => ({
    path: productPath(item.slug),
    seoTitle: `${item.seoTitle} | ${SITE.shortName}`,
    seoDescription: item.seoDescription,
    ogImage: item.image,
  }))

  const serviceRoutes = services.map((item) => ({
    path: servicePath(item.slug),
    seoTitle: `${item.seoTitle} | ${SITE.shortName}`,
    seoDescription: item.seoDescription,
    ogImage: item.image,
  }))

  const segmentRoutes = segments.map((item) => ({
    path: segmentPath(item.slug),
    seoTitle: `${item.seoTitle} | ${SITE.shortName}`,
    seoDescription: item.seoDescription,
    ogImage: item.image,
  }))

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...segmentRoutes]
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `https://${SITE.domain}${normalized}`
}
