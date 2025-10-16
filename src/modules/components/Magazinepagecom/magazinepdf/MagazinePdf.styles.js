import styled, { keyframes } from "styled-components";
import theme from "../../../../theme/Theme";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: ${theme.spacing(3)};
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  border-radius: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`;

export const Header = styled.h2`
  font-size: ${theme.spacing(4)};
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  text-align: left;
  margin-bottom: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(3)};
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing(3)};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MagazineCard = styled.div`
  padding: ${theme.spacing(2)};
  background: ${theme.colors.light};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
`;

export const MagazineThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const MagazineDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`;

export const NewsMeta = styled.div`
  display: flex;
  font-size: ${theme.spacing(1.8)};
  color: ${theme.colors.textLight};
  gap: ${theme.spacing(1)};

  @media (max-width: 768px) {
    font-size: ${theme.spacing(1.5)};
  }
`;

export const Title = styled.h4`
  font-size: ${theme.spacing(2)};
  color: ${theme.colors.textDark};

  @media (max-width: 768px) {
    font-size: ${theme.spacing(1.6)};
  }
`;

export const MagazineMetacat = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
`;

export const BookmarkIconWrapper = styled.div`
  cursor: pointer;
  color: ${({ isBookmarked }) => (isBookmarked ? theme.colors.primary : theme.colors.textLight)};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const ReadMoreButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing(1)};
  border-radius: 20px;
  font-size: ${theme.spacing(1.5)};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  cursor: pointer;
  margin-top: ${theme.spacing(1)};

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

export const ReadMoreIcon = styled.span`
  font-size: ${theme.spacing(1.8)};
`;
export const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  margin-bottom: ${theme.spacing(2)};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    height: ${theme.spacing(0.5)};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.spacing(0.2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const Tab = styled.button`
  background: none;
  border: none;
  font-size: ${theme.spacing(2)};
  cursor: pointer;
  color: ${(props) => (props.active ? theme.colors.primary : theme.colors.black)};
  border-bottom: ${(props) => (props.active ? `${theme.spacing(0.375)} solid ${theme.colors.primary}` : "none")};
  padding: ${theme.spacing(1)};
  font-weight: bold;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    padding: ${theme.spacing(0.75)};
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 20px;
  padding: 20px;
`;

// Skeleton loading styles
export const SkeletonCard = styled.div`
  padding: ${theme.spacing(2)};
  background: ${theme.colors.light};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
`;

export const SkeletonThumbnail = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonTitle = styled.div`
  height: 24px;
  width: 90%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonMeta = styled.div`
  height: 16px;
  width: 80%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-top: 8px;
`;

export const SkeletonButton = styled.div`
  height: 36px;
  width: 120px;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 20px;
  margin-top: 16px;
`;