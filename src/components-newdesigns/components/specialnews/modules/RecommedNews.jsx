import {
  Section,
  Header,
  Title,
  Grid,
  Card,
  ThumbWrap,
  Content,
  BadgeRow,
  Badge,
  TitleLink,
  Meta,
  DividerTitle,
  SkeletonCard,
  SkeletonThumb,
  SkeletonContent,
  SkeletonLine,
} from "./RecommedNews.styles"
import { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import { CategoryApi } from "../../../../services/categoryapi/CategoryApi"
import { getNews } from "../../../../services/newsApi/NewsApi"

const items = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: 'Karnataka Wins the Prestigious "National e-Governance Award" for 2024',
  category: "Buzzlines",
  author: "AthleteAdmirer",
  timeAgo: "24 hours ago",
  href: "#",
  image: "/specilanews/recommeded.jpg",
}))

export default function Recommrednews() {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [mostRead, setMostRead] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    // get categories
    const getCategories = async () => {
      setLoading(true)
      const res = await CategoryApi()
      if (res?.data) {
        setCategories(res.data)
      }
      setLoading(false)
    }
    getCategories()
  }, [])
  useEffect(() => {
    // get news by type state
const fetchNews = async () => {
  setLoading(true)
  const res = await getNews()

  if (res?.success && Array.isArray(res.data)) {
    setRawNews(res.data)
  }
  setLoading(false)
}
fetchNews()
  }, [language])


  // get news by type state based on active category
  useEffect(() => {
    if (!rawNews.length) return



    const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
     
    const localized = rawNews.map((item) => {
      // Handle category being null, array, object, or string
      let categoryId = null
      if (item.category) {
        if (Array.isArray(item.category) && item.category.length > 0) {
          categoryId = typeof item.category[0] === "object" ? item.category[0]._id : item.category[0]
        } else if (typeof item.category === "object") {
          categoryId = item.category._id
        } else {
          categoryId = item.category
        }
      }
      
      const categoryObj = categoryId
        ? (categories || []).find((cat) => String(cat._id) === String(categoryId)) || null
        : null

    // pick category name (try localized field first, then fallbacks)
    const categoryName =
      (categoryObj && (categoryObj[langKey]?.name || categoryObj.name || categoryObj.title)) ||
      ""
      return {
      
      id: item._id,
      title: item[langKey]?.title.slice(0, 50) + "..." || item.title || "",
      excerpt: item[langKey]?.description.slice(0, 150) + "..." || item.description || "",
      date: item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "",
      image: item.newsImage || "/placeholder.svg",
      categoryName: categoryName || "",
      author: item.author || "",
      timeAgo: item.timeAgo || "",
      alt: item.title || "",
    }})

    setNews(localized)
    const mostRead = localized.slice(3,6)
    setMostRead(mostRead)
  }, [language, rawNews])
  
  // Show shimmer while loading
  if (loading) {
    return (
      <Section as="section" aria-labelledby="recommended-heading" role="region">
        <h2 id="recommended-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Recommended and Most Read Articles
        </h2>

        <h3 id="recommended-articles-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Recommended Articles
        </h3>
        
        <Grid role="list" aria-labelledby="recommended-articles-heading">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <SkeletonThumb />
              <SkeletonContent>
                <SkeletonLine width="80px" height="24px" />
                <SkeletonLine width="90%" height="20px" />
                <SkeletonLine width="100%" height="14px" />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </Grid>

        <DividerTitle as="h3">Most Readed</DividerTitle>

        <Grid role="list">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <SkeletonThumb />
              <SkeletonContent>
                <SkeletonLine width="80px" height="24px" />
                <SkeletonLine width="90%" height="20px" />
                <SkeletonLine width="100%" height="14px" />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </Grid>
      </Section>
    )
  }
  
  return (
    <Section as="section" aria-labelledby="recommended-heading" role="region">
      <h2 id="recommended-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Recommended and Most Read Articles
      </h2>

      <h3 id="recommended-articles-heading" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Recommended Articles
      </h3>
      
      <Grid role="list" aria-labelledby="recommended-articles-heading">
        {news.slice(0, 3).map((item) => (
          <Card 
            key={item.id} 
            as="article" 
            role="listitem"
            aria-labelledby={`rec-title-${item.id}`}
            tabIndex="0"
          >
            <ThumbWrap 
              as="a"
              href={`/newsdetails/${item.id}`} 
              aria-label={`View full article: ${item.title}`}
            >
              <img 
                src={item.image || "/placeholder.svg"} 
                alt={`Featured image for: ${item.title}`}
                loading="lazy"
              />
            </ThumbWrap>
            <Content>
              <BadgeRow>
                <Badge aria-label={`Category: ${item.categoryName}`}>
                  {/* simple red accent dot */}
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "currentColor",
                      display: "inline-block",
                    }}
                    aria-hidden="true"
                  />
                  {item.categoryName}
                </Badge>
              </BadgeRow>

              <TitleLink 
                id={`rec-title-${item.id}`}
                as="a"
                href={item.href}
              >
                <h4 style={{ all: 'inherit' }}>{item.title}</h4>
              </TitleLink>

              <Meta>
                <span aria-label={`Author: ${item.author}`}>{item.author}</span>
                <span aria-hidden="true">•</span>
                <time dateTime="P1D" aria-label={`Posted ${item.date}`}>{item.date}</time>
              </Meta>
            </Content>
          </Card>
        ))}
      </Grid>

      <DividerTitle as="h3" id="most-read-heading">Most Readed</DividerTitle>

      <Grid role="list" aria-labelledby="most-read-heading">
        {mostRead.map((item) => (
          <Card 
            key={item.id} 
            as="article" 
            role="listitem"
            aria-labelledby={`read-title-${item.id}`}
            tabIndex="0"
          >
            <ThumbWrap 
              as="a"
              href={`/newsdetails/${item.id}`} 
              aria-label={`View full article: ${item.title}`}
            >
              <img 
                src={item.image || "/placeholder.svg"} 
                alt={`Featured image for: ${item.title}`}
                loading="lazy"
              />
            </ThumbWrap>
            <Content>
              <BadgeRow>
                <Badge aria-label={`Category: ${item.categoryName}`}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "currentColor",
                      display: "inline-block",
                    }}
                    aria-hidden="true"
                  />
                  {item.categoryName}
                </Badge>
              </BadgeRow>

              <TitleLink 
                id={`read-title-${item.id}`}
                as="a"
                href={`/newsdetails/${item.id}`}
              >
                <h4 style={{ all: 'inherit' }}>{item.title}</h4>
              </TitleLink>

              <Meta>
                <span aria-label={`Author: ${item.author}`}>{item.author}</span>
                <span aria-hidden="true">•</span>
                <time dateTime="P1D" aria-label={`Posted ${item.date}`}>{item.date}</time>
              </Meta>
            </Content>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
