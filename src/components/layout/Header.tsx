import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { products, productPath } from '@/data/products'
import { services, servicePath } from '@/data/services'
import { segments, segmentPath } from '@/data/segments'

type MenuKey = 'solucoes' | 'segmentos' | null

const OPEN_DELAY_MS = 100
const CLOSE_DELAY_MS = 220
const MEGA_CLOSE_MS = 260
const FINE_HOVER_MQ = '(hover: hover) and (pointer: fine)'

export function Header() {
  const [open, setOpen] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState<MenuKey>(null)
  const [renderedMenu, setRenderedMenu] = useState<MenuKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const [fineHover, setFineHover] = useState(false)
  const [segmentPreview, setSegmentPreview] = useState(segments[0]?.slug ?? 'mineracao')
  const [mobileAccordions, setMobileAccordions] = useState({
    solucoes: false,
    segmentos: false,
  })
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const solucoesTriggerRef = useRef<HTMLAnchorElement>(null)
  const segmentosTriggerRef = useRef<HTMLAnchorElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const desktopMenuRef = useRef<MenuKey>(null)
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(pathname)

  if (pathname !== menuPath) {
    setMenuPath(pathname)
    setDesktopMenu(null)
    setRenderedMenu(null)
    setOpen(false)
  }

  // Keep panel content mounted while the shell closes (avoid display:none mid-transition).
  if (desktopMenu !== null && desktopMenu !== renderedMenu) {
    setRenderedMenu(desktopMenu)
  }

  useEffect(() => {
    desktopMenuRef.current = desktopMenu
  }, [desktopMenu])

  useEffect(() => {
    const mq = window.matchMedia(FINE_HOVER_MQ)
    const sync = () => setFineHover(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.dataset.mobileNavOpen = open ? 'true' : 'false'
    return () => {
      document.body.style.overflow = ''
      delete document.documentElement.dataset.mobileNavOpen
    }
  }, [open])

  useEffect(() => {
    if (desktopMenu !== null || renderedMenu === null) return
    unmountTimerRef.current = setTimeout(() => {
      setRenderedMenu(null)
      unmountTimerRef.current = null
    }, MEGA_CLOSE_MS)
    return () => {
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current)
        unmountTimerRef.current = null
      }
    }
  }, [desktopMenu, renderedMenu])

  useEffect(() => {
    function clearHoverTimers() {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
        openTimerRef.current = null
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }

    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        clearHoverTimers()
        setDesktopMenu(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const current = desktopMenuRef.current
      if (current) {
        event.preventDefault()
        clearHoverTimers()
        setDesktopMenu(null)
        const trigger =
          current === 'solucoes' ? solucoesTriggerRef.current : segmentosTriggerRef.current
        trigger?.focus()
        return
      }
      setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      clearHoverTimers()
    }
  }, [])

  function clearHoverTimers() {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function openDesktopMenu(key: Exclude<MenuKey, null>, immediate = false) {
    clearHoverTimers()
    if (immediate || desktopMenuRef.current !== null) {
      setDesktopMenu(key)
      return
    }
    openTimerRef.current = setTimeout(() => {
      setDesktopMenu(key)
      openTimerRef.current = null
    }, OPEN_DELAY_MS)
  }

  function scheduleCloseDesktopMenu() {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setDesktopMenu(null)
      closeTimerRef.current = null
    }, CLOSE_DELAY_MS)
  }

  function cancelCloseDesktopMenu() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function closeAll() {
    clearHoverTimers()
    setOpen(false)
    setDesktopMenu(null)
  }

  function handleTriggerKeyDown(
    event: ReactKeyboardEvent<HTMLAnchorElement>,
    key: Exclude<MenuKey, null>,
  ) {
    if (event.key === 'ArrowDown' || event.key === ' ') {
      event.preventDefault()
      openDesktopMenu(key, true)
    }
  }

  const solucoesActive = pathname.startsWith('/solucoes')
  const segmentosActive = pathname.startsWith('/segmentos')
  const previewSegment =
    segments.find((item) => item.slug === segmentPreview) ?? segments[0]
  const megaOpen = desktopMenu !== null
  const megaVisible = renderedMenu !== null

  return (
    <header
      ref={headerRef}
      className={[
        'fixed inset-x-0 top-0 z-50 bg-white transition-[box-shadow] duration-300',
        scrolled || open || megaOpen ? 'shadow-[0_12px_40px_rgba(7,26,45,0.1)]' : '',
      ].join(' ')}
    >
      <Container className="relative flex h-auto min-h-[var(--site-header-h)] items-center justify-between gap-3 px-5 py-[10px] sm:gap-4 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="relative z-20 flex shrink-0 items-center overflow-visible"
          aria-label="Auriun — página inicial"
          onClick={closeAll}
        >
          <Logo className="h-auto w-[5.625rem] max-w-none overflow-visible sm:w-[6.125rem] xl:w-[7.125rem]" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Principal">
          <NavLink to="/" end className={({ isActive }) => navClass(isActive)} onClick={closeAll}>
            Home
          </NavLink>
          <NavLink
            to="/a-auriun/"
            className={({ isActive }) => navClass(isActive)}
            onClick={closeAll}
          >
            A Auriun
          </NavLink>

          <div
            className="site-nav-bridge"
            onMouseEnter={() => {
              if (!fineHover) return
              cancelCloseDesktopMenu()
              openDesktopMenu('solucoes')
            }}
            onMouseLeave={() => {
              if (!fineHover) return
              scheduleCloseDesktopMenu()
            }}
          >
            <Link
              ref={solucoesTriggerRef}
              to="/solucoes/"
              className={navClass(solucoesActive || desktopMenu === 'solucoes')}
              aria-expanded={desktopMenu === 'solucoes'}
              aria-haspopup="true"
              aria-controls="mega-solucoes"
              onClick={closeAll}
              onFocus={() => cancelCloseDesktopMenu()}
              onKeyDown={(event) => handleTriggerKeyDown(event, 'solucoes')}
            >
              Soluções
              <ChevronDown
                className={[
                  'site-nav-chevron size-3.5 shrink-0 opacity-60',
                  desktopMenu === 'solucoes' ? 'is-open' : '',
                ].join(' ')}
                aria-hidden
              />
            </Link>
          </div>

          <div
            className="site-nav-bridge"
            onMouseEnter={() => {
              if (!fineHover) return
              cancelCloseDesktopMenu()
              openDesktopMenu('segmentos')
            }}
            onMouseLeave={() => {
              if (!fineHover) return
              scheduleCloseDesktopMenu()
            }}
          >
            <Link
              ref={segmentosTriggerRef}
              to="/segmentos/"
              className={navClass(segmentosActive || desktopMenu === 'segmentos')}
              aria-expanded={desktopMenu === 'segmentos'}
              aria-haspopup="true"
              aria-controls="mega-segmentos"
              onClick={closeAll}
              onFocus={() => cancelCloseDesktopMenu()}
              onKeyDown={(event) => handleTriggerKeyDown(event, 'segmentos')}
            >
              Segmentos
              <ChevronDown
                className={[
                  'site-nav-chevron size-3.5 shrink-0 opacity-60',
                  desktopMenu === 'segmentos' ? 'is-open' : '',
                ].join(' ')}
                aria-hidden
              />
            </Link>
          </div>

          <NavLink
            to="/contato/"
            className={({ isActive }) => navClass(isActive)}
            onClick={closeAll}
          >
            Contato
          </NavLink>
        </nav>

        <div className="relative z-20 flex items-center gap-2 sm:gap-3">
          <div className="hidden xl:block">
            <Button
              to="/contato/?assunto=orcamento"
              size="md"
              className="!min-h-10 !py-2"
              onClick={closeAll}
            >
              Solicitar orçamento
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 min-h-11 min-w-11 items-center justify-center text-brand-graphite ring-1 ring-brand-line transition hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Expanding mega shell — pattern from 21st Navbar Section 2, CSS-only */}
      <div
        className={[
          'site-mega-shell hidden overflow-hidden border-t border-transparent bg-white xl:grid',
          megaOpen
            ? 'site-mega-shell--open grid-rows-[1fr] border-brand-line'
            : 'grid-rows-[0fr]',
        ].join(' ')}
        onMouseEnter={() => {
          if (!fineHover) return
          cancelCloseDesktopMenu()
        }}
        onMouseLeave={() => {
          if (!fineHover) return
          scheduleCloseDesktopMenu()
        }}
      >
        <div className="min-h-0 overflow-hidden">
          {megaVisible && renderedMenu === 'solucoes' ? (
            <div id="mega-solucoes" className="mega-fade border-b border-brand-line bg-white">
              <Container className="grid gap-0 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr_0.95fr] lg:gap-10 lg:px-10 lg:py-10">
                <Link
                  to="/solucoes/"
                  onClick={closeAll}
                  className="group relative min-h-[220px] overflow-hidden bg-brand-navy"
                >
                  <img
                    src="/images/produtos/produto-materiais-eletricos.jpg"
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03]"
                    width={720}
                    height={480}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
                  <div className="relative flex h-full min-h-[220px] flex-col justify-end p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                      Soluções
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-white">
                      Visão geral do ecossistema
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                      Produtos e serviços para operações, projetos e suprimentos industriais.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explorar soluções
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    Produtos
                  </p>
                  <ul className="mt-4 space-y-1">
                    {products.slice(0, 6).map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={productPath(item.slug)}
                          className="group block px-2 py-2.5 hover:bg-brand-mist"
                          onClick={closeAll}
                        >
                          <span className="block text-[0.9375rem] font-medium text-brand-graphite group-hover:text-brand-blue">
                            {item.shortTitle}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-brand-slate">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                    Serviços
                  </p>
                  <ul className="mt-4 space-y-1">
                    {services.slice(0, 6).map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={servicePath(item.slug)}
                          className="group block px-2 py-2.5 hover:bg-brand-mist"
                          onClick={closeAll}
                        >
                          <span className="block text-[0.9375rem] font-medium text-brand-graphite group-hover:text-brand-blue">
                            {item.shortTitle}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-brand-slate">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Container>
            </div>
          ) : null}

          {megaVisible && renderedMenu === 'segmentos' && previewSegment ? (
            <div id="mega-segmentos" className="mega-fade border-b border-brand-line bg-white">
              <Container className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-10 lg:py-10">
                <Link
                  to={segmentPath(previewSegment.slug)}
                  onClick={closeAll}
                  className="group relative min-h-[280px] overflow-hidden bg-brand-navy"
                >
                  <img
                    key={previewSegment.slug}
                    src={previewSegment.image}
                    alt=""
                    className="segment-framed-img absolute inset-0 size-full object-cover opacity-75 transition duration-500"
                    style={
                      previewSegment.imageObjectPosition
                        ? ({
                            '--segment-pos':
                              previewSegment.imageObjectPosition.panel ??
                              'center center',
                            '--segment-pos-mobile':
                              previewSegment.imageObjectPosition.mobile ??
                              previewSegment.imageObjectPosition.panel ??
                              'center center',
                          } as CSSProperties)
                        : undefined
                    }
                    width={900}
                    height={640}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/45 to-transparent" />
                  <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                      Segmento
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                      {previewSegment.title}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/72">
                      {previewSegment.description}
                    </p>
                  </div>
                </Link>

                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                      Segmentos industriais
                    </p>
                    <Link
                      to="/segmentos/"
                      onClick={closeAll}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-navy"
                    >
                      Ver todos
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                    {segments.map((item) => {
                      const active = item.slug === previewSegment.slug
                      return (
                        <li key={item.slug}>
                          <Link
                            to={segmentPath(item.slug)}
                            className={[
                              'block px-2 py-2.5 text-[0.9375rem] transition-colors',
                              active
                                ? 'bg-brand-mist font-semibold text-brand-navy'
                                : 'text-brand-graphite hover:bg-brand-mist hover:text-brand-blue',
                            ].join(' ')}
                            onMouseEnter={() => setSegmentPreview(item.slug)}
                            onFocus={() => setSegmentPreview(item.slug)}
                            onClick={closeAll}
                          >
                            {item.shortTitle}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Container>
            </div>
          ) : null}
        </div>
      </div>

      {!megaOpen && !megaVisible ? (
        <div className="brand-hairline h-px w-full" aria-hidden />
      ) : null}

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[var(--site-header-h)] z-40 bg-brand-navy/55 backdrop-blur-[2px] xl:hidden"
            aria-label="Fechar menu"
            onClick={closeAll}
          />
          <div
            id={menuId}
            className="relative z-50 flex max-h-[calc(100dvh-var(--site-header-h))] flex-col border-t border-brand-line bg-white xl:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <nav
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-8"
              aria-label="Mobile"
            >
              <div className="flex flex-col">
                <Link to="/" onClick={closeAll} className={mobileLink}>
                  Home
                </Link>
                <Link to="/a-auriun/" onClick={closeAll} className={mobileLink}>
                  A Auriun
                </Link>

                <MobileAccordion
                  label="Soluções"
                  open={mobileAccordions.solucoes}
                  onToggle={() =>
                    setMobileAccordions((s) => ({ ...s, solucoes: !s.solucoes }))
                  }
                >
                  <Link
                    to="/solucoes/"
                    onClick={closeAll}
                    className="flex min-h-12 items-center py-3 text-[0.975rem] font-semibold text-brand-blue"
                  >
                    Visão geral
                  </Link>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-slate">
                    Produtos
                  </p>
                  {products.map((item) => (
                    <Link
                      key={item.slug}
                      to={productPath(item.slug)}
                      onClick={closeAll}
                      className="flex min-h-12 flex-col justify-center py-3 text-[0.975rem] text-brand-graphite"
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-brand-slate line-clamp-1">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-slate">
                    Serviços
                  </p>
                  {services.map((item) => (
                    <Link
                      key={item.slug}
                      to={servicePath(item.slug)}
                      onClick={closeAll}
                      className="flex min-h-12 flex-col justify-center py-3 text-[0.975rem] text-brand-graphite"
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-brand-slate line-clamp-1">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </MobileAccordion>

                <MobileAccordion
                  label="Segmentos"
                  open={mobileAccordions.segmentos}
                  onToggle={() =>
                    setMobileAccordions((s) => ({
                      ...s,
                      segmentos: !s.segmentos,
                    }))
                  }
                >
                  <Link
                    to="/segmentos/"
                    onClick={closeAll}
                    className="flex min-h-12 items-center py-3 text-[0.975rem] font-semibold text-brand-blue"
                  >
                    Todos os segmentos
                  </Link>
                  {segments.map((item) => (
                    <Link
                      key={item.slug}
                      to={segmentPath(item.slug)}
                      onClick={closeAll}
                      className="flex min-h-12 items-center py-3 text-[0.975rem] text-brand-graphite"
                    >
                      {item.title}
                    </Link>
                  ))}
                </MobileAccordion>

                <Link to="/contato/" onClick={closeAll} className={mobileLink}>
                  Contato
                </Link>
              </div>
            </nav>

            <div className="shrink-0 border-t border-brand-line bg-brand-mist/60 px-5 py-4 sm:px-8">
              <Button
                to="/contato/?assunto=orcamento"
                className="min-h-13 w-full"
                size="lg"
                onClick={closeAll}
              >
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </header>
  )
}

function navClass(active: boolean): string {
  return ['site-nav-item', active ? 'is-active' : ''].filter(Boolean).join(' ')
}

const mobileLink =
  'flex min-h-11 items-center px-1 py-3 text-base font-medium text-brand-graphite active:bg-brand-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="border-y border-brand-line/80">
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between px-1 py-3.5 text-left text-base font-medium text-brand-graphite active:bg-brand-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        aria-expanded={open}
        onClick={onToggle}
      >
        {label}
        <ChevronDown
          className={`size-5 shrink-0 text-brand-slate transition ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? <div className="space-y-0.5 px-1 pb-4">{children}</div> : null}
    </div>
  )
}
