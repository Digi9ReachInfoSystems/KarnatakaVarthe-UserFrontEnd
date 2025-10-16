import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { addComment } from "../../../services/newsApi/NewsApi";
import { MdOutlineComment } from "react-icons/md";
import { CommentInputWrapper, CommentInputField, CommentButtonWrapper, ErrorText } from "../comments/ComMents.styles"; 
import { FontSizeContext } from "../../../context/FontSizeProvider";

const AddComments = ({ newsId }) => {
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const { fontSize } = useContext(FontSizeContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please enter a comment.");
      return;
    }

    if (!userId) {
      navigate("/login"); 
      return;
    }

    if (!newsId) {
      setError("News ID not found.");
      return;
    }

    const commentData = { text, newsId, userId };
    try {
      const response = await addComment(commentData);
      setText("");
      setError("");
      window.location.reload();
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  return (
    <div role="region" aria-label="Add comment section">
      <form onSubmit={handleSubmit}>
        <CommentInputWrapper style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
          <CommentInputField 
            style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
            type="text"
            placeholder="Add your comments"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Comment text"
            aria-describedby={error ? "comment-error" : undefined}
            aria-invalid={error ? "true" : "false"}
            required
          />
          <CommentButtonWrapper 
            type="submit"
            disabled={!text.trim()}
            aria-label="Submit comment"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          >
            <MdOutlineComment style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined} aria-hidden="true" />
          </CommentButtonWrapper>
        </CommentInputWrapper>
        {error && (
          <ErrorText 
            id="comment-error"
            style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
            role="alert"
            aria-live="polite"
          >
            {error}
          </ErrorText>
        )}
      </form>
    </div>
  );
};

export default AddComments;