import {
  Section,
  Container,
  LeftImageWrap,
  MainContent,
  MetaRow,
  Tag,
  DateText,
  Sidebar,
  SideCard,
  SkeletonImageWrap,
  SkeletonContent,
  SkeletonTag,
  SkeletonTitle,
  SkeletonText,
  SkeletonSideCard,
  SkeletonThumb,
} from "./featured-news.styles"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getStateNews } from "../../../../../services/newsApi/newsducks"
import { useState, useEffect, useContext } from "react"
import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"
import { useNavigate } from "react-router-dom"

// Define initial states
const initialFeatured = {
  image: "/placeholder.svg",
  category: "",
  date: "",
  title: "",
  excerpt: "",
}

const initialSideItems = [
  {
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
  {
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
]

export default function FeaturedNewsSection({ dateFilter = null }) {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredNews, setFeaturedNews] = useState(initialFeatured)
  const [sideItems, setSideItems] = useState(initialSideItems)
  const [categories, setCategories] = useState([])
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryApi()
      if (response?.success && Array.isArray(response.data)) {
        setCategories(response.data)
     
      }
    }
    fetchCategories()
  }, [])
  useEffect(() => {
    const fetchFeaturedNews = async () => {
      console.log('🔍 FeaturedNewsSection - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      try {
        // Ensure dateFilter is string or null, never an object
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 FeaturedNewsSection - Clean dateFilter:', cleanDateFilter)
        const response = await getStateNews(cleanDateFilter)
        console.log('✅ FeaturedNewsSection - API response:', response)
        if (response?.success && Array.isArray(response.data.news)) {
          console.log('📰 FeaturedNewsSection - News count:', response.data.news.length)
          setRawData(response.data.news)
   
        } else {
          console.warn('⚠️ FeaturedNewsSection - No data or invalid format')
        }
      } catch (error) {
        console.error("❌ FeaturedNewsSection - Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedNews()
  }, [language, dateFilter])

  useEffect(() => {
    if (rawData.length > 0) {
      console.log('🔄 FeaturedNewsSection - Processing rawData, count:', rawData.length)
      const normalized = rawData.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      
        // Handle category being either an object, a string ID, or null
        let categoryId = null
        if (item.category) {
          categoryId = typeof item.category === "object" ? item.category._id : item.category
        }
   
        // Find the category name based on the category ID
        const category = categoryId ? categories.find((cat) => cat._id === categoryId) : null
        const categoryName = category ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada) : "Uncategorized"

        // Extract proper ID from MongoDB format
        const newsId = item._id?.$oid || item._id

        return {
          _id: newsId,
          image: item.newsImage || "/placeholder.svg",
          category: categoryName || "",
          date: item[langKey]?.date || "",
          title: item[langKey]?.title || "",
          excerpt: item[langKey]?.description || "",
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomOne = shuffled[0] || initialFeatured
      const randomTwo = shuffled.slice(1, 3) || initialSideItems
      console.log('✅ FeaturedNewsSection - Featured and side items selected')
      setFeaturedNews(randomOne)
      setSideItems(randomTwo)
    }
  }, [language, rawData, categories])

  // Shimmer loading component
  if (loading || rawData.length === 0) {
    return (
      <Section aria-label="Featured news">
        <Container>
          <SkeletonImageWrap />
          <SkeletonContent>
            <MetaRow>
              <SkeletonTag />
              <SkeletonText width="120px" height="14px" />
            </MetaRow>
            <SkeletonTitle />
            <SkeletonTitle style={{ width: "70%" }} />
            <SkeletonText width="95%" />
            <SkeletonText width="80%" />
          </SkeletonContent>
          <Sidebar aria-label="More top stories" role="complementary">
            {[1, 2].map((idx) => (
              <SkeletonSideCard key={idx}>
                <SkeletonThumb />
                <div style={{ width: "100%" }}>
                  <MetaRow style={{ marginBottom: "12px" }}>
                    <SkeletonTag />
                    <SkeletonText width="100px" height="14px" />
                  </MetaRow>
                  <SkeletonText width="95%" height="18px" />
                  <SkeletonText width="85%" height="18px" />
                  <SkeletonText width="90%" height="14px" />
                  <SkeletonText width="70%" height="14px" />
                </div>
              </SkeletonSideCard>
            ))}
          </Sidebar>
        </Container>
      </Section>
    )
  }

  return (
    <Section aria-label="Featured news">
      <Container>
        <LeftImageWrap onClick={() => navigate(`/newsdetails/${featuredNews._id}`)} style={{ cursor: 'pointer' }}>
          <img src={featuredNews.image || "/placeholder.svg"} alt="Lead story image" loading="eager" />
        </LeftImageWrap>
        <MainContent onClick={() => navigate(`/newsdetails/${featuredNews._id}`)} style={{ cursor: 'pointer' }}>
          <MetaRow>
            {/* <Tag aria-label={`Category: ${featuredNews.category}`}>{featuredNews.category}</Tag> */}
            <DateText dateTime="2025-03-20">{featuredNews.date}</DateText>
          </MetaRow>
          <h2>{featuredNews.title.slice(0, 50) + "..."}</h2>
          <p>{featuredNews.excerpt.slice(0, 150) + "..."}</p>
        </MainContent>
        <Sidebar aria-label="More top stories" role="complementary">
          {sideItems.map((item, idx) => (
            <SideCard key={idx} role="article" aria-label={item.title} onClick={() => navigate(`/newsdetails/${item._id}`)} style={{ cursor: 'pointer' }}>
              <div className="thumb">
                <img src={item.image || "/placeholder.svg"} alt="Story thumbnail" loading="lazy" />
              </div>
              <div>
                <MetaRow>
                  {/* <Tag aria-label={`Category: ${item.category}`}>{item.category}</Tag> */}
                  <DateText dateTime="2025-03-20">{item.date}</DateText>
                </MetaRow>
                <h3>{item.title.slice(0, 50) + "..."}</h3>
                <p>{item.excerpt.slice(0, 150) + "..."}</p>
              </div>
            </SideCard>
          ))}
        </Sidebar>
      </Container>
    </Section>
  )
}
