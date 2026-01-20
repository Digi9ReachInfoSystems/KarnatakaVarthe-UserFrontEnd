import React, { useState } from 'react'
import HeroNews from './modules/herosection/HeroNews'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import TabSection from './modules/tabsection/Tabsection'
import DateFilter from '../common/DateFilter/DateFilter'
import { PageLayout, FilterContainer } from './Statenewspage.styles'

export default function Statenewspage() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    console.log('🗓️ Statenewspage - Date changed (raw):', filter, 'Type:', typeof filter)
    // Ensure we only pass string or null, never an object
    const cleanFilter = (filter && typeof filter === 'string') ? filter : null
    console.log('🗓️ Statenewspage - Date changed (clean):', cleanFilter)
    setDateFilter(cleanFilter)
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
