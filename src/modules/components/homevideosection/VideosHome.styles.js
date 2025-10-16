import styled, { keyframes } from "styled-components";
import theme from "../../../theme/Theme";

// Keyframes for shimmer effect
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// Animation for fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
export const PageContainer = styled.div`
  width: 100%;
  // min-height: 100vh;
  background-color: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  padding: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)};
  }
`;

export const VideoLayout = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

export const VideoPlayerSection = styled.div`
  flex: 1;
  min-width: 0;
  position: sticky;
  margin-right: ${theme.spacing(5)};
  top: ${theme.spacing(0.5)};
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.desktop}) {
    position: relative;
    height: auto;
    top: 0;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-right: 0;
  }
`;

export const VideoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing(1)};
`;

export const VideoTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const ChevronRight = styled.span`
  margin-left: ${theme.spacing(0.5)};
  font-size: 1.4rem;
  color: ${theme.colors.text};
`;

export const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${theme.colors.black};
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 400px;
`;

export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
`;

export const LargePlayButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: ${theme.spacing(7.5)};
  height: ${theme.spacing(7.5)};
  cursor: pointer;
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  svg {
    filter: drop-shadow(0 0 ${theme.spacing(0.5)} rgba(0, 0, 0, 0.5));
    transition: transform 0.3s ease;
    width: ${theme.spacing(3)};
    height: ${theme.spacing(3)};
  }
  
  &:hover {
    background: rgba(255, 0, 0, 0.7);
    transform: scale(1.1);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  z-index: 2;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(0.25)};
  font-size: 1rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  svg {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: ${theme.spacing(0.5)};
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: ${theme.spacing(0.25)};
  position: relative;
  cursor: pointer;
  margin: 0 ${theme.spacing(0.5)};
`;

export const Progress = styled.div.attrs(props => ({
  $width: props.$width || "0%",
}))`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #ff0000, #ff5e00);
  border-radius: ${theme.spacing(0.25)};
  width: ${props => props.$width};
  transition: width 0.1s linear;
`;

export const VideoInfo = styled.div`
  margin-top: ${theme.spacing(1.5)};
  display: flex;
  flex-direction: column;
`;

export const CurrentVideoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${theme.colors.text};
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  color: ${theme.colors.textgray};
  font-size: 0.9rem;
  margin-top: ${theme.spacing(0.5)};
`;

export const WatchNextSection = styled.div`
  width: 350px;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 100%;
    margin-top: ${theme.spacing(2)};
  }
`;

export const WatchNextHeader = styled.h2`
  font-size: 1.4rem;
  margin-bottom: ${theme.spacing(1)};
  font-weight: 600;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`;
export const VideoItem = styled.div.attrs(props => ({
  $isActive: props.$isActive || false,
}))`
  display: flex;
  gap: ${theme.spacing(0.75)};
  cursor: pointer;
  padding: ${theme.spacing(0.5)};
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  background-color: ${props => 
    props.$isActive ? theme.colors.bggrey : "transparent"};

  &:hover {
    background-color: ${theme.colors.bggrey};
  }
`;


export const ThumbnailContainer = styled.div`
  position: relative;
  width: 160px;
  height: 90px;
  border-radius: 0.25rem;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 120px;
    height: 67.5px;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${VideoItem}:hover & {
    transform: scale(1.05);
  }
`;

export const NowPlaying = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${theme.colors.white};
  padding: ${theme.spacing(0.25)};
  font-size: 0.7rem;
  text-align: center;
  font-weight: 500;
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${theme.colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  width: ${theme.spacing(5)};
  height: ${theme.spacing(5)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  svg {
    width: ${theme.spacing(1.25)};
    height: ${theme.spacing(1.25)};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

export const VideoItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`;

export const VideoItemTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  color: ${theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const VideoItemMeta = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.textgray};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.25)};
  margin-top: ${theme.spacing(0.5)};
`;

export const Viewall = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: ${theme.colors.text};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

// Shimmer Effect Components
export const ShimmerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  padding: ${theme.spacing(1)};
`;

export const ShimmerThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.75)};
`;

export const ShimmerTitle = styled.div`
  width: 80%;
  height: 24px;
  background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
`;

export const ShimmerMeta = styled.div`
  width: 60%;
  height: 16px;
  background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
`;