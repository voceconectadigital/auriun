/**
 * Guard: related-card icon resolution by slug + DetailSections a11y markers.
 * Run: node scripts/check-related-icons.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const errors = []

function read(rel) {
  const full = join(root, rel)
  if (!existsSync(full)) {
    errors.push(`Missing file: ${rel}`)
    return ''
  }
  return readFileSync(full, 'utf8')
}

function extractSlugs(source) {
  const slugs = []
  const re = /slug:\s*'([^']+)'/g
  let m
  while ((m = re.exec(source))) slugs.push(m[1])
  return slugs
}

function extractMapKeys(source) {
  // Keys inside relatedIconBySlug object — quoted or bare identifiers
  const start = source.indexOf('relatedIconBySlug')
  if (start < 0) {
    errors.push('relatedIconBySlug export not found')
    return []
  }
  const brace = source.indexOf('{', start)
  const end = source.indexOf('}', brace)
  const body = source.slice(brace + 1, end)
  const keys = []
  const re = /(?:^|,)\s*(?:'([^']+)'|([A-Za-z0-9_-]+))\s*:/gm
  let m
  while ((m = re.exec(body))) keys.push(m[1] || m[2])
  return keys
}

/** Pure mirror of slugFromRelatedTo for script-level checks. */
function slugFromRelatedTo(to) {
  const cleaned = to.replace(/\/+$/, '')
  const parts = cleaned.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? ''
}

const products = extractSlugs(read('src/data/products.ts'))
const services = extractSlugs(read('src/data/services.ts'))
const segments = extractSlugs(read('src/data/segments.ts'))
const allSlugs = [...new Set([...products, ...services, ...segments])]

const iconsSource = read('src/data/relatedIcons.ts')
const mapKeys = new Set(extractMapKeys(iconsSource))

for (const slug of allSlugs) {
  if (!mapKeys.has(slug)) {
    errors.push(`No icon mapping for known slug: ${slug}`)
  }
}

const detail = read('src/components/ui/DetailSections.tsx')
const checks = [
  [/aria-hidden/, 'Watermark / decorative icons must use aria-hidden'],
  [/data-related-slug/, 'Cards must expose data-related-slug'],
  [/id=\{`related-\$\{slug\}`\}/, 'Cards must set id={`related-${slug}`}'],
  [/data-related-icon-fallback/, 'Fallback marker data-related-icon-fallback required'],
  [/resolveRelatedIcon/, 'Must use resolveRelatedIcon'],
  [/related-card__watermark/, 'Must render related-card__watermark'],
]

for (const [re, msg] of checks) {
  if (!re.test(detail)) errors.push(msg)
}

const pathCases = [
  ['/solucoes/produtos/materiais-eletricos/', 'materiais-eletricos'],
  ['/solucoes/servicos/strategic-sourcing/', 'strategic-sourcing'],
  ['/segmentos/mineracao/', 'mineracao'],
]
for (const [to, expected] of pathCases) {
  const got = slugFromRelatedTo(to)
  if (got !== expected) {
    errors.push(`slugFromRelatedTo(${to}) => ${got}, expected ${expected}`)
  }
}

// Runtime resolve via compiled Vite/TS is unavailable; assert map keys cover
// known slugs (no fallback) and fallback constant exists.
if (!/RELATED_ICON_FALLBACK/.test(iconsSource)) {
  errors.push('RELATED_ICON_FALLBACK missing')
}
if (!/usedFallback/.test(iconsSource)) {
  errors.push('resolveRelatedIcon must report usedFallback')
}

// Optional: ensure lucide icons referenced in the map exist at runtime
try {
  const lucide = require('lucide-react')
  const iconNameRe = /:\s*([A-Z][A-Za-z0-9]+),?/g
  const start = iconsSource.indexOf('relatedIconBySlug')
  const brace = iconsSource.indexOf('{', start)
  const end = iconsSource.indexOf('}', brace)
  const body = iconsSource.slice(brace + 1, end)
  let m
  const missingIcons = new Set()
  while ((m = iconNameRe.exec(body))) {
    if (!(m[1] in lucide)) missingIcons.add(m[1])
  }
  const fb = iconsSource.match(/RELATED_ICON_FALLBACK:\s*LucideIcon\s*=\s*([A-Z][A-Za-z0-9]+)/)
  if (fb && !(fb[1] in lucide)) missingIcons.add(fb[1])
  for (const name of missingIcons) {
    errors.push(`Lucide icon not found in package: ${name}`)
  }
} catch (err) {
  errors.push(`Could not load lucide-react: ${err.message}`)
}

if (errors.length) {
  console.error('check-related-icons FAILED:\n' + errors.map((e) => ` - ${e}`).join('\n'))
  process.exit(1)
}

console.log(
  `check-related-icons OK — ${allSlugs.length} slugs mapped, 0 known fallbacks, a11y markers present`,
)
