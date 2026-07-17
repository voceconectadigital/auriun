/**
 * Post-build prerender for Cloudflare Pages.
 * Generates HTML shells with title/description/canonical/H1/content per route.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.resolve(root, 'dist')

async function main() {
  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { getAllRoutes, absoluteUrl } = await vite.ssrLoadModule('/src/data/routes.ts')
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const routes = getAllRoutes()

    const sitemapUrls = []

    for (const route of routes) {
      const url = route.path
      const appHtml = await render(url)

      let html = template
        .replace('<!--app-html-->', appHtml)
        .replace(
          /<title>[^<]*<\/title>/,
          `<title>${escapeHtml(route.seoTitle)}</title>`,
        )

      html = upsertMeta(html, 'name', 'description', route.seoDescription)
      html = upsertMeta(html, 'property', 'og:title', route.seoTitle)
      html = upsertMeta(html, 'property', 'og:description', route.seoDescription)
      html = upsertMeta(html, 'property', 'og:url', absoluteUrl(url))
      html = upsertMeta(html, 'property', 'og:type', 'website')
      html = upsertMeta(
        html,
        'property',
        'og:image',
        absoluteUrl(route.ogImage ?? '/aurion-logo-3d.webp'),
      )
      html = upsertMeta(
        html,
        'name',
        'twitter:card',
        'summary_large_image',
      )
      html = upsertMeta(
        html,
        'name',
        'twitter:image',
        absoluteUrl(route.ogImage ?? '/aurion-logo-3d.webp'),
      )
      html = upsertLink(html, 'canonical', absoluteUrl(url))

      const outDir =
        url === '/'
          ? dist
          : path.join(dist, url.replace(/^\//, '').replace(/\/$/, ''))
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')
      sitemapUrls.push(absoluteUrl(url))
      console.log('prerendered', url)
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>
`
    fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf-8')

    const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`
    fs.writeFileSync(path.join(dist, 'robots.txt'), robots, 'utf-8')

    console.log(`Done. ${routes.length} routes prerendered.`)
  } finally {
    await vite.close()
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function upsertMeta(html, attr, key, content) {
  const re = new RegExp(`<meta[^>]*${attr}=["']${key}["'][^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

function upsertLink(html, rel, href) {
  const re = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*>`, 'i')
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
