import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type Crumb = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: Crumb[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] sm:text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-brand-slate">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 opacity-50" aria-hidden />
              ) : null}
              {item.to && !last ? (
                <Link to={item.to} className="hover:text-brand-blue">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? 'font-medium text-brand-graphite' : undefined}
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
