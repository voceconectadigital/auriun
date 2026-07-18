import { Link } from 'react-router-dom'
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
    number: '01',
    title: 'Entendimento da demanda',
    text: 'Você informa o contexto, a aplicação e os requisitos disponíveis.',
  },
  {
    number: '02',
    title: 'Análise do escopo',
    text: 'Avaliamos aderência técnica, disponibilidade e caminhos de fornecimento.',
  },
  {
    number: '03',
    title: 'Retorno comercial',
    text: 'Apresentamos o direcionamento adequado à complexidade da solicitação.',
  },
]

const SCOPE_HINTS = [
  'Produto, serviço ou aplicação',
  'Quantidade ou dimensão',
  'Especificação técnica disponível',
  'Prazo ou criticidade',
  'Local de entrega ou operação',
  'Marcas de referência (se houver)',
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
        title="Conte o que sua operação precisa"
        image="/images/cta-industrial.jpg"
        imageAlt="Ambiente industrial representando demandas comerciais da Auriun"
        imagePosition="center center"
        imagePositionMobile="center 40%"
      />

      <section className="border-b border-brand-line bg-white">
        <Container className="py-8 sm:py-10">
          <ol className="quote-process">
            {STEPS.map((step) => (
              <li key={step.number} className="quote-process__step">
                <span className="quote-process__number" aria-hidden>
                  {step.number}
                </span>
                <div className="quote-process__body">
                  <h2 className="font-display text-base font-semibold text-brand-graphite sm:text-lg">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-pad bg-[linear-gradient(165deg,#f7f9fb_0%,#ffffff_42%,#f3f5f7_100%)]">
        <Container>
          <div className="quote-main">
            <aside className="quote-scope-panel">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Para uma análise mais precisa
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
                Informações que ajudam na cotação
              </h2>
              <ul className="quote-scope-panel__list mt-6">
                {SCOPE_HINTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-white/75">
                Se você ainda não possui todas as informações, envie o que estiver disponível.
                Nossa equipe poderá orientar os próximos pontos.
              </p>
            </aside>

            <div className="quote-form-panel">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Solicitação de orçamento
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-brand-graphite sm:text-[1.75rem]">
                Vamos estruturar sua cotação
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-base">
                Preencha os dados abaixo e detalhe o máximo possível sobre sua necessidade.
              </p>
              <div className="mt-7">
                <QuoteRequestForm />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-brand-slate">
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
