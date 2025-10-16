import styled from "styled-components"

// Main container for the video page
export const VideoPageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing(4)};
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${(props) => props.theme.spacing(6)};
  
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`

// Main content area (left side)
export const MainContent = styled.div`
  width: 100%;
`

// Video player container
export const VideoPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #000;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  overflow: hidden;
  aspect-ratio: 16 / 9;
`

// Video element
export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

// Custom video controls overlay
export const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity ${(props) => props.theme.transitions.fast};
  
  ${VideoPlayerContainer}:hover & {
    opacity: 1;
  }
`

// Video control buttons
export const ControlButton = styled.button`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.large};
  margin: 0 ${(props) => props.theme.spacing(1)};
  cursor: pointer;
  
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

// Video title
export const VideoTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xxlarge};
  margin: ${(props) => props.theme.spacing(4)} 0 ${(props) => props.theme.spacing(2)};
  font-weight: 500;
`

// Video stats container (views, date, actions)
export const VideoStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  padding-bottom: ${(props) => props.theme.spacing(4)};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing(3)};
  }
`

// Views and date display
export const ViewsAndDate = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.lightText};
`

// Container for action buttons (like, share, etc.)
export const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: space-between;
  }
`

// Individual action button
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(3)};
  background-color: ${(props) => props.theme.colors.lightgray};
  border-radius: ${(props) => props.theme.borderRadius.large};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  transition: background-color ${(props) => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${(props) => props.theme.colors.border};
  }
  
  ${(props) =>
    props.active &&
    `
    color: ${props.theme.colors.secondary};
  `}
`

// Channel information container
export const ChannelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing(3)};
  }
`

// Channel details (avatar and text)
export const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(3)};
`

// Channel avatar
export const ChannelAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${(props) => props.theme.borderRadius.circle};
  background-color: ${(props) => props.theme.colors.lightgray};
  overflow: hidden;
`

// Avatar image
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

// Channel text container
export const ChannelText = styled.div``

// Channel name
export const ChannelName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`

// Subscriber count
export const SubscriberCount = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.lightText};
`

// Subscribe button
export const SubscribeButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(2)};
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(4)};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.large};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
  transition: background-color ${(props) => props.theme.transitions.fast};
  
  &:hover {
    background-color: #cc0000;
  }
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    align-self: flex-start;
  }
`

// Bell notification button
export const BellButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${(props) => props.theme.borderRadius.circle};
  background-color: ${(props) => props.theme.colors.lightgray};
  margin-left: ${(props) => props.theme.spacing(2)};
  
  &:hover {
    background-color: ${(props) => props.theme.colors.border};
  }
`

// Video description container
export const VideoDescription = styled.div`
  background-color: ${(props) => props.theme.colors.lightgray};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`

// Description text
export const DescriptionText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  white-space: pre-wrap;
`

// Comments section container
export const CommentsSection = styled.div`
  margin-top: ${(props) => props.theme.spacing(4)};
`

// Comments header
export const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`

// Comment count
export const CommentCount = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 500;
  margin-right: ${(props) => props.theme.spacing(2)};
`

// Add comment container
export const AddCommentContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(6)};
`

// Comment avatar
export const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.circle};
  background-color: ${(props) => props.theme.colors.lightgray};
  flex-shrink: 0;
`

// Comment input container
export const CommentInputContainer = styled.div`
  flex: 1;
`

// Comment input field
export const CommentInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing(2)} 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  outline: none;
  
  &:focus {
    border-bottom-color: ${(props) => props.theme.colors.secondary};
  }
`

// Comment actions (buttons)
export const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing(2)};
  gap: ${(props) => props.theme.spacing(2)};
`

// Comment button
export const CommentButton = styled.button`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(3)};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
  
  ${(props) =>
    props.primary
      ? `
    background-color: ${props.theme.colors.secondary};
    color: white;
    
    &:disabled {
      background-color: ${props.theme.colors.lightgray};
      color: ${props.theme.colors.darkgray};
      cursor: not-allowed;
    }
  `
      : `
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.lightgray};
    }
  `}
`

// Comments list container
export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(4)};
`

// Individual comment item
export const CommentItem = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
`

// Comment content
export const CommentContent = styled.div`
  flex: 1;
`

// Comment header (author and time)
export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`

// Comment author
export const CommentAuthor = styled.span`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
`

// Comment time
export const CommentTime = styled.span`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.lightText};
`

// Comment text
export const CommentText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`

// Comment actions (like, reply)
export const CommentActions2 = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
`

// Comment action button
export const CommentAction = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.lightText};
  
  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`

// Related videos container (right sidebar)
export const RelatedVideos = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: none;
  }
`

// Related videos header
export const RelatedHeader = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`

// Related videos list
export const RelatedVideosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`

// Related video item
export const RelatedVideoItem = styled.a`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  text-decoration: none;
  color: inherit;
  
  &:hover {
    h4 {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`

// Related video thumbnail container
export const RelatedThumbnail = styled.div`
  position: relative;
  width: 168px;
  height: 94px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.lightgray};
  flex-shrink: 0;
`

// Related video thumbnail image
export const RelatedThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

// Related video duration badge
export const RelatedDuration = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing(1)};
  right: ${(props) => props.theme.spacing(1)};
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: ${(props) => props.theme.fontSizes.small};
`

// Related video info container
export const RelatedVideoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

// Related video title
export const RelatedVideoTitle = styled.h4`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

// Related video channel name
export const RelatedChannelName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.lightText};
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`

// Related video stats (views, time)
export const RelatedVideoStats = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.lightText};
`

// Loading container
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.lightText};
`

// Error container
export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.error};
`
