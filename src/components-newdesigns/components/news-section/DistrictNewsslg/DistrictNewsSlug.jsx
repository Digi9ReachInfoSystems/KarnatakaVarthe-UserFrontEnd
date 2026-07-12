import React, { useState } from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import LatestNewsSection from './modules/latest/LatestNewsSection'
import OlderNewsSection from './modules/older/OlderNewsSection'
import DateFilter from '../../common/DateFilter/DateFilter'
import { PageLayout, FilterContainer } from './DistrictNewsSlug.styles'

export default function DistrictNewsSlug({ districtSlug }) {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    const cleanFilter = (filter && typeof filter === 'string') ? filter : null
    setDateFilter(cleanFilter)
  }

  return (
    <>
      <FilterContainer>
        <DateFilter onDateChange={handleDateChange} />
      </FilterContainer>
      <section aria-labelledby="hero-section-heading">
        <h2 id="hero-section-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Top District Stories
        </h2>
        <PageLayout>
          <HeroNews districtSlug={districtSlug} dateFilter={dateFilter} />
          <NewsSidebar districtSlug={districtSlug} dateFilter={dateFilter} />
        </PageLayout>
      </section>
      <FeaturedNewsSection districtSlug={districtSlug} dateFilter={dateFilter} />
      <LatestNewsSection districtSlug={districtSlug} dateFilter={dateFilter} />
      <OlderNewsSection districtSlug={districtSlug} dateFilter={dateFilter} />
    </>
  )
}
