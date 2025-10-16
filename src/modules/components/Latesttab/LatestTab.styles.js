import styled, { keyframes, css } from "styled-components"
import theme from "../../../theme/Theme"

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

export const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: ${theme.spacing(3)};
  background: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  border-radius: 12px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(1)};
    margin: 0;
    border-radius: 0;
  }
`

export const CategoryTabs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing(3)};
`

export const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none; 
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  padding: ${theme.spacing(1)} 0;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`

export const ScrollButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.light};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.2s ease;
  color: ${theme.colors.textDark};
  flex-shrink: 0;
  
  ${(props) =>
    props.direction === "left" &&
    css`
    margin-right: ${theme.spacing(1)};
  `}
  
  ${(props) =>
    props.direction === "right" &&
    css`
    margin-left: ${theme.spacing(1)};
  `}
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${theme.colors.light};
      color: ${theme.colors.textDark};
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`

export const Tab = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: ${theme.spacing(2)};
  cursor: pointer;
  color: ${(props) => (props.active ? theme.colors.primary : theme.colors.textDark)};
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  font-weight: ${(props) => (props.active ? "700" : "500")};
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  border-radius: 20px;
  
  &:hover {
    background: ${theme.colors.backgroundHover};
  }
  
  ${(props) =>
    props.active &&
    css`
    background: ${theme.colors.backgroundActive};
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  }
`

export const TabIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: ${theme.colors.primary};
  border-radius: 3px;
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing(4)};
  
  .skeleton-card {
    .skeleton-image {
      width: 100%;
      height: 180px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 8px;
      margin-bottom: ${theme.spacing(1.5)};
    }
    
    .skeleton-title {
      width: 90%;
      height: 20px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
      margin-bottom: ${theme.spacing(1)};
    }
    
    .skeleton-meta {
      width: 60%;
      height: 16px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr); 
    gap: ${theme.spacing(2.5)};
    padding: 0.5rem;
  }
`

export const VideoCard = styled.div`
  padding: ${theme.spacing(1.5)};
  background: ${theme.colors.light};
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(1.25)};
  }
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${theme.spacing(1.5)};
  transition: transform 0.3s ease;
  
  ${VideoCard}:hover & {
    transform: scale(1.03);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 160px;
  }
`

export const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.75)};
  flex: 1;
`

export const TrendingBadge = styled.span`
  background-color: ${theme.colors.primary};
  color: white;
  font-size: ${theme.spacing(1.5)};
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
  margin-right: ${theme.spacing(1)};
`

export const AuthorInfo = styled.span`
  font-size: ${theme.spacing(1.7)};
  color: ${theme.colors.textLight};
`

export const VideoMetacat = styled.span`
  font-size: ${theme.spacing(1.8)};
  font-weight: 600;
  color: ${theme.colors.textDark};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.6)};
  }
`

export const Title = styled.h4`
  font-size: ${theme.spacing(2.2)};
  font-weight: 600;
  color: ${theme.colors.textDark};
  margin: ${theme.spacing(0.5)} 0 ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.9)};
    margin-bottom: ${theme.spacing(0.5)};
    line-height: 1.3;
  }
`

export const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  gap: ${theme.spacing(0.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.6)};
  }
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${theme.spacing(1)};
`

export const BookmarkIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isBookmarked }) => (isBookmarked ? theme.colors.primary : theme.colors.textLight)};
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    color: ${theme.colors.primary};
    background: rgba(0, 0, 0, 0.05);
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing(4)};
  padding: ${theme.spacing(2)};
  
  .MuiPagination-ul {
    gap: ${theme.spacing(0.5)};
  }
  
  .MuiPaginationItem-root {
    &.Mui-selected {
      background-color: ${theme.colors.primary};
      color: white;
      
      &:hover {
        background-color: ${theme.colors.primary};
        opacity: 0.9;
      }
    }
  }
`

export const NoContent = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing(4)};
  color: ${theme.colors.textLight};
  font-size: ${theme.spacing(2)};
  background: ${theme.colors.backgroundHover};
  border-radius: 8px;
`
