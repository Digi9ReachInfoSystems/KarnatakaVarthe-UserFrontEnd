import React, { useContext, useState, useEffect, useRef, useCallback } from "react"
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
} from "../latest/Tabsection.styles"
import { fetchDistrictNewsBySlug } from "../../../../../../services/newapis/newapis-services"
import { LanguageContext } from "../../../../../../context/LanguageContext"
import LoadMoreSpinner from "../../../../common/LoadMoreSpinner/LoadMoreSpinner"
import { useNavigate } from "react-router-dom"

const sectionTitleText = {
  English: "Older News",
  Kannada: "ಹಳೆಯ ಸುದ್ದಿ",
  Hindi: "पुरानी खबरें",
}

function pickOlderFromPage1(sortedNews) {
  const newsAfterHeroAndFeatured = sortedNews.slice(6)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const latestNews = newsAfterHeroAndFeatured.filter((item) => {
    const itemDate = new Date(item.publishedAt?.$date || item.publishedAt || 0)
    return itemDate >= sevenDaysAgo
  })

  return latestNews.length >= 5
    ? newsAfterHeroAndFeatured.filter((item) => {
        const itemDate = new Date(
          item.publishedAt?.$date || item.publishedAt || 0
        )
        return itemDate < sevenDaysAgo
      })
    : newsAfterHeroAndFeatured.slice(10)
}

export default function OlderNewsSection({ districtSlug, dateFilter = null }) {
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
  const hideForDateFilter = Boolean(cleanDate)

  useEffect(() => {
    if (hideForDateFilter) {
      setRawNews([])
      setHasNextPage(false)
      setLoading(false)
      return
    }

    let cancelled = false
    const fetchNews = async () => {
      if (!districtSlug) {
        setRawNews([])
        setLoading(true)
        return
      }

      setLoading(true)
      setPage(1)
      setHasNextPage(false)
      try {
        const response = await fetchDistrictNewsBySlug(districtSlug, 1, {
          date: cleanDate,
        })
        if (cancelled) return
        const newsData = Array.isArray(response?.data?.news)
          ? response.data.news
          : []
        const sortedNews = [...newsData].sort((a, b) => {
          const dateA = new Date(a.publishedAt?.$date || a.publishedAt || 0)
          const dateB = new Date(b.publishedAt?.$date || b.publishedAt || 0)
          return dateB - dateA
        })
        setRawNews(pickOlderFromPage1(sortedNews))
        setHasNextPage(Boolean(response?.pagination?.hasNextPage))
        setPage(1)
      } catch (error) {
        console.error("Error fetching district news:", error)
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
  }, [language, districtSlug, dateFilter, cleanDate, hideForDateFilter])

  const loadMore = useCallback(async () => {
    if (
      hideForDateFilter ||
      loadingMoreRef.current ||
      !hasNextPage ||
      loading ||
      !districtSlug
    ) {
      return
    }
    loadingMoreRef.current = true
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const response = await fetchDistrictNewsBySlug(districtSlug, nextPage, {
        date: cleanDate,
      })
      const list = Array.isArray(response?.data?.news) ? response.data.news : []
      if (response?.success && list.length > 0) {
        setRawNews((prev) => [...prev, ...list])
        setHasNextPage(Boolean(response.pagination?.hasNextPage))
        setPage(nextPage)
      } else {
        setHasNextPage(false)
      }
    } catch (error) {
      console.error("Error loading more district news:", error)
    } finally {
      loadingMoreRef.current = false
      setLoadingMore(false)
    }
  }, [
    hideForDateFilter,
    hasNextPage,
    loading,
    page,
    districtSlug,
    cleanDate,
  ])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || loading || hideForDateFilter) return

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
  }, [loadMore, loading, hasNextPage, hideForDateFilter])

  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"

      const localized = rawNews.map((item) => {
        const normalizedId = item._id?.$oid || item._id || item.id
        return {
          _id: String(normalizedId),
          id: String(normalizedId),
          title:
            item[langKey]?.title?.slice(0, 50) + "..." ||
            item.title?.slice(0, 50) + "..." ||
            "",
          excerpt:
            item[langKey]?.description?.slice(0, 150) + "..." ||
            item.description?.slice(0, 150) + "..." ||
            "",
          date: item.publishedAt
            ? new Date(
                item.publishedAt.$date || item.publishedAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          image: item.newsImage || "/placeholder.svg",
          alt: item.title || "",
        }
      })

      setNews(localized)
    } else {
      setNews([])
    }
  }, [language, rawNews])

  const parseDateTimeAttr = (dateStr) => {
    try {
      return new Date(dateStr).toISOString().split("T")[0]
    } catch {
      return ""
    }
  }

  if (hideForDateFilter) {
    return null
  }

  if (loading) {
    return (
      <Section aria-labelledby="older-news-heading">
        <Container>
          <h2 id="older-news-heading" style={{ position: "absolute", left: "-9999px" }}>
            {sectionTitleText[language] || "Older News"}
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
            <Sidebar aria-label="Older headlines">
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

  if (news.length === 0 && !hasNextPage) {
    return null
  }

  const bigCardNews = news.slice(0, 4)
  const allSmallCardNews = news.slice(4)

  return (
    <Section as="section" aria-labelledby="older-news-heading" role="region">
      <Container>
        <h2
          id="older-news-heading"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          {sectionTitleText[language] || "Older News"}
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
                      onClick={() => navigate(`/districtnewsdetails/${p._id}`)}
                      style={{ cursor: "pointer" }}
                    />
                  </ImageWrap>
                  <Content>
                    <DateText as="time" dateTime={parseDateTimeAttr(p.date)}>
                      {p.date}
                    </DateText>
                    <Title id={`card-title-${p.id}`} as="h3">
                      {p.title}
                    </Title>
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
              style={{
                position: "absolute",
                left: "-9999px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              More Older News
            </h3>
            <SideList role="list" aria-busy={loadingMore}>
              {allSmallCardNews.map((item) => (
                <SideItem
                  key={item.id}
                  role="listitem"
                  tabIndex="0"
                  aria-labelledby={`small-card-${item.id}`}
                  onClick={() => navigate(`/districtnewsdetails/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <SideDate as="time" dateTime={parseDateTimeAttr(item.date)}>
                    {item.date}
                  </SideDate>
                  <SideTitle id={`small-card-${item.id}`} as="h4">
                    {item.title}
                  </SideTitle>
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
