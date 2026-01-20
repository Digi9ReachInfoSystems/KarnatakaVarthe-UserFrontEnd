import React, { useState } from 'react'
import { PageLayout, FilterContainer } from './Specialnewssecion.styles'
import LatestNews from './modules/LatestNews'
import TabSpecialNews from './modules/TabSpecialNews'
import Recommrednews from './modules/RecommedNews'
import DateFilter from '../districtnews/modules/DateFilter/DateFilter'

export default function Specialnewssecion() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    setDateFilter(filter)
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
