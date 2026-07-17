import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'
import { InternalHero } from '@/components/ui/InternalHero'
import {
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { CONTACT, SITE, hasValue, whatsappUrl } from '@/data/site'

export function ContactPage() {
  const [params] = useSearchParams()
  const assunto = params.get('assunto')

  const intro = useMemo(() => {
    if (assunto === 'orcamento') {
      return 'Solicite um orçamento com o escopo técnico ou a lista de materiais. Nossa equipe analisa a demanda e retorna com orientação comercial.'
    }
    return 'Fale com a Auriun sobre produtos, serviços, segmentos e demandas estratégicas de fornecimento.'
  }, [assunto])

  useDocumentSeo({
    title: `Contato | ${SITE.shortName}`,
    description:
      'Entre em contato com a Auriun Soluções Industriais para orçamentos, suporte técnico-comercial e demandas industriais.',
    path: '/contato/',
    image: '/images/cta-industrial.jpg',
  })

  const wa = whatsappUrl()

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <InternalHero
        variant="contact"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Contato' },
        ]}
        eyebrow="Contato"
        title={assunto === 'orcamento' ? 'Solicitar orçamento' : 'Fale com a Auriun'}
        description={intro}
        image="/images/cta-industrial.jpg"
        imageAlt="Ambiente industrial representando o canal comercial da Auriun"
        imagePosition="center center"
        imagePositionMobile="center 40%"
        primaryCta={{ to: '/contato/?assunto=orcamento', label: 'Solicitar orçamento' }}
        secondaryCta={{ to: '/solucoes/', label: 'Ver soluções' }}
      />

      <section className="section-pad">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-brand-graphite sm:text-3xl">
              Canais comerciais
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              Descreva o contexto da demanda. Retornamos com leitura técnica e comercial
              objetiva. O tempo de resposta depende da complexidade do escopo.
            </p>

            <dl className="mt-8 space-y-5 text-sm">
              {hasValue(CONTACT.email) ? (
                <div>
                  <dt className="font-semibold text-brand-graphite">E-mail</dt>
                  <dd className="mt-1">
                    <a className="text-brand-blue hover:underline" href={`mailto:${CONTACT.email}`}>
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
              ) : (
                <div className="rounded-sm border border-dashed border-brand-line bg-brand-mist px-4 py-3 text-xs text-brand-slate">
                  PLACEHOLDER: e-mail comercial pendente em{' '}
                  <code className="text-[11px]">src/data/site.ts</code>
                </div>
              )}
              {hasValue(CONTACT.phone) ? (
                <div>
                  <dt className="font-semibold text-brand-graphite">Telefone</dt>
                  <dd className="mt-1 text-brand-slate">{CONTACT.phone}</dd>
                </div>
              ) : null}
              {hasValue(CONTACT.address) ? (
                <div>
                  <dt className="font-semibold text-brand-graphite">Localização</dt>
                  <dd className="mt-1 text-brand-slate">{CONTACT.address}</dd>
                </div>
              ) : (
                <div>
                  <dt className="font-semibold text-brand-graphite">Localização</dt>
                  <dd className="mt-1 text-brand-slate/70">Endereço pendente de confirmação.</dd>
                </div>
              )}
            </dl>

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
            ) : (
              <p className="mt-8 text-xs text-brand-slate">
                PLACEHOLDER: WhatsApp pendente de confirmação.
              </p>
            )}
          </div>

          <div className="border border-brand-line bg-white p-5 sm:p-9">
            <h2 className="font-display text-xl font-semibold text-brand-graphite sm:text-2xl">
              Formulário de contato
            </h2>
            <p className="mt-2 text-sm text-brand-slate">
              Campos obrigatórios ajudam a estruturar a solicitação com mais precisão.
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
