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
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonDate,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonSideItem,
} from "./Tabsection.styles"
import { fetchDistrictNewsBySlug } from "../../../../../../services/newapis/newapis-services"
import { LanguageContext } from "../../../../../../context/LanguageContext"
import { useNavigate } from "react-router-dom"

const sectionTitleText = {
  English: "Latest News",
  Kannada: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ",
  Hindi: "नवीनतम समाचार",
}

export default function LatestNewsSection({ districtSlug, dateFilter = null }) {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      if (!districtSlug) {
        setRawNews([])
        setLoading(true) // Keep loading true to show shimmer loader
        return
      }
      
      try {
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        const response = await fetchDistrictNewsBySlug(districtSlug, 1, { date: cleanDateFilter })
        const newsData = response?.data?.news || []
        
        // Sort by publishedAt date (newest first)
        const sortedNews = newsData.sort((a, b) => {
          const dateA = new Date(a.publishedAt?.$date || a.publishedAt || 0)
          const dateB = new Date(b.publishedAt?.$date || b.publishedAt || 0)
          return dateB - dateA
        })
        
        // If date filter is active, show all filtered results (API already filtered by date)
        // Otherwise, apply the existing logic for latest news
        if (cleanDateFilter) {
          // Exclude first 6 items (3 for hero + 3 for featured) when date filter is active
          const newsAfterHeroAndFeatured = sortedNews.slice(6)
          setRawNews(newsAfterHeroAndFeatured)
        } else {
          // Exclude first 6 items (3 for hero + 3 for featured)
          const newsAfterHeroAndFeatured = sortedNews.slice(6)
          
          // Get latest news (last 7 days, excluding hero and featured)
          const sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          
          const latestNews = newsAfterHeroAndFeatured.filter(item => {
            const itemDate = new Date(item.publishedAt?.$date || item.publishedAt || 0)
            return itemDate >= sevenDaysAgo
          })
          
          // If less than 5 items in last 7 days (after hero/featured), take next 10 items
          const finalLatestNews = latestNews.length >= 5 ? latestNews : newsAfterHeroAndFeatured.slice(0, 10)
          
          setRawNews(finalLatestNews)
        }
      } catch (error) {
        console.error("Error fetching district news:", error)
        setRawNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [language, districtSlug, dateFilter])

  // Transform raw news to localized news
  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
      
      const localized = rawNews.map((item) => {
        const normalizedId = item._id?.$oid || item._id || item.id;
        return {
          _id: String(normalizedId),
          id: String(normalizedId),
          title: item[langKey]?.title?.slice(0, 50) + "..." || item.title?.slice(0, 50) + "..." || "",
          excerpt: item[langKey]?.description?.slice(0, 150) + "..." || item.description?.slice(0, 150) + "..." || "",
          date: item.publishedAt
            ? new Date(item.publishedAt.$date || item.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          image: item.newsImage || "/placeholder.svg",
          alt: item.title || "",
        };
      })

      setNews(localized)
    }
  }, [language, rawNews])

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
      <Section aria-labelledby="latest-news-heading">
        <Container>
          <h2 id="latest-news-heading" style={{ position: "absolute", left: "-9999px" }}>
            {sectionTitleText[language] || "Latest News"}
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

  if (news.length === 0) {
    return null
  }

  // Get news to display
  const bigCardNews = news.slice(0, 4) // First 4 as big cards
  const allSmallCardNews = news.slice(4) // All remaining news for sidebar

  return (
    <Section as="section" aria-labelledby="latest-news-heading" role="region">
      <Container>
        <h2 id="latest-news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          {sectionTitleText[language] || "Latest News"}
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
                      onClick={() => navigate(`/districtnewsdetails/${p._id}`)}
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
              More Latest News
            </h3>
            <SideList role="list">
              {allSmallCardNews.map((item) => (
                <SideItem 
                  key={item.id} 
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`small-card-${item.id}`}
                  onClick={() => navigate(`/districtnewsdetails/${item._id}`)}
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
