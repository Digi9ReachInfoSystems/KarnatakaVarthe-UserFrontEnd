import React from 'react'
import NewsSection from '../../components/news-section/NewsSection'

export default function News() {
  return (
    <main id="main-content" role="main" aria-label="News Page">
      <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Latest News - Karnataka DIPR
      </h1>
      <NewsSection />
    </main>
  )
}
