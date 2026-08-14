import styled from "styled-components"
import theme from "../../../theme/Theme"

export const FooterWrapper = styled.footer`
  color: ${theme.colors.text};
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: ${theme.colors.background};
  font-family: ${theme.fonts.body};
  box-sizing: border-box;
`

export const FooterContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background: ${theme.colors.white};
  padding: ${theme.spacing(2.5)} ${theme.spacing(2)};
  box-sizing: border-box;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    max-width: 95%;
    padding: ${theme.spacing(3)} ${theme.spacing(2.5)}; 
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
  gap: ${theme.spacing(3)};
  align-items: start;
  min-width: 0;
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) { 
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(3.5)};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    grid-template-columns: 1.2fr 1fr 1fr 0.9fr;
    gap: ${theme.spacing(4)};
    padding-left: ${theme.spacing(8)};
  }
`

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  align-items: center;
  text-align: center;
  min-width: 0;
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) { 
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${theme.spacing(2)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: ${theme.spacing(2.5)}; 
  }
`

export const RightColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(2.5)};
  min-width: 0;
  width: 100%;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(2.5)} ${theme.spacing(2)};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3.5)}; 
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    display: contents;
  }
`

export const Emblem = styled.img`
  width: 96px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.mobile}) { 
    width: 120px; 
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
  line-height: 1.55;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[600]};
  text-align: center;
  word-break: break-word;
  overflow-wrap: anywhere;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: ${theme.fontSizes.medium};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: ${theme.fontSizes.medium};
    text-align: left;
  }
`

export const ColTitle = styled.h3`
  margin: 0 0 ${theme.spacing(1.25)} 0;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 700;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  text-align: left;
  word-break: break-word;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: 17px;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    font-size: 19px;
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) { 
    font-size: 20px;
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
  gap: ${theme.spacing(1)};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[700]};
  text-align: left;
  min-width: 0;
  word-break: break-word;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    font-size: ${theme.fontSizes.medium};
    gap: ${theme.spacing(1.25)};
  }
`

export const Divider = styled.hr`
  margin: ${theme.spacing(3)} 0 0 0;
  border: none;
  border-top: 1px solid ${theme.colors.gray[400]};
`

export const BottomBar = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(2)} 0 ${theme.spacing(1)};
  text-align: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  word-break: break-word;
  box-sizing: border-box;
  
  @media (min-width: ${theme.breakpoints.mobile}) { 
    padding: ${theme.spacing(1.75)} 0 ${theme.spacing(2)};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) { 
    padding: ${theme.spacing(2)} 0 ${theme.spacing(2.5)};
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

export const AppDownloads = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  min-width: 0;

  ${ColTitle} {
    text-align: center;
    width: 100%;
  }

  @media (min-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    align-items: flex-start;
    text-align: left;
    grid-column: auto;

    ${ColTitle} {
      text-align: left;
    }
  }
`

export const StoreBadgeList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing(1)};
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`

export const StoreBadgeLink = styled.a`
  display: inline-flex;
  line-height: 0;
  border-radius: 6px;
  transition: ${theme.transitions.fast};

  &:hover {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 3px;
  }
`

export const StoreBadge = styled.img`
  display: block;
  width: 128px;
  height: auto;
  max-width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) {
    width: 135px;
  }
`
