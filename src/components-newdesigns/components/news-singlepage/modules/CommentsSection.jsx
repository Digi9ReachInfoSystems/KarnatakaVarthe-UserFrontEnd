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

const CommentsSectionComponent = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const newsId = useParams().id
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const username = Cookies.get("UserName");

  useEffect(() => {
    const userEmail = Cookies.get("Email");
    const userPhone = Cookies.get("Phone");

    
    if (userEmail) {
     
      setEmailOrPhone(userEmail);
      setIsEmailDisabled(true);
    } else if (userPhone) {
      // Remove +91 prefix if it exists and show only 10 digits
     
      setEmailOrPhone(userPhone);
      setIsEmailDisabled(true);
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault()
    
  const text = e.target.comment.value;
  const userId = Cookies.get("userId");
 
    const payload = { userId, newsId, text };

  if (!userId) return showWarning("Please login to comment");
 
  const response = await addComment(payload);

  if (response?.success){ 
    e.target.comment.value = "";
    e.target.email.value = "";
    e.target.name.value =  "";
    showSuccess("Comment submitted successfully");}
   
  
  else showError("Failed to submit comment");
    if (!userId) {
      showWarning("You must be logged in to comment");
      return;
    }
 
  }

  return (
    <CommentsContainer as="section" aria-labelledby="comments-heading">
      <CommentsTitle id="comments-heading" as="h3">Comments</CommentsTitle>
      
      <ContentWrapper>
        <CommentsSection as="div" role="region" aria-labelledby="existing-comments-heading">
          <h4 
            id="existing-comments-heading" 
            style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            Existing Comments
          </h4>
          {/* Comment 1 */}
          <CommentItem as="article" role="article" aria-labelledby="comment-1-author">
            <CommentAuthor id="comment-1-author" as="h5">Amanda Roose</CommentAuthor>
            <CommentText>
              I couldn't agree more with this article. Slow living has been a game-changer for me, and it's helped me prioritize the things that truly matter in life. From meditation to sustainable living practices, I've found that embracing a slower, more intentional lifestyle has brought me greater happiness and fulfillment.
            </CommentText>
          </CommentItem>
          
          {/* Comment 2 */}
          <CommentItem as="article" role="article" aria-labelledby="comment-2-author">
            <CommentAuthor id="comment-2-author" as="h5">Gilbert Akins</CommentAuthor>
            <CommentText>
              This article really resonated with me. It's so easy to get caught up in the fast-paced, consumerist culture we live in, but slow living offers a refreshing alternative. I love the emphasis on mindfulness, sustainable living, and creating a life that's in line with our values. Definitely going to try incorporating more slow living practices into my own life!
            </CommentText>
          </CommentItem>
          
          {/* View all comments link */}
          <ViewAllLink as="button" type="button" aria-label="View all comments">
            <PlusIcon aria-hidden="true">+</PlusIcon> View all comments
          </ViewAllLink>
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
