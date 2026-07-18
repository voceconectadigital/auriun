import { useId, useState, type CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { segments, segmentPath } from '@/data/segments'

export function SegmentsFeatured() {
  const [activeSlug, setActiveSlug] = useState(segments[0]?.slug ?? 'mineracao')
  const labelId = useId()
  const active = segments.find((item) => item.slug === activeSlug) ?? segments[0]

  if (!active) return null

  const panelFraming = active.imageObjectPosition
    ? ({
        '--segment-pos': active.imageObjectPosition.panel ?? 'center center',
        '--segment-pos-mobile':
          active.imageObjectPosition.mobile ??
          active.imageObjectPosition.panel ??
          'center center',
      } as CSSProperties)
    : undefined

  return (
    <section className="bg-brand-navy text-white">
      <Container className="section-pad py-20 md:py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Segmentos
            </p>
            <h2 className="section-title mt-4 text-white">
              Conhecimento aplicado aos setores que movem o país.
            </h2>
          </div>
          <Button
            to="/segmentos/"
            variant="outline-light"
            className="min-h-12 self-stretch sm:self-start lg:self-auto"
          >
            Ver todos
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        {/* Interactive panel — desktop */}
        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <p id={labelId} className="sr-only">
              Lista de segmentos industriais
            </p>
            <ul
              className="divide-y divide-white/10 border-y border-white/10"
              role="listbox"
              aria-labelledby={labelId}
              aria-activedescendant={`segment-option-${active.slug}`}
            >
              {segments.map((segment) => {
                const selected = segment.slug === active.slug
                return (
                  <li key={segment.slug} role="none">
                    <button
                      id={`segment-option-${segment.slug}`}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={[
                        'group flex w-full items-center gap-4 py-4 text-left transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy',
                        selected ? 'text-white' : 'text-white/55 hover:text-white/85',
                      ].join(' ')}
                      onMouseEnter={() => setActiveSlug(segment.slug)}
                      onFocus={() => setActiveSlug(segment.slug)}
                      onClick={() => setActiveSlug(segment.slug)}
                    >
                      <span
                        className={[
                          'h-8 w-0.5 shrink-0 transition-colors',
                          selected ? 'bg-brand-orange' : 'bg-transparent group-hover:bg-white/25',
                        ].join(' ')}
                        aria-hidden
                      />
                      <span
                        className={[
                          'flex-1 text-lg font-semibold tracking-tight sm:text-xl',
                          selected ? 'text-white' : '',
                        ].join(' ')}
                      >
                        {segment.shortTitle}
                      </span>
                      <ArrowRight
                        className={[
                          'size-4 shrink-0 transition',
                          selected
                            ? 'translate-x-0 text-brand-orange opacity-100'
                            : '-translate-x-1 text-white opacity-0 group-hover:opacity-40',
                        ].join(' ')}
                        aria-hidden
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative min-h-[560px] overflow-hidden bg-brand-blue-deep">
            <Link
              to={segmentPath(active.slug)}
              aria-label={`Ver ${active.title}`}
              className="group/media absolute inset-0 z-0 block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              <img
                key={active.slug}
                src={active.image}
                alt=""
                className="segment-framed-img absolute inset-0 size-full object-cover opacity-80 segment-photo-fade transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/media:scale-105 motion-safe:group-focus-visible/media:scale-105"
                style={panelFraming}
                width={1100}
                height={800}
                loading="lazy"
              />
            </Link>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 z-10 p-10 xl:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Segmento
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white xl:text-4xl">
                <Link
                  to={segmentPath(active.slug)}
                  className="text-inherit no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  {active.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
                {active.description}
              </p>
              <Link
                to={segmentPath(active.slug)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                Conhecer segmento
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: horizontal tabs + single panel */}
        <div className="mt-10 lg:hidden">
          <p className="sr-only" id={`${labelId}-mobile`}>
            Selecione um segmento industrial
          </p>
          <div
            className="segments-tabs -mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-2"
            role="tablist"
            aria-labelledby={`${labelId}-mobile`}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {segments.map((segment) => {
              const selected = segment.slug === activeSlug
              return (
                <button
                  key={segment.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`segment-panel-${segment.slug}`}
                  id={`segment-tab-${segment.slug}`}
                  className={[
                    'min-h-12 shrink-0 snap-start rounded-sm px-4 text-[0.9375rem] font-semibold transition',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy',
                    selected
                      ? 'bg-brand-orange text-white'
                      : 'bg-white/8 text-white/75 ring-1 ring-white/15',
                  ].join(' ')}
                  onClick={() => setActiveSlug(segment.slug)}
                >
                  {segment.shortTitle}
                </button>
              )
            })}
          </div>

          <div
            id={`segment-panel-${active.slug}`}
            role="tabpanel"
            aria-labelledby={`segment-tab-${active.slug}`}
            className="mt-5 overflow-hidden border border-white/12 bg-brand-navy-mid"
          >
            <Link
              to={segmentPath(active.slug)}
              aria-label={`Ver ${active.title}`}
              className="group/media relative block aspect-[16/10] overflow-hidden bg-brand-blue-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              <img
                key={active.slug}
                src={active.image}
                alt=""
                className="segment-framed-img size-full object-cover segment-photo-fade transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/media:scale-105 motion-safe:group-focus-visible/media:scale-105"
                style={panelFraming}
                width={800}
                height={500}
                loading="lazy"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"
                aria-hidden
              />
            </Link>
            <div className="px-5 py-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Segmento
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                <Link
                  to={segmentPath(active.slug)}
                  className="text-inherit no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  {active.title}
                </Link>
              </h3>
              <p className="mt-3 text-[0.975rem] leading-[1.65] text-white/70">
                {active.description}
              </p>
              <Link
                to={segmentPath(active.slug)}
                className="mt-5 inline-flex min-h-12 items-center gap-2 text-[0.975rem] font-semibold text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                Conhecer segmento
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
