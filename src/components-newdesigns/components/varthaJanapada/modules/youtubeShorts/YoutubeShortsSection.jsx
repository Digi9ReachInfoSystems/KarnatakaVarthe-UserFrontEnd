import { useState, useEffect, useRef, useContext, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fetchYoutubeShorts } from "../../../../../services/youtube/youtubeShortsService"
import { LanguageContext } from "../../../../../context/LanguageContext"
import {
  CarouselContainer,
  SectionHeader,
  Title,
  ViewMoreLink,
  CarouselWrapper,
  CarouselTrack,
  VideoCard,
  VideoThumbnail,
  VideoOverlay,
  PlayButton,
  ShortsBadge,
  VideoInfo,
  NavigationButton,
  VideoTitle,
  ShimmerContainer,
  ShimmerThumbnail,
  ShimmerTitle,
} from "./YoutubeShortsSection.styles"

const YoutubeShortsSection = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const { language } = useContext(LanguageContext)

  const headerText = {
    English: "Shorts",
    Kannada: "ಶಾರ್ಟ್ಸ್",
    Hindi: "शॉर्ट्स",
  }

  const buttonText = {
    English: "Show More ->",
    Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    Hindi: "और दिखाएँ ->",
  }

  const updateScrollButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < maxScroll - 8)
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetchYoutubeShorts(10)
        setVideos(Array.isArray(response?.data) ? response.data : [])
      } catch (error) {
        console.error("Error fetching YouTube shorts:", error)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    window.addEventListener("resize", updateScrollButtons)
    return () => {
      el.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", updateScrollButtons)
    }
  }, [videos, loading, updateScrollButtons])

  const scrollByCards = (direction) => {
    const el = trackRef.current
    if (!el) return
    // Scroll roughly one viewport of cards (5 on desktop)
    const step = Math.max(el.clientWidth * 0.95, 200)
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  const openShort = (video) => {
    const url =
      video?.url ||
      (video?.videoId
        ? `https://www.youtube.com/shorts/${video.videoId}`
        : "")
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <CarouselContainer
      ref={containerRef}
      role="region"
      aria-labelledby="youtube-shorts-heading"
      tabIndex={0}
    >
      <SectionHeader>
        <Title id="youtube-shorts-heading">
          {headerText[language] || "Shorts"}
        </Title>
        <ViewMoreLink href="/shorts">
          {buttonText[language] || "Show More"}
        </ViewMoreLink>
      </SectionHeader>

      <CarouselWrapper>
        <NavigationButton
          direction="left"
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous shorts"
          type="button"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </NavigationButton>
        <NavigationButton
          direction="right"
          onClick={() => scrollByCards(1)}
          disabled={!canScrollRight}
          aria-label="Next shorts"
          type="button"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </NavigationButton>

        <CarouselTrack ref={trackRef} role="list" aria-label="YouTube Shorts">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <VideoCard
                  as="div"
                  key={`shimmer-${index}`}
                  role="listitem"
                  aria-hidden="true"
                >
                  <ShimmerContainer>
                    <ShimmerThumbnail />
                    <ShimmerTitle />
                  </ShimmerContainer>
                </VideoCard>
              ))
            : videos.map((video) => {
                const id = video.videoId || video.id
                const title = video.title || "Short"
                return (
                  <VideoCard
                    key={id}
                    as="button"
                    type="button"
                    data-short-card
                    role="listitem"
                    onClick={() => openShort(video)}
                    aria-label={`Open short: ${title}`}
                  >
                    <VideoThumbnail>
                      <ShortsBadge>Shorts</ShortsBadge>
                      <img
                        src={
                          video.thumbnail ||
                          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                        }
                        alt=""
                        loading="lazy"
                      />
                      <VideoOverlay>
                        <PlayButton aria-hidden="true" />
                      </VideoOverlay>
                    </VideoThumbnail>
                    <VideoInfo>
                      <VideoTitle>{title}</VideoTitle>
                    </VideoInfo>
                  </VideoCard>
                )
              })}
        </CarouselTrack>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default YoutubeShortsSection
