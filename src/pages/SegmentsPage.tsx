import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { SegmentCoverImage } from '@/components/ui/SegmentCoverImage'
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
    image: segments[0]?.image,
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
              <Link
                key={item.slug}
                to={segmentPath(item.slug)}
                className={[
                  'group flex flex-col overflow-hidden border border-brand-line bg-white',
                  'transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'hover:-translate-y-1 hover:border-brand-blue/55',
                  'hover:shadow-[0_14px_32px_-10px_rgba(7,26,45,0.28)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                  'active:bg-brand-mist/40',
                ].join(' ')}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/15 md:aspect-video">
                  <SegmentCoverImage
                    src={item.image}
                    alt={item.cardImageAlt ?? item.imageAlt}
                    className="size-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-focus-visible:scale-105"
                    objectPosition={item.imageObjectPosition?.card}
                    objectPositionMobile={
                      item.imageObjectPosition?.mobile ??
                      item.imageObjectPosition?.card
                    }
                    width={640}
                    height={360}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-brand-navy/25 transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-brand-navy/15 group-focus-visible:bg-brand-navy/15"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-lg font-semibold text-brand-graphite transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-brand-blue group-focus-visible:text-brand-blue">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                    Conhecer segmento
                    <ArrowRight
                      className="size-3.5 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
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
