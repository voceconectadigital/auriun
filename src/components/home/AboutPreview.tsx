import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const highlights = [
  'Leitura técnica da demanda antes da cotação',
  'Portfólio multimarcas e materiais especiais',
  'Foco em disponibilidade e continuidade operacional',
] as const

export function AboutPreview() {
  return (
    <section className="section-pad">
      <Container className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[360px] overflow-hidden bg-brand-navy lg:min-h-[520px]">
          <img
            src="/images/about-facility.jpg"
            alt="Infraestrutura industrial ilustrativa"
            className="absolute inset-0 size-full object-cover opacity-90"
            loading="lazy"
            width={900}
            height={700}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Parceria industrial
            </p>
            <p className="mt-2 max-w-sm text-lg font-medium text-white">
              Integração entre necessidade, fornecimento e operação.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            A Auriun
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-graphite text-balance sm:text-4xl lg:text-5xl">
            Inteligência técnica entre demanda e fornecimento
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
            Atuamos como distribuidora e integradora de soluções industriais, combinando
            rede de fornecedores, conhecimento técnico e atendimento consultivo para
            manutenção, projetos e suprimentos estratégicos.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="border-l-2 border-brand-orange pl-4 text-[0.9375rem] text-brand-graphite"
              >
                {item}
              </li>
            ))}
          </ul>
          <Button to="/a-auriun/" variant="ghost" className="mt-10 self-start">
            Conhecer a Auriun
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  )
}
