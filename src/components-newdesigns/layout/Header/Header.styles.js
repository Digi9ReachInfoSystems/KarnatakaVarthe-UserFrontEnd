import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../../theme/Theme';

// Visually hidden text for screen readers (WCAG 2.1 - 2.4.1, 2.4.2)
export const VisuallyHidden = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding-left: ${theme.spacing(10)};
  padding-right: ${theme.spacing(6)};
  background: ${theme.colors.background};
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
    width: 100%;
    gap: ${theme.spacing(2)};
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing(1.5)};
    align-items: center;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  flex: 1;
  min-width: 300px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: auto;
    gap: ${theme.spacing(1)};
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    align-items: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    flex-direction: column;
    gap: ${theme.spacing(1)};
    width: 100%;
    max-width: 100%;
    align-items: center;
  }
`;

// Accessible link wrapper for logo (WCAG 2.1 - 2.4.4, 2.5.5)
export const LogoLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  border-radius: ${theme.borderRadius.small};
  outline-offset: 2px;
  
  &:focus {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 4px;
  }
`;

export const Logo = styled.img`
  max-width: ${theme.spacing(9)};
  height: auto;
  flex-shrink: 0;
  display: block;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: ${theme.spacing(6)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: ${theme.spacing(5)};
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
    text-align: center;
    flex: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: center;
    text-align: center;
    flex: none;
  }
`;

// Site title "Karnataka Varthe" (WCAG 2.1 - 1.4.3, 1.4.12)
export const SiteTitle = styled.h2`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.black};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// Main department title (WCAG 2.1 - 1.4.3, 1.4.12)
export const MainTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.1rem;
    line-height: 1.4;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    text-align: center;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

// Government subtitle (WCAG 2.1 - 1.4.3, 1.4.12)
export const Subtitle = styled.h3`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// CM Section with proper ARIA labeling (WCAG 2.1 - 1.1.1, 1.3.1)
export const CMSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 300px;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: auto;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    gap: ${theme.spacing(0.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    gap: ${theme.spacing(0.5)};
  }
`;

// CM Images with proper sizing and decorative treatment (WCAG 2.1 - 1.1.1, 1.4.10)
export const CMImage = styled.img`
  max-width: ${theme.spacing(35)};
  height: 100px;
  object-fit: contain;
  padding: ${theme.spacing(1.8)};
  flex-shrink: 0;
  display: block;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: ${theme.spacing(20)};
    height: 60px;
    padding: ${theme.spacing(0.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: ${theme.spacing(25)};
    height: 70px;
    padding: ${theme.spacing(0.5)};
  }

  @media (max-width: 480px) {
    max-width: ${theme.spacing(22)};
    height: 65px;
    padding: ${theme.spacing(0.5)};
  }
`;