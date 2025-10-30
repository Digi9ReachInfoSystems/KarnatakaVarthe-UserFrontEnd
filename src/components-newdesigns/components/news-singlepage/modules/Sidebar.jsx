import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import {
  SidebarContainer,
  SidebarSection,
  SectionTitle,
  SocialMediaList,
  SocialMediaItem,
  SocialMediaButton,
  SocialMediaIcon,
  SocialMediaInfo,
  SocialMediaName,
  SocialMediaStats,
  PopularNewsList,
  PopularNewsItem,
  PopularNewsImage,
  PopularNewsContent,
  PopularNewsDate,
  PopularNewsTitle,
  TrendingList,
  TrendingItem,
  TrendingContent,
  TrendingTitle,
  TrendingDate,
  SeeMoreButton,
  SkeletonLine,
  SkeletonSocialButton,
  SkeletonIcon,
  SkeletonNewsItem,
  SkeletonThumbnail,
  SkeletonTrendingItem,
} from './Sidebar.styles'
import { useState, useEffect,useContext } from 'react'
import { LanguageContext } from '../../../../context/LanguageContext'
import { getNewsByTypeState , getNewsByTypeDistrict, getNewsByTypeSpecialnews ,getNews, getNewsByid} from '../../../../services/newsApi/NewsApi'

import { useParams, useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const { resetToGlobalLanguage } = useContext(LanguageContext)
  
  // Reset language when component unmounts
  useEffect(() => {
    return () => {
      resetToGlobalLanguage()
    }
  }, [resetToGlobalLanguage])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [allNews, setAllNews] = useState([])
  const [allRawNews, setAllRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [newsId, setNewsId] = useState(null)
  const [newsIdLoading, setNewsIdLoading] = useState(true)
  const { id } = useParams()
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNewsbyId = async () => {
      try {
        setNewsIdLoading(true)
        const response = await getNewsByid(id)
        console.log('News by ID response:', response)
        if (response?.data) {
          setNewsId(response.data)
          console.log('News ID set:', response.data)
        } else {
          setNewsId(null)
        }
      } catch (error) {
        console.error('Error fetching news by ID:', error)
        setNewsId(null)
      } finally {
        setNewsIdLoading(false)
      }
    }

    if (id) {
      fetchNewsbyId()
    }
  }, [id])
  

  const fetchNewsByTypeState = async () => {
    try {
      const response = await getNewsByTypeState()
      if (response?.data) {
        setRawNews(Array.isArray(response.data) ? response.data : [])
      } else {
        setRawNews([])
      }
    } catch (error) {
      console.error('Error fetching state news:', error)
      setRawNews([])
    }
  }

  const fetchNewsByTypeDistrict = async () => {
    try {
      const response = await getNewsByTypeDistrict()
      if (response?.data) {
        setRawNews(Array.isArray(response.data) ? response.data : [])
      } else {
        setRawNews([])
      }
    } catch (error) {
      console.error('Error fetching district news:', error)
      setRawNews([])
    }
  }

  const fetchNewsByTypeSpecialnews = async () => {
    try {
      const response = await getNewsByTypeSpecialnews()
      if (response?.data) {
        setRawNews(Array.isArray(response.data) ? response.data : [])
      } else {
        setRawNews([])
      }
    } catch (error) {
      console.error('Error fetching special news:', error)
      setRawNews([])
    }
  }

  useEffect(() => {
    if (!newsIdLoading && newsId && newsId.newsType) {
      if (newsId.newsType === "statenews") {
        fetchNewsByTypeState()
      } else if (newsId.newsType === "districtnews") {
        fetchNewsByTypeDistrict()
      } else if (newsId.newsType === "specialnews") {
        fetchNewsByTypeSpecialnews()
      } else {
        setRawNews([])
      }
    }
  }, [newsId, newsIdLoading])
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await getNews()
        if (response?.data) {
          setAllRawNews(Array.isArray(response.data) ? response.data : [])
        } else {
          setAllRawNews([])
        }
      } catch (error) {
        console.error('Error fetching general news:', error)
        setAllRawNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [language])

  // Localize raw news data based on language for Popular News section
  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada";

      const localized = rawNews.map((item) => {
        const title = (item[langKey] && item[langKey].title) || item.title || "";
        const description = (item[langKey] && item[langKey].description) || item.description || "";

        return {
          _id: item._id,
          title: title,
          description: description,
          newsImage: item.newsImage || "/placeholder.svg",
          publishedAt: item.publishedAt,
          createdAt: item.createdAt,
        };
      });

      setNews(localized);
    } else {
      setNews([]);
    }
  }, [rawNews, language])

  // Localize all raw news data based on language for Latest News section
  useEffect(() => {
    if (allRawNews.length > 0) {
      const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada";

      const localized = allRawNews.map((item) => {
        const title = (item[langKey] && item[langKey].title) || item.title || "";
        const description = (item[langKey] && item[langKey].description) || item.description || "";

        return {
          _id: item._id,
          title: title,
          description: description,
          newsImage: item.newsImage || "/placeholder.svg",
          publishedAt: item.publishedAt,
          createdAt: item.createdAt,
        };
      });

      setAllNews(localized);
    } else {
      setAllNews([]);
    }
  }, [allRawNews, language])
  
  return (
    <SidebarContainer as="aside" role="complementary" aria-label="Article sidebar">
      {/* Follow Us Section */}
      <SidebarSection as="section" aria-labelledby="follow-heading">
        <SectionTitle id="follow-heading" as="h3">FOLLOW US</SectionTitle>
        <SocialMediaList role="list" aria-label="Social media links">
          {/* No loading state needed for social media buttons as they're static */}
          <SocialMediaItem role="listitem">
            <SocialMediaButton style={{ backgroundColor: '#1877F2' }} aria-label="Follow us on Facebook - 135,684 fans">
              <SocialMediaIcon>
                <FaFacebookF aria-hidden="true" />
              </SocialMediaIcon>
              <SocialMediaInfo>
                <SocialMediaStats>135,684</SocialMediaStats>
                <SocialMediaName>Facebook fans</SocialMediaName>
              </SocialMediaInfo>
            </SocialMediaButton>
          </SocialMediaItem>
          
          <SocialMediaItem role="listitem">
            <SocialMediaButton style={{ backgroundColor: '#1DA1F2' }} aria-label="Follow us on Twitter - 87,043 followers">
              <SocialMediaIcon>
                <FaTwitter aria-hidden="true" />
              </SocialMediaIcon>
              <SocialMediaInfo>
                <SocialMediaStats>87,043</SocialMediaStats>
                <SocialMediaName>Twitter followers</SocialMediaName>
              </SocialMediaInfo>
            </SocialMediaButton>
          </SocialMediaItem>
          
          <SocialMediaItem role="listitem">
            <SocialMediaButton style={{ backgroundColor: '#E4405F' }} aria-label="Follow us on Instagram - 64,350 followers">
              <SocialMediaIcon>
                <RiInstagramFill aria-hidden="true" />
              </SocialMediaIcon>
              <SocialMediaInfo>
                <SocialMediaStats>64,350</SocialMediaStats>
                <SocialMediaName>Instagram followers</SocialMediaName>
              </SocialMediaInfo>
            </SocialMediaButton>
          </SocialMediaItem>
          
          <SocialMediaItem role="listitem">
            <SocialMediaButton style={{ backgroundColor: '#0077B5' }} aria-label="Follow us on LinkedIn - 42,341 followers">
              <SocialMediaIcon>
                <FaLinkedinIn aria-hidden="true" />
              </SocialMediaIcon>
              <SocialMediaInfo>
                <SocialMediaStats>42,341</SocialMediaStats>
                <SocialMediaName>LinkedIn followers</SocialMediaName>
              </SocialMediaInfo>
            </SocialMediaButton>
          </SocialMediaItem>
        </SocialMediaList>
      </SidebarSection>

      {/* Popular News Section - Dynamic based on newsType */}
      <SidebarSection as="section" aria-labelledby="popular-heading">
        <SectionTitle id="popular-heading" as="h3">
          POPULAR NEWS
        </SectionTitle>
        <PopularNewsList as="ul" role="list" aria-label="Popular news articles">
          {loading ? (
            // Loading state with shimmer
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonNewsItem key={index}>
                <div style={{ flex: 1 }}>
                  <SkeletonLine width="80px" height="14px" style={{ marginBottom: '8px' }} />
                  <SkeletonLine width="100%" height="16px" style={{ marginBottom: '4px' }} />
                  <SkeletonLine width="90%" height="16px" />
                </div>
                <SkeletonThumbnail />
              </SkeletonNewsItem>
            ))
          ) : news.length > 0 ? (
            // Dynamic news based on newsType
            news.map((article, index) => (
              <PopularNewsItem
                key={article._id || index}
                as="li"
                role="listitem"
                tabIndex="0"
                onClick={() => article._id && navigate(`/newsdetails/${article._id}`)}
                style={{ cursor: article._id ? 'pointer' : 'default' }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && article._id) {
                    e.preventDefault();
                    navigate(`/newsdetails/${article._id}`);
                  }
                }}
              >
                <PopularNewsContent >
                  <PopularNewsDate as="time" dateTime={article.publishedAt || article.createdAt}>
                    {article.publishedAt || article.createdAt
                      ? new Date(article.publishedAt || article.createdAt).toLocaleDateString()
                      : 'Date not available'}
                  </PopularNewsDate>
                  <PopularNewsTitle as="h4">
                    {article.title 
                      ? (article.title.length > 60 ? article.title.slice(0, 60) + '...' : article.title)
                      : 'Untitled Article'}
                  </PopularNewsTitle>
                </PopularNewsContent>
                <PopularNewsImage>
                  <img
                    src={article.newsImage || "/placeholder.svg"}
                    alt={article.title || 'News image'}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </PopularNewsImage>
              </PopularNewsItem>
            ))
          ) : (
            // No news available
            <PopularNewsItem as="li" role="listitem">
              <PopularNewsContent>
                <PopularNewsDate as="time">No Date</PopularNewsDate>
                <PopularNewsTitle as="h4">
                  No related news available at the moment.
                </PopularNewsTitle>
              </PopularNewsContent>
              <PopularNewsImage>
                <img
                  src="/placeholder.svg"
                  alt="No news available"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </PopularNewsImage>
            </PopularNewsItem>
          )}
        </PopularNewsList>
      </SidebarSection>


      {/* Don't Miss It Section - Latest News */}
      <SidebarSection as="section" aria-labelledby="trending-heading">
        <SectionTitle id="trending-heading" as="h3">DON'T MISS IT</SectionTitle>
        <TrendingList as="ul" role="list" aria-label="Latest articles">
          {loading ? (
            // Loading state for trending section with shimmer
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTrendingItem key={index}>
                <SkeletonLine width="100px" height="14px" style={{ marginBottom: '8px' }} />
                <SkeletonLine width="100%" height="16px" style={{ marginBottom: '4px' }} />
                <SkeletonLine width="85%" height="16px" />
              </SkeletonTrendingItem>
            ))
          ) : allNews.length > 0 ? (
            // Show all latest news from getNews API
            allNews.map((article, index) => (
              <TrendingItem
                key={article._id || index}
                as="li"
                role="listitem"
                tabIndex="0"
                onClick={() => article._id && navigate(`/newsdetails/${article._id}`)}
                style={{ cursor: article._id ? 'pointer' : 'default' }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && article._id) {
                    e.preventDefault();
                    navigate(`/newsdetails/${article._id}`);
                  }
                }}
              >
                <TrendingContent>
                  <TrendingDate as="time" dateTime={article.publishedAt || article.createdAt}>
                    {article.publishedAt || article.createdAt
                      ? new Date(article.publishedAt || article.createdAt).toLocaleDateString()
                      : 'Date not available'}
                  </TrendingDate>
                  <TrendingTitle as="h4">
                    {article.title 
                      ? (article.title.length > 60 ? article.title.slice(0, 60) + '...' : article.title)
                      : 'Untitled Article'}
                  </TrendingTitle>
                </TrendingContent>
              </TrendingItem>
            ))
          ) : (
            // No news available
            <TrendingItem as="li" role="listitem">
              <TrendingContent>
                <TrendingDate as="time">No Date</TrendingDate>
                <TrendingTitle as="h4">
                  No latest news available at the moment.
                </TrendingTitle>
              </TrendingContent>
            </TrendingItem>
          )}
        </TrendingList>
        {/* <SeeMoreButton as="button" type="button" aria-label="Load more latest articles">Read More</SeeMoreButton> */}
      </SidebarSection>





    </SidebarContainer>
  )
}

export default Sidebar
