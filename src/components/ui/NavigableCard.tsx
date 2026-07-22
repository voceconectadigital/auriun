import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Hub / listing card with three independent links to the same destination:
 * image, title (inside heading), and CTA. Never wraps the whole card in a Link.
 */
export type NavigableCardProps = {
  to: string
  title: string
  description: string
  ctaLabel: string
  /** Pre-built media (img / SegmentCoverImage + veils). Wrapped in a Link when set. */
  media?: ReactNode
  /** Extra classes on the media Link (aspect ratio, etc.). */
  mediaClassName?: string
  headingAs?: 'h2' | 'h3'
  className?: string
  bodyClassName?: string
  /** aria-label on the image Link; defaults to `Ver {title}`. */
  mediaAriaLabel?: string
}

const titleLinkClass =
  'navigable-card__title-link text-inherit no-underline transition-colors duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-brand-blue focus-visible:outline-none focus-visible:text-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'

const mediaLinkClass =
  'navigable-card__media group relative block overflow-hidden bg-brand-navy/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'

const ctaLinkClass =
  'mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'

export function NavigableCard({
  to,
  title,
  description,
  ctaLabel,
  media,
  mediaClassName = 'aspect-[16/10] w-full',
  headingAs = 'h3',
  className = '',
  bodyClassName = '',
  mediaAriaLabel,
}: NavigableCardProps) {
  const Heading = headingAs
  const imageLabel = mediaAriaLabel ?? `Ver ${title}`

  return (
    <article
      className={[
        'navigable-card flex flex-col overflow-hidden border border-brand-line bg-white',
        'transition-[box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:shadow-[0_10px_28px_rgba(7,26,45,0.1)] focus-within:shadow-[0_10px_28px_rgba(7,26,45,0.1)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {media ? (
        <Link
          to={to}
          aria-label={imageLabel}
          className={[mediaLinkClass, mediaClassName].filter(Boolean).join(' ')}
        >
          {media}
        </Link>
      ) : null}
      <div
        className={['flex flex-1 flex-col p-5', bodyClassName]
          .filter(Boolean)
          .join(' ')}
      >
        <Heading className="font-display text-lg font-semibold text-brand-graphite">
          <Link to={to} className={titleLinkClass}>
            {title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate">
          {description}
        </p>
        <Link to={to} className={ctaLinkClass}>
          {ctaLabel}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
