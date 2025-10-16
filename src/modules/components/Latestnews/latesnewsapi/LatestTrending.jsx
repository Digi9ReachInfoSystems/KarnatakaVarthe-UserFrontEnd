import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Container,
  NewsCard,
  NewsImageWrapper,
  ContentWrapper,
  LeftColumn,
  RightColumn,
  TrendingTag,
  NewsTitle,
  AuthorInfo,
  AuthorAvatar,
  AuthorName,
  PublishTime,
  NewsMeta,
  ReadMoreButton,
  ShimmerImage,
  ShimmerTitle,
  ShimmerText,
  ShimmerButton,
  ShimmerAuthorInfo,
  ShimmerMetaInfo,
} from "./LatestTrending.styles"
import { LanguageContext } from "../../../../context/LanguageContext"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { getLatestNews } from "../../../../services/newsApi/NewsApi"
import { Helmet } from "react-helmet"
import LoginPopup from "../../loginpopup/LoginPopup"

const LatestTrending = () => {
  const [latestNews, setLatestNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const userId = Cookies.get("userId")
    return !!userId
  }

  const handleNewsClick = (newsId) => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    
    // If logged in, navigate to news page
    navigate(`/newsdetails/${newsId}`)
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const handleLoginRedirect = () => {
    // Store current page URL in cookie for redirect after login
    const currentUrl = window.location.pathname + window.location.search
    Cookies.set("redirectUrl", currentUrl, { expires: 1 }) // Expires in 1 day
    closeLoginPopup()
    navigate('/login')
  }

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const result = await getLatestNews()
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setLatestNews(result.data[0]) // Display only the first latest news item
        } else {
          setLatestNews(null)
        }
      } catch (error) {
        setLatestNews(null)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000) // Simulate network delay for shimmer effect
      }
    }
    fetchNews()
  }, [])

  const getLocalizedContent = (item, field) => {
    if (!item) return ""
    if (language === "English") {
      return item.English?.[field] || item[field] || "No content available"
    } else if (language === "Hindi") {
      return item.hindi?.[field] || item[field] || "No content available"
    } else if (language === "Kannada") {
      return item.kannada?.[field] || item[field] || "No content available"
    }
    return item[field] || "No content available"
  }

  const getLocalizedCategory = (category) => {
    if (!category) return "General"
    if (language === "English") {
      return category.name || "General"
    } else if (language === "Hindi") {
      return category.hindi || category.name || "General"
    } else if (language === "Kannada") {
      return category.kannada || category.name || "General"
    }
    return category.name || "General"
  }

  // Helper function to format date
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

  // Modified getTimeAgo to always return the formatted date string
  const getTimeAgo = (dateString) => {
    return formatDate(dateString)
  }

  const getAuthorInitials = (authorName) => {
    if (!authorName) return "A"
    return authorName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading || !latestNews) {
    return (
      
      
      <Container style={{ fontSize: `${fontSize}%` }}>
        <NewsCard>
          <ShimmerImage />
          <ContentWrapper>
            <LeftColumn>
              <TrendingTag>#1 on Trending</TrendingTag>
              <ShimmerTitle />
              <AuthorInfo>
                <ShimmerAuthorInfo />
              </AuthorInfo>
              <NewsMeta>
                <ShimmerMetaInfo />
                <ShimmerMetaInfo style={{ width: "60%" }} />
              </NewsMeta>
            </LeftColumn>
            <RightColumn>
              <ShimmerText />
              <ShimmerText style={{ width: "80%" }} />
              <ShimmerButton />
            </RightColumn>
          </ContentWrapper>
        </NewsCard>
      </Container>
    )
  }

  return (
     <>
    {latestNews && (
      <Helmet>
        <title>{getLocalizedContent(latestNews, "title")} | Karnataka Varthe</title>
        <meta name="description" content={getLocalizedContent(latestNews, "description").slice(0, 160)} />
        <meta property="og:title" content={getLocalizedContent(latestNews, "title")} />
        <meta property="og:description" content={getLocalizedContent(latestNews, "description").slice(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={latestNews.newsImage || "/placeholder.svg?height=400&width=800&query=trending news"} />
        <meta property="og:url" content={window.location.href} />
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getLocalizedContent(latestNews, "title")} />
        <meta name="twitter:description" content={getLocalizedContent(latestNews, "description").slice(0, 160)} />
        <meta name="twitter:image" content={latestNews.newsImage || "/placeholder.svg?height=400&width=800&query=trending news"} /> */}
      </Helmet>
    )}

    <Container style={{ fontSize: `${fontSize}%` }}>
      <NewsCard>
        <NewsImageWrapper>
          <img
            src={latestNews.newsImage || "/placeholder.svg?height=400&width=800&query=trending news"}
            alt={getLocalizedContent(latestNews, "title")}
          />
        </NewsImageWrapper>
        <ContentWrapper>
          <LeftColumn>
            <TrendingTag>#1 on Trending</TrendingTag>
            <NewsTitle style={{ fontSize: `${fontSize}%` }}>{getLocalizedContent(latestNews, "title")}</NewsTitle>
            <AuthorInfo>
              <AuthorAvatar>{getAuthorInitials(latestNews.author || "AthleteAdmirer")}</AuthorAvatar>
              <AuthorName style={{ fontSize: `${fontSize}%` }}>{latestNews.author || "AthleteAdmirer"}</AuthorName>
              <PublishTime style={{ fontSize: `${fontSize}%` }}>
                • {getTimeAgo(latestNews.createdTime || latestNews.publishedAt)}
              </PublishTime>
            </AuthorInfo>
            <NewsMeta style={{ fontSize: `${fontSize}%` }}>
              <span>{getLocalizedCategory(latestNews.category)}</span>
            </NewsMeta>
          </LeftColumn>
          <RightColumn>
            <p style={{ fontSize: `${fontSize}%` }}>
              {getLocalizedContent(latestNews, "description").substring(0, 200)}...
            </p>
            <ReadMoreButton onClick={() => handleNewsClick(latestNews._id)}>
              Read Full Articles
            </ReadMoreButton>
          </RightColumn>
        </ContentWrapper>
      </NewsCard>
      
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={handleLoginRedirect} 
        onCloseOnly={closeLoginPopup}
        title="Access News?"
        subtitle="Login to read this news article."
      />
    </Container>
    </>
  )
}

export default LatestTrending
