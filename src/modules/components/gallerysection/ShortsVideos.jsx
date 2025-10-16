import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Heart, MessageCircle, Send, X,  MoreVertical } from "lucide-react"
import { getVideos, ShortlikeVideo, ShortVideoaddComment } from "../../../services/videoApi/videoApi"
import {
  CarouselContainer,
  CarouselHeader,
  CarouselTitle,
  CarouselWrapper,
  CarouselTrack,
  VideoCard,
  VideoThumbnail,
  VideoOverlay,
  PlayButton,
  VideoInfo,
  VideoTitle,
  VideoPlayer,
  ProgressBar,
  ProgressIndicator,
  ShimmerContainer,
  ShimmerThumbnail,
  ShimmerTitle,
  NavigationButton,
  // Interaction components
  InteractionSidebar,
  ActionButton,
  ActionCount,
  CommentPopupOverlay,
  CommentPopupContent,
  CommentPopupHeader,
  CommentPopupTitle,
  CommentPopupClose,
  CommentList,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentText,
  CommentTime,
  CommentInputContainer,
  CommentInput,
  CommentSubmitButton,
  // Additional components
  VideoMetadata,
  ChannelInfo,
  ChannelAvatar,
  ChannelName,
  VideoDescription,
  VideoStats,
  ViewAllButton,
  CarouselTitleWrapper,
  VideoDuration,
  NoCommentsContainer,
} from "./ShortsVideos.styles"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import Cookies from "js-cookie"
import { Helmet } from "react-helmet"
import LoginPopup from "../loginpopup/LoginPopup"
import { useNavigate } from "react-router-dom"

const ShortsCarousel2 = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [progress, setProgress] = useState(0)
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [visibleVideos, setVisibleVideos] = useState(5)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // New state for likes and comments
  const [likedVideos, setLikedVideos] = useState({})
  const [likeCounts, setLikeCounts] = useState({})
  const [comments, setComments] = useState({})
  const [commentInput, setCommentInput] = useState("")
  const [showCommentPopup, setShowCommentPopup] = useState(false)
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [debouncingLike, setDebouncingLike] = useState(false)
  const [submittingComment, setSubmittingComment] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const userId = Cookies.get("userId")
    return !!userId
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false)
  }

  const handleLoginRedirect = () => {
    // Store current page URL in cookie for redirect after login
    const currentUrl = window.location.pathname + window.location.search
    Cookies.set("redirectUrl", currentUrl, { expires: 1 }) // Expires in 1 day
    closeLoginPopup()
    navigate('/login')
  }

  useEffect(() => {
    // Get user ID from cookies
    const storedUserId = Cookies.get("userId")
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await getVideos()
        if (response.success && Array.isArray(response.data)) {
          setVideos(response.data)

          // Initialize like counts and comments from API data
          const initialLikeCounts = {}
          const initialComments = {}
          const initialLikedStatus = {}

          response.data.forEach((video) => {
            initialLikeCounts[video._id] = video.total_Likes || 0
            initialComments[video._id] = video.Comments || []
            initialLikedStatus[video._id] = false // We'll need to check if user liked it in a real app
          })

          setLikeCounts(initialLikeCounts)
          setComments(initialComments)
          setLikedVideos(initialLikedStatus)
        } else {
          // If no videos or error, create placeholder data
          const placeholderVideos = Array(10)
            .fill()
            .map((_, index) => ({
              _id: `placeholder-${index}`,
              title: `Shorts Video ${index + 1}`,
              description: `This is a description for video ${index + 1}`,
              thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
              video_url: "",
              total_Likes: Math.floor(Math.random() * 1000),
              channel: {
                name: `Channel ${index + 1}`,
                avatar: `/placeholder.svg?height=40&width=40&text=C${index + 1}`,
              },
              Comments: [],
            }))
          setVideos(placeholderVideos)
        }
      } catch (error) {
        // Create placeholder data on error
        const placeholderVideos = Array(10)
          .fill()
          .map((_, index) => ({
            _id: `placeholder-${index}`,
            title: `Shorts Video ${index + 1}`,
            description: `This is a description for video ${index + 1}`,
            thumbnail: `/placeholder.svg?height=400&width=225&text=Video ${index + 1}`,
            video_url: "",
            total_Likes: Math.floor(Math.random() * 1000),
            channel: {
              name: `Channel ${index + 1}`,
              avatar: `/placeholder.svg?height=40&width=40&text=C${index + 1}`,
            },
            Comments: [],
          }))
        setVideos(placeholderVideos)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

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
    if (playingVideoId && videoRef.current) {
      interval = setInterval(() => {
        if (videoRef.current) {
          const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
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
    // If clicking the same video, toggle play/pause
    if (videoId === playingVideoId) {
      setPlayingVideoId(null)
    } else {
      setPlayingVideoId(videoId)
    }
  }

  // Handle like functionality
  const handleLikeClick = async (videoId, event) => {
    // Prevent event from bubbling up to parent elements
    event.stopPropagation()

    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }

    if (debouncingLike) return
    setDebouncingLike(true)

    try {
      // Toggle like status
      const newLikedStatus = !likedVideos[videoId]

      // Update UI immediately for better UX
      setLikedVideos((prev) => ({ ...prev, [videoId]: newLikedStatus }))
      setLikeCounts((prev) => ({
        ...prev,
        [videoId]: newLikedStatus ? prev[videoId] + 1 : Math.max(prev[videoId] - 1, 0),
      }))

      // Call API to update like status
      await ShortlikeVideo({ videoId, userId })
    } catch (error) {
      // Revert UI changes on error
      setLikedVideos((prev) => ({ ...prev, [videoId]: !prev[videoId] }))
      setLikeCounts((prev) => ({
        ...prev,
        [videoId]: !likedVideos[videoId] ? prev[videoId] + 1 : Math.max(prev[videoId] - 1, 0),
      }))
      alert("Failed to like video. Please try again.")
    } finally {
      setTimeout(() => setDebouncingLike(false), 500)
    }
  }

  // Toggle comment section visibility
  const handleCommentClick = (videoId, event) => {
    event.stopPropagation()
    
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    
    setActiveVideoId(videoId)
    setShowCommentPopup(true)
  }

  // Submit a new comment
  const handleSubmitComment = async (event) => {
    event.preventDefault()
    if (submittingComment) return // prevent double submit
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    if (!commentInput?.trim()) {
      return
    }
    setSubmittingComment(true)
    try {
      // Call API to add comment
      const response = await ShortVideoaddComment({
        text: commentInput,
        videoId: activeVideoId,
        userId,
      })
      // After adding, refetch comments for this video
      if (response && response.comment) {
        try {
          const videosResponse = await getVideos();
          if (videosResponse.success && Array.isArray(videosResponse.data)) {
            const video = videosResponse.data.find(v => v._id === activeVideoId);
            setComments((prev) => ({
              ...prev,
              [activeVideoId]: video?.Comments || [],
            }));
          }
        } catch (fetchErr) {
          // fallback: just append the comment if fetch fails
          setComments((prev) => {
            const prevList = prev[activeVideoId] || [];
            if (prevList.some(c => c._id === response.comment._id)) {
              return prev;
            }
            return {
              ...prev,
              [activeVideoId]: [...prevList, response.comment],
            };
          });
        }
        setCommentInput("");
        setShowCommentPopup(false); // Close the popup after adding
        setActiveVideoId(null);
      }
    } catch (error) {
      alert("Failed to add comment. Please try again.")
    } finally {
      setSubmittingComment(false)
    }
  }

  // Close comment popup
  const closeCommentPopup = () => {
    setShowCommentPopup(false)
    setActiveVideoId(null)
    setCommentInput("")
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

  // Format date for comments
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  // Format count numbers
  const formatCount = (count) => {
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  const navigate = useNavigate()

  return (
    <>
    <Helmet>
  <title>Short Videos | Karnataka Varthe</title>
  <meta name="description" content="Watch short and engaging videos on topics ranging from news, culture, empowerment and more." />
  <meta property="og:title" content="Short Videos | Karnataka Varthe" />
  <meta property="og:description" content="Explore trending short videos recommended just for you." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/default-short-video-thumbnail.jpg" />
  <meta property="og:url" content={window.location.href} />
  {/* <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Short Videos | Karnataka Varthe" />
  <meta name="twitter:description" content="Explore trending short videos recommended just for you." />
  <meta name="twitter:image" content="/default-short-video-thumbnail.jpg" /> */}
</Helmet>

    <CarouselContainer ref={containerRef}>
      <CarouselHeader>
        <CarouselTitleWrapper>
          <CarouselTitle>Shorts</CarouselTitle>
        </CarouselTitleWrapper>
      </CarouselHeader>

      <CarouselWrapper onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchEnd={handleMouseUp}>
        {!isMobile && (
          <NavigationButton direction="left" onClick={handlePrev} disabled={currentIndex === 0 || loading}>
            <ChevronLeft size={24} />
          </NavigationButton>
        )}

        <CarouselTrack
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * (100 / visibleVideos)}%)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {loading
            ? Array(visibleVideos)
                .fill()
                .map((_, index) => (
                  <VideoCard key={`shimmer-${index}`}>
                    <ShimmerContainer>
                      <ShimmerThumbnail />
                      <VideoInfo>
                        <ShimmerTitle />
                      </VideoInfo>
                    </ShimmerContainer>
                  </VideoCard>
                ))
            : videos.map((video) => (
                <VideoCard key={video._id}>
                  {playingVideoId === video._id ? (
                    <VideoPlayer>
                      <video
                        ref={videoRef}
                        controls
                        autoPlay
                        loop
                        src={
                          video.video_url || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        }
                      >
                        Your browser does not support the video tag.
                      </video>
                      <ProgressBar>
                        <ProgressIndicator style={{ width: `${progress}%` }} />
                      </ProgressBar>

                      {/* Interaction sidebar for likes and comments */}
                      <InteractionSidebar>
                        <ActionButton isActive={likedVideos[video._id]} onClick={(e) => handleLikeClick(video._id, e)}>
                          <Heart size={24} fill={likedVideos[video._id] ? "#ff0000" : "none"} />
                          <ActionCount>{formatCount(likeCounts[video._id] || 0)}</ActionCount>
                        </ActionButton>

                        <ActionButton onClick={(e) => handleCommentClick(video._id, e)}>
                          <MessageCircle size={24} />
                          <ActionCount>{formatCount(comments[video._id]?.length || 0)}</ActionCount>
                        </ActionButton>

                      </InteractionSidebar>

                      {/* Video metadata */}
                      <VideoMetadata>
                      
                        <VideoDescription>{video.description || video.title}</VideoDescription>
                    
                      </VideoMetadata>
                    </VideoPlayer>
                  ) : (
                    <VideoThumbnail>
                      <img src={video.thumbnail || "/placeholder.svg?height=400&width=225"} alt={video.title} />
                      <VideoOverlay>
                        <PlayButton onClick={() => handlePlayClick(video._id)}>
                          <Play size={30} />
                        </PlayButton>
                      </VideoOverlay>
                    </VideoThumbnail>
                  )}

                  <VideoInfo>
                    <VideoTitle>{video.title || "Farmers' Empowerment"}</VideoTitle>
                  </VideoInfo>
                </VideoCard>
              ))}
        </CarouselTrack>

        {!isMobile && (
          <NavigationButton
            direction="right"
            onClick={handleNext}
            disabled={currentIndex >= videos.length - visibleVideos || loading}
          >
            <ChevronRight size={24} />
          </NavigationButton>
        )}
      </CarouselWrapper>

      {/* Comment Popup */}
      {showCommentPopup && activeVideoId && (
        <CommentPopupOverlay onClick={closeCommentPopup}>
          <CommentPopupContent onClick={(e) => e.stopPropagation()}>
            <CommentPopupHeader>
              <CommentPopupTitle>Comments ({comments[activeVideoId]?.length || 0})</CommentPopupTitle>
              <CommentPopupClose onClick={closeCommentPopup}>
                <X size={24} />
              </CommentPopupClose>
            </CommentPopupHeader>

            <CommentList>
              {comments[activeVideoId]?.length > 0 ? (
                comments[activeVideoId].map((comment, index) => (
                  <CommentItem key={comment._id || index}>
                    <CommentAvatar>
                      <img
                        src={comment.user?.avatar || "/placeholder.svg?height=32&width=32"}
                        alt={comment.user?.displayName || "User"}
                      />
                    </CommentAvatar>
                    <CommentContent>
                      <CommentAuthor>{comment.user?.displayName || "Anonymous"}</CommentAuthor>
                      <CommentText>{comment.comment || comment.text}</CommentText>
                      <CommentTime>{formatDate(comment.createdTime || comment.createdAt)}</CommentTime>
                    </CommentContent>
                  </CommentItem>
                ))
              ) : (
                <NoCommentsContainer>
                  <MessageCircle size={48} />
                  <p>No comments yet. Be the first to comment!</p>
                </NoCommentsContainer>
              )}
            </CommentList>

            <CommentInputContainer>
              <form onSubmit={handleSubmitComment} style={{ display: "flex", width: "100%", gap: "12px" }}>
                <CommentInput
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <CommentSubmitButton type="submit" disabled={!commentInput?.trim() || submittingComment}>
                  <Send size={20} />
                </CommentSubmitButton>
              </form>
            </CommentInputContainer>
          </CommentPopupContent>
        </CommentPopupOverlay>
      )}
      
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={handleLoginRedirect} 
        onCloseOnly={closeLoginPopup}
        title="Access Video Features?"
        subtitle="Login to like and comment on videos."
      />
    </CarouselContainer>
    </>
  )
}

export default ShortsCarousel2;
