import styled from "styled-components";
import theme from "../../theme/Theme";

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.background};
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing(5)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  padding: ${theme.spacing(5)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    max-width: 100%;
  }
`;
export const SignupBox = styled.div`
  background: ${theme.colors.light};
  padding: ${theme.spacing(8)};
  border-radius: ${theme.spacing(1.5)};
  text-align: center;
  max-width: 70%;
  width: 100%;
  margin-right: ${theme.spacing(25)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.background};
    padding: ${theme.spacing(1)};
    
    max-width: 100%;
    margin-right: 1.5rem;

    h2 {
      font-size: 1.8rem;

    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      h2 {
        font-size: 1.8rem;
        bottom: ${theme.spacing(2)};
      }
      }

    h5 {
      font-size: 0.9rem;
    }
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    max-width: 100%;
    padding: ${theme.spacing(3)};
    margin-right: 0;

    h2 {
      font-size: 2rem;
    }

    h5 {
      font-size: 1rem;
    }
  }

  h2 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.text};
    text-align: left;
    margin-bottom: ${theme.spacing(1)};
  }

  p {
    font-size: 1rem;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.body};
    margin-bottom: ${theme.spacing(2)};
  }

  h5 {
    font-size: 0.9rem;
    text-align: left;
    color: ${theme.colors.sidebarBgColor};
    font-family: ${theme.fonts.display};
    margin-bottom: ${theme.spacing(2)};
  }

  label {
    display: block;
    text-align: left;
    font-size: 1rem;
    margin-bottom: ${theme.spacing(1)};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.body};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing(1.5)};
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid ${theme.colors.primary};
  outline: none;
  background: transparent;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(1)};

  &::placeholder {
    color: ${theme.colors.textgray};
  }

  &:disabled {
    color: ${theme.colors.textgray};
  }

  &:focus {
    // outline: 2px solid ${theme.colors.secondary};
    // outline-offset: 2px;
    // border-bottom: 2px solid ${theme.colors.secondary};
    // box-shadow: 0 0 0 2px ${theme.colors.secondary}33;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(2)};
    
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: ${theme.spacing(1.5)};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.spacing(1)};
  font-size: 1rem;
  cursor: pointer;
  margin-top: ${theme.spacing(3)};
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.secondary};
  }

  &:disabled {
    background: ${theme.colors.textgray};
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${theme.colors.secondary}33;
  }
`;

export const LinkText = styled.span`
  color: ${theme.colors.primary};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

// export const ButtonGroup = styled.div`
//   // display: flex;
//   // gap: 10px;
//   // margin-top: 20px;
// `;
