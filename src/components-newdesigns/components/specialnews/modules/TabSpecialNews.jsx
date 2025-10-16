import React from 'react'
import {
  GlobalScrollbars,
  Wrapper,
  Tabs,
  TabButton,
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
  SkeletonTabButton,
  SkeletonFeatureCard,
  SkeletonFeatureContent,
  SkeletonNewsItem,
  SkeletonThumbnail,
  SkeletonLine,
} from "./TabSpecialNews.styles"
import { LanguageContext } from '../../../../context/LanguageContext'
import { useState,useContext,useEffect } from 'react'
import { CategoryApi } from '../../../../services/categoryapi/CategoryApi'
import { getNewsByTypeSpecialnews } from '../../../../services/newsApi/NewsApi'
import { useNavigate } from "react-router-dom"

// Tab categories
// const TABS = ["Special News", "Featured", "Exclusive", "Breaking", "Analysis"]

// // Sample data for different tabs
// const POSTS = {
//   "Special News": {
//     leftNews: [
//       {
//         cat: "Politics",
//         date: "March 20, 2025",
//         title: "Global Leaders Gather for Climate Summit to Address Urgent Environmental Concerns",
//         summary: "As the urgency of addressing climate change reaches unprecedented levels, world leaders from diverse nations are gathering with a common purpose.",
//       },
//       {
//         cat: "Technology",
//         date: "March 20, 2025",
//         title: "Revolutionary AI Breakthrough Promises to Transform Healthcare Industry",
//         summary: "Scientists announce a groundbreaking artificial intelligence system that could revolutionize medical diagnosis and treatment.",
//       },
  
//     ],
//     rightNews: [
//       {
//         cat: "Entertainment",
//         date: "1 hour ago",
//         readTime: "10 mins read",
//         title: "The MMA Fashion Week 2023: Karen Delancy Launches New Fashion Line",
//         image: "/state/2ndimage.jpg",
//         alt: "Fashion week event"
//       },
//       {
//         cat: "Technology",
//         date: "2 hours ago",
//         readTime: "8 mins read",
//         title: "Quark Announces Plans for New Electric Car Model",
//         image: "/state/2ndsection.jpg",
//         alt: "Electric car technology"
//       },
//       {
//         cat: "Politics",
//         date: "3 hours ago",
//         readTime: "12 mins read",
//         title: "Luden Administration to Introduce Climate Change Legislation",
//         image: "/state/rightside.jpg",
//         alt: "Government building"
//       },
//       {
//         cat: "Health",
//         date: "4 hours ago",
//         readTime: "6 mins read",
//         title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
//         image: "/state/sidebar.jpg",
//         alt: "Meditation and wellness"
//       },
//       {
//         cat: "Sports",
//         date: "5 hours ago",
//         readTime: "9 mins read",
//         title: "Olympic Athletes Prepare for Upcoming Games",
//         image: "/state/sidebar2.jpg",
//         alt: "Olympic athletes training"
//       },
//       {
//         cat: "Environment",
//         date: "6 hours ago",
//         readTime: "7 mins read",
//         title: "New Green Energy Initiative Launched",
//         image: "/state/state.jpg",
//         alt: "Green energy initiative"
//       },
//       {
//         cat: "Science",
//         date: "7 hours ago",
//         readTime: "11 mins read",
//         title: "Breakthrough in Quantum Computing Research",
//         image: "/state/2ndimage.jpg",
//         alt: "Quantum computing research"
//       },
//     ],
//     feature: {
//       image: "/specilanews/special1.jpg",
//       alt: "Global climate summit conference",
//       category: "Politics",
//       author: "Buzznies",
//       date: "Just now",
//       readTime: "10 mins read",
//       title: "Global Leaders Gather for Climate Summit to Address Urgent Environmental Concerns",
//       excerpt: "As the urgency of addressing climate change reaches unprecedented levels, world leaders from diverse nations are gathering with a common purpose: to forge a historic agreement aimed at combating climate change and protecting our planet for future generations.",
//     }
//   },
//   "Featured": {
//     leftNews: [
//       {
//         cat: "Technology",
//         date: "March 20, 2025",
//         title: "Revolutionary AI Breakthrough Promises to Transform Healthcare Industry",
//         summary: "Scientists announce a groundbreaking artificial intelligence system that could revolutionize medical diagnosis and treatment.",
//       },
//       {
//         cat: "Business",
//         date: "March 19, 2025",
//         title: "Major Tech Companies Announce Historic Partnership for Sustainable Development",
//         summary: "Leading technology companies join forces to create innovative solutions for global sustainability challenges.",
//       },
//       {
//         cat: "Health",
//         date: "March 19, 2025",
//         title: "New Medical Breakthrough in Cancer Treatment Shows Promising Results",
//         summary: "Researchers announce promising results in early-stage cancer treatment trials that could change the future of oncology.",
//       },
//     ],
//     rightNews: [
//       {
//         cat: "Entertainment",
//         date: "March 19, 2025",
//         title: "The MMA Fashion Week 2023: Karen Delancy Launches New Fashion Line",
//         image: "/state/2ndimage.jpg",
//         alt: "Fashion week event"
//       },
//       {
//         cat: "Technology",
//         date: "March 18, 2025",
//         title: "Quark Announces Plans for New Electric Car Model",
//         image: "/state/2ndsection.jpg",
//         alt: "Electric car technology"
//       },
//       {
//         cat: "Politics",
//         date: "March 17, 2025",
//         title: "Luden Administration to Introduce Climate Change Legislation",
//         image: "/state/rightside.jpg",
//         alt: "Government building"
//       },
//     ],
//     feature: {
//       image: "/specilanews/special2.jpg",
//       alt: "Technology innovation showcase",
//       category: "Technology",
//       author: "TechNews",
//       date: "2 hours ago",
//       readTime: "8 mins read",
//       title: "Revolutionary AI Breakthrough Promises to Transform Healthcare Industry",
//       excerpt: "Scientists announce a groundbreaking artificial intelligence system that could revolutionize medical diagnosis and treatment across the globe.",
//     }
//   },
//   "Exclusive": {
//     leftNews: [
//       {
//         cat: "Business",
//         date: "March 19, 2025",
//         title: "Major Tech Companies Announce Historic Partnership for Sustainable Development",
//         summary: "Leading technology companies join forces to create innovative solutions for global sustainability challenges.",
//       },
//       {
//         cat: "Health",
//         date: "March 19, 2025",
//         title: "New Medical Breakthrough in Cancer Treatment Shows Promising Results",
//         summary: "Researchers announce promising results in early-stage cancer treatment trials that could change the future of oncology.",
//       },
//       {
//         cat: "Education",
//         date: "March 18, 2025",
//         title: "University Launches New AI Research Program for Future Innovation",
//         summary: "Local university introduces cutting-edge artificial intelligence research initiative to prepare students for the future.",
//       },
//     ],
//     rightNews: [
//       {
//         cat: "Health",
//         date: "March 16, 2025",
//         title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
//         image: "/state/sidebar.jpg",
//         alt: "Meditation and wellness"
//       },
//       {
//         cat: "Sports",
//         date: "March 15, 2025",
//         title: "Olympic Athletes Prepare for Upcoming Games",
//         image: "/state/sidebar2.jpg",
//         alt: "Olympic athletes training"
//       },
//       {
//         cat: "Environment",
//         date: "March 14, 2025",
//         title: "New Green Energy Initiative Launched",
//         image: "/state/state.jpg",
//         alt: "Green energy initiative"
//       },
//     ],
//     feature: {
//       image: "/specilanews/special3.jpg",
//       alt: "Exclusive business partnership announcement",
//       category: "Business",
//       author: "BusinessDaily",
//       date: "3 hours ago",
//       readTime: "12 mins read",
//       title: "Major Tech Companies Announce Historic Partnership for Sustainable Development",
//       excerpt: "Leading technology companies join forces to create innovative solutions for global sustainability challenges and environmental protection.",
//     }
//   },
//   "Breaking": {
//     leftNews: [
//       {
//         cat: "Politics",
//         date: "March 20, 2025",
//         title: "Global Leaders Gather for Climate Summit to Address Urgent Environmental Concerns",
//         summary: "As the urgency of addressing climate change reaches unprecedented levels, world leaders from diverse nations are gathering with a common purpose.",
//       },
//       {
//         cat: "Technology",
//         date: "March 20, 2025",
//         title: "Revolutionary AI Breakthrough Promises to Transform Healthcare Industry",
//         summary: "Scientists announce a groundbreaking artificial intelligence system that could revolutionize medical diagnosis and treatment.",
//       },
//     ],
//     rightNews: [
//       {
//         cat: "Entertainment",
//         date: "March 19, 2025",
//         title: "The MMA Fashion Week 2023: Karen Delancy Launches New Fashion Line",
//         image: "/state/2ndimage.jpg",
//         alt: "Fashion week event"
//       },
//       {
//         cat: "Technology",
//         date: "March 18, 2025",
//         title: "Quark Announces Plans for New Electric Car Model",
//         image: "/state/2ndsection.jpg",
//         alt: "Electric car technology"
//       },
//     ],
//     feature: {
//       image: "/specilanews/special1.jpg",
//       alt: "Breaking news climate summit",
//       category: "Politics",
//       author: "BreakingNews",
//       date: "Just now",
//       readTime: "5 mins read",
//       title: "BREAKING: Global Leaders Unite in Ambitious Climate Accord",
//       excerpt: "World leaders from across the globe have come together to forge a historic agreement aimed at combating climate change and protecting our planet.",
//     }
//   },
//   "Analysis": {
//     leftNews: [
//       {
//         cat: "Health",
//         date: "March 19, 2025",
//         title: "New Medical Breakthrough in Cancer Treatment Shows Promising Results",
//         summary: "Researchers announce promising results in early-stage cancer treatment trials that could change the future of oncology.",
//       },
//       {
//         cat: "Education",
//         date: "March 18, 2025",
//         title: "University Launches New AI Research Program for Future Innovation",
//         summary: "Local university introduces cutting-edge artificial intelligence research initiative to prepare students for the future.",
//       },
//     ],
//     rightNews: [
//       {
//         cat: "Politics",
//         date: "March 17, 2025",
//         title: "Luden Administration to Introduce Climate Change Legislation",
//         image: "/state/rightside.jpg",
//         alt: "Government building"
//       },
//       {
//         cat: "Health",
//         date: "March 16, 2025",
//         title: "Health and meditation: New Study Finds Benefits of Meditation for Stress Relief",
//         image: "/state/sidebar.jpg",
//         alt: "Meditation and wellness"
//       },
//     ],
//     feature: {
//       image: "/specilanews/special2.jpg",
//       alt: "In-depth analysis of current events",
//       category: "Analysis",
//       author: "AnalysisPro",
//       date: "4 hours ago",
//       readTime: "15 mins read",
//       title: "In-Depth Analysis: The Future of Global Healthcare Innovation",
//       excerpt: "A comprehensive analysis of how emerging technologies and medical breakthroughs are reshaping the healthcare landscape worldwide.",
//     }
//   },
// }

export default function TabSpecialNews() {
  const [active, setActive] = useState("")
  const [categories, setCategories] = useState([])
  const [news, setNews] = useState([])
  const [rawNews, setRawNews] = useState([])
  const [sideList, setSideList] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()
  useEffect(() => {
    // get categories
    const getCategories = async () => {
      setLoading(true)
      const res = await CategoryApi()
      if (res?.data) {
        setCategories(res.data)
        setActive(res.data[0]?._id || "")
      }
      setLoading(false)
    }
    getCategories()
  }, [])
  useEffect(() => {
    // get news by type state
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

  useEffect(() => {
    if (!rawNews.length || !active) return

    const filtered = rawNews.filter((item) => {
      // Skip items without a category
      if (!item.category) return false
      
      const categoryId = typeof item.category === "object" ? item.category._id : item.category
      return categoryId === active
      
    })


    const langKey =
      language === "Hindi" ? "hindi" : language === "Kannada" ? "kannada" : "English"
    
    const localized = filtered.map((item) => {
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
        // If category is a string (ID), find it in categories array
        const categoryObj = categories.find(cat => String(cat._id) === String(item.category))
        if (categoryObj) {
          if (langKey === "English") {
            categoryName = categoryObj.name || categoryObj.title || "News"
          } else if (langKey === "hindi") {
            categoryName = categoryObj.hindi || categoryObj.name || categoryObj.title || "News"
          } else if (langKey === "kannada") {
            categoryName = categoryObj.kannada || categoryObj.name || categoryObj.title || "News"
          }
        }
      }

      return {
        id: item._id,
        title: item[langKey]?.title?.slice(0, 50) + "..." || item.title?.slice(0, 50) + "..." || "",
        excerpt: item[langKey]?.description?.slice(0, 150) + "..." || item.description?.slice(0, 150) + "..." || "",
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
 
  }, [active, language, rawNews])
  const posts = news.length > 0 ? news : []
  const featuredPost = posts[0] || {}
  const newsList = posts
  console.log("posts", posts)
  console.log("featuredPost", featuredPost)
  
  // Show shimmer while loading
  if (loading) {
    return (
      <Wrapper as="section" aria-labelledby="special-news-tabs-heading" role="region">
        <GlobalScrollbars />
        <h2 
          id="special-news-tabs-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Special News Categories
        </h2>
        
        {/* Tab Navigation Skeleton */}
        <Tabs role="tablist" aria-label="Special news categories">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonTabButton key={i} />
          ))}
        </Tabs>

        <Grid>
          {/* Left side - Feature Skeleton */}
          <Column>
            <SkeletonFeatureCard>
              <SkeletonFeatureContent>
                <SkeletonLine width="80%" height="32px" />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <SkeletonLine width="120px" height="14px" />
                  <SkeletonLine width="100px" height="14px" />
                </div>
                <SkeletonLine width="100%" height="16px" />
                <SkeletonLine width="100%" height="16px" />
                <SkeletonLine width="70%" height="16px" />
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <SkeletonLine width="80px" height="28px" />
                  <SkeletonLine width="100px" height="28px" />
                </div>
              </SkeletonFeatureContent>
            </SkeletonFeatureCard>
          </Column>

          {/* Right side - News List Skeleton */}
          <Column>
            <List className="custom-scrollbar">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonNewsItem key={i}>
                  <SkeletonThumbnail />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SkeletonLine width="90%" height="18px" />
                    <SkeletonLine width="100%" height="14px" />
                    <SkeletonLine width="60%" height="14px" />
                  </div>
                </SkeletonNewsItem>
              ))}
            </List>
          </Column>
        </Grid>
      </Wrapper>
    )
  }
  
  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (e, tab) => {
    const tabIndex = categories.findIndex((cat) => cat._id === tab)
    
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const nextTab = categories[(tabIndex + 1) % categories.length]._id
      setActive(nextTab)
      setTimeout(() => {
        document.querySelector(`[role="tab"][aria-selected="true"]`)?.focus()
      }, 0)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevTab = categories[(tabIndex - 1 + categories.length) % categories.length]._id
      setActive(prevTab)
      setTimeout(() => {
        document.querySelector(`[role="tab"][aria-selected="true"]`)?.focus()
      }, 0)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(categories[0]?._id)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(categories[categories.length - 1]._id)
    }
  }

  return (
    <Wrapper as="section" aria-labelledby="special-news-tabs-heading" role="region">
      <GlobalScrollbars />
      <h2 
        id="special-news-tabs-heading" 
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        Special News Categories
      </h2>
      
      {/* Tab Navigation */}
      <Tabs role="tablist" aria-label="Special news categories">
        {categories.map((tab) => {
          const tabName = language === "English" ? tab.name : language === "Hindi" ? tab.hindi : tab.kannada
          return (
          <TabButton
            key={tab._id}
            role="tab"
            id={`tab-${tab._id}`}
            aria-selected={active === tab._id}
            aria-controls={`panel-${tab._id}`}
            tabIndex={active === tab._id ? 0 : -1}
            $active={active === tab._id}
            onClick={() => setActive(tab._id)}
            onKeyDown={(e) => handleTabKeyDown(e, tab._id)}
          >
            {tabName}
          </TabButton>
        )})}
      </Tabs>

      {/* Content for active tab */}
      <div 
        id={`panel-${active}`} 
        role="tabpanel" 
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        <Grid>
          {/* Left side - Feature Image */}
          <Column as="div" role="region" aria-labelledby="featured-article-title">
            <h3 
              id="featured-article-title" 
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              Featured {active} Article
            </h3>
            <FeatureCard 
              as="article" 
              role="article"
              aria-labelledby={`feature-title-${active}`}
              tabIndex="0"
              onClick={() => navigate(`/newsdetails/${featuredPost.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <FeatureImage
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title || `Featured ${active} story`}
                loading="lazy"
              />
              <FeatureOverlay aria-hidden="true" />
              <FeatureContent>
                <FeatureTitle id={`feature-title-${active}`} as="h4">
                  {featuredPost.title}
                </FeatureTitle>
                <FeatureMetaRow>
                  <FeatureAuthor aria-label={`Author: ${featuredPost.author}`}>
                    {featuredPost.author}
                  </FeatureAuthor>
                  <FeatureDateText aria-hidden="true">•</FeatureDateText>
                  <FeatureDateText as="time">{featuredPost.date}</FeatureDateText>
                </FeatureMetaRow>
                <FeatureExcerpt>
                  {featuredPost.excerpt}
                </FeatureExcerpt>
                <FeatureTagsRow role="list" aria-label="Article tags">
                  <FeatureBadge role="listitem" aria-label={`Category: ${featuredPost.category}`}>
                    {featuredPost.category}
                  </FeatureBadge>
                  <FeatureBadge role="listitem" aria-label={`Reading time: ${featuredPost.readTime}`}>
                    {featuredPost.readTime}
                  </FeatureBadge>
                </FeatureTagsRow>
              </FeatureContent>
            </FeatureCard>
          </Column>

          {/* Right side - News List */}
          <Column as="div" role="region" aria-labelledby="news-list-heading">
            <h3 
              id="news-list-heading" 
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              {active} Articles
            </h3>
            <List className="custom-scrollbar" role="feed" aria-label={`${active} news articles`} aria-busy="false">
              {newsList.map((n, idx) => (
                <Item 
                  key={idx} 
                  as="article" 
                  role="article"
                  aria-labelledby={`news-item-${active}-${idx}`}
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
                      <Headline id={`news-item-${active}-${idx}`} as="h5">{n.title}</Headline>
                      <MetaRow>
                        <DateText as="time">{n.date}</DateText>
                        {n.readTime && (
                          <>
                            <DateText aria-hidden="true">•</DateText>
                            <DateText aria-label={`Reading time: ${n.readTime}`}>{n.readTime}</DateText>
                          </>
                        )}
                      </MetaRow>
                    </NewsContentContainer>
                  </NewsItemContainer>
                  <Divider aria-hidden="true" />
                </Item>
              ))}
            </List>
          </Column>
        </Grid>
      </div>
    </Wrapper>
  )
}