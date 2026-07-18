import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SegmentCoverImage } from '@/components/ui/SegmentCoverImage'
import {
  resolveRelatedIcon,
  slugFromRelatedTo,
} from '@/data/relatedIcons'

/**
 * Detail page body sections only.
 *
 * Heroes: import InternalHero from `@/components/ui/InternalHero`
 * (`data-testid="internal-page-hero"`). Do NOT recreate DetailHero /
 * PageHero / bg-brand-mist + isolated image-card heroes here.
 */

export type RelatedCard = {
  title: string
  description: string
  to: string
  /** Explicit slug; when omitted, derived from `to`. */
  slug?: string
  /** When set, renders the image-on-top segment card layout. */
  image?: string
  imageAlt?: string
  imageObjectPosition?: string
  imageObjectPositionMobile?: string
}

function relatedSlug(item: RelatedCard): string {
  return item.slug?.trim() || slugFromRelatedTo(item.to)
}

function RelatedWatermark({
  slug,
  className = '',
}: {
  slug: string
  className?: string
}) {
  const { Icon, usedFallback } = resolveRelatedIcon(slug)
  return (
    <Icon
      className={['related-card__watermark', className].filter(Boolean).join(' ')}
      strokeWidth={1.15}
      aria-hidden
      data-related-icon={slug}
      data-related-icon-fallback={usedFallback ? 'true' : 'false'}
    />
  )
}

function RelatedImageCard({ item }: { item: RelatedCard }) {
  const image = item.image!
  const slug = relatedSlug(item)
  const label = `Conhecer ${item.title}`

  return (
    <Link
      to={item.to}
      id={`related-${slug}`}
      data-related-slug={slug}
      aria-label={label}
      className="related-card related-card--image group"
    >
      <div className="related-card__media">
        <SegmentCoverImage
          src={image}
          alt=""
          className="related-card__photo"
          objectPosition={item.imageObjectPosition}
          objectPositionMobile={item.imageObjectPositionMobile}
          width={640}
          height={360}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="related-card__media-veil" aria-hidden />
      </div>
      <div className="related-card__body">
        <span className="related-card__accent" aria-hidden />
        <div className="related-card__content">
          <h3 className="related-card__title">{item.title}</h3>
          <p className="related-card__desc">{item.description}</p>
          <span className="related-card__cta" aria-hidden>
            Conhecer
            <ArrowRight className="related-card__arrow size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}

function RelatedTextCard({ item }: { item: RelatedCard }) {
  const slug = relatedSlug(item)
  const label = `Conhecer ${item.title}`

  return (
    <Link
      to={item.to}
      id={`related-${slug}`}
      data-related-slug={slug}
      aria-label={label}
      className="related-card related-card--text group"
    >
      <span className="related-card__accent" aria-hidden />
      <RelatedWatermark slug={slug} />
      <div className="related-card__content">
        <h3 className="related-card__title">{item.title}</h3>
        <p className="related-card__desc">{item.description}</p>
        <span className="related-card__cta" aria-hidden>
          Conhecer
          <ArrowRight className="related-card__arrow size-3.5" aria-hidden />
        </span>
      </div>
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
        <div className="related-grid mt-8">
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
