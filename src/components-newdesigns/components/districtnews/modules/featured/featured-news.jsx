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
import { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getNewsByTypeDistrict } from "../../../../../services/newsApi/NewsApi"
import { CategoryApi } from "../../../../../services/categoryapi/CategoryApi"
import { useNavigate } from "react-router-dom"

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
export default function FeaturedNewsSection() {
  // Parse date for datetime attribute
  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [featured, setFeatured] = useState(initialFeatured)
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
      try {
        const response = await getNewsByTypeDistrict()
        if (response?.success && Array.isArray(response.data)) {
          setRawData(response.data)
   
        } else {
         
        }
      } catch (error) {
        console.error("Error fetching news data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedNews()
  }, [language])

  useEffect(() => {
    if (rawData.length > 0) {
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


        return {
          _id: item._id,
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
      setFeatured(randomOne)
      setSideItems(randomTwo)
    }
  }, [language, rawData, categories])

  // Shimmer loading component
  if (loading || rawData.length === 0) {
    return (
      <Section as="section" aria-labelledby="featured-news-heading" role="region">
        <h2 
          id="featured-news-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Featured District News
        </h2>
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
          <Sidebar as="aside" role="complementary" aria-labelledby="featured-sidebar-heading">
            <h4 
              id="featured-sidebar-heading" 
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              Related Stories
            </h4>
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
    <Section as="section" aria-labelledby="featured-news-heading" role="region">
      <h2 
        id="featured-news-heading" 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Featured District News
      </h2>
      <Container>
        <LeftImageWrap>
          <img 
            src={featured.image || "/placeholder.svg"} 
            alt={`Featured story: ${featured.title}`}
            loading="lazy"
            onClick={() => navigate(`/newsdetails/${featured._id}`)}
            style={{ cursor: 'pointer' }}
          />
        </LeftImageWrap>

        <MainContent as="article" role="article" aria-labelledby="featured-main-title">
          <MetaRow>
            {/* <Tag aria-label={`Category: ${featured.category}`}>{featured.category}</Tag> */}
            <DateText as="time" dateTime={parseDateTimeAttr(featured.date)}>{featured.date}</DateText>
          </MetaRow>

          <h3 id="featured-main-title" onClick={() => navigate(`/newsdetails/${featured._id}`)} style={{ cursor: 'pointer' }}>{featured.title}</h3>
          <p>{featured.excerpt}</p>
        </MainContent>

        <Sidebar 
          as="aside" 
          role="complementary" 
          aria-labelledby="featured-sidebar-heading"
        >
          <h4 
            id="featured-sidebar-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Related Stories
          </h4>
          {sideItems.slice(0, 2).map((item, idx) => (
            <SideCard 
              key={idx} 
              as="article" 
              role="article"
              aria-labelledby={`featured-side-title-${idx}`}
              tabIndex="0"
            >
              <div className="thumb">
                <img 
                  src={item.image || "/placeholder.svg"} 
                  alt={`Related story: ${item.title}`}
                  loading="lazy"
                  onClick={() => navigate(`/newsdetails/${item._id}`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <MetaRow>
                  {/* <Tag aria-label={`Category: ${item.category}`}>{item.category}</Tag> */}
                  <DateText as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</DateText>
                </MetaRow>
                <h5 id={`featured-side-title-${idx}`}>{item.title}</h5>
                <p>{item.excerpt}</p>
              </div>
            </SideCard>
          ))}
        </Sidebar>
      </Container>
    </Section>
  )
}

