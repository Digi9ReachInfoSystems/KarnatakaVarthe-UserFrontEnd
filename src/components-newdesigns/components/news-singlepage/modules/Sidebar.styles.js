import styled from 'styled-components'
import theme from '../../../../theme/Theme'

export const SidebarContainer = styled.div`
  flex: 1;
  max-width: 35%;
  position: sticky;
  top: 24px;
  height: fit-content;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    position: static;
    margin-top: 24px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 16px;
  }
`

export const SidebarSection = styled.div`
  margin-bottom: 24px;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 16px;
  }
`

export const SectionTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 1rem;
  font-weight: 700;
  color: ${theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  padding: 20px 20px 16px;
  background: ${theme.colors.gray[100]};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px 16px 14px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 14px 14px 12px;
    font-size: 0.9rem;
  }
`

export const SocialMediaList = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px;
    gap: 6px;
  }
`

export const SocialMediaItem = styled.div`
  width: 100%;
`

export const SocialMediaButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  gap: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  min-height: 60px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 10px 12px;
    min-height: 50px;
    gap: 8px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 8px 10px;
    min-height: 45px;
    gap: 6px;
  }
`

export const SocialMediaIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  flex-shrink: 0;
`

export const SocialMediaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 4px;
  flex: 1;
`

export const SocialMediaStats = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.white};
  line-height: 1;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`

export const SocialMediaName = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  opacity: 0.9;
  color: ${theme.colors.white};
  line-height: 1.2;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`

export const SocialMediaAction = styled.span`
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  opacity: 0.9;
  color: ${theme.colors.white};
`

export const PopularNewsList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 400px;
  gap: 12px;
`

export const PopularNewsItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px;
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.transitions.fast};
  cursor: pointer;
  min-height: 60px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 50px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 8px;
    padding: 6px;
  }
`

export const PopularNewsImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  flex-shrink: 0;
  order: 2;
`

export const PopularNewsContent = styled.div`
  flex: 1;
  order: 1;
`

export const PopularNewsDate = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.primary};
  margin-bottom: 4px;
  font-weight: 500;
`

export const PopularNewsTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`

export const TrendingList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 400px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 12px;
    gap: 12px;
  }
`

export const TrendingItem = styled.div`
  display: flex;
  gap: 0;
  padding: 0;
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    padding: 8px;
    border-radius: ${theme.borderRadius.small};
  }
`

export const TrendingNumber = styled.div`
  width: 24px;
  height: 24px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.small};
  font-weight: 700;
  flex-shrink: 0;
`

export const TrendingContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const TrendingTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`

export const TrendingDate = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.primary};
  font-weight: 500;
  margin-bottom: 4px;
`

export const CategoryMenu = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

export const CategoryItem = styled.div`
  width: 100%;
`

export const CategoryLink = styled.a`
  display: block;
  padding: 12px 16px;
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.text};
  text-decoration: none;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  text-align: center;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`

export const NewsletterBox = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.Footerbg});
  color: ${theme.colors.white};
  text-align: center;
`

export const NewsletterTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`

export const NewsletterText = styled.p`
  font-size: ${theme.fontSizes.small};
  margin: 0 0 20px 0;
  opacity: 0.9;
  line-height: 1.5;
`

export const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const NewsletterInput = styled.input`
  padding: 12px 16px;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.medium};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.white};
  }
`

export const NewsletterButton = styled.button`
  padding: 12px 16px;
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
`

export const CalendarWidget = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, ${theme.colors.lightgreen}, ${theme.colors.light});
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
`

export const CalendarTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 12px 0;
`

export const CalendarDate = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 12px;
`

export const CalendarEvent = styled.p`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text};
  line-height: 1.5;
  margin: 0;
`

export const MostCommentedList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const MostCommentedItem = styled.div`
  padding: 12px;
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.gray[100]};
  }
`

export const MostCommentedTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  color: ${theme.colors.text};
  line-height: 1.4;
  margin: 0 0 4px 0;
`

export const MostCommentedComments = styled.div`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.primary};
  font-weight: 500;
`

export const SeeMoreButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  margin: 16px 16px 0 16px;
  align-self: flex-start;
  
  &:hover {
    background: ${theme.colors.Footerbg};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 10px 16px;
    margin: 12px 12px 0 12px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 8px 14px;
    margin: 10px 10px 0 10px;
    font-size: ${theme.fontSizes.small};
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
  ${shimmer}
`

export const SkeletonSocialButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: ${theme.borderRadius.small};
  ${shimmer}
`

export const SkeletonIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[300]} 25%,
    ${theme.colors.gray[200]} 50%,
    ${theme.colors.gray[300]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  flex-shrink: 0;
  ${shimmer}
`

export const SkeletonNewsItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  ${shimmer}
`

export const SkeletonThumbnail = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: ${theme.borderRadius.small};
  ${shimmer}
`

export const SkeletonTrendingItem = styled.div`
  padding: 16px;
  ${shimmer}
`