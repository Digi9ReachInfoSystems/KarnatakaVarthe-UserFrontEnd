import SidebarCard from "../../../../districtnews/modules/herosection/sidebar-card"
import { 
  Aside,
  SkeletonCard,
  SkeletonThumb,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonMeta
} from "./news-sidebar.styles"
import { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../../../context/LanguageContext"
import { PhotosApi } from "../../../../../../services/gallery/GalleryApi"
import { useNavigate } from "react-router-dom"

export default function NewsSidebar({ districtSlug, dateFilter = null }) {
  const { language } = useContext(LanguageContext)
  const [districtNews, setDistrictNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      if (!districtSlug) {
        setRawData([])
        setLoading(true) // Keep loading true to show shimmer loader
        return
      }
      
      try {
        const response = await PhotosApi.getDistrictNews(districtSlug, dateFilter)
        const newsData = response?.news || []
        setRawData(newsData)
      } catch (error) {
        console.error("Error fetching district news:", error)
        setRawData([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [language, districtSlug, dateFilter])
  
  useEffect(() => {
    if (rawData.length > 0) {
      const normalized = rawData.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
        const normalizedId = item._id?.$oid || item._id || item.id;
        return {
          _id: String(normalizedId),
          title: (item[langKey]?.title?.slice(0, 50) ?? item.title?.slice(0, 50) ?? " ") + "...",
          excerpt: (item[langKey]?.description?.slice(0, 150) ?? item.description?.slice(0, 150) ?? " ") + "...",
          date: item.publishedAt ? new Date(item.publishedAt.$date || item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : "",
          author: item.author || "Admin",
          imageSrc: item.newsImage ?? "/placeholder.svg",
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomTwo = shuffled.slice(0, 2)
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
        <SidebarCard key={index} index={index + 1} {...item} onClick={() => navigate(`/districtnewsdetails/${item._id}`)} style={{ cursor: 'pointer' }} />
      ))}
    </Aside>
  )
}
