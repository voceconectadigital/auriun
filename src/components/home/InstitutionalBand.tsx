import { Container } from '@/components/ui/Container'

const indicators = [
  {
    title: 'Fornecimento industrial',
    text: 'Materiais e tecnologias para manter operações e projetos em andamento.',
  },
  {
    title: 'Integração técnica',
    text: 'Leitura da especificação e da aplicação antes da proposta comercial.',
  },
  {
    title: 'Inteligência em suprimentos',
    text: 'Sourcing, rede ampliada e apoio a demandas de difícil aquisição.',
  },
] as const

export function InstitutionalBand() {
  return (
    <section className="relative z-0 bg-white pt-32 md:pt-[5.75rem] lg:pt-[6.75rem]">
      <Container className="px-5 pb-16 sm:px-8 md:pb-20 lg:px-10 lg:pb-24">
        <div className="grid gap-8 border-b border-brand-line pb-10 md:gap-10 md:pb-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.8fr)] lg:items-end lg:gap-20 lg:pb-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
              A Auriun
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,8vw,3.15rem)] font-bold leading-[1.14] tracking-[-0.03em] text-brand-graphite text-balance lg:text-[clamp(1.85rem,3.2vw,3.15rem)]">
              Mais do que fornecer materiais, integramos soluções para operações industriais.
            </h2>
          </div>

          <div className="border-l-2 border-brand-orange/80 pl-4 sm:pl-5 lg:pb-1 lg:pl-6">
            <p className="max-w-none text-[1.0625rem] leading-[1.65] text-brand-slate sm:max-w-md sm:text-lg lg:ml-auto lg:max-w-sm">
              Atendimento consultivo, agilidade comercial e capacidade de sourcing para MRO,
              CAPEX, OPEX e projetos de expansão — com visão de continuidade operacional.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid list-none gap-8 md:mt-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {indicators.map((item, index) => (
            <li key={item.title} className="relative">
              {index > 0 ? (
                <div
                  className="absolute -left-4 top-0 hidden h-full w-px bg-brand-line md:block lg:-left-6"
                  aria-hidden
                />
              ) : null}
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-semibold tracking-tight text-brand-graphite sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-[1.65] text-brand-slate sm:text-base">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
