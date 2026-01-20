import React from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import LatestNewsSection from './modules/latest/LatestNewsSection'
import OlderNewsSection from './modules/older/OlderNewsSection'
import { PageLayout } from './DistrictNewsSlug.styles'

export default function DistrictNewsSlug({ districtSlug }) {
  return (
    <>
      <section aria-labelledby="hero-section-heading">
        <h2 id="hero-section-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Top District Stories
        </h2>
        <PageLayout>
          <HeroNews districtSlug={districtSlug} />
          <NewsSidebar districtSlug={districtSlug} />
        </PageLayout>
      </section>
      <FeaturedNewsSection districtSlug={districtSlug} />
      <LatestNewsSection districtSlug={districtSlug} />
      <OlderNewsSection districtSlug={districtSlug} />
    </>
  )
}
