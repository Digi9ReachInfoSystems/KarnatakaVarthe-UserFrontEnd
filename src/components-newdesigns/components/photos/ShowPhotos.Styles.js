import theme from "../../../theme/Theme";
import styled, { keyframes } from "styled-components";
export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
`;

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(6)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing1(1)};
  }
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 250px;
    height: 1px;
    background: ${theme.colors.gray[700]};
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(18px, 2.3vw, 20px);

    &::after {
      width: 200px;
    }
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(16px, 2vw, 18px);

    &::after {
      width: 150px;
    }
  }
`;

export const Photos = styled.div`
  width: 100%;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
  box-sizing: border-box;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(6)} ${theme.spacing1(8)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(4)} ${theme.spacing1(4)};
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
`;

export const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 1/1.4;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  &:active {
    transform: translateY(-2px);
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

export const PhotoLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const ShimmerContainer = styled.div`
  width: 100%;
`;

export const ShimmerThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 1/1.4;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e8e8e8 40px,
    #f0f0f0 80px
  );
  background-size: 600px 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;