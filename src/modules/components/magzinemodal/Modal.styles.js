import styled from "styled-components"
import theme from "../../../theme/Theme"

// Title component
export const Title = styled.h1`
  font-size: ${theme.spacing(3)};
  margin-left: ${theme.spacing(2.5)};
  margin-bottom: ${theme.spacing(0.5)};
  text-align: left;
  font-weight: 700;
  color: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.5)};
    margin-left: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(3.125)};
    margin-left: ${theme.spacing(1.5)};
  }
`

// Main container with grid layout
export const Container = styled.div`
  padding: ${theme.spacing(2.5)};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: ${theme.spacing(2)};
  max-width: 1400px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr); 
    padding: ${theme.spacing(2)};
    gap: ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr; 
    padding: ${theme.spacing(1)};
    gap: ${theme.spacing(1.25)};
  }
`

// Tabs container aligned to the left
export const TabsContainer = styled.div`
  grid-column: 1 / -1; 
  display: flex;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(2)};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.primary} transparent;
  justify-content: flex-start;
  padding-bottom: ${theme.spacing(0.5)};
  // border-bottom: 1px solid ${theme.colors.lightgray};
  
  &::-webkit-scrollbar {
    height: ${theme.spacing(0.5)};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.spacing(0.2)};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.75)};
    margin-bottom: ${theme.spacing(1.5)};
  }
`

// Tab button styling
export const Tab = styled.button`
  background: none;
  border: none;
  font-size: ${theme.spacing(2)};
  cursor: pointer;
  color: ${(props) => (props.active ? theme.colors.primary : theme.colors.black)};
  border-bottom: ${(props) => (props.active ? `${theme.spacing(0.375)} solid ${theme.colors.primary}` : "none")};
  padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
  font-weight: ${(props) => (props.active ? "700" : "600")};
  font-family: ${theme.fonts.body};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    padding: ${theme.spacing(0.75)} ${theme.spacing(1)};
  }
`

// News card styling
export const NewsCard = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${theme.spacing(1.25)};
  overflow: hidden;
  box-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(1)} rgba(0, 0, 0, 0.15);
  aspect-ratio: 1 / 1.4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-${theme.spacing(0.25)});
    box-shadow: 0 ${theme.spacing(0.75)} ${theme.spacing(1.5)} rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 1 / 1.2;
  }
`

// News image styling
export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${NewsCard}:hover & {
    transform: scale(1.05);
  }
`

// News content overlay styling
export const NewsContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.3) 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing(1.625)};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.3s ease;

  ${NewsCard}:hover & {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 100%);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.25)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)}; 
    justify-content: flex-end; 
    align-items: flex-start; 
    text-align: left; 
  }
`

// News header styling
export const NewsHeader = styled.h2`
  font-size: ${theme.spacing(2.25)};
  margin-bottom: ${theme.spacing(1.25)};
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  
  ${NewsCard}:hover & {
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.5)};
    margin-bottom: ${theme.spacing(0.625)};
  }
`

// News text styling
export const NewsText = styled.p`
  font-size: ${theme.spacing(1.75)};
  margin-bottom: ${theme.spacing(1.25)};
  line-height: 1.4;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.9)};
    margin-bottom: ${theme.spacing(0.625)};
  }
`

// Read more button styling
export const ReadMore = styled.a`
  display: inline-block;
  margin-top: ${theme.spacing(1.875)};
  width: fit-content;
  padding: ${theme.spacing(0.625)} ${theme.spacing(1.25)};
  background-color: ${theme.colors.button};
  color: ${theme.colors.white};
  text-decoration: none;
  border-radius: ${theme.spacing(0.625)};
  font-size: ${theme.spacing(1.75)};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  box-shadow: 0 ${theme.spacing(0.125)} ${theme.spacing(0.25)} rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${theme.colors.buttonHover || "#0056b3"};
    transform: translateY(-2px);
    box-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(0.5)} rgba(0, 0, 0, 0.3);
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.8)};
    margin-top: ${theme.spacing(1.25)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }
`

// News meta information styling
export const NewsMeta = styled.div`
  font-size: ${theme.spacing(1.5)};
  color: ${theme.colors.lightgray};
  margin-bottom: ${theme.spacing(0.5)};
  font-style: italic;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

// Pagination wrapper
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing(2.5)};
  margin-top: ${theme.spacing(2.5)};
  padding: ${theme.spacing(2.5)};
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  bottom: 0;
  z-index: 100;
  max-width: 1400px;
  margin: ${theme.spacing(2.5)} auto 0;
  border-radius: ${theme.spacing(0.625)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
    flex-direction: column;
    gap: ${theme.spacing(1.5)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    margin-top: ${theme.spacing(1.5)};
  }
`

// View all button
export const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(1.25)} ${theme.spacing(2.5)};
  background-color: #007bff;
  color: #fff;
  border: 2px solid #007bff;
  border-radius: 25px;
  font-size: ${theme.spacing(1.75)};
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  outline: none;
  min-width: 140px;
  box-shadow: 0 ${theme.spacing(0.125)} ${theme.spacing(0.25)} rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #fff;
    color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 ${theme.spacing(0.25)} ${theme.spacing(0.5)} rgba(0, 0, 0, 0.3);
  }
  
  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`

// Skeleton Loading Components
export const SkeletonCard = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${theme.spacing(1.25)};
  overflow: hidden;
  box-shadow: 0 ${theme.spacing(0.5)} ${theme.spacing(1)} rgba(0, 0, 0, 0.1);
  aspect-ratio: 1 / 1.4;
  background: #f0f0f0;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.3; }
    100% { opacity: 0.6; }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    aspect-ratio: 1 / 1.2;
  }
`

export const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background: #e0e0e0;
`

export const SkeletonContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  padding: ${theme.spacing(1.625)};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const SkeletonText = styled.div`
  height: ${theme.spacing(1.75)};
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: ${theme.spacing(1)};
  border-radius: ${theme.spacing(0.25)};
  width: ${(props) => props.width || "100%"};
`

export const SkeletonButton = styled.div`
  height: ${theme.spacing(2.5)};
  width: ${theme.spacing(7.5)};
  background: rgba(255, 255, 255, 0.7);
  margin-top: ${theme.spacing(1.875)};
  border-radius: ${theme.spacing(0.625)};
`

export const SkeletonTitle = styled.div`
  height: ${theme.spacing(2)};
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: ${theme.spacing(0.5)};
  border-radius: ${theme.spacing(0.25)};
  width: ${(props) => props.width || "100%"};
`