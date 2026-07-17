import { Target, Eye, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { InternalHero } from '@/components/ui/InternalHero'
import { aboutContent } from '@/data/content'
import { JsonLd, organizationJsonLd, useDocumentSeo } from '@/components/seo/Seo'
import { SITE } from '@/data/site'

export function AboutPage() {
  useDocumentSeo({
    title: `A Auriun | ${SITE.shortName}`,
    description:
      'Conheça a Auriun Soluções Industriais: distribuição e integração de soluções para a indústria com atendimento consultivo.',
    path: '/a-auriun/',
    image: '/images/about-facility.jpg',
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <InternalHero
        variant="institutional"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'A Auriun' },
        ]}
        eyebrow="Institucional"
        title="A Auriun Soluções Industriais"
        description="Distribuidora e integradora de soluções para o setor industrial, com foco em eficiência operacional, redução de custos e continuidade dos processos produtivos."
        image="/images/about-facility.jpg"
        imageAlt="Instalação industrial da operação Auriun"
        imagePosition="center 35%"
        imagePositionMobile="center 30%"
        primaryCta={{ to: '/contato/?assunto=orcamento', label: 'Falar com a Auriun' }}
        secondaryCta={{ to: '/solucoes/', label: 'Ver soluções' }}
      />

      <section className="section-pad">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-graphite">
              Quem somos
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-slate">
              <p>
                A {SITE.name} atua no fornecimento de produtos, serviços e suporte
                técnico nas áreas de materiais elétricos, automação industrial,
                instrumentação, eletrônicos, tecnologia e suprimentos estratégicos.
              </p>
              <p>
                Nosso modelo combina atendimento consultivo, rede de fornecedores
                nacionais e internacionais e agilidade operacional para demandas de
                MRO, CAPEX, OPEX e projetos de expansão industrial.
              </p>
              <p>
                Além da distribuição, apoiamos Strategic Sourcing, desenvolvimento de
                fornecedores, Supply Chain e localização de materiais especiais ou de
                difícil aquisição.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-sm">
            <img
              src="/images/about-facility.jpg"
              alt="Instalação industrial"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Container>
      </section>

      <section className="section-pad bg-brand-mist">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="border border-brand-line bg-white p-7">
              <Target className="size-7 text-brand-blue" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-graphite">
                Missão
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate">
                {aboutContent.mission}
              </p>
            </article>
            <article className="border border-brand-line bg-white p-7">
              <Eye className="size-7 text-brand-orange" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-graphite">
                Visão
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate">
                {aboutContent.vision}
              </p>
            </article>
            <article className="border border-brand-line bg-white p-7 lg:row-span-1">
              <Heart className="size-7 text-brand-green" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-graphite">
                Valores
              </h3>
              <ul className="mt-3 space-y-3">
                {aboutContent.values.map((value) => (
                  <li key={value.title}>
                    <p className="text-sm font-semibold text-brand-graphite">
                      {value.title}
                    </p>
                    <p className="text-sm text-brand-slate">{value.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-graphite text-balance">
              Compromisso com qualidade, inovação e excelência
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              Buscamos parcerias de longo prazo, agregando valor por meio de soluções
              personalizadas e contribuindo para o crescimento sustentável dos negócios
              dos nossos clientes — sem promessas vazias, com foco em execução técnica
              e comercial consistente.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/contato/?assunto=orcamento" size="lg">
                Solicitar orçamento
              </Button>
              <Button to="/solucoes/" variant="ghost" size="lg">
                Ver soluções
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
