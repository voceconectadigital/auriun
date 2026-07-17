/**
 * Structural guard: internal hubs + detail templates must render the
 * canonical InternalHero (data-testid="internal-page-hero") and must not
 * import legacy DetailHero / PageHero / mist+card heroes.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const requiredFiles = [
  'src/components/ui/InternalHero.tsx',
  'src/pages/SolutionsPage.tsx',
  'src/pages/SegmentsPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/detail/ProductDetailPage.tsx',
  'src/pages/detail/ServiceDetailPage.tsx',
  'src/pages/detail/SegmentDetailPage.tsx',
]

const consumers = [
  'src/pages/SolutionsPage.tsx',
  'src/pages/SegmentsPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx',
  'src/pages/detail/ProductDetailPage.tsx',
  'src/pages/detail/ServiceDetailPage.tsx',
  'src/pages/detail/SegmentDetailPage.tsx',
]

const forbiddenNamePatterns = [
  /\bDetailHero\b/,
  /\bPageHero\b/,
  /\bLegacyDetailHero\b/,
  /\bLegacyPageHero\b/,
]

const errors = []

function walkTsx(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue
      walkTsx(full, out)
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

for (const rel of requiredFiles) {
  const path = join(root, rel)
  if (!existsSync(path)) {
    errors.push(`Missing required file: ${rel}`)
  }
}

const heroSrc = readFileSync(join(root, 'src/components/ui/InternalHero.tsx'), 'utf8')
if (!heroSrc.includes('data-testid="internal-page-hero"')) {
  errors.push('InternalHero must expose data-testid="internal-page-hero"')
}
if (!heroSrc.includes('data-hero-variant={variant}')) {
  errors.push('InternalHero must expose data-hero-variant={variant}')
}
if (!/export function InternalHero/.test(heroSrc)) {
  errors.push('InternalHero must export function InternalHero')
}
if (!/bg-brand-navy/.test(heroSrc)) {
  errors.push('InternalHero must use deep navy background (bg-brand-navy)')
}
if (/bg-brand-mist/.test(heroSrc)) {
  errors.push('InternalHero must not use bg-brand-mist (legacy light hero)')
}
if (/rounded-.*border.*img|aspect-\[16\/11\]/.test(heroSrc)) {
  errors.push('InternalHero must not use isolated rectangular image-card markup')
}
if (!/internal-hero-scrim/.test(heroSrc)) {
  errors.push('InternalHero must include integrated photo scrim/gradient')
}
if (!/outline-light/.test(heroSrc)) {
  errors.push('InternalHero must use outline-light secondary CTA')
}

const detailSections = readFileSync(
  join(root, 'src/components/ui/DetailSections.tsx'),
  'utf8',
)
if (/export\s+function\s+DetailHero/.test(detailSections)) {
  errors.push(
    'DetailHero must not be re-exported from DetailSections (legacy hero)',
  )
}
if (/export\s+function\s+PageHero/.test(detailSections)) {
  errors.push('PageHero must not be exported from DetailSections')
}
if (/bg-brand-mist/.test(detailSections) && /<h1/.test(detailSections)) {
  errors.push('DetailSections must not contain a mist-background H1 hero')
}

for (const rel of consumers) {
  const src = readFileSync(join(root, rel), 'utf8')
  if (!src.includes("from '@/components/ui/InternalHero'")) {
    errors.push(`${rel} must import InternalHero from explicit path`)
  }
  if (!/<InternalHero[\s>]/.test(src)) {
    errors.push(`${rel} must render <InternalHero`)
  }
  if (!/variant=/.test(src)) {
    errors.push(`${rel} must pass a variant prop to InternalHero`)
  }
  for (const pattern of forbiddenNamePatterns) {
    if (pattern.test(src)) {
      errors.push(`${rel} must not reference ${pattern.source}`)
    }
  }
  if (/bg-brand-mist/.test(src) && /SectionHeading/.test(src) && /as="h1"/.test(src)) {
    errors.push(`${rel} appears to use legacy mist SectionHeading hero`)
  }
}

// Repo-wide: no live DetailHero / PageHero exports outside Legacy* stubs
for (const file of walkTsx(join(root, 'src'))) {
  const rel = relative(root, file).replace(/\\/g, '/')
  if (rel === 'src/components/ui/InternalHero.tsx') continue
  const src = readFileSync(file, 'utf8')
  if (/export\s+function\s+DetailHero\b/.test(src)) {
    if (!/LegacyDetailHero/.test(src) && !rel.includes('Legacy')) {
      errors.push(`${rel} exports DetailHero — use InternalHero only`)
    }
  }
  if (/export\s+function\s+PageHero\b/.test(src)) {
    if (!rel.includes('Legacy')) {
      errors.push(`${rel} exports PageHero — use InternalHero only`)
    }
  }
  if (
    /from ['"]@\/components\/ui\/DetailSections['"]/.test(src) &&
    /DetailHero/.test(src)
  ) {
    errors.push(`${rel} imports DetailHero from DetailSections`)
  }
}

// Home hero must remain a separate component (no InternalHero on HomePage)
const homeCandidates = [
  'src/pages/HomePage.tsx',
  'src/components/home/Hero.tsx',
]
for (const rel of homeCandidates) {
  const path = join(root, rel)
  if (!existsSync(path)) continue
  const src = readFileSync(path, 'utf8')
  if (src.includes('InternalHero') || src.includes('internal-page-hero')) {
    errors.push(`${rel} must not use InternalHero (Home hero is separate)`)
  }
}

// CSS must not media-query swap premium hero to light mist / dark text
const cssPath = join(root, 'src/index.css')
if (existsSync(cssPath)) {
  const css = readFileSync(cssPath, 'utf8')
  if (!/\.internal-hero\b/.test(css) && !/\.internal-hero-scrim\b/.test(css)) {
    errors.push('index.css must define .internal-hero-* premium styles')
  }
  // Detect forbidden light-swap patterns scoped to internal-hero
  const internalBlocks = css.match(/\.internal-hero[^{]*\{[^}]*\}/gs) ?? []
  for (const block of internalBlocks) {
    if (/brand-mist|#f3f5f7|background:\s*#fff|color:\s*#0/i.test(block)) {
      errors.push('index.css internal-hero rules must not force light mist / dark text')
    }
  }
}

if (errors.length) {
  console.error('internal-hero check failed:\n')
  for (const err of errors) console.error(`  • ${err}`)
  process.exit(1)
}

console.log(
  'internal-hero check passed (%d templates + repo scan).',
  consumers.length,
)
