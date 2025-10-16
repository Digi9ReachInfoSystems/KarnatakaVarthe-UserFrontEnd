import { getLatestNews } from "../../../../services/newsApi/NewsApi"
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
  SkeletonItem,
  SkeletonLine,
  SkeletonFeatureCard,
  SkeletonFeatureContent,
} from "./LatestNews.styles"
import { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import { formatDate } from "../../../../utils/formatters"
import { useNavigate } from "react-router-dom"

// Data (sample)
const leftNews = [
  {
    cat: "Technology",
    date: "March 20, 2025",
    title: "XSpacer Launches First Tourist Mission to Space",
    summary:
      "XSpacer has successfully launched its first-ever tourist mission to space, marking a new era of space tourism.",
  },
  {
    cat: "Entertainment",
    date: "March 20, 2025",
    title: "Hollywood Stars Turn Out for Oscars Red Carpet",
    summary:
      "The biggest names in Hollywood turned out for the annual Academy Awards ceremony, dazzling on the red carpet.",
  },
  {
    cat: "Business",
    date: "March 20, 2025",
    title: "Amazing Plans to Expand Its Delivery Network to Rural Areas",
    summary: "Amazing is set to expand its delivery network to rural areas, aiming to reach more customers nationwide.",
  },
  {
    cat: "Technology",
    date: "March 20, 2025",
    title: "XSpacer Launches First Tourist Mission to Space",
    summary:
      "XSpacer has successfully launched its first-ever tourist mission to space, marking a new era of space tourism.",
  },
  {
    cat: "Entertainment",
    date: "March 20, 2025",
    title: "Hollywood Stars Turn Out for Oscars Red Carpet",
    summary:
      "The biggest names in Hollywood turned out for the annual Academy Awards ceremony, dazzling on the red carpet.",
  },
  {
    cat: "Business",
    date: "March 20, 2025",
    title: "Amazing Plans to Expand Its Delivery Network to Rural Areas",
    summary: "Amazing is set to expand its delivery network to rural areas, aiming to reach more customers nationwide.",
  },
  {
    cat: "Technology",
    date: "March 20, 2025",
    title: "XSpacer Launches First Tourist Mission to Space",
    summary:
      "XSpacer has successfully launched its first-ever tourist mission to space, marking a new era of space tourism.",
  },
  {
    cat: "Entertainment",
    date: "March 20, 2025",
    title: "Hollywood Stars Turn Out for Oscars Red Carpet",
    summary:
      "The biggest names in Hollywood turned out for the annual Academy Awards ceremony, dazzling on the red carpet.",
  },
  {
    cat: "Business",
    date: "March 20, 2025",
    title: "Amazing Plans to Expand Its Delivery Network to Rural Areas",
    summary: "Amazing is set to expand its delivery network to rural areas, aiming to reach more customers nationwide.",
  },
  {
    cat: "Sports",
    date: "March 19, 2025",
    title: "Local Football Team Wins Championship",
    summary: "The city's football team secured their first championship in over a decade with a thrilling victory.",
  },
  {
    cat: "Health",
    date: "March 19, 2025",
    title: "New Medical Breakthrough in Cancer Treatment",
    summary: "Researchers announce promising results in early-stage cancer treatment trials.",
  },
  {
    cat: "Education",
    date: "March 18, 2025",
    title: "University Launches New AI Research Program",
    summary: "Local university introduces cutting-edge artificial intelligence research initiative.",
  },
]

const rightNews = [
  {
    cat: "Entertainment",
    date: "March 19, 2025",
    title: "The MMA Fashion Week 2023: Karen Delancy Launches New Fashion Line",
  },
  {
    cat: "Technology",
    date: "March 18, 2025",
    title: "Quark Announces Plans for New Electric Car Model",
  },
  {
    cat: "Politics",
    date: "March 17, 2025",
    title: "Luden Administration to Introduce Climate Change Legislation",
  },
  {
    cat: "Health",
    date: "March 16, 2025",
    title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
  },
  {
    cat: "Technology",
    date: "March 18, 2025",
    title: "Quark Announces Plans for New Electric Car Model",
  },
  {
    cat: "Politics",
    date: "March 17, 2025",
    title: "Luden Administration to Introduce Climate Change Legislation",
  },
  {
    cat: "Health",
    date: "March 16, 2025",
    title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
  },
  {
    cat: "Technology",
    date: "March 18, 2025",
    title: "Quark Announces Plans for New Electric Car Model",
  },
  {
    cat: "Politics",
    date: "March 17, 2025",
    title: "Luden Administration to Introduce Climate Change Legislation",
  },
  {
    cat: "Health",
    date: "March 16, 2025",
    title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
  },
  {
    cat: "Sports",
    date: "March 15, 2025",
    title: "Olympic Athletes Prepare for Upcoming Games",
  },
  {
    cat: "Environment",
    date: "March 14, 2025",
    title: "New Green Energy Initiative Launched",
  },
  {
    cat: "Science",
    date: "March 13, 2025",
    title: "Breakthrough in Quantum Computing Research",
  },
]

export default function LatestNews() {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [rawData, setRawData] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const [popularNews, setPopularNews] = useState([])
  const { language } = useContext(LanguageContext)
  const [centerNews, setCenterNews] = useState([])
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
   useEffect(() => {
    if (rawData.length > 0) {
      const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada"
        // Sort by most recent date
    const sortedData = [...rawData].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    )
      const mappedData = sortedData.map((item) => {
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
        }

        return {
          id: item._id,
          title: item[langKey]?.title ? item[langKey].title.slice(0, 100) + "..." : "No title",
          excerpt: item[langKey]?.description ? item[langKey].description.slice(0, 150) + "..." : "No description",
          image: item.newsImage,
          date: item.publishedAt,
          author: item.author || "Unknown",
          category: categoryName,
        }
      })
      const now = new Date()
      const popular = mappedData.filter(item => {
        const diffHrs = (now - new Date(item.date)) / (1000 * 60 * 60)
        return diffHrs >= 24 && diffHrs <= 72
      })
      setNewsData(mappedData)       // all except top one
    setLatestNews(mappedData.slice(0, 1))  
    setCenterNews(mappedData[0])
    setPopularNews(popular)
    }
   }, [rawData, language])
  const parseDateTimeAttr = (dateStr) => {
    try {
      const parsed = new Date(dateStr);
      return parsed.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Show shimmer while loading
  if (loading) {
    return (
      <Wrapper as="section" aria-labelledby="latest-popular-heading" role="region">
        <GlobalScrollbars />
        <h2 
          id="latest-popular-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Latest and Popular News
        </h2>
        
        <HeaderRow role="presentation">
          <Title as="h3" id="latest-news-title">Latest News</Title>
          <Title as="h3" id="popular-news-title">Popular News</Title>
        </HeaderRow>

        <Grid>
          {/* Left column skeleton */}
          <Column>
            <List className="custom-scrollbar">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonItem key={i}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <SkeletonLine width="80px" height="24px" />
                    <SkeletonLine width="120px" height="14px" />
                  </div>
                  <SkeletonLine width="90%" height="20px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="60%" height="14px" />
                </SkeletonItem>
              ))}
            </List>
          </Column>

          {/* Center feature skeleton */}
          <Column>
            <SkeletonFeatureCard>
              <SkeletonFeatureContent>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <SkeletonLine width="80px" height="24px" />
                  <SkeletonLine width="120px" height="14px" />
                </div>
                <SkeletonLine width="80%" height="32px" />
                <SkeletonLine width="100%" height="16px" />
                <SkeletonLine width="100%" height="16px" />
                <SkeletonLine width="70%" height="16px" />
              </SkeletonFeatureContent>
            </SkeletonFeatureCard>
          </Column>

          {/* Right column skeleton */}
          <Column>
            <List className="custom-scrollbar">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonItem key={i}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <SkeletonLine width="80px" height="24px" />
                    <SkeletonLine width="120px" height="14px" />
                  </div>
                  <SkeletonLine width="90%" height="20px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="100%" height="14px" />
                  <SkeletonLine width="60%" height="14px" />
                </SkeletonItem>
              ))}
            </List>
          </Column>
        </Grid>
      </Wrapper>
    )
  }

  return (
    <Wrapper as="section" aria-labelledby="latest-popular-heading" role="region">
      <GlobalScrollbars />
      <h2 
        id="latest-popular-heading" 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Latest and Popular News
      </h2>
      
      <HeaderRow role="presentation">
        <Title as="h3" id="latest-news-title">Latest News</Title>
        <Title as="h3" id="popular-news-title">Popular News</Title>
      </HeaderRow>

      <Grid>
        {/* Left column */}
        <Column as="div" role="region" aria-labelledby="latest-news-title">
          <List className="custom-scrollbar" role="feed" aria-label="Latest news articles" aria-busy="false">
            {newsData.map((n, idx) => (
              <Item 
                key={idx} 
                as="article" 
                role="article"
                aria-labelledby={`latest-news-${idx}`}
                tabIndex="0"
                onClick={() => navigate(`/newsdetails/${n.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <MetaRow>
                  <Badge aria-label={`Category: ${n.category}`}>{n.category}</Badge>
                  <DateText as="time" dateTime={formatDate(n.date)}>{formatDate(n.date)}</DateText>
                </MetaRow>
                <Headline id={`latest-news-${idx}`} as="h4">{n.title}</Headline>
                <Summary>{n.excerpt}</Summary>
                <Divider aria-hidden="true" />
              </Item>
            ))}
          </List>
        </Column>

        {/* Center feature */}
        <Column as="div" role="region" aria-labelledby="featured-story-title">
          <h3 
            id="featured-story-title" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Featured Story
          </h3>
          <FeatureCard 
            as="article" 
            role="article"
            aria-labelledby="featured-health-title"
            tabIndex="0"
            onClick={() => navigate(`/newsdetails/${centerNews.id}`)}
            style={{ cursor: 'pointer' }}
          >
            
            <FeatureImage
              src={centerNews.image}
              alt={centerNews.title}
              loading="lazy"
            />
           
            <FeatureOverlay aria-hidden="true" />
            <FeatureContent>
              <MetaRow>
                <Badge aria-label="Category: {centerNews.category}">{centerNews.category}</Badge>
                <DateText as="time" dateTime={formatDate(centerNews.date)}>{formatDate(centerNews.date)}</DateText>
              </MetaRow>
              <FeatureTitle id="featured-health-title" as="h4">
                {centerNews.title}
              </FeatureTitle>
              <FeatureExcerpt>
                {centerNews.excerpt}
              </FeatureExcerpt>
            </FeatureContent> 
          </FeatureCard>
        </Column>

        {/* Right column */}
        <Column as="div" role="region" aria-labelledby="popular-news-title">
          <List className="custom-scrollbar" role="feed" aria-label="Popular news articles" aria-busy="false">
            {popularNews.map((n, idx) => (
              <Item
                key={idx}
                as="article"
                role="article"
                aria-labelledby={`popular-news-${idx}`}
                tabIndex="0"
                onClick={() => navigate(`/newsdetails/${n.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <MetaRow>
                  <Badge aria-label={`Category: ${n.category}`}>{n.category}</Badge>
                  <DateText as="time" dateTime={formatDate(n.date)}>{formatDate(n.date)}</DateText>
                </MetaRow>
                <Headline id={`popular-news-${idx}`} as="h4">{n.title}</Headline>
                <Summary>{n.excerpt}</Summary>
                <Divider aria-hidden="true" />
              </Item>
            ))}
            {popularNews.length > 4 && (
              <SeeMoreBtn type="button" aria-label="Load more popular news articles">
                See More
              </SeeMoreBtn>
            )}
          </List>
        </Column>
      </Grid>
    </Wrapper>
  )
}
