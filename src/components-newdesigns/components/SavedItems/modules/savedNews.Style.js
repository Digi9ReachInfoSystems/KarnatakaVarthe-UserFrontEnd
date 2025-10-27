import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  // padding: ${theme.spacing(3)} ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(1.75)};
  }
`

export const Container = styled.div`
  max-width: 100%;
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


export const Layout = styled.div`
  display: flex;
  gap: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(3)};
  }
`

export const Grid = styled.div`
  display: flex;

  flex-direction: row;
  gap: ${theme.spacing(3)};
  flex: 2;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2.5)};
  }
`

export const Card = styled.article`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.08);
  }
`

export const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${theme.colors.gray[100]};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`

export const Content = styled.div`
  padding: ${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(3)};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.75)} ${theme.spacing(1.75)} ${theme.spacing(2.25)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2.5)};
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
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
    line-height: 1.3;
    margin: 0 0 ${theme.spacing(1)};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: 17px;
    line-height: 1.35;
    margin: 0 0 ${theme.spacing(1.25)};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export const Excerpt = styled.p`
  font-size: 15px;
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin: 0;
  font-family: ${theme.fonts.body};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.5;
    -webkit-line-clamp: 2;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    font-size: 14px;
    line-height: 1.55;
    -webkit-line-clamp: 2;
  }
`

export const Sidebar = styled.aside`
  flex: 1;
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.gray[100]};
  padding: ${theme.spacing(2.5)};
  height: fit-content;

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
  max-height: 500px;
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
    max-height: 400px;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.25)};
    max-height: 450px;
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

export const SkeletonCard = styled.div`
  background: ${theme.colors.background};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${shimmer}
`

export const SkeletonImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;

  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 16 / 10;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 9;
  }
`

export const SkeletonContent = styled.div`
  padding: ${theme.spacing(2.5)} ${theme.spacing(2.5)} ${theme.spacing(3)};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.75)} ${theme.spacing(1.75)} ${theme.spacing(2.25)};
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2.5)};
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 80px;
    height: 32px;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    width: 100px;
    height: 34px;
  }
`