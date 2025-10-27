import React from 'react'
import { Section,Container,Layout,Grid,Card,ImageWrap,Content,DateText,Title,Excerpt  } from './savedNews.Style'
import { LanguageContext } from "../../../../context/LanguageContext"
import { getNews } from "../../../../services/newsApi/NewsApi"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
function SavedNews() {
    const [news, setNews] = useState([])
    const [rawNews, setRawNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [visibleCount, setVisibleCount] = useState(8) 
    const { language } = useContext(LanguageContext)
    const navigate = useNavigate()
  
    useEffect(() => {
      // get news
      const fetchNews = async () => {
        setLoading(true)
        const res = await getNews()
        if (res?.success && Array.isArray(res.data)) {
          setRawNews(res.data)
        }
        setLoading(false)
      }
      fetchNews()
    }, [language])
  
    // Transform raw news to localized news
    useEffect(() => {
      if (rawNews.length > 0) {
        const langKey =
          language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
  
        const localized = rawNews.map((item) => {
          const localizedTitle = item[langKey]?.title || item.title || ""
          const localizedDesc = item[langKey]?.description || item.description || ""
  
          return {
            _id: item._id,
            id: item._id,
            title: localizedTitle ? (localizedTitle.length > 50 ? localizedTitle.slice(0, 50) + "..." : localizedTitle) : "",
            excerpt: localizedDesc ? (localizedDesc.length > 150 ? localizedDesc.slice(0, 150) + "..." : localizedDesc) : "",
            date: item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "",
            image: item.newsImage || "/placeholder.svg",
            alt: item.title || "",
          }
        })
        setNews(localized)
      }
    }, [language, rawNews])
  
    // Handle show more - increase visible count by 4 for small cards only
    const handleShowMore = () => {
      setVisibleCount(prevCount => prevCount + 4)
    }
  
    // Handle show less - reset to initial view
    const handleShowLess = () => {
      setVisibleCount(8)
    }
  
    // Get news to display
    const bigCardNews = news.slice(0, 3) // First 3 as big cards (always shown)
    const allSmallCardNews = news.slice(3) // All remaining news for sidebar
    const smallCardNews = visibleCount === 8 
      ? allSmallCardNews.slice(0, 4) // Show only first 4 initially
      : allSmallCardNews // Show all when expanded
    const hasMore = allSmallCardNews.length > 4 && visibleCount === 8
    const showingAll = visibleCount > 8 && allSmallCardNews.length > 4
  
    // Parse date for datetime attribute
    const parseDateTimeAttr = (dateStr) => {
      try {
        const parsed = new Date(dateStr);
        return parsed.toISOString().split('T')[0];
      } catch {
        return '';
      }
    };
  return (
    <Section as="section" aria-labelledby="most-articles-heading" role="region">
      <Container>
        <h2
          id="most-articles-heading"
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Saved  News
        </h2>
        <Layout>
          <div role="main">
            <Grid>
              {bigCardNews.map((p) => (
                <Card
                  key={p.id}
                  as="article"
                  role="article"
                  aria-labelledby={`card-title-${p.id}`}
                  tabIndex="0"
                  onClick={() => navigate(`/newsdetails/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <ImageWrap>
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.alt || `Image for ${p.title}`}
                      loading="lazy"
                    />
                  </ImageWrap>
                  <Content>
                    <DateText as="time" dateTime={parseDateTimeAttr(p.date)}>{p.date}</DateText>
                    <Title id={`card-title-${p.id}`} as="h3">{p.title}</Title>
                    <Excerpt>{p.excerpt}</Excerpt>
                  </Content>
                </Card>
              ))}
            </Grid>
          </div>
     
        </Layout>
      </Container>
    </Section>
  )
}

export default SavedNews
