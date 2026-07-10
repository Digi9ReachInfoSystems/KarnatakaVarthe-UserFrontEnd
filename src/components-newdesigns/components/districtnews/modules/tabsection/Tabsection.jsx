import React, { useContext, useState, useEffect } from "react"
import {
  Section,
  Container,
  Layout,
  Grid,
  Card,
  ImageWrap,
  Content,
  DateText,
  Title,
  Excerpt,
  Sidebar,
  SideList,
  SideItem,
  SideDate,
  SideTitle,
  SideExcerpt,
  SeeMoreWrap,
  SeeMoreBtn,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonDate,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonSideItem,
} from "./Tabsection.styles"
import { fetchAllDistrictsNewsPage } from "../../../../../services/newapis/newapis-services"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { useNavigate } from "react-router-dom"

// Demo data for district news

// Fallback posts for other tabs reuse local news data as placeholder


  export default function TabSection({ dateFilter = null }) {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8) // Show 4 big + 4 small initially
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    // get news by type district
    const fetchNews = async () => {
      console.log('🔍 TabSection - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      try {
        // Ensure dateFilter is string or null, never an object
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 TabSection - Clean dateFilter:', cleanDateFilter)
        const res = await fetchAllDistrictsNewsPage(1, { date: cleanDateFilter })
        console.log('✅ TabSection - API response:', res)
        if (res?.success && Array.isArray(res.data.news)) {
          console.log('📰 TabSection - News count:', res.data.news.length)
          setRawNews(res.data.news)
        } else {
          console.warn('⚠️ TabSection - No data or invalid format')
          setRawNews([])
        }
      } catch (error) {
        console.error('❌ TabSection - Error:', error)
        setRawNews([])
      }
    }
    fetchNews()
  }, [language, dateFilter])

  // Transform raw news to localized news
  useEffect(() => {
    if (rawNews.length > 0) {
      console.log('🔄 TabSection - Processing rawNews, count:', rawNews.length)
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
      
      const localized = rawNews.map((item) => {
        // Extract proper ID from MongoDB format
        const newsId = item._id?.$oid || item._id
        
        // Extract proper date from MongoDB format
        const publishedDate = item.publishedAt?.$date || item.publishedAt
        
        return {
        _id: newsId,
        id: newsId,
        title: item[langKey]?.title?.slice(0, 50) + "..." || item.title || "",
        excerpt: item[langKey]?.description?.slice(0, 150) + "..." || item.description || "",
        date: publishedDate
          ? new Date(publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        image: item.newsImage || "/placeholder.svg",
        alt: item.title || "",
      }})

      console.log('✅ TabSection - Localized news, count:', localized.length)
      setNews(localized)
      setLoading(false)
    } else {
      console.log('⚠️ TabSection - No rawNews to process')
      setNews([])
      setLoading(false)
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
  const bigCardNews = news.slice(0, 4) // First 4 as big cards (always shown)
  const allSmallCardNews = news.slice(4) // All remaining news for sidebar
  const smallCardNews = allSmallCardNews.slice(0, visibleCount - 4) // Show limited small cards
  const hasMore = allSmallCardNews.length > (visibleCount - 4)
  const showingAll = allSmallCardNews.length > 4 && (visibleCount - 4) >= allSmallCardNews.length

 

  // Shimmer loading component
  if (loading) {
    return (
      <Section aria-labelledby="news-heading">
        <Container>
          <h2 id="news-heading" style={{ position: "absolute", left: "-9999px" }}>
            District News
          </h2>
          <Layout>
            <div>
              <Grid>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i}>
                    <SkeletonImage />
                    <SkeletonContent>
                      <SkeletonDate />
                      <SkeletonTitle />
                      <SkeletonTitle width="70%" />
                      <SkeletonExcerpt />
                      <SkeletonExcerpt width="85%" />
                    </SkeletonContent>
                  </SkeletonCard>
                ))}
              </Grid>
            </div>
            <Sidebar aria-label="Latest headlines">
              <SideList>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonSideItem key={i}>
                    <SkeletonDate />
                    <SkeletonTitle />
                    <SkeletonTitle width="60%" />
                  </SkeletonSideItem>
                ))}
              </SideList>
            </Sidebar>
          </Layout>
        </Container>
      </Section>
    )
  }

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
    <Section as="section" aria-labelledby="news-heading" role="region">
      <Container>
        <h2 id="news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          District News
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
                >
                  <ImageWrap>
                    <img 
                      src={p.image || "/placeholder.svg"} 
                      alt={p.alt || `Image for ${p.title}`}
                      loading="lazy"
                      onClick={() => navigate(`/newsdetails/${p._id}`)}
                      style={{ cursor: 'pointer' }}
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

          <Sidebar 
            as="aside" 
            role="complementary" 
            aria-labelledby="small-news-heading"
          >
            <h3 
              id="small-news-heading" 
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              More District News
            </h3>
            <SideList role="list">
              {allSmallCardNews.map((item) => (
                <SideItem 
                  key={item.id} 
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`small-card-${item.id}`}
                  onClick={() => navigate(`/newsdetails/${item._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <SideDate as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</SideDate>
                  <SideTitle id={`small-card-${item.id}`} as="h4">{item.title}</SideTitle>
                  <SideExcerpt>{item.excerpt}</SideExcerpt>
                </SideItem>
              ))}
            </SideList>
            
  
          </Sidebar>
        </Layout>
      </Container>
    </Section>
  )
}

