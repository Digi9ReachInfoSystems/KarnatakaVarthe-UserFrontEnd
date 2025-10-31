import React from 'react'
import { PageLayout } from './Articles.style'
import Banner from './modules/Banner'
import SideBar from './modules/SideBar'
import Featurednews from './modules/Featurednews'
import TabSection from './modules/TabSection.jsx'


function Articles() {
  return (
    <main aria-label="Articles main content">
      <PageLayout>
        <Banner />
        <SideBar />
      </PageLayout>
      <Featurednews />
      <TabSection/>
    </main>
  )
}

export default Articles
