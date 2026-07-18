import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { InternalHero } from '@/components/ui/InternalHero'
import { NavigableCard } from '@/components/ui/NavigableCard'
import { SegmentCoverImage } from '@/components/ui/SegmentCoverImage'
import {
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { segments, segmentPath } from '@/data/segments'
import { SITE } from '@/data/site'

export function SegmentsPage() {
  const hubCover = segments[0]

  useDocumentSeo({
    title: `Segmentos atendidos | ${SITE.shortName}`,
    description:
      'Segmentos industriais atendidos pela Auriun: mineração, óleo e gás, energia, manufatura e outros setores estratégicos.',
    path: '/segmentos/',
    image: hubCover?.image,
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <InternalHero
        variant="hub"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Segmentos' },
        ]}
        eyebrow="Segmentos"
        title="Mercados estratégicos atendidos"
        image={hubCover.image}
        imageAlt={hubCover.imageAlt}
        imagePosition={hubCover.imageObjectPosition?.hero ?? 'center center'}
        imagePositionMobile={hubCover.imageObjectPosition?.mobile}
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map((item) => {
              const to = segmentPath(item.slug)
              return (
                <NavigableCard
                  key={item.slug}
                  to={to}
                  title={item.title}
                  description={item.description}
                  ctaLabel="Conhecer segmento"
                  headingAs="h2"
                  mediaClassName="relative aspect-[4/3] w-full md:aspect-video"
                  media={
                    <>
                      <SegmentCoverImage
                        src={item.image}
                        alt={item.cardImageAlt ?? item.imageAlt}
                        className="size-full object-cover"
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
                        className="pointer-events-none absolute inset-0 bg-brand-navy/25 transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-brand-navy/15"
                        aria-hidden
                      />
                    </>
                  }
                />
              )
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/solicitar-orcamento/" size="lg">
              Solicitar orçamento
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
