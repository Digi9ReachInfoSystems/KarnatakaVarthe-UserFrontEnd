import React from "react"
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
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
import { getNews } from "../../../../../services/newsApi/NewsApi"

export default function TabSection() {
  const [active, setActive] = React.useState("")
  const [categories, setCategories] = useState([])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [sideList, setSideList] = useState([])
  const { language } = useContext(LanguageContext)
  
  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await CategoryApi()
      if (res?.data) {
        setCategories(res.data)
        setActive(res.data[0]?._id || "")
      }
    }
    getCategories()
  }, [])

  // Fetch March of Karnataka news (magazineType: "magazine2")
  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNews()
      console.log("March tab news API response:", res)
      
      if (res?.success && Array.isArray(res.data)) {
        // Filter by magazineType: "magazine2" (March of Karnataka)
        const filteredData = res.data.filter(item => 
          item.magazineType === "magazine2"
        )
        console.log("Filtered March tab news:", filteredData)
        setRawNews(filteredData)
      }
    }
    fetchNews()
  }, [language])

  // Filter news by active category
  useEffect(() => {
    if (!rawNews.length || !active || !categories.length) return

    const filtered = rawNews.filter((item) => {
      // Skip items without a category
      if (!item.category) return false
      
      const categoryId = typeof item.category === "object" ? item.category._id : item.category
      console.log("March Tab - Comparing:", categoryId, "with active:", active)
      return categoryId === active
    })
    console.log("March Tab - Filtered by category:", filtered.length, "items")

    const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
    
    const localized = filtered.map((item) => ({
      id: item._id,
      title: item[langKey]?.title || item.title || "",
      excerpt: item[langKey]?.description || item.description || "",
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
  }, [active, language, rawNews, categories])

  // Process sidebar list
  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
      const localized = rawNews.map((item) => ({
        id: item._id,
        date: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        title: item[langKey]?.title?.slice(0, 50) + "..." || item.title || "",
      }))
      setSideList(localized.slice(0, 5))
    }
  }, [language, rawNews])

  const posts = news.length > 0 ? news : []
  const [loading, setLoading] = useState(true)

  // Set loading to false when data is ready
  useEffect(() => {
    if (categories.length > 0 && rawNews.length > 0) {
      setLoading(false)
    }
  }, [categories, rawNews])

  // Keyboard navigation for tabs
  const handleKeyDown = (e) => {
    const currentIndex = categories.findIndex((cat) => cat._id === active)

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1
        setActive(categories[prevIndex]?._id || "")
        break
      case "ArrowRight":
        e.preventDefault()
        const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0
        setActive(categories[nextIndex]?._id || "")
        break
      case "Home":
        e.preventDefault()
        setActive(categories[0]?._id || "")
        break
      case "End":
        e.preventDefault()
        setActive(categories[categories.length - 1]?._id || "")
        break
    }
  }

  // Layout: first 2 are featured (top), next 2 are secondary (bottom)
  const featured = posts.slice(0, 2)
  const secondary = posts.slice(2, 4)

  // Shimmer loading component
  if (loading) {
    return (
      <Section aria-labelledby="march-karnataka-tabs-heading">
        <Container>
          <h2 id="march-karnataka-tabs-heading" style={{ position: "absolute", left: "-9999px" }}>
            March of Karnataka tabs
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

            <Sidebar aria-label="Latest Karnataka progress headlines">
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

  return (
    <Section aria-labelledby="march-karnataka-tabs-heading">
      <Container>
        <h2 id="march-karnataka-tabs-heading" style={{ position: "absolute", left: "-9999px" }}>
          March of Karnataka tabs
        </h2>

        <Tabs 
          role="tablist" 
          aria-label="March of Karnataka categories"
          onKeyDown={handleKeyDown}
        >
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
                    e.preventDefault()
                    setActive(tab._id)
                  }
                }}
              >
                {tabName}
              </TabButton>
            )
          })}
        </Tabs>

        <Layout>
          <div id={`panel-${active}`} role="tabpanel" aria-labelledby={active} tabIndex={0}>
            <Grid role="list" aria-label={`${active} articles`}>
              {featured.map((p) => (
                <Link 
                  to={`/newsdetails/${p.id}`}
                  key={p.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card role="listitem">
                    <ImageWrap>
                      <img src={p.image || "/placeholder.svg"} alt={p.alt} loading="lazy" />
                    </ImageWrap>
                    <Content>
                      <DateText>{p.date}</DateText>
                      <Title>{p.title.slice(0, 50)}...</Title>
                      <Excerpt>{p.excerpt.slice(0, 150)}...</Excerpt>
                    </Content>
                  </Card>
                </Link>
              ))}

              {secondary.map((p) => (
                <Link 
                  to={`/newsdetails/${p.id}`}
                  key={p.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card role="listitem">
                    <ImageWrap>
                      <img src={p.image || "/placeholder.svg"} alt={p.alt} loading="lazy" />
                    </ImageWrap>
                    <Content>
                      <DateText>{p.date}</DateText>
                      <Title>{p.title.slice(0, 50)}...</Title>
                      <Excerpt>{p.excerpt.slice(0, 150)}...</Excerpt>
                    </Content>
                  </Card>
                </Link>
              ))}
            </Grid>
          </div>

          <Sidebar aria-label="Latest Karnataka progress headlines">
            <SideList role="list" aria-label="Latest headlines">
              {sideList.map((item, idx) => (
                <Link 
                  to={`/newsdetails/${item.id}`}
                  key={idx}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <SideItem role="listitem">
                    <SideDate>{item.date}</SideDate>
                    <SideTitle>{item.title}</SideTitle>
                  </SideItem>
                </Link>
              ))}
            </SideList>
            <SeeMoreWrap>
              <SeeMoreBtn type="button" onClick={() => alert("Load more Karnataka progress news...")} aria-label="Load more Karnataka progress news">
                See More
              </SeeMoreBtn>
            </SeeMoreWrap>
          </Sidebar>
        </Layout>
      </Container>
    </Section>
  )
}
