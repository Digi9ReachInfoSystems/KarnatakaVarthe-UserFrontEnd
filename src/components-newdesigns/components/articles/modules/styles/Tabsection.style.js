import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing(3)} ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(1.75)};
  }
`

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 0 ${theme.spacing(2.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: 0 ${theme.spacing(1.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    max-width: 95%;
    padding: 0 ${theme.spacing(2)};
  }
`

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

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    flex-wrap: nowrap;
    gap: ${theme.spacing(2.5)};
    padding-bottom: ${theme.spacing(1.25)};
    margin-bottom: ${theme.spacing(3)};
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

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
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

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3)};
  }

  @media (min-width: 769px) and (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3.5)};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(3.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
  }

  @media (min-width: 769px) and (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(3)};
  }
`

export const Card = styled.article`
  background: ${theme.colors.background};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 5 / 5;
  background: ${theme.colors.gray[100]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 4 / 3;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 9;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const Content = styled.div`
  padding: ${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.25)} ${theme.spacing(2.25)} ${theme.spacing(2.75)};
  }
`

export const DateText = styled.p`
  color: ${theme.colors.primary};
  font-size: 13px;
  margin: 0 0 ${theme.spacing(1.25)};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
    margin: 0 0 ${theme.spacing(1)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    margin: 0 0 ${theme.spacing(1.125)};
  }
`

export const Title = styled.h3`
  font-size: 20px;
  line-height: 1.4;
  margin: 0 0 ${theme.spacing(1.5)};
  font-weight: 600;
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.large};
    line-height: 1.3;
    margin: 0 0 ${theme.spacing(1.25)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: 18px;
    line-height: 1.35;
    margin: 0 0 ${theme.spacing(1.375)};
  }
`

export const Excerpt = styled.p`
  font-size: 15px;
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin: 0;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.medium};
    line-height: 1.5;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.medium};
    line-height: 1.55;
  }
`

export const Sidebar = styled.aside`
  border: none;
  padding: ${theme.spacing(2.5)};
  height: fit-content;
  border-radius: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.25)};
  }
`

export const SideList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${theme.spacing(2.5)};
max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.gray[400]} ${theme.colors.gray[100]};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[400]};
    border-radius: 3px;
    
    &:hover {
      background: ${theme.colors.gray[500]};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
    max-height: 300px;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.25)};
    max-height: 400px;
  }
`

export const SideItem = styled.li`
  border-bottom: none;
  padding-bottom: 0;
`

export const SideDate = styled.span`
  display: block;
  color: ${theme.colors.primary};
  font-size: 13px;
  margin-bottom: ${theme.spacing(1)};
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
    margin-bottom: ${theme.spacing(0.75)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    margin-bottom: ${theme.spacing(0.875)};
  }
`

export const SideTitle = styled.h4`
  font-size: ${theme.fontSizes.large};
  margin: 0;
  color: ${theme.colors.text};
  line-height: 1.3;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.medium};
    line-height: 1.25;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: 15px;
    line-height: 1.28;
  }
`

export const SideExcerpt = styled.p`
  font-size: 13px;
  color: ${theme.colors.gray[500]};
  line-height: 1.4;
  margin: ${theme.spacing(1)} 0 0;
  font-family: ${theme.fonts.body};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
    line-height: 1.35;
    margin: ${theme.spacing(0.75)} 0 0;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    line-height: 1.38;
    margin: ${theme.spacing(0.875)} 0 0;
  }
`

export const SeeMoreWrap = styled.div`
  margin-top: ${theme.spacing(2)};
  display: flex;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(1.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(1.75)};
  }
`

export const SeeMoreBtn = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: 0;
  margin-top: ${theme.spacing(3.75)};
  padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
  font-size: ${theme.fontSizes.medium};
  cursor: pointer;
  width: 100%;
  font-family: ${theme.fonts.body};
  transition: ${theme.transitions.fast};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(2.5)};
    padding: ${theme.spacing(1.25)} ${theme.spacing(2.5)};
    font-size: 13px;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(3)};
    padding: ${theme.spacing(1.375)} ${theme.spacing(2.75)};
    font-size: 13px;
  }

  &:hover {
    filter: brightness(0.95);
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

export const SkeletonTabs = styled.div`
  display: flex;
  gap: ${theme.spacing(4)};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding-bottom: ${theme.spacing(1.5)};
  margin-bottom: ${theme.spacing(4)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(2.5)};
  }
`

export const SkeletonTab = styled.div`
  width: 120px;
  height: 40px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    height: 32px;
  }
`

export const SkeletonCard = styled.div`
  background: ${theme.colors.background};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${shimmer}
`

export const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 5 / 5;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 4 / 3;
  }
`

export const SkeletonContent = styled.div`
  padding: ${theme.spacing(2.5)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`

export const SkeletonDate = styled.div`
  width: 120px;
  height: 14px;
  margin-bottom: ${theme.spacing(1.25)};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 12px;
  }
`

export const SkeletonTitle = styled.div`
  width: ${props => props.width || "90%"};
  height: 20px;
  margin-bottom: ${theme.spacing(1.5)};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 16px;
  }
`

export const SkeletonExcerpt = styled.div`
  width: ${props => props.width || "100%"};
  height: 15px;
  margin-bottom: ${theme.spacing(0.75)};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 14px;
  }
`

export const SkeletonSideItem = styled.div`
  padding-bottom: ${theme.spacing(2.5)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-bottom: ${theme.spacing(2)};
  }
`