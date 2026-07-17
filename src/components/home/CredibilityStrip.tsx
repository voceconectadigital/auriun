import { Container } from '@/components/ui/Container'

const pillars = [
  {
    title: 'Atendimento consultivo',
    text: 'Leitura técnica da demanda antes da proposta comercial.',
  },
  {
    title: 'Rede nacional e internacional',
    text: 'Acesso ampliado a fontes de fornecimento para a indústria.',
  },
  {
    title: 'Materiais de difícil aquisição',
    text: 'Busca estruturada de itens especiais e de baixa disponibilidade.',
  },
  {
    title: 'MRO, CAPEX e OPEX',
    text: 'Suprimentos alinhados ao ritmo de manutenção, projeto e operação.',
  },
] as const

export function CredibilityStrip() {
  return (
    <section className="border-b border-brand-line bg-brand-mist">
      <Container className="grid sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((item, index) => (
          <div
            key={item.title}
            className={[
              'px-1 py-10 sm:px-6 lg:px-8 lg:py-12',
              index > 0 ? 'lg:border-l lg:border-brand-line' : '',
              index > 0 && index % 2 === 0 ? 'sm:border-t sm:border-brand-line lg:border-t-0' : '',
              index >= 2 ? 'border-t border-brand-line sm:border-t-0 lg:border-t-0' : '',
              index === 1 ? 'sm:border-l sm:border-brand-line' : '',
              index === 3 ? 'sm:border-l sm:border-brand-line sm:border-t sm:border-brand-line lg:border-t-0' : '',
            ].join(' ')}
          >
            <p className="font-display text-xl font-semibold tracking-tight text-brand-graphite sm:text-2xl">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-[0.9375rem]">
              {item.text}
            </p>
          </div>
        ))}
      </Container>
    </section>
  )
}
