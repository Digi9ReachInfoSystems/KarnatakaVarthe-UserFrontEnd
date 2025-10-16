import styled from 'styled-components'
import theme from '../../../../theme/Theme'

export const SocialShareContainer = styled.div`
  margin: 32px 0;
  background: ${theme.colors.gray[100]};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin: 24px 0;
    padding: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 20px 0;
    padding: 12px;
  }
`

export const ShareTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 16px 0;
  text-align: left;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
    margin: 0 0 14px 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    margin: 0 0 12px 0;
  }
`

export const ShareButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 10px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 8px;
    flex-direction: column;
  }
`

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  min-width: 120px;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 10px 14px;
    min-width: 100px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    padding: 10px 12px;
    min-width: unset;
  }
`

export const ShareIcon = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ShareText = styled.span`
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
`
