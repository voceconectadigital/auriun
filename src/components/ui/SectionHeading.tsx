import { useEffect, useRef, useState, type ReactNode } from 'react'

type SectionHeadingProps = {
  /** Shown only when `variant="major"`. Ignored for `compact`. */
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  /** Alias for `tone="dark"` — light eyebrow/title on navy bands. */
  onDark?: boolean
  as?: 'h1' | 'h2'
  /**
   * `major` — dash + orange dot + uppercase eyebrow + large H2 (full-width card grids).
   * `compact` — H2 only; default so pages stay under-decorated.
   */
  variant?: 'major' | 'compact'
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  onDark = false,
  as = 'h2',
  variant = 'compact',
  className = '',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center'
  const dark = onDark || tone === 'dark'
  const isMajor = variant === 'major'
  const showEyebrow = isMajor && Boolean(eyebrow)
  const TitleTag = as
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (inView) return

    const node = rootRef.current
    if (!node) return

    let cancelled = false
    const markVisible = () => {
      if (!cancelled) setInView(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markVisible()
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)

    const frame = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh - 40 && rect.bottom > 40) {
        markVisible()
        observer.disconnect()
      }
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [inView])

  return (
    <div
      ref={rootRef}
      className={[
        'section-heading',
        isMajor ? 'section-heading--major' : 'section-heading--compact',
        inView ? 'section-heading--inview' : '',
        centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showEyebrow ? (
        <p
          className={[
            'section-heading__eyebrow inline-flex items-center',
            centered ? 'justify-center' : '',
            dark ? 'section-heading__eyebrow--dark' : 'section-heading__eyebrow--light',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="section-heading__dash" aria-hidden />
          <span className="section-heading__dot" aria-hidden />
          <span className="section-heading__label">{eyebrow}</span>
        </p>
      ) : null}
      <TitleTag
        className={[
          'font-display font-semibold tracking-tight text-balance',
          isMajor
            ? 'text-[1.875rem] leading-[1.2] sm:text-4xl sm:leading-[1.15]'
            : 'text-2xl leading-snug sm:text-3xl sm:leading-snug',
          showEyebrow ? 'mt-4' : '',
          dark ? 'text-white' : 'text-brand-navy',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={[
            isMajor ? 'mt-5 text-base leading-relaxed sm:text-lg' : 'mt-3 text-base leading-relaxed',
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
