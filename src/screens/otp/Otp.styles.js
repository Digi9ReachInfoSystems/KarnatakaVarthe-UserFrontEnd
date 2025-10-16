import styled from "styled-components";
import theme from "../../theme/Theme";

export const OtpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.background};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)};
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    margin-right: 0;
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

export const OtpSubheader = styled.h5`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.textgray};
  margin-bottom: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;

    p{
      font-size: 0.9rem;
    }
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1024px) {
    max-width: 100%;
    padding: ${theme.spacing(8)};
  }
`;

export const OtpBox = styled.div`
  background: ${theme.colors.light};
  padding: ${theme.spacing(8)};
  border-radius: ${theme.spacing(1.5)};
  text-align: center;
  max-width: 50%;
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
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 12%;
    height: 4vh;
    font-size: 1rem;
  }
`;

export const OtpButton = styled.button`
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

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: ${theme.spacing(1)};
  }
`;

export const ErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  text-align: left;
  margin-top: -${theme.spacing(1.25)};
  margin-bottom: ${theme.spacing(2)};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing(1)};
`;

export const CheckboxLabel = styled.label`
  font-family: ${theme.fonts.body};
  color: ${theme.colors.textgray};
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: ${theme.spacing(1)};
`;