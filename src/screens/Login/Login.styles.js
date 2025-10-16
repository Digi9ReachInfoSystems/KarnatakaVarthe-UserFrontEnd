import styled from "styled-components";
import theme from "../../theme/Theme";

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.background};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(4)};
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }

 @media (min-width: ${theme.breakpoints.mobile}) {
 max-width: 100%;
 }
 @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
  max-width: 100%;
 }
`;

export const LoginBox = styled.div`
  background: ${theme.colors.light};
  padding: ${theme.spacing(8)};
  border-radius: ${theme.spacing(1.5)};
  text-align: center;
  max-width: 60%;
  width: 100%;
  margin-right: ${theme.spacing(20)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.background};
    padding: ${theme.spacing(4)};
    max-width: 100%;
    margin-right: 0;
    

    h2 {
      font-size: 2rem;
    }

    h5 {
      font-size: 0.9rem;
      padding-bottom: ${theme.spacing(4)};
    }
     
  }

  @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet}) {
    max-width: 70%;
    padding: ${theme.spacing(5)};
    margin-right: 0;

    h2 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1rem;
    }
       label {
        font-size: 1rem !important;
      }
      
  }

@media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
  max-width: 100%;
  padding: ${theme.spacing(8)};
  margin-right: 5rem;
}

@media(min-width: ${theme.breakpoints.laptop}) {
  max-width: 100%;
  
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

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 0.875rem;
    }

    @media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet}) {
      font-size: 0.9375rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${theme.colors.button};
  width: 100%;
  background: ${theme.colors.light};
  padding: ${theme.spacing(1)} ;
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.background};
  }
`;

export const CountryCode = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-right: ${theme.spacing(0.5)};
`;

export const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  color: ${theme.colors.text};
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${theme.colors.textgray};
  }

  &:focus {
    outline: none;
    // border-bottom: 2px solid ${theme.colors.secondary};
    box-shadow: none;
  }
`;



export const ErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  text-align: left;
  margin-top: -${theme.spacing(1.25)};
  margin-bottom: ${theme.spacing(2)};
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
  margin-top: ${theme.spacing(2)};

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

export const GuestButton = styled(Button)`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.textgray};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};

  &:hover {
    background: ${theme.colors.backgray};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${theme.colors.black};
  font-size: 1rem;
  margin: ${theme.spacing(3)} 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${theme.colors.textgray};
    margin: 0 ${theme.spacing(1)};
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing(2)};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(1.5)};
    width: 100%;
    border: 1px solid ${theme.colors.textgray};
    background: ${theme.colors.backgray};
    border-radius: ${theme.spacing(1)};
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    img {
      margin-right: ${theme.spacing(1)};
    }

    &:hover {
      background: ${theme.colors.lightgreen};
    }
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

export const OtpBox = styled.div`
  background: ${theme.colors.light};
  padding: ${theme.spacing(8)};
  border-radius: ${theme.spacing(1.5)};
  text-align: center;
  max-width: 60%;
  width: 100%;
  margin-right: ${theme.spacing(25)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    background: ${theme.colors.background};
    padding: ${theme.spacing(2)};
    max-width: 100%;
    margin-right: 0;

    h2 {
      font-size: 1.8rem;
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

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 1.2rem;
    }
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

export const OtpInputs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(2)};
  width: 100%;
  gap: ${theme.spacing(1)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1)};
  }
`;

export const OtpInput = styled.input`
  width: 15%;
  height: 5vh;
  text-align: center;
  font-size: 1.2rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.margin};
  outline: none !important;

  &::placeholder {
    color: ${theme.colors.textgray};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${theme.colors.secondary}33;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 12%;
    height: 4vh;
    font-size: 1rem;
  }
`;

export const OtpHeader = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  font-weight: semibold;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: ${theme.spacing(1.5)};
    padding: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    font-size: 2rem;
    margin-bottom: ${theme.spacing(1.5)};
`;