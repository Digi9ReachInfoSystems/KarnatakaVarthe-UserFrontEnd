import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Container,
  Title,
  TabsContainer,
  Tab,
  MainContentWrapper,
  FeaturedNewsCard,
  FeaturedNewsImageOverlay,
  FeaturedNewsContent,
  FeaturedNewsTitle,
  FeaturedNewsMeta,
  FeaturedNewsDescription,
  FeaturedNewsBottomTags,
  FeaturedNewsTag,
  FeaturedNewsReadTime,
  RelatedArticlesWrapper,
  RelatedArticleCard,
  RelatedArticleImage,
  RelatedArticleContent,
  RelatedArticleTitle,
  RelatedArticleMeta,
  PaginationWrapper,
  SkeletonFeaturedNewsCard,
  SkeletonFeaturedImage,
  SkeletonFeaturedTitle,
  SkeletonFeaturedMeta,
  SkeletonFeaturedDescription,
  SkeletonFeaturedBottomTags,
  SkeletonRelatedArticleCard,
  SkeletonRelatedImage,
  SkeletonRelatedTitle,
  SkeletonRelatedMeta,
  SkeletonTab,
} from "./CategoryNews.styles"
import { trackClick } from "../../../../services/newsApi/NewsApi"
import { CategoryApi, NewsApi } from "../../../../services/categoryapi/CategoryApi"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { LanguageContext } from "../../../../context/LanguageContext"
import Pagination from "@mui/material/Pagination"
import { Helmet } from "react-helmet"
import LoginPopup from "../../loginpopup/LoginPopup"

const CategoryNews = () => {
  const [activeTab, setActiveTab] = useState(null)
  const [categories, setCategories] = useState([])
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const itemsPerPage = 5 // 1 featured + 4 related
  const tabsRef = useRef(null)
  const navigate = useNavigate()
  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const userId = Cookies.get("userId")
    return !!userId
  }

  // Scroll tabs left or right
  // const scrollTabs = (direction) => {
  //   if (tabsRef.current) {
  //     const scrollAmount = 200
  //     if (direction === "left") {
  //       tabsRef.current.scrollLeft -= scrollAmount
  //     } else {
  //       tabsRef.current.scrollLeft += scrollAmount
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const response = await CategoryApi()
        if (response?.data && Array.isArray(response.data)) {
          setCategories(response.data)
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          setCategoriesLoading(false)
        }, 800)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await NewsApi(activeTab)
        if (response?.data && Array.isArray(response.data)) {
          setNewsData(response.data)
          setCurrentPage(1) // Reset to first page when changing categories
        } else {
          setNewsData([])
        }
      } catch (error) {
        setNewsData([])
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }
    fetchNews()
  }, [activeTab])

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentNewsSlice = newsData.slice(indexOfFirstItem, indexOfLastItem)

  const featuredNews = currentNewsSlice[0]
  const relatedNews = currentNewsSlice.slice(1)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
    document.getElementById("news-grid")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleReadMore = async (newsId) => {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }

    const userId = Cookies.get("userId")
    try {
      if (userId) {
        await trackClick({ newsId, userId })
      }
      navigate(`/news/${newsId}`)
    } catch (error) {
      navigate(`/news/${newsId}`)
    }
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

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time"
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

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

  const getLocalizedCategoryName = (category) => {
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

  // Render skeleton loaders for tabs
  const renderSkeletonTabs = () =>
    Array(5)
      .fill(0)
      .map((_, index) => <SkeletonTab key={`skeleton-tab-${index}`} aria-hidden="true" />)

  // Render skeleton loaders for news cards
  const renderSkeletonCards = () => (
    <>
      <SkeletonFeaturedNewsCard aria-hidden="true">
        <SkeletonFeaturedImage />
        <FeaturedNewsContent>
          <SkeletonFeaturedTitle width="30%" />
          <SkeletonFeaturedTitle width="90%" />
          <SkeletonFeaturedMeta />
          <SkeletonFeaturedDescription count={3} />
          <SkeletonFeaturedBottomTags />
        </FeaturedNewsContent>
      </SkeletonFeaturedNewsCard>
      <RelatedArticlesWrapper>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonRelatedArticleCard key={`skeleton-related-${index}`} aria-hidden="true">
              <SkeletonRelatedImage />
              <RelatedArticleContent>
                <SkeletonRelatedTitle />
                <SkeletonRelatedMeta />
              </RelatedArticleContent>
            </SkeletonRelatedArticleCard>
          ))}
      </RelatedArticlesWrapper>
    </>
  )

  return (
    <>
    {featuredNews && (
      <Helmet>
  <title>
    {featuredNews
      ? `${getLocalizedContent(featuredNews, "title")} | ${getLocalizedCategoryName(featuredNews.category)} - Karnataka Varthe`
      : "Latest Category News | Karnataka Varthe"}
  </title>
  <meta
    name="description"
    content={
      featuredNews
        ? getLocalizedContent(featuredNews, "description")?.slice(0, 160)
        : "Explore the latest news across categories on Karnataka Varthe."
    }
  />
  <meta property="og:title" content={featuredNews ? getLocalizedContent(featuredNews, "title") : "Category News"} />
  <meta
    property="og:description"
    content={
      featuredNews
        ? getLocalizedContent(featuredNews, "description")?.slice(0, 160)
        : "Browse trending and latest category-wise news updates."
    }
  />
  <meta property="og:type" content="article" />
  <meta
    property="og:image"
    content={featuredNews?.newsImage || "/placeholder.svg?height=400&width=800&query=news thumbnail"}
  />
  <meta property="og:url" content={window.location.href} />
  {/* <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={featuredNews ? getLocalizedContent(featuredNews, "title") : "Category News"} />
  <meta
    name="twitter:description"
    content={
      featuredNews
        ? getLocalizedContent(featuredNews, "description")?.slice(0, 160)
        : "Catch the latest updates from Karnataka Varthe's news categories."
    }
  />
  <meta
    name="twitter:image"
    content={featuredNews?.newsImage || "/placeholder.svg?height=400&width=800&query=news thumbnail"}
  /> */}
</Helmet>

    )}
    <Container
      style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
      role="region"
      aria-label="Category news section"
    >
      <Title style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
        {activeTab ? categories.find((c) => c._id === activeTab)?.name || "Category News" : "Latest All News"}
      </Title>
      <div className="tabs-scroll-container">
        <TabsContainer
          ref={tabsRef}
          style={{
            fontSize: `${fontSize}%`,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          className="hide-scrollbar"
          role="tablist"
          aria-label="News categories"
        >
          {categoriesLoading ? (
            renderSkeletonTabs()
          ) : (
            <>
              <Tab
                key="all"
                active={activeTab === null}
                onClick={() => setActiveTab(null)}
                style={{ fontSize: `${fontSize}%` }}
                role="tab"
                aria-selected={activeTab === null}
                tabIndex={activeTab === null ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActiveTab(null)
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault()
                    const nextTab = e.target.nextElementSibling
                    if (nextTab) nextTab.focus()
                    else tabsRef.current.firstElementChild.focus() // Loop to first
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault()
                    const prevTab = e.target.previousElementSibling
                    if (prevTab) prevTab.focus()
                    else tabsRef.current.lastElementChild.focus() // Loop to last
                  }
                }}
              >
                All
              </Tab>
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  active={activeTab === category._id}
                  onClick={() => setActiveTab(category._id)}
                  style={{ fontSize: `${fontSize}%` }}
                  role="tab"
                  aria-selected={activeTab === category._id}
                  tabIndex={activeTab === category._id ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveTab(category._id)
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault()
                      const nextTab = e.target.nextElementSibling
                      if (nextTab) nextTab.focus()
                      else tabsRef.current.firstElementChild.focus() // Loop to first
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault()
                      const prevTab = e.target.previousElementSibling
                      if (prevTab) prevTab.focus()
                      else tabsRef.current.lastElementChild.focus() // Loop to last
                    }
                  }}
                >
                  {getLocalizedCategoryName(category)}
                </Tab>
              ))}
            </>
          )}
        </TabsContainer>
      </div>
      <MainContentWrapper id="news-grid">
        {loading ? (
          renderSkeletonCards()
        ) : newsData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", gridColumn: "1 / -1" }} role="status" aria-live="polite">
            No articles found
          </div>
        ) : (
          <>
            {featuredNews && (
              <FeaturedNewsCard
                onClick={() => handleReadMore(featuredNews._id)}
                style={{
                  backgroundImage: `url(${featuredNews.newsImage || "/placeholder.svg?height=400&width=800"})`,
                }}
                role="article"
                tabIndex="0"
                aria-label={getLocalizedContent(featuredNews, "title")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleReadMore(featuredNews._id)
                  }
                }}
              >
                <FeaturedNewsImageOverlay aria-hidden="true" />
                <FeaturedNewsContent>
                  <FeaturedNewsTitle style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    {getLocalizedContent(featuredNews, "title")}
                  </FeaturedNewsTitle>
                  <FeaturedNewsMeta style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    <img
                      src="/placeholder.svg?height=16&width=16"
                      alt="Buzznies logo"
                      style={{ width: "16px", height: "16px", marginRight: "4px" }}
                    />
                    <span>Buzznies</span> • <span>{getTimeAgo(featuredNews.createdTime)}</span>
                  </FeaturedNewsMeta>
                  <FeaturedNewsDescription style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                    {getLocalizedContent(featuredNews, "description")}
                  </FeaturedNewsDescription>
                  <FeaturedNewsBottomTags>
                    <FeaturedNewsTag style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                      {getLocalizedCategoryName(featuredNews.category)}
                    </FeaturedNewsTag>
                    <FeaturedNewsReadTime style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                      {featuredNews.readTime || "10 mins read"}
                    </FeaturedNewsReadTime>
                  </FeaturedNewsBottomTags>
                </FeaturedNewsContent>
              </FeaturedNewsCard>
            )}

            <RelatedArticlesWrapper role="list" aria-label="Related articles list">
              {relatedNews.length > 0 ? (
                relatedNews.map((news) => (
                  <RelatedArticleCard
                    key={news._id}
                    onClick={() => handleReadMore(news._id)}
                    role="listitem"
                    tabIndex="0"
                    aria-label={getLocalizedContent(news, "title")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleReadMore(news._id)
                      }
                    }}
                  >
                    <RelatedArticleImage
                      src={news.newsImage || "/placeholder.svg?height=80&width=80&query=related news thumbnail"}
                      alt={getLocalizedContent(news, "title")}
                    />
                    <RelatedArticleContent>
                      <RelatedArticleTitle style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                        {getLocalizedContent(news, "title")}
                      </RelatedArticleTitle>
                      <RelatedArticleMeta style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                        <span>{getTimeAgo(news.createdTime)}</span> • <span>{news.readTime || "3"}</span>
                      </RelatedArticleMeta>
                    </RelatedArticleContent>
                  </RelatedArticleCard>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }} role="status" aria-live="polite">
                  No related articles available
                </div>
              )}
            </RelatedArticlesWrapper>
          </>
        )}
      </MainContentWrapper>

      {!loading && newsData.length > 0 && (
        <PaginationWrapper role="navigation" aria-label="Category news pagination">
                 <Pagination
                   count={Math.ceil(newsData.length / itemsPerPage)}
                   page={currentPage}
                   onChange={handlePageChange}
                   color="primary"
                   size="large"
                   variant="outlined"
                   shape="rounded"
                   aria-label="Category news pages"
                   sx={{ justifyContent: 'flex-end', display: 'flex', width: '100%' }} // Ensure right alignment in MUI
                 />
               </PaginationWrapper>
      )}
      
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

export default CategoryNews
