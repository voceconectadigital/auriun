import { BRAND_LOGO } from '@/data/site'

type LogoProps = {
  className?: string
}

/**
 * Logo oficial 3D com sombra embutida — caminho centralizado em BRAND_LOGO.
 * object-contain, sem filtros, sem fundo artificial, sem sombra CSS extra.
 */
export function Logo({ className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src={BRAND_LOGO.src}
      alt={BRAND_LOGO.alt}
      width={BRAND_LOGO.width}
      height={BRAND_LOGO.height}
      className={[className, 'object-contain object-left'].filter(Boolean).join(' ')}
      decoding="async"
    />
  )
}
