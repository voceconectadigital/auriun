import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { InternalHero } from '@/components/ui/InternalHero'
import { NavigableCard } from '@/components/ui/NavigableCard'
import {
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { products, productPath } from '@/data/products'
import { services, servicePath } from '@/data/services'
import { SITE } from '@/data/site'

export function SolutionsPage() {
  const hubCover = products[0]

  useDocumentSeo({
    title: `Soluções | ${SITE.shortName}`,
    description:
      'Produtos e serviços industriais da Auriun: elétrica, automação, instrumentação, MRO, sourcing e supply chain.',
    path: '/solucoes/',
    image: hubCover.image,
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <InternalHero
        variant="hub"
        crumbs={[
          { label: 'Início', to: '/' },
          { label: 'Soluções' },
        ]}
        eyebrow="Soluções"
        title="Produtos e serviços para a indústria"
        image={hubCover.image}
        imageAlt={hubCover.imageAlt}
        imagePosition="68% center"
        imagePositionMobile="62% center"
      />

      <section id="produtos" className="scroll-mt-28 section-pad">
        <Container>
          <SectionHeading
            variant="major"
            eyebrow="Produtos"
            title="Linhas de fornecimento"
            description="Categorias principais do portfólio Auriun."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <NavigableCard
                key={item.slug}
                to={productPath(item.slug)}
                title={item.title}
                description={item.description}
                ctaLabel="Conhecer solução"
                media={
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="size-full object-cover"
                    loading="lazy"
                    width={640}
                    height={400}
                  />
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="servicos" className="scroll-mt-28 section-pad bg-brand-mist">
        <Container>
          <SectionHeading
            variant="major"
            eyebrow="Serviços"
            title="Integração além da distribuição"
            description="Sourcing, supply chain, materiais especiais e suporte a projetos."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <NavigableCard
                key={item.slug}
                to={servicePath(item.slug)}
                title={item.title}
                description={item.description}
                ctaLabel="Conhecer solução"
                media={
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="size-full object-cover"
                    loading="lazy"
                    width={640}
                    height={400}
                  />
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container className="flex flex-col items-start justify-between gap-6 border border-brand-line bg-brand-mist p-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold text-brand-graphite">
              Precisa de uma cotação técnica?
            </h2>
            <p className="mt-2 text-sm text-brand-slate">
              Envie o escopo ou a lista de materiais — retornamos com orientação comercial objetiva.
            </p>
          </div>
          <Button to="/solicitar-orcamento/">
            Solicitar orçamento
          </Button>
        </Container>
      </section>
    </>
  )
}
