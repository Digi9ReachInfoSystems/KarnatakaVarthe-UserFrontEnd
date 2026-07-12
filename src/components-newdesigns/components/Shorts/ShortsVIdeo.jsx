import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { fetchShortVideosPage } from "../../../services/newapis/newapis-services"
import { LanguageContext } from "../../../context/LanguageContext"
import LoadMoreSpinner from "../common/LoadMoreSpinner/LoadMoreSpinner"
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
  VideoIframe,
} from "./ShortsVideo.styles"

const PAGE_LIMIT = 20

function ShortsVIdeo() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const { language } = useContext(LanguageContext)
  const sentinelRef = useRef(null)
  const loadingMoreRef = useRef(false)

  const headerText = {
    English: "Shorts",
    Kannada: "ಶಾರ್ಟ್ಸ್",
    Hindi: "शॉर्ट्स",
  }

  const getVideoTitle = (video) => {
    const langKey =
      language === "English"
        ? "english"
        : language === "Hindi"
          ? "hindi"
          : "kannada"
    return video?.[langKey]?.title || video?.title || ""
  }

  useEffect(() => {
    let cancelled = false
    const fetchVideos = async () => {
      setLoading(true)
      setPage(1)
      setHasNextPage(false)
      try {
        const response = await fetchShortVideosPage(1, PAGE_LIMIT)
        if (cancelled) return
        if (response?.success && Array.isArray(response.data)) {
          setVideos(response.data)
          setHasNextPage(Boolean(response.pagination?.hasNextPage))
          setPage(1)
        } else {
          setVideos([])
          setHasNextPage(false)
        }
      } catch (error) {
        console.error("Error fetching short videos:", error)
        if (!cancelled) {
          setVideos([])
          setHasNextPage(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchVideos()
    return () => {
      cancelled = true
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasNextPage || loading) return
    loadingMoreRef.current = true
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const response = await fetchShortVideosPage(nextPage, PAGE_LIMIT)
      if (response?.success && Array.isArray(response.data)) {
        setVideos((prev) => [...prev, ...response.data])
        setHasNextPage(Boolean(response.pagination?.hasNextPage))
        setPage(nextPage)
      } else {
        setHasNextPage(false)
      }
    } catch (error) {
      console.error("Error loading more short videos:", error)
    } finally {
      loadingMoreRef.current = false
      setLoadingMore(false)
    }
  }, [hasNextPage, loading, page])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore, loading, hasNextPage])

  const handleVideoClick = (videoId) => {
    if (playingVideoId === videoId) {
      setPlayingVideoId(null)
    } else {
      setPlayingVideoId(videoId)
    }
  }

  const getYouTubeEmbedUrl = (url, autoplay = false) => {
    if (!url) return null

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}${autoplay ? "?autoplay=1" : ""}`
      }
    }

    return url
  }

  return (
    <VideoContainer>
      <SectionHeader>
        <Title>{headerText[language]}</Title>
      </SectionHeader>

      <VideoGridCard>
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, index) => (
              <ShimmerContainer key={index}>
                <ShimmerThumbnail />
              </ShimmerContainer>
            ))
        ) : videos.length > 0 ? (
          videos.map((video) => {
            const id = video._id?.$oid || video._id
            const title = getVideoTitle(video)
            return (
              <VideoCard key={id} onClick={() => handleVideoClick(id)}>
                {playingVideoId === id ? (
                  <VideoIframe
                    src={getYouTubeEmbedUrl(video.video_url, true)}
                    title={title || "Video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <VideoThumbnail
                      src={video.thumbnail || "/api/placeholder/225/400"}
                      alt={title || "Short video"}
                    />
                    <PlayIcon />
                    {title ? <VideoTitle>{title}</VideoTitle> : null}
                  </>
                )}
              </VideoCard>
            )
          })
        ) : (
          <p>No videos available</p>
        )}
      </VideoGridCard>

      {hasNextPage && (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          style={{ height: 1, width: "100%" }}
        />
      )}
      {loadingMore && <LoadMoreSpinner />}
    </VideoContainer>
  )
}

export default ShortsVIdeo
