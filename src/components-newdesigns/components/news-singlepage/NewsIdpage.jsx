import React from 'react'
import MainContent from './modules/MainContent'
import Sidebar from './modules/Sidebar'
import {
  NewsPageContainer,
  NewsPageWrapper,
  CommentsWrapper
} from './NewsIdpage.styles'
import CommentsSection from './modules/CommentsSection'

export default function NewsIdpage() {
  return (
    <main id="main-content" role="main" aria-label="News article main content">
      <NewsPageContainer>
        <NewsPageWrapper>
          <MainContent />
          <Sidebar />
        </NewsPageWrapper>
        {/* Comments Section temporarily hidden */}
        <CommentsWrapper as="section" aria-labelledby="comments-section-heading">
          <h2 
            id="comments-section-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Article Comments Section
          </h2>
          <CommentsSection />
        </CommentsWrapper>
      </NewsPageContainer>
    </main>
  )
}
