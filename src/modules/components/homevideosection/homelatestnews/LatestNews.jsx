
import { useState, useEffect, useContext } from "react"
import {
  Container,
  Content,
  Title,
  Header,
  VideoThumbnail,
  VideoCard1,
  VideoDetails,
  AuthorInfo,
  AuthorAvatar,
  AuthorName,
  PublishTime,
  HeaderContainer,
  ViewAllButton,
} from "./LatestNews.styles"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { LanguageContext } from "../../../../context/LanguageContext"
import { getLatestNews } from "../../../../services/newsApi/NewsApi"
import { Link, useNavigate } from "react-router-dom"
import { ShimmerCard, ShimmerThumbnail, ShimmerTitle, ShimmerMeta } from "./LatestNews.styles"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import Cookies from "js-cookie"
import LoginPopup from "../../loginpopup/LoginPopup"

// Helper function to get cookies by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

// Helper function to get initials from author name
const getAuthorInitials = (authorName) => {
  if (!authorName) return "A"
  return authorName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const LatestNewsSection = () => {
  const [videosData, setVideosData] = useState([])
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
    navigate(`/news/${newsId}`)
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
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const result = await getLatestNews()
        // result is expected to be { success, data: [...] }
        if (result && Array.isArray(result.data) && result.data.length > 0) {
          setVideosData(result.data)
        } else {
          console.warn("No video data found in response:", result)
          setVideosData([])
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
        setVideosData([])
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }
    fetchVideos()
  }, [language])

  // Function to get the correct language content
  const getLocalizedContent = (video, field) => {
    if (language === "English") {
      return video[field] || "No content available"
    } else if (language === "Hindi") {
      return video.hindi?.[field] || video[field] || "No content available"
    } else if (language === "Kannada") {
      return video.kannada?.[field] || video[field] || "No content available"
    }
    return video[field] || "No content available"
  }

  // Function to get localized category name
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
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return formatDate(dateString)
  }

  const renderSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <ShimmerCard key={index} aria-hidden="true">
        <ShimmerThumbnail />
        <VideoDetails>
          <ShimmerTitle />
          <ShimmerMeta />
        </VideoDetails>
      </ShimmerCard>
    ))
  }

  return (
    <Container 
      style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
      role="region"
      aria-label="Recommended news section"
    >
      <HeaderContainer>
        <Header style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>Most Read Articles</Header>
        <ViewAllButton
          onClick={() => navigate("/latestnews")}
          style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
        >
          View All <MdOutlineKeyboardDoubleArrowRight style={{ fontSize: "1.5rem" }} />
        </ViewAllButton>
      </HeaderContainer>
      <Content role="list" aria-label="Recommended news articles">
        {loading ? (
          renderSkeleton()
        ) : Array.isArray(videosData) && videosData.length > 0 ? (
          videosData.slice(0, 6).map((video) => (
            <VideoCard1 
              key={video._id}
              onClick={() => handleNewsClick(video._id)}
              role="listitem"
              tabIndex="0"
              aria-label={`Read article: ${getLocalizedContent(video, "title")}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleNewsClick(video._id)
                }
              }}
            >
              <VideoThumbnail
                src={video.newsImage || "/placeholder.svg?height=220&width=300&query=news article"}
                alt={getLocalizedContent(video, "title")}
              />
              <VideoDetails>
                <Title style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                  {getLocalizedContent(video, "title")}
                </Title>
                <AuthorInfo>
                  <AuthorAvatar aria-label={`Author: ${video.author || "AthleteAdmirer"}`}>
                    {getAuthorInitials(video.author || "AthleteAdmirer")}
                  </AuthorAvatar>
                  <AuthorName style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    {video.author || "AthleteAdmirer"}
                  </AuthorName>
                  <PublishTime style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    • {getLocalizedCategory(video.category)} • {getTimeAgo(video.createdTime || video.publishedAt)}
                  </PublishTime>
                </AuthorInfo>
              </VideoDetails>
            </VideoCard1>
          ))
        ) : (
          <div 
            style={{ padding: "1rem", textAlign: "center", color: "#888" }} 
            role="status" 
            aria-live="polite"
          >
            No recommended news found.
          </div>
        )}
      </Content>
      
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={handleLoginRedirect} 
        onCloseOnly={closeLoginPopup}
        title="Access News?"
        subtitle="Login to read this news article."
      />
    </Container>
  )
}

export default LatestNewsSection
