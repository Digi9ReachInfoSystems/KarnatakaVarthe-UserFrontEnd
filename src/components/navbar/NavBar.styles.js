import styled, { keyframes } from "styled-components"
import theme from "../../theme/Theme"

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Move exactly half to create seamless loop */
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
`

export const NavTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`

export const NavContainer = styled.div`
  background-color: ${theme.colors.error};
  padding: ${theme.spacing(1.1)} 0;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)} 0;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(0.5)} 0;
  }
`

export const NewsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`

export const NewsTicker = styled.div`
  display: flex;
  gap: ${theme.spacing(3)};
  animation: ${scrollAnimation} 30s linear infinite; /* Slower animation for better readability */
  min-width: 100%;
  
  &:hover {
    animation-play-state: paused; /* Pause on hover */
  }
`

export const NewsItem = styled.span`
  color: white;
  font-family: ${theme.fonts.heading};
  font-weight: 500;
  padding: 0 ${theme.spacing(2)};
  white-space: nowrap;
  position: relative;
  
  &:after {
    content: "•";
    margin-left: ${theme.spacing(2)};
    opacity: 0.7;
  }
  
  &:last-child:after {
    content: "";
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing(1)};
  }
`

export const LoadingIndicator = styled.div`
  color: white;
  font-family: ${theme.fonts.heading};
  padding: 0 ${theme.spacing(2)};
  width: 100%;
  text-align: center;
`
