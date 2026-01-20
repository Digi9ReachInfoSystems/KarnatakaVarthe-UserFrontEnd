import React, { useState } from 'react'
import { PageLayout, FilterContainer } from './NewsSection.styles'
import Banner from './modules/BannerNews'
import NewsArticles from './modules/NewsArticles'
import MostArticles from './modules/MostArticles'
import DateFilter from '../common/DateFilter/DateFilter'

export default function NewsSection() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    console.log('🗓️ NewsSection - Date changed (raw):', filter, 'Type:', typeof filter)
    // Ensure we only pass string or null, never an object
    const cleanFilter = (filter && typeof filter === 'string') ? filter : null
    console.log('🗓️ NewsSection - Date changed (clean):', cleanFilter)
    setDateFilter(cleanFilter)
  }

  return (
    <>
      <FilterContainer>
        <DateFilter onDateChange={handleDateChange} />
      </FilterContainer>
      <PageLayout as="div" role="region" aria-label="News sections">
        <Banner dateFilter={dateFilter} />
        <NewsArticles dateFilter={dateFilter} />
        <MostArticles dateFilter={dateFilter} />
      </PageLayout>
    </>
  )
}
