import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const TopLogoBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing(10)};
  background: ${theme.colors.background};
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.75)} ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  }
`;

export const TopLogoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(2.5)};
  cursor: default;
  user-select: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
  }
`;

export const TopLogoImage = styled.img`
  display: block;
  width: auto;
  max-height: 60px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 52px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 44px;
  }
`;

export const TopLogoTitle = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.black};
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }

  @media (max-width: 400px) {
    font-size: 1.1rem;
    white-space: normal;
    text-align: center;
  }
`;
