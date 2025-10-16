"use client"

import { useContext, useEffect, useState, useRef, useCallback } from "react"
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import {
  CarouselContainer,
  CarouselItem,
  Overlay,
  ContentWrapper,
  TrendingCategory,
  NewsInfo,
  NewsTitle,
  ArrowIcon,
  DotContainer,
  Dot,
  ShimmerContainer,
  ShimmerContent,
  ShimmerCategory,
  ShimmerText,
  ShimmerTitle,
  ShimmerDotContainer,
  ShimmerDot,
  NavigationArrow,
} from "./Trending.styles"
import theme from "../../../theme/Theme"
import { BannerApi } from "../../../services/categoryapi/CategoryApi"
import { FontSizeContext } from "../../../context/FontSizeProvider"
import ImagePreviewModal from "./ImagePreviewModal"

const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [trendingNews, setTrendingNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { fontSize } = useContext(FontSizeContext)
  const autoPlayRef = useRef(null)
  const carouselRef = useRef(null)
  const prevButtonRef = useRef(null)
  const nextButtonRef = useRef(null)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await BannerApi()
        const formattedData = data.map((item) => ({
          id: item._id,
          category: "Trending",
          date: new Date(item.createdTime).toLocaleDateString(),
          readTime: "5 min read",
          title: item.title,
          image: item.bannerImage,
          link: `/post/${item._id}`,
        }))

        setTrendingNews(formattedData)
      } catch (error) {
        console.error("Error fetching banner data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingNews.length)
  }, [trendingNews.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trendingNews.length - 1 : prevIndex - 1))
  }, [trendingNews.length])

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex(index)
      // Reset autoplay timer when manually navigating
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = setInterval(nextSlide, 4000)
      }
    },
    [nextSlide],
  )

  const handleImagePreview = () => {
    // Create an array of image objects for the modal
    const imageSlides = trendingNews.map((news) => ({
      imageUrl: news.image,
      title: news.title,
    }))

    // Set the images array and show modal
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // Auto-play functionality
  useEffect(() => {
    if (trendingNews.length === 0 || loading) return

    autoPlayRef.current = setInterval(nextSlide, 4000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [trendingNews, loading, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === carouselRef.current || carouselRef.current?.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          prevSlide()
          e.preventDefault()
        } else if (e.key === "ArrowRight") {
          nextSlide()
          e.preventDefault()
        } else if (e.key === "Home") {
          goToSlide(0)
          e.preventDefault()
        } else if (e.key === "End") {
          goToSlide(trendingNews.length - 1)
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, trendingNews.length])

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide()
    } else if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide()
    }
  }

  // Loading state
  if (loading) {
    return (
      <CarouselContainer style={{ fontSize: `${fontSize}%` }} role="region" aria-label="Loading trending news">
        <ShimmerContainer>
          <ShimmerContent>
            <ShimmerCategory />
            <ShimmerText />
            <ShimmerTitle />
            <ShimmerTitle style={{ width: "80%" }} />
          </ShimmerContent>
          <ShimmerDotContainer>
            <ShimmerDot />
            <ShimmerDot />
            <ShimmerDot />
          </ShimmerDotContainer>
        </ShimmerContainer>
      </CarouselContainer>
    )
  }

  // Prepare images for modal
  const modalImages = trendingNews.map((news) => ({
    imageUrl: news.image,
    title: news.title,
  }))

  return (
    <>
      <CarouselContainer
        style={{ fontSize: `${fontSize}%` }}
        ref={carouselRef}
        role="region"
        aria-label="Trending news carousel"
        tabIndex="0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
      >
        {trendingNews.map((news, index) => (
          <CarouselItem
            style={{ fontSize: `${fontSize}%` }}
            key={news.id}
            active={index === currentIndex}
            bgImage={news.image}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${trendingNews.length}`}
          >
            <Overlay />
            <ContentWrapper>
              <div style={{ display: "flex", alignItems: "center", gap: "1%", fontSize: `${fontSize}%` }}>
                <TrendingCategory style={{ fontSize: `${fontSize}%` }}>{news.category}</TrendingCategory>
                <NewsInfo style={{ fontSize: `${fontSize}%` }}>
                  • {news.date} • {news.readTime}
                </NewsInfo>
              </div>
              <NewsTitle>{news.title}</NewsTitle>
            </ContentWrapper>
            <ArrowIcon 
              onClick={handleImagePreview} 
              aria-label={`Preview images in slideshow`}
              tabIndex="0"
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleImagePreview()
                }
              }}
            >
              <FiArrowUpRight size={28} color={theme.colors.background} aria-hidden="true" />
            </ArrowIcon>
          </CarouselItem>
        ))}

        {/* Left Navigation Arrow */}
        <NavigationArrow 
          ref={prevButtonRef}
          position="left" 
          onClick={prevSlide} 
          aria-label="Previous slide"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              prevSlide()
            }
          }}
        >
          <FiChevronLeft size={24} aria-hidden="true" />
        </NavigationArrow>

        {/* Right Navigation Arrow */}
        <NavigationArrow 
          ref={nextButtonRef}
          position="right" 
          onClick={nextSlide} 
          aria-label="Next slide"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              nextSlide()
            }
          }}
        >
          <FiChevronRight size={24} aria-hidden="true" />
        </NavigationArrow>

        <DotContainer role="tablist" aria-label="Slide navigation">
          {trendingNews.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  goToSlide(index)
                }
              }}
            />
          ))}
        </DotContainer>
      </CarouselContainer>

      {showModal && <ImagePreviewModal images={modalImages} initialIndex={currentIndex} onClose={closeModal} />}
    </>
  )
}

export default Trending
