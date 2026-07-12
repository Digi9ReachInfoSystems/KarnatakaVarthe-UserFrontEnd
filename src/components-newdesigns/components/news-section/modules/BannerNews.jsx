import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import { fetchAllLatestNewsPage } from "../../../../services/newapis/newapis-services";
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
import EmptyState from "../../districtnews/modules/DateFilter/EmptyState"
export default function Banner({ dateFilter = null }) {
  const { language } = useContext(LanguageContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const langKey = language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
  const navigate = useNavigate()
  useEffect(() => {
    let mounted = true
    ;(async () => {
      console.log('🔍 Banner - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      try {
        setLoading(true)
        // Ensure dateFilter is string or null
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 Banner - Clean dateFilter:', cleanDateFilter)
        const res = await fetchAllLatestNewsPage(1, { date: cleanDateFilter })
        console.log('✅ Banner - API response:', res)
        if (!mounted || !res?.success || !Array.isArray(res.data) || res.data.length === 0) {
          console.warn('⚠️ Banner - No data or invalid format')
          if (mounted) {
            setItem(null)
            setLoading(false)
          }
          return
        }

        console.log('📰 Banner - News count:', res.data.length)
        const newsData = res.data

        // pick most-recent by publishedAt (fallback to createdAt)
        const latest = newsData.reduce((best, cur) => {
          const bDate = best?.publishedAt?.$date || best?.publishedAt || best?.createdAt?.$date || best?.createdAt || 0
          const cDate = cur?.publishedAt?.$date || cur?.publishedAt || cur?.createdAt?.$date || cur?.createdAt || 0
          const b = new Date(bDate)
          const c = new Date(cDate)
          return c > b ? cur : best
        }, newsData[0])

        if (!latest) {
          console.warn('⚠️ Banner - No latest news found')
          if (mounted) {
            setItem(null)
            setLoading(false)
          }
          return
        }
        
        console.log('✅ Banner - Latest news selected:', latest)
        const title = latest[langKey]?.title ?? latest.title ?? ""
        const excerpt = latest[langKey]?.description ?? latest.description ?? ""
        const imageSrc = latest.newsImage ?? "/placeholder.svg"
        const date = latest.publishedAt?.$date || latest.publishedAt || latest.createdAt?.$date || latest.createdAt || ""
        const id = latest._id?.$oid || latest._id || latest.id || ""

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
          console.log('✅ Banner - Setting item:', { title, id })
          setItem({ title, excerpt, imageSrc, date, badge, href, id })
          setLoading(false)
        }
      } catch (e) {
        console.error('❌ Banner - Error:', e)
        if (mounted) {
          setItem(null)
          setLoading(false)
        }
      }
    })()
    return () => {
      mounted = false
    }
  }, [language, langKey, dateFilter])

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

  // Show empty state when no data available (after loading)
  if (!loading && !item) {
    return <EmptyState />
  }

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
