import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      {/* Full-bleed industrial photo — CTA gallery pattern */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/cta-industrial.jpg"
          alt=""
          className="size-full object-cover object-center opacity-40"
          width={1600}
          height={900}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/88 to-brand-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-brand-navy/40" />
      </div>

      <Container className="relative section-pad py-20 md:py-24 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
              Contato
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(1.85rem,3vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
              Pronto para transformar uma demanda em solução?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/78 sm:text-lg">
              Conte com atendimento técnico, agilidade comercial e uma ampla rede de
              fornecimento.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/solicitar-orcamento/" size="lg" className="min-h-13 w-full justify-center sm:w-auto">
                Solicitar orçamento
              </Button>
              <Button to="/contato/" size="lg" variant="outline-light" className="min-h-13 w-full justify-center sm:w-auto">
                Falar com a Auriun
              </Button>
            </div>
          </div>

          <div className="border-l-2 border-brand-orange/90 pl-6 sm:pl-8">
            <p className="text-sm font-medium tracking-[0.04em] text-white/85 sm:text-[0.975rem]">
              MRO · CAPEX · OPEX · Strategic Sourcing
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Materiais, tecnologia e inteligência em suprimentos para manter a indústria em
              movimento.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
