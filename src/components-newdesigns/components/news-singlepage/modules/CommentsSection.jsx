import { useEffect, useState } from 'react'
import React from 'react'
import Cookies from "js-cookie";
import {
  CommentsContainer,
  ContentWrapper,
  CommentsSection,
  FormSection,
  CommentsTitle,
  CommentItem,
  CommentAuthor,
  CommentText,
  ViewAllLink,
  PlusIcon,
  CommentForm,
  CommentInput,
  CommentTextarea,
  SubmitButton
} from './CommentsSection.styles'
import { useToast } from '../../../../context/ToastContext';
import { addComment } from '../../../../services/newsApi/NewsApi';
import { useParams } from 'react-router-dom';
import { use } from 'react';
import { getCommentByuserIdNewsId } from '../../../../services/comment/Comment';

const CommentsSectionComponent = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const newsId = useParams().id
  const [comments, setComments] = useState([]);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const username = Cookies.get("UserName");
  const userId = Cookies.get("userId");
  useEffect(() => {
    const userEmail = Cookies.get("Email");
    const userPhone = Cookies.get("Phone");

    
    if (userEmail) {
     
      setEmailOrPhone(userEmail);
      setIsEmailDisabled(true);
    } else if (userPhone) {
      const last10Digits = userPhone.slice(-10);
    setEmailOrPhone(`+91 ${last10Digits}`);
    setIsEmailDisabled(true);
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const text = e.target.comment.value;
    const userId = Cookies.get("userId");
 
    if (!userId) {
      showWarning("Please login to comment");
      return;
    }

    const payload = { userId, newsId, text };
 
    const response = await addComment(payload);

    if (response?.success) { 
      e.target.comment.value = "";
      showSuccess("Comment submitted successfully");
      
      // Refetch comments to show the new one
      const updatedComments = await getCommentByuserIdNewsId(userId, newsId);
      
      // Handle different response formats
      if (Array.isArray(updatedComments)) {
        setComments(updatedComments);
      } else if (updatedComments?.success && Array.isArray(updatedComments.data)) {
        setComments(updatedComments.data);
      } else if (updatedComments?.data && Array.isArray(updatedComments.data)) {
        setComments(updatedComments.data);
      }
    } else {
      showError("Failed to submit comment");
    }
  }
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for userId:", userId, "and newsId:", newsId);
        const response = await getCommentByuserIdNewsId(userId, newsId);
        console.log("Fetched comments response:", response);
        
        // Handle different response formats
        if (Array.isArray(response)) {
          // If response is directly an array
          setComments(response);
        } else if (response?.success && Array.isArray(response.data)) {
          // If response has success property and data is an array
          setComments(response.data);
        } else if (response?.data && Array.isArray(response.data)) {
          // If response has data property that is an array
          setComments(response.data);
        } else {
          // No comments or unexpected format
          console.log("No comments found or unexpected format");
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (userId && newsId) {
      fetchComments();
    }
  }, [newsId, userId]); 

  return (
    <CommentsContainer as="section" aria-labelledby="comments-heading">
      <CommentsTitle id="comments-heading" as="h3">Commented By {username || 'Guest'}</CommentsTitle>
      
      <ContentWrapper>
        <CommentsSection as="div" role="region" aria-labelledby="existing-comments-heading">
          <h4 
            id="existing-comments-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Existing Comments
          </h4>
          
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentItem 
                key={comment._id} 
                as="article" 
                role="article" 
                aria-labelledby={`comment-${index}-author`}
              >
                <CommentAuthor id={`comment-${index}-author`} as="h5">
                  {comment.user?.displayName || 'Anonymous'}
                </CommentAuthor>
                <CommentText>
                  {comment.comment}
                </CommentText>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                  {new Date(comment.createdTime).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </CommentItem>
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No comments yet. Be the first to comment!
            </div>
          )}
        </CommentsSection>
        
        <FormSection as="div" role="region" aria-labelledby="comment-form-heading">
          <h4 
            id="comment-form-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Leave a Comment
          </h4>
          {/* Comment form */}
          <CommentForm as="form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="comment-name" style={{ position: 'absolute', left: '-9999px' }}>Your name (required)</label>
            <CommentInput 
              id="comment-name"
              type="text" 
              name="name"
              placeholder="Your name"
              aria-required="true"
              value={username || ''}
            
              disabled={username}

            />
            
            <label htmlFor="comment-email" style={{ position: 'absolute', left: '-9999px' }}>Your email address (required)</label>
            {Cookies.get("Phone") && !Cookies.get("Email") ? (
              <div style={{ display: "flex", alignItems: "center" }}>
    
                <CommentInput 
                  id="comment-email"
                  type="text" 
                  name="email"
                  placeholder="Your Contact Details"
                  aria-required="true"
                  aria-describedby="email-hint"
                  value={emailOrPhone}
                  onChange={(e) => !isEmailDisabled && setEmailOrPhone(e.target.value)}
                  disabled={isEmailDisabled}
                  style={{ borderRadius: "0 4px 4px 0", marginLeft: "-1px" }}
                />
              </div>
            ) : (
              <CommentInput 
                id="comment-email"
                type="text" 
                name="email"
                placeholder="Your Contact Details"
                aria-required="true"
                aria-describedby="email-hint"
                value={emailOrPhone}
                onChange={(e) => !isEmailDisabled && setEmailOrPhone(e.target.value)}
                disabled={isEmailDisabled}
              />
            )}
            <span id="email-hint" style={{ position: 'absolute', left: '-9999px' }}>
              Your email will not be published
            </span>
            
            <label htmlFor="comment-text" style={{ position: 'absolute', left: '-9999px' }}>Your comment (required)</label>
            <CommentTextarea 
              id="comment-text"
              name="comment"
              placeholder="Write your comment here..."
              aria-required="true"
              required
            />
            
            <SubmitButton type="submit">
              Submit Comment
            </SubmitButton>
          </CommentForm>
        </FormSection>
      </ContentWrapper>
    </CommentsContainer>
  )
}

export default CommentsSectionComponent
