import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { DetailCta, RelatedGrid } from '@/components/ui/DetailSections'
import { InternalHero } from '@/components/ui/InternalHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  breadcrumbJsonLd,
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { getProductBySlug, products, productPath } from '@/data/products'
import { getSegmentBySlug, toSegmentRelatedCard } from '@/data/segments'
import { getServiceBySlug, servicePath } from '@/data/services'
import { SITE } from '@/data/site'
import type { ProductItem } from '@/data/types'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFoundPage />
  return <ProductDetailContent product={product} />
}

function ProductDetailContent({ product }: { product: ProductItem }) {
  const path = productPath(product.slug)
  useDocumentSeo({
    title: `${product.seoTitle} | ${SITE.shortName}`,
    description: product.seoDescription,
    path,
    image: product.image,
  })

  const relatedSegments = product.relatedSegments
    .map((s) => getSegmentBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map(toSegmentRelatedCard)

  const relatedServices = product.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      to: servicePath(s!.slug),
    }))

  const otherProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 6)
    .map((p) => ({
      title: p.title,
      description: p.description,
      to: productPath(p.slug),
    }))

  const paragraphs = product.introduction.split('\n\n')

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Soluções', path: '/solucoes/' },
            { name: product.title, path },
          ]),
        ]}
      />
      <InternalHero
        variant="product"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Soluções', to: '/solucoes/' },
          { label: 'Produtos', to: '/solucoes/#produtos' },
          { label: product.shortTitle },
        ]}
        eyebrow={product.eyebrow}
        title={product.title}
        image={product.image}
        imageAlt={product.imageAlt}
      />

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Apresentação da categoria" />
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-slate">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Principais aplicações" />
            <ul className="mt-4 space-y-2">
              {product.applications.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-brand-orange bg-brand-mist/70 px-4 py-2.5 text-sm text-brand-graphite"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-brand-mist">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Soluções e grupos fornecidos" />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.solutionGroups.map((item) => (
                <li
                  key={item}
                  className="border border-brand-line bg-white px-4 py-3 text-sm text-brand-graphite"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Benefícios para a operação" />
            <ul className="mt-5 space-y-3">
              {product.benefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-brand-slate">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <RelatedGrid
        variant="major"
        eyebrow="Mercados atendidos"
        title="Setores que demandam esta categoria"
        items={relatedSegments}
      />
      <RelatedGrid
        variant="major"
        eyebrow="Suporte complementar"
        title="Serviços que potencializam o fornecimento"
        items={relatedServices}
      />
      <DetailCta
        title="Solicite uma cotação para esta categoria"
        description="Envie a especificação, a lista de materiais ou o contexto da demanda. Nossa equipe analisa o escopo e retorna com orientação técnica e comercial."
      />
      <RelatedGrid
        variant="major"
        eyebrow="Portfólio técnico"
        title="Outras linhas de fornecimento"
        items={otherProducts}
      />
    </>
  )
}
