import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: ${theme.colors.background};
  padding: ${theme.spacing(4)} 0;

  @media screen and (max-width: 1026px) {
    padding: ${theme.spacing(2)} 0;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(4)} 0;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(5)} 0;
  }
`

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(2)};

  @media screen and (max-width: 1026px) {
    gap: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(3)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${theme.spacing(3.5)};
  }
`

export const FeaturedCard = styled.article`
  background: ${theme.colors.background};
  overflow: hidden;
  transition: ${theme.transitions.fast};
  grid-column: 1 / -1;

  &:hover {
    transform: translateY(-4px);
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-column: 1 / 2;
  }
`

export const FeaturedImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.gray[100]};

  @media screen and (max-width: 1026px) {
    width: 100%;
    aspect-ratio: 16 / 10;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 95%;
    aspect-ratio: 4 / 3;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    width: 90%;
    aspect-ratio: 4 / 5;
  }
`

export const FeaturedContent = styled.div`
  padding: ${theme.spacing(1.5)} 0;

  @media screen and (max-width: 1026px) {
    padding: ${theme.spacing(1)} 0;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} 0;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(3)} 0;
  }
`

export const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(1.5)};
  flex-wrap: wrap;
`

export const FeaturedTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  line-height: 1.3;
  margin-bottom: ${theme.spacing(1)};

  @media screen and (max-width: 1026px) {
    font-size: 1.1rem;
    margin-bottom: ${theme.spacing(0.75)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 1.75rem;
    margin-bottom: ${theme.spacing(1.5)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    font-size: 2rem;
  }
`

export const FeaturedExcerpt = styled.p`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  line-height: 1.5;
  color: ${theme.colors.lightText};
  margin: 0;

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.medium};
    line-height: 1.6;
  }
`

export const NewsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }
`

export const ColumnHeader = styled.h3`
  font-size: ${theme.fontSizes.medium};
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing(0.5)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.large};
    margin-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`

export const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  max-height: 1200px;
  overflow-y: auto;

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

  @media screen and (max-width: 1026px) {
    max-height: 600px;
    gap: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
    max-height: 400px;
  }
      @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
    max-height: 300px;
  }
`

export const NewsItem = styled.article`
  background: ${theme.colors.background};
  padding: ${theme.spacing(1.5)} 0;
  transition: ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  @media screen and (max-width: 1026px) {
    padding: ${theme.spacing(1)} 0;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} 0;
  }

  p {
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.body};
    line-height: 1.4;
    color: ${theme.colors.lightText};
    margin: ${theme.spacing(0.5)} 0 0 0;

    @media screen and (max-width: 1026px) {
      font-size: 11px;
      margin: ${theme.spacing(0.25)} 0 0 0;
    }

    @media (min-width: ${theme.breakpoints.tablet}) {
      font-size: ${theme.fontSizes.medium};
      line-height: 1.5;
      margin: ${theme.spacing(0.75)} 0 0 0;
    }
  }
`

export const NewsItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(0.75)};
  }
`

export const NewsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  line-height: 1.3;
  margin: 0;

  @media screen and (max-width: 1026px) {
    font-size: 0.9rem;
    line-height: 1.2;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 1.1rem;
    line-height: 1.4;
  }
`

export const NewsDate = styled.span`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.primary};
  font-weight: 600;
`

export const NewsAuthor = styled.span`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.textgray};
  position: relative;
  padding-left: ${theme.spacing(1)};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${theme.colors.textgray};
  }
`

export const PopularItem = styled.article`
  display: flex;
  gap: ${theme.spacing(1)};
  background: ${theme.colors.background};
  padding: ${theme.spacing(1)} 0;
  transition: ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  @media screen and (max-width: 1026px) {
    gap: ${theme.spacing(0.75)};
    padding: ${theme.spacing(0.75)} 0;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.5)};
    padding: ${theme.spacing(1.25)} 0;
  }
`

export const PopularThumbnail = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  overflow: hidden;
  background: ${theme.colors.gray[100]};

  @media screen and (max-width: 1026px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 90px;
    height: 90px;
  }
`

export const PopularContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.5)};
  justify-content: center;

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(0.75)};
  }
`

export const PopularTitle = styled.h5`
  font-size: 0.85rem;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (max-width: 1026px) {
    font-size: 0.8rem;
    -webkit-line-clamp: 1;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: 0.95rem;
    line-height: 1.4;
    -webkit-line-clamp: 3;
  }
`

export const PopularDate = styled.span`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.primary};
  font-weight: 600;
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

  @media screen and (max-width: 1026px) {
    margin-top: ${theme.spacing(2)};
    padding: ${theme.spacing(1.25)} ${theme.spacing(2)};
    font-size: 13px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(2.5)};
    padding: ${theme.spacing(1.25)} ${theme.spacing(2.5)};
    font-size: 13px;
  }

  @media (min-width: 481px) and (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(3)};
    padding: ${theme.spacing(1.25)} ${theme.spacing(2.75)};
    font-size: ${theme.fontSizes.small};
  }

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
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

export const SkeletonFeaturedCard = styled.div`
  background: ${theme.colors.background};
  overflow: hidden;
  grid-column: 1 / -1;
  ${shimmer}

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-column: 1 / 2;
  }
`

export const SkeletonFeaturedImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 95%;
    aspect-ratio: 4 / 3;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    width: 90%;
    aspect-ratio: 4 / 5;
  }
`

export const SkeletonFeaturedContent = styled.div`
  padding: ${theme.spacing(1.5)} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)} 0;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(3)} 0;
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

export const SkeletonNewsItem = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing(1.5)} 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.75)};
  ${shimmer}

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} 0;
  }
`

export const SkeletonPopularItem = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  background: ${theme.colors.background};
  padding: ${theme.spacing(1)} 0;
  ${shimmer}

  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.5)};
    padding: ${theme.spacing(1.25)} 0;
  }
`

export const SkeletonThumbnail = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 90px;
    height: 90px;
  }
    
`
export const CombinedColumn = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
    order: 2;
  }
`
export const TabContainer = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    gap: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(2)};
    border-bottom: 2px solid ${theme.colors.gray[200]};
  }
`
export const Tab = styled.button`
  background: none;
  border: none;
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  font-size: 1rem;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  color: ${({ active }) => active ? theme.colors.black : theme.colors.gray[500]};
  border-bottom: 3px solid ${({ active }) => active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: -2px;

  &:hover {
    color: ${theme.colors.black};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: ${theme.spacing(1.25)} ${theme.spacing(1.5)};
    letter-spacing: 0.2px;
  }
`
export const TabContent = styled.div`
  display: block;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: ${({ active }) => active ? 'block' : 'none'};
  }
`

const styles = {
  Container,
  GridLayout,
  FeaturedCard,
  FeaturedImage,
  FeaturedContent,
  FeaturedMeta,
  FeaturedTitle,
  FeaturedExcerpt,
  NewsColumn,
  ColumnHeader,
  NewsList,
  NewsItem,
  NewsItemContent,
  NewsTitle,
  NewsDate,
  NewsAuthor,
  PopularItem,
  PopularThumbnail,
  PopularContent,
  PopularTitle,
  PopularDate,
  SeeMoreWrap,
  SeeMoreBtn,
}

export { styles }
export default styles
