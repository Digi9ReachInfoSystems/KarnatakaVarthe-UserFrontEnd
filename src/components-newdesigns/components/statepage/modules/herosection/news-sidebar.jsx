import SidebarCard from "./sidebar-card"
import { 
  Aside,
  SkeletonCard,
  SkeletonThumb,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonMeta
} from "./news-sidebar.styles"
import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { fetchStateNewsListPage } from "../../../../../services/newapis/newapis-services"
import { useNavigate } from "react-router-dom"

export default function NewsSidebar({


  items = [
    {
      title: "Yadgir District Tourist Places",
      excerpt: "Norem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "June 19, 2025 06:00pm",
      author: "james",
      imageSrc: "/state/sidebar.jpg",
    },
    {
      title: "Yadgir District Tourist Places",
      excerpt: "Norem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "June 19, 2025 06:00pm",
      author: "james",
      imageSrc: "/state/sidebar2.jpg",
    },
  ],
  dateFilter = null,
}) {
  const { language } = useContext(LanguageContext)

const [stateNews, setStateNews] = useState([])
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
      const response = await fetchStateNewsListPage(1, { date: cleanDateFilter })
      console.log('✅ NewsSidebar - API response:', response)
      if (response?.success && Array.isArray(response.data)) {
        console.log('📰 NewsSidebar - News count:', response.data.length)
        setRawData(response.data)
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
        
        // Extract and format date from MongoDB format
        const publishedDate = item.publishedAt?.$date || item.publishedAt || item.date
        let formattedDate = 'N/A'
        if (publishedDate) {
          try {
            const dateObj = new Date(publishedDate)
            // Format as: Jan 13, 2026
            formattedDate = dateObj.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })
          } catch (error) {
            console.error('Error formatting date:', error)
            formattedDate = 'N/A'
          }
        }
        
        return {
          _id: newsId,
          title: (item[langKey]?.title.slice(0, 50) ??" " ) + "..." ,
          excerpt: (item[langKey]?.description.slice(0, 150) ?? " ") + "..." ,
          date: formattedDate,
          author: item.author || 'Karnataka Varthe',
          imageSrc: item.newsImage ?? "/placeholder.svg",
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomTwo = shuffled.slice(0, 2)
      console.log('✅ NewsSidebar - Random news selected, count:', randomTwo.length)
      console.log('📅 NewsSidebar - Sample news dates:', randomTwo.map(n => n.date))
      setStateNews(randomTwo)
    }
  }, [language, rawData])

  // Shimmer loading component
  if (loading || stateNews.length === 0) {
    return (
      <Aside aria-label="Latest stories" role="complementary">
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
    <Aside aria-label="Latest stories" role="complementary">
      {stateNews.map((item, index) => (
        <SidebarCard key={index} {...item} onClick={() => navigate(`/newsdetails/${item._id}`)} />
      ))}
    </Aside>
  )
}
