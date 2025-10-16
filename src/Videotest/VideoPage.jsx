import { useState, useEffect, useRef, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaDownload,
  FaEllipsisH,
  FaBell,
  FaPlay,
  FaExpand,
  FaPause,
} from "react-icons/fa";
import { getVideoById, likeLongVideo, LongVideoaddComment, getLongVideos } from "../services/videoApi/videoApi";
import { formatTimeAgo, formatViewCount, formatSubscriberCount } from "../utils/formatters";
import { VideoPageContainer, MainContent, VideoPlayerContainer, VideoElement, VideoControls, ControlButton, VideoTitle, VideoStats, ViewsAndDate, ActionButtons, ActionButton, ChannelInfo, ChannelDetails, ChannelAvatar, AvatarImg, ChannelText, ChannelName, SubscriberCount, SubscribeButton, BellButton, VideoDescription, DescriptionText, CommentsSection, CommentsHeader, CommentCount, AddCommentContainer, CommentAvatar, CommentInputContainer, CommentInput, CommentActions, CommentButton, CommentsList, CommentItem, CommentContent, CommentHeader, CommentAuthor, CommentTime, CommentText, CommentActions2, CommentAction, RelatedVideos, RelatedHeader, RelatedVideosList, RelatedVideoItem, RelatedThumbnail, RelatedThumbnailImg, RelatedDuration, RelatedVideoInfo, RelatedVideoTitle, RelatedChannelName, RelatedVideoStats, LoadingContainer, ErrorContainer } from "./VideoPage.styles";

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const videoRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        
        // Fetch the current video
        const videoData = await getVideoById(id);
        
        if (!videoData) {
          setError("Video not found");
          return;
        }

        setVideo(videoData);
        
        // Set comments if available
        if (videoData.Comments && Array.isArray(videoData.Comments)) {
          setComments(videoData.Comments);
        }

        // Check if user has liked the video
        if (userId && videoData.likes && videoData.likes.includes(userId)) {
          setLiked(true);
        }

        // Fetch related videos (using a separate API call or filtering)
        const allVideos = await getLongVideos();
        if (allVideos.success && Array.isArray(allVideos.data)) {
          // Filter out current video and get 4 random videos
          const filteredVideos = allVideos.data
            .filter(v => v._id !== id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setRelatedVideos(filteredVideos);
        }

      } catch (err) {
        setError("An error occurred while fetching the video");
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoData();
    } else {
      setError("No video ID provided");
      setLoading(false);
    }
  }, [id, userId]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleLike = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await likeLongVideo({ longVideoId: id, userId });

      if (response.success) {
        setLiked(!liked);
        if (disliked) setDisliked(false);

        setVideo(prev => ({
          ...prev,
          total_Likes: liked ? prev.total_Likes - 1 : prev.total_Likes + 1,
          likes: liked 
            ? prev.likes.filter(id => id !== userId)
            : [...prev.likes, userId]
        }));
      }
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await LongVideoaddComment({
        text: comment,
        videoId: id,
        userId,
      });

      if (response.data?.comment) {
        setComments([response.data.comment, ...comments]);
        setComment("");
        
        // Update video comment count
        setVideo(prev => ({
          ...prev,
          total_Comments: (prev.total_Comments || 0) + 1
        }));
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  if (loading) {
    return <LoadingContainer>Loading video...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!video) {
    return <ErrorContainer>Video not found</ErrorContainer>;
  }

  return (
    <VideoPageContainer>
      <MainContent>
        <VideoPlayerContainer>
          <VideoElement
            ref={videoRef}
            poster={video.thumbnail}
            controls
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          >
            <source src={video.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </VideoElement>
          <VideoControls>
            <ControlButton onClick={handlePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </ControlButton>
            <ControlButton onClick={handleFullscreen}>
              <FaExpand />
            </ControlButton>
          </VideoControls>
        </VideoPlayerContainer>

        <VideoTitle>{video.title}</VideoTitle>

        <VideoStats>
          <ViewsAndDate>
            {formatViewCount(video.total_Views || 0)} views • {formatTimeAgo(video.createdAt)}
          </ViewsAndDate>
          <ActionButtons>
            <ActionButton active={liked} onClick={handleLike}>
              <FaThumbsUp /> {video.total_Likes || 0}
            </ActionButton>
            <ActionButton active={disliked} onClick={handleDislike}>
              <FaThumbsDown />
            </ActionButton>
            <ActionButton>
              <FaShare /> Share
            </ActionButton>
            <ActionButton>
              <FaDownload /> Download
            </ActionButton>
            <ActionButton>
              <FaEllipsisH />
            </ActionButton>
          </ActionButtons>
        </VideoStats>

        <ChannelInfo>
          <ChannelDetails>
            <ChannelAvatar>
              <AvatarImg
                src={video.channel?.profileImage || "/placeholder.svg?height=48&width=48"}
                alt={video.channel?.name || "Channel"}
              />
            </ChannelAvatar>
            <ChannelText>
              <ChannelName>{video.channel?.name || "Channel Name"}</ChannelName>
              <SubscriberCount>
                {formatSubscriberCount(video.channel?.subscribers || 0)} subscribers
              </SubscriberCount>
            </ChannelText>
          </ChannelDetails>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SubscribeButton onClick={handleSubscribe}>
              {subscribed ? "Subscribed" : "Subscribe"}
            </SubscribeButton>
            {subscribed && (
              <BellButton>
                <FaBell />
              </BellButton>
            )}
          </div>
        </ChannelInfo>

        <VideoDescription>
          <DescriptionText>{video.description || "No description available."}</DescriptionText>
        </VideoDescription>

        <CommentsSection>
          <CommentsHeader>
            <CommentCount>{video.total_Comments || comments.length} Comments</CommentCount>
          </CommentsHeader>

          {userId && (
            <AddCommentContainer>
              <CommentAvatar>
                <AvatarImg 
                  src={video.user?.profileImage || "/placeholder.svg?height=40&width=40"} 
                  alt="Your avatar" 
                />
              </CommentAvatar>
              <CommentInputContainer>
                <CommentInput
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <CommentActions>
                  <CommentButton onClick={() => setComment("")}>Cancel</CommentButton>
                  <CommentButton 
                    primary 
                    disabled={!comment.trim()} 
                    onClick={handleCommentSubmit}
                  >
                    Comment
                  </CommentButton>
                </CommentActions>
              </CommentInputContainer>
            </AddCommentContainer>
          )}

          <CommentsList>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem key={comment._id}>
                  <CommentAvatar>
                    <AvatarImg
                      src={comment.user?.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={comment.user?.displayName || "User"}
                    />
                  </CommentAvatar>
                  <CommentContent>
                    <CommentHeader>
                      <CommentAuthor>{comment.user?.displayName || "User"}</CommentAuthor>
                      <CommentTime>{formatTimeAgo(comment.createdTime || comment.createdAt)}</CommentTime>
                    </CommentHeader>
                    <CommentText>{comment.comment || comment.text}</CommentText>
                    <CommentActions2>
                      <CommentAction>
                        <FaThumbsUp /> {comment.total_Likes || 0}
                      </CommentAction>
                      <CommentAction>
                        <FaThumbsDown />
                      </CommentAction>
                      <CommentAction>Reply</CommentAction>
                    </CommentActions2>
                  </CommentContent>
                </CommentItem>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </CommentsList>
        </CommentsSection>
      </MainContent>

      <RelatedVideos>
        <RelatedHeader>Related videos</RelatedHeader>
        <RelatedVideosList>
          {relatedVideos.map((video) => (
            <RelatedVideoItem 
              key={video._id} 
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <RelatedThumbnail>
                <RelatedThumbnailImg
                  src={video.thumbnail || "/placeholder.svg?height=94&width=168"}
                  alt={video.title}
                />
                <RelatedDuration>{video.duration || "0:00"}</RelatedDuration>
              </RelatedThumbnail>
              <RelatedVideoInfo>
                <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
                <RelatedChannelName>{video.channel?.name || "Channel Name"}</RelatedChannelName>
                <RelatedVideoStats>
                  {formatViewCount(video.total_Views || 0)} views • {formatTimeAgo(video.createdAt)}
                </RelatedVideoStats>
              </RelatedVideoInfo>
            </RelatedVideoItem>
          ))}
        </RelatedVideosList>
      </RelatedVideos>
    </VideoPageContainer>
  );
};

export default VideoPage;