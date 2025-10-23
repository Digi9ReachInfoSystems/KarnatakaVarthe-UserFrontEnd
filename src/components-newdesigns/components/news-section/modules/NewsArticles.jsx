import { useEffect, useContext, useState } from "react";
import {
  Container,
  GridLayout,
  FeaturedCard,
  FeaturedImage,
  FeaturedContent,
  FeaturedMeta,
  FeaturedTitle,
  FeaturedExcerpt,
  NewsColumn,
  ColumnHeader,
  NewsList,
  NewsItem,
  NewsItemContent,
  NewsTitle,
  NewsDate,
  NewsAuthor,
  PopularItem,
  PopularThumbnail,
  PopularContent,
  PopularTitle,
  PopularDate,
  SkeletonFeaturedCard,
  SkeletonFeaturedImage,
  SkeletonFeaturedContent,
  SkeletonLine,
  SkeletonNewsItem,
  SkeletonPopularItem,
  SkeletonThumbnail,
} from "./NewsArticles.styles"
import { getLatestNews } from "../../../../services/newsApi/NewsApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import { formatDate } from "../../../../utils/formatters";
import { useNavigate } from "react-router-dom";

const NewsArticles = () => {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const { language } = useContext(LanguageContext)
  const [popularNews, setPopularNews] = useState([])
  const navigate = useNavigate()
  // Parse date for datetime attribute
 useEffect(() => {
  const fetchNews = async () => {
    setLoading(true)
    const response = await getLatestNews()
    if (response?.success && Array.isArray(response.data)) {
      setRawData(response.data)
    }
    setLoading(false)
  }
  fetchNews()
 }, [language])
 // get popular news
 useEffect(() => {
  if (rawData.length > 0) {
    const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      // Sort by most recent date
  const sortedData = [...rawData].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  )
    const mappedData = sortedData.map((item) => ({
      id: item._id,
      title: item[langKey]?.title ? item[langKey].title.slice(0, 100) + "..." : "No title",
      excerpt: item[langKey]?.description ? item[langKey].description.slice(0, 150) + "..." : "No description",
      image: item.newsImage,
      date: item.publishedAt,
      author: item.author || "Unknown",
    }))
    const now = new Date()
    const popular = mappedData.filter(item => {
      const diffHrs = (now - new Date(item.date)) / (1000 * 60 * 60)
      return diffHrs >= 24 && diffHrs <= 72
    })
    setNewsData(mappedData.slice(1))    
       // all except top one
  setLatestNews(mappedData.slice(0, 1))  

  setPopularNews(popular)
  }
 }, [rawData, language])

 
 // parse date for datetime attribute
  
  function parseDateTimeAttr(dateStr) {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }

  // Show shimmer while loading
  if (loading) {
    return (
      <Container as="section" aria-labelledby="news-articles-heading" role="region">
        <h2 
          id="news-articles-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Featured, Latest and Popular News
        </h2>
        
        <GridLayout>
          {/* Featured Card Skeleton */}
          <SkeletonFeaturedCard>
            <SkeletonFeaturedImage />
            <SkeletonFeaturedContent>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <SkeletonLine width="120px" height="14px" />
                <SkeletonLine width="80px" height="14px" />
              </div>
              <SkeletonLine width="90%" height="32px" />
              <SkeletonLine width="100%" height="16px" />
              <SkeletonLine width="100%" height="16px" />
              <SkeletonLine width="60%" height="16px" />
            </SkeletonFeaturedContent>
          </SkeletonFeaturedCard>

          {/* Latest News Skeleton */}
          <NewsColumn>
            <ColumnHeader as="h3">LATEST NEWS</ColumnHeader>
            <NewsList>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonNewsItem key={i}>
                  <SkeletonLine width="100px" height="14px" />
                  <SkeletonLine width="90%" height="20px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="80%" height="14px" />
                </SkeletonNewsItem>
              ))}
            </NewsList>
          </NewsColumn>

          {/* Popular News Skeleton */}
          <NewsColumn>
            <ColumnHeader as="h3">POPULAR NEWS</ColumnHeader>
            <NewsList>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonPopularItem key={i}>
                  <SkeletonThumbnail />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SkeletonLine width="80px" height="14px" />
                    <SkeletonLine width="100%" height="16px" />
                    <SkeletonLine width="90%" height="16px" />
                  </div>
                </SkeletonPopularItem>
              ))}
            </NewsList>
          </NewsColumn>
        </GridLayout>
      </Container>
    )
  }

  return (
    <Container as="section" aria-labelledby="news-articles-heading" role="region">
      <h2 
        id="news-articles-heading" 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Featured, Latest and Popular News
      </h2>
      
      <GridLayout>
        {/* Featured Article - Left Column */}
        {latestNews.length > 0 && latestNews[0] ? (
          <FeaturedCard 
            as="article" 
            role="article" 
            aria-labelledby="featured-article-title"
            tabIndex="0"
          >
            <FeaturedImage>
              <img
                src={latestNews[0].image || "/state/state.jpg"}
                alt={`Featured story: ${latestNews[0].title || 'Latest news'}`}
                loading="lazy"
                style={{ 
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/newsdetails/${latestNews[0].id}`)}
              />
            </FeaturedImage>
            <FeaturedContent>
              <FeaturedMeta>
                <NewsDate as="time" dateTime={parseDateTimeAttr(latestNews[0].date)}>
                  {new Date(latestNews[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </NewsDate>
                <NewsAuthor aria-label={`Author: ${latestNews[0].author || 'Unknown'}`}>
                  {latestNews[0].author || 'Unknown'}
                </NewsAuthor>
              </FeaturedMeta>
              <FeaturedTitle id="featured-article-title" as="h3">
                {latestNews[0].title || 'No title available'}
              </FeaturedTitle>
              <FeaturedExcerpt>
                {latestNews[0].excerpt || 'No description available'}
              </FeaturedExcerpt>
            </FeaturedContent>
          </FeaturedCard>
        ) : (
          <FeaturedCard>
            <p>No news available</p>
          </FeaturedCard>
        )}

        {/* Latest News - Center Column */}
        <NewsColumn as="div" role="region" aria-labelledby="latest-news-heading">
          <ColumnHeader id="latest-news-heading" as="h3">LATEST NEWS</ColumnHeader>
          <NewsList role="feed" aria-label="Latest news articles" aria-busy="false">
            {newsData.map((item, index) => (
              <NewsItem
                key={item.id}
                as="article"
                role="article"
                aria-labelledby={`latest-news-${index}`}
                tabIndex="0"
                onClick={() => navigate(`/newsdetails/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <NewsItemContent>
                  <NewsDate as="time" dateTime={parseDateTimeAttr(item.date)}>
                    {formatDate(item.date)}
                  </NewsDate>
                  <NewsAuthor aria-label={`Author: ${item.author}`}>
                    {item.author}
                  </NewsAuthor>
                  <NewsTitle id={`latest-news-${index}`} as="h4">
                    {item.title}
                  </NewsTitle>
                  <p>{item.excerpt}</p>
                </NewsItemContent>
              </NewsItem>
            ))}
          </NewsList>
        </NewsColumn>

        {/* Popular News - Right Column */}
        <NewsColumn as="div" role="region" aria-labelledby="popular-news-heading">
          <ColumnHeader id="popular-news-heading" as="h3">POPULAR NEWS</ColumnHeader>
          <NewsList role="feed" aria-label="Popular news articles" aria-busy="false">
            {popularNews.map((item, index) => (
              <PopularItem
                key={item.id}
                as="article"
                role="article"
                aria-labelledby={`popular-news-${index}`}
                tabIndex="0"
                onClick={() => navigate(`/newsdetails/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <PopularThumbnail>
                  <img
                    src={item.image || "/state/2ndimage.jpg"}
                    alt={`Thumbnail: ${item.title}`}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: 'pointer'
                    }}
                  />
                </PopularThumbnail>
                <PopularContent>
                  <PopularDate as="time" dateTime={parseDateTimeAttr(item.date)}>
                    {formatDate(item.date)}
                  </PopularDate>
                  <PopularTitle id={`popular-news-${index}`} as="h4">
                    {item.title}
                  </PopularTitle>
                </PopularContent>
              </PopularItem>
            ))}
          </NewsList>
        </NewsColumn>
      </GridLayout>
    </Container>
  )
}

export default NewsArticles
