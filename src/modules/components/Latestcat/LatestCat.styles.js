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

export const Container = styled.div`
  margin: auto;
  max-width: 94%;
  margin-top: ${theme.spacing(5)};
  padding: 0 ${theme.spacing(5)};
  display: flex;
  gap: ${theme.spacing(4)};
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: ${theme.spacing(1)};
    max-width: 100%;
    gap: ${theme.spacing(3)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.9)};
    gap: ${theme.spacing(2)};
  }
`

export const MainContentWrapper = styled.div`
  flex: 1;
  max-width: 70%;
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

export const SidebarWrapper = styled.div`
  width: 30%;
  max-width: 350px;
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
`

// Banner Section Styles (These were from a previous context, keeping them as is)
export const BannerWrapper = styled.div`
  display: flex;
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  margin-bottom: ${theme.spacing(3)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: none;
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`

export const BannerLeft = styled.div`
  flex: 1;
  padding: 0;
  background: none;
  position: relative;
`

export const BannerRight = styled.div`
  flex: 1;
  padding: ${theme.spacing(3)};
  background: #4CAF50;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
  }
`

export const BannerImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: ${theme.spacing(1)};
  display: block;
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
  }
`

export const BannerText = styled.div`
  color: #333;
  margin-bottom: ${theme.spacing(2)};
  h2, h3, h4 {
    margin: 0 0 ${theme.spacing(0.5)} 0;
    font-weight: 700;
    font-family: ${theme.fonts.heading};
  }
  p {
    margin: 0;
    font-size: ${theme.spacing(1.6)};
    font-family: ${theme.fonts.body};
  }
`

export const BannerBulletPoints = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing(2)} 0;
`

export const BannerBulletPoint = styled.li`
  color: #333;
  font-size: ${theme.spacing(1.4)};
  margin-bottom: ${theme.spacing(1)};
  padding-left: ${theme.spacing(2)};
  position: relative;
  font-family: ${theme.fonts.body};
  &:before {
    content: "•";
    color: #4CAF50;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`

export const PlayButton = styled.button`
  background: #2196F3; /* Blue color from image */
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px; /* Smaller size for inline placement */
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${theme.spacing(1.2)};
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  flex-shrink: 0; /* Prevent button from shrinking */
  margin-left: ${theme.spacing(1)}; /* Add margin to separate from text */

  &:hover {
    transform: scale(1.1); /* Only scale on hover, no translation */
    background-color: #1976D2; /* Darker blue on hover */
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;
    font-size: ${theme.spacing(1)};
    margin-left: ${theme.spacing(0.5)};
  }
`

export const EmblemSection = styled.div`
  text-align: center;
  margin-top: auto;
`

export const EmblemImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: ${theme.spacing(1)};
`

export const EmblemText = styled.p`
  color: white;
  font-size: ${theme.spacing(1.2)};
  margin: ${theme.spacing(0.5)} 0;
  font-family: ${theme.fonts.body};
`

export const SocialIcons = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};
  justify-content: center;
`

export const SocialIcon = styled.div`
  color: white;
  font-size: ${theme.spacing(2)};
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #FFD700;
  }
`

// Comments Section Styles
export const CommentsSection = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(3)};
  margin-top: ${theme.spacing(3)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const CommentsTitle = styled.h3`
  font-size: ${theme.spacing(2.4)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  margin-bottom: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(1)};
  border-bottom: 2px solid ${theme.colors.primary};
`

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(2)};
  align-items: center;
`

export const CommentInput = styled.input`
  flex: 1;
  padding: ${theme.spacing(1.5)};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.spacing(1)};
  font-size: ${theme.spacing(1.6)};
  font-family: ${theme.fonts.body};
  outline: none;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: ${theme.colors.primary};
  }
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`

export const SendButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  font-size: ${theme.spacing(1.6)};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background: ${theme.colors.primaryDark};
  }
`

export const SidebarTitle = styled.h3`
  font-size: ${theme.spacing(2.8)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  margin-bottom: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(1)};
  border-bottom: 2px solid ${theme.colors.primary};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.4)};
    margin-bottom: ${theme.spacing(2)};
  }
`

export const RelatedArticleCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  margin-bottom: ${theme.spacing(2)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const RelatedArticleImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.spacing(1)} ${theme.spacing(1)} 0 0;
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 100px;
  }
`

export const RelatedArticleContent = styled.div`
  padding: ${theme.spacing(1.5)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.2)};
  }
`

export const RelatedArticleTitle = styled.h4`
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 ${theme.spacing(0.8)} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.6)};
  }
`

export const RelatedArticleMeta = styled.div`
  font-size: ${theme.spacing(1.4)};
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fonts.body};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.2)};
  }
`

export const NewsCardWrapper = styled.div`
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  padding: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(2)};
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.9)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    max-width: 100%;
  }
`

export const NewsImageWrapper = styled.div`
  position: relative; /* Added for absolute positioning of PlayButton */
  img {
    width: 100%;
    border-radius: ${theme.spacing(1)};
    height: auto;
    object-fit: cover;
    @media (max-width: ${theme.breakpoints.tablet}) {
      height: 40vh;
    }
    @media (max-width: ${theme.breakpoints.mobile}) {
      height: 30vh;
    }
  }
`

export const NewsContentWrapper = styled.div`
  padding: ${theme.spacing(2)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`

export const NewsHeaderWrapper = styled.div`
  font-size: ${theme.spacing(2.8)};
  color: ${theme.colors.icons};
  font-weight: bold;
  font-family: ${theme.fonts.accent};
  display: flex;
  align-items: center;
  justify-content: space-between; /* To push the button to the right */
  gap: ${theme.spacing(1)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.2)};
  }
`

export const NewsTitleWrapper = styled.h2`
  font-size: ${theme.spacing(2.5)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  margin-bottom: ${theme.spacing(1)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
  }
`

export const ShareIconsWrapper = styled.div`
  display: flex;
  margin-top: ${theme.spacing(1.5)};
  gap: ${theme.spacing(3)};
  font-size: ${theme.spacing(3.3)};
  margin: ${theme.spacing(1)} 0;
  color: ${theme.colors.icons};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    gap: ${theme.spacing(2)};
  }
`

export const NewsMetaWrapper = styled.div`
  display: flex;
  margin-top: ${theme.spacing(2.5)};
  font-size: ${theme.spacing(1.75)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.body};
  margin-top: ${theme.spacing(2.95)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

export const TrendingTagWrapper = styled.span`
  background: ${theme.colors.error};
  color: ${theme.colors.background};
  font-size: ${theme.spacing(1.5)};
  font-weight: bold;
  margin-right: ${theme.spacing(3)};
  padding: ${theme.spacing(0.6)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.625)};
  font-family: ${theme.fonts.monospace};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.25)};
    margin-right: ${theme.spacing(2)};
  }
`

export const NewsTextWrapper = styled.p`
  font-size: ${theme.spacing(2.1)};
  color: ${theme.colors.black};
  line-height: 1.3;
  margin-top: ${theme.spacing(2.8)};
  font-family: ${theme.fonts.body};
  column-count: 2;
  column-gap: ${theme.spacing(4)};
  text-align: justify;
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    column-count: 1;
  }
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  margin: ${theme.spacing(1.5)} 0;
  svg {
    font-size: ${theme.spacing(2.5)};
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

// Shimmer effect components
export const ShimmerWrapper = styled.div`
  width: 100%;
`

export const ShimmerImage = styled.div`
  width: 100%;
  height: 300px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(2)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
  }
`

export const ShimmerLine = styled.div`
  width: 60%;
  height: 20px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: ${theme.spacing(2)};
`

export const ShimmerTitle = styled.div`
  width: 100%;
  height: 30px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: ${theme.spacing(2)};
`

export const ShimmerText = styled.div`
  width: 100%;
  height: 15px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: ${theme.spacing(1.5)};
  &:last-child {
    width: 80%;
  }
`
