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
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: ${theme.borderRadius.small};
  outline-offset: 2px;
  height: 100%;

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
  max-width: ${theme.spacing(12)};
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

  @media (max-width: 1026px) {
    align-items: center;
    text-align: center;
    flex: none;
  }
@media (max-width: ${theme.breakpoints.desktop}) {
  padding: ${theme.spacing(1)} ${theme.spacing(2)} 0 ${theme.spacing(2)};
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
    font-size: 0.75rem;
    line-height: 1.3;
  }

  @media (max-width: 1150px) {
    font-size: 1rem;
    line-height: 1.3;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 1.3;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
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
    font-size: 0.9rem;
    line-height: 1.3;
  }

  @media (max-width: 1150px) {
    font-size: 1rem;
    line-height: 1.3;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
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
    font-size: 0.75rem;
    line-height: 1.3;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    line-height: 1.3;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
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

  // For tablets (including iPads in portrait mode)
  @media (max-width: 866px) {
    min-width: 200px;
    gap: ${theme.spacing(3)};
  }

  // For iPads in landscape mode and other mini tablets
  @media (max-width: 1150px) {
    min-width: 150px;
    gap: ${theme.spacing(0.2)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    gap: ${theme.spacing(0.75)};
    padding: 0 ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    gap: ${theme.spacing(0.5)};
    padding: 0 ${theme.spacing(0.5)};
  }
`;

export const CMImagesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
    gap: ${theme.spacing(0.5)};
    justify-content: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    gap: ${theme.spacing(0.375)};
  }
`;

// Mobile-only Nava Karnataka PDF link shown centered below the CM images
export const MobileCMPdfLink = styled.a`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    flex-shrink: 0;
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    border-radius: 999px;
    color: #a01b32;
    font-weight: 700;
    font-size: 13px;
    font-family: ${theme.fonts.body};
    background: ${theme.colors.white};
    white-space: nowrap;
    z-index: 0;
    transition: color ${theme.transitions.fast}, transform ${theme.transitions.fast};

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 999px;
      padding: 2px;
      background: linear-gradient(
        90deg,
        #7a1530,
        #c0392b,
        #f39c12,
        #1e88e5,
        #28a745,
        #7a1530
      );
      background-size: 300% 100%;
      animation: cmPdfBorderRun 3s linear infinite;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      z-index: -1;
    }

    @keyframes cmPdfBorderRun {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 300% 50%;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.25)};
  }

  @media (max-width: 400px) {
    font-size: 11px;
    padding: ${theme.spacing(0.625)} ${theme.spacing(1)};

    &::before {
      padding: 1.5px;
    }
  }
`;

// CM Images with proper sizing and decorative treatment (WCAG 2.1 - 1.1.1, 1.4.10)
export const CMImage = styled.img`
  max-width: ${theme.spacing(38)};
  height: 112px;
  object-fit: contain;
  padding: ${theme.spacing(1.6)};
  flex-shrink: 0;
  display: block;

  @media (max-width: 1150px) {
    max-width: ${theme.spacing(28)};
    height: 84px;
    padding: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex: 1;
    width: calc(50% - 4px);
    max-width: calc(50% - 4px);
    height: 90px;
    padding: 0;
    object-fit: contain;
  }

  @media (max-width: 600px) {
    height: 84px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: calc(50% - 3px);
    max-width: calc(50% - 3px);
    height: 80px;
    padding: 0;
  }

  @media (max-width: 400px) {
    height: 74px;
  }
`;

/* Slightly smaller than CM portrait */
export const DCMImage = styled(CMImage)`
  max-width: ${theme.spacing(34)};
  height: 100px;
  padding: ${theme.spacing(1.8)};

  @media (max-width: 1150px) {
    max-width: ${theme.spacing(24)};
    height: 76px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 82px;
  }

  @media (max-width: 600px) {
    height: 76px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 72px;
  }

  @media (max-width: 400px) {
    height: 66px;
  }
`;
