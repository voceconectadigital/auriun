import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
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

const CONTACT_WA_MESSAGE =
  'Olá! Encontrei a Auriun pelo site e gostaria de mais informações.'

function ChannelRow({
  label,
  icon: Icon,
  children,
  href,
  ariaLabel,
}: {
  label: string
  icon: typeof Phone
  children: ReactNode
  href?: string | null
  ariaLabel?: string
}) {
  const body = (
    <>
      <span className="contact-panel__icon" aria-hidden>
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="contact-panel__text min-w-0 flex-1">
        <span className="contact-panel__label">{label}</span>
        <span className="contact-panel__value">{children}</span>
      </span>
      {href ? (
        <span className="contact-panel__arrow" aria-hidden>
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      ) : null}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className="contact-panel__row contact-panel__row--link group outline-none focus-visible:bg-brand-mist/70"
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

  const wa = whatsappUrl(CONTACT_WA_MESSAGE)
  const phoneHref = telHref()
  const emailHref = mailHref()
  const hasEmail = hasValue(CONTACT.email)
  const hasPhone = hasValue(CONTACT.phone)
  const hasAddress = hasValue(CONTACT.address)
  const hasWhatsApp = Boolean(wa)
  const hasAnyChannel = hasEmail || hasPhone || hasAddress || hasWhatsApp

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
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Contato institucional
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-brand-graphite sm:text-3xl">
              Estamos à disposição
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              Fale com a Auriun para dúvidas, parcerias, fornecedores ou informações comerciais.
              Para demandas com especificação e escopo, utilize nossa página de orçamento.
            </p>

            {hasAnyChannel ? (
              <>
                <div className="contact-panel">
                  {hasPhone ? (
                    <ChannelRow
                      label="Telefone"
                      icon={Phone}
                      href={phoneHref}
                      ariaLabel={`Ligar para ${CONTACT.phone}`}
                    >
                      {CONTACT.phone}
                    </ChannelRow>
                  ) : null}
                  {hasWhatsApp && wa ? (
                    <ChannelRow
                      label="WhatsApp"
                      icon={MessageCircle}
                      href={wa}
                      ariaLabel={`Abrir WhatsApp: ${CONTACT.whatsapp}`}
                    >
                      {CONTACT.whatsapp}
                    </ChannelRow>
                  ) : null}
                  {hasEmail ? (
                    <ChannelRow
                      label="E-mail"
                      icon={Mail}
                      href={emailHref}
                      ariaLabel={`Enviar e-mail para ${CONTACT.email}`}
                    >
                      {CONTACT.email}
                    </ChannelRow>
                  ) : null}
                  {hasAddress ? (
                    <ChannelRow label="Localização" icon={MapPin}>
                      {CONTACT.address}
                    </ChannelRow>
                  ) : null}
                </div>
                {typeof window !== 'undefined' &&
                import.meta.env.DEV &&
                CONTACT.isIllustrative ? (
                  <p className="mt-3 text-[12px] leading-relaxed text-brand-slate/70">
                    Dados provisórios para validação do layout.
                  </p>
                ) : null}
              </>
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
