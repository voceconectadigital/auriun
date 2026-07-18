import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
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

const relatedTitleLinkClass = 'related-card__title-link'

const relatedCtaLinkClass = 'related-card__cta'

function RelatedImageCard({ item }: { item: RelatedCard }) {
  const image = item.image!
  const slug = relatedSlug(item)
  const mediaLabel = `Ver ${item.title}`

  return (
    <article
      id={`related-${slug}`}
      data-related-slug={slug}
      className="related-card related-card--image group"
    >
      <Link
        to={item.to}
        aria-label={mediaLabel}
        className="related-card__media related-card__media-link"
      >
        <SegmentCoverImage
          src={image}
          alt={item.imageAlt ?? ''}
          className="related-card__photo"
          objectPosition={item.imageObjectPosition}
          objectPositionMobile={item.imageObjectPositionMobile}
          width={640}
          height={360}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="related-card__media-veil" aria-hidden />
      </Link>
      <div className="related-card__body">
        <span className="related-card__accent" aria-hidden />
        <div className="related-card__content">
          <h3 className="related-card__title">
            <Link to={item.to} className={relatedTitleLinkClass}>
              {item.title}
            </Link>
          </h3>
          <p className="related-card__desc">{item.description}</p>
          <Link to={item.to} className={relatedCtaLinkClass}>
            Conhecer
            <ArrowRight className="related-card__arrow size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}

function RelatedTextCard({ item }: { item: RelatedCard }) {
  const slug = relatedSlug(item)

  return (
    <article
      id={`related-${slug}`}
      data-related-slug={slug}
      className="related-card related-card--text group"
    >
      <span className="related-card__accent" aria-hidden />
      <RelatedWatermark slug={slug} />
      <div className="related-card__content">
        <h3 className="related-card__title">
          <Link to={item.to} className={relatedTitleLinkClass}>
            {item.title}
          </Link>
        </h3>
        <p className="related-card__desc">{item.description}</p>
        <Link to={item.to} className={relatedCtaLinkClass}>
          Conhecer
          <ArrowRight className="related-card__arrow size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

export function RelatedGrid({
  eyebrow,
  title,
  items,
  variant = 'major',
}: {
  eyebrow?: string
  title: string
  items: RelatedCard[]
  /** Related card grids default to `major` (dash + dot + eyebrow). */
  variant?: 'major' | 'compact'
}) {
  if (!items.length) return null
  return (
    <section className="section-pad">
      <Container>
        <SectionHeading variant={variant} eyebrow={eyebrow} title={title} />
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
  to = '/solicitar-orcamento/',
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
