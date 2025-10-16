import styled, { keyframes } from "styled-components"
import theme from "../../../theme/Theme"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`
const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

// Helper function for responsive values
const responsive = (prop, values) => {
  return `
    ${prop}: ${values.desktop || values.default};
        @media (max-width: ${theme.breakpoints.desktop}) {
      ${prop}: ${values.tablet || values.desktop || values.default};
    }
        @media (max-width: ${theme.breakpoints.tablet}) {
      ${prop}: ${values.mobile || values.tablet || values.desktop || values.default};
    }
  `
}

// Shimmer Effect Components
export const ShimmerContainer = styled.div`
  width: 100%;
`
export const ShimmerThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: ${theme.spacing1(3)};
  background: linear-gradient(
    to right,
    #f0f0f0 8%,
    #e0e0e0 18%,
    #f0f0f0 33%
  );
  background-size: 800px 104px;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  margin-bottom: ${theme.spacing1(3)};
    @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: ${theme.spacing1(2)};
  }
`
export const ShimmerTitle = styled.div`
  height: 20px;
  width: 80%;
  margin-bottom: ${theme.spacing1(2)};
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #f0f0f0 8%,
    #e0e0e0 18%,
    #f0f0f0 33%
  );
  background-size: 800px 104px;
  animation: ${shimmerAnimation} 1.5s infinite linear;
`

// Container Components
export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 93%;
  margin: 0 auto;
  padding: ${theme.spacing1(5)};
  display: flex;
  flex-direction: column;
    @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(4)};
    max-width: 95%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing1(3)};
  }
`
export const CarouselHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing1(5)} 0;
  margin-bottom: ${theme.spacing1(5)};
    @media (min-width: ${theme.breakpoints.tablet}) {
    justify-content: flex-end;
    padding: ${theme.spacing1(5)} ${theme.spacing1(10)};
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(4)} 0;
    margin-bottom: ${theme.spacing1(4)};
  }
`
export const CarouselTitle = styled.h2`
  ${responsive("font-size", {
    default: "2rem",
    tablet: "1.75rem",
    mobile: "1.5rem",
  })}
  font-weight: 700;
  color: ${theme.colors.black};
  margin: 0;
  font-family: ${theme.fonts.heading};
`
export const CarouselTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
    @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
`
export const ViewAllButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(2)};
  cursor: pointer;
  color: ${theme.colors.secondary};
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    color: #0c85d0;
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 4px;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`

// Carousel Components
export const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
    &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8));
    pointer-events: none;
    z-index: 2;
        @media (max-width: ${theme.breakpoints.tablet}) {
      width: 30px;
    }
  }
    &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.8));
    pointer-events: none;
    z-index: 2;
        @media (max-width: ${theme.breakpoints.tablet}) {
      width: 30px;
    }
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: 12px;
  }
`
export const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  cursor: grab;
    &:active {
    cursor: grabbing;
  }
`

// Video Card Components
export const VideoCard = styled.div`
  flex: 0 0 calc(100% / 5);
  padding: 0 ${theme.spacing1(3)};
  box-sizing: border-box;
  animation: ${fadeIn} 0.5s ease forwards;
    @media (max-width: ${theme.breakpoints.large}) {
    flex: 0 0 25%;
  }
    @media (max-width: ${theme.breakpoints.desktop}) {
    flex: 0 0 33.333%;
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    flex: 0 0 50%;
    padding: 0 ${theme.spacing1(2)};
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 100%;
    max-width: ${theme.spacing1(75)};
    margin: 0 auto;
  }
`
export const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: ${theme.spacing1(3)};
  overflow: hidden;
  background-color: ${theme.colors.black};
  box-shadow: 0 ${theme.spacing1(2)} ${theme.spacing1(6)} rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
    &:hover {
    transform: translateY(-${theme.spacing1(2)});
    box-shadow: 0 ${theme.spacing1(4)} ${theme.spacing1(10)} rgba(0, 0, 0, 0.15);
  }
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
    &:hover img {
    transform: scale(1.05);
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: ${theme.spacing1(2)};
    max-height: ${theme.spacing1(125)};
        &:hover {
      transform: translateY(-${theme.spacing1(1)});
    }
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: ${theme.spacing1(110)};
  }
`
export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
    &:hover {
    opacity: 1;
  }
`
export const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: ${theme.spacing1(20)};
  height: ${theme.spacing1(20)};
  cursor: pointer;
  color: ${theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 ${theme.spacing1(2)} ${theme.spacing1(4)} rgba(0, 0, 0, 0.2);
    svg {
    filter: drop-shadow(0 0 ${theme.spacing1(2)} rgba(0, 0, 0, 0.5));
    transition: transform 0.3s ease;
    margin-left: ${theme.spacing1(1)};
  }
    &:hover {
    background: ${theme.colors.primaryVideo};
    color: ${theme.colors.white};
    transform: scale(1.1);
        svg {
      transform: scale(1.1);
    }
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 50%;
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    width: ${theme.spacing1(15)};
    height: ${theme.spacing1(15)};
        svg {
      width: ${theme.spacing1(7)};
      height: ${theme.spacing1(7)};
    }
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    width: ${theme.spacing1(12)};
    height: ${theme.spacing1(12)};
        svg {
      width: ${theme.spacing1(6)};
      height: ${theme.spacing1(6)};
    }
  }
`
export const VideoDuration = styled.div`
  position: absolute;
  bottom: ${theme.spacing1(2)};
  right: ${theme.spacing1(2)};
  background: rgba(0, 0, 0, 0.8);
  color: ${theme.colors.white};
  padding: ${theme.spacing1(1)} ${theme.spacing1(2)};
  border-radius: ${theme.spacing1(1)};
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
`

// Video Info Components
export const VideoInfo = styled.div`
  padding: ${theme.spacing1(4)} ${theme.spacing1(2)};
    @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(3)} ${theme.spacing1(1)};
  }
`
export const VideoTitle = styled.h3`
  margin: 0 0 ${theme.spacing1(2)} 0;
  ${responsive("font-size", {
    default: "1rem",
    tablet: "0.875rem",
  })}
  font-weight: 600;
  color: ${theme.colors.black};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: ${theme.fonts.body};
    @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 0 0 ${theme.spacing1(1)} 0;
  }
`

// Navigation Components
export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "left" ? "left: -24px;" : "right: -24px;")}
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 ${theme.spacing1(1)} ${theme.spacing1(3)} rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
    &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
    &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 50%;
  }
    @media (max-width: ${theme.breakpoints.desktop}) {
    width: 40px;
    height: 40px;
    ${(props) => (props.direction === "left" ? "left: -20px;" : "right: -20px;")}
        svg {
      width: 20px;
      height: 20px;
    }
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`

// Video Player Components
export const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: ${theme.spacing1(3)};
  overflow: hidden;
  background-color: ${theme.colors.black};
  box-shadow: 0 ${theme.spacing1(2)} ${theme.spacing1(6)} rgba(0, 0, 0, 0.2);
    video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    border-radius: ${theme.spacing1(2)};
    max-height: ${theme.spacing1(125)};
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: ${theme.spacing1(110)};
  }
`
export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${theme.spacing1(1)};
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 5;
`
export const ProgressIndicator = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.primaryVideo}, #ff5e00);
  width: 0%;
  transition: width 0.1s linear;
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite linear;
`

// Interaction Components
export const InteractionSidebar = styled.div`
  position: absolute;
  bottom: ${theme.spacing1(20)};
  right: ${theme.spacing1(3)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(4)};
  z-index: 10;
    @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing1(15)};
    right: ${theme.spacing1(2)};
    gap: ${theme.spacing1(3)};
  }
`
export const ActionButton = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: ${theme.spacing1(14)};
  height: ${theme.spacing1(14)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => {
    if (props.isActive) return theme.colors.primaryVideo
    return theme.colors.white
  }};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
    &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 50%;
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    width: ${theme.spacing1(12)};
    height: ${theme.spacing1(12)};
        svg {
      width: 20px;
      height: 20px;
    }
  }
`
export const ActionCount = styled.span`
  font-size: 0.75rem;
  margin-top: ${theme.spacing1(1)};
  font-weight: 600;
  color: ${theme.colors.white};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.625rem;
    margin-top: ${theme.spacing1(0.5)};
  }
`

// Video Metadata Components
export const VideoMetadata = styled.div`
  position: absolute;
  bottom: ${theme.spacing1(3)};
  left: ${theme.spacing1(3)};
  right: ${theme.spacing1(20)};
  z-index: 10;
    @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing1(2)};
    left: ${theme.spacing1(2)};
    right: ${theme.spacing1(16)};
  }
`
export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(3)};
  margin-bottom: ${theme.spacing1(2)};
`
export const ChannelAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${theme.colors.white};
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    @media (max-width: ${theme.breakpoints.tablet}) {
    width: 32px;
    height: 32px;
  }
`
export const ChannelName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.white};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.75rem;
  }
`
export const VideoDescription = styled.p`
  margin: 0 0 ${theme.spacing1(2)} 0;
  font-size: 0.875rem;
  color: ${theme.colors.white};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.75rem;
    -webkit-line-clamp: 1;
  }
`
export const VideoStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(2)};
  font-size: 0.75rem;
  color: ${theme.colors.white};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    span {
    opacity: 0.9;
  }
`

// Comment Popup Components
export const CommentPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`
export const CommentPopupContent = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.3s ease forwards;
    @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    max-height: 90vh;
    border-radius: 12px;
  }
`
export const CommentPopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${theme.colors.gray[200]};
    @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 16px 20px;
  }
`
export const CommentPopupTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.black};
    @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.125rem;
  }
`
export const CommentPopupClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing1(2)};
  border-radius: 50%;
  transition: all 0.2s ease;
  color: ${theme.colors.gray[500]};
    &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.black};
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 50%;
  }
`
export const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
    &::-webkit-scrollbar {
    width: 8px;
  }
    &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: 4px;
  }
    &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: 4px;
  }
    &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[400]};
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px 20px;
  }
`
export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.gray[100]};
    &:last-child {
    border-bottom: none;
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px 0;
    gap: 8px;
  }
`
export const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;
  }
`
export const CommentContent = styled.div`
  flex: 1;
`
export const CommentAuthor = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${theme.colors.black};
  margin-bottom: 4px;
    @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`
export const CommentText = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[700]};
  line-height: 1.4;
  margin-bottom: 4px;
  word-break: break-word;
    @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`
export const CommentTime = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.gray[500]};
    @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.625rem;
  }
`
export const CommentInputContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${theme.colors.gray[200]};
    @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 16px 20px;
  }
`
export const CommentInput = styled.input`
  flex: 1;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 24px;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: ${theme.colors.black};
  transition: all 0.2s ease;
    &::placeholder {
    color: ${theme.colors.gray[500]};
  }
    &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    background-color: ${theme.colors.white};
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 14px;
    font-size: 0.75rem;
  }
`
export const CommentSubmitButton = styled.button`
  background-color: ${theme.colors.secondary};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.white};
  transition: all 0.3s ease;
    &:hover:not(:disabled) {
    background-color: #0c85d0;
    transform: scale(1.05);
  }
    &:disabled {
    background-color: ${theme.colors.gray[300]};
    cursor: not-allowed;
    transform: none;
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    border-radius: 50%;
  }
    @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
        svg {
      width: 16px;
      height: 16px;
    }
  }
`
export const NoCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: ${theme.colors.gray[500]};
    svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }
    p {
    margin: 0;
    font-size: 0.875rem;
  }
`
