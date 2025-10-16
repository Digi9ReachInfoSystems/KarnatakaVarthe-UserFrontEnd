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
import { Link } from "react-router-dom"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getNews } from "../../../../../services/newsApi/NewsApi"
import { useState, useEffect, useContext } from "react"
import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"

// Define initial states
const initialFeatured = {
  id: "",
  image: "/placeholder.svg",
  category: "",
  date: "",
  title: "",
  excerpt: "",
}

const initialSideItems = [
  {
    id: "",
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
  {
    id: "",
    image: "/placeholder.svg",
    category: "",
    date: "",
    title: "",
    excerpt: "",
  },
]

export default function FeaturedNewsSection() {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [featuredNews, setFeaturedNews] = useState(initialFeatured)
  const [sideItems, setSideItems] = useState(initialSideItems)
  const [categories, setCategories] = useState([])
  const { language } = useContext(LanguageContext)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await CategoryApi()
      if (response?.success && Array.isArray(response.data)) {
        setCategories(response.data)
      }
    }
    fetchCategories()
  }, [])

  // Fetch March of Karnataka news (magazineType: "magazine2")
  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await getNews()
        if (response?.success && Array.isArray(response.data)) {
          // Filter by magazineType: "magazine2" (March of Karnataka)
          const filteredData = response.data.filter(item => 
            item.magazineType === "magazine2"
          )
          console.log("Filtered March featured news:", filteredData)
          setRawData(filteredData)
        }
      } catch (error) {
        console.error("Error fetching March featured news:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedNews()
  }, [language])

  // Process data based on language
  useEffect(() => {
    if (rawData.length > 0 && categories.length > 0) {
      const normalized = rawData.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      
        // Handle category being either an object, a string ID, or null
        let categoryId = null
        if (item.category) {
          categoryId = typeof item.category === "object" ? item.category._id : item.category
        }
        console.log("March Featured - Category ID:", categoryId, "Type:", typeof item.category)
        
        // Find the category name based on the category ID
        const category = categoryId ? categories.find((cat) => cat._id === categoryId) : null
        console.log("March Featured - Found category:", category)
        
        const categoryName = category ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada) : "Uncategorized"

        return {
          id: item._id,
          image: item.newsImage || "/placeholder.svg",
          category: categoryName || "General",
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
          title: item[langKey]?.title || "",
          excerpt: item[langKey]?.description || "",
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomOne = shuffled[0] || initialFeatured
      const randomTwo = shuffled.slice(1, 3) || initialSideItems
      setFeaturedNews(randomOne)
      setSideItems(randomTwo)
    }
  }, [language, rawData, categories])

  // Shimmer loading component
  if (loading || rawData.length === 0) {
    return (
      <Section aria-label="Featured March of Karnataka news">
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
          <Sidebar aria-label="More Karnataka progress stories" role="complementary">
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
    <Section aria-label="Featured March of Karnataka news">
      <Container>
        <Link 
          to={`/newsdetails/${featuredNews.id}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}
        >
          <LeftImageWrap>
            <img src={featuredNews.image || "/placeholder.svg"} alt="Karnataka progress story image" loading="eager" />
          </LeftImageWrap>

          <MainContent>
            <MetaRow>
              <Tag aria-label={`Category: ${featuredNews.category}`}>{featuredNews.category}</Tag>
              <DateText dateTime="2025-03-20">{featuredNews.date}</DateText>
            </MetaRow>

            <h2>{featuredNews.title.slice(0, 50) + "..."}</h2>
            <p>{featuredNews.excerpt.slice(0, 150) + "..."}</p>
          </MainContent>
        </Link>

        <Sidebar aria-label="More Karnataka progress stories" role="complementary">
          {sideItems.map((item, idx) => (
            <Link 
              to={`/newsdetails/${item.id}`}
              key={idx}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <SideCard role="article" aria-label={item.title}>
                <div className="thumb">
                  <img src={item.image || "/placeholder.svg"} alt="Karnataka story thumbnail" loading="lazy" />
                </div>
                <div>
                  <MetaRow>
                    <Tag aria-label={`Category: ${item.category}`}>{item.category}</Tag>
                    <DateText dateTime="2025-03-20">{item.date}</DateText>
                  </MetaRow>
                  <h3>{item.title.slice(0, 50) + "..."}</h3>
                  <p>{item.excerpt.slice(0, 150) + "..."}</p>
                </div>
              </SideCard>
            </Link>
          ))}
        </Sidebar>
      </Container>
    </Section>
  )
}
