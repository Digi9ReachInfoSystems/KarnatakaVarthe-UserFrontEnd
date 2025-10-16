import styled from "styled-components";
import theme from "../../../theme/Theme";

export const TrendingWrapper = styled.div`
  width: 100%;
  background-color: #D9D9D9;
  overflow: hidden;
`;

export const TrendingContainer = styled.div`
  width: 92%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: ${theme.spacing(1)} ${theme.spacing(1.25)};
  gap: ${theme.spacing(1.25)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 95%;
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    gap: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    gap: ${theme.spacing(1)};
  }
`;

export const TrendingLabel = styled.div`
  background-color: ${theme.colors.error};
  color: ${theme.colors.white};
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body};
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.25)};
    font-size: ${theme.fontSizes.medium};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)} ${theme.spacing(1)};
    font-size: ${theme.fontSizes.small};
  }
`;

export const TrendingContent = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
  position: relative;
  white-space: nowrap;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const TrendingScroller = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: scrollTrending 90s linear infinite;
  width: 100%;
  
  @keyframes scrollTrending {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-150%);
    }
  }
  
  &:hover {
    animation-play-state: paused;
  }

  /* Slower animation on mobile for better readability */
  @media (max-width: ${theme.breakpoints.tablet}) {
    animation: scrollTrending 100s linear infinite;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    animation: scrollTrending 120s linear infinite;
  }
`;

export const TrendingItem = styled.span`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body};
  white-space: nowrap;
  padding-right: ${theme.spacing(1)};
  display: inline-block;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.medium};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const ShimmerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
`;

export const ShimmerItem = styled.div`
  height: 16px;
  width: 180px;
  background: linear-gradient(
    to right,
    ${theme.colors.background} 8%,
    #e0e0e0 18%,
    ${theme.colors.background} 33%
  );
  background-size: 800px 104px;
  border-radius: 4px;
  animation: shimmer 2s infinite linear;
  
  @keyframes shimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
  
  &:nth-child(1) {
    width: 220px;
  }
  
  &:nth-child(2) {
    width: 180px;
  }
  
  &:nth-child(3) {
    width: 200px;
  }
  
  &:nth-child(4) {
    width: 160px;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 14px;
    
    &:nth-child(1) {
      width: 180px;
    }
    
    &:nth-child(2) {
      width: 150px;
    }
    
    &:nth-child(3) {
      width: 170px;
    }
    
    &:nth-child(4) {
      width: 140px;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 12px;
    
    &:nth-child(1) {
      width: 140px;
    }
    
    &:nth-child(2) {
      width: 120px;
    }
    
    &:nth-child(3) {
      width: 130px;
    }
    
    &:nth-child(4) {
      width: 110px;
    }
  }
`;

export const Divider = styled.span`
  color: ${theme.colors.text};
  margin: 0 ${theme.spacing(0.5)};
  opacity: 0.5;
  display: inline-block;
`;
