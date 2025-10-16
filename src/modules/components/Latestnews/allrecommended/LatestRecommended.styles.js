import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

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
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: ${theme.spacing(3)};
  
  .main-content {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
    
    .main-content {
      order: 1;
      gap: ${theme.spacing(2.5)};
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
    
    .main-content {
      gap: ${theme.spacing(2)};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
    
    .main-content {
      gap: ${theme.spacing(1.5)};
    }
  }
`

export const Title = styled.h2`
  font-size: ${theme.spacing(2.5)};
  font-weight: bold;
  color: ${theme.colors.black};
  font-family: ${theme.fonts.heading};
  margin-bottom: ${theme.spacing(2)};
  grid-column: 1 / -1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.25)};
    margin-bottom: ${theme.spacing(1.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const FeaturedNewsCard = styled.div`
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(0.5)};
  overflow: hidden;
  box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px ${theme.spacing(0.5)} ${theme.spacing(1.5)} rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1)};
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing(2.5)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${theme.spacing(2)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(1.5)};
  }
`

export const StandardNewsCard = styled.div`
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(0.5)};
  overflow: hidden;
  box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px ${theme.spacing(0.5)} ${theme.spacing(1.5)} rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1)};
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`

export const NewsImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  
  ${StandardNewsCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 190px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
  }
`

export const NewsContent = styled.div`
  padding: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`

export const NewsCategory = styled.div`
  font-size: ${theme.spacing(1.5)};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.accent};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.35)};
    margin-bottom: ${theme.spacing(0.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.25)};
    margin-bottom: ${theme.spacing(0.5)};
  }
`

export const NewsTitle = styled.h2`
  font-size: ${theme.spacing(2.1)};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.heading};
  line-height: 1.3;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.9)};
    margin-bottom: ${theme.spacing(0.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.7)};
    margin-bottom: ${theme.spacing(0.5)};
  }
`

export const NewsText = styled.p`
  font-size: inherit;
  color: ${theme.colors.black};
  margin-top: ${theme.spacing(1.5)};
  margin-bottom: ${theme.spacing(1.5)};
  font-family: ${theme.fonts.body};
  line-height: 1.5;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: inherit;
    margin-top: ${theme.spacing(1.25)};
    margin-bottom: ${theme.spacing(1.25)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: inherit;
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
  }
`

export const ReadMore = styled.a`
  color: ${theme.colors.primary};
  font-size: ${theme.spacing(1.5)};
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  margin-top: ${theme.spacing(1)};
  transition: color 0.2s ease;
  
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.35)};
    margin-top: ${theme.spacing(0.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.25)};
    margin-top: ${theme.spacing(0.5)};
  }
`

export const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  font-size: ${theme.spacing(1.2)};
  color: ${theme.colors.icons};
  margin-bottom: ${theme.spacing(1.5)};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.5)};
    font-size: ${theme.spacing(1.1)};
    margin-bottom: ${theme.spacing(1.25)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
    font-size: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
  }
`

export const ReadTime = styled.span`
  font-weight: bold;
`

export const MostReadSection = styled.div`
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(0.5)};
  padding: ${theme.spacing(2)};
  box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.05);
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    order: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`

export const MostReadTitle = styled.h2`
  font-size: ${theme.spacing(2.5)};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing(2)};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.25)};
    margin-bottom: ${theme.spacing(1.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const MostReadList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2.5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
  }
`

export const MostReadItem = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1.5)};
    
    &:hover {
      transform: translateX(4px);
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
    
    &:hover {
      transform: translateX(3px);
    }
  }
`

export const MostReadNumber = styled.span`
  font-size: ${theme.spacing(2.5)};
  font-weight: bold;
  color: ${theme.colors.primary};
  opacity: 0.5;
  min-width: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.25)};
    min-width: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
    min-width: ${theme.spacing(2)};
  }
`

export const MostReadContent = styled.div`
  flex: 1;
`

export const MostReadCategory = styled.div`
  font-size: ${theme.spacing(1.25)};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.accent};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1)};
  }
`

export const MostReadHeadline = styled.h3`
  font-size: ${theme.spacing(1.75)};
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing(0.5)};
  font-family: ${theme.fonts.heading};
  line-height: 1.3;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

export const MostReadTime = styled.span`
  font-size: ${theme.spacing(1.25)};
  color: ${theme.colors.icons};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1)};
  }
`

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border};
  margin: ${theme.spacing(3)} 0;
  grid-column: 1 / -1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: ${theme.spacing(2.5)} 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: ${theme.spacing(2)} 0;
  }
`

export const NewsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing(2.5)};
  grid-column: 1 / -1;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${theme.spacing(2)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(1.5)};
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${theme.spacing(3)} 0;
  grid-column: 1 / -1;
  
  .MuiPagination-root {
    .MuiPaginationItem-root {
      font-family: ${theme.fonts.body};
      
      &.Mui-selected {
        background-color: ${theme.colors.primary};
        color: white;
        
        &:hover {
          background-color: ${theme.colors.primaryDark};
        }
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
        min-width: 32px;
        height: 32px;
        font-size: 14px;
      }
    }
  }
`

// Skeleton loading components
export const SkeletonNewsCard = styled.div`
  background: ${theme.colors.light};
  border-radius: ${theme.spacing(0.5)};
  overflow: hidden;
  height: ${(props) => (props.isFeatured ? "400px" : "350px")};

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: ${(props) => (props.isFeatured ? "350px" : "330px")};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: ${(props) => (props.isFeatured ? "300px" : "280px")};
  }
`

export const SkeletonImage = styled.div`
  width: 100%;
  height: ${(props) => props.height || "200px"};
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: ${(props) => props.height || "190px"};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: ${(props) => props.height || "180px"};
  }
`

export const SkeletonTitle = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  margin: ${theme.spacing(1)} 0;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: ${(props) => props.height || "16px"};
  }
`

export const SkeletonText = styled.div`
  width: ${(props) => props.width || "100%"};
  height: 16px;
  margin: ${theme.spacing(0.5)} 0;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 14px;
  }
`

export const SkeletonMeta = styled.div`
  width: 60%;
  height: 16px;
  margin: ${theme.spacing(1)} 0;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 14px;
  }
`