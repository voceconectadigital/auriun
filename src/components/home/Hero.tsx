import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const HERO_WEBP = '/images/herobanner-aurion.webp'
const HERO_PNG = '/images/herobanner-aurion.png'

export function Hero() {
  return (
    <section
      className="relative z-10 bg-brand-navy"
      style={{ paddingTop: 'var(--site-header-h)' }}
    >
      <div className="relative overflow-hidden lg:min-h-[840px]">
        {/* Full-bleed photographic plane — mobile framing differs from desktop */}
        <div className="absolute inset-0" aria-hidden>
          <picture>
            <source srcSet={HERO_WEBP} type="image/webp" />
            <img
              src={HERO_PNG}
              alt=""
              className="hero-kenburns size-full object-cover object-[58%_42%] max-[767px]:min-h-full sm:object-[64%_40%] lg:object-right"
              width={1672}
              height={941}
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/78 to-brand-navy/25 sm:via-brand-navy/70 sm:to-transparent lg:via-brand-navy/55 lg:to-brand-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-brand-navy/40" />
          <div className="absolute inset-y-0 left-0 w-[min(56%,560px)] bg-[radial-gradient(ellipse_at_left,rgba(217,119,45,0.1),transparent_70%)]" />
        </div>

        <Container className="relative flex flex-col justify-end pb-20 pt-10 sm:pb-28 sm:pt-14 lg:min-h-[840px] lg:justify-center lg:pb-32 lg:pt-12">
          <div className="max-w-[640px] lg:max-w-[620px]">
            <p className="reveal text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-orange sm:text-[13px] sm:tracking-[0.2em]">
              Distribuição • Integração • Suprimentos industriais
            </p>
            <h1 className="reveal reveal-delay-1 hero-title mt-4 text-white sm:mt-5">
              Soluções que mantêm a indústria em movimento.
            </h1>
            <p className="reveal reveal-delay-2 mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.65] text-white/80 sm:mt-6 sm:text-lg lg:text-[1.125rem]">
              Produtos, tecnologia e inteligência em suprimentos para operações, projetos e
              desafios industriais de alta exigência.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Button
                to="/solucoes/"
                size="lg"
                variant="secondary"
                className="min-h-13 w-full justify-center sm:w-auto"
              >
                Conhecer soluções
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button
                to="/contato/?assunto=orcamento"
                size="lg"
                className="min-h-13 w-full justify-center sm:w-auto"
              >
                Solicitar orçamento
              </Button>
            </div>
            <p className="reveal reveal-delay-3 mt-8 border-l-2 border-brand-orange/90 pl-4 text-[0.875rem] font-medium leading-relaxed tracking-[0.03em] text-white/85 sm:mt-10 sm:text-[0.9375rem] sm:tracking-[0.04em]">
              <span className="inline-block">MRO · CAPEX</span>
              <span className="mx-1.5 text-white/40" aria-hidden>
                ·
              </span>
              <span className="inline-block">OPEX · Strategic Sourcing</span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}
