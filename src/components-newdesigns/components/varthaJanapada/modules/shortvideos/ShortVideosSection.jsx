import { useState, useEffect, useRef, useContext } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getVideos } from "../../../../../services/videoApi/videoApi"
import { LanguageContext } from "../../../../../context/LanguageContext"
import {
  CarouselContainer,
  SectionHeader,
  Title,
  CarouselWrapper,
  CarouselTrack,
  VideoCard,
  VideoThumbnail,
  VideoOverlay,
  PlayButton,
  VideoInfo,
  ChannelInfo,
  NavigationButton,
  VideoTitle,
  VideoPlayer,
  ProgressBar,
  ProgressIndicator,
  ShimmerContainer,
  ShimmerThumbnail,
  ShimmerTitle,
  ViewMoreButton,
} from "./ShortVideosSection.styles"

const  ShortsCarousel = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [progress, setProgress] = useState(0)
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const videoRefs = useRef({})
  const [visibleVideos, setVisibleVideos] = useState(5)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const { language } = useContext(LanguageContext)
  
  // Header text translations
  const headerText = {
    English: "Shorts",
    Kannada: "ಶಾರ್ಟ್ಸ್",
    Hindi: "शॉर्ट्स"
  }

  // Function to limit title words (no limit for Kannada)
  const limitWords = (text, currentLanguage) => {
    if (!text) return ""
    // No limit for Kannada, show full title
    if (currentLanguage === "Kannada") return text
    // Limit other languages to 5 words
    const wordLimit = 5
    const words = text.split(" ")
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(" ") + "..."
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await getVideos()
        if (response.success && Array.isArray(response.data)) {
          setVideos(response.data)
        } else {
          // If no videos or error, create placeholder data
          const placeholderVideos = Array(10)
            .fill()
            .map((_, index) => ({
              _id: `placeholder-${index}`,
              title: `Shorts Video ${index + 1}`,
              thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
              video_url: "",
            }))
          setVideos(placeholderVideos)
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
        // Create placeholder data on error
        const placeholderVideos = Array(10)
          .fill()
          .map((_, index) => ({
            _id: `placeholder-${index}`,
            title: `Shorts Video ${index + 1}`,
            thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
            video_url: "",
          }))
        setVideos(placeholderVideos)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])
    const buttonText = {
    English: "Show More ->",
    Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    Hindi: "और दिखाएँ ->"
  };

  useEffect(() => {
    const updateVisibleVideos = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleVideos(1)
        setIsMobile(true)
        setIsTablet(false)
      } else if (width < 768) {
        setVisibleVideos(2)
        setIsMobile(false)
        setIsTablet(true)
      } else if (width < 1024) {
        setVisibleVideos(3)
        setIsMobile(false)
        setIsTablet(true)
      } else if (width < 1280) {
        setVisibleVideos(4)
        setIsMobile(false)
        setIsTablet(false)
      } else {
        setVisibleVideos(5)
        setIsMobile(false)
        setIsTablet(false)
      }
    }
    updateVisibleVideos()
    window.addEventListener("resize", updateVisibleVideos)
    return () => {
      window.removeEventListener("resize", updateVisibleVideos)
    }
  }, [])

  // Handle video progress
  useEffect(() => {
    let interval
    if (playingVideoId && videoRefs.current[playingVideoId]) {
      interval = setInterval(() => {
        const videoElement = videoRefs.current[playingVideoId]
        if (videoElement && videoElement.duration) {
          const currentProgress = (videoElement.currentTime / videoElement.duration) * 100
          setProgress(currentProgress)
        }
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [playingVideoId])

  const handleNext = () => {
    if (currentIndex < videos.length - visibleVideos) {
      setCurrentIndex(currentIndex + 1)
      scrollToIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollToIndex(currentIndex - 1)
    }
  }

  const scrollToIndex = (index) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0]?.offsetWidth || 0
      const scrollPosition = index * cardWidth
      trackRef.current.style.transform = `translateX(-${scrollPosition}px)`
    }
  }

  const handlePlayClick = (videoId) => {
    console.log('Play button clicked for video:', videoId)
    setPlayingVideoId(videoId === playingVideoId ? null : videoId)
    setProgress(0)
  }

  // Touch and mouse events for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    const newIndex = currentIndex - Math.sign(walk) * (Math.abs(walk) > 50 ? 1 : 0)
    if (newIndex >= 0 && newIndex <= videos.length - visibleVideos) {
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }
    if (Math.abs(walk) > 50) {
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 2
    const newIndex = currentIndex - Math.sign(walk) * (Math.abs(walk) > 50 ? 1 : 0)
    if (newIndex >= 0 && newIndex <= videos.length - visibleVideos) {
      setCurrentIndex(newIndex)
      scrollToIndex(newIndex)
    }
    if (Math.abs(walk) > 50) {
      setIsDragging(false)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === containerRef.current || containerRef.current?.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          handlePrev()
          e.preventDefault()
        } else if (e.key === "ArrowRight") {
          handleNext()
          e.preventDefault()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, videos.length, visibleVideos])

  return (
    <CarouselContainer ref={containerRef} role="region" aria-labelledby="shorts-heading" tabIndex="0">
      <SectionHeader>
        <Title id="shorts-heading">{headerText[language] || "Shorts"}</Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <a href="/shorts" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                {buttonText[language] || "Show More"}
              </a>
            </div>
      </SectionHeader>
      <CarouselWrapper onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchEnd={handleMouseUp}>
        {/* Navigation buttons */}
        <NavigationButton
          direction="left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous videos"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </NavigationButton>
        <NavigationButton
          direction="right"
          onClick={handleNext}
          disabled={currentIndex >= videos.length - visibleVideos}
          aria-label="Next videos"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </NavigationButton>
        <CarouselTrack
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * (100 / visibleVideos)}%)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          role="list"
          aria-label="Video list"
        >
          {loading
            ? Array(visibleVideos)
                .fill()
                .map((_, index) => (
                  <VideoCard key={`shimmer-${index}`} role="listitem" aria-hidden="true">
                    <ShimmerContainer>
                      <ShimmerThumbnail />
                      <VideoInfo>
                        <ShimmerTitle />
                        <ChannelInfo>
                          {/* <ShimmerChannel /> */}
                          {/* <ShimmerButton /> */}
                        </ChannelInfo>
                      </VideoInfo>
                    </ShimmerContainer>
                  </VideoCard>
                ))
            : videos.map((video, index) => (
                <VideoCard key={video._id} role="listitem">
                  {playingVideoId === video._id ? (
                    <VideoPlayer>
                      <video
                        ref={(el) => (videoRefs.current[video._id] = el)}
                        controls
                        autoPlay
                        loop
                        src={
                          video.video_url || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        }
                        aria-label={`Playing: ${video[language.toLowerCase()]?.title || video.title || "Farmers' Empowerment"}`}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <ProgressBar
                        role="progressbar"
                        aria-label="Video progress"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <ProgressIndicator style={{ width: `${progress}%` }} />
                      </ProgressBar>
                    </VideoPlayer>
                  ) : (
                    <VideoThumbnail>
                      <img
                        src={video.thumbnail || "/placeholder.svg?height=400&width=225"}
                        alt={video[language.toLowerCase()]?.title || video.title || "Video thumbnail"}
                      />
                      <VideoOverlay aria-hidden="true">
                        <PlayButton
                          onClick={() => handlePlayClick(video._id)}
                          aria-label={`Play ${video.title || "video"}`}
                          tabIndex="0"
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              handlePlayClick(video._id)
                            }
                          }}
                        />
                      </VideoOverlay>
                    </VideoThumbnail>
                  )}
                  <VideoInfo>
                    <VideoTitle>
                      {limitWords(video[language.toLowerCase()]?.title || video.title || "Farmers' Empowerment", language)}
                    </VideoTitle>
                    <ChannelInfo>
                    </ChannelInfo>
                  </VideoInfo>
                </VideoCard>
              ))}
        </CarouselTrack>
      </CarouselWrapper>

    </CarouselContainer>
  )
}

export default ShortsCarousel
