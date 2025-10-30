import styled, { createGlobalStyle } from "styled-components"
import theme from "../../../../theme/Theme"

// Global scrollbar styles to match the requested rules
export const GlobalScrollbars = createGlobalStyle`
  .custom-scrollbar {
    scrollbar-width: thin;                 /* Firefox */
    scrollbar-color: ${theme.colors.black} ${theme.colors.gray[200]};      /* thumb track */
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: ${theme.borderRadius.small};
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: ${theme.colors.black};
    border-radius: ${theme.borderRadius.small};
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[800]};
  }
  .custom-scrollbar::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`

// Layout wrappers
export const Wrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(3)} ${theme.spacing(2)};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  overflow-x: hidden;
  box-sizing: border-box;

  @media (min-width: 851px) and (max-width: 1100px) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(2)};
  }

   @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1)};
  }
`

// Tab Navigation
export const Tabs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(4)};
  align-items: center;
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding-bottom: ${theme.spacing(1.5)};
  margin-bottom: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: nowrap;
    gap: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(2.5)};
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    flex-wrap: nowrap;
    gap: 20px;
    padding-bottom: 10px;
    margin-bottom: 24px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 769px) and (max-width: ${theme.breakpoints.desktop}) {
    flex-wrap: nowrap;
    gap: ${theme.spacing(3)};
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const TabButton = styled.button`
  background: transparent;
  border: 0;
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  font-size: ${theme.fontSizes.large};
  cursor: pointer;
  position: relative;
  color: ${(p) => (p.$active ? theme.colors.black : theme.colors.gray[600])};
  outline: none;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    font-size: ${theme.fontSizes.medium};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.25)} ${theme.spacing(1.75)};
    font-size: 15px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -13px;
    height: 3px;
    width: ${(p) => (p.$active ? "100%" : "0")};
    background: ${theme.colors.black};
    transition: width ${theme.transitions.fast};

    @media (max-width: ${theme.breakpoints.mobile}) {
      bottom: -9px;
      height: 2px;
    }
  }

  &:hover {
    color: ${theme.colors.primary};
  }
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(2)};
  gap: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(2)};
    gap: ${theme.spacing(1)};
    flex-wrap: wrap;
  }
`

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  letter-spacing: 0.5px;
  color: ${theme.colors.black};
  text-transform: uppercase;
  margin: 0;
  text-align: left;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
    letter-spacing: 0.3px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    letter-spacing: 0.2px;
    flex: 1;
    text-align: center;
    min-width: 0;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(3)};
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 2fr 1fr; /* left image / right news list */
    gap: ${theme.spacing(4)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2)};
  }
`

export const Column = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
`

// Left & Right lists
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  max-height: 400px;
  overflow: hidden;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
  text-align: left;

  @media (min-width: ${theme.breakpoints.desktop}) {
    overflow-y: auto;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 400px;
    overflow-y: auto;
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 400px;
    overflow-y: auto;
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    gap: ${theme.spacing(2.5)};
  }
`

export const Item = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  text-align: left;
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  flex-wrap: wrap;
`

export const Badge = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing(0.5)} ${theme.spacing(1.25)};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  font-weight: 600;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    padding: ${theme.spacing(0.375)} ${theme.spacing(1)};
  }
`

export const DateText = styled.span`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`

export const Headline = styled.h3`
  font-size: ${theme.fontSizes.medium};
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  line-height: 1.3;
  color: ${theme.colors.black};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.875rem;
    line-height: 1.35;
  }
`

export const Summary = styled.p`
  color: ${theme.colors.gray[700]};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  line-height: 1.5;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`

export const Divider = styled.hr`
  border: 0;
  margin: ${theme.spacing(1)} 0 0;
  display: none;
`

// Center feature
export const FeatureCard = styled.article`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all ${theme.transitions.fast};
  position: relative;
  min-height: 220px;
  max-height: 400px;
  height: auto;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: ${theme.borderRadius.small};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    min-height: 180px;
    max-height: 260px;
    height: auto;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    min-height: 200px;
    max-height: 320px;
    height: auto;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.13);
    }
  }

  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
  }
`

export const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const FeatureOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0.0) 20%, rgba(10,10,10,0.75) 85%);
`

export const FeatureContent = styled.div`
  position: absolute;
  left: ${theme.spacing(2.5)};
  right: ${theme.spacing(2.5)};
  bottom: ${theme.spacing(2.5)};
  color: ${theme.colors.white};
  max-width: 100%;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    left: ${theme.spacing(2)};
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: ${theme.spacing(1.5)};
    right: ${theme.spacing(1.5)};
    bottom: ${theme.spacing(1.5)};
  }
`

export const FeatureTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  font-family: ${theme.fonts.heading};
  line-height: 1.25;
  margin-top: ${theme.spacing(1.25)};
  margin-bottom: 0;
  color: ${theme.colors.black};
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (min-width: ${theme.breakpoints.desktop}) {
    font-size: 2rem;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    margin-top: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-top: ${theme.spacing(0.5)};
  }
`

export const FeatureExcerpt = styled.p`
  margin-top: ${theme.spacing(1)};
  margin-bottom: 0;
  color: rgba(255,255,255,0.9);
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
  max-width: 60ch;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    margin-top: ${theme.spacing(0.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    line-height: 1.4;
    margin-top: ${theme.spacing(0.5)};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export const SeeMoreBtn = styled.button`
  align-self: flex-start;
  margin-top: ${theme.spacing(1)};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing(1.25)} ${theme.spacing(1.75)};
  font-weight: 600;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.small};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover { 
    filter: brightness(0.95); 
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    font-size: 0.8rem;
  }
`

// News item with image layout
export const NewsItemContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`

export const NewsImageContainer = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  background: ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`

export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const NewsContentContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.75)};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.5)};
  }
`

// Feature card specific styles
export const FeatureMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  margin-top: ${theme.spacing(1)};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(0.5)};
    gap: ${theme.spacing(0.375)};
  }
`

export const FeatureAuthor = styled.span`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`

export const FeatureDateText = styled.span`
  color: ${theme.colors.Gray600};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  opacity: 0.9;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`

export const FeatureTagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1.5)};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(1)};
    gap: ${theme.spacing(0.75)};
  }
`

export const FeatureBadge = styled.span`
  background: rgba(210, 210, 210, 0.6);
  color: ${theme.colors.white};
  border-radius: 20px;
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-block;
  text-align: center;
  min-width: fit-content;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
    font-size: 0.7rem;
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

export const SkeletonTabButton = styled.div`
  width: 120px;
  height: 36px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 6px;
  flex-shrink: 0;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 80px;
    height: 32px;
  }
`

export const SkeletonFeatureCard = styled.div`
  position: relative;
  height: 550px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 450px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 350px;
  }
`

export const SkeletonFeatureContent = styled.div`
  position: absolute;
  left: ${theme.spacing(2.5)};
  right: ${theme.spacing(2.5)};
  bottom: ${theme.spacing(2.5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: ${theme.spacing(2)};
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
  }
`

export const SkeletonNewsItem = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`

export const SkeletonThumbnail = styled.div`
  width: 150px;
  height: 100px;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 130px;
    height: 90px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 70px;
  }
`

export const SkeletonLine = styled.div`
  height: ${props => props.height || '16px'};
  width: ${props => props.width || '100%'};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
`