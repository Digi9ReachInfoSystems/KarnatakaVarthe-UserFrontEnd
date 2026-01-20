import { 
  Aside,
  SkeletonCard,
  SkeletonThumb,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonMeta
} from "./styles/Sidebar.stle"
import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import { useNavigate } from "react-router-dom"
import { getArticles } from "../../../../services/newsApi/newsducks"
import SidebarCard from "./sidebarCard"
function SideBar({ dateFilter = null }) {
    //side for articles page
const { language } = useContext(LanguageContext)
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [rawData, setRawData] = useState([])
const navigate = useNavigate()
useEffect(() => {
  const fetchNews = async () => {
    console.log('🔍 SideBar - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
    setLoading(true)
    try {
      // Ensure dateFilter is string or null, never an object
      const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
      console.log('🔍 SideBar - Clean dateFilter:', cleanDateFilter)
      const response = await getArticles(cleanDateFilter)
      console.log('✅ SideBar - API response:', response)
      if (response?.success && Array.isArray(response.data.news)) {
        console.log('📰 SideBar - News count:', response.data.news.length)
        setRawData(response.data.news)
      } else {
        console.warn('⚠️ SideBar - No data or invalid format')
        setRawData([])
      }
    } catch (error) {
      console.error('❌ SideBar - Error:', error)
      setRawData([])
    }
    setLoading(false)
  }
  fetchNews()
}, [language, dateFilter])

  useEffect(() => {
    if (rawData.length > 0) {
      console.log('🔄 SideBar - Processing rawData, count:', rawData.length)
      const normalized = rawData.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
        
        // Extract proper ID from MongoDB format
        const newsId = item._id?.$oid || item._id
        
        return {
          _id: newsId,
          title: (item[langKey]?.title.slice(0, 50) ??" " ) + "..." ,
          excerpt: (item[langKey]?.description.slice(0, 150) ?? " ") + "..." ,
          date: item.date,
          author: item.author,
          imageSrc: item.newsImage ?? "/placeholder.svg",
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomTwo = shuffled.slice(0, 2)
      console.log('✅ SideBar - Random articles selected, count:', randomTwo.length)
      setArticles(randomTwo)
    }
  }, [language, rawData])

  // Shimmer loading component
  if (loading || articles.length === 0) {
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
         {articles.map((item, index) => (
           <SidebarCard key={index} {...item} onClick={() => navigate(`/newsdetails/${item._id}`)} />
         ))}
       </Aside>
  )
}

export default SideBar
