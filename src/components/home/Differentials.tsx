import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const differentials = [
  {
    title: 'Atendimento técnico e consultivo',
    titleLines: null as string[] | null,
    text: 'Escopo, especificação e contexto operacional orientam cada proposta.',
    span: 'lg:col-span-7 lg:row-span-2',
    featured: true,
    overlay: 'featured' as const,
    image: '/images/diferenciais/Atendimento-tecnico-e-consultivo.webp',
    // Profissional + painel à direita
    imagePosition: 'object-[72%_42%] sm:object-[70%_40%] lg:object-[68%_38%]',
  },
  {
    title: 'Agilidade e capacidade de sourcing',
    titleLines: ['Agilidade e capacidade', 'de sourcing'],
    text: 'Resposta objetiva a demandas urgentes e categorias de difícil reposição.',
    span: 'lg:col-span-5',
    featured: false,
    overlay: 'fade-right' as const,
    image: '/images/diferenciais/Agilidade-e-capacidade-de-sourcing.webp',
    // Profissional + prateleiras à direita
    imagePosition: 'object-[78%_45%] sm:object-[76%_42%] lg:object-[74%_40%]',
  },
  {
    title: 'Rede nacional e internacional',
    titleLines: ['Rede nacional e', 'internacional'],
    text: 'Acesso a fontes alinhadas à aplicação, com visão ampliada de fornecimento.',
    span: 'lg:col-span-5',
    featured: false,
    overlay: 'fade-right' as const,
    image: '/images/diferenciais/Rede-nacional-e-internacional.webp',
    // Centro logístico: armazém + pátio/porto
    imagePosition: 'object-[42%_48%] sm:object-[40%_45%] lg:object-[38%_42%]',
  },
  {
    title: 'Compromisso com prazos e continuidade operacional',
    titleLines: null as string[] | null,
    text: 'Fornecimento pensado para reduzir risco de desabastecimento na operação.',
    span: 'lg:col-span-12',
    featured: false,
    overlay: 'fade-right' as const,
    image: '/images/diferenciais/Compromisso-com-prazos-e-continuidade-operacional.webp',
    // Profissional + linha industrial (técnico à direita)
    imagePosition: 'object-[76%_50%] sm:object-[72%_48%] lg:object-[68%_46%]',
  },
]

export function Differentials() {
  return (
    <section className="bg-brand-mist">
      <Container className="section-pad py-20 md:py-24 lg:py-28">
        <div className="grid gap-10 border-b border-brand-line pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Por que Auriun
            </p>
            <h2 className="section-title mt-4 text-brand-graphite">
              Critério técnico em cada etapa do fornecimento.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-brand-slate sm:text-lg lg:justify-self-end lg:text-right">
            A Auriun combina atendimento consultivo, rede ampliada e visão de continuidade
            para apoiar compras, manutenção e engenharia industrial.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-12 lg:gap-5">
          {differentials.map((item, index) => (
            <article
              key={item.title}
              className={[
                'differential-card group relative isolate overflow-hidden',
                'border border-white/10',
                'min-h-[260px] sm:min-h-[260px]',
                item.span,
                item.featured ? 'lg:min-h-[360px]' : 'lg:min-h-[220px]',
                index === 3 ? 'min-h-[240px] lg:min-h-[200px]' : '',
                'active:scale-[0.985] transition-transform duration-200 lg:active:scale-100',
              ].join(' ')}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden
                className={[
                  'differential-card-image absolute inset-0 size-full object-cover',
                  item.imagePosition,
                  item.featured ? 'scale-[1.02]' : '',
                ].join(' ')}
                width={item.featured ? 1200 : 900}
                height={item.featured ? 900 : 600}
                loading="lazy"
                decoding="async"
              />

              <div
                className={[
                  'differential-card-overlay absolute inset-0',
                  item.overlay === 'featured' ? 'differential-card-overlay--featured' : '',
                  item.overlay === 'fade-right' ? 'differential-card-overlay--fade-right' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden
              />

              <div className="differential-card-content relative z-[1] flex h-full min-h-[inherit] flex-col justify-between p-6 sm:p-7 lg:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {String(index + 1).padStart(2, '0')}
                </p>

                <div className="mt-auto max-w-xl pt-10">
                  <span className="differential-card-rule mb-4 block h-0.5 w-8 bg-brand-orange" aria-hidden />
                  <h3
                    className={[
                      'font-semibold tracking-tight text-white',
                      item.featured
                        ? 'text-2xl sm:text-3xl lg:text-[2rem] lg:leading-tight'
                        : index === 3
                          ? 'text-xl sm:text-2xl lg:max-w-2xl'
                          : 'text-xl sm:text-2xl',
                    ].join(' ')}
                  >
                    {item.titleLines
                      ? item.titleLines.map((line, lineIndex) => (
                          <span key={line}>
                            {lineIndex > 0 ? <br /> : null}
                            {line}
                          </span>
                        ))
                      : item.title}
                  </h3>
                  <p
                    className={[
                      'mt-3 leading-relaxed text-white/72',
                      item.featured ? 'max-w-md text-base sm:text-lg' : 'text-[0.975rem]',
                    ].join(' ')}
                  >
                    {item.text}
                  </p>
                </div>
              </div>

              <ArrowRight
                className="differential-card-arrow pointer-events-none absolute bottom-6 right-6 z-[1] size-4 text-white/55 sm:bottom-7 sm:right-7"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
