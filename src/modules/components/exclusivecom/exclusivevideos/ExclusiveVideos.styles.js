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

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  width: 100%;
  align-items: center;
  margin-top: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(1)};
  }
`;

export const InteractionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(1)} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row; /* Keep it in a single line on mobile */
    align-items: center;
    gap: ${theme.spacing(1)};
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

export const LikeCount = styled.span`
  font-weight: semibold;
  font-size: ${theme.spacing(2.5)};
  color: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
  width: 50%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 1; 
  }
`;

export const CommentInput = styled.input`
  flex: 1;
  background: ${theme.colors.background};
  border-radius: ${theme.spacing(1.875)};
  border: ${theme.spacing(0.125)} solid ${theme.colors.info};
  padding: ${theme.spacing(0.7)} ${theme.spacing(8)} ${theme.spacing(0.7)} ${theme.spacing(1)}; /* Extra padding for button */
  width: 100%;
  font-size: ${theme.spacing(1.9)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-right: ${theme.spacing(6)}; /* Less padding on mobile */
  }
`;

export const CommentButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.spacing(1.9)};
  padding: ${theme.spacing(0.6)} ${theme.spacing(1.5)};
  border: none;
  border-radius: ${theme.spacing(1)};
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
  position: absolute; 
  right: ${theme.spacing(1)}; 
  top: 50%; 
  transform: translateY(-50%); 
  height: 80%; 

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.6)} ${theme.spacing(1)}; /* Smaller padding on mobile */
    right: ${theme.spacing(0.5)}; /* Adjust position for mobile */
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

// commnet setion

export const Comment = styled.div`
  display: flex;
  width: 700px;
  max-width: 90%;
  align-items: flex-start;
  padding: ${(props) => props.theme.spacing(2)};
  background-color: transparent;  // Set to transparent
  border-radius: ${(props) => props.theme.spacing(1)};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: ${(props) => props.theme.spacing(1)};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 300px;
    padding: ${(props) => props.theme.spacing(1)};
  }
`;

export const ProfileImage = styled.img`
  width: ${(props) => props.theme.spacing(5)};
  height: ${(props) => props.theme.spacing(5)};
  margin-right: ${(props) => props.theme.spacing(2)};
  border-radius: 50%;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;
`;

export const Username = styled.span`
  font-size: ${(props) => props.theme.spacing(2)};
`;

export const VerifiedIcon = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const Time = styled.span`
  font-size: ${(props) => props.theme.spacing(1.75)};
  color: ${(props) => props.theme.colors.icons};
  margin-left: auto;
`;

export const CommentText = styled.p`
  margin: ${(props) => props.theme.spacing(0.5)} 0;
  font-size: ${(props) => props.theme.spacing(1.75)};
  color: ${(props) => props.theme.colors.text};
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

export const Actions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  margin-top: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.icons};
`;

export const ActionIcon = styled.span`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(0.5)};
  cursor: pointer;
  font-size: ${(props) => props.theme.spacing(1.75)};
`;

export const CommentSectionWrapper = styled.div`
  margin-top: ${theme.spacing(1)};
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.background};
  border-radius: ${theme.spacing(1.875)};
  margin-top: ${theme.spacing(2.5)};
  border: ${theme.spacing(0.125)} solid ${theme.colors.info};
  padding: ${theme.spacing(0.7)};
  width: ${theme.spacing(30)};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const CommentInputField = styled.input`
  flex: 1;
  border: none;
  font-size: ${theme.spacing(1.75)};
  outline: none;
  max-width: 100%;
  background: transparent;
  padding-right: ${theme.spacing(4.375)};
  padding-left: ${theme.spacing(1.25)};
`;

export const CommentButtonWrapper = styled.button`
  position: absolute;
  right: ${theme.spacing(1.25)};
  top: ${theme.spacing(0.8)};
  background: none;
  border: none;
  font-size: ${theme.spacing(2.375)};
  color: ${theme.colors.icons};
  cursor: pointer;
`;


