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

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
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

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1.4fr 1fr; /* left / center / right */
    gap: ${theme.spacing(3.5)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
  }
`

export const Column = styled.div``

// Left & Right lists
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  max-height: 560px;
  overflow: hidden;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};

  @media (min-width: ${theme.breakpoints.desktop}) {
    overflow-y: auto;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 500px;
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
  color: ${theme.colors.gray};
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
  text-align: left;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
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
  position: relative;
  height: 550px;
  overflow: hidden;
  background: ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 450px;
    order: -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 350px;
    order: -1;
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

  @media (max-width: ${theme.breakpoints.tablet}) {
    left: ${theme.spacing(2.5)};
    right: ${theme.spacing(2.5)};
    bottom: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    left: ${theme.spacing(2)};
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
  }
`

export const FeatureTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  font-family: ${theme.fonts.heading};
  line-height: 1.25;
  margin-top: ${theme.spacing(1.25)};
  color: ${theme.colors.white};

  @media (min-width: 1026px) {
    font-size: 1.75rem;
    overflow-x: hidden;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`

export const FeatureExcerpt = styled.p`
  margin-top: ${theme.spacing(1)};
  color: rgba(255,255,255,0.9);
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
  max-width: 60ch;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
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

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  ${shimmer}
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
    order: -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 350px;
    order: -1;
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