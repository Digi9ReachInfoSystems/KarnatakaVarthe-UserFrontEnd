import { useState, useEffect, useContext } from "react"
import { getVideos } from "../../../services/videoApi/videoApi"
import { LanguageContext } from "../../../context/LanguageContext"
import { VideoContainer, VideoGridCard, VideoCard, VideoThumbnail, PlayIcon, VideoTitle, Title, SectionHeader, ShimmerThumbnail, ShimmerContainer } from "./ShortsVideo.styles"

function ShortsVIdeo() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
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

  const handleVideoClick = (videoUrl) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank')
    }
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
              onClick={() => handleVideoClick(video.video_url)}
            >
              <VideoThumbnail 
                src={video.thumbnail || '/api/placeholder/225/400'} 
                alt={video.title || 'Short video'}
              />
              <PlayIcon />
              {video.title && <VideoTitle>{video[language.toLowerCase()]?.title}</VideoTitle>}
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
