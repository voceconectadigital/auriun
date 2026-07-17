import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type Crumb = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: Crumb[]
  tone?: 'light' | 'dark'
}

export function Breadcrumb({ items, tone = 'light' }: BreadcrumbProps) {
  const dark = tone === 'dark'

  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] sm:text-sm">
      <ol
        className={[
          'flex flex-wrap items-center gap-1.5',
          dark ? 'text-white/55' : 'text-brand-slate',
        ].join(' ')}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className={['size-3.5 shrink-0', dark ? 'opacity-40' : 'opacity-50'].join(' ')}
                  aria-hidden
                />
              ) : null}
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className={
                    dark
                      ? 'transition-colors hover:text-white'
                      : 'hover:text-brand-blue'
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    last
                      ? dark
                        ? 'font-medium text-white'
                        : 'font-medium text-brand-graphite'
                      : undefined
                  }
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
