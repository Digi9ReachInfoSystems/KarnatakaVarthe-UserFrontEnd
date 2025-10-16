import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

export const Container = styled.div`
  margin: auto;
  max-width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing(6)};
  margin-top: ${theme.spacing(0)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: ${theme.spacing(3)} ${theme.spacing(4)}; /* Adjusted for tablet */
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(2)} ${theme.spacing(2.5)}; /* Adjusted for mobile */
    margin: 0;
  }
`

export const Header = styled.h2`
  font-size: ${theme.spacing(3.5)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  text-align: left;
  margin-bottom: ${theme.spacing(4)};
  line-height: 1.2;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3.2)};
    margin-bottom: ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(2.5)};
  }
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing(4)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
  }
`

export const VideoCard1 = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  transition: none; /* Removed transform transition as per image */
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  border: 1.5px solid ${theme.colors.gray[500]};
  display: block;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(64, 64, 64, 0.10); /* subtle, equal shadow all around */
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
    border-radius: 12px;
  }
`

export const VideoDetails = styled.div`
  padding: ${theme.spacing(2.5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
    gap: ${theme.spacing(1.5)};
  }
`

export const Title = styled.h3`
  font-size: ${theme.spacing(2.4)};
  font-weight: 700;
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.2)};
    line-height: 1.3;
  }
`

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-top: auto;
`

export const AuthorAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1E88E5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: 600;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 18px;
    height: 18px;
    font-size: 9px;
  }
`

export const AuthorName = styled.span`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[600]};
  font-weight: 500;
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
  }
`

export const PublishTime = styled.span`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[500]};
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
  }
`

// Legacy exports for backward compatibility (kept for safety, but not used in new design)
export const VideoMeta = styled.span`
  font-size: ${theme.spacing(1.95)};
  font-weight: bold;
  margin-top: ${theme.spacing(1)};
  color: ${theme.colors.secondary};
`

export const VideoMetacat = styled.span`
  font-size: ${theme.spacing(2)};
  font-weight: bold;
  display: flex;
  align-items: center;
  color: ${theme.colors.text};
  gap: ${theme.spacing(1)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

export const NewsMeta = styled.div`
  display: flex;
  margin-top: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  gap: ${theme.spacing(1)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.7)};
  }
`

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

export const ShimmerCard = styled.div`
  background: #f6f7f8;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(2.5)};
`

export const ShimmerThumbnail = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
  }
`

export const ShimmerTitle = styled.div`
  width: 90%;
  height: 24px;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(1)};
`

export const ShimmerMeta = styled.div`
  width: 70%;
  height: 16px;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`
