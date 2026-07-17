import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import { CONTACT, SITE, SOCIAL, hasValue, mailHref, telHref } from '@/data/site'
import { products, productPath } from '@/data/products'
import { services, servicePath } from '@/data/services'
import { segments, segmentPath } from '@/data/segments'

export function Footer() {
  const year = new Date().getFullYear()
  const phone = telHref()
  const email = mailHref()

  return (
    <footer className="bg-brand-navy text-white">
      <div className="brand-hairline h-px w-full" aria-hidden />

      <div className="footer-cta-wrap">
        <Container className="pt-14 md:pt-16 lg:pt-20">
          <div className="footer-cta-band grid overflow-hidden bg-[#1a7bc9] shadow-[0_18px_48px_rgba(3,18,32,0.28)] lg:grid-cols-[1.25fr_auto]">
            <div className="px-5 py-8 sm:px-10 sm:py-11 lg:px-12 lg:py-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">
                Próximo passo
              </p>
              <h2 className="mt-3 max-w-xl text-[clamp(1.5rem,6vw,2.15rem)] font-bold leading-tight tracking-[-0.02em] text-white text-balance">
                Fale com a equipe técnica e comercial da Auriun.
              </h2>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.65] text-white/80 sm:text-[0.975rem]">
                Orçamentos, especificação e sourcing para demandas industriais de alta exigência.
              </p>
            </div>
            <div className="flex w-full items-center justify-center border-t border-white/20 px-5 py-6 sm:px-10 lg:w-auto lg:border-l lg:border-t-0 lg:px-12">
              <Link
                to="/contato/?assunto=orcamento"
                className="footer-cta-button group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 bg-brand-orange px-8 text-[0.975rem] font-bold tracking-wide text-white lg:w-auto"
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
        <Container className="section-pad grid gap-10 pt-14 pb-14 md:grid-cols-2 md:gap-14 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-20">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="Auriun — página inicial"
            >
              <Logo className="h-auto w-[150px] max-w-[170px] sm:w-[160px]" />
            </Link>
            <p className="mt-6 max-w-sm text-[0.975rem] leading-[1.65] text-white/65 sm:mt-7">
              {SITE.valueProposition}
            </p>
            <p className="mt-4 max-w-sm text-[0.875rem] leading-[1.65] text-white/45 sm:mt-5 sm:text-sm">
              Distribuição, integração e inteligência em suprimentos para operações industriais
              de alta exigência.
            </p>
          </div>

          <FooterNavBlock title="Navegação" className="lg:col-span-2">
            <ul className="space-y-1 text-[0.9375rem] text-white/60">
              <li>
                <Link to="/" className="inline-flex min-h-12 items-center transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/a-auriun/"
                  className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                >
                  A Auriun
                </Link>
              </li>
              <li>
                <Link
                  to="/solucoes/"
                  className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  to="/segmentos/"
                  className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                >
                  Segmentos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato/"
                  className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </FooterNavBlock>

          <FooterNavBlock title="Soluções" className="lg:col-span-3">
            <ul className="space-y-1 text-[0.9375rem] text-white/60">
              {products.slice(0, 4).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={productPath(item.slug)}
                    className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
              {services.slice(0, 2).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={servicePath(item.slug)}
                    className="inline-flex min-h-12 items-center transition-colors hover:text-white"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/solucoes/"
                  className="inline-flex min-h-12 items-center gap-1.5 font-medium text-brand-orange transition-colors hover:text-white"
                >
                  Ver todas
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </FooterNavBlock>

          <FooterNavBlock title="Contato" className="lg:col-span-3">
            <ul className="space-y-1 text-[0.9375rem] text-white/60">
              {phone && hasValue(CONTACT.phone) ? (
                <li>
                  <a
                    href={phone}
                    className="inline-flex min-h-12 items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 opacity-70" aria-hidden />
                    {CONTACT.phone}
                  </a>
                </li>
              ) : null}
              {email && hasValue(CONTACT.email) ? (
                <li>
                  <a
                    href={email}
                    className="inline-flex min-h-12 items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mail className="size-4 opacity-70" aria-hidden />
                    {CONTACT.email}
                  </a>
                </li>
              ) : null}
              {hasValue(CONTACT.address) ? (
                <li className="flex items-start gap-2 py-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 opacity-70" aria-hidden />
                  <span>{CONTACT.address}</span>
                </li>
              ) : (
                <li className="py-3 text-white/40">Dados de contato em atualização.</li>
              )}
              {hasValue(SOCIAL.linkedin) ? (
                <li>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 transition-colors hover:text-white"
                  >
                    <ExternalLink className="size-4 opacity-70" aria-hidden />
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {hasValue(SOCIAL.instagram) ? (
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 transition-colors hover:text-white"
                  >
                    <ExternalLink className="size-4 opacity-70" aria-hidden />
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>

            <div className="mt-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/90">
                Segmentos
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-white/50">
                {segments.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={segmentPath(item.slug)}
                      className="inline-flex min-h-10 items-center transition-colors hover:text-white"
                    >
                      {item.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FooterNavBlock>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-7 sm:flex-row sm:items-end sm:justify-between">
          <p
            className="select-none text-[clamp(2.25rem,10vw,5.5rem)] font-bold leading-none tracking-[-0.06em] text-white/[0.06]"
            aria-hidden
          >
            AURIUN
          </p>
          <div className="text-[0.8125rem] leading-relaxed text-white/45 sm:text-right">
            <p>
              © {year} {SITE.name}. Todos os direitos reservados.
            </p>
            <p className="mt-1">{SITE.domain}</p>
          </div>
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
      {/* Mobile accordion */}
      <details className="group md:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between border-b border-white/10 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/90 marker:content-none [&::-webkit-details-marker]:hidden">
          {title}
          <ArrowRight className="size-4 shrink-0 text-brand-orange transition group-open:rotate-90" aria-hidden />
        </summary>
        <div className="pb-2 pt-3">{children}</div>
      </details>

      {/* Desktop static */}
      <div className="hidden md:block">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">
          {title}
        </h3>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
