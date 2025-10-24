import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import { getNewsByTypeState } from "../../../../services/newsApi/NewsApi"
import { CategoryApi } from "../../../../services/categoryapi/CategoryApi"
import {
  Section,
  HeaderRow,
  Title,
  SeeMore,
  ArrowIcon,
  PageLayout,
  FeaturedCard,
  FeaturedImage,
  Overlay,
  FeaturedContent,
  Badge,
  FeaturedTitle,
  FeaturedExcerpt,
  MetaBar,
  MetaBarSmall,
  MetaItem,
  MiddleCol,
  SmallCard,
  Thumb,
  SmallContent,
  SmallBadge,
  SmallTitle,
  SkeletonFeaturedCard,
  SkeletonFeaturedImage,
  SkeletonMetaBar,
  SkeletonText,
  SkeletonSmallCard,
  SkeletonThumb,
} from "./StateNews.styles"

// Empty initial states instead of fallback data
const emptyFeatured = {
  category: "",
  title: "",
  excerpt: "",
  image: "/placeholder.svg",
  meta: ["", "", ""],
}

const emptyList = []

export default function StateNews({ onSeeMore }) {
  const { language } = useContext(LanguageContext)
  const [rawData, setRawData] = useState([])
  const [featured, setFeatured] = useState(emptyFeatured)
  const [list, setList] = useState(emptyList)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  // Header text translations
  const headerText = {
    English: "State News",
    Kannada: "ರಾಜ್ಯ ಸುದ್ದಿ",
    Hindi: "राज्य समाचार"
  }

  const seeMoreText = {
    English: "See more",
    Kannada: "ಇನ್ನಷ್ಟು ನೋಡಿ",
    Hindi: "और देखें"
  }

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryApi()
        if (response?.success && Array.isArray(response.data)) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch state news
  useEffect(() => {
    const fetchStateNews = async () => {
      try {
        setLoading(true)
        const response = await getNewsByTypeState()
        console.log("State news API response:", response)
        
        if (response?.success && Array.isArray(response.data)) {
          // Filter only by magazineType and newsType
          const filteredData = response.data.filter(item => 
            item.magazineType === "magazine" && 
            item.newsType === "statenews"
          )
          console.log("Filtered state news:", filteredData)
          setRawData(filteredData)
        } else {
          setRawData([])
        }
      } catch (error) {
        console.error("Error fetching state news:", error)
        setRawData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchStateNews()
  }, [])

  useEffect(() => {
    if (rawData.length > 0) {
      // Process data based on current language (Kannada by default)
      const langKey = language === "English" ? "English" : 
                     language === "Hindi" ? "hindi" : "kannada"
      
      const processedData = rawData.map((item) => {
        // Get title and limit to 70 characters
        const fullTitle = item[langKey]?.title || item.title || ""
        const limitedTitle = fullTitle.length > 70 ? fullTitle.substring(0, 70) + "..." : fullTitle
        
        // Get excerpt and limit to 120 characters
        const fullExcerpt = item[langKey]?.description || item.description || ""
        const limitedExcerpt = fullExcerpt.length > 120 ? fullExcerpt.substring(0, 120) + "..." : fullExcerpt
        
        // Get category ID and find matching category name from API
        const categoryId = item.category
        const category = categories.find((cat) => cat._id === categoryId)
        const categoryName = category 
          ? (language === "English" ? category.name : language === "Hindi" ? category.hindi : category.kannada) 
          : ""
        
        return {
          id: item._id,
          title: limitedTitle,
          excerpt: limitedExcerpt,
          image: item.newsImage || "/placeholder.svg",
          category: categoryName,
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
          author: item.author || "Admin",
          meta: [item.author || "Admin", item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""],
          publishedAt: item.publishedAt
        }
      })

      // Sort by latest published date (newest first)
      const sortedByLatest = [...processedData].sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0)
        const dateB = new Date(b.publishedAt || 0)
        return dateB - dateA // Descending order (latest first)
      })

      // Set featured news (latest item)
      if (sortedByLatest.length > 0) {
        setFeatured(sortedByLatest[0])
      } else {
        setFeatured(emptyFeatured)
      }

      // Set list items (next 3 latest items)
      const listItems = sortedByLatest.slice(1, 4)
      setList(listItems)
    }
  }, [rawData, language, categories])

  // Skeleton loading component
  const SkeletonLoader = () => (
    <PageLayout>
      {/* Left: Featured Skeleton */}
      <SkeletonFeaturedCard>
        <SkeletonFeaturedImage />
        <SkeletonMetaBar>
          <SkeletonText $width="80%" $height="20px" />
          <SkeletonText $width="100%" $height="16px" />
          <SkeletonText $width="60%" $height="14px" />
        </SkeletonMetaBar>
      </SkeletonFeaturedCard>

      {/* Right: Small Cards Skeleton */}
      <MiddleCol>
        {[1, 2, 3].map((_, idx) => (
          <SkeletonSmallCard key={idx}>
            <SkeletonThumb />
          </SkeletonSmallCard>
        ))}
      </MiddleCol>
    </PageLayout>
  )

  return (
    <Section aria-labelledby="state-news-heading">
      <HeaderRow>
        <Title id="state-news-heading">{headerText[language] || "State News"}</Title>
        <SeeMore
          as={Link}
          to="/state"
          aria-label={`${seeMoreText[language] || "See more"} ${headerText[language] || "state news"}`}
        >
          {seeMoreText[language] || "See more"}
          <ArrowIcon aria-hidden="true">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </ArrowIcon>
        </SeeMore>
      </HeaderRow>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <PageLayout>
          {/* Left: Featured */}
          {featured.title && (
            <Link 
              to={`/newsdetails/${featured.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <FeaturedCard>
                <FeaturedImage $src={featured.image}>
                  <Overlay />
                  <FeaturedContent>
                    {/* <Badge>{featured.category}</Badge> */}
                    <FeaturedTitle>{featured.title}</FeaturedTitle>
                  </FeaturedContent>
                </FeaturedImage>
                {featured.excerpt && (
                  <MetaBar>
                    <FeaturedExcerpt>{featured.excerpt}</FeaturedExcerpt>
                  </MetaBar>
                )}
                {featured.meta?.length > 0 && (
                  <MetaBarSmall>
                    {featured.meta.filter(m => m).map((m, i) => (
                      <MetaItem key={i}>{m}</MetaItem>
                    ))}
                  </MetaBarSmall>
                )}
              </FeaturedCard>
            </Link>
          )}

          {/* Middle: Stacked list */}
          {list.length > 0 && (
            <MiddleCol>
              {list.map((item, idx) => (
                <Link 
                  to={`/newsdetails/${item.id}`}
                  key={idx}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <SmallCard>
                    <Thumb $src={item.image} role="img" aria-label={item.title} />
                    <SmallContent>
                      {/* <SmallBadge>{item.category}</SmallBadge> */}
                      <SmallTitle>{item.title}</SmallTitle>
                    </SmallContent>
                  </SmallCard>
                </Link>
              ))}
            </MiddleCol>
          )}
        </PageLayout>
      )}

    </Section>
  )
}
