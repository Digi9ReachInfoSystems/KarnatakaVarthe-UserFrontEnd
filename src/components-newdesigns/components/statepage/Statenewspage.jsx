import React, { useState } from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import TabSection from './modules/tabsection/Tabsection'
import DateFilter from '../districtnews/modules/DateFilter/DateFilter'
import { PageLayout, FilterContainer } from './Statenewspage.styles'

export default function Statenewspage() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    setDateFilter(filter)
  }

  return (
    <main aria-label="State news main content">
      <FilterContainer>
        <DateFilter onDateChange={handleDateChange} />
      </FilterContainer>
      <PageLayout>
        <HeroNews dateFilter={dateFilter} />
        <NewsSidebar dateFilter={dateFilter} />
      </PageLayout>
      <FeaturedNewsSection dateFilter={dateFilter} />
      <TabSection dateFilter={dateFilter} />
    </main>
  )
}
