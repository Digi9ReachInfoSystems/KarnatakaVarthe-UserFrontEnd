import SidebarCard from "./sidebar-card"
import { 
  Aside,
  SkeletonCard,
  SkeletonThumb,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonMeta
} from "./news-sidebar.styles"
import { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getDistrictNews } from "../../../../../services/newsApi/newsducks"
import { useNavigate } from "react-router-dom"
import EmptyState from "../DateFilter/EmptyState"

export default function NewsSidebar({
  items = [
    {
      title: "District Tourist Places and Attractions",
      excerpt: "Norem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "June 19, 2025 06:00pm",
      author: "james",
      imageSrc: "/state/sidebar.jpg",
    },
    {
      title: "District Cultural Heritage Sites",
      excerpt: "Norem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "June 19, 2025 06:00pm",
      author: "james",
      imageSrc: "/state/sidebar2.jpg",
    },
  ],
  dateFilter = null,
}) {
  const { language } = useContext(LanguageContext)
  const [districtNews, setDistrictNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchNews = async () => {
      console.log('🔍 NewsSidebar - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      setLoading(true)
      try {
        // Ensure dateFilter is string or null, never an object
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 NewsSidebar - Clean dateFilter:', cleanDateFilter)
        const response = await getDistrictNews(cleanDateFilter)
        console.log('✅ NewsSidebar - API response:', response)
        if (response?.success && Array.isArray(response.data.news)) {
          console.log('📰 NewsSidebar - News count:', response.data.news.length)
          setRawData(response.data.news)
        } else {
          console.warn('⚠️ NewsSidebar - No data or invalid format')
          setRawData([])
        }
      } catch (error) {
        console.error('❌ NewsSidebar - Error:', error)
        setRawData([])
      }
      setLoading(false)
    }
    fetchNews()
  }, [language, dateFilter])
  
    useEffect(() => {
      if (rawData.length > 0) {
        console.log('🔄 NewsSidebar - Processing rawData, count:', rawData.length)
        const normalized = rawData.map((item) => {
          const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
          
          // Extract proper ID from MongoDB format
          const newsId = item._id?.$oid || item._id
          
          return {
            _id: newsId,
            title: (item[langKey]?.title.slice(0, 50)??" ") + "..." ,
            excerpt: (item[langKey]?.description.slice(0, 150)??" " ) + "..." ,
            date: item.date,
            author: item.author,
            imageSrc: item.newsImage ?? "/placeholder.svg",
          }
        })
  
        const shuffled = [...normalized].sort(() => Math.random() - 0.5)
        const randomTwo = shuffled.slice(0, 2)
        console.log('✅ NewsSidebar - Random news selected, count:', randomTwo.length)
        setDistrictNews(randomTwo)
      }
    }, [language, rawData])

  // Shimmer loading component
  if (loading || districtNews.length === 0) {
    return (
      <Aside role="complementary" aria-labelledby="sidebar-heading">
        <h3 
          id="sidebar-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Recent District News
        </h3>
        {[1, 2].map((item) => (
          <SkeletonCard key={item}>
            <SkeletonThumb />
            <SkeletonTitle />
            <SkeletonTitle style={{ width: "65%" }} />
            <SkeletonExcerpt />
            <SkeletonExcerpt style={{ width: "50%" }} />
            <SkeletonMeta />
          </SkeletonCard>
        ))}
      </Aside>
    )
  }

  return (
    <Aside role="complementary" aria-labelledby="sidebar-heading">
      <h3 
        id="sidebar-heading" 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Recent District News
      </h3>
      {districtNews.map((item, index) => (
        <SidebarCard key={index} index={index + 1} {...item} onClick={() => navigate(`/newsdetails/${item._id}`)} style={{ cursor: 'pointer' }} />
      ))}
    </Aside>
  )
}

