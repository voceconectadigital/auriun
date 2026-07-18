/**
 * CANONICAL internal page hero (aka InternalPageHero).
 *
 * This is the ONLY allowed premium hero for hubs and detail templates.
 * Do NOT reintroduce DetailHero / PageHero / mist+card layouts.
 * Home uses `src/components/home/Hero.tsx` — never this component.
 *
 * CTAs and supporting body copy belong outside this hero
 * (header, content sections, final CTAs, forms, SEO meta).
 */
import type { CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb'

export type InternalHeroVariant =
  | 'institutional'
  | 'product'
  | 'service'
  | 'segment'
  | 'contact'
  | 'hub'

type InternalHeroProps = {
  eyebrow: string
  title: string
  crumbs?: Crumb[]
  image: string
  imageAlt: string
  imagePosition?: string
  imagePositionMobile?: string
  variant?: InternalHeroVariant
  fetchPriority?: 'high' | 'low' | 'auto'
  preload?: boolean
}

export function InternalHero({
  eyebrow,
  title,
  crumbs,
  image,
  imageAlt,
  imagePosition = 'center center',
  imagePositionMobile,
  variant = 'hub',
  fetchPriority = 'high',
  preload = true,
}: InternalHeroProps) {
  const framingStyle = {
    '--internal-hero-pos': imagePosition,
    '--internal-hero-pos-mobile': imagePositionMobile ?? imagePosition,
  } as CSSProperties

  return (
    <section
      className="internal-hero relative isolate overflow-hidden bg-brand-navy text-white"
      data-testid="internal-page-hero"
      data-hero-variant={variant}
    >
      {preload ? <link rel="preload" as="image" href={image} /> : null}

      {/* Photographic plane — right-weighted on desktop, full-bleed on mobile */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={image}
          alt={imageAlt}
          className="internal-hero-image absolute inset-0 size-full object-cover"
          style={framingStyle}
          width={1600}
          height={900}
          loading="eager"
          fetchPriority={fetchPriority}
          decoding="async"
        />
        <div className="internal-hero-scrim absolute inset-0" aria-hidden />
        <div className="internal-hero-glow absolute inset-0" aria-hidden />
        <div className="internal-hero-lines absolute inset-0" aria-hidden />
      </div>

      <Container className="relative z-[1] flex min-h-[auto] flex-col justify-end pb-11 pt-10 sm:pb-12 sm:pt-12 lg:min-h-[540px] lg:justify-center lg:pb-14 lg:pt-14">
        <div className="max-w-xl lg:max-w-[48%]">
          {crumbs?.length ? (
            <div className="mb-4 sm:mb-5">
              <Breadcrumb items={crumbs} tone="dark" />
            </div>
          ) : null}

          <p className="internal-hero-eyebrow inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
            <span className="h-px w-7 shrink-0 bg-brand-orange" aria-hidden />
            {eyebrow}
          </p>

          <h1 className="internal-hero-title mt-3 font-display text-balance text-white sm:mt-4">
            {title}
          </h1>
        </div>
      </Container>

      {/* Planned seam into following light content */}
      <div className="internal-hero-edge relative z-[2]" aria-hidden>
        <div className="brand-hairline h-px w-full opacity-90" />
      </div>
    </section>
  )
}

/** Alias kept for discoverability — same canonical component. */
export const InternalPageHero = InternalHero
