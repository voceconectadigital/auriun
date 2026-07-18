import { Link } from 'react-router-dom'
import { ClipboardList, FileSearch, MessagesSquare } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { QuoteRequestForm } from '@/components/contact/QuoteRequestForm'
import { InternalHero } from '@/components/ui/InternalHero'
import {
  JsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { SITE } from '@/data/site'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Contexto da demanda',
    text: 'Informe segmento, tipo de necessidade e o máximo de detalhe técnico disponível.',
  },
  {
    icon: FileSearch,
    title: 'Leitura de escopo',
    text: 'Nossa equipe analisa a solicitação com foco em aderência técnica e comercial.',
  },
  {
    icon: MessagesSquare,
    title: 'Retorno orientado',
    text: 'Retornamos com orientação objetiva conforme a complexidade do escopo informado.',
  },
]

export function QuoteRequestPage() {
  useDocumentSeo({
    title: `Solicitar orçamento | ${SITE.name}`,
    description:
      'Solicite uma cotação técnica à Auriun Soluções Industriais. Compartilhe as informações da demanda para avaliação de escopo com mais precisão.',
    path: '/solicitar-orcamento/',
    image: '/images/cta-industrial.jpg',
  })

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: 'Solicitar orçamento', path: '/solicitar-orcamento/' },
          ]),
        ]}
      />
      <InternalHero
        variant="contact"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Solicitar orçamento' },
        ]}
        eyebrow="Atendimento comercial"
        title="Solicite uma cotação técnica"
        description="Compartilhe as informações da sua demanda para que nossa equipe possa avaliar o escopo com mais precisão."
        image="/images/cta-industrial.jpg"
        imageAlt="Ambiente industrial representando demandas comerciais da Auriun"
        imagePosition="center center"
        imagePositionMobile="center 40%"
        primaryCta={{ to: '/solucoes/', label: 'Ver soluções' }}
        secondaryCta={{ to: '/contato/', label: 'Fale conosco' }}
      />

      <section className="border-b border-brand-line bg-white">
        <Container className="py-10 sm:py-12">
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center bg-brand-navy text-white">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">
                      Etapa {index + 1}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-brand-graphite">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-slate">{step.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-[linear-gradient(180deg,#f7f9fb_0%,#ffffff_42%)]">
        <Container className="max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
              Formulário comercial
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-brand-graphite sm:text-3xl">
              Detalhe sua solicitação
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-slate">
              Quanto mais contexto técnico e operacional, mais precisa será a avaliação do escopo.
            </p>
          </div>

          <div className="mt-10 border border-brand-line bg-white p-5 shadow-[0_16px_48px_rgba(3,18,32,0.07)] sm:p-8 lg:p-12">
            <QuoteRequestForm />
          </div>

          <p className="mt-8 text-center text-sm text-brand-slate">
            Dúvidas gerais, parcerias ou fornecedores?{' '}
            <Link
              to="/contato/"
              className="font-semibold text-brand-blue underline-offset-2 hover:underline"
            >
              Ir para Contato
            </Link>
          </p>
        </Container>
      </section>
    </>
  )
}
