import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  JsonLd,
  organizationJsonLd,
  useDocumentSeo,
} from '@/components/seo/Seo'
import { SITE } from '@/data/site'

export function NotFoundPage() {
  useDocumentSeo({
    title: `Página não encontrada | ${SITE.shortName}`,
    description: 'A página solicitada não existe ou foi movida.',
    path: '/404/',
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <section className="section-pad">
        <Container className="max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
            Erro 404
          </p>
          <SectionHeading
            title="Página não encontrada"
            description="O endereço acessado não corresponde a nenhuma página publicada. Verifique a URL ou navegue a partir do menu principal."
            align="center"
            as="h1"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">
              Ir para a Home
            </Button>
            <Button to="/solucoes/" variant="ghost" size="lg">
              Ver soluções
            </Button>
            <Link
              to="/segmentos/"
              className="inline-flex items-center justify-center px-5 text-sm font-semibold text-brand-blue hover:underline"
            >
              Ver segmentos
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
