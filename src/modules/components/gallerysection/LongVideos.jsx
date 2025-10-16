import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { FaHeart, FaRegComment, FaShareAlt } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { SlCalender } from "react-icons/sl"
import { getLongVideos, likeLongVideo, LongVideoaddComment } from "../../../services/videoApi/videoApi"
import {
  Container,
  MainContent,
  VideoPlayerContainer,
  VideoWrapper,
  MainVideo,
  VideoInfo,
  VideoTitle,
  VideoStats,
  VideoActions,
  VideoDescription,
  CommentsContainer,
  CommentsHeader,
  CommentInput,
  CommentButton,
  ErrorMessage,
  CommentsList,
  Comment,
  UserAvatar,
  CommentContent,
  CommentHeader,
  Username,
  CommentTime,
  CommentText,
  NoComments,
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
  InteractionContainer,
  LikeContainer,
  FlexContainer2,
  LikeCount,
  CommentInputWrapper,
  CommentIcon,
} from "./LongVideos.styles"
import { IoIosTimer } from "react-icons/io"
import { BiSolidMoviePlay } from "react-icons/bi"
import { User } from "lucide-react" 
import { Helmet } from "react-helmet"
import LoginPopup from "../loginpopup/LoginPopup"

const LongVideos = () => {
  const [videosData, setVideosData] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [likedVideos, setLikedVideos] = useState(new Set())
  const [comments, setComments] = useState({})
  const [newComments, setNewComments] = useState({})
  const [userId, setUserId] = useState(null)
  const [likeCounts, setLikeCounts] = useState({})
  const [error, setError] = useState("")
  const [debouncingLike, setDebouncingLike] = useState(false)
  const [openCommentSection, setOpenCommentSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const navigate = useNavigate()

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
    const storedUserId = Cookies.get("userId")
    setUserId(storedUserId)
  }, [])

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
          // Initialize like counts and comments
          const initialLikeCounts = {}
          const initialComments = {}
          response.data.forEach((video) => {
            initialLikeCounts[video._id] = video.total_Likes || 0
            if (video.Comments && Array.isArray(video.Comments)) {
              initialComments[video._id] = video.Comments.map((comment) => ({
                ...comment,
                likes: comment.total_Likes || 0,
              }))
            } else {
              initialComments[video._id] = []
            }
          })
          setLikeCounts(initialLikeCounts)
          setComments(initialComments)
        } else {
          setVideosData([])
        }
      } catch (error) {
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
    setOpenCommentSection(null)
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

  const handleLikeClick = async (videoId) => {
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    if (debouncingLike) return
    setDebouncingLike(true)
    setTimeout(async () => {
      try {
        const isLiked = likedVideos.has(videoId)
        const likeData = { longVideoId: videoId, userId }
        const response = await likeLongVideo(likeData)
        const newLikedVideos = new Set(likedVideos)
        isLiked ? newLikedVideos.delete(videoId) : newLikedVideos.add(videoId)
        setLikedVideos(newLikedVideos)
        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [videoId]: response.data?.total_Likes || prevCounts[videoId] + (isLiked ? -1 : 1),
        }))
      } catch (error) {
      } finally {
        setDebouncingLike(false)
      }
    }, 500)
  }

  const handleCommentChange = (videoId, e) => {
    setNewComments((prevComments) => ({
      ...prevComments,
      [videoId]: e.target.value,
    }))
  }

  const handleAddComment = async (videoId) => {
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    const commentText = newComments[videoId]?.trim()
    if (!commentText) {
      alert("Please enter a comment.")
      return
    }
    const commentData = { text: commentText, videoId, userId }
    try {
      const response = await LongVideoaddComment(commentData)
      const newComment = response.data?.comment
      setComments((prevComments) => ({
        ...prevComments,
        [videoId]: [...(prevComments[videoId] || []), newComment],
      }))
      setNewComments((prevComments) => ({
        ...prevComments,
        [videoId]: "",
      }))
      setError("")
      window.location.reload()
    } catch (err) {
      setError("Failed to add comment. Please try again.")
    }
  }

  const toggleCommentSection = (videoId) => {
    if (!isUserLoggedIn()) {
      setShowLoginPopup(true)
      return
    }
    setOpenCommentSection(openCommentSection === videoId ? null : videoId)
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
          <InteractionContainer>
            <ShimmerEffect height="40px" width="200px" />
            <ShimmerEffect height="40px" width="300px" />
          </InteractionContainer>
          <ShimmerEffect height="24px" width="30%" marginBottom="16px" />
          {[1, 2, 3].map((item) => (
            <div key={item} style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <ShimmerEffect height="44px" width="44px" style={{ borderRadius: "50%" }} />
              <div style={{ flex: 1 }}>
                <ShimmerEffect height="16px" width="60%" marginBottom="8px" />
                <ShimmerEffect height="40px" width="100%" marginBottom="8px" />
              </div>
            </div>
          ))}
        </VideoPlayerContainer>
        <VideoSidebar>
          <ShimmerEffect height="28px" width="50%" marginBottom="20px" />
          {[1, 2, 3, 4].map((item) => (
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

  return (
      <>
    {selectedVideo && (
      <Helmet>
        <title>{selectedVideo.title} | Karnataka Varthe</title>
        <meta name="description" content={selectedVideo.description?.slice(0, 160) || "Watch in-depth stories and documentaries on Karnataka Varthe."} />
        <meta property="og:title" content={selectedVideo.title} />
        <meta property="og:description" content={selectedVideo.description?.slice(0, 160) || "Watch in-depth stories and documentaries on Karnataka Varthe."} />
        <meta property="og:type" content="video.other" />
        <meta property="og:image" content={selectedVideo.thumbnail || "/default-longvideo-thumb.jpg"} />
        <meta property="og:url" content={window.location.href} />
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={selectedVideo.title} />
        <meta name="twitter:description" content={selectedVideo.description?.slice(0, 160) || "Watch engaging long-form videos."} />
        <meta name="twitter:image" content={selectedVideo.thumbnail || "/default-longvideo-thumb.jpg"} /> */}
      </Helmet>
    )}
    <Container role="main" aria-label="Long Videos Section">
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
                  <VideoActions>
                    <button
                      onClick={() => handleLikeClick(selectedVideo._id)}
                      aria-label={likedVideos.has(selectedVideo._id) ? "Unlike video" : "Like video"}
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleLikeClick(selectedVideo._id)
                        }
                      }}
                    >
                      <FaHeart
                        size={24}
                        color={likedVideos.has(selectedVideo._id) ? "#e74c3c" : "#6c757d"}
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      onClick={() => alert("Share functionality coming soon!")}
                      aria-label="Share video"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          alert("Share functionality coming soon!")
                        }
                      }}
                    >
                      <FaShareAlt size={24} color="#000000" aria-hidden="true" />
                    </button>
                  </VideoActions>
                </VideoStats>
                <VideoDescription>{selectedVideo.description}</VideoDescription>
              </VideoInfo>

              <CommentsContainer>
                <InteractionContainer>
                  <LikeContainer>
                    <FlexContainer2>
                      <button
                        onClick={() => handleLikeClick(selectedVideo._id)}
                        aria-label={likedVideos.has(selectedVideo._id) ? "Unlike video" : "Like video"}
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleLikeClick(selectedVideo._id)
                          }
                        }}
                      >
                        <FaHeart
                          size={28}
                          color={likedVideos.has(selectedVideo._id) ? "#e74c3c" : "#6c757d"}
                          aria-hidden="true"
                        />
                      </button>
                      <LikeCount>{likeCounts[selectedVideo._id] || 0}</LikeCount>
                      <button
                        onClick={() => toggleCommentSection(selectedVideo._id)}
                        aria-label={openCommentSection === selectedVideo._id ? "Hide comments" : "Show comments"}
                        tabIndex="0"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            toggleCommentSection(selectedVideo._id)
                          }
                        }}
                      >
                        <FaRegComment size={24} color="#000000" aria-hidden="true" />
                      </button>
                    </FlexContainer2>
                  </LikeContainer>
                  <CommentInputWrapper>
                    <CommentIcon aria-hidden="true" />
                    <CommentInput
                      type="text"
                      value={newComments[selectedVideo._id] || ""}
                      onChange={(e) => handleCommentChange(selectedVideo._id, e)}
                      placeholder="Write a Comments"
                      aria-label="Write a comment"
                      tabIndex="0"
                    />
                    <CommentButton
                      onClick={() => handleAddComment(selectedVideo._id)}
                      aria-label="Send comment"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleAddComment(selectedVideo._id)
                        }
                      }}
                    >
                      Send
                    </CommentButton>
                  </CommentInputWrapper>
                </InteractionContainer>
                {error && <ErrorMessage role="alert">⚠️ {error}</ErrorMessage>}
                <AnimatePresence>
                  {openCommentSection === selectedVideo._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      role="region"
                      aria-label="Comments section"
                    >
                      <CommentsHeader>
                        <FaRegComment aria-hidden="true" /> Comments ({comments[selectedVideo._id]?.length || 0})
                      </CommentsHeader>
                      <CommentsList role="list">
                        {comments[selectedVideo._id]?.length > 0 ? (
                          comments[selectedVideo._id].map((comment, index) => (
                            <Comment
                              key={comment._id}
                              isEven={index % 2 === 0}
                              role="listitem"
                              tabIndex="0"
                              aria-label={`Comment by ${comment.user?.displayName || "Anonymous User"}: ${comment.comment}`}
                            >
                              {comment.user?.profileImage ? (
                                <UserAvatar
                                  src={comment.user?.profileImage}
                                  alt={`${comment.user?.displayName}'s profile picture`}
                                />
                              ) : (
                                <User size={44} color="#6c757d" aria-hidden="true" /> // Placeholder icon
                              )}
                              <CommentContent>
                                <CommentHeader>
                                  <Username>{comment.user?.displayName || "Anonymous User"}</Username>
                                  <CommentTime>
                                    <IoIosTimer style={{ color: "#000000" }} aria-hidden="true" />{" "}
                                    {new Date(comment.createdTime).toLocaleTimeString()}
                                  </CommentTime>
                                </CommentHeader>
                                <CommentText>{comment.comment}</CommentText>
                              </CommentContent>
                            </Comment>
                          ))
                        ) : (
                          <NoComments role="status" aria-live="polite">
                            💭 No comments yet. Be the first to share your thoughts!
                          </NoComments>
                        )}
                      </CommentsList>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CommentsContainer>
            </>
          )}
        </VideoPlayerContainer>

        <VideoSidebar role="complementary" aria-label="More Videos">
          <SidebarHeader>
            <BiSolidMoviePlay style={{ color: "#000000" }} aria-hidden="true" /> More Videos
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
      
      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={handleLoginRedirect} 
        onCloseOnly={closeLoginPopup}
        title="Access Video Features?"
        subtitle="Login to like and comment on videos."
      />
    </Container>
    </>
  )
}

export default LongVideos
