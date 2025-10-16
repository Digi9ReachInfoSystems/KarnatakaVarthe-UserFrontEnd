import React from "react"
import { useState, useEffect, useContext } from "react"
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
import { getNewsByTypeState } from "../../../../../services/newsApi/NewsApi"
import { useNavigate } from "react-router-dom"

// Demo data. Images use the provided Source URLs as requested.

// const TABS = ["Politics", "Business", "Sports", "Entertainment", "Technology", "Lifestyle", "Health"]

const POSTS = {
  Politics: [
    {
      id: "p1",
      date: "March 20, 2025",
      title: "State Senate Passes Bill to Strengthen Cybersecurity Infrastructure",
      excerpt:
        "The State Senate has passed a bill aimed at improving cybersecurity infrastructure, following the rising threats to digital security.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/68994c24e22e9173fc6004a1d4f5dd78460631dc-Vi79QbCWZK6QOFoOgMteWdnLZjU1mi.jpg",
      alt: "People near a military jet on an airfield",
    },
    {
      id: "p2",
      date: "March 15, 2025",
      title: "Country R and Country C Form New Economic Partnership",
      excerpt:
        "Two nations join hands to strengthen trade ties and promote economic growth with a comprehensive partnership.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6243ae57209c4d57554c7f40bc64b7beea010a17-gYwyDUgRsXonopsv41keWRrzjIV8Y9.jpg",
      alt: "Person speaking at a microphone in a meeting room",
    },
    {
      id: "p3",
      date: "February 28, 2025",
      title: "Government Announces Plans to Tackle Climate Change",
      excerpt:
        "Officials announce plans to reduce emissions and transition to renewable energy sources over the next decade.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab76636beea47b9f254313aec0bf6a3f2de57ca6-c4XD0LDs5RrI7VEtEZJmSnlXHBe36D.jpg",
      alt: "News-style graphic with a speaker and bold yellow banner text",
    },
    {
      id: "p4",
      date: "February 14, 2025",
      title: "Global Action Called to Address Refugee Crisis",
      excerpt:
        "An international body calls for coordinated action to address the growing refugee crisis across regions.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/953a18a88ac50c70c275906d207dc5a58e3cbf26%20%282%29-1DWWgC9eKwMXMIt9ybxFtMVU6So1cN.jpg",
      alt: "Video conference collage of officials during a virtual meeting",
    },
  ],
}

// Fallback posts for other tabs reuse politics data as placeholder


export default function TabSection() {
  const [active, setActive] = React.useState("")
  const [categories, setCategories] = useState([])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [sideList, setSideList] = useState([])
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
  const res = await getNewsByTypeState()

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
 
  }, [active, language, rawNews])
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

  const [loading, setLoading] = useState(true)

  // Set loading to false when data is ready
  useEffect(() => {
    if (categories.length > 0 && rawNews.length > 0) {
      setLoading(false)
    }
  }, [categories, rawNews])

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

  // const sideList = [
  //   { 
  //     date: "March 15, 2025", 
  //     title: "World Leaders Gather for Climate Summit in Paris",
  //     excerpt: "Global leaders from over 50 countries convened in Paris to discuss urgent climate action and set new emission reduction targets."
  //   },
  //   { 
  //     date: "March 05, 2025", 
  //     title: "State Congress Passes $1 Trillion Infrastructure Bill",
  //     excerpt: "The landmark infrastructure bill includes funding for roads, bridges, broadband, and clean energy projects across the state."
  //   },
  //   { 
  //     date: "March 01, 2025", 
  //     title: "Climate Change Protesters Clash with Police in City L",
  //     excerpt: "Thousands of environmental activists took to the streets demanding immediate action on climate change policies."
  //   },
  //   { 
  //     date: "February 28, 2025", 
  //     title: "Administration to Introduce Climate Change Legislation",
  //     excerpt: "New comprehensive climate legislation aims to reduce carbon emissions by 50% over the next decade."
  //   },
  //   { 
  //     date: "February 15, 2025", 
  //     title: "The Changing Landscape of Political Power",
  //     excerpt: "Analysis of shifting political dynamics and emerging leadership trends in global governance structures."
  //   },
  //   { 
  //     date: "March 05, 2025", 
  //     title: "State Congress Passes $1 Trillion Infrastructure Bill",
  //     excerpt: "The landmark infrastructure bill includes funding for roads, bridges, broadband, and clean energy projects across the state."
  //   },
  //   { 
  //     date: "March 01, 2025", 
  //     title: "Climate Change Protesters Clash with Police in City L",
  //     excerpt: "Thousands of environmental activists took to the streets demanding immediate action on climate change policies."
  //   },
  //   { 
  //     date: "February 28, 2025", 
  //     title: "Administration to Introduce Climate Change Legislation",
  //     excerpt: "New comprehensive climate legislation aims to reduce carbon emissions by 50% over the next decade."
  //   },
  //   { 
  //     date: "February 15, 2025", 
  //     title: "The Changing Landscape of Political Power",
  //     excerpt: "Analysis of shifting political dynamics and emerging leadership trends in global governance structures."
  //   },
  // ]

  return (
    <Section aria-labelledby="news-tabs-heading">
      <Container>
        <h2 id="news-tabs-heading" style={{ position: "absolute", left: "-9999px" }}>
          News tabs
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
          <div id={`panel-${active}`} role="tabpanel" aria-labelledby={active} tabIndex={0}>
            <Grid role="list" aria-label={`${active} articles`}>
              {featured.map((p) => (
                <Card key={p.id} role="listitem" onClick={() => navigate(`/newsdetails/${p._id}`)} style={{ cursor: 'pointer' }}>
                  <ImageWrap>
                    <img src={p.image || "/placeholder.svg"} alt={p.alt} loading="lazy" />
                  </ImageWrap>
                  <Content>
                    <DateText>{p.date}</DateText>
                    <Title>{p.title.slice(0, 50)}...</Title>
                    <Excerpt>{p.excerpt.slice(0, 150)}...</Excerpt>
                  </Content>
                </Card>
              ))}

              {secondary.map((p) => (
                <Card key={p.id} role="listitem" onClick={() => navigate(`/newsdetails/${p._id}`)} style={{ cursor: 'pointer' }}>
                  <ImageWrap>
                    <img src={p.image || "/placeholder.svg"} alt={p.alt} loading="lazy" />
                  </ImageWrap>
                  <Content>
                    <DateText>{p.date}</DateText>
                    <Title>{p.title.slice(0, 50)}...</Title>
                    <Excerpt>{p.excerpt.slice(0, 150)}...</Excerpt>
                  </Content>
                </Card>
              ))}
            </Grid>
          </div>

          <Sidebar aria-label="Latest headlines" role="complementary">
            <SideList role="list" aria-label="Latest headlines">
              {sideList.map((item, idx) => (
                <SideItem key={idx} role="listitem" onClick={() => navigate(`/newsdetails/${item._id}`)} style={{ cursor: 'pointer' }}>
                  <SideDate>{item.date}</SideDate>
                  <SideTitle>{item.title.slice(0, 50)}...</SideTitle>
                </SideItem>
              ))}
            </SideList>
            <SeeMoreWrap>
              <SeeMoreBtn type="button" onClick={() => alert("Load more news...")} aria-label="Load more news">
                See More
              </SeeMoreBtn>
            </SeeMoreWrap>
          </Sidebar>
        </Layout>
      </Container>
    </Section>
  )
}
