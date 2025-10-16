import React from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import TabSection from './modules/tabsection/Tabsection'
import { PageLayout } from './DistrictNews.styles'

export default function DistrictNews() {
  return (
    <>
      <section aria-labelledby="hero-section-heading">
        <h2 id="hero-section-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Top District Stories
        </h2>
        <PageLayout>
          <HeroNews />
          <NewsSidebar />
        </PageLayout>
      </section>
      <FeaturedNewsSection />
      <TabSection />
    </>
  )
}
