import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  
  background: ${theme.colors.background};
  color: ${theme.colors.gray[800]};
  padding-bottom: ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};
  padding: ${theme.spacing(1.25)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
    gap: ${theme.spacing(1.25)};
  }
`

export const Thumb = styled.img`
  width: 90%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 95%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  margin: 0;
  color: ${theme.colors.gray[800]};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.desktop}) {
    font-size: ${theme.fontSizes.large};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 15px;
    line-height: 1.4;
  }
`

export const Excerpt = styled.p`
  margin: 0;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 13px;
    line-height: 1.5;
  }
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.small};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1)};
    font-size: 11px;
  }
`

export const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: ${theme.borderRadius.circle};
  background: ${theme.colors.gray[300]};
`
