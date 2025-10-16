import styled, { keyframes } from "styled-components"
import theme from "../../../theme/Theme"

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
  width: 92%;
  margin: 0 auto;
  padding: ${theme.spacing(3)};
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

  &:focus-visible { /* Added focus-visible for keyboard navigation */
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
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
export const MagazineDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)}; /* Reduced gap for tighter spacing */
  padding: ${theme.spacing(1.5)};
`

export const Title = styled.h4`
  font-size: ${theme.spacing(3.2)};
  color: ${theme.colors.black};
  margin: 0;
  margin-bottom: ${theme.spacing(1.5)};
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
  margin-top: ${theme.spacing(0.5)};
`

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
  
  &:focus-visible { /* Added focus-visible for keyboard navigation */
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
    padding: ${theme.spacing(0.75)} 0;
  }
`

// Removed PaginationWrapper as per request
// export const PaginationWrapper = styled.div`
//   display: flex;
//   justify-content: left;
//   margin-top: ${theme.spacing(3)};
//   padding: ${theme.spacing(2)};
// `

export const ResultsInfo = styled.div`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
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

export const SeeMoreButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  font-size: ${theme.spacing(2.5)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  cursor: pointer;
  margin-left: auto;
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
