import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { products, productPath } from '@/data/products'
import { services, servicePath } from '@/data/services'
import { segments, segmentPath } from '@/data/segments'

type MenuKey = 'solucoes' | 'segmentos' | null

export function Header() {
  const [open, setOpen] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState<MenuKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const [segmentPreview, setSegmentPreview] = useState(segments[0]?.slug ?? 'mineracao')
  const [mobileAccordions, setMobileAccordions] = useState({
    solucoes: false,
    segmentos: false,
  })
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [menuPath, setMenuPath] = useState(pathname)

  if (pathname !== menuPath) {
    setMenuPath(pathname)
    setDesktopMenu(null)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenu(null)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDesktopMenu(null)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function closeAll() {
    setOpen(false)
    setDesktopMenu(null)
  }

  function toggleDesktop(key: Exclude<MenuKey, null>) {
    setDesktopMenu((current) => (current === key ? null : key))
  }

  const solucoesActive = pathname.startsWith('/solucoes')
  const segmentosActive = pathname.startsWith('/segmentos')
  const previewSegment =
    segments.find((item) => item.slug === segmentPreview) ?? segments[0]
  const megaOpen = desktopMenu !== null

  return (
    <header
      ref={headerRef}
      className={[
        'fixed inset-x-0 top-0 z-50 bg-white transition-[box-shadow] duration-300',
        scrolled || open || megaOpen ? 'shadow-[0_12px_40px_rgba(7,26,45,0.1)]' : '',
      ].join(' ')}
    >
      <Container className="relative flex h-[88px] items-center justify-between gap-6">
        <Link
          to="/"
          className="relative z-20 flex shrink-0 items-center"
          aria-label="Auriun — página inicial"
          onClick={closeAll}
        >
          <Logo className="h-10 w-auto max-w-[120px] sm:h-12 sm:max-w-[140px] lg:h-[58px] lg:max-w-[160px]" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Principal">
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

          <button
            type="button"
            className={navClass(solucoesActive || desktopMenu === 'solucoes')}
            aria-expanded={desktopMenu === 'solucoes'}
            aria-haspopup="true"
            aria-controls="mega-solucoes"
            onClick={() => toggleDesktop('solucoes')}
          >
            Soluções
            <ChevronDown
              className={[
                'size-3.5 opacity-60 transition-transform duration-300',
                desktopMenu === 'solucoes' ? 'rotate-180' : '',
              ].join(' ')}
              aria-hidden
            />
          </button>

          <button
            type="button"
            className={navClass(segmentosActive || desktopMenu === 'segmentos')}
            aria-expanded={desktopMenu === 'segmentos'}
            aria-haspopup="true"
            aria-controls="mega-segmentos"
            onClick={() => toggleDesktop('segmentos')}
          >
            Segmentos
            <ChevronDown
              className={[
                'size-3.5 opacity-60 transition-transform duration-300',
                desktopMenu === 'segmentos' ? 'rotate-180' : '',
              ].join(' ')}
              aria-hidden
            />
          </button>

          <NavLink
            to="/contato/"
            className={({ isActive }) => navClass(isActive)}
            onClick={closeAll}
          >
            Contato
          </NavLink>
        </nav>

        <div className="relative z-20 flex items-center gap-3">
          <Button
            to="/contato/?assunto=orcamento"
            className="hidden sm:inline-flex"
            size="md"
            onClick={closeAll}
          >
            Solicitar orçamento
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-brand-graphite ring-1 ring-brand-line xl:hidden"
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
          'hidden overflow-hidden border-t border-transparent bg-white transition-[grid-template-rows,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:grid',
          megaOpen ? 'grid-rows-[1fr] border-brand-line' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="min-h-0 overflow-hidden">
          {desktopMenu === 'solucoes' ? (
            <div id="mega-solucoes" className="mega-fade border-b border-brand-line bg-white">
              <Container className="grid gap-0 py-8 lg:grid-cols-[1.05fr_0.95fr_0.95fr] lg:gap-10 lg:py-10">
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

          {desktopMenu === 'segmentos' && previewSegment ? (
            <div id="mega-segmentos" className="mega-fade border-b border-brand-line bg-white">
              <Container className="grid gap-8 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-10">
                <Link
                  to={segmentPath(previewSegment.slug)}
                  onClick={closeAll}
                  className="group relative min-h-[280px] overflow-hidden bg-brand-navy"
                >
                  <img
                    key={previewSegment.slug}
                    src={previewSegment.image}
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-75 transition duration-500"
                    width={900}
                    height={640}
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

      {!megaOpen ? <div className="brand-hairline h-px w-full" aria-hidden /> : null}

      {open ? (
        <div
          id={menuId}
          className="max-h-[calc(100dvh-89px)] overflow-y-auto border-t border-brand-line bg-white xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-5">
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
                className="block py-2.5 text-sm font-semibold text-brand-blue"
              >
                Visão geral
              </Link>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-slate">
                Produtos
              </p>
              {products.map((item) => (
                <Link
                  key={item.slug}
                  to={productPath(item.slug)}
                  onClick={closeAll}
                  className="block py-2.5 text-sm text-brand-graphite"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-brand-slate line-clamp-1">
                    {item.description}
                  </span>
                </Link>
              ))}
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-slate">
                Serviços
              </p>
              {services.map((item) => (
                <Link
                  key={item.slug}
                  to={servicePath(item.slug)}
                  onClick={closeAll}
                  className="block py-2.5 text-sm text-brand-graphite"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-brand-slate line-clamp-1">
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
                className="block py-2.5 text-sm font-semibold text-brand-blue"
              >
                Todos os segmentos
              </Link>
              {segments.map((item) => (
                <Link
                  key={item.slug}
                  to={segmentPath(item.slug)}
                  onClick={closeAll}
                  className="block py-2.5 text-sm text-brand-graphite"
                >
                  {item.title}
                </Link>
              ))}
            </MobileAccordion>

            <Link to="/contato/" onClick={closeAll} className={mobileLink}>
              Contato
            </Link>
            <Button
              to="/contato/?assunto=orcamento"
              className="mt-3 w-full"
              size="lg"
              onClick={closeAll}
            >
              Solicitar orçamento
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  )
}

function navClass(active: boolean): string {
  return [
    'group relative inline-flex items-center gap-1 px-3.5 py-2 text-[0.9375rem] font-medium tracking-wide transition-colors',
    active ? 'text-brand-orange' : 'text-brand-graphite/80 hover:text-brand-navy',
  ].join(' ')
}

const mobileLink =
  'px-3 py-3.5 text-base font-medium text-brand-graphite hover:bg-brand-mist'

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
        className="flex w-full items-center justify-between px-3 py-3.5 text-left text-base font-medium text-brand-graphite"
        aria-expanded={open}
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={`size-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? <div className="space-y-0.5 px-3 pb-4">{children}</div> : null}
    </div>
  )
}
