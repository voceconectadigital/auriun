import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb'
import { SegmentCoverImage } from '@/components/ui/SegmentCoverImage'

type DetailHeroProps = {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  imageObjectPosition?: string
  imageObjectPositionMobile?: string
  fetchPriority?: 'high' | 'low' | 'auto'
  preload?: boolean
  ctaTo?: string
  ctaLabel?: string
}

export function DetailHero({
  crumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageObjectPosition = 'center center',
  imageObjectPositionMobile,
  fetchPriority,
  preload = false,
  ctaTo = '/contato/?assunto=orcamento',
  ctaLabel = 'Solicitar orçamento',
}: DetailHeroProps) {
  const framingStyle = {
    '--segment-pos': imageObjectPosition,
    '--segment-pos-mobile': imageObjectPositionMobile ?? imageObjectPosition,
  } as CSSProperties

  return (
    <section className="border-b border-brand-line bg-brand-mist">
      {preload ? <link rel="preload" as="image" href={image} /> : null}
      <Container className="section-pad grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <Breadcrumb items={crumbs} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,8vw,2.75rem)] font-semibold tracking-tight text-brand-graphite text-balance sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button to={ctaTo} size="lg" className="min-h-13 w-full justify-center sm:w-auto">
              {ctaLabel}
            </Button>
            <Button
              to="/solucoes/"
              variant="ghost"
              size="lg"
              className="min-h-13 w-full justify-center sm:w-auto"
            >
              Ver soluções
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-sm border border-brand-line bg-white bg-brand-navy/10">
          <img
            src={image}
            alt={imageAlt}
            className="segment-framed-img aspect-[16/11] w-full object-cover"
            style={framingStyle}
            width={960}
            height={660}
            loading="eager"
            fetchPriority={fetchPriority}
            decoding="async"
          />
        </div>
      </Container>
    </section>
  )
}

export type RelatedCard = {
  title: string
  description: string
  to: string
  /** When set, renders the image-on-top segment card layout. */
  image?: string
  imageAlt?: string
  imageObjectPosition?: string
  imageObjectPositionMobile?: string
}

const cardEase = 'duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]'

function RelatedImageCard({ item }: { item: RelatedCard }) {
  const image = item.image!
  const alt = item.imageAlt ?? item.title

  return (
    <Link
      to={item.to}
      className={[
        'group flex flex-col overflow-hidden border border-brand-line bg-white',
        'transition-[transform,box-shadow,border-color]',
        cardEase,
        'hover:-translate-y-1 hover:border-brand-blue/55',
        'hover:shadow-[0_14px_32px_-10px_rgba(7,26,45,0.28)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        'active:bg-brand-mist/40',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy/15 md:aspect-video">
        <SegmentCoverImage
          src={image}
          alt={alt}
          className={[
            'size-full object-cover transition-transform',
            cardEase,
            'group-hover:scale-105 group-focus-visible:scale-105',
          ].join(' ')}
          objectPosition={item.imageObjectPosition}
          objectPositionMobile={item.imageObjectPositionMobile}
          width={640}
          height={360}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className={[
            'pointer-events-none absolute inset-0 bg-brand-navy/30 transition-colors',
            cardEase,
            'group-hover:bg-brand-navy/18 group-focus-visible:bg-brand-navy/18',
          ].join(' ')}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={[
            'font-display text-lg font-semibold text-brand-graphite transition-colors',
            cardEase,
            'group-hover:text-brand-blue group-focus-visible:text-brand-blue',
          ].join(' ')}
        >
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
          Conhecer
          <ArrowRight
            className={[
              'size-3.5 transition-transform',
              cardEase,
              'group-hover:translate-x-1 group-focus-visible:translate-x-1',
            ].join(' ')}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  )
}

function RelatedTextCard({ item }: { item: RelatedCard }) {
  return (
    <Link
      to={item.to}
      className="group border border-brand-line bg-white p-5 transition hover:border-brand-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <h3 className="font-display text-lg font-semibold text-brand-graphite group-hover:text-brand-blue">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-slate">
        {item.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
        Conhecer
        <ArrowRight
          className="size-3.5 transition group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  )
}

export function RelatedGrid({
  title,
  items,
}: {
  title: string
  items: RelatedCard[]
}) {
  if (!items.length) return null
  return (
    <section className="section-pad">
      <Container>
        <h2 className="font-display text-2xl font-semibold text-brand-graphite sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) =>
            item.image ? (
              <RelatedImageCard key={item.to} item={item} />
            ) : (
              <RelatedTextCard key={item.to} item={item} />
            ),
          )}
        </div>
      </Container>
    </section>
  )
}

export function DetailCta({
  title,
  description,
  to = '/contato/?assunto=orcamento',
  label = 'Solicitar orçamento',
}: {
  title: string
  description: string
  to?: string
  label?: string
}) {
  return (
    <section className="section-pad bg-brand-graphite">
      <Container className="flex w-full flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.5rem,6vw,1.875rem)] font-semibold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-[1.65] text-white/70 sm:text-base">
            {description}
          </p>
        </div>
        <Button to={to} size="lg" className="min-h-13 w-full shrink-0 justify-center md:w-auto">
          {label}
        </Button>
      </Container>
    </section>
  )
}
