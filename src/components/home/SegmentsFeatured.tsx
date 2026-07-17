import { useId, useState } from 'react'
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
            className="self-start lg:self-auto"
          >
            Ver todos
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        {/* Interactive panel — Feature 108 / Vertical Tabs pattern */}
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
            <img
              key={active.slug}
              src={active.image}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-80 segment-photo-fade"
              width={1100}
              height={800}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 xl:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                Segmento
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white xl:text-4xl">
                {active.title}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
                {active.description}
              </p>
              <Link
                to={segmentPath(active.slug)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-orange"
              >
                Conhecer segmento
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {segments.map((segment) => {
            const open = segment.slug === activeSlug
            return (
              <div
                key={segment.slug}
                className="overflow-hidden border border-white/12 bg-brand-navy-mid"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setActiveSlug(segment.slug)}
                >
                  <span className="text-base font-semibold text-white">
                    {segment.shortTitle}
                  </span>
                  <ArrowRight
                    className={[
                      'size-4 text-brand-orange transition',
                      open ? 'rotate-90' : '',
                    ].join(' ')}
                    aria-hidden
                  />
                </button>
                {open ? (
                  <div className="border-t border-white/10">
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-blue-deep">
                      <img
                        src={segment.image}
                        alt=""
                        className="size-full object-cover"
                        width={800}
                        height={500}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                    </div>
                    <div className="px-5 py-5">
                      <p className="text-[0.975rem] leading-relaxed text-white/70">
                        {segment.description}
                      </p>
                      <Link
                        to={segmentPath(segment.slug)}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange"
                      >
                        Conhecer segmento
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
