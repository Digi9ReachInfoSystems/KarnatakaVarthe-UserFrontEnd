import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.gray[100]};
  padding: ${theme.spacing(2.5)};
  text-align: center;
`;

export const ErrorNumber = styled.h1`
  font-size: 10rem;
  font-weight: 900;
  color: ${theme.colors.gray[800]};
  margin: 0;
  font-family: ${theme.fonts.heading};
  line-height: 1;
`;

export const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin: ${theme.spacing(1)} 0 ${theme.spacing(5)} 0;
  font-family: ${theme.fonts.heading};
`;

export const HomeLink = styled.a`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  font-family: ${theme.fonts.body};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;