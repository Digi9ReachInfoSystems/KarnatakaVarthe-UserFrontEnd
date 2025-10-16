import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const LanguageNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${theme.spacing(1.5)} ${theme.spacing(5)};
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  width: 100%;
  box-sizing: border-box;
  gap: ${theme.spacing(4)};
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.25)} ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
    justify-content: space-between;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2.5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.25)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.75)};
  }
`;

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[700]};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${theme.borderRadius.small};
  }

  svg {
    width: 22px;
    height: 22px;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 21px;
      height: 21px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const LanguageSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  button.language-button {
    display: flex;
    align-items: center;
    gap: ${theme.spacing(1)};
    padding: ${theme.spacing(1)} ${theme.spacing(2)};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.medium};
    color: ${theme.colors.gray[700]};
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body};
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    min-width: 160px;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    font-weight: 500;
    
    &:hover {
      background-color: ${theme.colors.white};
      border-color: ${theme.colors.primary};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }
    
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
    
    .arrow {
      font-size: 16px;
      color: ${theme.colors.gray[500]};
      transition: transform ${theme.transitions.fast};
      transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }

    &.kannada-text {
      font-weight: 700;
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
      min-width: 150px;
      padding: ${theme.spacing(1)} ${theme.spacing(1.75)};
      font-size: 13px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      min-width: 140px;
      padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
      font-size: 13px;
      gap: ${theme.spacing(1)};
    }
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 3px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  width: 160px;
  animation: dropdownSlide 0.2s ease-out;

  @keyframes dropdownSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 150px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 140px;
    right: 0;
  }
  
  button {
    width: 100%;
    padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
    border: none;
    background-color: transparent;
    color: ${theme.colors.gray[700]};
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body};
    text-align: left;
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    border-radius: 0;
    min-width: auto;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    font-weight: 400;
    border-bottom: 1px solid ${theme.colors.gray[100]};

    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: ${theme.colors.gray[50]};
      color: ${theme.colors.primary};
      padding-left: ${theme.spacing(2.5)};
    }
    
    &.active {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-weight: 500;
      
      &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
        padding-left: ${theme.spacing(2)};
      }
    }

    &.kannada-text {
      font-weight: 700;
    }

    &.active.kannada-text {
      font-weight: 700;
    }
    
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: -2px;
    }

    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: ${theme.spacing(1.375)} ${theme.spacing(2)};
      font-size: 13px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: ${theme.spacing(1.375)} ${theme.spacing(1.75)};
      font-size: 13px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 999;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  cursor: pointer;
  transition: color ${theme.transitions.fast};
  padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
  border-radius: ${theme.borderRadius.medium};
  flex-shrink: 0;
  
  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.gray[50]};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.25)};
    gap: ${theme.spacing(0.875)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.25)};
    gap: ${theme.spacing(0.75)};
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 19px;
      height: 19px;
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 18px;
      height: 18px;
    }
  }
`;

export const SearchText = styled.span`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body};
  transition: color ${theme.transitions.fast};
  font-weight: 500;

  &.kannada-text {
    font-weight: 700;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 13px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;
