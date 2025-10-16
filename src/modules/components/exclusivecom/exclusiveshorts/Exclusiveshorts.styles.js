import styled, { keyframes } from "styled-components";
import theme from "../../../../theme/Theme";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-20%); }
`;

export const CarouselContainer = styled.div`
  width: 800px;
  max-width: 1200px;
  height: auto;
  overflow: hidden;
  margin: ${theme.spacing(1)} auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    margin: ${theme.spacing(1)} auto;
  }
`;

export const CarouselInner = styled.div`
  display: flex;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  flex-direction: column;
  gap: ${theme.spacing(2)};
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const CarouselItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1)};
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: ${theme.spacing(1)};
  background: rgba(0, 0, 0, 0.5);
`;

export const TrendingCategory = styled.div`
  background: ${theme.colors.error};
  color: ${theme.colors.background};
  padding: ${theme.spacing(0.4)} ${theme.spacing(1.5)};
  font-size: ${theme.spacing(1.8)};
  font-weight: bold;
  border-radius: ${theme.spacing(0.5)};
  display: inline-block;
  width: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    padding: ${theme.spacing(0.3)} ${theme.spacing(1)};
  }
`;

export const NewsInfo = styled.div`
  color: ${theme.colors.light};
  font-size: ${theme.spacing(1.9)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`;

export const NewsTitle = styled.h2`
  color: ${theme.colors.background};
  font-size: ${theme.spacing(3.8)};
  font-weight: semibold;
  margin-top: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    margin-top: ${theme.spacing(1)};
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${theme.spacing(45)};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${theme.spacing(1)};

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: ${theme.spacing(35)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: ${theme.spacing(25)};
  }
`;

export const PlayIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${theme.spacing(1)};
  transition: background 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const FlexContainer2 = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;


export const NavContainer = styled.nav`
  background-color: ${theme.colors.error};
  margin: ${theme.spacing(2)} 0;
  padding: ${theme.spacing(0.8)} 0;
  overflow: visible;
  margin-right: ${theme.spacing(1)};
  white-space: nowrap;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: ${theme.spacing(1)} 0;
  }
`;

export const NewsTicker = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  animation: ${scrollAnimation} 20s linear infinite;
  min-width: 200%;
  overflow: visible;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const NewsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

export const NewsItem = styled.span`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.heading};
  font-weight: bold;
  padding: 0 ${theme.spacing(2)};
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`;

export const FlexContainer = styled.div`
  margin-top: 200px;
  position: relative;
  bottom: ${theme.spacing(2)};
  // left: ${theme.spacing(2)};
  // right: ${theme.spacing(2)};
  z-index: 3; 
  padding: ${theme.spacing(2)};
  border-radius: ${theme.spacing(1)};
  color: ${theme.colors.white}; 

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 90px;
    bottom: ${theme.spacing(1)};
    left: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
    // padding: ${theme.spacing(2)};
    padding-right: ${theme.spacing(4)};
  }
`;

export const NestedComment = styled.div`
  background-color: ${(props) => props.theme.colors.lightgreen};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: ${(props) => props.theme.spacing(1)};
  margin-top: ${(props) => props.theme.spacing(0.5)};
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const NestedUser = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;


export const Container = styled.div`
  margin: auto;
  max-width: 400px;
  margin-bottom: ${theme.spacing(4)};
  padding: ${theme.spacing(3)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  border-radius: 12px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 90%;
    padding: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(1)};
    margin: 0;
  }
`;

export const Content = styled.div`
  display: grid;
  gap: ${theme.spacing(3)};
  margin-right: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    // grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(3)};
    margin-right: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2)};
    padding: 0.5rem;
  }
`;

export const VideoCard1 = styled.div`
  padding: ${theme.spacing(1)};
  background: ${theme.colors.light};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

export const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: ${theme.spacing(1.5)};
  overflow: hidden;

  /* Black Overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    z-index: 1; /* Ensure it sits above the image */
    pointer-events: none; /* Allow clicks to pass through the overlay */
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    position: relative;
    z-index: 0; /* Ensure the image is below the overlay */
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    z-index: 2; /* Ensure the icon is above the overlay */

    &:hover {
      opacity: 1;
    }
  }
`;


export const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};
`;

export const NewsMeta = styled.div`
  display: flex;
  margin-top: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  gap: ${theme.spacing(1)};
`;

export const VideoMetacat = styled.span`
  font-size: ${theme.spacing(2)};
  font-weight: bold;
  display: flex;
  align-items: center;
  color: ${theme.colors.text};
  gap: ${theme.spacing(1)};
`;

export const Title = styled.h4`
  font-size: ${theme.spacing(2.2)};
  font-weight: 600;
  color: ${theme.colors.textDark};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  line-height: 1.4;
`;

export const CommentSection = styled.div`
  margin-top: ${theme.spacing(0.5)};
`;

export const InteractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`;

export const CommentContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
`;

export const CommentInput = styled.input`
  flex: 1;
  background: ${theme.colors.background};
  border-radius: ${theme.spacing(1.875)};
  border: ${theme.spacing(0.125)} solid ${theme.colors.info};
  padding: ${theme.spacing(0.7)} ${theme.spacing(8)} ${theme.spacing(0.7)} ${theme.spacing(1)}; /* Extra padding for button */
  width: 100%;
  font-size: ${theme.spacing(1.2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-right: ${theme.spacing(6)}; /* Less padding on mobile */
  }
`;

export const CommentButton = styled.button`
  padding: ${theme.spacing(0.5)} ${theme.spacing(0.5)};
  background: ${theme.colors.primary};
  color: #fff;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const LikeCount = styled.span`
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.text};
`;

export const Comment = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
`;

export const Username = styled.span`
  font-weight: bold;
`;

export const Time = styled.span`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.textLight};
`;

export const CommentText = styled.p`
  margin: ${theme.spacing(0.5)} 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
`;

export const ActionIcon = styled.div`
  cursor: pointer;
  color: ${theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;
