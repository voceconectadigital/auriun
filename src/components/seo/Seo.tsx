import { useEffect } from 'react'
import { SITE } from '@/data/site'
import { absoluteUrl } from '@/data/routes'

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** JSON-LD embutido no HTML (útil no prerender e no cliente). */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload),
      }}
    />
  )
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/aurion-logo.webp'),
    description: SITE.description,
  }
}

type PageSeoProps = {
  title: string
  description: string
  path: string
  image?: string
}

/** SEO no cliente; o prerender injeta as mesmas tags no HTML estático. */
export function useDocumentSeo({ title, description, path, image }: PageSeoProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', absoluteUrl(path))
    setMeta('property', 'og:image', absoluteUrl(image ?? '/aurion-logo.webp'))
    setMeta('name', 'twitter:card', 'summary_large_image')
    setLinkCanonical(absoluteUrl(path))
  }, [title, description, path, image])
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLinkCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}
