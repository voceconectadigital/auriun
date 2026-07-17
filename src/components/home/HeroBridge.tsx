/**
 * Transition bridge between dark hero and light institutional band.
 * Placed between sections with h-0 + -translate-y-1/2 so the bar
 * straddles the seam (~50% dark / ~50% light).
 */
export function HeroBridge() {
  return (
    <div className="relative z-30 h-0 overflow-visible">
      <div className="pointer-events-none relative -translate-y-1/2 px-4 sm:px-8 lg:px-10">
        <div className="pointer-events-auto mx-auto w-full max-w-[1360px]">
          <div className="hero-bridge relative flex min-h-[104px] flex-col overflow-hidden rounded-[4px] border border-[rgba(7,26,45,0.1)] bg-[linear-gradient(180deg,#ffffff_0%,#f5f7f9_100%)] md:flex-row md:items-stretch">
            <div className="brand-hairline absolute inset-x-0 top-0 z-[2] h-[3px]" aria-hidden />

            <div className="relative z-[1] flex min-w-0 flex-1 items-center gap-4 px-5 py-5 sm:px-8 md:py-0">
              <span className="h-9 w-px shrink-0 bg-brand-orange" aria-hidden />
              <p className="min-w-0 text-pretty text-sm leading-snug text-brand-graphite sm:text-[0.975rem]">
                Tecnologia, fornecimento e inteligência para manter a indústria em movimento.
              </p>
            </div>

            <div className="relative z-[1] flex shrink-0 items-center border-t border-[rgba(7,26,45,0.08)] bg-[#eef2f6] px-5 py-4 sm:px-8 md:w-[240px] md:border-l md:border-t-0 md:px-8 md:py-0 lg:w-[260px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Integração industrial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
