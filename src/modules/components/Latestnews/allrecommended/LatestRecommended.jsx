import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { Pagination } from "@mui/material"
import {
  Container,
  Title,
  NewsGrid,
  FeaturedNewsCard,
  StandardNewsCard,
  NewsImage,
  NewsContent,
  NewsCategory,
  NewsTitle,
  NewsText,
  ReadMore,
  NewsMeta,
  ReadTime,
  MostReadSection,
  MostReadTitle,
  MostReadList,
  MostReadItem,
  MostReadNumber,
  MostReadContent,
  MostReadCategory,
  MostReadHeadline,
  MostReadTime,
  SectionDivider,
  NewsRow,
  PaginationWrapper,
  SkeletonNewsCard,
  SkeletonImage,
  SkeletonTitle,
  SkeletonText,
  SkeletonMeta,
} from "../allrecommended/LatestRecommended.styles"
import { trackClick } from "../../../../services/newsApi/NewsApi"
import { NewsApi } from "../../../../services/categoryapi/CategoryApi"
import { FontSizeContext } from "../../../../context/FontSizeProvider"
import { LanguageContext } from "../../../../context/LanguageContext"

const LatestNewsRecommended = () => {
  const [newsData, setNewsData] = useState([])
  const [mostReadNews, setMostReadNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryNews, setCategoryNews] = useState([])
  const [error, setError] = useState(null)
  const itemsPerPage = 4
  const navigate = useNavigate()
  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await NewsApi(null)
        
        if (response?.data && Array.isArray(response.data)) {
          const sortedNews = response.data.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))

          setNewsData(sortedNews.slice(0, 5))
          setMostReadNews(sortedNews.slice(5, 9))
          setCategoryNews(sortedNews.slice(9, 17))
        } else {
          setError("No news data available")
          setNewsData([])
          setMostReadNews([])
          setCategoryNews([])
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to load news. Please try again later.")
        setNewsData([])
        setMostReadNews([])
        setCategoryNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleReadMore = async (newsId) => {
    const userId = Cookies.get("userId")
    try {
      if (userId) {
        await trackClick({ newsId, userId })
      }
      navigate(`/news/${newsId}`)
    } catch (err) {
      console.error("Error registering click:", err)
      navigate(`/news/${newsId}`)
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

  const getLocalizedContent = (news, field) => {
    if (language === "English") {
      return news[field] || "No content available"
    } else if (language === "Hindi") {
      return news.hindi?.[field] || news[field] || "No content available"
    } else if (language === "Kannada") {
      return news.kannada?.[field] || news[field] || "No content available"
    }
    return news[field] || "No content available"
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategoryItems = categoryNews.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
    document.getElementById("category-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const renderSkeletonFeatured = () => (
    <SkeletonNewsCard isFeatured>
      <SkeletonImage height="400px" />
      <NewsContent>
        <SkeletonTitle width="30%" />
        <SkeletonTitle width="80%" height="32px" />
        <SkeletonMeta />
        <SkeletonText count={3} />
        <SkeletonText width="20%" />
      </NewsContent>
    </SkeletonNewsCard>
  )

  const renderSkeletonStandard = (count) =>
    Array(count)
      .fill(0)
      .map((_, index) => (
        <SkeletonNewsCard key={`skeleton-${index}`}>
          <SkeletonImage height="200px" />
          <NewsContent>
            <SkeletonTitle width="30%" />
            <SkeletonTitle width="90%" />
            <SkeletonMeta />
            <SkeletonText width="20%" />
          </NewsContent>
        </SkeletonNewsCard>
      ))

  const renderSkeletonMostRead = () =>
    Array(4)
      .fill(0)
      .map((_, index) => (
        <MostReadItem key={`skeleton-most-read-${index}`}>
          <MostReadNumber>{index + 1}</MostReadNumber>
          <MostReadContent>
            <SkeletonTitle width="30%" />
            <SkeletonTitle width="90%" />
            <SkeletonMeta />
          </MostReadContent>
        </MostReadItem>
      ))

  const featuredNews = newsData.length > 0 ? newsData[0] : null
  const standardNews = newsData.length > 1 ? newsData.slice(1) : []

  if (error) {
    return (
      <Container role="region" aria-label="News error message">
        <div style={{ color: "red", textAlign: "center", padding: "20px" }} role="status" aria-live="polite">
          {error}
        </div>
      </Container>
    )
  }

  return (
    <Container style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} role="region" aria-label="Latest recommended news">
      <div className="main-content">
        {loading ? (
          renderSkeletonFeatured()
        ) : featuredNews ? (
          <FeaturedNewsCard role="article">
            <NewsImage
              src={featuredNews.newsImage || "https://via.placeholder.com/800x450"}
              alt={getLocalizedContent(featuredNews, "title")}
            />
            <NewsContent>
              <NewsCategory>{featuredNews.category?.name || "POLITICS"}</NewsCategory>
              <NewsTitle>{getLocalizedContent(featuredNews, "title")}</NewsTitle>
              <NewsMeta>
                <span>{formatDate(featuredNews.createdTime)}</span>
                <ReadTime>{featuredNews.readTime || "4 MIN READ"}</ReadTime>
              </NewsMeta>
              <NewsText>{getLocalizedContent(featuredNews, "description")}</NewsText>
              <ReadMore 
                onClick={() => handleReadMore(featuredNews._id)}
                tabIndex="0"
                role="button"
                aria-label={`Read more about ${getLocalizedContent(featuredNews, "title")}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleReadMore(featuredNews._id);
                  }
                }}
              >
                Read more
              </ReadMore>
            </NewsContent>
          </FeaturedNewsCard>
        ) : null}

        <NewsGrid role="list" aria-label="Featured news list">
          {loading
            ? renderSkeletonStandard(4)
            : standardNews.map((news) => (
                <StandardNewsCard key={news._id} role="listitem" tabIndex="0" aria-label={getLocalizedContent(news, "title")}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleReadMore(news._id);
                    }
                  }}
                  onClick={() => handleReadMore(news._id)}
                >
                  <NewsImage
                    src={news.newsImage || "https://via.placeholder.com/400x225"}
                    alt={getLocalizedContent(news, "title")}
                  />
                  <NewsContent>
                    <NewsCategory>{news.category?.name || "Latest News"}</NewsCategory>
                    <NewsTitle>{getLocalizedContent(news, "title")}</NewsTitle>
                    <NewsMeta>
                      <span>{formatDate(news.createdTime)}</span>
                      <ReadTime>{news.readTime || "5 MIN READ"}</ReadTime>
                    </NewsMeta>
                    <ReadMore 
                      onClick={e => {e.stopPropagation(); handleReadMore(news._id);}}
                      tabIndex="0"
                      role="button"
                      aria-label={`Read more about ${getLocalizedContent(news, "title")}`}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleReadMore(news._id);
                        }
                      }}
                    >
                      Read more
                    </ReadMore>
                  </NewsContent>
                </StandardNewsCard>
              ))}
        </NewsGrid>
      </div>

      <MostReadSection role="region" aria-label="Most read news">
        <MostReadTitle>MOST READ</MostReadTitle>
        <MostReadList role="list" aria-label="Most read articles">
          {loading
            ? renderSkeletonMostRead()
            : mostReadNews.length > 0
            ? mostReadNews.map((news, index) => (
                <MostReadItem key={news._id} role="listitem" tabIndex="0" aria-label={getLocalizedContent(news, "title")}
                  onClick={() => handleReadMore(news._id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleReadMore(news._id);
                    }
                  }}
                >
                  <MostReadNumber>{index + 1}</MostReadNumber>
                  <MostReadContent>
                    <MostReadCategory>{news.category?.name || "POLITICS"}</MostReadCategory>
                    <MostReadHeadline>{getLocalizedContent(news, "title")}</MostReadHeadline>
                    <MostReadTime>{news.readTime || "21 MIN READ"}</MostReadTime>
                  </MostReadContent>
                </MostReadItem>
              ))
            : <div role="status" aria-live="polite">No most read articles available</div>}
        </MostReadList>
      </MostReadSection>

      <SectionDivider />
      <Title id="category-section">Latest News</Title>
      <NewsRow role="list" aria-label="Category news list">
        {loading
          ? renderSkeletonStandard(4)
          : currentCategoryItems.length > 0
          ? currentCategoryItems.map((news) => (
              <StandardNewsCard key={`category-${news._id}`} role="listitem" tabIndex="0" aria-label={getLocalizedContent(news, "title")}
                onClick={() => handleReadMore(news._id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleReadMore(news._id);
                  }
                }}
              >
                <NewsImage
                  src={news.newsImage || "https://via.placeholder.com/400x225"}
                  alt={getLocalizedContent(news, "title")}
                />
                <NewsContent>
                  <NewsCategory>{news.category?.name || "Latest News"}</NewsCategory>
                  <NewsTitle>{getLocalizedContent(news, "title")}</NewsTitle>
                  <NewsMeta>
                    <span>{formatDate(news.createdTime)}</span>
                    <ReadTime>{news.readTime || "5 MIN READ"}</ReadTime>
                  </NewsMeta>
                  <ReadMore 
                    onClick={e => {e.stopPropagation(); handleReadMore(news._id);}}
                    tabIndex="0"
                    role="button"
                    aria-label={`Read more about ${getLocalizedContent(news, "title")}`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleReadMore(news._id);
                      }
                    }}
                  >
                    Read more
                  </ReadMore>
                </NewsContent>
              </StandardNewsCard>
            ))
          : <div role="status" aria-live="polite">No category news available</div>}
      </NewsRow>

      {!loading && categoryNews.length > itemsPerPage && (
        <PaginationWrapper role="navigation" aria-label="Category news pagination">
          <Pagination
            count={Math.ceil(categoryNews.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            variant="outlined"
            shape="rounded"
            aria-label="Category news pages"
          />
        </PaginationWrapper>
      )}
    </Container>
  )
}

export default LatestNewsRecommended