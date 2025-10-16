import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

export const PageWrapper = styled.div`
  width: 100%;
  background: ${theme.colors.background};
`

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(1)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  border-radius: 12px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`

export const MainContent = styled.div`
  flex: 1;
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns on desktop */
  gap: ${theme.spacing(3)};
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on larger tablets */
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on smaller tablets */
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 1 column on mobile */
  }
`

export const MagazineCard = styled.div`
  background: ${theme.colors.light}; /* White background */
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Subtle shadow on hover */
  }
`

export const MagazineThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4; /* Maintain aspect ratio */
  overflow: hidden;
  border-radius: 8px 8px 0 0; /* Rounded top corners */
`

export const MagazineThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const MagazineFlag = styled.div`
  position: absolute;
  top: 0;
  right: 15px; /* Adjust position as needed */
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 15px; /* Creates a triangle shape */
  border-color: transparent transparent ${theme.colors.primary} transparent; /* Blue color */
  transform: rotate(180deg); /* Flips it to point down */
  z-index: 10;
`

export const MagazineDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)}; /* Reduced gap for tighter spacing */
  padding: ${theme.spacing(1.5)};
`

export const Title = styled.h4`
  font-size: ${theme.spacing(2)};
  color: ${theme.colors.black};
  margin: 0;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: ${theme.spacing(1.8)};
  }
`

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  /* Removed gap as content is now a single span */
  margin-top: ${theme.spacing(0.5)};
`

// Removed AuthorAvatar, AuthorName, CategoryAndPages, CategoryText, PagesText styles

export const PublishTime = styled.span`
  font-size: ${theme.spacing(1.4)};
  color: ${theme.colors.textLight}; /* Lighter text color for the combined line */
  font-family: ${theme.fonts.body};
`

export const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(3)};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
  }
`

export const Tab = styled.button`
  background: none;
  border: none;
  font-size: ${theme.spacing(2.2)};
  cursor: pointer;
  color: ${(props) => (props.active ? theme.colors.primary : theme.colors.black)};
  border-bottom: ${(props) => (props.active ? `${theme.spacing(0.375)} solid ${theme.colors.primary}` : "none")};
  padding: ${theme.spacing(1)} 0;
  font-weight: bold;
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
    padding: ${theme.spacing(0.75)} 0;
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${theme.spacing(3)} 0;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;

  .MuiPagination-root {
    .MuiPaginationItem-root {
      font-family: ${theme.fonts.body};
      min-width: 32px;
      height: 32px;
      margin: 0 2px;
      border-radius: 50%;
      border: none;
      background: none;
      color: ${theme.colors.black};
      font-size: 1rem;
      transition: background 0.2s;
      &.Mui-selected {
        background: ${theme.colors.primary};
        color: #fff;
        font-weight: bold;
      }
      &:hover {
        background: #f3f3f3;
      }
    }
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: ${theme.spacing(2.5)} 0;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: ${theme.spacing(2)} 0;
    .MuiPagination-root {
      .MuiPaginationItem-root {
        min-width: 28px;
        height: 28px;
        font-size: 0.95rem;
      }
    }
  }
`

export const ResultsInfo = styled.div`
  font-size: inherit;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: inherit;
  }
`

// Skeleton loading styles
export const SkeletonCard = styled.div`
  padding: ${theme.spacing(0)};
  background: ${theme.colors.light};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
`

export const SkeletonThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 8px 8px 0 0;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`

export const SkeletonTitle = styled.div`
  height: 24px;
  width: 90%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`

export const SkeletonMeta = styled.div`
  height: 16px;
  width: 80%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-top: 8px;
`

export const SkeletonButton = styled.div`
  height: 36px;
  width: 100%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 20px;
  margin-top: 16px;
`
