import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SlCalender } from "react-icons/sl"
import { getLongVideos } from "../../../../services/videoApi/videoApi"
import {
  Container,
  MainContent,
  VideoPlayerContainer,
  VideoWrapper,
  MainVideo,
  VideoInfo,
  VideoTitle,
  VideoStats,
  VideoDescription,
  VideoSidebar,
  SidebarHeader,
  VideoList,
  VideoItem,
  ThumbnailContainer,
  Thumbnail,
  VideoItemInfo,
  VideoItemTitle,
  VideoItemViews,
  ShimmerEffect,
  CarouselHeader,
    CarouselTitle,
    CarouselTitleWrapper,
  TopBar,
  ViewAllButton,
  SeeMoreButton
} from "./HomeLongvideos.styles"
import { BiSolidMoviePlay } from "react-icons/bi"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"

const HomeVideos = () => {
  const [videosData, setVideosData] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const response = await getLongVideos()
        if (response.success && Array.isArray(response.data)) {
          setVideosData(response.data)
          if (response.data.length > 0) {
            setSelectedVideo(response.data[0])
            setPlayingVideoId(response.data[0]._id)
          }
        } else {
          setVideosData([])
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
        setVideosData([])
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
    setPlayingVideoId(video._id)
    // Force the video to load and play
    setTimeout(() => {
      const videoElement = document.getElementById(video._id)
      if (videoElement) {
        videoElement.load() // Reload the video source
        videoElement.play().catch((error) => {
        })
      }
    }, 100)
  }

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <Container>
      <MainContent>
        <VideoPlayerContainer>
          <ShimmerEffect height="400px" marginBottom="20px" />
          <ShimmerEffect height="32px" width="70%" marginBottom="12px" />
          <ShimmerEffect height="20px" width="40%" marginBottom="16px" />
          <ShimmerEffect height="80px" width="100%" marginBottom="24px" />
        </VideoPlayerContainer>
        <VideoSidebar>
          <ShimmerEffect height="28px" width="50%" marginBottom="20px" />
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <ShimmerEffect height="78px" width="140px" />
              <div style={{ flex: 1 }}>
                <ShimmerEffect height="16px" width="100%" marginBottom="8px" />
                <ShimmerEffect height="14px" width="60%" />
              </div>
            </div>
          ))}
        </VideoSidebar>
      </MainContent>
    </Container>
  )

  if (loading) {
    return <SkeletonLoader />
  }

  // Top bar for Karnataka Varthe and View All
  const handleViewAll = () => {
    navigate("/gallery")
  }

  return (
    <Container role="main" aria-label="Long Videos Section">
           <CarouselHeader>
             <CarouselTitle>Karnataka Varthe</CarouselTitle>
             <CarouselTitleWrapper onClick={() => navigate("/gallery")}>
               View All <MdOutlineKeyboardDoubleArrowRight style={{ fontSize: "1.5rem" }} aria-hidden="true" />
             </CarouselTitleWrapper>
           </CarouselHeader>
      <MainContent>
        <VideoPlayerContainer>
          {selectedVideo && (
            <>
              <VideoWrapper>
                <MainVideo
                  key={selectedVideo._id}
                  id={selectedVideo._id}
                  controls
                  autoPlay
                  // onLoadStart={() => console.log("Video loading started")}
                  // onCanPlay={() => console.log("Video can play")}
                  aria-label={`Main video: ${selectedVideo.title}`}
                >
                  <source src={selectedVideo.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </MainVideo>
              </VideoWrapper>
              <VideoInfo>
                <VideoTitle>{selectedVideo.title}</VideoTitle>
                <VideoStats>
                  <span aria-label={`Published on ${new Date(selectedVideo.createdAt).toLocaleDateString()}`}>
                    <SlCalender style={{ color: "#000000", marginRight: "5px" }} aria-hidden="true" />
                    {new Date(selectedVideo.createdAt).toLocaleDateString()}
                  </span>
                </VideoStats>
                <VideoDescription>{selectedVideo.description}</VideoDescription>
              </VideoInfo>
            </>
          )}
        </VideoPlayerContainer>
        <VideoSidebar role="complementary" aria-label="More Videos">
          <SidebarHeader>
            <BiSolidMoviePlay style={{ color: "#000000" }} aria-hidden="true" /> Watch Next
          </SidebarHeader>
          <VideoList role="list">
            {videosData.map((video) => (
              <VideoItem
                key={video._id}
                className={selectedVideo?._id === video._id ? "active" : ""}
                onClick={() => {
                  handleVideoSelect(video)
                }}
                tabIndex="0"
                role="button"
                aria-label={`Play video: ${video.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleVideoSelect(video)
                  }
                }}
              >
                <ThumbnailContainer>
                  <Thumbnail
                    src={video.thumbnail || "/placeholder.svg?height=78&width=140&query=video thumbnail"}
                    alt={`Thumbnail for ${video.title}`}
                  />
                </ThumbnailContainer>
                <VideoItemInfo>
                  <VideoItemTitle>{video.title}</VideoItemTitle>
                  <VideoItemViews>
                    <SlCalender style={{ color: "#000000" }} aria-hidden="true" />{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                  </VideoItemViews>
                </VideoItemInfo>
              </VideoItem>
            ))}
          </VideoList>
        </VideoSidebar>
      </MainContent>
    </Container>
  )
}

export default HomeVideos
