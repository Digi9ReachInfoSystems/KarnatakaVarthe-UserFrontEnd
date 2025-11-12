import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../../../../context/LanguageContext'
import { getNewsByTypeArticles } from '../../../../../services/newsApi/NewsApi'
import {
  ArticlesSection,
  Container,
  SectionHeader,
  Title,
  CarouselWrapper,
  NavButton,
  ArticlesGrid,
  ArticleCard,
  ArticleImageWrapper,
  ArticleImage,
  ImageOverlay,
  ArticleNumber,
  ArticleContent,
  ArticleTitle,
  ArticleDate,
  PaginationDots,
  Dot,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonTitle,
  SkeletonDate,
} from './NewsArtilces.styles'

export default function NewsArticlesNews() {
  const { language } = useContext(LanguageContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rawData, setRawData] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Header text translations
  const headerText = {
    English: "Articles",
    Kannada: "ಲೇಖನಗಳು",
    Hindi: "लेख"
  }
  
  // Get items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 3
    const width = window.innerWidth
    if (width <= 768) return 1 // Mobile
    if (width <= 1024) return 2 // Tablet
    return 3 // Desktop
  }

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage())

  // Fetch district news
  useEffect(() => {
    const fetchDistrictNews = async () => {
      try {
        setLoading(true)
        const response = await getNewsByTypeArticles()
        console.log("Articles API response:", response)
        
        if (response?.success && Array.isArray(response.data)) {
          // Filter by magazineType and newsType
          const filteredData = response.data.filter(item => 
            item.newsType === "articles"
          )
          console.log("Filtered articles:", filteredData)
          setRawData(filteredData)
        } else {
          setRawData([])
        }
      } catch (error) {
        console.error("Error fetching articles:", error)
        setRawData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchDistrictNews()
  }, [])

  // Process data based on language
  useEffect(() => {
    if (rawData.length > 0) {
      const langKey = language === "English" ? "English" : 
                     language === "Hindi" ? "hindi" : "kannada"
      
      const processedData = rawData.map((item, index) => {
        // Get title and limit to 50 characters for one line
        const fullTitle = item[langKey]?.title || item.title || ""
        const limitedTitle = fullTitle.length > 50 ? fullTitle.substring(0, 50) + "..." : fullTitle
        
        return {
          id: item._id,
          title: limitedTitle,
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "",
          image: item.newsImage || "/placeholder.svg",
          number: String(index + 1).padStart(2, '0'),
          publishedAt: item.publishedAt
        }
      })

      // Sort by latest published date (newest first)
      const sortedByLatest = [...processedData].sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0)
        const dateB = new Date(b.publishedAt || 0)
        return dateB - dateA // Descending order (latest first)
      })

      // Re-number after sorting
      const reNumbered = sortedByLatest.map((item, index) => ({
        ...item,
        number: String(index + 1).padStart(2, '0')
      }))

      setArticles(reNumbered)
    }
  }, [rawData, language])

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage()
      setItemsPerPage(newItemsPerPage)
      // Reset to first page if current index is out of bounds
      setCurrentIndex(prev => Math.min(prev, Math.max(0, articles.length - newItemsPerPage)))
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [articles.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(articles.length - itemsPerPage, prev + 1))
  }
  const buttonText = {
    English: "Show More ->",
    Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    Hindi: "और दिखाएँ ->"
  };

  const visibleArticles = articles.slice(currentIndex, currentIndex + itemsPerPage)
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < articles.length - itemsPerPage

  // Skeleton loading component
  const SkeletonLoader = () => (
    <ArticlesGrid>
      {Array.from({ length: itemsPerPage }).map((_, idx) => (
        <SkeletonCard key={idx}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonTitle />
            <SkeletonDate />
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </ArticlesGrid>
  )

  return (
    <ArticlesSection aria-labelledby="articles-heading">
      <Container>
        {/* Section Header */}
        <SectionHeader>
          <Title id="articles-heading">{headerText[language] || "Articles"}</Title>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <a href="/articles" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                          {buttonText[language] || "Show More"}
                        </a>
                      </div>
        </SectionHeader>

        {/* Articles Carousel */}
        <CarouselWrapper aria-label="Articles carousel">
          {/* Previous Button */}
          <NavButton
            onClick={handlePrevious}
            disabled={!canGoPrevious || loading}
            position="left"
            aria-label="Previous articles"
          >
            <span aria-hidden="true">&#10094;</span>
          </NavButton>

          {/* Articles Grid or Skeleton */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <ArticlesGrid>
              {visibleArticles.map((article) => (
                <Link 
                  to={`/newsdetails/${article.id}`} 
                  key={article.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ArticleCard aria-label={article.title}>
                    <ArticleImageWrapper>
                      <ArticleImage src={article.image} alt={article.title} />
                      <ImageOverlay aria-hidden="true" />
                      <ArticleNumber aria-hidden="true">{article.number}</ArticleNumber>
                    </ArticleImageWrapper>
                    <ArticleContent>
                      <ArticleTitle>{article.title}</ArticleTitle>
                      <ArticleDate>{article.date}</ArticleDate>
                    </ArticleContent>
                  </ArticleCard>
                </Link>
              ))}
            </ArticlesGrid>
          )}

          {/* Next Button */}
          <NavButton
            onClick={handleNext}
            disabled={!canGoNext || loading}
            position="right"
            aria-label="Next articles"
          >
            <span aria-hidden="true">&#10095;</span>
          </NavButton>
        </CarouselWrapper>

        {/* Pagination Dots */}
        {/* <PaginationDots>
          {Array.from({ length: articles.length - itemsPerPage + 1 }).map((_, index) => (
            <Dot
              key={index}
              onClick={() => setCurrentIndex(index)}
              $active={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </PaginationDots> */}
      </Container>
    </ArticlesSection>
  )
}

