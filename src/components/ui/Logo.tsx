type LogoProps = {
  className?: string
  /** Preferir `default` (colorida) sobre fundo branco. */
  variant?: 'default' | 'on-dark'
}

/**
 * Logo oficial: aurion-logo.webp (nome do arquivo mantido).
 * Dimensões de referência ~260×212. object-contain, sem fundo artificial.
 */
export function Logo({ className = 'h-14 w-auto', variant = 'default' }: LogoProps) {
  return (
    <img
      src="/aurion-logo.webp"
      alt="Auriun Soluções Industriais"
      width={260}
      height={212}
      className={[
        className,
        'object-contain object-left',
        variant === 'on-dark' ? 'brightness-[1.05]' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      decoding="async"
      style={{ background: 'transparent' }}
    />
  )
}
