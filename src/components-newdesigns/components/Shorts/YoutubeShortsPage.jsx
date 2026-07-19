import { useState, useEffect, useContext } from "react"
import { fetchYoutubeShorts } from "../../../services/youtube/youtubeShortsService"
import { LanguageContext } from "../../../context/LanguageContext"
import {
  VideoContainer,
  VideoGridCard,
  VideoCard,
  VideoThumbnail,
  PlayIcon,
  VideoTitle,
  Title,
  SectionHeader,
  ShimmerThumbnail,
  ShimmerContainer,
  EmptyState,
} from "./YoutubeShortsPage.styles"

function YoutubeShortsPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useContext(LanguageContext)

  const headerText = {
    English: "Shorts",
    Kannada: "ಶಾರ್ಟ್ಸ್",
    Hindi: "शॉर्ट्स",
  }

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetchYoutubeShorts(20)
        if (!cancelled) {
          setVideos(Array.isArray(response?.data) ? response.data : [])
        }
      } catch (error) {
        console.error("Error fetching YouTube shorts page:", error)
        if (!cancelled) setVideos([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const openShort = (video) => {
    const url =
      video?.url ||
      (video?.videoId
        ? `https://www.youtube.com/shorts/${video.videoId}`
        : "")
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <VideoContainer>
      <SectionHeader>
        <Title>{headerText[language] || "Shorts"}</Title>
      </SectionHeader>

      <VideoGridCard>
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ShimmerContainer key={index}>
              <ShimmerThumbnail />
            </ShimmerContainer>
          ))
        ) : videos.length > 0 ? (
          videos.map((video) => {
            const id = video.videoId
            const title = video.title || "Short"
            return (
              <VideoCard
                key={id}
                type="button"
                onClick={() => openShort(video)}
                aria-label={`Open short: ${title}`}
              >
                <VideoThumbnail
                  src={
                    video.thumbnail ||
                    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                  }
                  alt=""
                  loading="lazy"
                />
                <PlayIcon />
                {title ? <VideoTitle>{title}</VideoTitle> : null}
              </VideoCard>
            )
          })
        ) : (
          <EmptyState>No shorts available</EmptyState>
        )}
      </VideoGridCard>
    </VideoContainer>
  )
}

export default YoutubeShortsPage
