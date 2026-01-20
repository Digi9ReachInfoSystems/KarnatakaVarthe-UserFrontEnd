
import { useState, useEffect, useContext } from "react"
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
} from "./styles/Tabsection.style"
import { LanguageContext } from "../../../../context/LanguageContext"
import { getArticles } from "../../../../services/newsApi/newsducks"
import { useNavigate } from "react-router-dom"

function TabSection({ dateFilter = null }) {
    // Article tab section component code to be implemented here
    const [news, setNews] = useState([])
      const [rawNews, setRawNews] = useState([])
      const [loading, setLoading] = useState(true)
      const [visibleCount, setVisibleCount] = useState(8) 
      const { language } = useContext(LanguageContext)
      const navigate = useNavigate()
    // get news by type articles
      useEffect(() => {
        // get news by type articles
        const fetchNews = async () => {
          console.log('🔍 TabSection - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
          try {
            // Ensure dateFilter is string or null, never an object
            const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
            console.log('🔍 TabSection - Clean dateFilter:', cleanDateFilter)
            const res = await getArticles(cleanDateFilter)
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
    

      // Get news to display
      const bigCardNews = news.slice(0, 4) // First 4 as big cards (always shown)
      const allSmallCardNews = news // All remaining news for sidebar
      const smallCardNews = allSmallCardNews.slice(0, visibleCount - 4) // Show limited small cards
      const hasMore = allSmallCardNews.length > (visibleCount - 4)
      const showingAll = allSmallCardNews.length > 4 && (visibleCount - 4) >= allSmallCardNews.length
    
      // Parse date for datetime attribute
      const parseDateTimeAttr = (dateStr) => {
        try {
          const parsed = new Date(dateStr);
          return parsed.toISOString().split('T')[0];
        } catch {
          return '';
        }
      };
    
      // Shimmer loading component
      if (loading) {
        return (
          <Section aria-labelledby="news-heading">
            <Container>
              <h2 id="news-heading" style={{ position: "absolute", left: "-9999px" }}>
                State News
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
  return (
    // Articles Section
      <Section as="section" aria-labelledby="news-heading" role="region">
        <Container>
          <h2 id="news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
            Articles 
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
                Latest Headlines
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
  
              {/* {hasMore && (
                <SeeMoreWrap>
                  <SeeMoreBtn
                    type="button"
                    onClick={handleShowMore}
                    aria-label="Load more state news articles"
                  >
                    Show More
                  </SeeMoreBtn>
                </SeeMoreWrap>
              )}
              {showingAll && (
                <SeeMoreWrap>
                  <SeeMoreBtn
                    type="button"
                    onClick={handleShowLess}
                    aria-label="Show less state news articles"
                  >
                    Show Less
                  </SeeMoreBtn>
                </SeeMoreWrap>
              )} */}
            </Sidebar>
          </Layout>
        </Container>
      </Section>
  )
}

export default TabSection
