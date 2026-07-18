import { MessageCircle } from 'lucide-react'
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
import { CONTACT, SITE, hasValue, whatsappUrl } from '@/data/site'

export function ContactPage() {
  useDocumentSeo({
    title: `Contato | ${SITE.name}`,
    description:
      'Fale com a Auriun Soluções Industriais. Canais para dúvidas, parcerias, fornecedores e informações gerais.',
    path: '/contato/',
    image: '/images/diferenciais/atendimento-consultivo.jpg',
  })

  const wa = whatsappUrl()
  const hasEmail = hasValue(CONTACT.email)
  const hasPhone = hasValue(CONTACT.phone)
  const hasAddress = hasValue(CONTACT.address)
  const hasAnyChannel = hasEmail || hasPhone || hasAddress || Boolean(wa)

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
        eyebrow="Fale com a Auriun"
        title="Como podemos ajudar?"
        description="Utilize nossos canais para dúvidas, parcerias, fornecedores ou informações gerais."
        image="/images/diferenciais/atendimento-consultivo.jpg"
        imageAlt="Atendimento consultivo da equipe Auriun"
        imagePosition="center 40%"
        imagePositionMobile="center 35%"
        primaryCta={{ to: '/solicitar-orcamento/', label: 'Solicitar orçamento' }}
        secondaryCta={{ to: '/solucoes/', label: 'Ver soluções' }}
      />

      <section className="section-pad bg-brand-mist/40">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
              Contato institucional
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-brand-graphite sm:text-3xl">
              Estamos à disposição
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              Use o formulário para dúvidas gerais, parcerias, fornecedores ou um primeiro
              contato comercial. Para cotações técnicas com escopo, prefira a página de
              orçamento.
            </p>

            {hasAnyChannel ? (
              <dl className="mt-8 space-y-5 text-sm">
                {hasEmail ? (
                  <div>
                    <dt className="font-semibold text-brand-graphite">E-mail</dt>
                    <dd className="mt-1">
                      <a
                        className="text-brand-blue hover:underline"
                        href={`mailto:${CONTACT.email}`}
                      >
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {hasPhone ? (
                  <div>
                    <dt className="font-semibold text-brand-graphite">Telefone</dt>
                    <dd className="mt-1 text-brand-slate">{CONTACT.phone}</dd>
                  </div>
                ) : null}
                {hasAddress ? (
                  <div>
                    <dt className="font-semibold text-brand-graphite">Localização</dt>
                    <dd className="mt-1 text-brand-slate">{CONTACT.address}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {wa ? (
              <Button
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="mt-8"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </Button>
            ) : null}

            <div className="mt-10 border-t border-brand-line pt-8">
              <p className="text-sm text-brand-slate">
                Precisa de cotação com escopo técnico?
              </p>
              <Button to="/solicitar-orcamento/" variant="ghost" className="mt-3">
                Ir para solicitar orçamento
              </Button>
            </div>
          </aside>

          <div className="border border-brand-line bg-white p-5 shadow-[0_12px_40px_rgba(3,18,32,0.06)] sm:p-8 lg:p-10">
            <h2 className="font-display text-xl font-semibold text-brand-graphite sm:text-2xl">
              Envie uma mensagem
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-slate">
              Preencha os campos para que possamos direcionar seu contato com mais agilidade.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
