
import { FlexContainer, PageLayout } from './MarchOfkarnatakV1.styles.js'
import MarchOfKarnatakaHero from './modules/herosection/MarchOfKarnatakaHero'
import StateNewsOfMarchOfKarnataka from './modules/stateNews/StateNews'
import NewsGovermentWebsite from './modules/govWebsite/NewsGovermentWebsite'
import ArticleNewsMarchOfKarnatala from './modules/article/ArticleNewsMarchOfKarnatala'
import LongVideoMOK from './modules/Video/LongVideoMOK'
import ShortsCarouselsMOK from './modules/shortVideo/ShortsCarouselsMOK'
import GalleryMOK from './modules/GalleryMOK/GalleryMOK'
import { LanguageContext } from '../../../context/LanguageContext.jsx'
import { useContext, useEffect } from 'react'

function MarchofKarnatakaV1() {
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
        <MarchOfKarnatakaHero/>
        <FlexContainer>
        <StateNewsOfMarchOfKarnataka/>
        <NewsGovermentWebsite/>
        </FlexContainer>
        <ArticleNewsMarchOfKarnatala/>
        <LongVideoMOK/>
        <ShortsCarouselsMOK/>
        <GalleryMOK/>
      </PageLayout>
    </main >
  )
}

export default MarchofKarnatakaV1
