import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { DetailCta, RelatedGrid } from '@/components/ui/DetailSections'
import { InternalHero } from '@/components/ui/InternalHero'
import {
  breadcrumbJsonLd,
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { getProductBySlug, productPath } from '@/data/products'
import { getSegmentBySlug, toSegmentRelatedCard } from '@/data/segments'
import { getServiceBySlug, services, servicePath } from '@/data/services'
import { SITE } from '@/data/site'
import type { ServiceItem } from '@/data/types'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <NotFoundPage />
  return <ServiceDetailContent service={service} />
}

function ServiceDetailContent({ service }: { service: ServiceItem }) {
  const path = servicePath(service.slug)
  useDocumentSeo({
    title: `${service.seoTitle} | ${SITE.shortName}`,
    description: service.seoDescription,
    path,
    image: service.image,
  })

  const relatedSegments = service.relatedSegments
    .map((s) => getSegmentBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map(toSegmentRelatedCard)

  const relatedProducts = service.relatedProducts
    .map((s) => getProductBySlug(s))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      to: productPath(s!.slug),
    }))

  const relatedServices = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      to: servicePath(s!.slug),
    }))

  const otherServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 6)
    .map((s) => ({
      title: s.title,
      description: s.description,
      to: servicePath(s.slug),
    }))

  const paragraphs = service.introduction.split('\n\n')

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Soluções', path: '/solucoes/' },
            { name: service.title, path },
          ]),
        ]}
      />
      <InternalHero
        variant="service"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Soluções', to: '/solucoes/' },
          { label: 'Serviços', to: '/solucoes/#servicos' },
          { label: service.shortTitle },
        ]}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.description}
        image={service.image}
        imageAlt={service.imageAlt}
        primaryCta={{ to: '/contato/?assunto=orcamento', label: 'Conversar com a equipe' }}
        secondaryCta={{ to: '/solucoes/', label: 'Ver soluções' }}
      />

      <section className="section-pad">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              O que é este serviço
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-slate">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-brand-mist">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Desafios que ajuda a resolver
            </h2>
            <ul className="mt-5 space-y-3">
              {service.challenges.map((item) => (
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
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Como a Auriun atua
            </h2>
            <ol className="mt-5 space-y-3">
              {service.approach.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm text-brand-slate">
                  <span className="font-display text-base font-semibold text-brand-orange">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Benefícios para o cliente
            </h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-brand-slate">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Aplicações em MRO, CAPEX e OPEX
            </h2>
            <ul className="mt-5 space-y-3">
              {service.mroCapexOpex.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-brand-green bg-brand-mist/80 px-4 py-3 text-sm text-brand-graphite"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <RelatedGrid title="Segmentos relacionados" items={relatedSegments} />
      <RelatedGrid title="Produtos relacionados" items={relatedProducts} />
      <DetailCta
        title="Converse com a equipe Auriun"
        description="Descreva o desafio de suprimentos, sourcing ou projeto. Retornamos com uma leitura objetiva do escopo."
        label="Falar com a equipe"
      />
      <RelatedGrid
        title="Outros serviços relacionados"
        items={relatedServices.length ? relatedServices : otherServices}
      />
    </>
  )
}
