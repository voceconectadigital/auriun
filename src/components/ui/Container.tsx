import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer'
  id?: string
}

/**
 * Global site container. Width/gutter come from `.container-site` tokens
 * in index.css — do not add competing max-w-* or padding-inline here.
 */
export function Container({
  children,
  className = '',
  as: Tag = 'div',
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={`container-site ${className}`.trim()}>
      {children}
    </Tag>
  )
}
