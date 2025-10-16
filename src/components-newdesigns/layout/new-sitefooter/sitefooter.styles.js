import styled from "styled-components"
import theme from "../../../theme/Theme"

export const FooterWrapper = styled.footer`
  color: ${theme.colors.text};
  width: 100%;
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
`

export const FooterContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: ${theme.colors.white};
  padding: ${theme.spacing(2)} ${theme.spacing(1.5)};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    max-width: 95%;
    padding: ${theme.spacing(3)} ${theme.spacing(2)}; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    max-width: 90%;
    padding: ${theme.spacing(3.5)} ${theme.spacing(2.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    max-width: 90%;
    padding: ${theme.spacing(4)} ${theme.spacing(2)}; 
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(2.5)};
  align-items: start;
  padding-left: ${theme.spacing(2)};

  @media (min-width: ${theme.breakpoints.mobile}) { 
    gap: ${theme.spacing(3)};
    padding-left: ${theme.spacing(3)};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(3.5)};
    padding-left: ${theme.spacing(4)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: ${theme.spacing(4)};
    padding-left: ${theme.spacing(15)};
  }
`

export const Left = styled.div`
  flex-direction: column;
  gap: ${theme.spacing(2.5)};
  align-items: center;
  text-align: center;

  @media (min-width: ${theme.breakpoints.mobile}) { 
    gap: ${theme.spacing(2.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    flex-direction: row;
    text-align: left;
    gap: ${theme.spacing(2.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    flex-direction: row;
    text-align: left;
    gap: ${theme.spacing(2.5)}; 
  }
`

export const RightColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(2.5)};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    gap: ${theme.spacing(3)}; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    display: grid;
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    display: contents;
  }
`

export const Emblem = styled.img`
  width: 120px;
  height: auto;
  object-fit: contain;

  @media (min-width: ${theme.breakpoints.mobile}) { 
    width: 140px; 
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    width: 160px; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    width: 200px; 
  }
`

export const Note = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.small};
  line-height: 1.5;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[600]};
  text-align: center;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: center;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
`

export const ColTitle = styled.h3`
  margin: 0 0 ${theme.spacing(1.5)} 0;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  text-align: left;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: 18px;
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: 19px;
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: 20px;
    text-align: left;
  }
`

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${theme.spacing(1.25)};
  text-align: left;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    text-align: left;
  }
`

export const LinkItem = styled.li``

export const LinkA = styled.a`
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[700]};
  text-decoration: none;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
    text-decoration-color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    color: ${theme.colors.primary};
  }
`

export const Meta = styled.div`
  display: grid;
  gap: ${theme.spacing(1.25)};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[700]};
  text-align: left;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
`

export const Divider = styled.hr`
  margin: ${theme.spacing(3)} 0 0 0;
  border: none;
  border-top: 1px solid ${theme.colors.gray[400]};
`

export const BottomBar = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(1.5)} ${theme.spacing(1)} ${theme.spacing(2)};
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    max-width: 95%;
    padding: ${theme.spacing(1.75)} ${theme.spacing(2)} ${theme.spacing(3)};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    max-width: 90%;
    padding: ${theme.spacing(2)} ${theme.spacing(2.5)} ${theme.spacing(3.5)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    max-width: 1200px;
    padding: ${theme.spacing(1.75)} ${theme.spacing(2)} ${theme.spacing(3.5)};
  }
`

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`
