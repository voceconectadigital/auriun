import type { ComponentType, ReactNode, SVGProps } from 'react'
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'
import { InternalHero } from '@/components/ui/InternalHero'
import {
  JsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import {
  CONTACT,
  SITE,
  hasValue,
  mailHref,
  telHref,
  whatsappUrl,
} from '@/data/site'

/** Official WhatsApp glyph (same path as floating FAB). */
function WhatsAppGlyph({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

type ChannelIcon = ComponentType<{ className?: string; strokeWidth?: number }>

function ChannelRow({
  label,
  icon: Icon,
  children,
  href,
  ariaLabel,
  iconClassName,
}: {
  label: string
  icon: ChannelIcon
  children: ReactNode
  href?: string | null
  ariaLabel?: string
  iconClassName?: string
}) {
  const body = (
    <>
      <span className={`contact-panel__icon${iconClassName ? ` ${iconClassName}` : ''}`} aria-hidden>
        <Icon className="size-[1.125rem]" strokeWidth={1.75} />
      </span>
      <span className="contact-panel__text min-w-0 flex-1">
        <span className="contact-panel__label">{label}</span>
        <span className="contact-panel__value">{children}</span>
      </span>
      {href ? (
        <span className="contact-panel__arrow" aria-hidden>
          <ArrowUpRight className="size-3.5" strokeWidth={2} />
        </span>
      ) : null}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className="contact-panel__row contact-panel__row--link group outline-none"
        aria-label={ariaLabel}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {body}
      </a>
    )
  }

  return <div className="contact-panel__row">{body}</div>
}

export function ContactPage() {
  useDocumentSeo({
    title: `Contato | ${SITE.name}`,
    description:
      'Fale com a Auriun Soluções Industriais. Canais para dúvidas, parcerias, fornecedores e informações gerais.',
    path: '/contato/',
    image: '/images/diferenciais/atendimento-consultivo.jpg',
  })

  const emailHref = mailHref()
  const hasEmail = hasValue(CONTACT.email)
  const hasAddress = CONTACT.address.lines.length > 0
  const hasRegions = CONTACT.regions.some(
    (region) => hasValue(region.phone) || hasValue(region.whatsapp),
  )
  const hasAnyChannel = hasEmail || hasAddress || hasRegions

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Contato', path: '/contato/' },
          ]),
        ]}
      />
      <InternalHero
        variant="contact"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Contato' },
        ]}
        eyebrow="Contato institucional"
        title="Como podemos ajudar?"
        image="/images/diferenciais/atendimento-consultivo.jpg"
        imageAlt="Atendimento consultivo da equipe Auriun"
        imagePosition="center 40%"
        imagePositionMobile="center 35%"
      />

      <section className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:items-start">
          <aside>
            {hasAnyChannel ? (
              <div className="contact-panel">
                <header className="contact-panel__header">
                  <p className="contact-panel__eyebrow">
                    <span className="contact-panel__eyebrow-dash" aria-hidden />
                    Contato direto
                  </p>
                  <h2 className="contact-panel__title">Fale com a Auriun</h2>
                  <p className="contact-panel__lead">
                    Escolha o atendimento mais adequado para falar com nossa equipe comercial.
                  </p>
                </header>

                {hasRegions ? (
                  <div className="contact-panel__regions">
                    {CONTACT.regions.map((region) => {
                      const phoneHref = telHref(region.phone)
                      const wa = whatsappUrl(undefined, region.whatsapp)
                      const hasPhone = hasValue(region.phone)
                      return (
                        <div key={region.id} className="contact-panel__region">
                          <p className="contact-panel__region-title">{region.shortLabel}</p>
                          <div className="contact-panel__channels">
                            {hasPhone ? (
                              <ChannelRow
                                label="Telefone"
                                icon={Phone}
                                href={phoneHref}
                                ariaLabel={`Ligar para ${region.label}: ${region.phone}`}
                              >
                                {region.phone}
                              </ChannelRow>
                            ) : null}
                            {wa ? (
                              <ChannelRow
                                label="WhatsApp"
                                icon={WhatsAppGlyph}
                                href={wa}
                                ariaLabel={`Abrir WhatsApp ${region.label}: ${region.whatsapp}`}
                                iconClassName="contact-panel__icon--whatsapp"
                              >
                                {region.whatsapp}
                              </ChannelRow>
                            ) : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}

                {hasEmail ? (
                  <div className="contact-panel__block contact-panel__block--email">
                    <ChannelRow
                      label="E-mail comercial"
                      icon={Mail}
                      href={emailHref}
                      ariaLabel={`Enviar e-mail para ${CONTACT.email}`}
                    >
                      {CONTACT.email}
                    </ChannelRow>
                  </div>
                ) : null}

                {hasAddress ? (
                  <div className="contact-panel__block contact-panel__block--address">
                    <p className="contact-panel__region-title">Endereço</p>
                    <div className="contact-panel__address-row">
                      <span className="contact-panel__icon" aria-hidden>
                        <MapPin className="size-[1.125rem]" strokeWidth={1.75} />
                      </span>
                      <div className="contact-panel__text min-w-0 flex-1">
                        <span className="contact-panel__address">
                          {CONTACT.address.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </span>
                        {hasValue(CONTACT.address.serviceAreaNote) ? (
                          <p className="contact-panel__service-area-note" role="note">
                            {CONTACT.address.serviceAreaNote}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="contact-quote-callout">
              <p className="text-sm leading-relaxed text-brand-slate">
                Precisa de uma cotação técnica?
              </p>
              <Button
                to="/solicitar-orcamento/"
                variant="primary"
                className="contact-quote-cta mt-4 min-h-12 bg-brand-navy text-white hover:bg-brand-navy-mid focus-visible:ring-brand-navy"
              >
                Ir para solicitar orçamento
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </aside>

          <div className="border border-brand-line/90 bg-brand-mist/30 p-5 sm:p-8 lg:p-10">
            <h2 className="font-display text-2xl font-semibold text-brand-graphite sm:text-[1.75rem]">
              Fale com nossa equipe
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-base">
              Conte brevemente o motivo do contato para direcionarmos sua mensagem à área
              responsável.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
