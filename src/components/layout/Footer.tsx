import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import {
  CONTACT,
  SITE,
  hasValue,
  isPublicContact,
  mailHref,
  telHref,
} from '@/data/site'
import { getProductBySlug, productPath } from '@/data/products'
import { getServiceBySlug, servicePath } from '@/data/services'

const FOOTER_SOLUTIONS: ReadonlyArray<{
  kind: 'product' | 'service'
  slug: string
  prefer: 'title' | 'shortTitle'
}> = [
  { kind: 'product', slug: 'materiais-eletricos', prefer: 'title' },
  { kind: 'product', slug: 'automacao-industrial', prefer: 'shortTitle' },
  { kind: 'product', slug: 'instrumentacao-industrial', prefer: 'shortTitle' },
  { kind: 'product', slug: 'eletroeletronicos', prefer: 'title' },
  { kind: 'service', slug: 'strategic-sourcing', prefer: 'title' },
  { kind: 'service', slug: 'importacao-sob-demanda', prefer: 'title' },
]

function footerSolutionLink(item: (typeof FOOTER_SOLUTIONS)[number]) {
  if (item.kind === 'product') {
    const product = getProductBySlug(item.slug)
    if (!product) return null
    return {
      to: productPath(product.slug),
      label: item.prefer === 'shortTitle' ? product.shortTitle : product.title,
    }
  }
  const service = getServiceBySlug(item.slug)
  if (!service) return null
  return {
    to: servicePath(service.slug),
    label: item.prefer === 'shortTitle' ? service.shortTitle : service.title,
  }
}

export function Footer() {
  const year = new Date().getFullYear()
  const showChannels = isPublicContact()
  const email = showChannels ? mailHref() : null
  const solutionLinks = FOOTER_SOLUTIONS.map(footerSolutionLink).filter(
    (item): item is { to: string; label: string } => item !== null,
  )

  return (
    <footer className="bg-brand-navy text-white">
      <div className="brand-hairline h-px w-full" aria-hidden />

      <div className="footer-cta-wrap">
        <Container>
          <div className="footer-cta-band flex flex-col gap-6 overflow-hidden sm:gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Atendimento comercial
              </p>
              <h2 className="mt-2.5 text-[clamp(1.35rem,4.5vw,1.85rem)] font-bold leading-tight tracking-[-0.02em] text-white text-balance">
                Precisa estruturar uma cotação?
              </h2>
              <p className="mt-2.5 text-[0.9rem] leading-[1.6] text-white/78 sm:text-[0.9375rem]">
                Conte o que sua operação precisa e receba um direcionamento comercial.
              </p>
            </div>
            <div className="shrink-0 lg:pl-4">
              <Link
                to="/solicitar-orcamento/"
                className="footer-cta-button group inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 bg-brand-orange px-7 text-[0.9375rem] font-bold tracking-wide text-white sm:w-auto"
              >
                Solicitar orçamento
                <ArrowRight
                  className="footer-cta-button-icon size-4 shrink-0 text-white transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="footer-main border-t border-white/10">
        <Container className="grid gap-8 py-10 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
          <div className="lg:col-span-3">
            <Link
              to="/"
              className="inline-flex items-center overflow-visible"
              aria-label="Auriun — página inicial"
            >
              <Logo className="h-auto w-[132px] max-w-[150px] overflow-visible sm:w-[142px]" />
            </Link>
            <p className="mt-4 max-w-xs text-[0.875rem] leading-[1.6] text-white/65">
              {SITE.valueProposition}
            </p>
            <p className="mt-3 max-w-xs text-[0.8125rem] leading-[1.55] text-white/42">
              Distribuição, integração e inteligência em suprimentos para a indústria.
            </p>
          </div>

          <FooterNavBlock title="Navegação" className="lg:col-span-2">
            <ul className="space-y-0.5 text-[0.875rem] text-white/60">
              <li>
                <Link to="/" className="footer-nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/a-auriun/" className="footer-nav-link">
                  A Auriun
                </Link>
              </li>
              <li>
                <Link to="/solucoes/" className="footer-nav-link">
                  Soluções
                </Link>
              </li>
              <li>
                <Link to="/segmentos/" className="footer-nav-link">
                  Segmentos
                </Link>
              </li>
              <li>
                <Link to="/contato/" className="footer-nav-link">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/solicitar-orcamento/" className="footer-nav-link">
                  Solicitar orçamento
                </Link>
              </li>
            </ul>
          </FooterNavBlock>

          <FooterNavBlock title="Soluções-chave" className="lg:col-span-4">
            <ul className="space-y-0.5 text-[0.875rem] text-white/60">
              {solutionLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="footer-nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/solucoes/"
                  className="footer-nav-link gap-1.5 font-medium text-brand-orange hover:text-white"
                >
                  Ver todas as soluções
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </FooterNavBlock>

          <FooterNavBlock title="Contato" className="lg:col-span-3">
            <ul className="space-y-0.5 text-[0.875rem] text-white/60">
              {showChannels
                ? CONTACT.regions.map((region) => {
                    const href = telHref(region.phone)
                    if (!href || !hasValue(region.phone)) return null
                    return (
                      <li key={region.id}>
                        <a href={href} className="footer-nav-link gap-2">
                          <Phone className="size-3.5 opacity-70" aria-hidden />
                          <span>
                            {region.shortLabel}: {region.phone}
                          </span>
                        </a>
                      </li>
                    )
                  })
                : null}
              {email && hasValue(CONTACT.email) ? (
                <li>
                  <a href={email} className="footer-nav-link gap-2">
                    <Mail className="size-3.5 opacity-70" aria-hidden />
                    {CONTACT.email}
                  </a>
                </li>
              ) : null}
              {showChannels && hasValue(CONTACT.address.city) ? (
                <li className="flex items-start gap-2 py-2.5 text-white/55">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 opacity-70" aria-hidden />
                  <span>
                    {CONTACT.address.city} – {CONTACT.address.state}
                    {hasValue(CONTACT.address.serviceAreaNote) ? (
                      <>
                        <br />
                        <span className="text-white/48">{CONTACT.address.serviceAreaNote}</span>
                      </>
                    ) : null}
                  </span>
                </li>
              ) : !showChannels ? (
                <li className="py-2.5 text-white/40">Dados de contato em atualização.</li>
              ) : null}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-4">
              <Link
                to="/segmentos/"
                className="footer-nav-link gap-1.5 text-[0.8125rem] font-medium text-white/70 hover:text-white"
              >
                Ver todos os segmentos
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </FooterNavBlock>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="footer-bottom flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-[0.75rem] leading-relaxed text-white/45">
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <p className="text-[0.75rem] leading-relaxed text-white/35 sm:text-right">
            {SITE.domain}
          </p>
        </Container>
      </div>
    </footer>
  )
}

function FooterNavBlock({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <details className="group md:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between border-b border-white/10 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 marker:content-none [&::-webkit-details-marker]:hidden">
          {title}
          <ArrowRight
            className="size-3.5 shrink-0 text-brand-orange transition group-open:rotate-90"
            aria-hidden
          />
        </summary>
        <div className="pb-1 pt-2.5">{children}</div>
      </details>

      <div className="hidden md:block">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
          {title}
        </h3>
        <div className="mt-3.5">{children}</div>
      </div>
    </div>
  )
}
