import React, { useState } from 'react'
import { PageLayout, FilterContainer } from './Specialnewssecion.styles'
import LatestNews from './modules/LatestNews'
import TabSpecialNews from './modules/TabSpecialNews'
import Recommrednews from './modules/RecommedNews'
import DateFilter from '../common/DateFilter/DateFilter'

export default function Specialnewssecion() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    console.log('🗓️ Specialnewssecion - Date changed (raw):', filter, 'Type:', typeof filter)
    // Ensure we only pass string or null, never an object
    const cleanFilter = (filter && typeof filter === 'string') ? filter : null
    console.log('🗓️ Specialnewssecion - Date changed (clean):', cleanFilter)
    setDateFilter(cleanFilter)
  }

  return (
    <>
      <FilterContainer>
        <DateFilter onDateChange={handleDateChange} />
      </FilterContainer>
      <PageLayout as="div" role="region" aria-label="Special news sections">
        <LatestNews dateFilter={dateFilter} />
        <TabSpecialNews dateFilter={dateFilter} />
        <Recommrednews dateFilter={dateFilter} />
      </PageLayout>
    </>
  )
}
