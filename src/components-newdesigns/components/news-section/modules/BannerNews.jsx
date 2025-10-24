import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import { getNews } from "../../../../services/newsApi/NewsApi";
import { formatDate } from "../../../../utils/formatters";
import {
  BannerWrap,
  BannerInner,
  BannerImage,
  Overlay,
  Content,
  DateText,
  Title,
  Badge,
  LinkArea,
  SkeletonBannerWrap,
  SkeletonBannerInner,
  SkeletonContent,
  SkeletonDate,
  SkeletonBadge,
  SkeletonTitle,
} from "./BannerNews.styles"
import { useNavigate } from "react-router-dom"
export default function Banner() {
  const { language } = useContext(LanguageContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const langKey = language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
  const navigate = useNavigate()
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await getNews()
        if (!mounted || !res?.success || !Array.isArray(res.data)) {
          if (mounted) setLoading(false)
          return
        }

        // pick most-recent by publishedAt (fallback to createdAt)
        const latest = res.data.reduce((best, cur) => {
          const b = new Date(best?.publishedAt ?? best?.createdAt ?? 0)
          const c = new Date(cur?.publishedAt ?? cur?.createdAt ?? 0)
          return c > b ? cur : best
        }, res.data[0])

        if (!latest) {
          if (mounted) setLoading(false)
          return
        }
        
        const title = latest[langKey]?.title ?? latest.title ?? ""
        const excerpt = latest[langKey]?.description ?? latest.description ?? ""
        const imageSrc = latest.newsImage ?? "/placeholder.svg"
        const date = latest.publishedAt ?? latest.createdAt ?? ""
        const id = latest._id ?? latest.id ?? ""

        // Extract category name based on language context
        let categoryName = "News"
        if (typeof latest.category === "object" && latest.category) {
          if (langKey === "English") {
            categoryName = latest.category.name || latest.category.title || "News"
          } else if (langKey === "hindi") {
            categoryName = latest.category.hindi || latest.category.name || latest.category.title || "News"
          } else if (langKey === "kannada") {
            categoryName = latest.category.kannada || latest.category.name || latest.category.title || "News"
          }
        }

        const badge = categoryName
        const href = `/newsdetails/${id}`

        if (mounted) {
          setItem({ title, excerpt, imageSrc, date, badge, href, id })
          setLoading(false)
        }
      } catch (e) {
        console.error(e)
        if (mounted) {
          setItem(null)
          setLoading(false)
        }
      }
    })()
    return () => {
      mounted = false
    }
  }, [language, langKey])

  const parseDateTimeAttr = (d) => {
    if (!d) return ""
    const parsed = new Date(d)
    return isNaN(parsed) ? "" : parsed.toISOString().split("T")[0]
  }

  // Show shimmer while loading
  if (loading) {
    return (
      <SkeletonBannerWrap>
        <SkeletonBannerInner>
          <SkeletonContent>
            <SkeletonDate />
            <div><SkeletonBadge /></div>
            <SkeletonTitle />
          </SkeletonContent>
        </SkeletonBannerInner>
      </SkeletonBannerWrap>
    )
  }

  if (!item) return null

  return (
    <BannerWrap 
      as="section" 
      role="region" 
      aria-labelledby="banner-title"
    >
      <h2 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Top Story Banner
      </h2>
      <BannerInner as="article" role="article" aria-labelledby="banner-title" onClick={() => navigate(`/newsdetails/${item.id}`)} style={{ cursor: 'pointer' }}>
          <BannerImage src={item.imageSrc} alt={item.title} loading="lazy" />
        <Overlay aria-hidden="true" />
        <Content>
          <DateText as="time" dateTime={parseDateTimeAttr(item.date)}>
            {formatDate(item.date)}
          </DateText>
          {/* <div>{item.badge ? <Badge aria-label={`Story category: ${item.badge}`}>{item.badge}</Badge> : null}</div> */}
          <Title id="banner-title" as="h3">{item.title.slice(0, 50)}...</Title>
        </Content>
        {/* Full-area link for accessibility */}
        {/* <LinkArea
          href={href}
          aria-label={`Read full story: ${title}`}
          tabIndex="0"
        /> */}
      </BannerInner>
    </BannerWrap>
  )
}
