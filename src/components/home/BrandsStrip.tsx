import { Container } from '@/components/ui/Container'
import { partnerBrands } from '@/data/content'

export function BrandsStrip() {
  const loop = [...partnerBrands, ...partnerBrands]

  return (
    <section className="bg-white">
      <Container className="section-pad pb-10 pt-20 md:pb-12 md:pt-24 lg:pb-14 lg:pt-28">
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Marcas
          </p>
          <h2 className="section-title mt-4 text-brand-graphite">
            Tecnologia das principais marcas do mercado.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.65] text-brand-slate sm:text-lg">
            Um portfólio multimarcas para diferentes demandas industriais.
          </p>
        </div>
      </Container>

      {/* Mobile / tablet: static grid */}
      <Container className="px-5 pb-16 sm:px-8 md:hidden lg:px-10">
        <ul className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:gap-4">
          {partnerBrands.map((brand) => (
            <li
              key={brand}
              className="flex min-h-[88px] items-center justify-center border border-brand-line bg-brand-mist/40 px-3 py-5"
            >
              <span className="text-center text-[0.875rem] font-semibold tracking-[0.04em] text-brand-graphite/75">
                {brand}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.8125rem] leading-relaxed text-brand-slate/70">
          Logotipos oficiais pendentes de autorização — células tipográficas temporárias.
          Não representa exclusividade ou representação oficial.
        </p>
      </Container>

      {/* Desktop: marquee */}
      <div className="relative hidden pb-16 md:block md:pb-20 lg:pb-24">
        <div className="motion-reduce:hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24 lg:w-32"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24 lg:w-32"
            aria-hidden
          />

          <div className="brands-marquee overflow-hidden" aria-hidden>
            <div className="brands-marquee-track flex w-max gap-4 px-4 sm:gap-5">
              {loop.map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="flex h-[96px] w-[180px] shrink-0 items-center justify-center border border-brand-line bg-brand-mist/40 px-4 sm:h-[108px] sm:w-[200px]"
                >
                  <span className="text-center text-sm font-semibold tracking-[0.04em] text-brand-graphite/70 sm:text-[0.95rem]">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Container className="hidden motion-reduce:block">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {partnerBrands.map((brand) => (
              <li
                key={brand}
                className="flex min-h-[96px] items-center justify-center border border-brand-line bg-brand-mist/40 px-4 py-6"
              >
                <span className="text-center text-sm font-semibold tracking-[0.04em] text-brand-graphite/70">
                  {brand}
                </span>
              </li>
            ))}
          </ul>
        </Container>

        <Container className="sr-only">
          <ul>
            {partnerBrands.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </Container>

        <Container className="mt-8">
          <p className="text-xs leading-relaxed text-brand-slate/70">
            Logotipos oficiais pendentes de autorização — células tipográficas temporárias.
            Não representa exclusividade ou representação oficial.
          </p>
        </Container>
      </div>
    </section>
  )
}
