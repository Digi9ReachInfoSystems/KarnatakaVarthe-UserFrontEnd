import React from 'react';
import { ToastContainer, ToastItem, ToastIcon, ToastContent, ToastTitle, ToastMessage, CloseButton } from './Toast.styles';
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ toasts, removeToast }) => {
  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaExclamationCircle />;
      default:
        return <FaCheckCircle />;
    }
  };

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          <ToastIcon type={toast.type}>
            {getToastIcon(toast.type)}
          </ToastIcon>
          <ToastContent>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastMessage>{toast.message}</ToastMessage>
          </ToastContent>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <FaTimes />
          </CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

export default Toast; 