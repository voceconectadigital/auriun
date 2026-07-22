import { Container } from '@/components/ui/Container'
import { partnerBrands } from '@/data/content'

const brandCardClass =
  'group aspect-[3/2] flex items-center justify-center overflow-hidden border border-brand-line bg-white [border-radius:5px] transition-[box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-blue/25 hover:shadow-[0_8px_22px_rgba(7,26,45,0.1)]'

function BrandLogo({
  name,
  logo,
}: {
  name: string
  logo: string
}) {
  return (
    <img
      src={logo}
      alt={name}
      className="h-full w-full object-contain object-center opacity-80 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100 group-hover:brightness-105"
      width={300}
      height={200}
      loading="lazy"
      decoding="async"
    />
  )
}

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
      <Container className="pb-16 md:hidden">
        <ul className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:gap-4">
          {partnerBrands.map((brand) => (
            <li
              key={brand.name}
              className={brandCardClass}
            >
              <BrandLogo name={brand.name} logo={brand.logo} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.8125rem] leading-relaxed text-brand-slate/70">
          Não representa exclusividade ou representação oficial das marcas.
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
                  key={`${brand.name}-${index}`}
                  className={`${brandCardClass} w-[180px] shrink-0 sm:w-[210px]`}
                >
                  <BrandLogo name={brand.name} logo={brand.logo} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Container className="hidden motion-reduce:block">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {partnerBrands.map((brand) => (
              <li
                key={brand.name}
                className={brandCardClass}
              >
                <BrandLogo name={brand.name} logo={brand.logo} />
              </li>
            ))}
          </ul>
        </Container>

        <Container className="sr-only">
          <ul>
            {partnerBrands.map((brand) => (
              <li key={brand.name}>{brand.name}</li>
            ))}
          </ul>
        </Container>

        <Container className="mt-8">
          <p className="text-xs leading-relaxed text-brand-slate/70">
            Não representa exclusividade ou representação oficial das marcas.
          </p>
        </Container>
      </div>
    </section>
  )
}
