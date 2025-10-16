import React, { useContext, useEffect } from 'react'
import NewsSidebar from './modules/herosection/news-sidebar'
import FeaturedNewsSection from './modules/featured/featured-news'
import TabSection from './modules/tabsection/Tabsection'
import { PageLayout } from './Marchofkarnataka.styles'
import MarchNewsHero from './modules/herosection/HeroNews'
import { LanguageContext } from '../../../context/LanguageContext'

export default function Marchofkarnataka() {
  const { setPageLanguage, resetToGlobalLanguage } = useContext(LanguageContext)

  // Set page language to "magazine2" when component mounts
  useEffect(() => {
    setPageLanguage("magazine2")
    
    // Reset to global language when component unmounts
    return () => {
      resetToGlobalLanguage()
    }
  }, [setPageLanguage, resetToGlobalLanguage])

  return (
    <main aria-label="March of Karnataka main content">
      <PageLayout>
        <MarchNewsHero />
        <NewsSidebar />
      </PageLayout>
      <FeaturedNewsSection />
      <TabSection />
    </main>
  )
}
