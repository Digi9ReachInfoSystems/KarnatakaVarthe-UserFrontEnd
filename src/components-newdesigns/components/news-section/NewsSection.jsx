import React, { useState } from 'react'
import { PageLayout, FilterContainer } from './NewsSection.styles'
import Banner from './modules/BannerNews'
import NewsArticles from './modules/NewsArticles'
import MostArticles from './modules/MostArticles'
import DateFilter from '../districtnews/modules/DateFilter/DateFilter'

export default function NewsSection() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    setDateFilter(filter)
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
