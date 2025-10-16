import styled from 'styled-components'
import theme from '../../../../theme/Theme'

export const MainContentContainer = styled.div`
  flex: 2;
  padding: 20px;
  max-width: 100%;
  overflow-x: hidden;
  word-wrap: break-word;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-right: 0;
    max-width: 100%;
    padding: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px;
  }
`

export const DateTag = styled.div`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 5px 10px;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  display: inline-block;
  margin-bottom: 10px;
  max-width: 100%;
  word-wrap: break-word;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: 4px 8px;
  }
`

export const LocationTag = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 11px;
    letter-spacing: 0.3px;
  }
`

export const ArticleTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1.2;
  margin-bottom: 12px;
  margin-top: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 10px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

export const AuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 14px 16px;
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 14px;
    padding: 12px 14px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 12px;
    padding: 10px;
    gap: 10px;
  }
`

export const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray[200]};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
  }
`

export const AuthorInfo = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`

export const AuthorName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 15px;
  }
`

export const ArticleMeta = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 10px;
  }
`

export const MetaItem = styled.span`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.gray[600]};
  display: flex;
  align-items: center;
  background-color: ${theme.colors.gray[200]};
  padding: 4px 8px;
  border-radius: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.gray[300]};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3px 6px;
    font-size: 11px;
  }
`

export const HeroImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
    margin-bottom: 14px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 250px;
    margin-bottom: 12px;
    border-radius: ${theme.borderRadius.small};
  }
`

export const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: ${theme.colors.white};
  padding: 24px 20px 16px;
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 20px 16px 12px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 16px 12px 10px;
    font-size: ${theme.fontSizes.small};
  }
`

export const ArticleContent = styled.div`
  line-height: 1.75;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  margin-top: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: 100%;
`

export const ArticleParagraph = styled.p`
  font-size: ${theme.fontSizes.large};
  margin-bottom: 14px;
  text-align: justify;
  line-height: 1.7;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 15px;
    margin-bottom: 12px;
    line-height: 1.65;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: 10px;
    text-align: justify;
    line-height: 1.6;
  }
`

export const QuoteBlock = styled.blockquote`
  background: ${theme.colors.light};
  border-left: 4px solid ${theme.colors.primary};
  padding: 24px;
  margin: 32px 0;
  border-radius: ${theme.borderRadius.medium};
  position: relative;
  
  &::before {
    content: '"';
    font-size: 4rem;
    color: ${theme.colors.primary};
    position: absolute;
    top: -10px;
    left: 16px;
    font-family: serif;
  }
  
  &::after {
    content: '"';
    font-size: 4rem;
    color: ${theme.colors.primary};
    position: absolute;
    bottom: -20px;
    right: 16px;
    font-family: serif;
  }
`

export const QuoteText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  font-style: italic;
  padding-left: 20px;
`

export const InlineAd = styled.div`
  margin: 32px 0;
  padding: 20px;
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.gray[200]};
`

export const AdContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const AdImage = styled.div`
  width: 100%;
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
`

export const ArticleTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 40px 0;
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.gray[200]};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 32px 0;
    padding-top: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 24px 0;
    padding-top: 16px;
    gap: 6px;
  }
`

export const Tag = styled.span`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.small};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  font-weight: 500;
  text-transform: lowercase;
  
  &:hover {
    background: ${theme.colors.Footerbg};
    cursor: pointer;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 10px;
    font-size: 11px;
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
  margin-bottom: ${props => props.$marginBottom || '0'};
  ${shimmer}
`

export const SkeletonImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  margin-bottom: 32px;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
    margin-bottom: 24px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 250px;
    margin-bottom: 20px;
    border-radius: ${theme.borderRadius.small};
  }
`

export const SkeletonAuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 16px 20px;
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.medium};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 24px;
    padding: 14px 16px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 20px;
    padding: 12px;
    gap: 12px;
  }
`

export const SkeletonAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 45px;
    height: 45px;
  }
`

// ========================================
// AUDIO BOOK BUTTON STYLES
// ========================================
export const AudioBookContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-bottom: 16px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

export const AudioBookButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${theme.colors.white};
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #1976d2;
  }
  
  &:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }
`

export const AudioBookIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #5a5a5a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;
  }
`

export const AudioBookText = styled.span`
  color: #1976d2;
  font-weight: 600;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`
