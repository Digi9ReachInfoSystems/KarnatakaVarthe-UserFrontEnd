import React from 'react'
import { PageLayout } from './NewsSection.styles'
import Banner from './modules/BannerNews'
import NewsArticles from './modules/NewsArticles'
import MostArticles from './modules/MostArticles'

export default function NewsSection() {
  return (
    <>
      <PageLayout as="div" role="region" aria-label="News sections">
        <Banner />
        <NewsArticles />
        <MostArticles />
      </PageLayout>
    </>
  )
}
