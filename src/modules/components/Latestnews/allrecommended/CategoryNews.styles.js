import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

// Shimmer animation for skeleton loading
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 100%; 
  margin: 0 auto;
  padding: ${theme.spacing(3)}; /* Adjusted padding */
  background: ${theme.colors.background};

  .tabs-scroll-container {
    display: block;
    position: relative;
    margin-bottom: ${theme.spacing(3)}; /* Adjusted margin */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`

export const Title = styled.h2`
  font-size: ${theme.spacing(3.5)}; /* Larger title */
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing(3)}; /* Adjusted margin */
  font-family: ${theme.fonts.heading};
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(2.5)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    margin-bottom: ${theme.spacing(2)};
  }
`

export const TabsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: ${theme.spacing(1)};
  flex: 1;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.25)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`

export const ScrollButton = styled.button`
  display: none; /* Hide scroll buttons */
  background: ${theme.colors.light};
  border: none;
  border-radius: 50%;
  width: 36px; /* Larger buttons */
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  color: ${theme.colors.primary};
  flex-shrink: 0; /* Prevent shrinking */

  &:hover {
    background: ${theme.colors.background};
  }

  &:focus {
    outline: none;
  }

  margin: ${(props) => (props.direction === "left" ? "0 10px 0 0" : "0 0 0 10px")};
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
    margin: ${(props) => (props.direction === "left" ? "0 5px 0 0" : "0 0 0 5px")};
  }
`

export const TabIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  margin-right: 8px;
  vertical-align: middle;
  border-radius: 4px;
  background: #f5f5f5;
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  background: #f3f3f3; /* Same background for all tabs */
  border: 1px solid #e0e0e0; /* Same border for all tabs */
  font-size: ${theme.spacing(1.75)};
  cursor: pointer;
  color: ${(props) => (props.active ? '#2563eb' : theme.colors.black)};
  border-radius: 8px;
  padding: 6px 18px;
  font-weight: 600;
  font-family: ${theme.fonts.monospace};
  box-shadow: none; /* Remove shadow for all tabs */
  transition: all 0.18s cubic-bezier(.4,0,.2,1);
  white-space: nowrap;
  flex-shrink: 0;
  outline: none;
  &:hover, &:focus {
    background: #e8f0fe;
    color: #2563eb;
    border-color: #b3d4fc;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
    padding: 5px 12px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    padding: 4px 8px;
  }
`

export const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Main content 2/3, sidebar 1/3 */
  gap: ${theme.spacing(3)}; /* Gap between main and sidebar */
  margin-top: ${theme.spacing(2)};
  background: ${theme.colors.background}; /* White background for the whole section */
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(2)}; /* Padding around the grid content */

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr; /* Stack on tablet */
    gap: ${theme.spacing(2.5)};
    padding: ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)};
    gap: ${theme.spacing(2)};
  }
`

// Featured News Card (Left Column)
export const FeaturedNewsCard = styled.div`
  position: relative;
  background-color: ${theme.colors.black}; /* Dark overlay base */
  background-size: cover;
  background-position: center;
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  min-height: 450px; /* Fixed height for featured card */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 350px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 280px;
  }
`

export const FeaturedNewsImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%); /* Gradient overlay */
  z-index: 1;
`

export const FeaturedNewsContent = styled.div`
  position: relative;
  z-index: 2;
  padding: ${theme.spacing(3)};
  color: ${theme.colors.background}; /* White text */
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`

export const FeaturedNewsTitle = styled.h3`
  font-size: ${theme.spacing(3.5)}; /* Large title */
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(3)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
  }
`

export const FeaturedNewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.75)};
  font-size: ${theme.spacing(1.5)};
  color: ${theme.colors.gray[300]}; /* Lighter gray for meta */
  margin-bottom: ${theme.spacing(1.5)};

  img {
    filter: brightness(0) invert(1); /* Make icon white */
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.3)};
  }
`

export const FeaturedNewsDescription = styled.p`
  font-size: ${theme.spacing(1.75)};
  line-height: 1.5;
  margin-bottom: ${theme.spacing(2)};
  font-family: ${theme.fonts.body};
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit description to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
  }
`

export const FeaturedNewsBottomTags = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};
`

export const FeaturedNewsTag = styled.span`
  background: ${theme.colors.gray[700]}; /* Dark gray background */
  color: ${theme.colors.background}; /* White text */
  font-size: ${theme.spacing(1.25)};
  font-weight: 500;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.monospace};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.1)};
  }
`

export const FeaturedNewsReadTime = styled.span`
  color: ${theme.colors.black}; /* Dark text */
  font-size: ${theme.spacing(1.25)};
  font-weight: 500;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.monospace};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.1)};
  }
`

export const RelatedArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)}; /* Gap between related articles */
  padding: 0; /* No extra padding inside the sidebar wrapper */
`

export const RelatedArticleCard = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  align-items: center;
  cursor: pointer;
  padding: ${theme.spacing(1)}; /* Padding for each card */
  border-radius: ${theme.spacing(0.5)};
  background: ${theme.colors.white}; /* Ensure white background */
  box-shadow: none; /* Remove explicit border and shadow */
  border: none; /* Remove explicit border */
  &:hover {
    transform: translateY(-2px);
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

export const RelatedArticleImage = styled.img`
  width: 80px; /* Fixed width for thumbnail */
  height: 80px; /* Fixed height for thumbnail */
  object-fit: cover;
  border-radius: 8px; /* More rounded corners */
  flex-shrink: 0; /* Prevent image from shrinking */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* Subtle shadow for definition */
  border: none; /* Remove explicit border */
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 70px;
    height: 70px;
  }
`

export const RelatedArticleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.25)}; /* Tighter spacing for content */
`

export const RelatedArticleTitle = styled.h4`
  font-size: ${theme.spacing(2)};
  font-weight: 600;
  color: ${theme.colors.black};
  line-height: 1.3;
  margin: 0;
  font-family: ${theme.fonts.heading};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit title to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
  }
`

export const RelatedArticleMeta = styled.div`
  font-size: ${theme.spacing(1.6)};
  color: ${theme.colors.gray[500]}; /* Gray text for meta */
  font-family: ${theme.fonts.body};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.1)};
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${theme.spacing(3)} 0;
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;

  .MuiPagination-root {
    .MuiPaginationItem-root {
      font-family: ${theme.fonts.body};
      min-width: 32px;
      height: 32px;
      margin: 0 2px;
      border-radius: 50%;
      border: none;
      background: none;
      color: ${theme.colors.black};
      font-size: 1rem;
      transition: background 0.2s;
      &.Mui-selected {
        background: ${theme.colors.primary};
        color: #fff;
        font-weight: bold;
      }
      &:hover {
        background: #f3f3f3;
      }
    }
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: ${theme.spacing(2.5)} 0;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: ${theme.spacing(2)} 0;
    .MuiPagination-root {
      .MuiPaginationItem-root {
        min-width: 28px;
        height: 28px;
        font-size: 0.95rem;
      }
    }
  }
`

// Skeleton loading components
export const SkeletonFeaturedNewsCard = styled.div`
  position: relative;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: ${theme.spacing(1)};
  overflow: hidden;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 350px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 280px;
  }
`

export const SkeletonFeaturedImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
`

export const SkeletonFeaturedTitle = styled.div`
  width: ${(props) => props.width || "100%"};
  height: 30px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 24px;
  }
`

export const SkeletonFeaturedMeta = styled.div`
  width: 40%;
  height: 18px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 16px;
  }
`

export const SkeletonFeaturedDescription = styled.div`
  width: 100%;
  height: 16px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(0.5)};

  &:nth-child(2) {
    width: 90%;
  }
  &:nth-child(3) {
    width: 70%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 14px;
  }
`

export const SkeletonFeaturedBottomTags = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};

  &::before {
    content: "";
    width: 80px;
    height: 24px;
    background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
    background-size: 800px 104px;
    animation: ${shimmer} 1.2s linear infinite;
    border-radius: ${theme.spacing(0.5)};
  }
  &::after {
    content: "";
    width: 100px;
    height: 24px;
    background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
    background-size: 800px 104px;
    animation: ${shimmer} 1.2s linear infinite;
    border-radius: ${theme.spacing(0.5)};
  }
`

export const SkeletonRelatedArticleCard = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  align-items: center;
  padding: ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.5)};
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
`

export const SkeletonRelatedImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: ${theme.spacing(0.5)};
  flex-shrink: 0;
`

export const SkeletonRelatedTitle = styled.div`
  width: 90%;
  height: 18px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
  margin-bottom: ${theme.spacing(0.25)};
`

export const SkeletonRelatedMeta = styled.div`
  width: 60%;
  height: 14px;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
`

export const SkeletonTab = styled.div`
  width: 100px;
  height: 32px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 16px;
  margin-right: ${theme.spacing(1)};
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 80px;
    height: 28px;
  }
`
