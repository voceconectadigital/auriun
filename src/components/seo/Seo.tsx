import { useEffect } from 'react'
import { CONTACT, SITE, SOCIAL, BRAND_LOGO, hasValue, isPublicContact } from '@/data/site'
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
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(BRAND_LOGO.src),
    description: SITE.description,
  }

  // Nunca publicar dados ilustrativos em JSON-LD / SEO
  if (isPublicContact()) {
    const contactPoints = CONTACT.regions
      .filter((region) => hasValue(region.phone))
      .map((region) => ({
        '@type': 'ContactPoint',
        contactType: 'customer service',
        areaServed: region.id === 'es' ? 'ES' : 'MG',
        name: region.label,
        telephone: region.phone,
        ...(hasValue(CONTACT.email) ? { email: CONTACT.email } : {}),
        availableLanguage: ['Portuguese', 'pt-BR'],
      }))

    if (contactPoints.length > 0) {
      data.contactPoint = contactPoints
    } else if (hasValue(CONTACT.email)) {
      data.contactPoint = {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: CONTACT.email,
        availableLanguage: ['Portuguese', 'pt-BR'],
      }
    }

    const addr = CONTACT.address
    if (hasValue(addr.street) && hasValue(addr.city)) {
      // Endereço físico apenas da unidade Serra — sem PostalAddress inventado para BH
      data.address = {
        '@type': 'PostalAddress',
        streetAddress: [addr.street, addr.complement, addr.district]
          .filter(Boolean)
          .join(', '),
        addressLocality: addr.city,
        addressRegion: addr.state,
        postalCode: addr.postalCode,
        addressCountry: 'BR',
      }
    }

    // Cobertura comercial (ES + BH/MG) — não implica endereço físico em BH
    data.areaServed = [
      { '@type': 'AdministrativeArea', name: 'Espírito Santo' },
      { '@type': 'AdministrativeArea', name: 'Minas Gerais' },
      { '@type': 'City', name: 'Belo Horizonte' },
    ]

    if (hasValue(CONTACT.email)) {
      data.email = CONTACT.email
    }
  }

  const sameAs = [SOCIAL.linkedin, SOCIAL.instagram].filter((url) => hasValue(url))
  if (sameAs.length > 0) {
    data.sameAs = sameAs
  }

  return data
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
    const ogImage = absoluteUrl(image ?? BRAND_LOGO.src)
    setMeta('property', 'og:image', ogImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:image', ogImage)
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
