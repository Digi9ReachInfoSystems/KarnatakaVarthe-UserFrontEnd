
import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Container,
  MainContentWrapper,
  SidebarWrapper,
  NewsCardWrapper,
  NewsImageWrapper,
  NewsContentWrapper,
  NewsHeaderWrapper,
  NewsTitleWrapper,
  NewsTextWrapper,
  TrendingTagWrapper,
  NewsMetaWrapper,
  IconWrapper,
  ShimmerWrapper,
  ShimmerImage,
  ShimmerLine,
  ShimmerTitle,
  ShimmerText,
  SidebarTitle,
  RelatedArticleCard,
  RelatedArticleImage,
  RelatedArticleContent,
  RelatedArticleTitle,
  RelatedArticleMeta,
  PlayButton,
} from "./LatestCat.styles"
import { FaRegHeart, FaHeart, FaRegComment, FaPaperPlane, FaPlay, FaPause } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { getNewsByid, likeNews } from "../../../services/newsApi/NewsApi"
import { getRecommendations } from "../../../services/recommened/RecommenedApis"
import ComMents from "../comments/ComMents"
import AddComments from "../comments/AddComments"
import { FontSizeContext } from "../../../context/FontSizeProvider"
import { LanguageContext } from "../../../context/LanguageContext"
import { logReadingHistory } from "../../../services/recommened/RecommenedApis"
import { Helmet } from "react-helmet"

const LatestCat = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarLoading, setSidebarLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const userId = Cookies.get("userId")
  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const result = await getNewsByid(id)
        if (result.success && result.data) {
          setNews(result.data)
        } else {
          setNews(null)
        }
      } catch (error) {
        setNews(null)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [id])

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      if (!userId) {
        setSidebarLoading(false)
        return
      }
      try {
        setSidebarLoading(true)
        const result = await getRecommendations(userId)
        if (result && Array.isArray(result.news) && result.news.length > 0) {
          const filtered = result.news.filter((article) => article._id !== id).slice(0, 3)
          setRelatedArticles(filtered)
        } else if (result && Array.isArray(result) && result.length > 0) {
          const filtered = result.filter((article) => article._id !== id).slice(0, 3)
          setRelatedArticles(filtered)
        } else {
          setRelatedArticles([])
        }
      } catch (error) {
        setRelatedArticles([])
      } finally {
        setSidebarLoading(false)
      }
    }
    fetchRelatedArticles()
  }, [id, userId])

  const toggleComments = () => {
    setShowComments((prev) => !prev)
  }

  const handleLikeNews = async () => {
    if (!userId) {
      alert("You must be logged in to like this news.")
      return
    }
    try {
      const response = await likeNews({ newsId: news._id, userId })
      if (response.success) {
        setNews((prevNews) => {
          const newLikedBy = prevNews.likedBy.includes(userId)
            ? prevNews.likedBy.filter((id) => id !== userId)
            : [...prevNews.likedBy, userId]
          localStorage.setItem(`likedNews_${news._id}`, JSON.stringify(newLikedBy))
          return { ...prevNews, likedBy: newLikedBy }
        })
      }
    } catch (error) {
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date"
    const date = new Date(dateString)
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return formatDate(dateString)
  }

  useEffect(() => {
    if (news && userId) {
      const likedNews = JSON.parse(localStorage.getItem(`likedNews_${news._id}`) || "[]")
      if (likedNews && likedNews.includes(userId)) {
        setNews((prevNews) => ({
          ...prevNews,
          likedBy: likedNews,
        }))
      }
    }
  }, [news, userId])

  useEffect(() => {
    if (news && userId) {
      const historyData = {
        userId,
        contentId: news._id,
        contentType: "news",
      }
      logReadingHistory(historyData)
    }
  }, [news, userId])

  const getLocalizedContent = (news, field) => {
    if (!news) return "Loading..."
    if (language === "English") {
      return news[field] || "No content available"
    } else if (language === "Hindi") {
      return news.hindi?.[field] || news[field] || "No content available"
    } else if (language === "Kannada") {
      return news.kannada?.[field] || news[field] || "No content available"
    }
    return news[field] || "No content available"
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  if (loading || !news) {
    return (
      <Container role="region" aria-label="Loading news article">
        <MainContentWrapper>
          <NewsCardWrapper>
            <ShimmerWrapper aria-hidden="true">
              <ShimmerImage />
              <ShimmerLine />
              <ShimmerTitle />
              <ShimmerText />
              <ShimmerText />
              <ShimmerText />
            </ShimmerWrapper>
          </NewsCardWrapper>
        </MainContentWrapper>
        <SidebarWrapper>
          <SidebarTitle>Related Articles</SidebarTitle>
          {[1, 2, 3, 4].map((i) => (
            <RelatedArticleCard key={i} aria-hidden="true">
              <ShimmerImage style={{ height: "120px", marginBottom: "10px" }} />
              <ShimmerTitle style={{ height: "20px", marginBottom: "8px" }} />
              <ShimmerText style={{ height: "15px", width: "60%" }} />
            </RelatedArticleCard>
          ))}
        </SidebarWrapper>
      </Container>
    )
  }

  const audioSrc = getLocalizedContent(news, "audio_description")

  return (
    <>
      <Helmet>
      <title>{getLocalizedContent(news, "title")} | Karnataka Varthe</title>
      <meta name="description" content={getLocalizedContent(news, "description")?.slice(0, 150)} />
      <meta property="og:title" content={getLocalizedContent(news, "title")} />
      <meta property="og:description" content={getLocalizedContent(news, "description")?.slice(0, 150)} />
      <meta property="og:image" content={news.newsImage || "/default-news-thumbnail.jpg"} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getLocalizedContent(news, "title")} />
      <meta name="twitter:description" content={getLocalizedContent(news, "description")?.slice(0, 150)} />
      <meta name="twitter:image" content={news.newsImage || "/default-news-thumbnail.jpg"} /> */}
    </Helmet>

   
    <Container role="main" aria-label="News article">
      <MainContentWrapper>
        <NewsCardWrapper key={news._id} role="article">
          <NewsImageWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
            <img
              src={news.newsImage || "/placeholder.svg?height=400&width=800&query=news article image"}
              alt={getLocalizedContent(news, "title")}
            />
          </NewsImageWrapper>
          <NewsContentWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
            <NewsHeaderWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
              <span>
                {news.author || "Unknown Author"} • {news.category?.name || "General"}
              </span>
              {audioSrc && (
                <>
                  <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnded} />
                  <PlayButton 
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                    tabIndex="0"
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handlePlayPause()
                      }
                    }}
                  >
                    {isPlaying ? <FaPause size={16} aria-hidden="true" /> : <FaPlay size={16} aria-hidden="true" />}
                  </PlayButton>
                </>
              )}
            </NewsHeaderWrapper>
            <NewsTitleWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
              {getLocalizedContent(news, "title")}
            </NewsTitleWrapper>
            <IconWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} role="group" aria-label="Article actions">
              {news.likedBy.includes(userId) ? (
                <FaHeart 
                  onClick={handleLikeNews} 
                  style={{ cursor: "pointer", color: "red" }}
                  aria-label="Unlike this article"
                  tabIndex="0"
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLikeNews()
                    }
                  }}
                />
              ) : (
                <FaRegHeart 
                  onClick={handleLikeNews} 
                  style={{ cursor: "pointer" }}
                  aria-label="Like this article"
                  tabIndex="0"
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLikeNews()
                    }
                  }}
                />
              )}
              <FaRegComment 
                onClick={toggleComments} 
                style={{ cursor: "pointer" }}
                aria-label="Show comments"
                aria-expanded={showComments}
                tabIndex="0"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleComments()
                  }
                }}
              />
              <FaPaperPlane 
                aria-label="Share article"
                tabIndex="0"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    // Handle share functionality
                  }
                }}
              />
            </IconWrapper>
            <AnimatePresence style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  role="region"
                  aria-label="Comments section"
                >
                  <ComMents
                    style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
                    comments={news.comments || []}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <AddComments newsId={news?._id || id} />
            <NewsMetaWrapper>
              {news.isTrending && (
                <TrendingTagWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                  Trending
                </TrendingTagWrapper>
              )}
              <span style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                {formatDate(news.createdTime)} • {news.readTime}
              </span>
            </NewsMetaWrapper>
            <NewsTextWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
              {getLocalizedContent(news, "description")}
            </NewsTextWrapper>
          </NewsContentWrapper>
        </NewsCardWrapper>
      </MainContentWrapper>
      <SidebarWrapper role="complementary" aria-label="Related articles">
        <SidebarTitle style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
          Related Articles
        </SidebarTitle>
        {sidebarLoading ? (
          [1, 2, 3, 4].map((i) => (
            <RelatedArticleCard key={i} aria-hidden="true">
              <ShimmerImage style={{ height: "120px", marginBottom: "10px" }} />
              <ShimmerTitle style={{ height: "20px", marginBottom: "8px" }} />
              <ShimmerText style={{ height: "15px", width: "60%" }} />
            </RelatedArticleCard>
          ))
        ) : relatedArticles.length > 0 ? (
          <div role="list" aria-label="Related articles list">
            {relatedArticles.map((article) => (
              <RelatedArticleCard key={article._id} role="listitem">
                <RelatedArticleImage
                  src={article.newsImage || "/placeholder.svg?height=120&width=200&query=related article thumbnail"}
                  alt={getLocalizedContent(article, "title")}
                />
                <RelatedArticleContent>
                  <RelatedArticleTitle style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    {getLocalizedContent(article, "title")}
                  </RelatedArticleTitle>
                  <RelatedArticleMeta style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    {article.author || "Unknown Author"} • {getTimeAgo(article.createdTime)}
                  </RelatedArticleMeta>
                </RelatedArticleContent>
              </RelatedArticleCard>
            ))}
          </div>
        ) : (
          <div style={{ padding: "1rem", textAlign: "center", color: "#888" }} role="status" aria-live="polite">
            No related articles found.
          </div>
        )}
      </SidebarWrapper>
    </Container>
     </>
  )
}

export default LatestCat;
