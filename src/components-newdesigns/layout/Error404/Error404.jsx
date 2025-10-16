import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ErrorContainer,
  ErrorNumber,
  ErrorTitle,
  HomeLink
} from './Error404.styles';

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ErrorContainer>
      <ErrorNumber>404</ErrorNumber>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <HomeLink onClick={handleGoHome}>Go back home</HomeLink>
    </ErrorContainer>
  );
};

export default Error404;