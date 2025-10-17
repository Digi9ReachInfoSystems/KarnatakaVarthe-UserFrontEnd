import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  background: ${theme.colors.background};
  padding-top: ${theme.spacing(5)};
  padding-bottom: ${theme.spacing(6)};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
`

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(1)};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${theme.spacing(6)};
  padding-right: ${theme.spacing(6)};

  @media (max-width: ${theme.breakpoints.desktop}) {
    padding-left: ${theme.spacing(3)};
    padding-right: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1)};
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
  }
`

export const SectionTitle = styled.h2`
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
`

// Main gallery container with single row layout
export const GalleryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(2)};
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(2.5)} ${theme.spacing(6)};
  background: ${theme.colors.background};
  flex-wrap: nowrap;

  @media (max-width: ${theme.breakpoints.desktop}) {
    gap: ${theme.spacing(1.5)};
    max-width: 95%;
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.5)};
    padding: ${theme.spacing(2)} ${theme.spacing(2)};
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(1)};
    gap: 0;
  }
`


// Individual static images (dynamically change with carousel)
export const StaticImage = styled.img`
  width: 200px;
  height: 220px;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(${theme.colors.primaryRgb}, 0.15);
  transition: transform ${theme.transitions.fast}, 
              box-shadow ${theme.transitions.fast},
              opacity 0.4s ease-in-out;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.85;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 0.85;
      transform: scale(1);
    }
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(${theme.colors.primaryRgb}, 0.3);
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    transform: scale(1.08);
    opacity: 1;
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 160px;
    height: 180px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    /* Hide second images on each side for tablet */
    &:nth-child(1),
    &:nth-child(4) {
      display: none;
    }
    width: 140px;
    height: 160px;
  }

  @media (max-width: 768px) {
    /* Hide all side images on mobile */
    display: none;
  }
`

// Central carousel container
export const CentralCarousel = styled.div`
  flex: 1;
  max-width: 600px;
  min-width: 400px;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.desktop}) {
    max-width: 500px;
    min-width: 350px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    min-width: 300px;
    flex: 1;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: auto;
    width: 100%;
  }
`

// Main preview card
export const MainCard = styled.div`
  position: relative;
  background: ${theme.colors.white};
  border-radius: 0;
  box-shadow: 0 8px 20px rgba(${theme.colors.primaryRgb}, 0.15);
  overflow: hidden;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.desktop}) {
    height: 320px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 280px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 240px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${(p) => (p.$zoomed ? "scale(1.6)" : "scale(1)")};
  transition: transform ${theme.transitions.fast};
  cursor: ${(p) => (p.$zoomed ? "zoom-out" : "zoom-in")};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }
`

// Navigation arrow buttons with modern design
export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(p) => (p.$position === "left" ? "left: 16px;" : "right: 16px;")}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: ${theme.borderRadius.circle};
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all ${theme.transitions.fast};
  backdrop-filter: blur(4px);

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 1);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    ${(p) => (p.$position === "left" ? "left: 12px;" : "right: 12px;")}
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    ${(p) => (p.$position === "left" ? "left: 8px;" : "right: 8px;")}
  }
`

export const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 18px;
    height: 18px;
  }
`


// Pagination dots (optional)
export const DotsRow = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing(3)};
`

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: ${theme.borderRadius.circle};
  border: none;
  background: ${(p) => (p.$active ? theme.colors.primary : theme.colors.gray[300])};
  transition: background ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${theme.colors.primary};
  }
`


// Caption component (outside the card)
export const Caption = styled.p`
  width: 100%;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  margin: 0;
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  font-family: ${theme.fonts.body};
  border-top: 2px solid ${theme.colors.primary};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    padding: ${theme.spacing(1.2)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    line-height: 1.3;
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

export const SkeletonImage = styled.div`
  width: 200px;
  height: 220px;
  border-radius: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  flex-shrink: 0;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 160px;
    height: 180px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    &:nth-child(1),
    &:nth-child(4) {
      display: none;
    }
    width: 140px;
    height: 160px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const SkeletonMainCard = styled.div`
  position: relative;
  background: ${theme.colors.white};
  border-radius: 0;
  box-shadow: 0 8px 20px rgba(${theme.colors.primaryRgb}, 0.15);
  overflow: hidden;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.desktop}) {
    height: 320px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 280px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 240px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`

export const SkeletonMainImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
`

export const SkeletonCaption = styled.div`
  width: 100%;
  height: 24px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  margin-top: ${theme.spacing(1.5)};
  border-radius: 4px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 18px;
  }
`