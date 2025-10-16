import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-top: 60px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 20px;
  }
`;

export const ModalContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 95%;
    max-height: 85vh;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    max-height: 90vh;
    border-radius: ${theme.borderRadius.small};
  }
`;

export const ModalHeader = styled.div`
  padding: ${theme.spacing(3)};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  position: relative;
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[500]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  background: transparent;
  padding: ${theme.spacing(1)} 0;
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 15px;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${theme.colors.gray[500]};
  cursor: pointer;
  padding: ${theme.spacing(1)};
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)};
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(2)};
  padding-top: ${theme.spacing(2)};
  border-top: 1px solid ${theme.colors.gray[100]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.75)};
    margin-top: ${theme.spacing(1.5)};
    padding-top: ${theme.spacing(1.5)};
  }
`;

export const Tab = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border: 1px solid ${props => props.active ? theme.colors.primary : theme.colors.gray[300]};
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.active ? theme.colors.white : theme.colors.gray[600]};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.active ? theme.colors.primary : theme.colors.gray[50]};
    border-color: ${theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(0.875)} ${theme.spacing(1.75)};
    font-size: 13px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
    font-size: 12px;
  }
`;

export const ResultsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing(3)};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[400]};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  border: 1px solid transparent;

  &:hover {
    background-color: ${theme.colors.gray[50]};
    border-color: ${theme.colors.gray[200]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
    padding: ${theme.spacing(1.5)};
  }
`;

export const ResultIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.primary}15;
  color: ${theme.colors.primary};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ResultTitle = styled.h4`
  margin: 0 0 ${theme.spacing(0.75)} 0;
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 15px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: ${theme.spacing(0.5)};
  }
`;

export const ResultDescription = styled.p`
  margin: 0 0 ${theme.spacing(0.75)} 0;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fonts.body};
  line-height: 1.5;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

export const ResultMeta = styled.span`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.gray[500]};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 11px;
  }
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(8)} ${theme.spacing(3)};
  text-align: center;
  color: ${theme.colors.gray[500]};

  svg {
    margin-bottom: ${theme.spacing(2)};
    opacity: 0.3;
  }

  h3 {
    margin: 0 0 ${theme.spacing(1)} 0;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.gray[700]};
  }

  p {
    margin: 0;
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.gray[500]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(6)} ${theme.spacing(2)};

    svg {
      width: 40px;
      height: 40px;
    }

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 13px;
    }
  }
`;

export const RecentSearches = styled.div`
  margin-bottom: ${theme.spacing(3)};
`;

export const RecentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(2)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.fonts.body};

  svg {
    color: ${theme.colors.gray[500]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ClearRecent = styled.button`
  margin-left: auto;
  background: transparent;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  cursor: pointer;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary}10;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 11px;
  }
`;

export const RecentItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fonts.body};

  svg {
    color: ${theme.colors.gray[400]};
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[800]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.25)} ${theme.spacing(1.5)};
    font-size: 13px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const TrendingSection = styled.div`
  margin-top: ${theme.spacing(3)};
`;

export const TrendingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(2)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.fonts.body};

  svg {
    color: ${theme.colors.gray[500]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const TrendingTag = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.body};
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
    font-size: 11px;
  }
`;

