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
import { getNewsByTypeArticles } from "../../../../services/newsApi/NewsApi"
import SidebarCard from "./sidebarCard"
function SideBar() {
    //side for articles page
const { language } = useContext(LanguageContext)
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [rawData, setRawData] = useState([])
const navigate = useNavigate()
useEffect(() => {
  const fetchNews = async () => {
    setLoading(true)
    const response = await getNewsByTypeArticles()
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
