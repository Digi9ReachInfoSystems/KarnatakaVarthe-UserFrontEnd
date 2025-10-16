import React from "react"
import {
  Section,
  Container,
  Tabs,
  TabButton,
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
  SkeletonTabButton,
} from "./MostArticles.styles"
import { CategoryApi } from "../../../../services/categoryapi/CategoryApi"
import { useEffect, useContext, useState } from "react"
import { getNews } from "../../../../services/newsApi/NewsApi"
import { LanguageContext } from "../../../../context/LanguageContext"
import { useNavigate } from "react-router-dom"

// Demo data for March of Karnataka


// Fallback posts for other tabs reuse technology data as placeholder


export default function TabSection() {
  const [active, setActive] = useState("")
  const [categories, setCategories] = useState([])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)

  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  // Layout: first 3 are featured (top), next 3 are secondary (bottom)


  // Parse date for datetime attribute
  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };
  useEffect(() => {
    // get categories
    const getCategories = async () => {
      setLoading(true)
      const res = await CategoryApi()
      if (res?.data) {
        setCategories(res.data)
        setActive(res.data[0]?._id || "")
      }
      setLoading(false)
    }
    getCategories()
  }, [])
  useEffect(() => {
    // get news by type state
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


  // get news by type state based on active category
  useEffect(() => {
    if (!rawNews.length || !active) return

    const filtered = rawNews.filter((item) => {
      // Skip items without a category
      if (!item.category) return false
      
      const categoryId = typeof item.category === "object" ? item.category._id : item.category
      return categoryId === active
      
    })

    const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
    
    const localized = filtered.map((item) => {
      const localizedTitle = item[langKey]?.title || item.title || ""
      const localizedDesc = item[langKey]?.description || item.description || ""
      
      return {
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
 
  }, [active, language, rawNews])


  // Keyboard navigation for tabs
  const handleKeyDown = (e) => {
    const currentIndex = categories.findIndex((cat) => cat._id === active);

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
        setActive(categories[prevIndex]?._id || "");
        break;
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
        setActive(categories[nextIndex]?._id || "");
        break;
      case "Home":
        e.preventDefault();
        setActive(categories[0]?._id || "");
        break;
      case "End":
        e.preventDefault();
        setActive(categories[categories.length - 1]?._id || "");
        break;
    }
  };

  const posts = news.length > 0 ? news : []
  const featured = posts.slice(0, 3)
  const secondary = posts.slice(3, 6)

  // Show shimmer while loading
  if (loading) {
    return (
      <Section as="section" aria-labelledby="most-articles-tabs-heading" role="region">
        <Container>
          <h2 
            id="most-articles-tabs-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Karnataka News By Category
          </h2>

          {/* Tab Navigation Skeleton */}
          <Tabs role="tablist" aria-label="Karnataka news categories">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonTabButton key={i} />
            ))}
          </Tabs>

          <Layout>
            <div>
              <Grid>
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
          </Layout>
        </Container>
      </Section>
    )
  }

  return (
    <Section as="section" aria-labelledby="most-articles-tabs-heading" role="region">
      <Container>
        <h2 
          id="most-articles-tabs-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Karnataka News By Category
        </h2>

        {/* Tab Navigation */}
        <Tabs role="tablist" aria-label="Karnataka news categories">
          {categories.map((tab) => {
            const tabName = language === "English" ? tab.name : language === "Hindi" ? tab.hindi : tab.kannada
            return (
            <TabButton
              key={tab._id}
              role="tab"
              id={`tab-${tab._id}`}
              aria-selected={active === tab._id}
              aria-controls={`panel-${tab._id}`}
              tabIndex={active === tab._id ? 0 : -1}
              $active={active === tab._id}
              onClick={() => setActive(tab._id)}
              onKeyDown={(e) => handleKeyDown(e, tab._id)}
            >
              {tabName}
            </TabButton>
          )})}
        </Tabs>

        <Layout>
          <div 
            id={`panel-${active}`} 
            role="tabpanel" 
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
          >
            <Grid>
              {featured.map((p, idx) => (
                <Card
                  key={p.id}
                  as="article"
                  role="article"
                  aria-labelledby={`card-title-${p.id}-${idx}`}
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
                    <Title id={`card-title-${p.id}-${idx}`} as="h3">{p.title}</Title>
                    <Excerpt>{p.excerpt}</Excerpt>
                  </Content>
                </Card>
              ))}

              {secondary.map((p) => (
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
{/* 
          <Sidebar as="aside" role="complementary" aria-label="Latest Karnataka progress headlines">
            <SideList role="list">
              {sideList.map((item, idx) => (
                <SideItem key={idx} role="listitem" tabIndex="0">
                  <SideDate as="time">{item.date}</SideDate>
                  <SideTitle as="h4">{item.title}</SideTitle>
                </SideItem>
              ))}
            </SideList>
            <SeeMoreWrap>
              <SeeMoreBtn 
                type="button" 
                onClick={() => alert("Load more Karnataka progress news...")}
                aria-label="Load more Karnataka progress news"
              >
                See More
              </SeeMoreBtn>
            </SeeMoreWrap>
          </Sidebar> */}
        </Layout>
      </Container>
    </Section>
  )
}
