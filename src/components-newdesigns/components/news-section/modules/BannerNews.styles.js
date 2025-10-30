import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const BannerWrap = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${theme.colors.black};
  isolation: isolate;

  
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: ${theme.borderRadius.small};
    margin: 0 0.5rem;
  }
`

export const BannerInner = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 6;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 9;
  }
    @media (max-width: 1026px) {
    aspect-ratio: 16 / 7;
    width: 100%;
  }
  
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 16 / 10;
  }
`

export const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform ${theme.transitions.fast};
  
  ${BannerWrap}:hover & {
    transform: scale(1.02);
  }
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 30%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 40%,
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`

export const Content = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(2)};
  color: ${theme.colors.white};
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(3)} ${theme.spacing(2.5)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(3.5)} ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(1.5)};
  }
`

export const DateText = styled.span`
  display: inline-block;
  color: rgba(255, 255, 255, 0.95);
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: ${theme.spacing(0.5)};
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.medium};
    letter-spacing: 0.5px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 11px;
    letter-spacing: 0.2px;
  }
`

export const Title = styled.h2`
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.white};
  text-wrap: balance;
  font-family: ${theme.fonts.heading};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  
  /* Responsive font sizes */
  font-size: clamp(1rem, 3vw, 1.5rem);
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(1.25rem, 2.5vw, 2rem);
    line-height: 1.3;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    font-size: clamp(1.5rem, 2vw, 2.25rem);
    line-height: 1.25;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(0.875rem, 4vw, 1.125rem);
    line-height: 1.3;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
  }
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  background: rgba(${theme.colors.primaryRgb}, 0.2);
  border: 1px solid rgba(${theme.colors.primaryRgb}, 0.4);
  color: ${theme.colors.light};
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: 999px;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  margin-bottom: ${theme.spacing(0.5)};
  backdrop-filter: blur(10px);
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.medium};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.25)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 10px;
    padding: ${theme.spacing(0.25)} ${theme.spacing(0.75)};
  }
`

export const LinkArea = styled.a`
  position: absolute;
  inset: 0;
  outline: none;
  z-index: 2;
  border-radius: ${theme.borderRadius.medium};
  transition: all ${theme.transitions.fast};

  &:focus-visible {
    box-shadow: inset 0 0 0 3px ${theme.colors.primary};
    border-radius: ${theme.borderRadius.medium};
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: ${theme.borderRadius.small};
    
    &:focus-visible {
      border-radius: ${theme.borderRadius.small};
    }
  }
`

// ========================================
// SHIMMER/SKELETON LOADING STYLES
// ========================================
const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

export const SkeletonBannerWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${theme.colors.gray[100]};
  ${shimmer}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: ${theme.borderRadius.small};
    margin: 0 0.5rem;
  }
`

export const SkeletonBannerInner = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 6;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 9;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 16 / 10;
  }
`

export const SkeletonContent = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(2)};
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(3)} ${theme.spacing(2.5)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(3.5)} ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(1.5)};
  }
`

export const SkeletonDate = styled.div`
  width: 150px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[300]} 25%,
    ${theme.colors.gray[200]} 50%,
    ${theme.colors.gray[300]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(0.5)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 12px;
  }
`

export const SkeletonBadge = styled.div`
  width: 80px;
  height: 24px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[300]} 25%,
    ${theme.colors.gray[200]} 50%,
    ${theme.colors.gray[300]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 999px;
  margin-bottom: ${theme.spacing(0.5)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 20px;
  }
`

export const SkeletonTitle = styled.div`
  width: 70%;
  height: 32px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[300]} 25%,
    ${theme.colors.gray[200]} 50%,
    ${theme.colors.gray[300]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 40px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 24px;
    width: 80%;
  }
`