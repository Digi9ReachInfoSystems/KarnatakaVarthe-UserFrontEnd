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
import { LanguageContext } from "../../../../../../context/LanguageContext"
import { PhotosApi } from "../../../../../../services/gallery/GalleryApi"
import { CategoryApi } from "../../../../../../services/categoryapi/CategoryApi"
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

export default function FeaturedNewsSection({ districtSlug, dateFilter = null }) {
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
        setLoading(true)
        if (!districtSlug) {
          setRawData([])
          // Keep loading true to show shimmer loader - don't set to false
          return
        }
        
        const response = await PhotosApi.getDistrictNews(districtSlug, dateFilter)
        const newsData = response?.news || []
        setRawData(newsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching news data:", error)
        setLoading(false)
      }
    }
    fetchFeaturedNews()
  }, [language, districtSlug, dateFilter])

  useEffect(() => {
    if (rawData.length > 0) {
      // Sort by publishedAt date (newest first)
      const sortedNews = [...rawData].sort((a, b) => {
        const dateA = new Date(a.publishedAt?.$date || a.publishedAt || 0);
        const dateB = new Date(b.publishedAt?.$date || b.publishedAt || 0);
        return dateB - dateA;
      });
      
      // Exclude first 3 items (shown in hero section) and take next 3 for featured
      const featuredNews = sortedNews.slice(3, 6);
      
      const normalized = featuredNews.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      
        // Handle category being either an object, a string ID, or null
        let categoryId = null
        if (item.category) {
          categoryId = typeof item.category === "object" ? (item.category._id?.$oid || item.category._id) : item.category
        }
   
        // Find the category name based on the category ID
        const category = categoryId ? categories.find((cat) => cat._id === categoryId) : null
        const categoryName = category ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada) : "Uncategorized"

        const normalizedId = item._id?.$oid || item._id || item.id;
        return {
          _id: String(normalizedId),
          image: item.newsImage || "/placeholder.svg",
          category: categoryName || "",
          date: item.publishedAt ? new Date(item.publishedAt.$date || item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : "",
          title: item[langKey]?.title || item.title || "",
          excerpt: item[langKey]?.description || item.description || "",
        }
      })

      // First item is main featured, next 2 are sidebar items
      const mainFeatured = normalized[0] || initialFeatured
      // Only set sidebar items if there are actual items (length > 1)
      const sidebarItems = normalized.length > 1 ? normalized.slice(1, 3) : []
      setFeatured(mainFeatured)
      setSideItems(sidebarItems)
    } else {
      // Reset to empty when no data
      setFeatured(initialFeatured)
      setSideItems([])
    }
  }, [language, rawData, categories])

  // Shimmer loading component
  if (loading) {
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

  // Hide section when no data (after loading completes)
  if (!loading && rawData.length === 0) {
    return null
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
            onClick={() => navigate(`/districtnewsdetails/${featured._id}`)}
            style={{ cursor: 'pointer' }}
          />
        </LeftImageWrap>

        <MainContent as="article" role="article" aria-labelledby="featured-main-title">
          <MetaRow>
            <DateText as="time" dateTime={parseDateTimeAttr(featured.date)}>{featured.date}</DateText>
          </MetaRow>

          <h3 id="featured-main-title" onClick={() => navigate(`/districtnewsdetails/${featured._id}`)} style={{ cursor: 'pointer' }}>{featured.title}</h3>
          <p>{featured.excerpt}</p>
        </MainContent>

        {/* Only show sidebar if there are side items */}
        {sideItems.length > 0 && (
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
            {sideItems.map((item, idx) => (
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
                    onClick={() => navigate(`/districtnewsdetails/${item._id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <div>
                  <MetaRow>
                    <DateText as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</DateText>
                  </MetaRow>
                  <h5 id={`featured-side-title-${idx}`}>{item.title}</h5>
                  <p>{item.excerpt}</p>
                </div>
              </SideCard>
            ))}
          </Sidebar>
        )}
      </Container>
    </Section>
  )
}
