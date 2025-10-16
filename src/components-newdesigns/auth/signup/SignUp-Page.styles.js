import styled,{keyframes} from "styled-components";
import theme from "../../../theme/Theme";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing(2)};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${theme.colors.white};
  border-radius: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing(5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 90%;
    padding: ${theme.spacing(4)};
    border-radius: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 95%;
    padding: ${theme.spacing(3)};
    border-radius: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    align-items: center;
    gap: ${theme.spacing(1)};
  }
`;

export const HeaderLeft = styled.div`
  flex: 1;
`;

export const HeaderRight = styled.div`
  text-align: right;

  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: right;
    white-space: nowrap;
  }
`;

export const Subtitle = styled.h2`
  font-size: 16px;
  color: ${theme.colors.lightText};
  margin-bottom: ${theme.spacing(1)};
  font-family: ${theme.fonts.body};

  .highlight {
    color: ${theme.colors.primary};
    font-weight: 500;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: ${theme.spacing(2)};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 30px;
    margin-bottom: ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 26px;
    margin-bottom: ${theme.spacing(1)};
  }
`;

export const AccountText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 4px;
  font-size: 14px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    margin-bottom: 2px;
  }
`;

export const StyledLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 14px;
  transition: ${theme.transitions.fast};

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: ${theme.spacing(1)};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.body};
`;

export const Input = styled.input`
  height: 48px;
  width: 100%;
  font-size: 14px;
  padding: 0 ${theme.spacing(2)};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 12px;
  font-family: ${theme.fonts.body};
  transition: ${theme.transitions.fast};
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus {
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 46px;
    font-size: 14px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 44px;
    font-size: 14px;
    border-radius: 10px;
    padding: 0 ${theme.spacing(1.5)};
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2)};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-family: ${theme.fonts.body};
  transition: ${theme.transitions.fast};
  margin-top: ${theme.spacing(2)};

  &:hover {
    background-color: ${theme.colors.secondary};
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 52px;
    font-size: 15px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 48px;
    font-size: 15px;
    border-radius: 12px;
    margin-top: ${theme.spacing(1)};
  }
`;
export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
export const Spinner = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${spin} 0.8s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
`;
