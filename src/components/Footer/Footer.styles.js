import styled from "styled-components"
import theme from "../../theme/Theme"

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.Footerbg};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  padding: 0;
  overflow: hidden;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)} 0;
  }
`

export const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(1)};
  padding: ${theme.spacing(3)};
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing(2)};
    padding: ${theme.spacing(2)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    gap: ${theme.spacing(1.5)};
  }
`

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  gap: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
  }
`

export const Section = styled.div`
  flex: 2;
  padding: 0 ${theme.spacing(3)};
  text-align: justify;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    border-right: none;
    padding: 0;
    margin-bottom: ${theme.spacing(2)};
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: ${theme.spacing(2)};
    
    &:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
    margin-bottom: ${theme.spacing(1.5)};
    padding-bottom: ${theme.spacing(1.5)};
  }
`

export const VisitorsSection = styled(Section)`
  border-right: none;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

export const Title = styled.h3`
  font-size: ${theme.spacing(2)};
  font-weight: 600;
  margin-bottom: ${theme.spacing(2)};
  background-color: ${theme.colors.Footerstrip};
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  border-radius: 0 12px 0 12px;
  line-height: 1.4;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const LogoSection = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing(2)};
    padding: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1.5)};
  }
`

export const Logo = styled.img`
  max-width: ${theme.spacing(25)};
  height: auto;
  object-fit: contain;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: ${theme.spacing(18)};
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    max-width: ${theme.spacing(22)};
  }
`

export const Text = styled.p`
  font-size: ${theme.spacing(1.75)};
  margin: ${theme.spacing(0.75)} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    margin: ${theme.spacing(0.5)} 0;
    gap: ${theme.spacing(0.75)};
  }
  
  svg {
    flex-shrink: 0;
    opacity: 0.8;
  }
`

export const LinksList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing(1.5)} ${theme.spacing(1)};
  color: ${theme.colors.white};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(1)};
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    gap: ${theme.spacing(1.25)};
  }
`

export const LinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  font-size: ${theme.spacing(1.75)};
  color: ${theme.colors.white};
  transition: all 0.3s ease;
  
  a {
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.6);
    text-decoration-thickness: 1px;
    color: inherit;
    transition: all 0.3s ease;
    line-height: 1.4;
    
    &:hover {
      text-decoration-color: ${theme.colors.white};
      text-decoration-thickness: 2px;
      opacity: 0.9;
      transform: translateX(2px);
    }
    
    &:focus {
      outline: 2px solid ${theme.colors.white};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
  
  svg {
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    cursor: pointer;
    
    svg {
      opacity: 1;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    gap: ${theme.spacing(0.75)};
  }
`

export const FooterStripContainer = styled.div`
  padding: ${theme.spacing(1.5)} 0;
  text-align: center;
  background-color: ${theme.colors.Footerstrip};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} 0;
  }
`

export const FooterStrip = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${theme.spacing(3)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing(1.5)};
  }
`

export const StripText = styled.p`
  margin: 0;
  font-size: ${theme.spacing(1.75)};
  color: ${theme.colors.white};
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.4)};
    line-height: 1.4;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(1.6)};
  }
`
