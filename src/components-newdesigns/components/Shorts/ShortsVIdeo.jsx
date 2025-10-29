import { useState, useEffect, useContext } from "react"
import { getVideos } from "../../../services/videoApi/videoApi"
import { LanguageContext } from "../../../context/LanguageContext"
import { VideoContainer, VideoGridCard, VideoCard, VideoThumbnail, PlayIcon, VideoTitle, Title, SectionHeader, ShimmerThumbnail, ShimmerContainer, VideoIframe } from "./ShortsVideo.styles"

function ShortsVIdeo() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const { language } = useContext(LanguageContext)
        const headerText = {
    English: "Shorts",
    Kannada: "ಶಾರ್ಟ್ಸ್",
    Hindi: "शॉर्ट्स"
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

  const handleVideoClick = (videoId) => {
    if (playingVideoId === videoId) {
      setPlayingVideoId(null) // Stop playing if clicked again
    } else {
      setPlayingVideoId(videoId) // Play the clicked video
    }
  }

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url, autoplay = false) => {
    if (!url) return null
    
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}${autoplay ? '?autoplay=1' : ''}`
      }
    }
    
    // If it's already an embed URL or other video URL, return as is
    return url
  }

  return (
    <VideoContainer>
      <SectionHeader>
        <Title>{headerText[language]}</Title>
      </SectionHeader>

      <VideoGridCard>
        {loading ? (
          Array(8).fill(0).map((_, index) => (
            <ShimmerContainer key={index}>
              <ShimmerThumbnail />
            </ShimmerContainer>
          ))
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard 
              key={video._id} 
              onClick={() => handleVideoClick(video._id)}
            >
              {playingVideoId === video._id ? (
                <VideoIframe
                  src={getYouTubeEmbedUrl(video.video_url, true)}
                  title={video.title || 'Video player'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <VideoThumbnail 
                    src={video.thumbnail || '/api/placeholder/225/400'} 
                    alt={video.title || 'Short video'}
                  />
                  <PlayIcon />
                  {video.title && <VideoTitle>{video[language.toLowerCase()]?.title}</VideoTitle>}
                </>
              )}
            </VideoCard>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </VideoGridCard>
    </VideoContainer>
  )
}

export default ShortsVIdeo
