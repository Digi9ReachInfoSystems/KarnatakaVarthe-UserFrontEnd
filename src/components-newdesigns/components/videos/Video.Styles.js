import styled, { keyframes } from 'styled-components';
import theme from '../../../theme/Theme';
export const ArticlesSection = styled.section`
  background-color: ${theme.colors.background};
`;

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
  overflow: hidden;

  @media (max-width: 1100px) {
    padding: ${theme.spacing1(9)} ${theme.spacing1(8)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(6)} ${theme.spacing1(4)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(4)} ${theme.spacing1(2)};
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(6)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing1(1)};
  }
`;

export const Title = styled.h2`
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
`;

export const ArticlesGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing(1)};
  overflow-x: hidden;
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }
`;

export const MainArticle = styled.article`
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
`;

export const SmallArticlesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  width: 100%;
  overflow-x: hidden;

  @media (min-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${theme.spacing(1)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1100px) {
    gap: ${theme.spacing(0.75)};
  }

  @media (min-width: 1100px) {
    flex-wrap: nowrap;
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: 1280px) {
    gap: ${theme.spacing(2)};
  }
`;
export const ViewMoreButton = styled.a`
  display: inline-block;
  width: fit-content;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius:8px;
  padding: ${theme.spacing1(3)} ${theme.spacing1(5)};
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(${theme.colors.primaryRgb || '0,0,0'}, 0.2);
  transition: ${theme.transitions.fast};

  &:hover {
    filter: brightness(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2)} ${theme.spacing1(4)};
    font-size: 11px;
  }
`
export const SmallArticle = styled.article`
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  padding: ${theme.spacing(1)};
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  flex: 1 1 100%;

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - ${theme.spacing(0.5)});
    max-width: calc(50% - ${theme.spacing(0.5)});
    min-width: 0;
    padding: ${theme.spacing(0.875)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1100px) {
    flex: 1 1 calc(25% - ${theme.spacing(0.75)});
    max-width: calc(25% - ${theme.spacing(0.75)});
    min-width: 190px;
    padding: ${theme.spacing(0.875)};
  }

  @media (min-width: 1100px) and (max-width: ${theme.breakpoints.large}) {
    padding: ${theme.spacing(1)};
    flex: 1 1 0;
    min-width: 220px;
    max-width: none;
  }

  @media (min-width: ${theme.breakpoints.large}) {
    padding: ${theme.spacing(1.5)};
    flex: 1 1 0;
    min-width: 260px;
    max-width: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${props => props.large ? '300px' : '150px'};

  @media (min-width: ${theme.breakpoints.mobile}) {
    height: ${props => props.large ? '350px' : '160px'};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: ${props => props.large ? '400px' : '170px'};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: ${props => props.large ? '500px' : '180px'};
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.fast};

  ${MainArticle}:hover &,
  ${SmallArticle}:hover & {
    transform: scale(1.05);
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 5;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid ${theme.colors.primary};
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 4px;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: ${theme.colors.white};
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.05);
  }

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 56px;
    height: 56px;

    &::before {
      border-left: 18px solid ${theme.colors.primary};
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      margin-left: 3px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;

    &::before {
      border-left: 16px solid ${theme.colors.primary};
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      margin-left: 3px;
    }
  }
`;

export const Badge = styled.span`
  position: absolute;
  bottom: 80px;
  left: ${theme.spacing(2)};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing1(1)} ${theme.spacing(1.5)};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  text-transform: uppercase;
  z-index: 3;
  
  /* For small articles, position normally in content area */
  ${SmallArticle} & {
    position: static;
    display: inline-block;
    margin-bottom: ${theme.spacing(0.5)};
    z-index: auto;
  }
`;

export const ArticleContent = styled.div`
  padding: ${theme.spacing(1)};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.25)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(1.5)};
  }
  
  /* Only apply overlay styles when inside MainArticle */
  ${MainArticle} & {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    z-index: 2;
    padding: ${theme.spacing(1.5)};
  }
`;

export const ArticleTitle = styled.h3`
  font-size: ${props => props.large ? '14px' : '12px'};
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  text-transform: uppercase;
  transition: color ${theme.transitions.fast};
  line-height: 1.3;

  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${props => props.large ? '16px' : '13px'};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${props => props.large ? '17px' : '14px'};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    font-size: ${props => props.large ? '18px' : theme.fontSizes.medium};
  }

  /* White text when in overlay (main article) */
  ${MainArticle} & {
    color: ${theme.colors.white};
  }

  ${MainArticle}:hover &,
  ${SmallArticle}:hover & {
    color: ${theme.colors.primary};
  }
  
  /* Keep white color on hover for main article overlay */
  ${MainArticle}:hover & {
    color: ${theme.colors.white};
  }
`;

// Shimmer effect animation
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const ShimmerContainer = styled.div`
  width: 100%;
`;

export const ShimmerArticlesGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }
`;

export const ShimmerMainArticle = styled.div`
  height: 300px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
    background-size: 468px 100%;
    animation: ${shimmer} 1.5s infinite linear;
  }

  @media (min-width: ${theme.breakpoints.mobile}) {
    height: 350px;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: 500px;
  }
`;

export const ShimmerSmallArticlesGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }
`;
export const ShimmerThumbnail = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  width: 100%;
  overflow-x: hidden;

  @media (min-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${theme.spacing(1)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1100px) {
    gap: ${theme.spacing(0.75)};
  }
  
  @media (min-width: 1100px) {
    flex-wrap: nowrap;
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: 1280px) {
    gap: ${theme.spacing(2)};
  }
`;

export const ShimmerSmallArticle = styled.div`
  height: 150px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  width: 100%;
  flex: 1 1 100%;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
    background-size: 468px 100%;
    animation: ${shimmer} 1.5s infinite linear;
  }

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - ${theme.spacing(0.5)});
    max-width: calc(50% - ${theme.spacing(0.5)});
    height: 160px;
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1100px) {
    flex: 1 1 calc(25% - ${theme.spacing(0.75)});
    max-width: calc(25% - ${theme.spacing(0.75)});
    min-width: 190px;
    height: 170px;
  }

  @media (min-width: 1100px) {
    flex: 1 1 0;
    min-width: 220px;
    max-width: none;
    height: 180px;
  }
`;
