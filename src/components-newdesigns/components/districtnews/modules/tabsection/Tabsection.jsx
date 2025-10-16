import React, { useContext, useState, useEffect } from "react"
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
  SkeletonTabs,
  SkeletonTab,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonDate,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonSideItem,
} from "./Tabsection.styles"
import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getNewsByTypeDistrict } from "../../../../../services/newsApi/NewsApi"
import { useNavigate } from "react-router-dom"

// Demo data for district news

// Fallback posts for other tabs reuse local news data as placeholder


  export default function TabSection() {
    const [active, setActive] = useState("")
  const [categories, setCategories] = useState([])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [sideList, setSideList] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()
  useEffect(() => {
    // get categories
    const getCategories = async () => {
      const res = await CategoryApi()
      if (res?.data) {
        setCategories(res.data)
        setActive(res.data[0]?._id || "")
      }
    }
    getCategories()
  }, [])
  useEffect(() => {
    // get news by type state
const fetchNews = async () => {
  const res = await getNewsByTypeDistrict()

  if (res?.success && Array.isArray(res.data)) {
    setRawNews(res.data)
  }
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
    console.log("filtered", filtered)

    const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
    
    const localized = filtered.map((item) => ({
      _id: item._id,
      id: item._id,
      title: item[langKey]?.title.slice(0, 50) + "..." || item.title || "",
      excerpt: item[langKey]?.description.slice(0, 150) + "..." || item.description || "",
      date: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
      image: item.newsImage || "/placeholder.svg",
      alt: item.title || "",
    }))

    setNews(localized)
 
  }, [active, language, rawNews])

  // Set loading to false once we have categories and news
  useEffect(() => {
    if (categories.length > 0 && rawNews.length > 0) {
      setLoading(false)
    }
  }, [categories, rawNews])

  // get news by type district based on active category
  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
      const localized = rawNews.map((item) => ({
        _id: item._id,
        id: item._id,
        date: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
        title: item[langKey]?.title.slice(0, 50) + "..." || item.title || "",
       
      }))
      setSideList(localized.slice(0, 5))
    }
  }, [language, rawNews])
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

  // Layout: first 2 are featured (top), next 2 are secondary (bottom)
  const posts = news.length > 0 ? news : []
  const featured = posts.slice(0, 2)

  const secondary = posts.slice(2, 4)


  // const sideList = [
  //   { 
  //     date: "March 15, 2025", 
  //     title: "District Sports Meet Brings Together Local Athletes",
  //     excerpt: "Annual district sports competition showcases talent from schools and clubs across the region."
  //   },
  //   { 
  //     date: "March 05, 2025", 
  //     title: "New District Library Opens in Community Center",
  //     excerpt: "State-of-the-art library facility provides modern learning resources for district residents."
  //   },
  //   { 
  //     date: "March 01, 2025", 
  //     title: "District Health Camp Provides Free Medical Services",
  //     excerpt: "Free health screening and medical consultation provided to hundreds of district residents."
  //   },
  //   { 
  //     date: "February 28, 2025", 
  //     title: "District Tourism Board Promotes Local Heritage Sites",
  //     excerpt: "New initiative to boost district tourism by highlighting historical and cultural landmarks."
  //   },
  //   { 
  //     date: "February 15, 2025", 
  //     title: "District Farmers Adopt Modern Agricultural Techniques",
  //     excerpt: "Training programs help local farmers implement advanced farming methods and technology."
  //   },
  //   { 
  //     date: "March 05, 2025", 
  //     title: "District Road Safety Campaign Launched",
  //     excerpt: "Comprehensive awareness program aims to reduce traffic accidents on district roads."
  //   },
  //   { 
  //     date: "March 01, 2025", 
  //     title: "District Skill Development Center Opens for Youth",
  //     excerpt: "New vocational training center equips young people with job-ready skills."
  //   },
  //   { 
  //     date: "February 28, 2025", 
  //     title: "District Water Conservation Project Announced",
  //     excerpt: "Ambitious plan to improve water management and conservation across the district."
  //   },
  //   { 
  //     date: "February 15, 2025", 
  //     title: "District Cultural Festival Celebrates Local Traditions",
  //     excerpt: "Three-day festival showcases district's rich cultural heritage and traditional arts."
  //   },
  // ]

  // Shimmer loading component
  if (loading) {
    return (
      <Section aria-labelledby="news-tabs-heading">
        <Container>
          <h2 id="news-tabs-heading" style={{ position: "absolute", left: "-9999px" }}>
            News tabs
          </h2>
          <SkeletonTabs>
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonTab key={i} />
            ))}
          </SkeletonTabs>
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
                {[1, 2, 3, 4, 5].map((i) => (
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

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (e, tab) => {
    const tabIndex = TABS.indexOf(tab)
    
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextTab = TABS[(tabIndex + 1) % TABS.length]
      setActive(nextTab)
      // Focus the next tab button
      setTimeout(() => {
        document.querySelector(`[role="tab"][aria-selected="true"]`)?.focus()
      }, 0)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevTab = TABS[(tabIndex - 1 + TABS.length) % TABS.length]
      setActive(prevTab)
      // Focus the previous tab button
      setTimeout(() => {
        document.querySelector(`[role="tab"][aria-selected="true"]`)?.focus()
      }, 0)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(TABS[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(TABS[TABS.length - 1])
    }
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
    <Section as="section" aria-labelledby="news-tabs-heading" role="region">
      <Container>
        <h2 id="news-tabs-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          District News By Category
        </h2>

        <Tabs role="tablist" aria-label="News categories" onKeyDown={handleKeyDown}>
          {categories.map((tab) => {
            const tabName = language === "English" ? tab.name : language === "Hindi" ? tab.hindi : tab.kannada
            return (
              <TabButton
                key={tab._id}
                role="tab"
                aria-selected={active === tab._id}
                aria-controls={`panel-${tab._id}`}
                $active={active === tab._id}
                onClick={() => setActive(tab._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(tab._id);
                  }
                }}
              >
                {tabName}
              </TabButton>
            )
          })}
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

              {secondary.map((p, idx) => (
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
            aria-labelledby="headlines-sidebar-heading"
          >
            <h3 
              id="headlines-sidebar-heading" 
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              Latest District Headlines
            </h3>
            <SideList role="list">
              {sideList.map((item, idx) => (
                <SideItem 
                  key={idx} 
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`headline-${idx}`}
                  onClick={() => navigate(`/newsdetails/${item._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <SideDate as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</SideDate>
                  <SideTitle id={`headline-${idx}`} as="h4">{item.title}</SideTitle>
                  <span style={{ position: 'absolute', left: '-9999px' }}>{item.excerpt}</span>
                </SideItem>
              ))}
            </SideList>
            <SeeMoreWrap>
              <SeeMoreBtn 
                type="button" 
                onClick={() => alert("Load more district news...")}
                aria-label="Load more district news articles"
              >
                See More
              </SeeMoreBtn>
            </SeeMoreWrap>
          </Sidebar>
        </Layout>
      </Container>
    </Section>
  )
}

