import React from "react"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import {
  Section,
  Container,
  Layout,
  Grid,
  Card,
  ImageWrap,
  Content,
  DateText,
  Title,
  Excerpt,
  Sidebar,
  SideList,
  SideItem,
  SideDate,
  SideTitle,
  SideExcerpt,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonDate,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonSideItem,
} from "./Tabsection.styles"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { fetchStateNewsListPage } from "../../../../../services/newapis/newapis-services"
import LoadMoreSpinner from "../../../common/LoadMoreSpinner/LoadMoreSpinner"
import { useNavigate } from "react-router-dom"

export default function TabSection({ dateFilter = null }) {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()
  const sentinelRef = useRef(null)
  const loadingMoreRef = useRef(false)

  const cleanDate =
    dateFilter && typeof dateFilter === "string" ? dateFilter : null

  useEffect(() => {
    let cancelled = false

    const fetchNews = async () => {
      console.log('🔍 TabSection - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      setLoading(true)
      setPage(1)
      setHasNextPage(false)
      try {
        console.log('🔍 TabSection - Clean dateFilter:', cleanDate)
        const res = await fetchStateNewsListPage(1, { date: cleanDate })
        console.log('✅ TabSection - API response:', res)
        if (cancelled) return
        if (res?.success && Array.isArray(res.data)) {
          console.log('📰 TabSection - News count:', res.data.length)
          setRawNews(res.data)
          setHasNextPage(Boolean(res.pagination?.hasNextPage))
          setPage(1)
        } else {
          console.warn('⚠️ TabSection - No data or invalid format')
          setRawNews([])
          setHasNextPage(false)
        }
      } catch (error) {
        console.error('❌ TabSection - Error:', error)
        if (!cancelled) {
          setRawNews([])
          setHasNextPage(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchNews()
    return () => {
      cancelled = true
    }
  }, [language, dateFilter, cleanDate])

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasNextPage || loading) return
    loadingMoreRef.current = true
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const res = await fetchStateNewsListPage(nextPage, { date: cleanDate })
      if (res?.success && Array.isArray(res.data)) {
        setRawNews((prev) => [...prev, ...res.data])
        setHasNextPage(Boolean(res.pagination?.hasNextPage))
        setPage(nextPage)
      } else {
        setHasNextPage(false)
      }
    } catch (error) {
      console.error('❌ TabSection - Load more error:', error)
    } finally {
      loadingMoreRef.current = false
      setLoadingMore(false)
    }
  }, [hasNextPage, loading, page, cleanDate])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore, loading, hasNextPage])

  // Transform raw news to localized news
  useEffect(() => {
    if (rawNews.length > 0) {
      console.log('🔄 TabSection - Processing rawNews, count:', rawNews.length)
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"

      const localized = rawNews.map((item) => {
        const newsId = item._id?.$oid || item._id
        const publishedDate = item.publishedAt?.$date || item.publishedAt
        
        return {
        _id: newsId,
        id: newsId,
        title: item[langKey]?.title?.slice(0, 50) + "..." || item.title || "",
        excerpt: item[langKey]?.description?.slice(0, 150) + "..." || item.description || "",
        date: publishedDate
          ? new Date(publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        image: item.newsImage || "/placeholder.svg",
        alt: item.title || "",
      }})
      console.log('✅ TabSection - Localized news, count:', localized.length)
      setNews(localized)
    } else {
      console.log('⚠️ TabSection - No rawNews to process')
      setNews([])
    }
  }, [language, rawNews])

  const bigCardNews = news.slice(0, 4)
  const allSmallCardNews = news

  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <Section aria-labelledby="news-heading">
        <Container>
          <h2 id="news-heading" style={{ position: "absolute", left: "-9999px" }}>
            State News
          </h2>
          <Layout>
            <div>
              <Grid>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i}>
                    <SkeletonImage />
                    <SkeletonContent>
                      <SkeletonDate />
                      <SkeletonTitle />
                      <SkeletonTitle width="70%" />
                      <SkeletonExcerpt />
                      <SkeletonExcerpt width="85%" />
                    </SkeletonContent>
                  </SkeletonCard>
                ))}
              </Grid>
            </div>
            <Sidebar aria-label="Latest headlines">
              <SideList>
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonSideItem key={i}>
                    <SkeletonDate />
                    <SkeletonTitle />
                    <SkeletonTitle width="60%" />
                  </SkeletonSideItem>
                ))}
              </SideList>
            </Sidebar>
          </Layout>
        </Container>
      </Section>
    )
  }

  return (
    <Section as="section" aria-labelledby="news-heading" role="region">
      <Container>
        <h2 id="news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          State News
        </h2>
        <Layout>
          <div role="main">
            <Grid>
              {bigCardNews.map((p) => (
                <Card
                  key={p.id}
                  as="article"
                  role="article"
                  aria-labelledby={`card-title-${p.id}`}
                  tabIndex="0"
                >
                  <ImageWrap>
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.alt || `Image for ${p.title}`}
                      loading="lazy"
                      onClick={() => navigate(`/newsdetails/${p._id}`)}
                      style={{ cursor: 'pointer' }}
                    />
                  </ImageWrap>
                  <Content>
                    <DateText as="time" dateTime={parseDateTimeAttr(p.date)}>{p.date}</DateText>
                    <Title id={`card-title-${p.id}`} as="h3">{p.title}</Title>
                    <Excerpt>{p.excerpt}</Excerpt>
                  </Content>
                </Card>
              ))}
            </Grid>
          </div>
          <Sidebar
            as="aside"
            role="complementary"
            aria-labelledby="small-news-heading"
          >
            <h3
              id="small-news-heading"
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              More State News
            </h3>
            <SideList role="list" aria-busy={loadingMore}>
              {allSmallCardNews.map((item) => (
                <SideItem
                  key={item.id}
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`small-card-${item.id}`}
                  onClick={() => navigate(`/newsdetails/${item._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <SideDate as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</SideDate>
                  <SideTitle id={`small-card-${item.id}`} as="h4">{item.title}</SideTitle>
                  <SideExcerpt>{item.excerpt}</SideExcerpt>
                </SideItem>
              ))}
            </SideList>
          </Sidebar>
        </Layout>
        {hasNextPage && (
          <div
            ref={sentinelRef}
            aria-hidden="true"
            style={{ height: 1, width: "100%" }}
          />
        )}
        {loadingMore && <LoadMoreSpinner />}
      </Container>
    </Section>
  )
}
