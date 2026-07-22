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

const PROCESS_STEPS = [
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

export function QuoteRequestPage() {
  useDocumentSeo({
    title: `Solicitar orçamento | ${SITE.name}`,
    description:
      'Solicite uma cotação técnica à Auriun Soluções Industriais. Compartilhe as informações da demanda para avaliação de escopo com mais precisão.',
    path: '/solicitar-orcamento/',
    image: '/images/bg-title/solicitar-orcamento.webp',
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
        image="/images/bg-title/solicitar-orcamento.webp"
        imageAlt="Profissional em ambiente industrial representando demandas comerciais da Auriun"
        imagePosition="center center"
        imagePositionMobile="center 40%"
      />

      <section className="section-pad bg-[linear-gradient(165deg,#f7f9fb_0%,#ffffff_42%,#f3f5f7_100%)]">
        <Container>
          <QuoteRequestForm />

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

      <section className="quote-after border-t border-brand-line bg-white">
        <Container className="py-10 sm:py-12">
          <header className="quote-after__head">
            <p className="quote-after__eyebrow">Após o envio</p>
            <h2 className="quote-after__title">Como seguimos com a sua solicitação</h2>
          </header>
          <ol className="quote-after__list">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="quote-after__item">
                <span className="quote-after__number" aria-hidden>
                  {step.number}
                </span>
                <div className="quote-after__body">
                  <h3 className="quote-after__item-title">{step.title}</h3>
                  <p className="quote-after__item-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
