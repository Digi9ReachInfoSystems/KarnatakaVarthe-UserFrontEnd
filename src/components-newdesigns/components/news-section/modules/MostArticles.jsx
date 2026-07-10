import React from "react"
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
  SkeletonImageWrap,
  SkeletonContent,
  SkeletonLine,
} from "./MostArticles.styles"
import { LanguageContext } from "../../../../context/LanguageContext"
import { fetchAllLatestNewsPage } from "../../../../services/newapis/newapis-services"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import EmptyState from "../../districtnews/modules/DateFilter/EmptyState"

export default function TabSection({ dateFilter = null }) {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8) // Show 4 big + 4 small initially
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    // get news
    const fetchNews = async () => {
      console.log('🔍 MostArticles - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      setLoading(true)
      try {
        // Ensure dateFilter is string or null
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 MostArticles - Clean dateFilter:', cleanDateFilter)
        const res = await fetchAllLatestNewsPage(1, { date: cleanDateFilter })
        console.log('✅ MostArticles - API response:', res)
        if (res?.success && Array.isArray(res.data)) {
          console.log('📰 MostArticles - News count:', res.data.length)
          setRawNews(res.data)
        } else {
          console.warn('⚠️ MostArticles - No data or invalid format')
          setRawNews([])
        }
      } catch (error) {
        console.error('❌ MostArticles - Error:', error)
        setRawNews([])
      }
      setLoading(false)
    }
    fetchNews()
  }, [language, dateFilter])

  // Transform raw news to localized news
  useEffect(() => {
    if (rawNews.length > 0) {
      console.log('🔄 MostArticles - Processing rawNews, count:', rawNews.length)
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"

      const localized = rawNews.map((item) => {
        // Extract proper ID and date from MongoDB format
        const newsId = item._id?.$oid || item._id
        const publishedDate = item.publishedAt?.$date || item.publishedAt
        
        const localizedTitle = item[langKey]?.title || item.title || ""
        const localizedDesc = item[langKey]?.description || item.description || ""

        return {
          _id: newsId,
          id: newsId,
          title: localizedTitle ? (localizedTitle.length > 50 ? localizedTitle.slice(0, 50) + "..." : localizedTitle) : "",
          excerpt: localizedDesc ? (localizedDesc.length > 150 ? localizedDesc.slice(0, 150) + "..." : localizedDesc) : "",
          date: publishedDate
            ? new Date(publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          image: item.newsImage || "/placeholder.svg",
          alt: item.title || "",
        }
      })
      console.log('✅ MostArticles - Localized news, count:', localized.length)
      setNews(localized)
    } else {
      console.log('⚠️ MostArticles - No rawNews to process')
      setNews([])
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

  // Shimmer loading component
  if (loading) {
    return (
      <Section as="section" aria-labelledby="most-articles-heading" role="region">
        <Container>
          <h2
            id="most-articles-heading"
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Karnataka News
          </h2>
          <Layout>
            <div>
              <Grid>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i}>
                    <SkeletonImageWrap />
                    <SkeletonContent>
                      <SkeletonLine width="60%" height="14px" />
                      <SkeletonLine width="90%" height="20px" />
                      <SkeletonLine width="100%" height="14px" />
                      <SkeletonLine width="100%" height="14px" />
                      <SkeletonLine width="70%" height="14px" />
                    </SkeletonContent>
                  </SkeletonCard>
                ))}
              </Grid>
            </div>
            <Sidebar aria-label="Latest headlines">
              <SideList>
                {[1, 2, 3, 4].map((i) => (
                  <SideItem key={i}>
                    <SkeletonLine width="40%" height="14px" />
                    <SkeletonLine width="80%" height="20px" />
                    <SkeletonLine width="100%" height="14px" />
                  </SideItem>
                ))}
              </SideList>
            </Sidebar>
          </Layout>
        </Container>
      </Section>
    )
  }

  // Show empty state when no data available (after loading)
  if (!loading && rawNews.length === 0) {
    return (
      <Section as="section" aria-labelledby="most-articles-heading" role="region">
        <Container>
          <h2
            id="most-articles-heading"
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Karnataka News
          </h2>
          <EmptyState />
        </Container>
      </Section>
    )
  }

  return (
    <Section as="section" aria-labelledby="most-articles-heading" role="region">
      <Container>
        <h2
          id="most-articles-heading"
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Karnataka News
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
          <Sidebar
            as="aside"
            role="complementary"
            aria-labelledby="small-news-heading"
          >
            <h3
              id="small-news-heading"
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              More Karnataka News
            </h3>
            <SideList role="list">
              {smallCardNews.map((item) => (
                <SideItem
                  key={item.id}
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`small-card-${item.id}`}
                  onClick={() => navigate(`/newsdetails/${item.id}`)}
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
