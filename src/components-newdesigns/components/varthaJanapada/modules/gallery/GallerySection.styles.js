import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  background: ${theme.colors.background};
  padding-top: ${theme.spacing(5)};
  padding-bottom: ${theme.spacing(6)};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  overflow-x: hidden;
  box-sizing: border-box;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
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
    gap: 8px;
  }
`

export const SectionTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  position: relative;
  flex: 1;
  min-width: 0;

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
      width: min(150px, 55%);
    }
  }
`

export const ShowMoreLink = styled.a`
  flex-shrink: 0;
  text-decoration: none;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.heading};
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`

// Main gallery container with single row layout
export const GalleryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(2.5)} ${theme.spacing(4)};
  background: ${theme.colors.background};
  flex-wrap: nowrap;
  overflow-x: hidden;

  @media (max-width: 1026px) {
    padding: ${theme.spacing(2)} ${theme.spacing(1)};
    gap: 8px;
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    gap: 8px;
    max-width: 95%;
    padding: ${theme.spacing(2)} ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 6px;
    padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 12px;
  }
`


// Individual static images (dynamically change with carousel)
export const StaticImage = styled.img`
  width: 230px;
  height: 300px;
  object-fit: contain;
  object-position: center;
  background: #000;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(${theme.colors.primaryRgb}, 0.15);
  transition: transform ${theme.transitions.fast}, 
              box-shadow ${theme.transitions.fast},
              opacity 0.4s ease-in-out,
              width 0.35s ease;
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
    width: 190px;
    height: 250px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    /* Hide second images on each side for tablet */
    &:nth-child(1),
    &:nth-child(4) {
      display: none;
    }
    width: 110px;
    height: 160px;
  }

  @media (max-width: 768px) {
    /* Hide all side images on mobile */
    display: none !important;
  }
`

// Central carousel container — hug active slide (no extra side whitespace)
export const CentralCarousel = styled.div`
  flex: 0 0 auto;
  width: fit-content;
  max-width: min(720px, 100%);
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;

  @media (max-width: ${theme.breakpoints.desktop}) {
    max-width: min(600px, 100%);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex: 1 1 auto;
    width: auto;
    min-width: 0;
    max-width: calc(100% - 236px);
  }

  @media (max-width: 768px) {
    flex: 1 1 auto;
    width: 100%;
    max-width: 100%;
  }
`

// Main preview card — shrink-wraps to image (no wide black side bars)
export const MainCard = styled.div`
  position: relative;
  background: transparent;
  border-radius: 0;
  box-shadow: 0 8px 20px rgba(${theme.colors.primaryRgb}, 0.15);
  overflow: hidden;
  width: fit-content;
  max-width: 100%;
  height: auto;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: width 0.35s ease, height 0.35s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0;
    width: 100%;
    max-width: 100%;
    box-shadow: 0 6px 16px rgba(${theme.colors.primaryRgb}, 0.12);
  }

  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
    max-width: 100%;
    background: transparent;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
  }
`

export const MainImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: min(72vh, 620px);
  object-fit: contain;
  object-position: center center;
  display: block;
  margin: 0 auto;
  background: transparent;
  transform: ${(p) => (p.$zoomed ? "scale(1.6)" : "scale(1)")};
  transition: transform ${theme.transitions.fast}, opacity 0.35s ease, max-height 0.35s ease;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.desktop}) {
    max-height: min(68vh, 560px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: min(58vh, 420px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: min(70vh, 560px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: min(68vh, 480px);
  }

  @media (max-width: 480px) {
    max-height: min(65vh, 420px);
  }

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
    ${(p) => (p.$position === "left" ? "left: 8px;" : "right: 8px;")}
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${(p) => (p.$position === "left" ? "left: 10px;" : "right: 10px;")}
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

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
  width: 230px;
  height: 300px;
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
    width: 190px;
    height: 250px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    &:nth-child(1),
    &:nth-child(4) {
      display: none;
    }
    width: 110px;
    height: 160px;
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`

export const SkeletonMainCard = styled.div`
  position: relative;
  background: ${theme.colors.white};
  border-radius: 0;
  box-shadow: 0 8px 20px rgba(${theme.colors.primaryRgb}, 0.15);
  overflow: hidden;
  width: fit-content;
  max-width: 100%;
  min-width: 280px;
  height: min(72vh, 620px);
  max-height: 620px;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.desktop}) {
    height: min(68vh, 560px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: min(62vh, 480px);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: min(58vh, 440px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: min(52vh, 380px);
  }

  @media (max-width: 480px) {
    height: min(48vh, 320px);
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
