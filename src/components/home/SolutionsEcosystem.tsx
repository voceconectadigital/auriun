import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

const panels = [
  {
    id: 'produtos',
    titleText: 'Produtos industriais',
    title: (
      <>
        Produtos
        <br />
        industriais
      </>
    ),
    description:
      'Materiais elétricos, automação, instrumentação, conectividade e suprimentos para MRO, CAPEX e OPEX.',
    href: '/solucoes/',
    image: '/images/produtos/produto-materiais-eletricos.jpg',
    imageAlt: 'Materiais e infraestrutura elétrica industrial',
  },
  {
    id: 'servicos',
    titleText: 'Serviços estratégicos',
    title: (
      <>
        Serviços
        <br />
        estratégicos
      </>
    ),
    description:
      'Strategic sourcing, supply chain, desenvolvimento de fornecedores e consultoria técnica-comercial.',
    href: '/solucoes/',
    image: '/images/servicos/servico-strategic-sourcing.jpg',
    imageAlt: 'Operação de sourcing e cadeia de suprimentos',
  },
  {
    id: 'especiais',
    titleText: 'Materiais especiais',
    title: (
      <>
        Materiais
        <br />
        especiais
      </>
    ),
    description:
      'Localização de itens de difícil aquisição, nacionais ou importados, com rede ampliada de fornecimento.',
    href: '/solucoes/servicos/materiais-especiais-e-importados/',
    image: '/images/servicos/servico-materiais-especiais-e-importados.jpg',
    imageAlt: 'Materiais especiais e importados para indústria',
  },
] as const

type PanelId = (typeof panels)[number]['id']

const DEFAULT_PANEL: PanelId = 'produtos'
const HOVER_DELAY_MS = 100

export function SolutionsEcosystem() {
  const [active, setActive] = useState<PanelId>(DEFAULT_PANEL)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (enterTimer.current) clearTimeout(enterTimer.current)
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  function clearTimers() {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current)
      enterTimer.current = null
    }
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }

  function scheduleActive(id: PanelId) {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
    if (enterTimer.current) clearTimeout(enterTimer.current)
    enterTimer.current = setTimeout(() => {
      setActive(id)
      enterTimer.current = null
    }, HOVER_DELAY_MS)
  }

  function scheduleDefault() {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current)
      enterTimer.current = null
    }
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      setActive(DEFAULT_PANEL)
      leaveTimer.current = null
    }, HOVER_DELAY_MS)
  }

  function activateNow(id: PanelId) {
    clearTimers()
    setActive(id)
  }

  return (
    <section className="bg-brand-navy text-white">
      <Container className="section-pad py-20 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
            Soluções
          </p>
          <h2 className="section-title mt-4 text-white">
            Um ecossistema de soluções para a indústria.
          </h2>
        </div>

        {/* Desktop: flex panels — typography stays constant */}
        <div
          className="ecosystem-rail mt-12 hidden min-h-[520px] gap-3 lg:flex"
          onMouseLeave={scheduleDefault}
        >
          {panels.map((panel) => {
            const expanded = active === panel.id
            return (
              <article
                key={panel.id}
                className={[
                  'ecosystem-panel group relative min-w-[240px] overflow-hidden outline-none',
                  expanded ? 'is-active' : '',
                ].join(' ')}
                tabIndex={0}
                aria-expanded={expanded}
                onMouseEnter={() => scheduleActive(panel.id)}
                onFocus={() => activateNow(panel.id)}
              >
                <Link
                  to={panel.href}
                  aria-label={`Ver ${panel.titleText}`}
                  tabIndex={expanded ? 0 : -1}
                  aria-hidden={!expanded}
                  className="absolute inset-0 z-0 block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  <img
                    src={panel.image}
                    alt=""
                    aria-hidden
                    className="ecosystem-panel-image absolute inset-0 size-full object-cover"
                    width={900}
                    height={700}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <div className="ecosystem-panel-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

                <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-end p-8 xl:p-10">
                  <h3 className="ecosystem-panel-title">
                    <Link
                      to={panel.href}
                      className="text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                      tabIndex={expanded ? 0 : -1}
                      aria-hidden={!expanded}
                    >
                      {panel.title}
                    </Link>
                  </h3>

                  <div className="ecosystem-panel-copy">
                    <p className="mt-4 max-w-md text-[0.975rem] leading-relaxed text-white/78">
                      {panel.description}
                    </p>
                    <Link
                      to={panel.href}
                      className="ecosystem-panel-cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                      tabIndex={expanded ? 0 : -1}
                      aria-hidden={!expanded}
                    >
                      Explorar
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Mobile / tablet: stacked, always fully visible */}
        <div className="mt-10 grid gap-5 lg:hidden">
          {panels.map((panel) => (
            <article
              key={panel.id}
              className="relative min-h-[280px] overflow-hidden sm:min-h-[340px]"
            >
              <Link
                to={panel.href}
                aria-label={`Ver ${panel.titleText}`}
                className="group/media absolute inset-0 z-0 block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                <img
                  src={panel.image}
                  alt={panel.imageAlt}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/media:scale-105 motion-safe:group-focus-visible/media:scale-105"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-brand-navy via-brand-navy/55 to-transparent"
                aria-hidden
              />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6 sm:min-h-[340px] sm:p-8">
                <h3 className="ecosystem-panel-title text-[1.5rem] sm:text-[1.75rem]">
                  <Link
                    to={panel.href}
                    className="text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                  >
                    {panel.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-md text-[0.975rem] leading-[1.65] text-white/78">
                  {panel.description}
                </p>
                <Link
                  to={panel.href}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.975rem] font-semibold text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                >
                  Explorar
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
