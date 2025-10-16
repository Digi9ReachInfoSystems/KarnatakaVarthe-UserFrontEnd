import styled, { keyframes } from "styled-components";
import theme from "../../../../theme/Theme";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const PdfCarouselContainer = styled.div`
  width: 90%;
  height: 450px;
  overflow: hidden;
  position: relative;
  border-radius: ${theme.spacing(1)};
  margin: auto;
  
  &:focus {
    outline: 2px solid ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 90%;
    height: 320px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    height: 240px;
  }
`;

export const PdfCarouselItem = styled.div`
  flex: 1 0 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${theme.spacing(2)};
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ active }) => (active ? 1 : 0)};
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: ${theme.spacing(1)};
`;

export const PdfOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${theme.spacing(1)};
`;

export const PdfContentWrapper = styled.div`
  position: absolute;
  bottom: ${theme.spacing(2)};
  left: ${theme.spacing(2)};
  right: ${theme.spacing(2)};
  z-index: 2;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing(1)};
    left: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing(3.5)};
    left: ${theme.spacing(0.5)};
    right: ${theme.spacing(0.5)};
  }
`;

export const PdfTrendingCategory = styled.div`
  background: ${theme.colors.error};
  color: ${theme.colors.background};
  padding: ${theme.spacing(0.4)} ${theme.spacing(1.5)};
  font-size: ${theme.spacing(1.8)};
  font-weight: bold;
  border-radius: ${theme.spacing(0.5)};
  display: inline-block;
  width: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.5)};
    padding: ${theme.spacing(0.3)} ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.2)};
    padding: ${theme.spacing(0.2)} ${theme.spacing(0.8)};
  }
`;

export const PdfNewsInfo = styled.div`
  color: ${theme.colors.light};
  font-size: ${theme.spacing(1.9)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.3)};
  }
`;

export const PdfNewsTitle = styled.h2`
  color: ${theme.colors.background};
  font-size: ${theme.spacing(3.8)};
  font-weight: semibold;
  margin-top: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)};
    margin-top: ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(2)};
  }
`;

export const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 15px;" : "right: 15px;")}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  z-index: 10;
  transition: background 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 35px;
    height: 35px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`;

export const PdfDotContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing(1)};
  z-index: 10;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: 20px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing(0.8)};
  }
`;

export const PdfDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? theme.colors.primary : "#888")};
  transition: background 0.3s ease;
  cursor: pointer;
  border: none;
  padding: 0;
  
  &:hover {
    background: ${theme.colors.primary};
  }
  
  &:focus {
    outline: none;
  }
`;

export const PdfDownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.625)}; 
  background-color: hsla(0, 0.00%, 100.00%, 0.20);
  color: ${theme.colors.background};
  padding: ${theme.spacing(1.25)} ${theme.spacing(1.875)}; 
  font-size: ${theme.spacing(1.75)}; 
  font-weight: 500;
  border-radius: ${theme.spacing(1)};
  border: none;
  cursor: pointer;
  backdrop-filter: blur(${theme.spacing(0.625)}); 
  transition: background 0.3s ease;
  position: absolute;
  bottom: ${theme.spacing(6)}; 
  right: ${theme.spacing(8.125)}; 
  z-index: 10;

  &:hover {
    background-color: hsla(0, 0.00%, 100.00%, 0.30);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing(4)};
    right: ${theme.spacing(6)};
    font-size: ${theme.spacing(1.5)};
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing(5)};
    right: ${theme.spacing(4.8)};
    font-size: ${theme.spacing(1.25)};
    padding: ${theme.spacing(0.8)} ${theme.spacing(1.2)};
  }
`;

// Skeleton Loading Styles
export const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(1)};
`;

export const SkeletonCategory = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
  width: 80px;
  height: 24px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 70px;
    height: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 18px;
  }
`;

export const SkeletonInfo = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
  width: 150px;
  height: 16px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 120px;
    height: 14px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 12px;
  }
`;

export const SkeletonTitle = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${theme.spacing(0.5)};
  width: 80%;
  height: 40px;
  margin-top: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 32px;
    margin-top: ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 24px;
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(6)};
  }
`;

export const SkeletonButton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(0.625)}; 
  border-radius: ${theme.spacing(1)};
  position: absolute;
  bottom: ${theme.spacing(6)}; 
  right: ${theme.spacing(8.125)}; 
  width: 150px;
  height: 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing(4)};
    right: ${theme.spacing(6)};
    width: 130px;
    height: 36px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing(5)};
    right: ${theme.spacing(4.8)};
    width: 110px;
    height: 32px;
  }
`;

export const SkeletonDotContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing(0.8)};
  }
`;

export const SkeletonDot = styled.div`
  width: ${theme.spacing(1.25)};
  height: ${theme.spacing(1.25)};
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;