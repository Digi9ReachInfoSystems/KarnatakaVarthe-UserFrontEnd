import styled, { keyframes } from 'styled-components';
import theme from '../../../../../theme/Theme';

export const ArticlesSection = styled.section`
  background-color: ${theme.colors.background};
`;

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
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
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(1)};
  }
`;

export const MainArticle = styled.article`
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
`;

export const SmallArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    gap: ${theme.spacing(1)};
  }
`;

export const SmallArticle = styled.article`
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  padding: ${theme.spacing(0.5)};

  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(0.5)};
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

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 35px;
  background-color: ${theme.colors.primaryVideo};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  z-index: 4;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 14px solid ${theme.colors.white};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    margin-left: 3px;
  }

  @media (min-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 42px;
    border-radius: 10px;
    
    &::after {
      border-left: 16px solid ${theme.colors.white};
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      margin-left: 3px;
    }
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 65px;
    height: 46px;
    border-radius: 11px;
    
    &::after {
      border-left: 18px solid ${theme.colors.white};
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      margin-left: 4px;
    }
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    width: 70px;
    height: 50px;
    border-radius: 12px;
    
    &::after {
      border-left: 20px solid ${theme.colors.white};
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 4px;
    }
  }

  /* Smaller play button for small articles */
  ${SmallArticle} & {
    width: 40px;
    height: 28px;
    border-radius: 6px;
    
    &::after {
      border-left: 12px solid ${theme.colors.white};
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      margin-left: 2px;
    }

    @media (min-width: ${theme.breakpoints.mobile}) {
      width: 45px;
      height: 32px;
      border-radius: 7px;
      
      &::after {
        border-left: 13px solid ${theme.colors.white};
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        margin-left: 3px;
      }
    }

    @media (min-width: ${theme.breakpoints.tablet}) {
      width: 48px;
      height: 34px;
      border-radius: 8px;
      
      &::after {
        border-left: 14px solid ${theme.colors.white};
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        margin-left: 3px;
      }
    }

    @media (min-width: ${theme.breakpoints.desktop}) {
      width: 50px;
      height: 35px;
      border-radius: 8px;
      
      &::after {
        border-left: 14px solid ${theme.colors.white};
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        margin-left: 3px;
      }
    }
  }

  ${MainArticle}:hover &,
  ${SmallArticle}:hover & {
    transform: translate(-50%, -50%) scale(1.1);
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
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(1)};
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
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    gap: ${theme.spacing(1)};
  }
`;

export const ShimmerSmallArticle = styled.div`
  height: 150px;
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
    height: 160px;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 170px;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: 180px;
  }
`;
