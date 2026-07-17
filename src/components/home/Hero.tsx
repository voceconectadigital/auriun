import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const HERO_WEBP = '/images/herobanner-aurion.webp'
const HERO_PNG = '/images/herobanner-aurion.png'

export function Hero() {
  return (
    <section className="relative z-10 bg-brand-navy pt-[89px]">
      <div className="relative min-h-[min(92svh,820px)] overflow-hidden lg:min-h-[840px]">
        {/* Full-bleed photographic plane — detail biased to the right */}
        <div className="absolute inset-0" aria-hidden>
          <picture>
            <source srcSet={HERO_WEBP} type="image/webp" />
            <img
              src={HERO_PNG}
              alt=""
              className="hero-kenburns size-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
              width={1672}
              height={941}
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          {/* Left reading zone — photo remains dominant on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-transparent lg:via-brand-navy/55 lg:to-brand-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-transparent to-brand-navy/35" />
          <div className="absolute inset-y-0 left-0 w-[min(48%,560px)] bg-[radial-gradient(ellipse_at_left,rgba(217,119,45,0.1),transparent_70%)]" />
        </div>

        <Container className="relative flex min-h-[min(92svh,820px)] flex-col justify-end pb-28 pt-14 lg:min-h-[840px] lg:justify-center lg:pb-32 lg:pt-12">
          <div className="max-w-[640px] lg:max-w-[620px]">
            <p className="reveal text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-orange sm:text-[13px]">
              Distribuição • Integração • Suprimentos industriais
            </p>
            <h1 className="reveal reveal-delay-1 hero-title mt-5 text-white">
              Soluções que mantêm a indústria em movimento.
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-[34rem] text-base leading-relaxed text-white/80 sm:text-lg lg:text-[1.125rem]">
              Produtos, tecnologia e inteligência em suprimentos para operações, projetos e
              desafios industriais de alta exigência.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/solucoes/" size="lg" variant="secondary">
                Conhecer soluções
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button to="/contato/?assunto=orcamento" size="lg">
                Solicitar orçamento
              </Button>
            </div>
            <p className="reveal reveal-delay-3 mt-10 border-l-2 border-brand-orange/90 pl-4 text-sm font-medium tracking-[0.04em] text-white/80 sm:text-[0.9375rem]">
              MRO · CAPEX · OPEX · Strategic Sourcing
            </p>
          </div>
        </Container>
      </div>
    </section>
  )
}
