import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    padding: ${theme.spacing(2.5)} ${theme.spacing(2)}; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    padding: ${theme.spacing(3)} ${theme.spacing(2.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    padding: ${theme.spacing(3)} ${theme.spacing(2)}; 
  }
`

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(2)};
`

export const Title = styled.h2`
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  letter-spacing: -0.01em;
  color: ${theme.colors.text};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: 20px; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: 22px; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: ${theme.fontSizes.large}; 
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(1.5)};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    gap: ${theme.spacing(2)}; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    grid-template-columns: repeat(2, 1fr); 
    gap: ${theme.spacing(2)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    grid-template-columns: repeat(3, 1fr); 
    gap: ${theme.spacing(2)}; 
  }
`

export const Card = styled.article`
  overflow: hidden;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  transition: ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 1px 2px rgba(0,0,0,0.06),
      0 8px 24px rgba(0,0,0,0.08);
  }
`

export const ThumbWrap = styled.a`
  display: block;
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.gray[100]};
  
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Content = styled.div`
  padding: 12px 12px 14px;
  display: grid;
  gap: ${theme.spacing(0.75)};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    padding: 14px 14px 16px;
    gap: ${theme.spacing(1)};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    padding: 14px 14px 16px;
    gap: ${theme.spacing(1)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    padding: 14px 14px 16px;
    gap: ${theme.spacing(1)};
  }
`

export const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.primary};
  background: #e3f2fd; /* blue-100 */
  border: 1px solid #bbdefb; /* blue-200 */
  padding: 4px 8px;
  border-radius: 999px;
`

export const TitleLink = styled.a`
  font-size: 14px;
  line-height: 1.35;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  text-decoration: none;
  
  &:hover { 
    color: ${theme.colors.primary}; 
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: 15px; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: 16px; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: ${theme.fontSizes.large}; 
  }
`

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.gray[500]};
  font-size: 12px;
  font-family: ${theme.fonts.body};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    gap: 10px;
    font-size: 13px;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    gap: 10px;
    font-size: 13px;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    gap: 10px;
    font-size: 13px;
  }
`

export const DividerTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 16px;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  letter-spacing: -0.01em;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    margin-top: 26px;
    font-size: 17px;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    margin-top: 28px;
    font-size: 18px;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    margin-top: 28px;
    font-size: 18px;
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
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background};
  ${shimmer}
`

export const SkeletonThumb = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
`

export const SkeletonContent = styled.div`
  padding: ${theme.spacing(2)} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
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