import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { FaPlay, FaRegComment, FaHeart, FaComment, FaRetweet } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  VideoCard1,
  VideoThumbnail,
  VideoDetails,
  NewsMeta,
  Title,
  CommentContainer,
  CommentInput,
  CommentButton,
  InteractionContainer,
  CommentSection,
  LikeCount,
  Comment,
  ProfileImage,
  CommentContent,
  UserHeader,
  UserInfo,
  Username,
  Time,
  CommentText,
  Actions,
  ActionIcon,
} from "../exclusiveshorts/Exclusiveshorts.styles";
import { getVideos, ShortlikeVideo, ShortVideoaddComment } from "../../../../services/videoApi/videoApi";
import { FontSizeContext } from "../../../../context/FontSizeProvider";

const Exclusiveshorts = () => {
  const [videosData, setVideosData] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [userId, setUserId] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  const [error, setError] = useState("");
  const [openCommentSection, setOpenCommentSection] = useState(null);
  const { fontSize } = useContext(FontSizeContext);
  const [debouncingLike, setDebouncingLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        if (response.success && Array.isArray(response.data)) {
          setVideosData(response.data);
          const initialLikeCounts = {};
          const initialComments = {};
          response.data.forEach((video) => {
            initialLikeCounts[video._id] = Math.max(video.total_Likes || 0, 0);
            if (video.Comments && Array.isArray(video.Comments)) {
              initialComments[video._id] = video.Comments;
            }
          });
          setLikeCounts(initialLikeCounts);
          setComments(initialComments);
        } else {
          setVideosData([]);
        }
      } catch (error) {
        setVideosData([]);
      }
    };
    fetchVideos();
  }, []);

  const handlePlayClick = (videoId) => setPlayingVideoId(videoId);

  const handleLikeClick = async (videoId) => {
    if (!userId) {
      Cookies.set("redirectUrl", window.location.pathname);
      navigate("/login");
      return;
    }
    if (debouncingLike) return;
    setDebouncingLike(true);
    setTimeout(async () => {
      try {
        const isLiked = likedVideos.has(videoId);
        await ShortlikeVideo({ videoId, userId });
        const newLikedVideos = new Set(likedVideos);
        isLiked ? newLikedVideos.delete(videoId) : newLikedVideos.add(videoId);
        setLikedVideos(newLikedVideos);
        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [videoId]: isLiked ? Math.max(prevCounts[videoId] - 1, 0) : prevCounts[videoId] + 1,
        }));
      } catch (error) {
        setError("Failed to like the video. Please try again.");
      } finally {
        setDebouncingLike(false);
      }
    }, 500);
  };

  const handleCommentChange = (e, videoId) => {
    setNewComments((prev) => ({ ...prev, [videoId]: e.target.value }));
  };

  const handleAddComment = async (videoId) => {
    if (!userId) {
      Cookies.set("redirectUrl", window.location.pathname);
      navigate("/login");
      return;
    }
    const commentText = newComments[videoId]?.trim();
    if (!commentText) {
      setError("Please enter a comment.");
      return;
    }
    try {
      const response = await ShortVideoaddComment({ text: commentText, videoId, userId });
      setComments((prevComments) => ({
        ...prevComments,
        [videoId]: [...(prevComments[videoId] || []), response.comment],
      }));
      setNewComments((prev) => ({ ...prev, [videoId]: "" }));
      setError("");
      window.location.reload();
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    }
  };

  const toggleCommentSection = (videoId) => {
    setOpenCommentSection((prev) => (prev === videoId ? null : videoId));
  };

  const handleLikeComment = async (commentId, videoId) => {
    if (!userId) {
      Cookies.set("redirectUrl", window.location.pathname);
      navigate("/login");
      return;
    }
    setComments((prevComments) => ({
      ...prevComments,
      [videoId]: prevComments[videoId].map((comment) =>
        comment._id === commentId ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
      ),
    }));
  };

  return (
    <Container>
      <Content>
        {videosData.map((video) => (
          <React.Fragment key={video._id}>
            <VideoCard1>
              <VideoThumbnail onClick={() => handlePlayClick(video._id)}>
                {playingVideoId === video._id ? (
                  <video id={video._id} controls autoPlay loop width="100%" height="200px" style={{ objectFit: "cover" }}>
                    <source src={video.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    <FaPlay size={40} color="#fff" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                  </>
                )}
              </VideoThumbnail>
              <VideoDetails>
                <NewsMeta>
                  <span style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>{new Date(video.createdAt).toLocaleDateString()}</span>
                </NewsMeta>
                <Title style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>{video.title}</Title>
              </VideoDetails>
            </VideoCard1>

            <CommentSection>
              <InteractionContainer>
                <CommentContainer>
                  <AiOutlineLike
                    style={{ fontSize: fontSize !== 100 ? `${fontSize}%` : undefined, cursor: "pointer" }}
                    size={30}
                    color={likedVideos.has(video._id) ? "blue" : "#000"}
                    onClick={() => handleLikeClick(video._id)}
                  />
                  <LikeCount style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>{likeCounts[video._id] || 0}</LikeCount>
                  <FaRegComment
                    style={{ fontSize: fontSize !== 100 ? `${fontSize}%` : undefined, cursor: "pointer" }}
                    size={25}
                    onClick={() => toggleCommentSection(video._id)}
                  />
                  <CommentInput
                    style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
                    type="text"
                    value={newComments[video._id] || ""}
                    onChange={(e) => handleCommentChange(e, video._id)}
                    placeholder="Add a comment..."
                  />
                  <CommentButton style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} onClick={() => handleAddComment(video._id)}>
                    Add Comment
                  </CommentButton>
                </CommentContainer>
              </InteractionContainer>

              <AnimatePresence>
                {openCommentSection === video._id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    {comments[video._id]?.length === 0 ? (
                      <p>No comments yet.</p>
                    ) : (
                      comments[video._id]?.map((comment) => (
                        <Comment key={comment._id}>
                          <ProfileImage src={comment.user?.profileImage || "https://via.placeholder.com/50"} alt={comment.user?.displayName || "Anonymous"} />
                          <CommentContent>
                            <UserHeader>
                              <UserInfo style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                                <Username>{comment.user?.displayName || "Anonymous"}</Username>
                              </UserInfo>
                              <Time style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>{new Date(comment.createdTime).toLocaleTimeString()}</Time>
                            </UserHeader>
                            <CommentText style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>{comment.comment}</CommentText>
                            <Actions>
                              <ActionIcon style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                                <FaComment />
                              </ActionIcon>
                              <ActionIcon style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
                                <FaRetweet />
                              </ActionIcon>
                              <ActionIcon style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} onClick={() => handleLikeComment(comment._id, video._id)}>
                                <FaHeart /> {comment.likes || 0}
                              </ActionIcon>
                            </Actions>
                          </CommentContent>
                        </Comment>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CommentSection>
          </React.Fragment>
        ))}
      </Content>
    </Container>
  );
};

export default Exclusiveshorts;