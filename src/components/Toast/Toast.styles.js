import styled, { keyframes } from 'styled-components';
import theme from '../../theme/Theme';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

export const ToastItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  border-left-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'error':
        return '#EF4444';
      default:
        return '#10B981';
    }
  }};
  animation: ${slideIn} 0.3s ease-out;
  
  &.removing {
    animation: ${slideOut} 0.3s ease-in forwards;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 0 10px;
    max-width: calc(100vw - 20px);
  }
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  color: white;
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'error':
        return '#EF4444';
      default:
        return '#10B981';
    }
  }};
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ToastTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  font-family: ${theme.fonts.heading};
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6B7280;
  font-family: ${theme.fonts.body};
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #F3F4F6;
    color: #6B7280;
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`; 