import styled from "styled-components"
import theme from "../../theme/Theme"

export const FooterContainer = styled.footer`
  background-color: ${theme.colors.Footerbg};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  padding: 0;
  overflow: hidden;
  width: 100%;
`

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(4)} ${theme.spacing(6)};
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(3)} ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(1)};
    gap: ${theme.spacing(2)};
  }
`

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
    text-align: center;
  }
`

export const Logo = styled.img`
  width: ${theme.spacing(20)};
  height: auto;
  object-fit: contain;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: ${theme.spacing(16)};
  }
`

export const DisclaimerText = styled.p`
  font-size: ${theme.spacing(1.75)};
  line-height: 1.5;
  margin: 0;
  color: ${theme.colors.white};
  text-align: justify;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    text-align: left;
  }
`

export const PoliciesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`

export const SectionTitle = styled.h3`
  font-size: ${theme.spacing(2.25)};
  font-weight: bold;
  margin: 0 0 ${theme.spacing(1)} 0;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2)};
  }
`

export const PolicyLink = styled.div`
  margin-bottom: ${theme.spacing(1)};

  a {
    color: ${theme.colors.white};
    text-decoration: none;
    font-size: ${theme.spacing(1.75)};
    line-height: 1.4;
    transition: all ${theme.transitions.fast};
    display: block;

    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }

    &:focus {
      outline: 2px solid ${theme.colors.white};
      outline-offset: 2px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    a {
      font-size: ${theme.spacing(1.5)};
    }
  }
`

export const VisitorsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
`

export const VisitorInfo = styled.div`
  font-size: ${theme.spacing(1.75)};
  color: ${theme.colors.white};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`

export const FooterStripContainer = styled.div`
  background-color: ${theme.colors.Footerstrip};
  padding: ${theme.spacing(2)} 0;
  text-align: center;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} 0;
  }
`

export const FooterStrip = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing(2)};
`

export const StripText = styled.p`
  margin: 0;
  font-size: ${theme.spacing(1.75)};
  color: ${theme.colors.white};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`
