import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaComment, FaRetweet } from "react-icons/fa";
import {
  CommentSection,
  Comment,
  ProfileImage,
  CommentContent,
  UserHeader,
  UserInfo,
  Username,
  VerifiedIcon,
  Time,
  CommentText,
  Actions,
  ActionIcon,
} from "../comments/ComMents.styles";
import { getNewsByid } from "../../../services/newsApi/NewsApi";
import { likeComment } from "../../../services/categoryapi/CategoryApi";
import { FontSizeContext } from "../../../context/FontSizeProvider";
import { ClipLoader } from "react-spinners";

const ComMents = () => {
  const { id: newsId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fontSize } = useContext(FontSizeContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await getNewsByid(newsId);
        if (response.success && response.data.comments) {
          setComments(response.data.comments);
        } else {
          console.warn("No comments found.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [newsId]);

  const handleLikeComment = async (commentId) => {
    try {
      const updatedComment = await likeComment(commentId);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, likes: updatedComment.likes }
            : comment
        )
      );
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  return (
    <CommentSection 
      style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
      role="region"
      aria-label="Comments section"
    >
      {loading ? (
        <div 
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}
          aria-live="polite"
          aria-label="Loading comments"
        >
          <ClipLoader color="#1E88E5" aria-hidden="true" />
        </div>
      ) : comments.length === 0 ? (
        <p role="status" aria-live="polite">No comments yet.</p>
      ) : (
        <div role="list" aria-label="Comments list">
          {comments.map((comment) => (
            <Comment key={comment._id} role="listitem">
              <ProfileImage
                src="https://via.placeholder.com/50"
                alt={`Profile picture of ${comment.user.displayName}`}
              />
              <CommentContent>
                <UserHeader>
                  <UserInfo>
                    <Username>
                      {comment.user.displayName}
                    </Username>
                    {comment.user.verified && (
                      <VerifiedIcon aria-label="Verified user" title="Verified user">✔</VerifiedIcon>
                    )}
                  </UserInfo>
                  <Time>
                    {new Date(comment.createdTime).toLocaleTimeString()}
                  </Time>
                </UserHeader>
                <CommentText>
                  {comment.comment}
                </CommentText>
                <Actions role="group" aria-label="Comment actions">
                  <ActionIcon 
                    style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
                    aria-label="Reply to comment"
                    tabIndex="0"
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        // Handle reply functionality
                      }
                    }}
                  >
                    <FaComment aria-hidden="true" />
                  </ActionIcon>
                  <ActionIcon 
                    style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
                    aria-label="Retweet comment"
                    tabIndex="0"
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        // Handle retweet functionality
                      }
                    }}
                  >
                    <FaRetweet aria-hidden="true" />
                  </ActionIcon>
                  <ActionIcon 
                    style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} 
                    onClick={() => handleLikeComment(comment._id)}
                    aria-label={`Like comment by ${comment.user.displayName}`}
                    tabIndex="0"
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleLikeComment(comment._id)
                      }
                    }}
                  >
                    <FaHeart aria-hidden="true" />
                  </ActionIcon>
                </Actions>
              </CommentContent>
            </Comment>
          ))}
        </div>
      )}
    </CommentSection>
  );
};

export default ComMents;
