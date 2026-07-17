import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import {
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { segments, segmentPath } from '@/data/segments'
import { SITE } from '@/data/site'

export function SegmentsPage() {
  useDocumentSeo({
    title: `Segmentos atendidos | ${SITE.shortName}`,
    description:
      'Segmentos industriais atendidos pela Auriun: mineração, óleo e gás, energia, manufatura e outros setores estratégicos.',
    path: '/segmentos/',
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <section className="border-b border-brand-line bg-brand-mist">
        <Container className="section-pad py-16 md:py-20">
          <SectionHeading
            eyebrow="Segmentos"
            title="Mercados estratégicos atendidos"
            description="Conheça os setores em que a Auriun está preparada para apoiar operações com fornecimento técnico e atendimento consultivo."
            as="h1"
          />
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col overflow-hidden border border-brand-line bg-white"
              >
                <img
                  src={item.image}
                  alt={item.cardImageAlt ?? item.imageAlt}
                  className="segment-framed-img aspect-[16/10] w-full object-cover"
                  style={
                    item.imageObjectPosition?.card
                      ? ({
                          '--segment-pos': item.imageObjectPosition.card,
                          '--segment-pos-mobile':
                            item.imageObjectPosition.mobile ??
                            item.imageObjectPosition.card,
                        } as CSSProperties)
                      : undefined
                  }
                  loading="lazy"
                  width={640}
                  height={400}
                />
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-lg font-semibold text-brand-graphite">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">
                    {item.description}
                  </p>
                  <Link
                    to={segmentPath(item.slug)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange hover:text-brand-blue"
                  >
                    Conhecer segmento
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/contato/?assunto=orcamento" size="lg">
              Solicitar orçamento
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
