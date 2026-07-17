import { Hero } from '@/components/home/Hero'
import { HeroBridge } from '@/components/home/HeroBridge'
import { InstitutionalBand } from '@/components/home/InstitutionalBand'
import { SolutionsEcosystem } from '@/components/home/SolutionsEcosystem'
import { SegmentsFeatured } from '@/components/home/SegmentsFeatured'
import { Differentials } from '@/components/home/Differentials'
import { BrandsStrip } from '@/components/home/BrandsStrip'
import { FinalCta } from '@/components/home/FinalCta'
import { JsonLd, organizationJsonLd, useDocumentSeo } from '@/components/seo/Seo'
import { SITE } from '@/data/site'

export function HomePage() {
  useDocumentSeo({
    title: `${SITE.name} | Soluções que mantêm a indústria em movimento`,
    description: SITE.description,
    path: '/',
  })

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <HeroBridge />
      <InstitutionalBand />
      <SolutionsEcosystem />
      <SegmentsFeatured />
      <Differentials />
      <BrandsStrip />
      <FinalCta />
    </>
  )
}
