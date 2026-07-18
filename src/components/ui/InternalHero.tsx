/**
 * CANONICAL internal page hero (aka InternalPageHero).
 *
 * This is the ONLY allowed premium hero for hubs and detail templates.
 * Do NOT reintroduce DetailHero / PageHero / mist+card layouts.
 * Home uses `src/components/home/Hero.tsx` — never this component.
 */
import { ArrowRight } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb'

export type InternalHeroVariant =
  | 'institutional'
  | 'product'
  | 'service'
  | 'segment'
  | 'contact'
  | 'hub'

export type InternalHeroCta = {
  to: string
  label: string
}

export type InternalHeroHighlight = {
  label: string
  value?: string
}

type InternalHeroProps = {
  eyebrow: string
  title: string
  description: string
  crumbs?: Crumb[]
  primaryCta?: InternalHeroCta
  secondaryCta?: InternalHeroCta | null
  image: string
  imageAlt: string
  imagePosition?: string
  imagePositionMobile?: string
  variant?: InternalHeroVariant
  highlights?: InternalHeroHighlight[]
  fetchPriority?: 'high' | 'low' | 'auto'
  preload?: boolean
  children?: ReactNode
}

const DEFAULT_PRIMARY: InternalHeroCta = {
  to: '/contato/?assunto=orcamento',
  label: 'Solicitar orçamento',
}

const DEFAULT_SECONDARY: InternalHeroCta = {
  to: '/solucoes/',
  label: 'Ver soluções',
}

export function InternalHero({
  eyebrow,
  title,
  description,
  crumbs,
  primaryCta = DEFAULT_PRIMARY,
  secondaryCta = DEFAULT_SECONDARY,
  image,
  imageAlt,
  imagePosition = 'center center',
  imagePositionMobile,
  variant = 'hub',
  highlights,
  fetchPriority = 'high',
  preload = true,
  children,
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

      <Container className="relative z-[1] flex min-h-[auto] flex-col justify-end pb-14 pt-10 sm:pb-16 sm:pt-12 lg:min-h-[620px] lg:justify-center lg:pb-20 lg:pt-16">
        <div className="max-w-xl lg:max-w-[48%]">
          {crumbs?.length ? (
            <div className="mb-5 sm:mb-6">
              <Breadcrumb items={crumbs} tone="dark" />
            </div>
          ) : null}

          <p className="internal-hero-eyebrow inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
            <span className="h-px w-7 shrink-0 bg-brand-orange" aria-hidden />
            {eyebrow}
          </p>

          <h1 className="internal-hero-title mt-4 font-display text-balance text-white sm:mt-5">
            {title}
          </h1>

          <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-white/80 sm:mt-6 sm:text-[1.125rem] lg:text-[1.2rem] lg:leading-[1.6]">
            {description}
          </p>

          {highlights?.length ? (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/12 pt-5 text-[0.8125rem] text-white/65">
              {highlights.map((item) => (
                <li key={item.label} className="inline-flex items-baseline gap-2">
                  {item.value ? (
                    <span className="font-semibold text-brand-orange">{item.value}</span>
                  ) : null}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Button
              to={primaryCta.to}
              size="lg"
              className="internal-hero-cta-primary min-h-13 w-full justify-center shadow-[0_10px_28px_rgba(3,18,32,0.28)] sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            {secondaryCta ? (
              <Button
                to={secondaryCta.to}
                size="lg"
                variant="outline-light"
                className="min-h-13 w-full justify-center hover:bg-white hover:text-brand-navy focus-visible:ring-offset-brand-navy sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>

          {children}
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
