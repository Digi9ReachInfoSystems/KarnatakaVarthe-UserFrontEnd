import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

// Keyframes for animations
const shimmer = keyframes`
  0% {
    background-position: -${theme.spacing(58.5)} 0;
  }
  100% {
    background-position: ${theme.spacing(58.5)} 0;
  }
`
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(${theme.spacing(1.25)});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-${theme.spacing(2.5)});
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`
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

// Main Container
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  padding: ${theme.spacing(2.5)};
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.25)};
  }
`
export const MainContent = styled.div`
  display: flex;
  gap: ${theme.spacing(3)};
  max-width: 92%;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
  @media (max-width: ${theme.breakpoints.desktop}) {
    flex-direction: column;
    gap: ${theme.spacing(2.5)};
  }
`

// Video Player Section
export const VideoPlayerContainer = styled.div`
  flex: 1;
  background: ${theme.colors.white};
  border-radius: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};
  backdrop-filter: blur(${theme.spacing(1.25)});
  border: 1px solid ${theme.colors.trcloure};
  transition: all ${theme.transitions.fast};
  &:hover {
    transform: translateY(-${theme.spacing(0.25)});
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
    border-radius: ${theme.spacing(1.5)};
  }
`
export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${theme.spacing(1.5)};
  overflow: hidden;
  background: ${theme.colors.black};
  margin-bottom: ${theme.spacing(2.5)};
`
export const MainVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${theme.spacing(1.5)};
  transition: transform ${theme.transitions.fast};
  &:hover {
    transform: scale(1.02);
  }
`
export const VideoInfo = styled.div`
  margin-bottom: ${theme.spacing(3)};
  animation: ${slideIn} 0.5s ease-out 0.2s both;
`
export const VideoTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.black};
  margin: 0 0 ${theme.spacing(1.5)} 0;
  line-height: 1.3;
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.4rem;
  }
`
export const VideoStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.black};
  font-size: 0.9rem;
  font-weight: 500;
  span {
    display: flex;
    align-items: center;
    gap: ${theme.spacing(0.5)};
  }
`
export const VideoDescription = styled.p`
  color: ${theme.colors.black};
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
  padding: ${theme.spacing(2)};
  background: ${theme.colors.bggrey};
  border-radius: ${theme.spacing(1)};
  border-left: ${theme.spacing(0.5)} solid ${theme.colors.primary};
`

// Sidebar Section
export const VideoSidebar = styled.div`
  width: ${theme.spacing(47.5)};
  background: ${theme.colors.white};
  border-radius: ${theme.spacing(2)};
  padding: ${theme.spacing(3)};
  backdrop-filter: blur(${theme.spacing(1.25)});
  border: 1px solid ${theme.colors.trcloure};
  height: fit-content;
  max-height: ${theme.spacing(80)}; /* Approx 5 videos + padding/gap */
  overflow-y: auto; /* Make it scrollable */
  position: sticky;
  top: ${theme.spacing(2.5)};
  animation: ${slideIn} 0.6s ease-out 0.3s both;
  /* For Firefox */
  scrollbar-width: none;
  /* For WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 100%;
    position: relative;
    top: 0;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
  }
`
export const SidebarHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing(2.5)};
  color: ${theme.colors.black};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  &::before {
    content: "";
    width: ${theme.spacing(0.5)};
    height: ${theme.spacing(2.5)};
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primary} 100%);
    border-radius: ${theme.spacing(0.25)};
  }
`
export const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
`
export const VideoItem = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  cursor: pointer;
  padding: ${theme.spacing(1.5)};
  border-radius: ${theme.spacing(1.5)};
  transition: all ${theme.transitions.fast};
  border: 2px solid transparent;
  background: ${(props) =>
    props.className === "active"
      ? `linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.maincolor}20 100%)`
      : "transparent"};
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primary}10 0%, ${theme.colors.maincolor}10 100%);
    transform: translateX(${theme.spacing(0.5)});
    border-color: ${theme.colors.primary}30;
  }
  &.active {
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`
export const ThumbnailContainer = styled.div`
  position: relative;
  width: ${theme.spacing(17.5)};
  height: ${theme.spacing(9.75)};
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: ${theme.spacing(15)};
    height: ${theme.spacing(8.375)};
  }
`
export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.fast};
  ${VideoItem}:hover & {
    transform: scale(1.05);
  }
`
export const VideoDuration = styled.div`
  position: absolute;
  bottom: ${theme.spacing(0.5)};
  right: ${theme.spacing(0.5)};
  background: rgba(0, 0, 0, 0.8);
  color: ${theme.colors.white};
  padding: ${theme.spacing(0.25)} ${theme.spacing(0.75)};
  border-radius: ${theme.spacing(0.5)};
  font-size: 0.7rem;
  font-weight: 600;
`
export const VideoItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`
export const VideoItemTitle = styled.h3`
  font-size: 0.95rem;
  margin: 0 0 ${theme.spacing(1)} 0;
  font-weight: 600;
  color: ${theme.colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  transition: color 0.2s ease;
  ${VideoItem}:hover & {
    color: ${theme.colors.primary};
  }
`
export const VideoItemViews = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.black};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
`

// Shimmer Loading Effect
export const ShimmerEffect = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.colors.bggrey} 25%,
    ${theme.colors.backgray} 50%,
    ${theme.colors.bggrey} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${theme.spacing(1)};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || theme.spacing(2.5)};
  margin-bottom: ${(props) => props.marginBottom || "0"};
`

// Top Bar for Karnataka Varthe and View All
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(1)};
`

export const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  transition: color 0.2s ease;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  
  &:hover {
    color: #1d4ed8;
  }
  
  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`
export const SeeMoreButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  font-size: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  cursor: pointer;
  margin-left: auto;
  margin-right: ${theme.spacing(8)};
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  transition: color 0.2s ease;
  
  &:hover {
    color: #1d4ed8;
  }
  
  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
  }
`
// title for the video section
export const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(1.25)} 0;
  margin-bottom: ${theme.spacing(1.25)};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    justify-content: space-between;
    padding: ${theme.spacing(3)} ${theme.spacing(6)};
  }
`

export const CarouselTitle = styled.h2`
  ${responsive("font-size", {
    default: "1.25rem",
    tablet: "1.2rem",
  })}
  font-weight: 600;
  color: ${theme.colors.black};
    font-size: 1.7rem;
  margin: 0;
  
  font-family: ${theme.fonts.heading};
`

export const CarouselTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.625)};
  cursor: pointer;
  color: #2563eb;
  font-weight: 600;
  font-size: ${theme.spacing(2.5)};
  transition: color 0.2s ease;
  
  &:hover {
    color: #1d4ed8;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(0.5)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: auto;
  }
`