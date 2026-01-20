import React, { useState } from 'react'
import { PageLayout, FilterContainer } from './Articles.style'
import Banner from './modules/Banner'
import SideBar from './modules/SideBar'
import Featurednews from './modules/Featurednews'
import TabSection from './modules/TabSection.jsx'
import DateFilter from '../districtnews/modules/DateFilter/DateFilter'


function Articles() {
  const [dateFilter, setDateFilter] = useState(null)

  const handleDateChange = (filter) => {
    setDateFilter(filter)
  }

  return (
    <main aria-label="Articles main content">
      <FilterContainer>
        <DateFilter onDateChange={handleDateChange} />
      </FilterContainer>
      <PageLayout>
        <Banner dateFilter={dateFilter} />
        <SideBar dateFilter={dateFilter} />
      </PageLayout>
      <Featurednews dateFilter={dateFilter} />
      <TabSection dateFilter={dateFilter} />
    </main>
  )
}

export default Articles
