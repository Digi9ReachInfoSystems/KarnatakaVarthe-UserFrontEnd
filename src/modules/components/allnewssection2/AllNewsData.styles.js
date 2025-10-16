import styled, { keyframes } from "styled-components"
import theme from "../../../theme/Theme"

// Shimmer animation
const shimmer = keyframes`
0% {
  background-position: -468px 0;
}
100% {
  background-position: 468px 0;
}
`

export const Container = styled.div`
max-width: ${theme.spacing(70)};
padding: 0 ${theme.spacing(2)};
@media (max-width: ${theme.breakpoints.mobile}) {
  padding: 0 ${theme.spacing(1)};
}
@media (max-width: ${theme.breakpoints.tablet}) {
  padding: 0 ${theme.spacing(2)};
  max-width: 100%;
}

.tabs-scroll-container {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: ${theme.spacing(2)};
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
`

export const Title = styled.h1`
font-size: ${theme.spacing(3)};
color: ${theme.colors.black};
font-family: ${theme.fonts.heading};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(3.5)};
}
`

export const TabsContainer = styled.div`
display: flex;
gap: ${theme.spacing(1.5)};
overflow-x: auto;
white-space: nowrap;
flex: 1;

/* Hide scrollbar for IE, Edge and Firefox */
-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
&::-webkit-scrollbar {
  display: none;
}
@media (max-width: ${theme.breakpoints.mobile}) {
  gap: ${theme.spacing(1)};
}
`

export const ScrollButton = styled.button`
background: ${theme.colors.light};
border: none;
border-radius: 50%;
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
z-index: 2;
color: ${theme.colors.primary};

&:hover {
  background: ${theme.colors.background};
}

&:focus-visible {
  outline: 2px solid ${theme.colors.primary};
  outline-offset: 2px;
}

margin: ${(props) => (props.direction === "left" ? "0 10px 0 0" : "0 0 0 10px")};
`

export const Tab = styled.button`
background: none;
border: none;
font-size: ${theme.spacing(2)};
cursor: pointer;
color: ${(props) => (props.active ? theme.colors.primary : theme.colors.black)};
border-bottom: ${(props) => (props.active ? `${theme.spacing(0.375)} solid ${theme.colors.primary}` : "none")};
padding: ${theme.spacing(1)};
font-weight: bold;
font-family: ${theme.fonts.body};
&:hover {
  color: ${theme.colors.primary};
}
&:focus-visible {
  outline: 2px solid ${theme.colors.primary};
  outline-offset: 2px;
}
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(1.75)};
  padding: ${theme.spacing(0.75)};
}
`

export const NewsCard = styled.div`
background: ${theme.colors.light};
border-radius: ${theme.spacing(1)};
overflow: hidden;
padding: ${theme.spacing(2)};
box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(1.25)} rgba(0, 0, 0, 0.1);
margin-bottom: ${theme.spacing(2)};
@media (max-width: ${theme.breakpoints.mobile}) {
  padding: ${theme.spacing(1.5)};
}
`

export const NewsImage = styled.img`
width: 100%;
height: 250px;
object-fit: cover;
border-radius: ${theme.spacing(1)};
@media (max-width: ${theme.breakpoints.tablet}) {
  height: 200px;
}
@media (max-width: ${theme.breakpoints.mobile}) {
  height: 200px;
}
`

export const NewsContent = styled.div`
padding: ${theme.spacing(2)};
@media (max-width: ${theme.breakpoints.mobile}) {
  padding: ${theme.spacing(1.5)};
}
`

export const NewsHeader = styled.div`
font-size: ${theme.spacing(5)};
color: ${theme.colors.icons};
font-weight: bold;
font-family: ${theme.fonts.accent};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(2.2)};
}
`

export const NewsTitle = styled.h2`
font-size: ${theme.spacing(2.5)};
color: ${theme.colors.black};
font-family: ${theme.fonts.heading};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(2)};
}
`

export const ShareIcons = styled.div`
display: flex;
gap: ${theme.spacing(3)};
font-size: ${theme.spacing(3.5)};
margin: ${theme.spacing(1)} 0;
color: ${theme.colors.icons};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(2.5)};
  gap: ${theme.spacing(2)};
}
`

export const NewsMeta = styled.div`
display: flex;
margin-top: ${theme.spacing(2.5)};
font-size: ${theme.spacing(1.75)};
color: ${theme.colors.black};
font-family: ${theme.fonts.body};
margin-top: ${theme.spacing(2.95)};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(1.5)};
}
`

export const TrendingTag = styled.span`
background: ${theme.colors.error};
color: ${theme.colors.background};
font-size: ${theme.spacing(1.5)};
font-weight: bold;
margin-right: ${theme.spacing(3)};
padding: ${theme.spacing(0.6)} ${theme.spacing(1)};
border-radius: ${theme.spacing(0.625)};
font-family: ${theme.fonts.monospace};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: ${theme.spacing(1.25)};
  margin-right: ${theme.spacing(2)};
}
`
export const ReadMore = styled.a`
  color: ${theme.colors.primary};
  font-size: ${theme.spacing(1.75)};
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: ${theme.spacing(0.5)};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

export const NewsText = styled.p`
font-size: inherit;
color: ${theme.colors.black};
margin-top: ${theme.spacing(2.5)};
font-family: ${theme.fonts.body};
@media (max-width: ${theme.breakpoints.mobile}) {
  font-size: inherit;
}
`

export const PaginationWrapper = styled.div`
display: flex;
justify-content: left;
align-items: center;
gap: 20px;
margin-top: 20px;
padding: 20px;
background-color: ${theme.colors.background};
border-top: 1px solid #ddd;
bottom: 0;
z-index: 100;
`

// Skeleton styles
export const SkeletonContainer = styled.div`
width: 100%;
`

export const SkeletonTabs = styled.div`
display: flex;
gap: ${theme.spacing(1.5)};
margin-bottom: ${theme.spacing(2)};
`

export const SkeletonTab = styled.div`
width: 80px;
height: 30px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
border-radius: 4px;
`

export const SkeletonCard = styled.div`
background: ${theme.colors.light};
border-radius: ${theme.spacing(1)};
overflow: hidden;
padding: ${theme.spacing(2)};
box-shadow: 0px ${theme.spacing(0.25)} ${theme.spacing(1.25)} rgba(0, 0, 0, 0.1);
margin-bottom: ${theme.spacing(2)};
`

export const SkeletonImage = styled.div`
width: 100%;
height: 250px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
border-radius: ${theme.spacing(1)};
@media (max-width: ${theme.breakpoints.tablet}) {
  height: 200px;
}
@media (max-width: ${theme.breakpoints.mobile}) {
  height: 200px;
}
`

export const SkeletonContent = styled.div`
padding: ${theme.spacing(2)};
`

export const SkeletonHeader = styled.div`
width: 60%;
height: 16px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
margin-bottom: ${theme.spacing(1.5)};
`

export const SkeletonTitle = styled.div`
width: 80%;
height: 24px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
margin-bottom: ${theme.spacing(2)};
`

export const SkeletonText = styled.div`
width: ${(props) => props.width || "100%"};
height: 16px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
margin-bottom: ${theme.spacing(1)};
`

export const SkeletonMeta = styled.div`
width: 40%;
height: 14px;
background: #eee;
background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);
background-size: 800px 104px;
animation: ${shimmer} 1.5s infinite linear;
margin-top: ${theme.spacing(2)};
`
