import styled, { keyframes } from "styled-components";
import theme from "../../../theme/Theme";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const CarouselContainer = styled.div`
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

export const CarouselItem = styled.div`
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

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${theme.spacing(1)};
`;

export const ContentWrapper = styled.div`
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

export const TrendingCategory = styled.div`
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

export const NewsInfo = styled.div`
  color: ${theme.colors.light};
  font-size: ${theme.spacing(1.9)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.3)};
  }
`;

export const NewsTitle = styled.h2`
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

export const ArrowIcon = styled.button`
  position: absolute;
  bottom: ${theme.spacing(5)};
  right: ${theme.spacing(6)};
  padding: ${theme.spacing(2)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-8px);
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: ${theme.spacing(4)};
    right: ${theme.spacing(4)};
    padding: ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: ${theme.spacing(3.5)};
    right: ${theme.spacing(3)};
    padding: ${theme.spacing(1.2)};
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

export const DotContainer = styled.div`
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

export const Dot = styled.button`
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

// Shimmer effect components
export const ShimmerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #f6f7f8;
  overflow: hidden;
  border-radius: ${theme.spacing(1)};
`;

export const ShimmerContent = styled.div`
  position: absolute;
  bottom: ${theme.spacing(2)};
  left: ${theme.spacing(2)};
  right: ${theme.spacing(2)};
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`;

export const ShimmerCategory = styled.div`
  width: 100px;
  height: 25px;
  background: #e1e1e1;
  border-radius: ${theme.spacing(0.5)};
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #e1e1e1 8%, #f5f5f5 18%, #e1e1e1 33%);
  background-size: 800px 104px;
`;

export const ShimmerText = styled.div`
  width: 60%;
  height: 16px;
  background: #e1e1e1;
  border-radius: ${theme.spacing(0.5)};
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #e1e1e1 8%, #f5f5f5 18%, #e1e1e1 33%);
  background-size: 800px 104px;
`;

export const ShimmerTitle = styled.div`
  width: 100%;
  height: 30px;
  background: #e1e1e1;
  border-radius: ${theme.spacing(0.5)};
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #e1e1e1 8%, #f5f5f5 18%, #e1e1e1 33%);
  background-size: 800px 104px;
  margin-top: ${theme.spacing(1)};
`;

export const ShimmerDotContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing(1)};
`;

export const ShimmerDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e1e1e1;
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #e1e1e1 8%, #f5f5f5 18%, #e1e1e1 33%);
  background-size: 800px 104px;
`;