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

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(1)} ${theme.spacing(3)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(3)} ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
  }
`

export const NewsCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`

export const NewsImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
  }
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* Adjust column ratio as per image */
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
    padding: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes button to bottom */

  p {
    font-size: ${theme.spacing(1.8)};
    color: ${theme.colors.text};
    line-height: 1.6;
    margin-bottom: ${theme.spacing(2)}; /* Space before button */

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.spacing(1.6)};
      margin-bottom: ${theme.spacing(1.5)};
    }
  }
`

export const TrendingTag = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.spacing(1.4)};
  font-weight: bold;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  display: inline-block;
  width: fit-content;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.2)};
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const NewsTitle = styled.h2`
  font-size: ${theme.spacing(3.5)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  line-height: 1.2;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    margin-bottom: ${theme.spacing(1)};
  }
`

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(1.5)};
`

export const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #FF69B4; /* Example color */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: 600;
`

export const AuthorName = styled.span`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[600]};
  font-weight: 500;
`

export const PublishTime = styled.span`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[500]};
`

export const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[500]};
  margin-top: ${theme.spacing(1)}; /* Space below author info */

  span {
    font-weight: 500;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
  }
`

export const ReadMoreButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing(1.2)} ${theme.spacing(2.5)};
  font-size: ${theme.spacing(1.8)};
  font-weight: 500;
  border-radius: ${theme.spacing(0.5)};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.6)};
    padding: ${theme.spacing(1)} ${theme.spacing(2)};
    width: 100%; /* Full width on mobile */
  }
`

// Shimmer Loading Styles
export const ShimmerContainer = styled.div`
  width: 100%;
`

export const ShimmerImage = styled.div`
  width: 100%;
  height: 400px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 12px 12px 0 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 220px;
  }
`

export const ShimmerTitle = styled.div`
  width: 95%;
  height: 36px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 28px;
  }
`

export const ShimmerText = styled.div`
  width: 100%;
  height: 18px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(1)};

  &:last-of-type {
    width: 80%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 16px;
  }
`

export const ShimmerButton = styled.div`
  width: 180px;
  height: 45px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
  margin-top: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    height: 40px;
  }
`

export const ShimmerAuthorInfo = styled.div`
  width: 150px;
  height: 24px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`

export const ShimmerMetaInfo = styled.div`
  width: 100px;
  height: 18px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`
