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
import { getNews } from "../../../../../services/newsApi/NewsApi"

export default function NewsSidebar() {
  const { language } = useContext(LanguageContext)

  const [marchNews, setMarchNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])

  // Fetch March of Karnataka news (magazineType: "magazine2")
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      const response = await getNews()
      console.log("March sidebar news:", response)
      if (response?.success && Array.isArray(response.data)) {
        // Filter by magazineType: "magazine2" (March of Karnataka)
        const filteredData = response.data.filter(item => 
          item.magazineType === "magazine2"
        )
        setRawData(filteredData)
      } else {
        setRawData([])
      }
      setLoading(false)
    }
    fetchNews()
  }, [language])

  // Process data based on language
  useEffect(() => {
    if (rawData.length > 0) {
      const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      const normalized = rawData.map((item) => ({
        id: item._id,
        title: (item[langKey]?.title?.slice(0, 50) ?? " "  )+ "..." ,
        excerpt: (item[langKey]?.description?.slice(0, 150) ?? " ") + "..." ,
        date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
        author: item.author || "March of Karnataka",
        imageSrc: item.newsImage ?? "/placeholder.svg",
      }))

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomTwo = shuffled.slice(0, 2)
      setMarchNews(randomTwo)
    }
  }, [language, rawData])

  // Shimmer loading component
  if (loading || marchNews.length === 0) {
    return (
      <Aside aria-label="March of Karnataka stories" role="complementary">
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
    <Aside aria-label="March of Karnataka stories" role="complementary">
      {marchNews.map((item, index) => (
        <SidebarCard key={index} {...item} />
      ))}
    </Aside>
  )
}
