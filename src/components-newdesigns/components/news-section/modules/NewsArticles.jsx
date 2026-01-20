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
  CombinedColumn,
  TabContainer,
  Tab,
  TabContent,
  SkeletonFeaturedCard,
  SkeletonFeaturedImage,
  SkeletonFeaturedContent,
  SkeletonLine,
  SkeletonNewsItem,
  SkeletonPopularItem,
  SkeletonThumbnail,
} from "./NewsArticles.styles"
import { getAllNews } from "../../../../services/newsApi/newsducks";
import { LanguageContext } from "../../../../context/LanguageContext";
import { formatDate } from "../../../../utils/formatters";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../districtnews/modules/DateFilter/EmptyState";

const NewsArticles = ({ dateFilter = null }) => {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const { language } = useContext(LanguageContext)
  const [popularNews, setPopularNews] = useState([])
  const [activeTab, setActiveTab] = useState('latest')
  const navigate = useNavigate()
  // Parse date for datetime attribute
 useEffect(() => {
  const fetchNews = async () => {
    console.log('🔍 NewsArticles - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
    setLoading(true)
    try {
      // Ensure dateFilter is string or null
      const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
      console.log('🔍 NewsArticles - Clean dateFilter:', cleanDateFilter)
      const response = await getAllNews(cleanDateFilter)
      console.log('✅ NewsArticles - API response:', response)
      if (response?.success && Array.isArray(response.data.news)) {
        console.log('📰 NewsArticles - News count:', response.data.news.length)
        setRawData(response.data.news)
      } else {
        console.warn('⚠️ NewsArticles - No data or invalid format')
        setRawData([])
      }
    } catch (error) {
      console.error('❌ NewsArticles - Error:', error)
      setRawData([])
    }
    setLoading(false)
  }
  fetchNews()
 }, [language, dateFilter])
 // get popular news
 useEffect(() => {
  if (rawData.length > 0) {
    console.log('🔄 NewsArticles - Processing rawData, count:', rawData.length)
    const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
      // Sort by most recent date
  const sortedData = [...rawData].sort(
    (a, b) => {
      const aDate = new Date(a.publishedAt?.$date || a.publishedAt || 0)
      const bDate = new Date(b.publishedAt?.$date || b.publishedAt || 0)
      return bDate - aDate
    }
  )
    const mappedData = sortedData.map((item) => {
      // Extract proper ID and date from MongoDB format
      const newsId = item._id?.$oid || item._id
      const publishedDate = item.publishedAt?.$date || item.publishedAt
      
      return {
      id: newsId,
      title: item[langKey]?.title ? item[langKey].title.slice(0, 100) + "..." : "No title",
      excerpt: item[langKey]?.description ? item[langKey].description.slice(0, 150) + "..." : "No description",
      image: item.newsImage,
      date: publishedDate,
      author: item.author || "Unknown",
    }})
    console.log('🗺️ NewsArticles - Mapped data, count:', mappedData.length)
    
    // Popular news: always filter by last 45 days (date filter already applied at API level)
    const now = new Date()
    const popular = mappedData.filter(item => {
      const diffDays = (now - new Date(item.date)) / (1000 * 60 * 60 * 24)
      return diffDays >= 0 && diffDays <= 45
    })
    console.log('📆 NewsArticles - Popular news (last 45 days), count:', popular.length)
    
    setNewsData(mappedData.slice(1))    
       // all except top one
  setLatestNews(mappedData.slice(0, 1))  

  setPopularNews(popular)
  console.log('✅ NewsArticles - Data processing complete')
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

          {/* Combined column skeleton for tablet/mobile */}
          <CombinedColumn>
            <TabContainer>
              <Tab active={true}>Latest News</Tab>
              <Tab active={false}>Popular News</Tab>
            </TabContainer>
            <NewsList>
              {[1, 2, 3, 4].map((i) => (
                <SkeletonNewsItem key={`skeleton-${i}`}>
                  <SkeletonLine width="100px" height="14px" />
                  <SkeletonLine width="90%" height="20px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="80%" height="14px" />
                </SkeletonNewsItem>
              ))}
            </NewsList>
          </CombinedColumn>
        </GridLayout>
      </Container>
    )
  }

  // Show empty state when no data available (after loading)
  if (!loading && rawData.length === 0) {
    return (
      <Container as="section" aria-labelledby="news-articles-heading" role="region">
        <h2 
          id="news-articles-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Featured, Latest and Popular News
        </h2>
        <GridLayout>
          <EmptyState />
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

        {/* Combined column with tabs for tablet/mobile */}
        <CombinedColumn>
          <TabContainer>
            <Tab active={activeTab === 'latest'} onClick={() => setActiveTab('latest')}>
              Latest News
            </Tab>
            <Tab active={activeTab === 'popular'} onClick={() => setActiveTab('popular')}>
              Popular News
            </Tab>
          </TabContainer>

          <TabContent active={activeTab === 'latest'}>
            <NewsList role="feed" aria-label="Latest news articles" aria-busy="false">
              {newsData.map((item, index) => (
                <NewsItem
                  key={`tab-latest-${item.id}`}
                  as="article"
                  role="article"
                  aria-labelledby={`tab-latest-news-${index}`}
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
                    <NewsTitle id={`tab-latest-news-${index}`} as="h4">
                      {item.title}
                    </NewsTitle>
                    <p>{item.excerpt}</p>
                  </NewsItemContent>
                </NewsItem>
              ))}
            </NewsList>
          </TabContent>

          <TabContent active={activeTab === 'popular'}>
            <NewsList role="feed" aria-label="Popular news articles" aria-busy="false">
              {popularNews.map((item, index) => (
                <PopularItem
                  key={`tab-popular-${item.id}`}
                  as="article"
                  role="article"
                  aria-labelledby={`tab-popular-news-${index}`}
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
                    <PopularTitle id={`tab-popular-news-${index}`} as="h4">
                      {item.title}
                    </PopularTitle>
                  </PopularContent>
                </PopularItem>
              ))}
            </NewsList>
          </TabContent>
        </CombinedColumn>
      </GridLayout>
    </Container>
  )
}

export default NewsArticles
