import React, { useState } from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import TabSection from './modules/tabsection/Tabsection'
import DateFilter from './modules/DateFilter/DateFilter'
import { PageLayout, FilterContainer } from './DistrictNews.styles'

export default function DistrictNews() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    setDateFilter(filter)
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
          <HeroNews dateFilter={dateFilter} />
          <NewsSidebar dateFilter={dateFilter} />
        </PageLayout>
      </section>
      <FeaturedNewsSection dateFilter={dateFilter} />
      <TabSection dateFilter={dateFilter} />
    </>
  )
}
