import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as = 'h2',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center'
  const dark = tone === 'dark'
  const TitleTag = as


  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p
          className={[
            'mb-3 text-xs font-semibold uppercase tracking-[0.18em]',
            dark ? 'text-brand-orange' : 'text-brand-blue',
          ].join(' ')}
        >
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={[
          'font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl',
          dark ? 'text-white' : 'text-brand-graphite',
        ].join(' ')}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={[
            'mt-4 text-base leading-relaxed sm:text-lg',
            dark ? 'text-white/75' : 'text-brand-slate',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
