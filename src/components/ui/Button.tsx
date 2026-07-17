import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-light'
type ButtonSize = 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: undefined
    href?: undefined
  }

type ButtonAsLink = BaseProps & {
  to: string
  href?: undefined
  onClick?: () => void
}

type ButtonAsAnchor = BaseProps & {
  href: string
  to?: undefined
  target?: string
  rel?: string
  onClick?: () => void
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-orange text-white hover:bg-brand-orange-dark focus-visible:ring-brand-orange',
  secondary:
    'bg-brand-blue text-white hover:bg-brand-blue-dark focus-visible:ring-brand-blue',
  ghost:
    'bg-transparent text-brand-graphite ring-1 ring-brand-line hover:bg-brand-mist focus-visible:ring-brand-blue',
  'outline-light':
    'bg-transparent text-white ring-1 ring-white/50 hover:bg-white/10 focus-visible:ring-white',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-sm sm:min-h-[3.25rem] sm:text-base',
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
  } = props

  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
