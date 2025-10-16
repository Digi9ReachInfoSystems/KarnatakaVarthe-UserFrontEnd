import styled from "styled-components";
import theme from "../../../../theme/Theme";

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

  // Additional breakpoints for iPad Pro and larger tablets
  @media (min-width: 1024px) and (max-width: 1366px) {
    max-width: 80%; 
  }

  // Adjust for foldable devices like Galaxy Z Fold 5
  @media (max-width: 768px) and (min-aspect-ratio: 1/1) {
    max-width: 90%;
    padding: ${theme.spacing(2)};
  }
`;

export const Header = styled.h2`
  font-size: ${theme.spacing(3.5)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  text-align: left;
  margin-bottom: ${theme.spacing(4)};
  letter-spacing: 1px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)}; // Slightly smaller for tablets
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)}; // Smaller for mobile
    margin-bottom: ${theme.spacing(2)};
  }

  // Adjust for foldable devices
  @media (max-width: 768px) and (min-aspect-ratio: 1/1) {
    font-size: ${theme.spacing(3)};
  }
`;

export const Content = styled.div`
  display: grid;
  gap: ${theme.spacing(5)};
  margin-right: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr); // Two columns for tablets
    gap: ${theme.spacing(3)};
    margin-right: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr; // Single column for mobile
    gap: ${theme.spacing(2)};
    padding: 0.5rem;
  }

  // Adjust for foldable devices
  @media (max-width: 768px) and (min-aspect-ratio: 1/1) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(4)};
  }
`;

export const VideoCard1 = styled.div`
  padding: ${theme.spacing(1)};
  background: ${theme.colors.light};
  margin-bottom: ${theme.spacing(2)};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${theme.spacing(1)};
  }

  // Adjust for foldable devices
  @media (max-width: 768px) and (min-aspect-ratio: 1/1) {
    margin-bottom: ${theme.spacing(3)};
  }
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1)};
  }
`;

export const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.25)};
  }
`;

export const VideoMeta = styled.span`
  font-size: ${theme.spacing(1.95)};
  font-weight: bold;
  margin-top: ${theme.spacing(1)};
  color: ${theme.colors.secondary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
  }
`;

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
`;

export const Title = styled.h4`
  font-size: inherit;
  font-weight: 600;
  color: ${theme.colors.textDark};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: inherit;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: inherit;
    margin-bottom: ${theme.spacing(0.5)};
    line-height: 1.2;
  }

  // Adjust for foldable devices
  @media (max-width: 768px) and (min-aspect-ratio: 1/1) {
    font-size: inherit;
  }
`;

export const NewsMeta = styled.div`
  display: flex;
  margin-top: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.body};
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.7)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.6)};
  }
`;

export const BookmarkIconWrapper = styled.div`
  cursor: pointer;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isBookmarked }) =>
    isBookmarked ? theme.colors.primary : theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`;

