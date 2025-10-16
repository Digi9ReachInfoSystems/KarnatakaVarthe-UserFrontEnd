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
import { getNewsByTypeState } from "../../../../../services/newsApi/NewsApi"
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
}) {
  const { language } = useContext(LanguageContext)

const [stateNews, setStateNews] = useState([])
const [loading, setLoading] = useState(true)
const [rawData, setRawData] = useState([])
const navigate = useNavigate()

useEffect(() => {
  const fetchNews = async () => {
    setLoading(true)
    const response = await getNewsByTypeState()
    console.log(response)
    if (response?.success && Array.isArray(response.data)) {
      setRawData(response.data)
    } else {
      setRawData([])
    }
    setLoading(false)
  }
  fetchNews()
}, [language])

  useEffect(() => {
    if (rawData.length > 0) {
      const normalized = rawData.map((item) => {
        const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
        return {
          _id: item._id,
          title: (item[langKey]?.title.slice(0, 50) ??" " ) + "..." ,
          excerpt: (item[langKey]?.description.slice(0, 150) ?? " ") + "..." ,
          date: item.date,
          author: item.author,
          imageSrc: item.newsImage ?? "/placeholder.svg", // Fixed the double ?? operator issue
        }
      })

      const shuffled = [...normalized].sort(() => Math.random() - 0.5)
      const randomTwo = shuffled.slice(0, 2)
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
