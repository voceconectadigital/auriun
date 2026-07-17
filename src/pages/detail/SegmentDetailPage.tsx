import { useParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import {
  DetailCta,
  DetailHero,
  RelatedGrid,
} from '@/components/ui/DetailSections'
import {
  breadcrumbJsonLd,
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { getProductBySlug, productPath } from '@/data/products'
import { getSegmentBySlug, segments, segmentPath } from '@/data/segments'
import { getServiceBySlug, servicePath } from '@/data/services'
import { SITE } from '@/data/site'
import type { SegmentItem } from '@/data/types'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function SegmentDetailPage() {
  const { slug = '' } = useParams()
  const segment = getSegmentBySlug(slug)
  if (!segment) return <NotFoundPage />
  return <SegmentDetailContent segment={segment} />
}

function SegmentDetailContent({ segment }: { segment: SegmentItem }) {
  const path = segmentPath(segment.slug)
  useDocumentSeo({
    title: `${segment.seoTitle} | ${SITE.shortName}`,
    description: segment.seoDescription,
    path,
    image: segment.image,
  })

  const relatedProducts = segment.relatedProducts
    .map((s) => getProductBySlug(s))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      to: productPath(s!.slug),
    }))

  const relatedServices = segment.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean)
    .map((s) => ({
      title: s!.title,
      description: s!.description,
      to: servicePath(s!.slug),
    }))

  const otherSegments = segments
    .filter((s) => s.slug !== segment.slug)
    .slice(0, 6)
    .map((s) => ({
      title: s.title,
      description: s.description,
      to: segmentPath(s.slug),
    }))

  const paragraphs = segment.introduction.split('\n\n')

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Segmentos', path: '/segmentos/' },
            { name: segment.title, path },
          ]),
        ]}
      />
      <DetailHero
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Segmentos', to: '/segmentos/' },
          { label: segment.shortTitle },
        ]}
        eyebrow={segment.eyebrow}
        title={segment.title}
        description={segment.description}
        image={segment.image}
        imageAlt={segment.imageAlt}
        ctaLabel="Solicitar uma solução"
      />

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Contexto do segmento
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-slate">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <p>{segment.context}</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Desafios típicos do setor
            </h2>
            <ul className="mt-5 space-y-3">
              {segment.challenges.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-brand-orange bg-brand-mist/70 px-4 py-3 text-sm text-brand-graphite"
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
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Como a Auriun pode apoiar
            </h2>
            <ul className="mt-5 space-y-3">
              {segment.support.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-brand-slate">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Benefícios do atendimento consultivo
            </h2>
            <ul className="mt-5 space-y-3">
              {segment.benefits.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-brand-slate">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <RelatedGrid title="Produtos aplicáveis" items={relatedProducts} />
      <RelatedGrid title="Serviços aplicáveis" items={relatedServices} />
      <DetailCta
        title="Solicite uma solução para este segmento"
        description="Conte o contexto operacional e os materiais ou serviços necessários. A equipe Auriun analisa o escopo com visão técnica e comercial."
        label="Solicitar uma solução"
      />
      <RelatedGrid title="Outros segmentos atendidos" items={otherSegments} />
    </>
  )
}
