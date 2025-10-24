import React from 'react'
import {
  GlobalScrollbars,
  Wrapper,
  HeaderRow,
  Title,
  Grid,
  Column,
  List,
  Item,
  MetaRow,
  Badge,
  DateText,
  Headline,
  Summary,
  Divider,
  FeatureCard,
  FeatureImage,
  FeatureOverlay,
  FeatureContent,
  FeatureTitle,
  FeatureExcerpt,
  SeeMoreBtn,
  NewsItemContainer,
  NewsImageContainer,
  NewsImage,
  NewsContentContainer,
  FeatureMetaRow,
  FeatureAuthor,
  FeatureDateText,
  FeatureTagsRow,
  FeatureBadge,
  SkeletonFeatureCard,
  SkeletonFeatureContent,
  SkeletonNewsItem,
  SkeletonThumbnail,
  SkeletonLine,
} from "./TabSpecialNews.styles"
import { LanguageContext } from '../../../../context/LanguageContext'
import { useState, useContext, useEffect } from 'react'
import { getNewsByTypeSpecialnews } from '../../../../services/newsApi/NewsApi'
import { useNavigate } from "react-router-dom"

export default function TabSpecialNews() {
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()

  useEffect(() => {
    // get news by type special news
    const fetchNews = async () => {
      setLoading(true)
      const res = await getNewsByTypeSpecialnews()
      if (res?.success && Array.isArray(res.data)) {
        setRawNews(res.data)
      }
      setLoading(false)
    }
    fetchNews()
  }, [language])

  // Transform raw news to localized news
  useEffect(() => {
    if (rawNews.length > 0) {
      const langKey =
        language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"

      const localized = rawNews.map((item) => {
        // Extract category name based on language context
        let categoryName = "News"
        if (typeof item.category === "object" && item.category) {
          // If category is an object, extract the name based on language
          if (langKey === "English") {
            categoryName = item.category.name || item.category.title || "News"
          } else if (langKey === "hindi") {
            categoryName = item.category.hindi || item.category.name || item.category.title || "News"
          } else if (langKey === "kannada") {
            categoryName = item.category.kannada || item.category.name || item.category.title || "News"
          }
        } else if (typeof item.category === "string") {
          // If category is a string (ID), we don't have categories array to find it in, so just use "News"
          categoryName = "News"
        }

        return {
          id: item._id,
          title: item[langKey]?.title?.slice(0, 50) + "..." || item.title?.slice(0, 50) + "..." || "",
          excerpt: item[langKey]?.description?.slice(0, 100) + "..." || item.description?.slice(0, 100) + "..." || "",
          date: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          image: item.newsImage || "/placeholder.svg",
          readTime: item.readTime || "",
          author: item.author || "",
          category: categoryName,
          alt: item.title || "",
        }
      })
      setNews(localized)
    }
  }, [language, rawNews])

  // Get the first 3 items for big cards and the rest for the scrollable list
  const bigCardNews = news.slice(0, 3)
  const smallCardNews = news.slice(3)

  // Parse date for datetime attribute
  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Minimal shimmer loading
  if (loading) {
    return (
      <Wrapper as="section" aria-labelledby="special-news-heading" role="region">
        <h2 id="special-news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Special News
        </h2>
        <Grid>
          <Column>
            {[1, 2, 3].map((i) => (
              <SkeletonFeatureCard key={i} />
            ))}
          </Column>
          <Column>
            <List>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonNewsItem key={i} />
              ))}
            </List>
          </Column>
        </Grid>
      </Wrapper>
    )
  }

  // Minimal, consistent design
  return (
    <Wrapper as="section" aria-labelledby="special-news-heading" role="region">
      <h2 id="special-news-heading" style={{ position: "absolute", left: "-9999px", top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Special News
      </h2>
      <Grid>
        <Column
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {bigCardNews.map((item) => (
            <FeatureCard
              key={item.id}
              as="article"
              role="article"
              aria-labelledby={`feature-title-${item.id}`}
              tabIndex="0"
              onClick={() => navigate(`/newsdetails/${item.id}`)}
              style={{
                cursor: 'pointer',
                maxWidth: '350px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                flex: '1 1 300px',
              }}
            >
              <FeatureImage
                src={item.image || "/placeholder.svg"}
                alt={item.title || `Featured story`}
                loading="lazy"
                style={{ height: '160px', objectFit: 'cover', width: '100%' }}
              />
              <div
                className="feature-content-responsive"
                style={{
                  position: 'static',
                  padding: '12px',
                  background: 'none',
                  color: '#222',
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
              >
                <FeatureTitle id={`feature-title-${item.id}`} as="h4" style={{ fontSize: '15px', marginBottom: '6px', fontWeight: 600 }}>
                  {item.title}
                </FeatureTitle>
                <FeatureMetaRow style={{ marginBottom: '6px', fontSize: '13px', color: '#666' }}>
                  <FeatureAuthor>{item.author}</FeatureAuthor>
                  <FeatureDateText as="time" dateTime={parseDateTimeAttr(item.date)}>{item.date}</FeatureDateText>
                </FeatureMetaRow>
                <FeatureExcerpt style={{ fontSize: '13px', marginBottom: '6px', color: '#444' }}>
                  {item.excerpt}
                </FeatureExcerpt>
                {/* <FeatureTagsRow>
                  <FeatureBadge>{item.category}</FeatureBadge>
                  <FeatureBadge>{item.readTime}</FeatureBadge>
                </FeatureTagsRow> */}
              </div>
            </FeatureCard>
          ))}
        </Column>
        <Column>
          <List>
            {smallCardNews.map((n, idx) => (
              <Item
                key={idx}
                as="article"
                role="article"
                aria-labelledby={`news-item-${idx}`}
                tabIndex="0"
                onClick={() => navigate(`/newsdetails/${n.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <NewsItemContainer>
                  <NewsImageContainer>
                    <NewsImage
                      src={n.image}
                      alt={n.alt || `Thumbnail for ${n.title}`}
                      loading="lazy"
                    />
                  </NewsImageContainer>
                  <NewsContentContainer>
                    <Headline id={`news-item-${idx}`} as="h5">{n.title}</Headline>
                    <MetaRow>
                      <DateText as="time" dateTime={parseDateTimeAttr(n.date)}>{n.date}</DateText>
                      {n.readTime && (
                        <DateText>{n.readTime}</DateText>
                      )}
                    </MetaRow>
                  </NewsContentContainer>
                </NewsItemContainer>
                <Divider />
              </Item>
            ))}
          </List>
        </Column>
      </Grid>
    </Wrapper>
  )
}
